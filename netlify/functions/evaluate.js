import Anthropic from '@anthropic-ai/sdk'
import wcag21Data from './data/wcag-2.1.json'
import wcag22Data from './data/wcag-2.2.json'

function loadWcagData(version) {
  return version === '2.1' ? wcag21Data : wcag22Data
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { password, wcagVersion, inputType, content } = body

  if (password !== process.env.APP_PASSWORD) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Invalid password' }) }
  }

  if (!['2.1', '2.2'].includes(wcagVersion)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid WCAG version' }) }
  }
  if (!['url', 'code', 'screenshot'].includes(inputType)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid input type' }) }
  }
  if (!content) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No content provided' }) }
  }

  try {
    const wcagData = loadWcagData(wcagVersion)
    const systemPrompt = buildSystemPrompt(wcagData)
    const userMessage = await buildUserMessage(inputType, content)

    const client = new Anthropic()
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })

    const responseText = response.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('')

    const evaluation = parseEvaluation(responseText)

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, evaluation }),
    }
  } catch (err) {
    console.error('Evaluation error:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Evaluation failed' }),
    }
  }
}

function buildSystemPrompt(wcagData) {
  const criteriaJson = JSON.stringify(wcagData.criteria)
  const testingJson = JSON.stringify(wcagData.testing_procedures)

  return `You are a WCAG ${wcagData.version} accessibility compliance expert. Evaluate the provided content against WCAG ${wcagData.version} success criteria.

## WCAG ${wcagData.version} Success Criteria (${wcagData.total_criteria} total)
${criteriaJson}

## Testing Procedures
${testingJson}

## Your Task
Analyze the provided content and identify accessibility issues. For each issue found, provide:
1. A clear description of the issue
2. The specific WCAG criterion it violates (id, name, level)
3. The impact on users with disabilities
4. The testing procedure to verify the issue
5. Specific remediation steps
6. Which roles are responsible (design, development, project_requirements)

## Response Format
CRITICAL: Your entire response must be a single JSON object. Do NOT include any text, explanation, or commentary before or after the JSON. Do NOT use markdown code fences. Start your response with { and end with }. Use this exact structure:
{
  "issues": [
    {
      "issue": "Brief description of the problem",
      "criterion": {
        "id": "X.X.X",
        "name": "Criterion Name",
        "level": "A|AA|AAA"
      },
      "impact": "How this affects users with disabilities",
      "testing": "How to test for this issue",
      "remediation": "Specific steps to fix",
      "responsible": ["design", "development"]
    }
  ],
  "summary": "Brief overall summary of findings"
}

If no issues are found, return {"issues": [], "summary": "No accessibility issues identified."}.
Focus on real, actionable issues. Prioritize A and AA level criteria. Be specific about remediation steps.`
}

async function buildUserMessage(inputType, content) {
  if (inputType === 'screenshot') {
    const match = content.match(/^data:(image\/\w+);base64,(.+)$/)
    if (!match) throw new Error('Invalid screenshot format')
    return [
      {
        type: 'image',
        source: {
          type: 'base64',
          media_type: match[1],
          data: match[2],
        },
      },
      {
        type: 'text',
        text: 'Evaluate this screenshot for WCAG accessibility issues. Analyze all visible UI elements, text, contrast, interactive controls, and overall layout.',
      },
    ]
  }

  if (inputType === 'url') {
    let html
    try {
      const res = await fetch(content, {
        headers: { 'User-Agent': 'WCAG-Evaluator/1.0' },
        signal: AbortSignal.timeout(10000),
      })
      html = await res.text()
      if (html.length > 100000) {
        html = html.substring(0, 100000) + '\n[... HTML truncated at 100KB ...]'
      }
    } catch (err) {
      throw new Error(`Failed to fetch URL: ${err.message}`)
    }
    return [
      {
        type: 'text',
        text: `Evaluate this web page for WCAG accessibility issues.\n\nURL: ${content}\n\nFetched HTML:\n${html}`,
      },
    ]
  }

  // code
  return [
    {
      type: 'text',
      text: `Evaluate the following HTML/code for WCAG accessibility issues:\n\n${content}`,
    },
  ]
}

function parseEvaluation(responseText) {
  let text = responseText.trim()
  // Strip markdown fences
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }
  // Try direct parse first
  try {
    return JSON.parse(text)
  } catch {
    // Try to extract JSON object from surrounding text
    const match = text.match(/\{[\s\S]*"issues"\s*:\s*\[[\s\S]*\]\s*[\s\S]*\}/)
    if (match) {
      try {
        return JSON.parse(match[0])
      } catch {}
    }
    return { issues: [], summary: text, parseError: true }
  }
}

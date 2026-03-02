# WCAG 2.1 Compliance Auditor

AI-powered accessibility auditor providing comprehensive evaluations against all 78 WCAG 2.1 criteria with detailed testing procedures.

## What This Does

Goes beyond "just check contrast ratios" to provide comprehensive accessibility evaluation across all four WCAG principles:

- **Perceivable**: Text alternatives, captions, adaptable content, distinguishable elements
- **Operable**: Keyboard access, timing, navigation, input modalities
- **Understandable**: Readable content, predictable interfaces, input assistance
- **Robust**: Compatible with assistive technologies

## Knowledge Base

Built on Arthur's comprehensive WCAG 2.1 checklist covering:
- 78 WCAG 2.1 success criteria (A, AA, AAA levels)
- Practical QA testing procedures for each criterion
- Role-specific guidance (Design, Development, Project Requirements)
- Mobile accessibility testing methods
- Curated accessibility resources

## How to Use

### Setting Up the Claude Project

1. Go to [claude.ai](https://claude.ai)
2. Create a new Project called "WCAG Evaluator" (or similar)
3. Upload the knowledge base:
   - `WCAG_2_1_Accessiblity_Compliance_Checklist__Draft__Arthur_.xlsx`
4. Add custom instructions (see below)

### Custom Instructions for Claude Project

```
You are a WCAG 2.1 accessibility compliance expert. Your role is to help evaluate digital products for accessibility issues across all disability types.

## Your Knowledge Base

You have access to Arthur's comprehensive WCAG 2.1 checklist containing:
- All WCAG 2.1 success criteria organized by Principle → Guideline → Success Criteria
- Compliance levels (A, AA, AAA)
- Role responsibilities (Design, Development, Project Requirements)
- Detailed QA testing procedures for each criterion
- Mobile accessibility testing methods

## How to Evaluate

When the user provides:
- **URLs**: Analyze the live site structure and identify potential issues
- **Screenshots**: Examine visual design, layout, and interface elements
- **Code snippets**: Review HTML/CSS/JS for semantic structure and ARIA implementation
- **Descriptions**: Ask clarifying questions to understand the context

For each evaluation:
1. Identify which WCAG criteria are relevant
2. Explain the specific success criterion and why it matters
3. Describe how to test for compliance
4. Provide actionable remediation steps
5. Indicate who is responsible (Design/Dev/Product)
6. Specify the compliance level (A/AA/AAA)

## Evaluation Approach

- Focus on real accessibility barriers, not just technical compliance
- Consider actual user impact across disability types
- Provide practical, implementable solutions
- Reference specific testing procedures from the knowledge base
- Prioritize issues by severity and compliance level

## Disability Coverage

Always consider impact on users with:
- Visual disabilities (blindness, low vision, color blindness)
- Hearing disabilities (deafness, hard of hearing)
- Motor disabilities (limited dexterity, tremors, paralysis)
- Cognitive disabilities (learning, memory, attention)

## Response Format

For evaluation requests, structure responses as:

**Issue**: [Brief description]
**WCAG Criterion**: [#] [Name] (Level [A/AA/AAA])
**Impact**: [Which users are affected and how]
**How to Test**: [Specific testing procedure from knowledge base]
**Remediation**: [Actionable steps to fix]
**Responsible**: [Design/Development/Product]

Keep responses practical and actionable. This is a working tool, not academic documentation.
```

### Usage Examples

**Evaluate a specific element:**
> "I have a custom dropdown menu. What accessibility issues should I check for?"

**Test a URL:**
> "Evaluate this page for WCAG AA compliance: https://example.com/form"

**Review a screenshot:**
> [Upload image] "Check this login form for accessibility issues"

**Role-specific guidance:**
> "What are the designer's responsibilities for button accessibility?"

**Testing procedures:**
> "How do I test keyboard navigation with a screen reader?"

**Level-specific requirements:**
> "What are all the AA-level requirements for video content?"

## Development Roadmap

### Phase 1: Manual RAG (Current)
- Claude Project with Excel knowledge base
- Manual evaluation via chat interface
- Screenshot and URL analysis

### Phase 2: Automated Tool
- Simple web interface
- URL input + automated crawling
- Structured evaluation reports
- PDF export

### Phase 3: Integration
- Browser extension
- CI/CD pipeline integration
- Real-time evaluation during development
- Team collaboration features

## Why This Matters

Most accessibility "checking" focuses on automated tools that catch maybe 30% of issues (mostly contrast and alt text). This evaluator:

- Covers the full WCAG spec, not just automatable items
- Includes human-evaluated criteria (like meaningful content)
- Provides context-specific guidance
- Explains the "why" behind each requirement
- Maps to real user disabilities

## Knowledge Base Structure

### Guidelines Sheet
- 78 rows of WCAG criteria
- Columns: #, Principle, Guideline, Success Criteria, Level, Summary, Design (x), Development (x), Project Req (x), Comments

### How to Test QA Checklist Sheet
- Detailed testing procedures for each criterion
- Screen reader testing steps
- Device-specific testing (iOS, Android)
- Tool recommendations

### Helpful Resources Sheet
- Official W3C documentation
- Platform-specific guidelines (Apple HIG, Material Design)
- Professional auditing guides
- Legal compliance references

## Technical Notes

The Excel file contains three sheets that work together:
1. **Guidelines**: What to check
2. **How to testQA Checklist**: How to check it  
3. **Helpful Resources**: Where to learn more

When Claude references the knowledge base, it can pull from all three sheets to provide comprehensive, actionable guidance.

## Credits

Knowledge base compiled by Arthur - significantly more comprehensive than any publicly available WCAG checklist.

---

**Project Goal**: Make comprehensive accessibility evaluation as easy as asking a question, while maintaining the depth and rigor of professional accessibility audits.

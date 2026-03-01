# Quick Start Guide

## Immediate Setup (5 minutes)

### 1. Create the Claude Project

1. Go to https://claude.ai/projects
2. Click "Create Project"
3. Name it: **"WCAG Evaluator"**
4. Click "Create Project"

### 2. Upload the Knowledge Base

1. In your new project, click "Add content"
2. Upload: `WCAG_2_1_Accessiblity_Compliance_Checklist__Draft__Arthur_.xlsx`
3. The file will be processed and available to Claude

### 3. Add Custom Instructions

Click "Set custom instructions" and paste:

```
You are a WCAG 2.1 accessibility compliance expert. Your role is to help evaluate digital products for accessibility issues across all disability types.

## Your Knowledge Base

You have access to Arthur's comprehensive WCAG 2.1 checklist containing:
- All WCAG 2.1 success criteria organized by Principle → Guideline → Success Criteria
- Compliance levels (A, AA, AAA)
- Role responsibilities (Design, Development, Project Requirements)
- Detailed QA testing procedures for each criterion

## How to Evaluate

When the user provides URLs, screenshots, code, or descriptions:

1. Identify which WCAG criteria are relevant
2. Explain the specific success criterion and why it matters
3. Describe how to test for compliance (using procedures from knowledge base)
4. Provide actionable remediation steps
5. Indicate who is responsible (Design/Dev/Product)
6. Specify the compliance level (A/AA/AAA)

## Response Format

**Issue**: [Brief description]
**WCAG Criterion**: [#] [Name] (Level [A/AA/AAA])
**Impact**: [Which users are affected]
**How to Test**: [Specific procedure from knowledge base]
**Remediation**: [Actionable steps]
**Responsible**: [Design/Development/Product]

Focus on real accessibility barriers and practical solutions. Cover all disability types: visual, hearing, motor, and cognitive.
```

### 4. Start Testing

You can now:

**Drop in a URL:**
> "Evaluate this for WCAG AA compliance: https://example.com"

**Upload a screenshot:**
> [Upload image] "What accessibility issues do you see?"

**Ask specific questions:**
> "How do I test keyboard navigation?"
> "What are the designer's responsibilities for forms?"
> "Show me all AA-level requirements for images"

**Paste code:**
> "Review this button component for accessibility"
> ```html
> <div class="btn" onclick="submit()">Submit</div>
> ```

## Testing Your Setup

Try this first query to verify everything works:

> "What are the WCAG requirements for button accessibility? Include testing procedures and who's responsible for each aspect."

Claude should reference the Excel knowledge base and provide:
- Specific WCAG criteria (like 2.1.1 Keyboard, 4.1.2 Name/Role/Value)
- Testing procedures from the "How to test" sheet
- Role responsibilities (Design vs Development)

## What Makes This Different

Traditional automated accessibility checkers catch ~30% of issues (mostly contrast and alt text).

This evaluator:
- ✅ Covers full WCAG spec (78 criteria)
- ✅ Includes human-evaluated criteria (meaningful content, logical order)
- ✅ Provides context-specific guidance
- ✅ Maps to real user disabilities
- ✅ Includes actual testing procedures
- ✅ Shows who's responsible for fixing

## Common Queries

**For specific elements:**
- "Evaluate this modal dialog for accessibility"
- "What do I need to check for a data table?"
- "Accessibility requirements for video players"

**For roles:**
- "What accessibility issues can designers prevent?"
- "Developer checklist for form accessibility"
- "Product requirements for accessible navigation"

**For testing:**
- "How to test with VoiceOver on iOS"
- "Screen reader testing procedure for headings"
- "Keyboard navigation test steps"

**For compliance levels:**
- "What's required for WCAG AA compliance?"
- "Difference between A and AA for images"
- "Which AAA criteria should we prioritize?"

## Next Steps

Once you've tested the basic setup:

1. **Refine the custom instructions** based on your workflow
2. **Add example evaluations** to the project knowledge base
3. **Document common issues** you find in your products
4. **Build evaluation templates** for recurring patterns

## Future Development

- Web interface for team access
- URL crawling automation
- Structured report generation
- Integration with design tools
- CI/CD pipeline checks

---

**You should now have a working WCAG evaluator that goes way beyond "check the contrast ratio"!**

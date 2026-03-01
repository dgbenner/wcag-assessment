# Example Evaluation Queries

Use these to test your WCAG Evaluator setup and explore its capabilities.

## Testing the Setup

### Basic Knowledge Check
```
What are the WCAG requirements for button accessibility?
Include testing procedures and who's responsible for each aspect.
```

Expected: Should reference criteria like 2.1.1 (Keyboard), 4.1.2 (Name/Role/Value), pull testing procedures from knowledge base, and specify Design vs Development responsibilities.

---

## Element-Specific Evaluations

### Forms
```
I have a login form with email and password fields. 
What accessibility issues should I check for?
```

```
What are all the WCAG requirements for error messages in forms?
```

### Navigation
```
Evaluate this navigation component for accessibility:
- Hamburger menu icon
- Slide-out drawer
- Close button
What do I need to test?
```

### Modals
```
I'm building a modal dialog that appears on button click.
What accessibility requirements apply and how do I test them?
```

### Data Tables
```
What makes a data table accessible? 
Include specific WCAG criteria and testing steps.
```

### Video Players
```
Our app has video content. What are the WCAG requirements for:
- Pre-recorded videos
- Live streams
- Videos with audio
- Silent videos
```

---

## Role-Specific Queries

### For Designers
```
What accessibility issues can designers prevent or cause?
Focus on visual and interaction design decisions.
```

```
I'm designing a button system. What are my accessibility responsibilities?
```

### For Developers
```
What's the developer's checklist for making a custom dropdown accessible?
```

```
Show me all Development-responsible items for WCAG AA compliance.
```

### For Product Managers
```
What accessibility requirements should I include in acceptance criteria for a search feature?
```

---

## Testing Procedures

### Screen Reader Testing
```
How do I test keyboard navigation with a screen reader?
Give me specific steps.
```

```
What's the testing procedure for verifying that images have proper alt text?
```

### Mobile Testing
```
How do I test mobile app accessibility on iOS?
```

```
What are the touch target size requirements and how do I measure them?
```

---

## Compliance Levels

### Understanding Levels
```
Explain the difference between WCAG A, AA, and AAA.
Which level should we target and why?
```

### Level-Specific Requirements
```
Show me all AA-level requirements for images and graphics.
```

```
What AAA criteria should we prioritize for a content-heavy website?
```

---

## URL Evaluation

### Live Site Analysis
```
Evaluate this page for WCAG AA compliance: 
[paste URL]

Focus on:
- Navigation accessibility
- Form inputs
- Image alternatives
- Color contrast
```

### Specific Page Sections
```
Check this checkout flow for accessibility issues:
[paste URLs for cart → checkout → payment → confirmation]
```

---

## Screenshot Analysis

### Upload and Ask
```
[Upload screenshot]
What accessibility issues do you see in this interface?
Prioritize by severity.
```

### Specific Element Focus
```
[Upload screenshot of form]
Evaluate just the form elements for accessibility.
Ignore the header and footer.
```

---

## Code Review

### HTML Semantics
```html
Review this navigation for accessibility:

<div class="nav">
  <div class="nav-item" onclick="navigate('/home')">Home</div>
  <div class="nav-item" onclick="navigate('/about')">About</div>
  <div class="nav-item" onclick="navigate('/contact')">Contact</div>
</div>
```

### Button Implementation
```html
Is this button accessible?

<div class="btn" onclick="submit()">
  <img src="icon.svg">
  Submit
</div>

If not, how should it be coded?
```

### ARIA Usage
```html
Am I using ARIA correctly here?

<div role="button" aria-pressed="false" tabindex="0">
  Toggle Dark Mode
</div>
```

---

## Complex Scenarios

### Multi-Step Forms
```
I'm building a multi-step form wizard (5 steps).
What are the accessibility requirements for:
- Step indicators
- Previous/Next buttons
- Form validation
- Progress tracking
```

### Interactive Charts
```
We display data visualizations with D3.js.
What makes charts accessible to screen reader users?
```

### Infinite Scroll
```
Our feed uses infinite scroll to load content.
What are the accessibility implications and how do we handle them?
```

---

## Prioritization

### Audit Results
```
We did an accessibility audit and found 50 issues.
Help me prioritize them by:
- WCAG level (A vs AA vs AAA)
- User impact
- Implementation effort
```

### Quick Wins
```
What are the easiest accessibility fixes that have the biggest impact?
Focus on low-effort, high-value improvements.
```

---

## Disability-Specific Questions

### Vision
```
What considerations are needed for users with:
- Blindness (screen reader users)
- Low vision (magnification users)
- Color blindness
```

### Motor
```
What makes an interface accessible for users with limited dexterity or motor control?
```

### Cognitive
```
How do I make complex workflows accessible for users with cognitive disabilities?
```

---

## Testing Tools

### Recommended Tools
```
What tools should I use to test for WCAG compliance?
Include both automated and manual testing tools.
```

### Screen Reader Setup
```
How do I set up and use VoiceOver for accessibility testing?
Give me a beginner's workflow.
```

---

## Edge Cases

### Loading States
```
How do I make loading spinners and skeleton screens accessible?
```

### Error States
```
What's the accessible way to handle:
- Form validation errors
- Network errors
- 404 pages
- Empty states
```

### Dynamic Content
```
Content updates dynamically without page refresh.
How do I announce these changes to screen reader users?
```

---

## Resources

### Learning Path
```
I'm new to accessibility. What should I learn first?
Create a learning roadmap based on the knowledge base.
```

### Specific Guidelines
```
I want to deep-dive on keyboard accessibility.
Point me to the relevant WCAG criteria and testing procedures.
```

---

**Pro Tip**: Start with broad questions to understand the scope, then drill down into specific criteria and testing procedures. The evaluator has detailed information at both levels.

# WCAG Accessibility Evaluator

AI-powered accessibility evaluation tool that checks web content against WCAG 2.1 and 2.2 criteria using Claude.

## Features

- **WCAG 2.1 & 2.2** — evaluate against 78 or 86 success criteria
- **Multiple input methods** — URL, code/HTML paste, or screenshot upload
- **Structured results** — issues with criterion, impact, testing procedure, remediation, and responsibility
- **Password protected** — simple auth for limited access

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Netlify Functions (serverless)
- Anthropic Claude API

## Setup

```bash
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY and APP_PASSWORD to .env
netlify dev
```

## Deployment

Deployed on Netlify. Set `ANTHROPIC_API_KEY` and `APP_PASSWORD` in Netlify environment variables.

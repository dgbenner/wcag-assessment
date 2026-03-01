# WCAG Evaluator - Project Structure

## Current Phase: Manual RAG Evaluation

```
wcag-evaluator/
├── README.md                 # Main project documentation
├── QUICK_START.md           # 5-minute setup guide
├── EXAMPLE_QUERIES.md       # Test queries and usage examples
├── .gitignore              # Git ignore rules
└── knowledge-base/         # (gitignored - store locally)
    └── WCAG_2_1_Accessiblity_Compliance_Checklist__Draft__Arthur_.xlsx
```

## Phase 2: Automated Tool (Future)

When ready to build the web interface:

```
wcag-evaluator/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── URLInput.jsx
│   │   │   ├── ScreenshotUpload.jsx
│   │   │   ├── EvaluationResults.jsx
│   │   │   └── ReportExport.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── api/
│   │   ├── evaluate.py          # Main evaluation endpoint
│   │   ├── claude_client.py     # Anthropic API integration
│   │   └── wcag_parser.py       # Parse Excel knowledge base
│   ├── requirements.txt
│   └── main.py
│
├── knowledge-base/
│   ├── wcag_criteria.json       # Parsed from Excel
│   ├── testing_procedures.json  # Parsed from Excel
│   └── original/
│       └── WCAG_2_1_Accessiblity_Compliance_Checklist__Draft__Arthur_.xlsx
│
└── docs/
    ├── API.md                   # API documentation
    ├── DEPLOYMENT.md            # Deployment guide
    └── CONTRIBUTING.md          # Contribution guidelines
```

## Phase 3: Integration (Future)

Browser extension and CI/CD integration structure to be defined.

---

**Current Focus**: Get the Claude Project working first, then decide on automation needs.

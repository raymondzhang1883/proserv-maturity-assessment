# ProServ Assessment

A comprehensive **Professional Services KPI Maturity Assessment Tool** built with React and Vite. This interactive assessment evaluates professional services firms across 5 key dimensions using Resultant's proven maturity framework, providing personalized recommendations and lead scoring.

## 🎯 **Features**

### **Assessment Framework**
Built on **Resultant's PE Data Maturity Whitepaper** with 5 maturity levels:
- **P0 - Ad Hoc/Firefighting**: No system alignment, metrics in spreadsheets
- **P1 - Standardized/Foundational**: Defined KPIs, basic reporting
- **P2 - Integrated/Insight-driven**: Automated reporting, weekly decision-making
- **P3 - Predictive/Optimized**: Data science applied to forecasting and optimization
- **P4 - Strategic/Value Multiplier**: Data infrastructure as competitive differentiator

### **Assessment Sections**
- **Business Context**: Industry, company size, revenue, growth strategy
- **KPI Coverage**: Which core metrics are currently tracked
- **Reliability & Latency**: Data confidence and reporting speed
- **Tooling & Architecture**: Technology stack and automation level
- **Usage & Governance**: Data ownership, adoption, and forecasting

### **Intelligent Analysis**
- **Dynamic Persona Classification**: Maps responses to 5 maturity levels (P0-P4)
- **Personalized Recommendations**: Tailored next steps based on current maturity
- **Lead Scoring Engine**: Automatic qualification for sales follow-up (75+ points = high priority)
- **Context-Aware CTAs**: Customized calls-to-action based on persona and needs


## 🎨 **Technology Stack**

- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS 4.1
- **Icons**: Lucide React
- **State Management**: React useState
- **Build Tool**: Vite
- **Linting**: ESLint 9

## 🏗️ **Architecture**

### **Modular Service Architecture**
The application uses a service-oriented architecture for maintainability and scalability:

```
src/
├── services/           # Business logic engines
│   ├── assessmentEngine.js      # Main orchestrator
│   ├── scoringEngine.js         # Scoring calculations
│   ├── personaEngine.js         # Persona determination
│   ├── recommendationEngine.js  # Personalized recommendations
│   ├── leadScoringEngine.js     # Lead scoring logic
│   └── dataTransformer.js       # Data preparation & validation
├── config/            # Configuration files
│   ├── questions.js            # Question definitions
│   ├── personas.js             # Persona configurations
│   └── scoringRules.js         # Scoring rules & mappings
└── App.jsx           # Main React component
```

### **Data Structure**
Ready for database integration and CRM systems:

```javascript
const userData = {
  sessionId: "session_123...",
  demographics: { industry, companySize, revenue },
  businessContext: { growth, challenges, timeline },
  kpiAssessment: { coverage, confidence, tools },
  results: { persona, scores, leadScore },
  consent: { gdprConsent, marketingOptIn }
}
```

## 📋 **Documentation**

Additional documentation available in the `docs/` directory:
- **ALL_QUESTIONS.md**: Complete question bank and assessment structure (this includes unused questions)
- **PROGRAM_MATURITY.md**: Detailed persona definitions from Resultant's whitepaper
- **FURTHER_DEVELOPMENT.md**: Future enhancement notes

## 🤝 **Contributing**

Created with assistance from Byron Hubbard and Preston Howell

## 📄 **License**

Private commercial project - All rights reserved.

---

**Built by Raymond Zhang for Resultant**
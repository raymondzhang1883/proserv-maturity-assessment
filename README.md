# Professional Services KPI Maturity Assessment

[![React](https://img.shields.io/badge/React-19.1.0-61dafb?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38b2ac?logo=tailwind-css)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9.30.1-4B32C3?logo=eslint)](https://eslint.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A sophisticated **data maturity assessment assessment platform** that evaluates professional services firms across 5 critical KPI dimensions using data-driven maturity frameworks. Built with modern React architecture and intelligent scoring algorithms to deliver personalized insights and automated lead qualification.

*This is a clean-room implementation inspired by professional services assessment methodologies, containing no proprietary code or confidential information.*

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


## 🚀 **Key Achievements**

- **1,783+ lines** of production-ready JavaScript/React code
- **Modular service architecture** with 6 specialized engines
- **Advanced scoring algorithms** with multi-dimensional analysis
- **Enterprise-ready data structures** for CRM integration
- **Zero external API dependencies** - fully self-contained
- **Responsive design** optimized for all device sizes

## 🎨 **Technology Stack**

- **Frontend Framework**: React 19.1.0 (latest stable)
- **Build Tool**: Vite 7.0.4 (next-generation bundler)
- **Styling**: Tailwind CSS 4.1.11 (utility-first CSS)
- **Icons**: Lucide React (modern icon library)
- **Code Quality**: ESLint 9.30.1 (automated linting)
- **State Management**: React hooks (modern, performant)
- **Type Safety**: Modern JavaScript with strict linting

## 🏗️ **Architecture**

### **Enterprise Service Architecture**
Designed with scalability and maintainability in mind using separation of concerns:

```
src/
├── services/           # 🧠 Business Logic Engines (6 specialized modules)
│   ├── assessmentEngine.js      # 🎯 Main orchestrator & workflow
│   ├── scoringEngine.js         # 📊 Multi-dimensional scoring algorithms
│   ├── personaEngine.js         # 👤 AI-driven persona classification
│   ├── recommendationEngine.js  # 💡 Personalized insights generator
│   ├── leadScoringEngine.js     # 🎪 Sales-ready lead qualification
│   └── dataTransformer.js       # 🔄 Data validation & normalization
├── config/            # ⚙️ Configuration Management
│   ├── questions.js            # 📋 Dynamic question definitions
│   ├── personas.js             # 🏷️ Maturity level configurations
│   └── scoringRules.js         # 📐 Scoring algorithms & rules
└── components/        # 🎨 React UI Components
    └── App.jsx               # 📱 Main application orchestrator
```

**Architecture Benefits:**
- **Modular Design**: Each service handles a single responsibility
- **Easy Testing**: Isolated business logic for unit testing
- **Scalable**: Services can be extracted to microservices
- **Maintainable**: Clear separation between UI and business logic

### **Data Structure**
Ready for database integration and CRM systems:

```javascript
const userData = {
  // Metadata
  sessionId: "session_123...",
  timestamp: "2024-01-15T10:30:00.000Z",
  assessmentVersion: "v4.0",
  
  // Demographics (Limited - only company size captured)
  demographics: {
    companySize: "101-500 employees" // From question E2
  },
  
  // Business Context (Limited - only operational challenge captured)
  businessContext: {
    operationalChallenge: "Project profitability" // From question E15
  },
  
  // KPI Assessment (Comprehensive - all assessment questions)
  kpiAssessment: {
    coverage: ["Billable-utilization %", "Project gross-margin %"], // From A1
    confidence: 7, // From B2 (0-10 scale)
    reportingSpeed: "Within 1 week", // From B3
    manualWork: "Around half", // From B4
    dataQualityIssues: ["Missing fields", "Inconsistent definitions"], // From B5
    reportingTools: ["PSA built-in dashboards", "Spreadsheets"], // From C6
    dataArchitecture: "Multiple disconnected systems", // From C7
    internalTeam: "Limited bandwidth", // From C8
    visibilityGaps: ["Sales / Business Development", "Operations / Resource Mgmt"], // From C9
    dataUsers: ["C-suite", "Department heads", "Project managers"], // From D11
    forecastingCapability: "Manual quarterly forecast in spreadsheets" // From D13
  },
  
  // Calculated Results
  results: {
    scores: { total: 65, coverage: 15, reliability: 20, tooling: 15, usage: 15 },
    persona: "P2",
    personaLabel: "Integrated/Insight-driven",
    totalScore: 65,
    leadScore: 78,
    recommendations: ["Implement automated reporting...", "Establish data governance..."]
  },
  
  // User Consent & Preferences
  consent: {
    gdprConsent: true,
    marketingOptIn: true
  },
  
  // Raw answers for backup/debugging
  rawAnswers: { A1: [...], B2: 7, B3: "Within 1 week", ... }
}
```

## 🚀 **Getting Started**

```bash
# Clone the repository
git clone [repository-url]
cd proserv-assessment

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## 📋 **Documentation**

Comprehensive documentation available in the `docs/` directory:
- **ASSESSMENT.md**: Complete question bank and assessment structure
- **PROGRAM_MATURITY.md**: Detailed persona definitions and maturity framework
- **PERSONA_SCORING.txt**: Scoring algorithms and persona logic
- **FURTHER_DEVELOPMENT.md**: Future enhancement roadmap

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **About**

**Built by Raymond Zhang**
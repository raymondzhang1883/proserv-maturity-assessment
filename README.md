# ProServ KPI Maturity Assessment

A comprehensive **Professional Services KPI Maturity Assessment Tool** built with React and Vite. This interactive assessment helps professional services firms evaluate their KPI maturity across 5 key dimensions and provides personalized recommendations based on their responses.

## 🎯 **Features**

### **Assessment Sections**
- **Business Context**: Industry, company size, revenue, growth strategy
- **KPI Coverage**: Which core metrics are currently tracked
- **Reliability & Latency**: Data confidence and reporting speed
- **Tooling & Architecture**: Technology stack and automation level
- **Usage & Governance**: Data ownership, adoption, and forecasting

### **Intelligent Analysis**
- **Dynamic Persona Classification**: 5 maturity levels (P0-P4)
- **Personalized Recommendations**: Tailored next steps based on responses
- **Lead Scoring**: Automatic qualification for sales follow-up
- **Context-Aware CTAs**: Customized calls-to-action

### **Database-Ready Architecture**
- **Structured Data Collection**: All responses formatted for database integration
- **GDPR Compliance**: User consent tracking
- **Export Functionality**: Ready for CRM/marketing automation
- **Session Management**: Unique session IDs and metadata

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 16+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone https://github.com/raymondzhang1883/proserv-maturity-assessment.git

# Navigate to project directory
cd proserv-maturity-assessment

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Available Scripts**
- `npm run dev` - Start development server (usually http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 **Assessment Flow**

1. **Business Context** (6 questions): Industry, size, revenue, strategy
2. **KPI Coverage** (1 question): Which metrics are tracked
3. **Reliability & Latency** (4 questions): Data quality and timing
4. **Tooling & Architecture** (4 questions): Technology and automation
5. **Usage & Governance** (6 questions): Ownership and adoption
6. **Results**: Persona classification and recommendations

## 🎨 **Technology Stack**

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React useState
- **Build Tool**: Vite
- **Linting**: ESLint

## 🔧 **Database Integration Ready**

The application is designed for easy backend integration:

```javascript
// Data structure ready for API/database
const userData = {
  sessionId: "session_123...",
  demographics: { industry, companySize, revenue },
  businessContext: { growth, challenges, timeline },
  kpiAssessment: { coverage, confidence, tools },
  results: { persona, scores, leadScore },
  consent: { gdprConsent, marketingOptIn }
}
```

## 🚀 **Deployment**

### **GitHub Pages** (Recommended for demo)
```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

### **Vercel/Netlify**
- Connect GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`

## 📈 **Lead Scoring Algorithm**

The assessment includes sophisticated lead scoring based on:
- **Maturity Level**: Higher scores for P2-P4 personas
- **Decision Authority**: Executive/Finance ownership (+15 points)
- **Timeline Urgency**: "Within 3 months" (+15 points)
- **Pain Points**: Project profitability issues (+10 points)
- **Growth Strategy**: Acquisition/new clients (+5 points)

**High-priority leads** (75+ points) are automatically flagged.

## 🎯 **Personalization Engine**

Recommendations are dynamically generated based on:
- Current maturity persona (P0-P4)
- Operational challenges
- Growth strategy
- KPI ownership structure
- Technology readiness

## 🤝 **Contributing**

Created with assisstance from Byron Hubbard and Preston Howell

## 📄 **License**

Private commercial project - All rights reserved.

---

**Built by Raymond Zhang for Resultant**
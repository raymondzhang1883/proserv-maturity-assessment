# Professional Services KPI Maturity Assessment

## Overview

This assessment evaluates professional services organizations' maturity in measuring and managing key performance indicators (KPIs). The assessment generates a persona score (P0-P4) representing data maturity levels from "Ad Hoc / Fire-fighting" to "Strategic / Value Multiplier."

## Assessment Structure

The assessment is organized into 5 main sections:

1. **Business Context** - Company size and operational challenges
2. **KPI Coverage** - Which performance indicators are tracked
3. **Reliability & Latency** - Data confidence and reporting speed
4. **Tooling & Architecture** - Technology stack and team capabilities
5. **Usage & Forecasting** - Data usage and predictive capabilities

## Core KPIs Evaluated

The assessment focuses on 6 fundamental professional services KPIs:

- Billable-utilization %
- Average bill / realized rate
- Project gross-margin %
- Revenue-forecast accuracy
- Bench cost (idle hours × loaded rate)
- Client satisfaction / NPS

## Detailed Questions and Answer Choices

### Section 1: Business Context

**E2: What is your company size by number of employees?**
- 1-25 employees
- 26-100 employees
- 101-500 employees
- 501-1,000 employees
- 1,000+ employees

**E15: Your biggest operational challenge?**
- Hiring & retention
- Project profitability
- Cost of client acquisition
- Capacity planning & utilization
- Pricing / rate realization
- Cash-flow management

### Section 2: KPI Coverage

**A1: Which performance indicators does your team review at least monthly?**
*(Multi-select - Select all that apply)*
- Billable-utilization %
- Average bill / realized rate
- Project gross-margin %
- Revenue-forecast accuracy
- Bench cost (idle hours × loaded rate)
- Client satisfaction / NPS
- None of the above or I don't know

### Section 3: Reliability & Latency

**B2: How confident are you in those numbers?**
*(Slider: 0-10 scale)*
- Left Label: Not confident
- Right Label: Completely confident

**B3: How soon after month-end are your core KPIs ready?**
- Same day
- Within 1 week
- 1–2 weeks
- More than 2 weeks / Not sure

**B4: Roughly what share of your KPI data still needs manual fixes every month?**
- Nothing
- Very little
- Around half
- More than half

**B5: Which data-quality issues are you most concerned about?**
*(Multi-select - Select all that apply)*
- Duplicate records
- Missing fields
- Inconsistent definitions
- Human error
- None - our data is reliable

### Section 4: Tooling & Architecture

**C6: Where do you compile or view KPIs today?**
*(Multi-select - Select all that apply)*
- PSA built-in dashboards
- Spreadsheets
- BI platform (Tableau / Power BI / Looker)
- We don't compile them consistently

**C7: How would you describe your data architecture?**
- Modern cloud warehouse with APIs
- Traditional database plus some integrations
- Multiple disconnected systems
- Mainly spreadsheets
- Unsure

**C8: Do you have an internal data / BI team?**
- Yes – dedicated
- Limited bandwidth
- None

**C9: Which business units have the least visibility into their numbers?**
*(Multi-select - Select all that apply)*
- Sales / Business Development
- Delivery / Project Mgmt
- Finance / Accounting
- Operations / Resource Mgmt
- Marketing / Client Success
- Leadership / Executive
- All units see what they need
- No unit has good visibility

### Section 5: Usage & Forecasting

**D11: Who relies on data for day-to-day decisions?**
*(Multi-select - Select all that apply)*
- Board of directors
- C-suite
- Department heads
- Project managers
- Individual contributors
- External stakeholders

**D13: Which statement best matches your forecasting ability?**
- We don't forecast
- Manual quarterly forecast in spreadsheets
- Automated monthly forecast in BI tool
- Scenario simulations & what-if analysis

## Scoring Methodology

### Individual Score Components

#### 1. Coverage Score (Weight: 1.0)
- Calculated as: (Number of selected KPIs / Total KPIs) × 10
- Excludes "None of the above" selections
- Range: 0-10 points

#### 2. Confidence Score (Weight: 1.0)
- Base score from B2 slider (0-10)
- Manual work penalty: Subtracts 2 × manual work level
  - Nothing: 0 penalty
  - Very little: -2 points
  - Around half: -4 points
  - More than half: -6 points
- Data quality bonus: +2 if "None - our data is reliable" selected
- Range: 0-10 points

#### 3. Latency Score (Weight: 0.7)
- Same day: 10 points
- Within 1 week: 8 points
- 1–2 weeks: 5 points
- More than 2 weeks / Not sure: 1 point

#### 4. Automation Score (Weight: 1.0)
- Uses combination of tools (C6), architecture (C7), and team (C8)
- Perfect automation configurations receive exact scores:
  - BI platform + Modern cloud + Dedicated team: 10 points
  - BI platform + Modern cloud + Limited team: 8 points
  - BI platform + Traditional DB + Dedicated team: 7 points
  - BI platform + Traditional DB + Limited team: 5 points
  - PSA dashboards + Modern cloud + Dedicated team: 6 points
  - PSA dashboards + Disconnected systems + Limited team: 3 points
  - Mixed tools + Disconnected systems + No team: 2 points
  - Spreadsheets + Mainly spreadsheets + No team: 1 point
- Partial matches use weighted scoring with base score of 1

#### 5. Forecast Score (Weight: 1.0)
- We don't forecast: 1 point
- Manual quarterly forecast in spreadsheets: 4 points
- Automated monthly forecast in BI tool: 7 points
- Scenario simulations & what-if analysis: 10 points

### Total Maturity Score
Total Score = (Coverage × 1) + (Confidence × 1) + (Latency × 0.7) + (Automation × 1) + (Forecast × 1)

Maximum possible score: 47 points

### Persona Assignment

Based on total score, organizations are assigned personas:

- **P4 (42+ points): Strategic / Value Multiplier**
  - Advanced analytics with real-time data and sophisticated forecasting
  - Data infrastructure as competitive differentiator
  
- **P3 (32-41 points): Predictive / Optimized**
  - Meaningful insights with good automation and alignment
  - Applied data for forecasting and modeling
  
- **P2 (22-31 points): Integrated / Insight-driven**
  - Centralized reporting from multiple sources
  - Data informs weekly decision-making
  
- **P1 (11-21 points): Standardized / Foundational**
  - Core metrics tracked with defined KPIs
  - Heavy reliance on manual processes
  
- **P0 (0-10 points): Ad Hoc / Fire-fighting**
  - Spreadsheet-based reporting with manual data collection
  - Minimal system alignment

## Lead Scoring

A separate lead scoring system evaluates sales potential by applying modifiers to the maturity score:

### Lead Score Modifiers

**Owner Modifiers:**
- Executive team (strategy): +15 points
- Finance (P&L focus): +10 points
- No clear owner: -5 points

**Timeline Modifiers:**
- Within 3 months: +15 points
- Later / just exploring: -5 points

**Challenge Modifiers:**
- Project profitability: +10 points
- Cash-flow management: +8 points
- Capacity planning & utilization: +6 points

**Growth Strategy Modifiers:**
- Win new clients: +5 points
- Acquire other firms: +5 points

### Lead Priority Levels

- **HIGH (75+ points): Priority Lead - High Intent & Authority**
- **MEDIUM (50-74 points): Qualified Lead**
- **LOW (<50 points): Information Seeker**

### Sales Alert Triggers

Immediate sales notifications are triggered for:
- High-priority leads (75+ points) with "Within 3 months" timeline
- Executive decision makers with 60+ lead score

## Personalized Recommendations

Each persona receives tailored recommendations:

### P0 Recommendations
- Conduct strategic data roadmap and standardize processes
- Create shared glossary for metric definitions
- Start with automating billable-utilization and gross-margin feeds

### P1 Recommendations
- Centralize reporting with automated dashboards
- Add forecast accuracy tracking
- Launch sprint-based implementations for quick value

### P2 Recommendations
- Layer predictive metrics and leading indicators
- Implement automated alerts for utilization/margin trends
- Implement scalable data platform focused on business use cases

### P3 Recommendations
- Build scenario planning with "what-if" models
- Add client profitability segmentation
- Embed analytics in operations with self-service BI

### P4 Recommendations
- Advanced analytics with machine learning for forecasting
- Build competitive benchmarking dashboards
- Adopt managed services and mature DataOps practices

## Technical Implementation Notes

- Assessment uses React frontend with modular service architecture
- Scoring engines are independent and can be tested separately
- Lead scoring and persona assignment happen server-side
- Results include comprehensive breakdown for transparency
- System supports GDPR compliance and marketing opt-ins
- Integration points prepared for CRM, email marketing, and analytics platforms
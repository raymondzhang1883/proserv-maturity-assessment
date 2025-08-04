# Professional Services KPI Maturity Assessment

## Overview

This assessment evaluates professional services organizations' maturity in measuring and managing key performance indicators (KPIs). The assessment generates a persona score (P0-P4) representing data maturity levels from "Ad Hoc / Fire-fighting" to "Strategic / Value Multiplier."

## Core KPIs Evaluated

The assessment focuses on 6 fundamental professional services KPIs:

- Billable-utilization %
- Average bill / realized rate
- Project gross-margin %
- Revenue-forecast accuracy
- Bench cost (idle hours × loaded rate)
- Client satisfaction / NPS

## Scoring Structure

The assessment evaluates **5 core dimensions** using **9 questions** to calculate a composite maturity score:

1. **Coverage Score** (Weight: 1.0) - 1 question
2. **Confidence Score** (Weight: 1.0) - 3 questions  
3. **Latency Score** (Weight: 0.7) - 1 question
4. **Automation Score** (Weight: 1.0) - 3 questions
5. **Forecast Score** (Weight: 1.0) - 1 question

### Composite Score Formula

**Total Score = (Coverage × 1.0) + (Confidence × 1.0) + (Latency × 0.7) + (Automation × 1.0) + (Forecast × 1.0)**

**Maximum Possible Score: 47 points**
- Coverage: 10 points × 1.0 = 10
- Confidence: 10 points × 1.0 = 10  
- Latency: 10 points × 0.7 = 7
- Automation: 10 points × 1.0 = 10
- Forecast: 10 points × 1.0 = 10
- **Total: 47 points**

---

## 📊 Coverage Score (Weight: 1.0)
*Maximum: 10 points*

**A1: Which performance indicators does your team review at least monthly?**
*(Multi-select - Select all that apply)*

- Billable-utilization % **(1.67 points)**
- Average bill / realized rate **(1.67 points)**
- Project gross-margin % **(1.67 points)**
- Revenue-forecast accuracy **(1.67 points)**
- Bench cost (idle hours × loaded rate) **(1.67 points)**
- Client satisfaction / NPS **(1.67 points)**
- None of the above or I don't know **(0 points)**

**Calculation:** `Math.round((selected KPIs / 6) × 10)`

---

## 🎯 Confidence Score (Weight: 1.0)
*Maximum: 10 points*

**B2: How confident are you in those numbers?**
*(Slider: 0-10 scale)*

- Scale from 0 (Not confident) to 10 (Completely confident) **(0-10 base points)**

**B4: Roughly what share of your KPI data still needs manual fixes every month?**

- Nothing **(0 penalty)**
- Very little **(-2 points penalty)**
- Around half **(-4 points penalty)**
- More than half **(-6 points penalty)**

**B5: Which data-quality issues are you most concerned about?**
*(Multi-select - Select all that apply)*

- Duplicate records **(0 bonus)**
- Missing fields **(0 bonus)**
- Inconsistent definitions **(0 bonus)**
- Human error **(0 bonus)**
- None - our data is reliable **(+2 points bonus)**

**Calculation:** `Math.max(0, Math.min(10, B2_slider - manual_penalty + quality_bonus))`

---

## ⚡ Latency Score (Weight: 0.7)
*Maximum: 10 points (weighted to 7)*

**B3: How soon after month-end are your core KPIs ready?**

- Same day **(10 points)**
- Within 1 week **(8 points)**
- 1–2 weeks **(5 points)**
- More than 2 weeks / Not sure **(1 point)**

**Weighted Contribution:** `Latency Score × 0.7`

---

## 🔧 Automation Score (Weight: 1.0)
*Maximum: 10 points*

**C6: Where do you compile or view KPIs today?**
*(Multi-select - Select all that apply)*

- PSA built-in dashboards **(+2 points)**
- Spreadsheets **(base score only)**
- BI platform (Tableau / Power BI / Looker) **(+3 points)**
- We don't compile them consistently **(base score only)**

**C7: How would you describe your data architecture?**

- Modern cloud warehouse with APIs **(+3 points)**
- Traditional database plus some integrations **(+1 point)**
- Multiple disconnected systems **(base score only)**
- Mainly spreadsheets **(base score only)**
- Unsure **(base score only)**

**C8: Do you have an internal data / BI team?**

- Yes – dedicated **(+2 points)**
- Limited bandwidth **(+1 point)**
- None **(base score only)**

### Perfect Configuration Bonuses
*If exact combinations match, receive fixed scores:*

- **['BI platform'] + 'Modern cloud' + 'Dedicated team' = 10 points**
- **['BI platform'] + 'Modern cloud' + 'Limited team' = 8 points**
- **['BI platform'] + 'Traditional DB' + 'Dedicated team' = 7 points**
- **['BI platform'] + 'Traditional DB' + 'Limited team' = 5 points**
- **['PSA dashboards'] + 'Modern cloud' + 'Dedicated team' = 6 points**
- **['PSA dashboards'] + 'Disconnected systems' + 'Limited team' = 3 points**
- **['PSA dashboards', 'Spreadsheets'] + 'Disconnected systems' + 'None' = 2 points**
- **['Spreadsheets'] + 'Mainly spreadsheets' + 'None' = 1 point**

**Calculation:** Perfect match = fixed score, otherwise: `Math.min(10, 1 + tool_points + architecture_points + team_points)`

---

## 🔮 Forecast Score (Weight: 1.0)
*Maximum: 10 points*

**D13: Which statement best matches your forecasting ability?**

- We don't forecast **(1 point)**
- Manual quarterly forecast in spreadsheets **(4 points)**
- Automated monthly forecast in BI tool **(7 points)**
- Scenario simulations & what-if analysis **(10 points)**

---

## Persona Assignment

Based on total score, organizations are assigned personas:

- **P4 (42-47 points): Strategic / Value Multiplier**
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

## Example Score Calculation

**Sample Responses:**
- A1: 4 out of 6 KPIs selected → Coverage = `(4/6) × 10 = 6.67 → 7 points`
- B2: Confidence slider = 8, B4: "Very little" manual work, B5: No quality bonus → Confidence = `8 - 2 + 0 = 6 points`
- B3: "Within 1 week" → Latency = `8 points`
- C6+C7+C8: No perfect match, BI platform + Traditional DB + Limited team → Automation = `1 + 3 + 1 + 1 = 6 points`
- D13: "Automated monthly forecast" → Forecast = `7 points`

**Total Score:**
`(7 × 1.0) + (6 × 1.0) + (8 × 0.7) + (6 × 1.0) + (7 × 1.0)`
`= 7 + 6 + 5.6 + 6 + 7 = 31.6 → 32 points`

**Result: P3 - Predictive / Optimized**

## Technical Implementation

- **Code Location:** `src/services/scoringEngine.js`
- **Configuration:** `src/config/scoringRules.js`, `src/config/personas.js`
- **Questions:** `src/config/questions.js`
- **Persona Logic:** `src/services/personaEngine.js`

All scoring is deterministic and reproducible. The system tracks missing KPIs separately for recommendations but they do not affect the core persona score calculation.
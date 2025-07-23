export const PERSONA_THRESHOLDS = {
  P4: 42,
  P3: 32,
  P2: 22,
  P1: 11,
  P0: 0
};

export const PERSONA_LABELS = {
  P4: 'Strategic / Value Multiplier',
  P3: 'Predictive / Optimized',
  P2: 'Integrated / Insight-driven',
  P1: 'Standardized / Foundational',
  P0: 'Ad Hoc / Fire-fighting'
};

export const PERSONA_DESCRIPTIONS = {
  P0: 'You\'re starting your KPI journey. Most reporting happens in spreadsheets with manual data collection. You have minimal system alignment and business unit proccesses vary.',
  P1: 'You track core metrics and have defined KPIs but rely heavily on manual processes. Basic reporting infrastructure is in place but are hindsight-oriented.',
  P2: 'You aggregate data from multiple sources into centralized, trusted reports. Data informs weekly decision-making.',
  P3: 'You build meaningful insights from your data with good automation and business unit alignment. You apply data to forecasting, pricing, inventory, and churn modelling.',
  P4: 'You optimize strategy using advanced analytics, real-time data, and sophisticated forecasting models. Data infrastructure is a differentiator that enables M&A support, GTM agility, and rapid scaling.'
};

export const BASE_RECOMMENDATIONS = {
  P0: [
    'Conduct a strategic data roadmap, standardise processes, and define which KPIs matter and how to measure them.',
    'Create a shared glossary so everyone means the same thing by "margin" and "utilization."',
    'Start small: Automate billable-utilization and gross-margin feeds to replace manual spreadsheets.'
  ],
  P1: [
    'Centralise reporting: Move from scattered spreadsheets to a single dashboard that updates automatically.',
    'Add forecast accuracy tracking to catch revenue surprises before they hit P&L.',
    'Launch sprint-based implementations that prove value quickly and standardise metric definitions across business units.'
  ],
  P2: [
    'Layer predictive metrics: Add leading indicators like pipeline velocity and resource demand forecasting.',
    'Implement automated alerts when utilization or margin trends outside acceptable ranges.',
    'Implement a scalable data platform (preferably SaaS) focused on high-value business use cases.'
  ],
  P3: [
    'Build scenario planning: Create "what-if" models for utilization drops, rate changes, and market shifts.',
    'Add client profitability segmentation to focus growth efforts on highest-value relationships.',
    'Embed analytics in operations, introduce self-service BI, and strengthen data quality management.'
  ],
  P4: [
    'Advanced analytics: Layer machine learning for demand forecasting and optimal resource allocation.',
    'Build competitive benchmarking dashboards using industry data sources.',
    'Adopt managed services to reduce run-rate costs while ensuring platform continuity, and mature DataOps practices to maintain momentum.'
  ]
};

//Removed
export const CHALLENGE_RECOMMENDATIONS = {
  'Project profitability': 'Implement real-time project margin alerts and weekly profit variance reports to catch overruns early.',
  'Hiring & retention': 'Add utilization forecasting and skills gap analysis to predict hiring needs 6-8 weeks ahead.',
  'Cost of client acquisition': 'Track sales pipeline velocity and client acquisition cost per service line to optimize marketing spend.',
  'Capacity planning & utilization': 'Build resource demand forecasting with project pipeline integration for better capacity allocation.',
  'Cash-flow management': 'Connect project milestones to AR aging and cash flow projections for predictable revenue timing.'
};
//Removed
export const GROWTH_STRATEGY_RECOMMENDATIONS = {
  'Win new clients': 'Prioritize sales efficiency KPIs: pipeline conversion rates, proposal win rates, and client acquisition cost by channel.',
  'Grow existing clients': 'Focus on client satisfaction and account expansion metrics: NPS trends, upsell rates, and wallet share analysis.',
  'Launch new service lines': 'Track innovation metrics: time-to-market for new services, early adoption rates, and service line profitability.',
  'Acquire other firms': 'Build integration KPIs: cultural alignment scores, talent retention rates, and synergy realization tracking.'
};

 
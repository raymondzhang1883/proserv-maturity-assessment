export const PERSONA_THRESHOLDS = {
  P4: 49,
  P3: 37,
  P2: 25,
  P1: 13,
  P0: 0
};

export const PERSONA_LABELS = {
  P4: 'Strategic Optimiser',
  P3: 'Insight Builder',
  P2: 'Data Aggregator',
  P1: 'Basic Tracker',
  P0: 'KPI Newcomer'
};

export const PERSONA_DESCRIPTIONS = {
  P0: 'You\'re starting your KPI journey. Most reporting happens in spreadsheets with manual data collection.',
  P1: 'You track core metrics but rely heavily on manual processes. Basic reporting infrastructure is in place.',
  P2: 'You aggregate data from multiple sources into centralized reports. Some automation exists but gaps remain.',
  P3: 'You build meaningful insights from your data with good automation and predictive capabilities.',
  P4: 'You optimize strategy using advanced analytics, real-time data, and sophisticated forecasting models.'
};

export const BASE_RECOMMENDATIONS = {
  P0: [
    'Start small: Automate billable-utilisation and gross-margin feeds to replace manual spreadsheets.',
    'Create a shared glossary so everyone means the same thing by "margin" and "utilisation."',
    'Set a 90-day goal to reduce manual data fixes from current level to the next lower tier.'
  ],
  P1: [
    'Centralise reporting: Move from scattered spreadsheets to a single dashboard that updates automatically.',
    'Add forecast accuracy tracking to catch revenue surprises before they hit P&L.',
    'Establish monthly KPI review cadence with clear owners for each metric.'
  ],
  P2: [
    'Layer predictive metrics: Add leading indicators like pipeline velocity and resource demand forecasting.',
    'Implement automated alerts when utilisation or margin trends outside acceptable ranges.',
    'Connect KPIs to cash-flow projections for better working capital management.'
  ],
  P3: [
    'Build scenario planning: Create "what-if" models for utilisation drops, rate changes, and market shifts.',
    'Add client profitability segmentation to focus growth efforts on highest-value relationships.',
    'Implement real-time project health scoring to prevent margin leakage.'
  ],
  P4: [
    'Advanced analytics: Layer machine learning for demand forecasting and optimal resource allocation.',
    'Build competitive benchmarking dashboards using industry data sources.',
    'Create executive scorecard with forward-looking strategic KPIs tied to company objectives.'
  ]
};

export const CHALLENGE_RECOMMENDATIONS = {
  'Project profitability': 'Implement real-time project margin alerts and weekly profit variance reports to catch overruns early.',
  'Hiring & retention': 'Add utilization forecasting and skills gap analysis to predict hiring needs 6-8 weeks ahead.',
  'Cost of client acquisition': 'Track sales pipeline velocity and client acquisition cost per service line to optimize marketing spend.',
  'Capacity planning & utilisation': 'Build resource demand forecasting with project pipeline integration for better capacity allocation.',
  'Cash-flow management': 'Connect project milestones to AR aging and cash flow projections for predictable revenue timing.'
};

export const GROWTH_STRATEGY_RECOMMENDATIONS = {
  'Win new clients': 'Prioritize sales efficiency KPIs: pipeline conversion rates, proposal win rates, and client acquisition cost by channel.',
  'Grow existing clients': 'Focus on client satisfaction and account expansion metrics: NPS trends, upsell rates, and wallet share analysis.',
  'Launch new service lines': 'Track innovation metrics: time-to-market for new services, early adoption rates, and service line profitability.',
  'Acquire other firms': 'Build integration KPIs: cultural alignment scores, talent retention rates, and synergy realization tracking.'
};

export const OWNER_MESSAGING_MODIFICATIONS = {
  'Finance (P&L focus)': {
    'Add ': 'Calculate ROI impact of adding ',
    'Implement ': 'Deploy cost-effective ',
    'Build ': 'Invest in '
  },
  'Operations (efficiency)': {
    'Add ': 'Streamline operations by adding ',
    'Implement ': 'Automate processes with ',
    'Build ': 'Systematize '
  }
}; 
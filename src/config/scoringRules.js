export const MANUAL_WORK_SCORING = {
  'Nothing': 0,
  'Very little': 1,
  'Around half': 2,
  'More than half': 3
};

export const LATENCY_SCORING = {
  'Same day': 10,
  'Within 1 week': 8,
  '1–2 weeks': 5,
  'More than 2 weeks / Not sure': 1
};

export const FORECAST_SCORING = {
  "We don't forecast": 1,
  'Manual quarterly forecast in spreadsheets': 4,
  'Automated monthly forecast in BI tool': 7,
  'Scenario simulations & what-if analysis': 10
};

export const LATENCY_LABELS = {
  'Same day': 'same day',
  'Within 1 week': 'within a week',
  '1–2 weeks': '1-2 weeks',
  'More than 2 weeks / Not sure': 'more than 2 weeks'
};

export const AUTOMATION_MATRIX = {
  // Format: [tools, architecture, team] -> score
  PERFECT_AUTOMATION: {
    tools: ['BI platform (Tableau / Power BI / Looker)'],
    architecture: 'Modern cloud warehouse with APIs',
    team: 'Yes – dedicated',
    score: 10
  },
  ADVANCED_BI_LIMITED_TEAM: {
    tools: ['BI platform (Tableau / Power BI / Looker)'],
    architecture: 'Modern cloud warehouse with APIs',
    team: 'Limited bandwidth',
    score: 8
  },
  TRADITIONAL_BI: {
    tools: ['BI platform (Tableau / Power BI / Looker)'],
    architecture: 'Traditional database plus some integrations',
    team: 'Limited bandwidth',
    score: 5
  },
  TRADITIONAL_BI_DEDICATED: {
    tools: ['BI platform (Tableau / Power BI / Looker)'],
    architecture: 'Traditional database plus some integrations',
    team: 'Yes – dedicated',
    score: 7
  },
  PSA_DISCONNECTED: {
    tools: ['PSA built-in dashboards'],
    architecture: 'Multiple disconnected systems',
    team: 'Limited bandwidth',
    score: 3
  },
  PSA_MODERN_DEDICATED: {
    tools: ['PSA built-in dashboards'],
    architecture: 'Modern cloud warehouse with APIs',
    team: 'Yes – dedicated',
    score: 6
  },
  BASIC_SPREADSHEETS: {
    tools: ['Spreadsheets'],
    architecture: 'Mainly spreadsheets',
    team: 'None',
    score: 1
  },
  MIXED_TOOLS_DISCONNECTED: {
    tools: ['PSA built-in dashboards', 'Spreadsheets'],
    architecture: 'Multiple disconnected systems',
    team: 'None',
    score: 2
  }
};

export const AUTOMATION_SCORING_WEIGHTS = {
  BI_PLATFORM: 3,
  PSA_DASHBOARDS: 2,
  MODERN_CLOUD: 3,
  TRADITIONAL_DB: 1,
  DEDICATED_TEAM: 2,
  LIMITED_TEAM: 1
};


export const LEAD_SCORING_WEIGHTS = {
  OWNER_MODIFIERS: {
    'Executive team (strategy)': 15,
    'Finance (P&L focus)': 10,
    'No clear owner': -5
  },
  TIMELINE_MODIFIERS: {
    'Within 3 months': 15,
    'Later / just exploring': -5
  },
  CHALLENGE_MODIFIERS: {
    'Project profitability': 10,
    'Cash-flow management': 8,
    'Capacity planning & utilisation': 6
  },
  GROWTH_MODIFIERS: {
    'Win new clients': 5,
    'Acquire other firms': 5
  }
};

export const CTA_CONFIGURATIONS = {
  CHALLENGE_BASED: {
    'Project profitability': {
      valueProposition: 'Download your margin protection playbook with proven KPIs that catch profit leaks before they hit P&L.',
      secondaryCTA: 'Book Profitability Assessment'
    },
    'Hiring & retention': {
      valueProposition: 'Get your resource planning toolkit with KPIs that predict hiring needs and capacity gaps.',
      secondaryCTA: 'Book Workforce Planning Review'
    },
    'Cash-flow management': {
      valueProposition: 'Access your cash flow forecasting framework with KPIs that predict revenue timing and AR issues.',
      secondaryCTA: 'Book Cash Flow Strategy Call'
    }
  },
  TIMELINE_MODIFIERS: {
    'Within 3 months': 'Priority',
    'Later / just exploring': 'Schedule Future Planning Call'
  },
  OWNER_MODIFIERS: {
    'Executive team (strategy)': '45-min Executive',
    'Finance (P&L focus)': 'ROI Discussion'
  }
};

export const SCORING_CALCULATIONS = {
  COVERAGE_WEIGHT: 1,
  CONFIDENCE_WEIGHT: 1,
  LATENCY_WEIGHT: 0.7,
  AUTOMATION_WEIGHT: 1,
  FORECAST_WEIGHT: 1
}; 
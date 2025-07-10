export const sections = [
  { id: 'context', title: 'Business Context', icon: 'Target' },
  { id: 'coverage', title: 'KPI Coverage', icon: 'BarChart3' },
  { id: 'reliability', title: 'Reliability & Latency', icon: 'Settings' },
  { id: 'tooling', title: 'Tooling & Architecture', icon: 'Building' },
  { id: 'usage', title: 'Usage & Governance', icon: 'Users' }
];

export const allKPIs = [
  'Billable-utilisation %',
  'Average bill / realised rate',
  'Project gross-margin %',
  'Revenue-forecast accuracy',
  'Bench cost (idle hours × loaded rate)',
  'Client satisfaction / NPS'
];

export const questions = {
  coverage: [
    {
      id: 'A1',
      question: 'Which performance indicators does your team review at least monthly?',
      type: 'multi-select',
      note: 'Select all that apply',
      options: [
        'Billable-utilisation %',
        'Average bill / realised rate',
        'Project gross-margin %',
        'Revenue-forecast accuracy',
        'Bench cost (idle hours × loaded rate)',
        'Client satisfaction / NPS',
        "None of the above or I don't know"
      ]
    }
  ],
  reliability: [
    {
      id: 'B2',
      question: 'How confident are you in those numbers?',
      type: 'slider',
      min: 0,
      max: 10,
      leftLabel: 'Not confident',
      rightLabel: 'Completely confident'
    },
    {
      id: 'B3',
      question: 'How soon after month-end are your core KPIs ready?',
      type: 'single-select',
      options: [
        'Same day',
        'Within 1 week',
        '1–2 weeks',
        'More than 2 weeks / Not sure'
      ]
    },
    {
      id: 'B4',
      question: 'Roughly what share of your KPI data still needs manual fixes every month?',
      type: 'single-select',
      options: [
        'Mostly Automated',
        'Partially Automated',
        'Somewhat Automated',
        'Mostly Manual'
      ]
    },
    {
      id: 'B5',
      question: 'Which data-quality issues are you most concerned about?',
      type: 'multi-select',
      note: 'Select all that apply',
      options: [
        'Duplicate records',
        'Missing fields',
        'Inconsistent definitions',
        'Human error',
        'None - our data is reliable'
      ]
    }
  ],
  tooling: [
    {
      id: 'C6',
      question: 'Where do you compile or view KPIs today?',
      type: 'multi-select',
      note: 'Select all that apply',
      options: [
        'PSA built-in dashboards',
        'Spreadsheets',
        'BI platform (Tableau / Power BI / Looker)',
        "We don't compile them consistently"
      ]
    },
    {
      id: 'C7',
      question: 'How would you describe your data architecture?',
      type: 'single-select',
      options: [
        'Modern cloud warehouse with APIs',
        'Traditional database plus some integrations',
        'Multiple disconnected systems',
        'Mainly spreadsheets',
        'Unsure'
      ]
    },
    {
      id: 'C8',
      question: 'Do you have an internal data / BI team?',
      type: 'single-select',
      options: [
        'Yes – dedicated',
        'Limited bandwidth',
        'None'
      ]
    },
    {
      id: 'C9',
      question: 'Which business units have the least visibility into their numbers?',
      type: 'multi-select',
      note: 'Select all that apply',
      options: [
        'Sales / Business Development',
        'Delivery / Project Mgmt',
        'Finance / Accounting',
        'Operations / Resource Mgmt',
        'Marketing / Client Success',
        'Leadership / Executive',
        'All units see what they need',
        'No unit has good visibility'
      ]
    }
  ],
  usage: [
    {
      id: 'D10',
      question: 'Who sets the KPI agenda in your firm?',
      type: 'single-select',
      options: [
        'Finance (P&L focus)',
        'Operations (efficiency)',
        'Sales leadership (growth)',
        'Executive team (strategy)',
        'Client success (retention)',
        'No clear owner'
      ]
    },
    {
      id: 'D11',
      question: 'Who relies on data for day-to-day decisions?',
      type: 'multi-select',
      note: 'Select all that apply',
      options: [
        'Board of directors',
        'C-suite',
        'Department heads',
        'Project managers',
        'Individual contributors',
        'External stakeholders'
      ]
    },
    {
      id: 'D12',
      question: 'What is your single biggest KPI pain right now?',
      type: 'single-select',
      options: [
        "Can't trust the numbers",
        'Reports arrive too slowly',
        "We're missing key KPIs",
        'Forecasts miss the mark',
        'Other / Not sure'
      ]
    },
    {
      id: 'D13',
      question: 'Which statement best matches your forecasting ability?',
      type: 'single-select',
      options: [
        "We don't forecast",
        'Manual quarterly forecast in spreadsheets',
        'Automated monthly forecast in BI tool',
        'Scenario simulations & what-if analysis'
      ]
    },
    {
      id: 'D14',
      question: 'How would you describe your current ability to manage project load and employee needs?',
      type: 'single-select',
      options: [
        'Very efficiently',
        'Moderately well',
        'Functional',
        'We don\'t manage load and employee needs well'
      ]
    },
    {
      id: 'D15',
      question: 'How would you rate your current ability to balance project load with supporting employee capacity and wellbeing?',
      type: 'single-select',
      options: [
        'Very efficiently',
        'Well, but with occasional strain',
        'Adequate',
        'Poorly managed',
        'Not managed at all'
      ]
    }
  ],
  context: [
    {
      id: 'E1',
      question: 'What industry best describes your professional services firm?',
      type: 'single-select',
      options: [
        'Legal Services / Law Firms',
        'Management Consulting',
        'Technology Consulting',
        'Financial Advisory / Investment Banking',
        'Accounting / CPA Firms',
        'Marketing / Advertising Agencies',
        'Architecture / Engineering',
        'Human Resources Consulting',
        'Healthcare Consulting',
        'Other Professional Services'
      ]
    },
    {
      id: 'E2',
      question: 'What is your company size by number of employees?',
      type: 'single-select',
      options: [
        '1-25 employees',
        '26-100 employees',
        '101-500 employees',
        '501-1,000 employees',
        '1,000+ employees'
      ]
    },
    {
      id: 'E3',
      question: 'What is your approximate annual revenue range?',
      type: 'single-select',
      options: [
        'Under $5M',
        '$5M - $25M',
        '$25M - $100M',
        '$100M+',
        'Prefer not to disclose'
      ]
    },
    {
      id: 'E14',
      question: "What is your firm's primary growth strategy?",
      type: 'single-select',
      options: [
        'Grow existing clients',
        'Win new clients',
        'Launch new service lines',
        'Acquire other firms',
        'Maintain current scale'
      ]
    },
    {
      id: 'E15',
      question: 'Your biggest operational challenge?',
      type: 'single-select',
      options: [
        'Hiring & retention',
        'Project profitability',
        'Cost of client acquisition',
        'Capacity planning & utilisation',
        'Pricing / rate realisation',
        'Cash-flow management'
      ]
    },
    {
      id: 'E16',
      question: 'How are current market conditions affecting you?',
      type: 'single-select',
      options: [
        'High demand, strong pricing',
        'Steady demand, competitive pricing',
        'Softening demand, price pressure',
        'Uncertain market, playing defence',
        'Little impact'
      ]
    },
    {
      id: 'E17',
      question: 'What would success look like for a KPI upgrade?',
      type: 'multi-select',
      note: 'Select all that apply',
      options: [
        'Faster decisions',
        'Higher project margin',
        'Better resource utilisation',
        'Happier clients',
        'Less admin overhead',
        'Stronger competitive edge'
      ]
    },
    {
      id: 'E18',
      question: "What's the biggest constraint to improving KPIs?",
      type: 'single-select',
      options: [
        'Tech budget',
        'In-house expertise',
        'Time / competing work',
        'Exec buy-in',
        'Change-management bandwidth',
        'Unsure of ROI'
      ]
    },
    {
      id: 'E19',
      question: 'When would you like to tackle KPI improvements?',
      type: 'single-select',
      options: [
        'Within 3 months',
        '3–6 months',
        'Later / just exploring'
      ]
    }
  ]
}; 
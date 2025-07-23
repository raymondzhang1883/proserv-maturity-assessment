export const sections = [
  { id: 'context', title: 'Business Context', icon: 'Target' },
  { id: 'coverage', title: 'KPI Coverage', icon: 'BarChart3' },
  { id: 'reliability', title: 'Reliability & Latency', icon: 'Settings' },
  { id: 'tooling', title: 'Tooling & Architecture', icon: 'Building' },
  { id: 'usage', title: 'Usage & Forecasting', icon: 'Users' }
];

export const allKPIs = [
  'Billable-utilization %',
  'Average bill / realized rate',
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
        'Billable-utilization %',
        'Average bill / realized rate',
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
        'Nothing',
        'Very little',
        'Around half',
        'More than half'
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
      id: 'D13',
      question: 'Which statement best matches your forecasting ability?',
      type: 'single-select',
      options: [
        "We don't forecast",
        'Manual quarterly forecast in spreadsheets',
        'Automated monthly forecast in BI tool',
        'Scenario simulations & what-if analysis'
      ]
    }
  ],
  context: [
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
      id: 'E15',
      question: 'Your biggest operational challenge?',
      type: 'single-select',
      options: [
        'Hiring & retention',
        'Project profitability',
        'Cost of client acquisition',
        'Capacity planning & utilization',
        'Pricing / rate realization',
        'Cash-flow management'
      ]
    }
  ]
}; 
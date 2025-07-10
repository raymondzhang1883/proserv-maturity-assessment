import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Download, Calendar, BarChart3, Settings, Users, Building, Target } from 'lucide-react';

/* 
 * DATABASE INTEGRATION READY
 * 
 * Data Structure for Future API/Database Implementation:
 * 
 * Main Table: kpi_assessments
 * - session_id (VARCHAR, PRIMARY KEY)
 * - timestamp (DATETIME)
 * - assessment_version (VARCHAR)
 * - industry (VARCHAR)
 * - company_size (VARCHAR) 
 * - annual_revenue (VARCHAR)
 * - growth_strategy (VARCHAR)
 * - operational_challenge (VARCHAR)
 * - market_conditions (VARCHAR)
 * - success_criteria (JSON/TEXT)
 * - constraints (VARCHAR)
 * - timeline (VARCHAR)
 * - kpi_coverage (JSON/TEXT)
 * - confidence_score (INTEGER)
 * - reporting_speed (VARCHAR)
 * - manual_work_percentage (VARCHAR)
 * - data_quality_issues (JSON/TEXT)
 * - reporting_tools (JSON/TEXT)
 * - data_architecture (VARCHAR)
 * - internal_team (VARCHAR)
 * - visibility_gaps (JSON/TEXT)
 * - kpi_ownership (VARCHAR)
 * - data_users (JSON/TEXT)
 * - biggest_pain (VARCHAR)
 * - forecasting_capability (VARCHAR)
 * - project_load_management (VARCHAR)
 * - work_life_balance (VARCHAR)
 * - maturity_score (INTEGER)
 * - persona (VARCHAR)
 * - persona_label (VARCHAR)
 * - lead_score (INTEGER)
 * - gdpr_consent (BOOLEAN)
 * - marketing_opt_in (BOOLEAN)
 * - raw_answers (JSON/TEXT)
 * 
 * Integration Points:
 * - CRM: Lead scoring (75+ = high priority)
 * - Email Marketing: Persona-based campaigns
 * - Analytics: Conversion funnel tracking
 * - Sales: Qualified lead notifications
 */

const ProServKPIAssessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(true);

  const sections = [
    { id: 'context', title: 'Business Context', icon: Target },
    { id: 'coverage', title: 'KPI Coverage', icon: BarChart3 },
    { id: 'reliability', title: 'Reliability & Latency', icon: Settings },
    { id: 'tooling', title: 'Tooling & Architecture', icon: Building },
    { id: 'usage', title: 'Usage & Governance', icon: Users }
  ];

  const allKPIs = [
    'Billable-utilisation %',
    'Average bill / realised rate',
    'Project gross-margin %',
    'Revenue-forecast accuracy',
    'Bench cost (idle hours × loaded rate)',
    'Client satisfaction / NPS'
  ];

  const questions = {
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

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Centralized data preparation function - ready for future API/database integration
  const prepareUserData = () => {
    const timestamp = new Date().toISOString();
    const calculatedScores = calculateScores();
    
    return {
      // Metadata
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: timestamp,
      assessmentVersion: 'v3.0',
      
      // Demographics (from Business Context section)
      demographics: {
        industry: answers.E1 || null,
        companySize: answers.E2 || null,
        annualRevenue: answers.E3 || null,
      },
      
      // Business Context
      businessContext: {
        growthStrategy: answers.E14 || null,
        operationalChallenge: answers.E15 || null,
        marketConditions: answers.E16 || null,
        successCriteria: answers.E17 || null,
        constraints: answers.E18 || null,
        timeline: answers.E19 || null,
      },
      
      // KPI Assessment Answers
      kpiAssessment: {
        coverage: answers.A1 || null,
        confidence: answers.B2 || null,
        reportingSpeed: answers.B3 || null,
        manualWork: answers.B4 || null,
        dataQualityIssues: answers.B5 || null,
        reportingTools: answers.C6 || null,
        dataArchitecture: answers.C7 || null,
        internalTeam: answers.C8 || null,
        visibilityGaps: answers.C9 || null,
        kpiOwnership: answers.D10 || null,
        dataUsers: answers.D11 || null,
        biggestPain: answers.D12 || null,
        forecastingCapability: answers.D13 || null,
        projectLoadManagement: answers.D14 || null,
        workLifeBalance: answers.D15 || null,
      },
      
      // Calculated Results
      results: {
        scores: calculatedScores,
        persona: calculatedScores.persona,
        personaLabel: calculatedScores.personaLabel,
        totalScore: calculatedScores.total,
        leadScore: calculateLeadScore(calculatedScores),
      },
      
      // User Consent & Preferences
      consent: {
        gdprConsent: gdprConsent,
        marketingOptIn: gdprConsent, // Could be separate field later
      },
      
      // Raw answers object for backup/debugging
      rawAnswers: answers
    };
  };

  const calculateLeadScore = (scores) => {
    const context = {
      owner: answers.D10 || '',
      timeline: answers.E19 || '',
      challenge: answers.E15 || '',
      growth: answers.E14 || ''
    };
    
    let leadScore = scores.total;
    if (context.owner === 'Executive team (strategy)') leadScore += 15;
    else if (context.owner === 'Finance (P&L focus)') leadScore += 10;
    else if (context.owner === 'No clear owner') leadScore -= 5;
    if (context.timeline === 'Within 3 months') leadScore += 15;
    else if (context.timeline === 'Later / just exploring') leadScore -= 5;
    if (context.challenge === 'Project profitability') leadScore += 10;
    else if (context.challenge === 'Cash-flow management') leadScore += 8;
    else if (context.challenge === 'Capacity planning & utilisation') leadScore += 6;
    if (context.growth === 'Win new clients' || context.growth === 'Acquire other firms') leadScore += 5;
    
    return Math.max(0, leadScore);
  };

  const getAutomationScore = (c6, c7, c8) => {
    const c6Array = c6 || [];
    const architecture = c7 || '';
    const team = c8 || '';

    if (c6Array.includes('Spreadsheets') && architecture.includes('Mainly spreadsheets') && team === 'None') {
      return 1;
    }
    if (c6Array.includes('PSA built-in dashboards') && architecture.includes('Multiple disconnected') && team === 'Limited bandwidth') {
      return 3;
    }
    if (c6Array.includes('BI platform') && architecture.includes('Traditional database') && team === 'Limited bandwidth') {
      return 5;
    }
    if (c6Array.includes('BI platform') && architecture.includes('Modern cloud warehouse') && team === 'Yes – dedicated') {
      return 10;
    }

    let score = 1;
    if (c6Array.includes('BI platform')) score += 3;
    if (c6Array.includes('PSA built-in dashboards')) score += 2;
    if (architecture.includes('Modern cloud warehouse')) score += 3;
    if (architecture.includes('Traditional database')) score += 1;
    if (team === 'Yes – dedicated') score += 2;
    if (team === 'Limited bandwidth') score += 1;

    return Math.min(10, score);
  };

  const calculateScores = () => {
    const a1 = answers.A1 || [];
    const selectedKPIs = a1.filter(kpi => !kpi.includes('None of the above'));
    const coverage = Math.round((selectedKPIs.length / 6) * 10);

    const b2 = answers.B2 || 0;
    const b4Map = {
      '0–20% (mostly automated)': 0,
      '21–50%': 1,
      '51–80%': 2,
      '81–100% (mostly manual)': 3
    };
    const b4Score = b4Map[answers.B4] || 0;
    const b5 = answers.B5 || [];
    const b5Bonus = b5.includes('None - our data is reliable') ? 2 : 0;
    const confidence = Math.max(0, Math.min(10, b2 - (b4Score * 2) + b5Bonus));

    const b3Map = {
      'Same day': 10,
      'Within 1 week': 8,
      '1–2 weeks': 5,
      'More than 2 weeks / Not sure': 1
    };
    const latency = b3Map[answers.B3] || 1;

    const automation = getAutomationScore(answers.C6, answers.C7, answers.C8);

    const d10 = answers.D10 || '';
    const d11 = answers.D11 || [];
    const hasOwner = !d10.includes('No clear owner');
    const userGroups = d11.length;
    
    let governance = 1;
    if (hasOwner && userGroups >= 3) governance = 10;
    else if (hasOwner && userGroups >= 2) governance = 7;
    else if (hasOwner) governance = 5;
    else if (userGroups >= 2) governance = 3;

    const d13Map = {
      "We don't forecast": 1,
      'Manual quarterly forecast in spreadsheets': 4,
      'Automated monthly forecast in BI tool': 7,
      'Scenario simulations & what-if analysis': 10
    };
    const forecast = d13Map[answers.D13] || 1;

    const total = Math.round(coverage + confidence + (latency * 0.7) + automation + (governance * 0.7) + forecast);

    let persona = 'P0';
    let personaLabel = 'KPI Newcomer';
    
    if (total >= 49) {
      persona = 'P4';
      personaLabel = 'Strategic Optimiser';
    } else if (total >= 37) {
      persona = 'P3';
      personaLabel = 'Insight Builder';
    } else if (total >= 25) {
      persona = 'P2';
      personaLabel = 'Data Aggregator';
    } else if (total >= 13) {
      persona = 'P1';
      personaLabel = 'Basic Tracker';
    }

    const missingKPIs = allKPIs.filter(kpi => !selectedKPIs.includes(kpi));

    return {
      coverage,
      confidence,
      latency,
      automation,
      governance,
      forecast,
      total,
      persona,
      personaLabel,
      missingKPIs,
      selectedKPIs: selectedKPIs.length
    };
  };

  // Future database integration point - replace with actual API call
  const submitUserData = async (userData) => {
    // TODO: Replace with actual API endpoint
    console.log('📊 User Data Ready for Database:', userData);
    
    // Example REST API integration:
    // const response = await fetch('/api/kpi-assessments', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // });
    
    // Example with lead scoring for CRM:
    // if (userData.results.leadScore >= 75) {
    //   await fetch('/api/high-priority-leads', {
    //     method: 'POST',
    //     body: JSON.stringify(userData)
    //   });
    // }
    
    return userData;
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      const calculatedScores = calculateScores();
      setScores(calculatedScores);
      
      // Prepare and optionally submit data when assessment completes
      const userData = prepareUserData();
      
      // Only submit if user has given consent
      if (gdprConsent) {
        submitUserData(userData);
      }
      
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  const renderQuestion = (question) => {
    const value = answers[question.id];

    if (question.type === 'slider') {
      return (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{question.leftLabel}</span>
            <span>{question.rightLabel}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={value || 0}
              onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
              {value || 0}
            </div>
          </div>
        </div>
      );
    }

    if (question.type === 'single-select') {
      return (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={value === option}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      );
    }

    if (question.type === 'multi-select') {
      const selectedValues = value || [];
      return (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={(e) => {
                  let newValues;
                  if (e.target.checked) {
                    newValues = [...selectedValues, option];
                  } else {
                    newValues = selectedValues.filter(v => v !== option);
                  }
                  handleAnswer(question.id, newValues);
                }}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      );
    }
  };

  const getPersonalizedRecommendations = (persona, context) => {
    const baseRecommendations = {
      'P0': [
        'Start small: Automate billable-utilisation and gross-margin feeds to replace manual spreadsheets.',
        'Create a shared glossary so everyone means the same thing by "margin" and "utilisation."',
        `Set a 90-day goal to reduce manual data fixes from ${answers.B4 || 'current level'} to the next lower tier.`
      ],
      'P1': [
        'Centralise reporting: Move from scattered spreadsheets to a single dashboard that updates automatically.',
        'Add forecast accuracy tracking to catch revenue surprises before they hit P&L.',
        'Establish monthly KPI review cadence with clear owners for each metric.'
      ],
      'P2': [
        'Layer predictive metrics: Add leading indicators like pipeline velocity and resource demand forecasting.',
        'Implement automated alerts when utilisation or margin trends outside acceptable ranges.',
        'Connect KPIs to cash-flow projections for better working capital management.'
      ],
      'P3': [
        'Build scenario planning: Create "what-if" models for utilisation drops, rate changes, and market shifts.',
        'Add client profitability segmentation to focus growth efforts on highest-value relationships.',
        'Implement real-time project health scoring to prevent margin leakage.'
      ],
      'P4': [
        'Advanced analytics: Layer machine learning for demand forecasting and optimal resource allocation.',
        'Build competitive benchmarking dashboards using industry data sources.',
        'Create executive scorecard with forward-looking strategic KPIs tied to company objectives.'
      ]
    };

    let recommendations = [...(baseRecommendations[persona] || baseRecommendations['P0'])];

    // Personalize based on operational challenge (E15)
    if (context.challenge === 'Project profitability') {
      recommendations[1] = 'Implement real-time project margin alerts and weekly profit variance reports to catch overruns early.';
    } else if (context.challenge === 'Hiring & retention') {
      recommendations[1] = 'Add utilization forecasting and skills gap analysis to predict hiring needs 6-8 weeks ahead.';
    } else if (context.challenge === 'Cost of client acquisition') {
      recommendations[1] = 'Track sales pipeline velocity and client acquisition cost per service line to optimize marketing spend.';
    } else if (context.challenge === 'Capacity planning & utilisation') {
      recommendations[1] = 'Build resource demand forecasting with project pipeline integration for better capacity allocation.';
    } else if (context.challenge === 'Cash-flow management') {
      recommendations[1] = 'Connect project milestones to AR aging and cash flow projections for predictable revenue timing.';
    }

    // Adjust based on growth strategy (E14)
    if (context.growth === 'Win new clients' && persona !== 'P0') {
      recommendations[0] = 'Prioritize sales efficiency KPIs: pipeline conversion rates, proposal win rates, and client acquisition cost by channel.';
    } else if (context.growth === 'Grow existing clients') {
      recommendations[0] = 'Focus on client satisfaction and account expansion metrics: NPS trends, upsell rates, and wallet share analysis.';
    } else if (context.growth === 'Launch new service lines') {
      recommendations[0] = 'Track innovation metrics: time-to-market for new services, early adoption rates, and service line profitability.';
    } else if (context.growth === 'Acquire other firms') {
      recommendations[0] = 'Build integration KPIs: cultural alignment scores, talent retention rates, and synergy realization tracking.';
    }

    // Adjust messaging tone based on KPI agenda owner (D10)
    if (context.owner === 'Finance (P&L focus)') {
      recommendations = recommendations.map(rec => 
        rec.replace('Add ', 'Calculate ROI impact of adding ')
           .replace('Implement ', 'Deploy cost-effective ')
           .replace('Build ', 'Invest in ')
      );
    } else if (context.owner === 'Operations (efficiency)') {
      recommendations = recommendations.map(rec => 
        rec.replace('Add ', 'Streamline operations by adding ')
           .replace('Implement ', 'Automate processes with ')
           .replace('Build ', 'Systematize ')
      );
    }

    return recommendations;
  };

  const getContextualCTA = (challenge, timeline, owner) => {
    let primaryCTA = 'Download Your KPI Guide';
    let secondaryCTA = 'Book 25-min KPI Review';
    let valueProposition = `Get a one-page guide to the 7 KPIs every mature services firm watches, customised for ${scores.personaLabel}s.`;

    // Personalize based on operational challenge
    if (challenge === 'Project profitability') {
      valueProposition = `Download your margin protection playbook with proven KPIs that catch profit leaks before they hit P&L.`;
      secondaryCTA = 'Book Profitability Assessment';
    } else if (challenge === 'Hiring & retention') {
      valueProposition = `Get your resource planning toolkit with KPIs that predict hiring needs and capacity gaps.`;
      secondaryCTA = 'Book Workforce Planning Review';
    } else if (challenge === 'Cash-flow management') {
      valueProposition = `Access your cash flow forecasting framework with KPIs that predict revenue timing and AR issues.`;
      secondaryCTA = 'Book Cash Flow Strategy Call';
    }

    // Adjust urgency based on timeline
    if (timeline === 'Within 3 months') {
      secondaryCTA = `Priority ${secondaryCTA.split(' ').slice(1).join(' ')} - This Week`;
    } else if (timeline === 'Later / just exploring') {
      secondaryCTA = 'Schedule Future Planning Call';
    }

    // Adjust authority level based on owner
    if (owner === 'Executive team (strategy)') {
      secondaryCTA = secondaryCTA.replace('25-min', '45-min Executive');
    } else if (owner === 'Finance (P&L focus)') {
      secondaryCTA = secondaryCTA.replace('Review', 'ROI Discussion');
    }

    return { primaryCTA, secondaryCTA, valueProposition };
  };

  const getPersonaDescription = (persona) => {
    const descriptions = {
      'P0': 'You\'re starting your KPI journey. Most reporting happens in spreadsheets with manual data collection.',
      'P1': 'You track core metrics but rely heavily on manual processes. Basic reporting infrastructure is in place.',
      'P2': 'You aggregate data from multiple sources into centralized reports. Some automation exists but gaps remain.',
      'P3': 'You build meaningful insights from your data with good automation and predictive capabilities.',
      'P4': 'You optimize strategy using advanced analytics, real-time data, and sophisticated forecasting models.'
    };
    return descriptions[persona] || descriptions['P0'];
  };

  const ResultsCard = () => {
    const context = {
      owner: answers.D10 || '',
      growth: answers.E14 || '',
      challenge: answers.E15 || '',
      timeline: answers.E19 || ''
    };
    
    const recommendations = getPersonalizedRecommendations(scores.persona, context);
    const ctaConfig = getContextualCTA(context.challenge, context.timeline, context.owner);
    
    // Make prepared data easily accessible for debugging/testing
    const currentUserData = prepareUserData();
    
    // Expose to global scope for easy console access during development
    if (typeof window !== 'undefined') {
      window.assessmentData = currentUserData;
      console.log('💾 Assessment data available at: window.assessmentData');
    }
    
    // Calculate lead score inline
    let leadScore = scores.total;
    if (context.owner === 'Executive team (strategy)') leadScore += 15;
    else if (context.owner === 'Finance (P&L focus)') leadScore += 10;
    else if (context.owner === 'No clear owner') leadScore -= 5;
    if (context.timeline === 'Within 3 months') leadScore += 15;
    else if (context.timeline === 'Later / just exploring') leadScore -= 5;
    if (context.challenge === 'Project profitability') leadScore += 10;
    else if (context.challenge === 'Cash-flow management') leadScore += 8;
    else if (context.challenge === 'Capacity planning & utilisation') leadScore += 6;
    if (context.growth === 'Win new clients' || context.growth === 'Acquire other firms') leadScore += 5;
    leadScore = Math.max(0, leadScore);
    
    // Get latency label inline
    const latencyMap = {
      'Same day': 'same day',
      'Within 1 week': 'within a week',
      '1–2 weeks': '1-2 weeks',
      'More than 2 weeks / Not sure': 'more than 2 weeks'
    };
    const latencyLabel = latencyMap[answers.B3] || 'unknown timeframe';

    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            You're a <span className="text-blue-600">{scores.personaLabel}</span>
          </h1>
          <div className="w-32 h-1 bg-blue-600 mx-auto rounded mb-4"></div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-4 italic">
            {getPersonaDescription(scores.persona)}
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            You're tracking <strong>{scores.selectedKPIs} of 6</strong> core KPIs and publish them{' '}
            <strong>{latencyLabel}</strong> after month-end. Your confidence in these numbers scored{' '}
            <strong>{answers.B2 || 0}/10</strong>.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Next Steps</h2>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-700 flex-1">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {scores.missingKPIs && scores.missingKPIs.length > 0 && (
          <div className="bg-amber-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Consider Adding These KPIs</h2>
            <p className="text-gray-700 mb-4">
              <strong>{scores.missingKPIs.join(', ')}</strong>. Firms who track these metrics typically see up to 3-5 percentage points in margin improvement.
            </p>
            <div className="text-sm text-amber-700">
              <strong>Impact:</strong> Missing these KPIs means you're likely reacting to problems rather than preventing them.
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 h-8 flex items-center justify-center">You are tracking</div>
            <div className="text-2xl font-bold text-blue-600">{Math.round((scores.coverage / 10) * 100)}%</div>
            <div className="text-xs text-gray-500 mt-1">of your core metrics</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 h-8 flex items-center justify-center">You are</div>
            <div className="text-2xl font-bold text-blue-600">{Math.round((scores.confidence / 10) * 100)}%</div>
            <div className="text-xs text-gray-500 mt-1">confident in your KPIs</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 h-8 flex items-center justify-center">You are operating at</div>
            <div className="text-2xl font-bold text-blue-600">{Math.round((scores.latency / 10) * 100)}%</div>
            <div className="text-xs text-gray-500 mt-1">of your potential reporting speed</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 h-8 flex items-center justify-center">You are automating</div>
            <div className="text-2xl font-bold text-blue-600">{Math.round((scores.automation / 10) * 100)}%</div>
            <div className="text-xs text-gray-500 mt-1">of potential services</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 h-8 flex items-center justify-center">You are</div>
            <div className="text-2xl font-bold text-blue-600">{Math.round((scores.governance / 10) * 100)}%</div>
            <div className="text-xs text-gray-500 mt-1">clear in KPI ownership and adoption</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 h-8 flex items-center justify-center">You are able to forecast</div>
            <div className="text-2xl font-bold text-blue-600">{Math.round((scores.forecast / 10) * 100)}%</div>
            <div className="text-xs text-gray-500 mt-1">of your potential predictive capabilities</div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg">
            <span className="text-lg font-medium">Total Maturity Score: </span>
            <span className="text-2xl font-bold">{scores.total}/60</span>
          </div>
        </div>

        <div className="text-center bg-green-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            {ctaConfig.primaryCTA}
          </h3>
          <p className="text-green-700">
            {ctaConfig.valueProposition}
          </p>
          {leadScore >= 75 && (
            <div className="mt-3 text-sm bg-green-200 text-green-800 px-3 py-1 rounded-full inline-block">
              🎯 Priority Lead - High Intent & Authority
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mb-6 items-stretch">
          <button 
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '20px 32px',
              borderRadius: '9999px',
              border: 'none',
              fontSize: '18px',
              fontWeight: '600',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '100%'
            }}
            className="flex-1 bg-blue-600 text-white px-8 py-5 rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            <Download className="w-6 h-6" />
            {ctaConfig.primaryCTA}
          </button>
          <button 
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '20px 32px',
              borderRadius: '9999px',
              border: 'none',
              fontSize: '18px',
              fontWeight: '600',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '100%'
            }}
            className="flex-1 bg-green-600 text-white px-8 py-5 rounded-full font-semibold hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
          >
            <Calendar className="w-6 h-6" />
            {ctaConfig.secondaryCTA}
          </button>
        </div>


      </div>
    );
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <ResultsCard />
      </div>
    );
  }

  const currentSectionData = sections[currentSection];
  const currentQuestions = questions[currentSectionData.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ProServ KPI Maturity Assessment
          </h1>
          <p className="text-gray-600">
            Discover your KPI maturity level in just 2 minutes
          </p>
          <div className="text-sm text-gray-500 mt-1">v3.0</div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentSection + 1} of {sections.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-2 shadow-sm">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    index === currentSection 
                      ? 'bg-blue-600 text-white' 
                      : index < currentSection 
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">{section.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentSectionData.title}
            </h2>
          </div>

          <div className="space-y-8">
            {currentQuestions.map((question, index) => (
              <div key={question.id} className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {question.question}
                  </h3>
                  {question.note && (
                    <p className="text-sm text-gray-600 mb-4">{question.note}</p>
                  )}
                </div>
                {renderQuestion(question)}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            style={{
              backgroundColor: currentSection === 0 ? '#e5e7eb' : '#ffffff',
              color: currentSection === 0 ? '#9ca3af' : '#374151',
              padding: '16px 32px',
              borderRadius: '9999px',
              border: currentSection === 0 ? 'none' : '2px solid #d1d5db',
              fontSize: '16px',
              fontWeight: '500',
              boxShadow: currentSection === 0 ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              cursor: currentSection === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
            className={`flex items-center space-x-3 px-8 py-4 rounded-full font-medium transition-all duration-200 shadow-md ${
              currentSection === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-lg border-2 border-gray-200 hover:border-gray-300'
            }`}
            onMouseOver={(e) => {
              if (currentSection !== 0) {
                e.target.style.backgroundColor = '#f9fafb';
                e.target.style.borderColor = '#9ca3af';
                e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }
            }}
            onMouseOut={(e) => {
              if (currentSection !== 0) {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }
            }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '9999px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '500',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
            className="flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#1d4ed8';
              e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <span>{currentSection === sections.length - 1 ? 'See Results' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            By taking this assessment, you consent to Resultant storing your responses for analysis and follow-up communication. You can access your results regardless of this choice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProServKPIAssessment;
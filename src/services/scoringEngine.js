import { 
  MANUAL_WORK_SCORING, 
  LATENCY_SCORING, 
  FORECAST_SCORING,
  AUTOMATION_MATRIX,
  AUTOMATION_SCORING_WEIGHTS,
  GOVERNANCE_SCORING,
  SCORING_CALCULATIONS
} from '../config/scoringRules.js';
import { allKPIs } from '../config/questions.js';

export class ScoringEngine {
  /**
   * Calculate KPI coverage score based on selected KPIs
   */
  static calculateCoverageScore(selectedKPIs = [], totalKPIs = allKPIs.length) {
    const validKPIs = selectedKPIs.filter(kpi => !kpi.includes('None of the above'));
    return Math.round((validKPIs.length / totalKPIs) * 10);
  }

  /**
   * Calculate confidence score considering manual work and data quality
   */
  static calculateConfidenceScore(confidenceRating = 0, manualWorkLevel = '', dataQualityIssues = []) {
    const manualWorkPenalty = MANUAL_WORK_SCORING[manualWorkLevel] || 0;
    const qualityBonus = dataQualityIssues?.includes('None - our data is reliable') ? 2 : 0;
    
    return Math.max(0, Math.min(10, confidenceRating - (manualWorkPenalty * 2) + qualityBonus));
  }

  /**
   * Calculate latency score based on reporting speed
   */
  static calculateLatencyScore(reportingSpeed = '') {
    return LATENCY_SCORING[reportingSpeed] || 1;
  }

  /**
   * Calculate automation score based on tools, architecture, and team
   */
  static calculateAutomationScore(tools = [], architecture = '', team = '') {
    // Check for perfect matches first
    for (const [key, config] of Object.entries(AUTOMATION_MATRIX)) {
      if (this._matchesAutomationConfig(tools, architecture, team, config)) {
        return config.score;
      }
    }

    // Calculate weighted score for partial matches
    let score = 1; // Base score

    if (tools.includes('BI platform (Tableau / Power BI / Looker)')) {
      score += AUTOMATION_SCORING_WEIGHTS.BI_PLATFORM;
    }
    if (tools.includes('PSA built-in dashboards')) {
      score += AUTOMATION_SCORING_WEIGHTS.PSA_DASHBOARDS;
    }
    if (architecture.includes('Modern cloud warehouse')) {
      score += AUTOMATION_SCORING_WEIGHTS.MODERN_CLOUD;
    }
    if (architecture.includes('Traditional database')) {
      score += AUTOMATION_SCORING_WEIGHTS.TRADITIONAL_DB;
    }
    if (team === 'Yes – dedicated') {
      score += AUTOMATION_SCORING_WEIGHTS.DEDICATED_TEAM;
    }
    if (team === 'Limited bandwidth') {
      score += AUTOMATION_SCORING_WEIGHTS.LIMITED_TEAM;
    }

    return Math.min(10, score);
  }

  /**
   * Calculate governance score based on ownership and user adoption
   */
  static calculateGovernanceScore(kpiOwner = '', dataUsers = []) {
    // Get owner weight (0-4 points)
    const ownerWeight = GOVERNANCE_SCORING.OWNER_WEIGHTS[kpiOwner] || 0;
    
    // Calculate weighted user adoption (0-6 points max)
    const userWeight = dataUsers.reduce((total, user) => {
      return total + (GOVERNANCE_SCORING.USER_WEIGHTS[user] || 0);
    }, 0);
    
    // Cap user weight at 6 to prevent runaway scores
    const cappedUserWeight = Math.min(6, userWeight);
    
    // Total governance score (0-10 points)
    const governance = Math.min(10, ownerWeight + cappedUserWeight);
    
    // Ensure minimum score of 1 if any governance exists
    return Math.max(1, governance);
  }

  /**
   * Calculate forecast score based on forecasting capability
   */
  static calculateForecastScore(forecastingCapability = '') {
    return FORECAST_SCORING[forecastingCapability] || 1;
  }

  /**
   * Calculate total maturity score from individual scores
   */
  static calculateTotalScore(scores) {
    return Math.round(
      (scores.coverage * SCORING_CALCULATIONS.COVERAGE_WEIGHT) +
      (scores.confidence * SCORING_CALCULATIONS.CONFIDENCE_WEIGHT) +
      (scores.latency * SCORING_CALCULATIONS.LATENCY_WEIGHT) +
      (scores.automation * SCORING_CALCULATIONS.AUTOMATION_WEIGHT) +
      (scores.governance * SCORING_CALCULATIONS.GOVERNANCE_WEIGHT) +
      (scores.forecast * SCORING_CALCULATIONS.FORECAST_WEIGHT)
    );
  }

  /**
   * Calculate all scores at once
   */
  static calculateAllScores(answers) {
    const coverage = this.calculateCoverageScore(answers.A1);
    const confidence = this.calculateConfidenceScore(answers.B2, answers.B4, answers.B5);
    const latency = this.calculateLatencyScore(answers.B3);
    const automation = this.calculateAutomationScore(answers.C6, answers.C7, answers.C8);
    const governance = this.calculateGovernanceScore(answers.D10, answers.D11);
    const forecast = this.calculateForecastScore(answers.D13);

    const scores = {
      coverage,
      confidence,
      latency,
      automation,
      governance,
      forecast
    };

    const total = this.calculateTotalScore(scores);

    // Calculate missing KPIs
    const selectedKPIs = answers.A1 ? answers.A1.filter(kpi => !kpi.includes('None of the above')) : [];
    const missingKPIs = allKPIs.filter(kpi => !selectedKPIs.includes(kpi));

    return {
      ...scores,
      total,
      missingKPIs,
      selectedKPIs: selectedKPIs.length
    };
  }

  /**
   * Helper method to check if tools/architecture/team matches a specific config
   */
  static _matchesAutomationConfig(tools, architecture, team, config) {
    // Check if user has ALL required tools (for exact matches)
    const hasAllRequiredTools = config.tools.every(tool => tools.includes(tool));
    
    // Check if user has ONLY the required tools (no additional tools that would change the score)
    const hasOnlyRequiredTools = tools.length === config.tools.length;
    
    // For perfect matching, require exact tool match
    const hasExactToolMatch = hasAllRequiredTools && hasOnlyRequiredTools;
    
    const hasRequiredArchitecture = architecture === config.architecture;
    const hasRequiredTeam = team === config.team;

    return hasExactToolMatch && hasRequiredArchitecture && hasRequiredTeam;
  }
} 
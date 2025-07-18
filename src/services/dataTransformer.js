import { LATENCY_LABELS } from '../config/scoringRules.js';

export class DataTransformer {
  /**
   * Extract business context from answers
   */
  static extractContext(answers) {
    return {
      owner: '',
      timeline: '',
      challenge: answers.E15 || '',
      growth: '',
      industry: '',
      companySize: answers.E2 || '',
      revenue: '',
      marketConditions: ''
    };
  }

  /**
   * Extract demographics from answers
   */
  static extractDemographics(answers) {
    return {
      companySize: answers.E2 || null,
    };
  }

  /**
   * Extract business context details
   */
  static extractBusinessContext(answers) {
    return {
      operationalChallenge: answers.E15 || null,
    };
  }

  /**
   * Extract KPI assessment details
   */
  static extractKPIAssessment(answers) {
    return {
      coverage: answers.A1 || null,
      confidence: answers.B2 || null,
      reportingSpeed: answers.B3 || null,
      manualWork: answers.B4 || null,
      dataQualityIssues: answers.B5 || null,
      reportingTools: answers.C6 || null,
      dataArchitecture: answers.C7 || null,
      internalTeam: answers.C8 || null,
      visibilityGaps: answers.C9 || null,
      dataUsers: answers.D11 || null,
      forecastingCapability: answers.D13 || null,
    };
  }

  /**
   * Prepare complete user data structure for API/database submission
   */
  static prepareUserData(answers, scores, persona, recommendations, leadScore, gdprConsent = true) {
    const timestamp = new Date().toISOString();
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      // Metadata
      sessionId,
      timestamp,
      assessmentVersion: 'v4.0',
      
      // Demographics
      demographics: this.extractDemographics(answers),
      
      // Business Context
      businessContext: this.extractBusinessContext(answers),
      
      // KPI Assessment Answers
      kpiAssessment: this.extractKPIAssessment(answers),
      
      // Calculated Results
      results: {
        scores,
        persona: persona.persona,
        personaLabel: persona.personaLabel,
        totalScore: scores.total,
        leadScore,
        recommendations
      },
      
      // User Consent & Preferences
      consent: {
        gdprConsent,
        marketingOptIn: gdprConsent, // Could be separate field later
      },
      
      // Raw answers object for backup/debugging
      rawAnswers: answers
    };
  }

  /**
   * Get latency description for display
   */
  static getLatencyDescription(reportingSpeed) {
    return LATENCY_LABELS[reportingSpeed] || 'unknown timeframe';
  }

  /**
   * Format score for percentage display
   */
  static formatScoreAsPercentage(score, maxScore = 10) {
    return Math.round((score / maxScore) * 100);
  }

  /**
   * Generate assessment summary text
   */
  static generateAssessmentSummary(scores, answers) {
    const latencyLabel = this.getLatencyDescription(answers.B3);
    const selectedKPIs = scores.selectedKPIs;
    const confidence = answers.B2 || 0;

    return `You're tracking ${selectedKPIs} of 6 core KPIs and publish them ${latencyLabel} after month-end. Your confidence in these numbers scored ${confidence}/10.`;
  }

  /**
   * Validate required fields for assessment completion
   */
  static validateAssessmentCompletion(answers) {
    const requiredFields = [
      'A1', // KPI coverage
      'B2', // Confidence
      'B3', // Reporting speed
      'E15', // Operational challenge
    ];

    const missing = requiredFields.filter(field => !answers[field]);
    
    return {
      isComplete: missing.length === 0,
      missingFields: missing,
      completionPercentage: ((requiredFields.length - missing.length) / requiredFields.length) * 100
    };
  }

  /**
   * Sanitize data for API submission
   */
  static sanitizeForAPI(data) {
    // Remove any potential XSS or injection risks
    const sanitized = JSON.parse(JSON.stringify(data));
    
    // Clean string fields
    const cleanString = (str) => {
      if (typeof str !== 'string') return str;
      return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/javascript:/gi, '')
                .trim();
    };

    // Recursively clean all string fields
    const cleanObject = (obj) => {
      if (typeof obj === 'string') {
        return cleanString(obj);
      } else if (Array.isArray(obj)) {
        return obj.map(cleanObject);
      } else if (obj && typeof obj === 'object') {
        const cleaned = {};
        for (const [key, value] of Object.entries(obj)) {
          cleaned[key] = cleanObject(value);
        }
        return cleaned;
      }
      return obj;
    };

    return cleanObject(sanitized);
  }
} 
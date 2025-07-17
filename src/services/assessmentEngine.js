import { ScoringEngine } from './scoringEngine.js';
import { PersonaEngine } from './personaEngine.js';
import { RecommendationEngine } from './recommendationEngine.js';
import { LeadScoringEngine } from './leadScoringEngine.js';
import { DataTransformer } from './dataTransformer.js';

export class AssessmentEngine {
  /**
   * Process complete assessment - main entry point
   */
  static processAssessment(answers, gdprConsent = true) {
    try {
      // Calculate all scores
      const scores = ScoringEngine.calculateAllScores(answers);
      
      // Determine persona
      const persona = PersonaEngine.getPersonaInfo(scores.total);
      
      // Extract context for recommendations and lead scoring
      const context = DataTransformer.extractContext(answers);
      
      // Generate personalized recommendations
      const recommendations = RecommendationEngine.getPersonalizedRecommendations(
        persona.persona, 
        context, 
        answers
      );
      
      // Calculate lead score
      const leadScore = LeadScoringEngine.calculateLeadScore(scores.total, context);
      const leadPriority = LeadScoringEngine.getLeadPriority(leadScore);
      const salesAlert = LeadScoringEngine.shouldTriggerSalesAlert(leadScore, context);
      
      // Generate contextual CTA
      const ctaConfig = RecommendationEngine.getContextualCTA(
        context.challenge, 
        context.timeline, 
        context.owner, 
        persona.personaLabel
      );
      
      // Generate KPI impact statement
      const kpiImpact = RecommendationEngine.getKPIImpactStatement(scores.missingKPIs);
      
      // Generate assessment summary
      const summary = DataTransformer.generateAssessmentSummary(scores, answers, persona);
      
      // Prepare complete user data for potential API submission
      const userData = DataTransformer.prepareUserData(
        answers, 
        scores, 
        persona, 
        recommendations, 
        leadScore, 
        gdprConsent
      );

      return {
        scores,
        persona,
        recommendations,
        leadScore,
        leadPriority,
        salesAlert,
        ctaConfig,
        kpiImpact,
        summary,
        context,
        userData: DataTransformer.sanitizeForAPI(userData)
      };
    } catch (error) {
      console.error('Assessment processing error:', error);
      throw new AssessmentError('Failed to process assessment', error);
    }
  }

  /**
   * Validate assessment data before processing
   */
  static validateAssessment(answers) {
    return DataTransformer.validateAssessmentCompletion(answers);
  }

  /**
   * Get assessment progress for UI
   */
  static getAssessmentProgress(answers, totalSections = 5) {
    const validation = this.validateAssessment(answers);
    const answeredSections = this._countAnsweredSections(answers);
    
    return {
      completionPercentage: validation.completionPercentage,
      sectionsCompleted: answeredSections,
      totalSections,
      isComplete: validation.isComplete,
      missingFields: validation.missingFields
    };
  }

  /**
   * Submit assessment data to backend (when ready)
   */
  static async submitAssessment(userData) {
    // This is the integration point for future API calls
    console.log('📊 Assessment Data Ready for Submission:', userData);
    
    // Example integration points:
    
    // 1. Main assessment storage
    // const response = await fetch('/api/kpi-assessments', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // });
    
    // 2. High-priority lead notification
    // if (userData.results.leadScore >= 75) {
    //   await fetch('/api/high-priority-leads', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       sessionId: userData.sessionId,
    //       leadScore: userData.results.leadScore,
    //       persona: userData.results.persona,
    //       timeline: userData.businessContext.timeline,
    //       challenge: userData.businessContext.operationalChallenge
    //     })
    //   });
    // }
    
    // 3. Email marketing integration
    // if (userData.consent.marketingOptIn) {
    //   await fetch('/api/marketing/contacts', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       persona: userData.results.persona,
    //       industry: userData.demographics.industry,
    //       companySize: userData.demographics.companySize,
    //       challenge: userData.businessContext.operationalChallenge
    //     })
    //   });
    // }
    
    // 4. Analytics tracking
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', 'assessment_completed', {
    //     'persona': userData.results.persona,
    //     'lead_score': userData.results.leadScore,
    //     'industry': userData.demographics.industry
    //   });
    // }
    
    return userData;
  }

  /**
   * Helper method to count answered sections
   */
  static _countAnsweredSections(answers) {
    const sectionQuestions = {
      context: ['E1', 'E2', 'E3', 'E14', 'E15', 'E16', 'E17', 'E18', 'E19'],
      coverage: ['A1'],
      reliability: ['B2', 'B3', 'B4', 'B5'],
      tooling: ['C6', 'C7', 'C8', 'C9'],
      usage: ['D10', 'D11', 'D12', 'D13', 'D14', 'D15']
    };

    let completedSections = 0;
    
    for (const [section, questions] of Object.entries(sectionQuestions)) {
      const answeredInSection = questions.filter(q => answers[q] !== undefined).length;
      if (answeredInSection > 0) {
        completedSections++;
      }
    }

    return completedSections;
  }

  /**
   * Get detailed scoring breakdown for debugging/transparency
   */
  static getDetailedBreakdown(answers) {
    const scores = ScoringEngine.calculateAllScores(answers);
    const context = DataTransformer.extractContext(answers);
    const leadScoreBreakdown = LeadScoringEngine.getLeadScoreBreakdown(scores.total, context);
    
    return {
      scores: {
        coverage: {
          value: scores.coverage,
          percentage: DataTransformer.formatScoreAsPercentage(scores.coverage),
          description: 'KPI Coverage Score'
        },
        confidence: {
          value: scores.confidence,
          percentage: DataTransformer.formatScoreAsPercentage(scores.confidence),
          description: 'Data Confidence Score'
        },
        latency: {
          value: scores.latency,
          percentage: DataTransformer.formatScoreAsPercentage(scores.latency),
          description: 'Reporting Speed Score'
        },
        automation: {
          value: scores.automation,
          percentage: DataTransformer.formatScoreAsPercentage(scores.automation),
          description: 'Automation Score'
        },
        governance: {
          value: scores.governance,
          percentage: DataTransformer.formatScoreAsPercentage(scores.governance),
          description: 'Governance Score'
        },
        forecast: {
          value: scores.forecast,
          percentage: DataTransformer.formatScoreAsPercentage(scores.forecast),
          description: 'Forecasting Capability Score'
        },
        total: {
          value: scores.total,
          maxValue: 54,
          description: 'Total Maturity Score'
        }
      },
      leadScoring: leadScoreBreakdown,
      context
    };
  }
}

/**
 * Custom error class for assessment processing
 */
export class AssessmentError extends Error {
  constructor(message, originalError = null) {
    super(message);
    this.name = 'AssessmentError';
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();
  }
} 
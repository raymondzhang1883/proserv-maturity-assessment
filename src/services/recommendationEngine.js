import { 
  BASE_RECOMMENDATIONS, 
  CHALLENGE_RECOMMENDATIONS, 
  GROWTH_STRATEGY_RECOMMENDATIONS
} from '../config/personas.js';
import { CTA_CONFIGURATIONS } from '../config/scoringRules.js';

export class RecommendationEngine {
  /**
   * Get personalized recommendations based on persona and context
   */
  static getPersonalizedRecommendations(persona, context, answers = {}) {
    const baseRecs = this._getBaseRecommendations(persona);
    let recommendations = [...baseRecs];

    // Personalize based on operational challenge (Removed)
    // if (context.challenge && CHALLENGE_RECOMMENDATIONS[context.challenge]) {
    //   recommendations[1] = CHALLENGE_RECOMMENDATIONS[context.challenge];
    // }

    // Adjust based on growth strategy (Removed)
    // if (context.growth && GROWTH_STRATEGY_RECOMMENDATIONS[context.growth] && persona !== 'P0') {
    //   recommendations[0] = GROWTH_STRATEGY_RECOMMENDATIONS[context.growth];
    // }


    // Replace dynamic placeholder for manual work level
    recommendations = this._replaceDynamicContent(recommendations, answers);

    return recommendations;
  }

  /**
   * Get contextual call-to-action configuration
   */
  static getContextualCTA(challenge, timeline, owner, personaLabel = '') {
    let primaryCTA = 'Download Your KPI Guide';
    let secondaryCTA = 'Book 25-min KPI Review';
    let valueProposition = `Get a one-page guide to the 7 KPIs every mature services firm watches, customised for ${personaLabel}s.`;

    // Personalize based on operational challenge
    if (challenge && CTA_CONFIGURATIONS.CHALLENGE_BASED[challenge]) {
      const config = CTA_CONFIGURATIONS.CHALLENGE_BASED[challenge];
      valueProposition = config.valueProposition;
      secondaryCTA = config.secondaryCTA;
    }

    // Adjust urgency based on timeline
    if (timeline && CTA_CONFIGURATIONS.TIMELINE_MODIFIERS[timeline]) {
      if (timeline === 'Within 3 months') {
        secondaryCTA = `Priority ${secondaryCTA.split(' ').slice(1).join(' ')} - This Week`;
      } else if (timeline === 'Later / just exploring') {
        secondaryCTA = CTA_CONFIGURATIONS.TIMELINE_MODIFIERS[timeline];
      }
    }

    // Adjust authority level based on owner
    if (owner && CTA_CONFIGURATIONS.OWNER_MODIFIERS[owner]) {
      if (owner === 'Executive team (strategy)') {
        secondaryCTA = secondaryCTA.replace('25-min', '45-min Executive');
      } else if (owner === 'Finance (P&L focus)') {
        secondaryCTA = secondaryCTA.replace('Review', 'ROI Discussion');
      }
    }

    return { primaryCTA, secondaryCTA, valueProposition };
  }

  /**
   * Get base recommendations for a persona
   */
  static _getBaseRecommendations(persona) {
    return BASE_RECOMMENDATIONS[persona] || BASE_RECOMMENDATIONS['P0'];
  }


  /**
   * Replace dynamic content placeholders in recommendations
   */
  static _replaceDynamicContent(recommendations, answers) {
    return recommendations.map(rec => {
      // Replace manual work level placeholder
      if (rec.includes('from ${answers.B4 || \'current level\'}')) {
        const manualWorkLevel = answers.B4 || 'current level';
        return rec.replace('${answers.B4 || \'current level\'}', manualWorkLevel);
      }
      return rec;
    });
  }

  /**
   * Generate impact statement for missing KPIs
   */
  static getKPIImpactStatement(missingKPIs) {
    if (!missingKPIs || missingKPIs.length === 0) {
      return null;
    }

    return {
      title: 'Consider Adding These KPIs',
      description: `${missingKPIs.join(', ')}. Firms who track these metrics typically see up to 3-5 percentage points in margin improvement.`,
      impact: 'Missing these KPIs means you\'re likely reacting to problems rather than preventing them.'
    };
  }
} 
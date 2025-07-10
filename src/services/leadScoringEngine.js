import { LEAD_SCORING_WEIGHTS } from '../config/scoringRules.js';

export class LeadScoringEngine {
  /**
   * Calculate lead score based on assessment scores and context
   */
  static calculateLeadScore(totalScore, context) {
    let leadScore = totalScore;

    // Apply owner modifiers
    if (context.owner && LEAD_SCORING_WEIGHTS.OWNER_MODIFIERS[context.owner]) {
      leadScore += LEAD_SCORING_WEIGHTS.OWNER_MODIFIERS[context.owner];
    }

    // Apply timeline modifiers
    if (context.timeline && LEAD_SCORING_WEIGHTS.TIMELINE_MODIFIERS[context.timeline]) {
      leadScore += LEAD_SCORING_WEIGHTS.TIMELINE_MODIFIERS[context.timeline];
    }

    // Apply challenge modifiers
    if (context.challenge && LEAD_SCORING_WEIGHTS.CHALLENGE_MODIFIERS[context.challenge]) {
      leadScore += LEAD_SCORING_WEIGHTS.CHALLENGE_MODIFIERS[context.challenge];
    }

    // Apply growth strategy modifiers
    if (context.growth && LEAD_SCORING_WEIGHTS.GROWTH_MODIFIERS[context.growth]) {
      leadScore += LEAD_SCORING_WEIGHTS.GROWTH_MODIFIERS[context.growth];
    }

    return Math.max(0, leadScore);
  }

  /**
   * Determine lead priority based on score
   */
  static getLeadPriority(leadScore) {
    if (leadScore >= 75) {
      return {
        level: 'HIGH',
        label: 'Priority Lead - High Intent & Authority',
        emoji: '🎯'
      };
    } else if (leadScore >= 50) {
      return {
        level: 'MEDIUM',
        label: 'Qualified Lead',
        emoji: '📈'
      };
    } else {
      return {
        level: 'LOW',
        label: 'Information Seeker',
        emoji: '📋'
      };
    }
  }

  /**
   * Get lead scoring breakdown for transparency
   */
  static getLeadScoreBreakdown(totalScore, context) {
    const breakdown = {
      baseScore: totalScore,
      modifiers: [],
      total: totalScore
    };

    let adjustments = 0;

    // Owner adjustments
    if (context.owner && LEAD_SCORING_WEIGHTS.OWNER_MODIFIERS[context.owner]) {
      const adjustment = LEAD_SCORING_WEIGHTS.OWNER_MODIFIERS[context.owner];
      breakdown.modifiers.push({
        factor: 'KPI Owner',
        value: context.owner,
        adjustment: adjustment
      });
      adjustments += adjustment;
    }

    // Timeline adjustments
    if (context.timeline && LEAD_SCORING_WEIGHTS.TIMELINE_MODIFIERS[context.timeline]) {
      const adjustment = LEAD_SCORING_WEIGHTS.TIMELINE_MODIFIERS[context.timeline];
      breakdown.modifiers.push({
        factor: 'Implementation Timeline',
        value: context.timeline,
        adjustment: adjustment
      });
      adjustments += adjustment;
    }

    // Challenge adjustments
    if (context.challenge && LEAD_SCORING_WEIGHTS.CHALLENGE_MODIFIERS[context.challenge]) {
      const adjustment = LEAD_SCORING_WEIGHTS.CHALLENGE_MODIFIERS[context.challenge];
      breakdown.modifiers.push({
        factor: 'Operational Challenge',
        value: context.challenge,
        adjustment: adjustment
      });
      adjustments += adjustment;
    }

    // Growth strategy adjustments
    if (context.growth && LEAD_SCORING_WEIGHTS.GROWTH_MODIFIERS[context.growth]) {
      const adjustment = LEAD_SCORING_WEIGHTS.GROWTH_MODIFIERS[context.growth];
      breakdown.modifiers.push({
        factor: 'Growth Strategy',
        value: context.growth,
        adjustment: adjustment
      });
      adjustments += adjustment;
    }

    breakdown.total = Math.max(0, totalScore + adjustments);
    breakdown.totalAdjustments = adjustments;

    return breakdown;
  }

  /**
   * Check if lead should trigger immediate sales notification
   */
  static shouldTriggerSalesAlert(leadScore, context) {
    const priority = this.getLeadPriority(leadScore);
    
    // High priority leads with urgent timeline
    if (priority.level === 'HIGH' && context.timeline === 'Within 3 months') {
      return {
        trigger: true,
        reason: 'High-priority lead with immediate timeline',
        urgency: 'IMMEDIATE'
      };
    }

    // Executive decision makers
    if (context.owner === 'Executive team (strategy)' && leadScore >= 60) {
      return {
        trigger: true,
        reason: 'Executive decision maker with good fit',
        urgency: 'HIGH'
      };
    }

    return {
      trigger: false,
      reason: null,
      urgency: 'NORMAL'
    };
  }
} 
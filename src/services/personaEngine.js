import { PERSONA_THRESHOLDS, PERSONA_LABELS, PERSONA_DESCRIPTIONS } from '../config/personas.js';

export class PersonaEngine {
  /**
   * Determine persona based on total score
   */
  static determinePersona(totalScore) {
    if (totalScore >= PERSONA_THRESHOLDS.P4) {
      return 'P4';
    } else if (totalScore >= PERSONA_THRESHOLDS.P3) {
      return 'P3';
    } else if (totalScore >= PERSONA_THRESHOLDS.P2) {
      return 'P2';
    } else if (totalScore >= PERSONA_THRESHOLDS.P1) {
      return 'P1';
    } else {
      return 'P0';
    }
  }

  /**
   * Get persona label
   */
  static getPersonaLabel(persona) {
    return PERSONA_LABELS[persona] || PERSONA_LABELS['P0'];
  }

  /**
   * Get persona description
   */
  static getPersonaDescription(persona) {
    return PERSONA_DESCRIPTIONS[persona] || PERSONA_DESCRIPTIONS['P0'];
  }

  /**
   * Get complete persona information
   */
  static getPersonaInfo(totalScore) {
    const persona = this.determinePersona(totalScore);
    const personaLabel = this.getPersonaLabel(persona);
    const personaDescription = this.getPersonaDescription(persona);

    return {
      persona,
      personaLabel,
      personaDescription
    };
  }

  /**
   * Check if persona qualifies for specific features or recommendations
   */
  static isEligibleForAdvancedFeatures(persona) {
    return ['P3', 'P4'].includes(persona);
  }

  /**
   * Get persona progression path
   */
  static getPersonaProgressionPath(currentPersona) {
    const personas = ['P0', 'P1', 'P2', 'P3', 'P4'];
    const currentIndex = personas.indexOf(currentPersona);
    
    if (currentIndex === -1 || currentIndex === personas.length - 1) {
      return null;
    }

    return {
      current: currentPersona,
      next: personas[currentIndex + 1],
      requiredScore: PERSONA_THRESHOLDS[personas[currentIndex + 1]]
    };
  }
} 
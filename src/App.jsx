import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Download, Calendar, BarChart3, Settings, Users, Building, Target } from 'lucide-react';

// Import new modular engines
import { AssessmentEngine } from './services/assessmentEngine.js';
import { DataTransformer } from './services/dataTransformer.js';
import { sections, questions } from './config/questions.js';

/* 
 * DATABASE INTEGRATION READY
 * 
 * The business logic has been extracted to separate services:
 * - services/assessmentEngine.js - Main orchestrator
 * - services/scoringEngine.js - Scoring calculations
 * - services/personaEngine.js - Persona determination
 * - services/recommendationEngine.js - Personalized recommendations
 * - services/leadScoringEngine.js - Lead scoring logic
 * - services/dataTransformer.js - Data preparation and validation
 * 
 * Configuration moved to:
 * - config/questions.js - Question definitions
 * - config/personas.js - Persona configurations
 * - config/scoringRules.js - Scoring rules and mappings
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
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [gdprConsent] = useState(true);

  // Use sections and questions from config
  const iconMap = {
    Target,
    BarChart3,
    Settings,
    Building,
    Users
  };

  const sectionsWithIcons = sections.map(section => ({
    ...section,
    icon: iconMap[section.icon]
  }));

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentSection < sectionsWithIcons.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Process assessment using the new engine
      const assessmentResults = AssessmentEngine.processAssessment(answers, gdprConsent);
      setResults(assessmentResults);
      
      // Submit data if user consented
      if (gdprConsent) {
        AssessmentEngine.submitAssessment(assessmentResults.userData);
      }
      
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progress = ((currentSection + 1) / sectionsWithIcons.length) * 100;

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



  const ResultsCard = () => {
    if (!results) return null;

    const { scores, persona, recommendations, leadPriority, ctaConfig, kpiImpact, summary } = results;
    
    // Expose to global scope for easy console access during development
    if (typeof window !== 'undefined') {
      window.assessmentData = results.userData;
      console.log('💾 Assessment data available at: window.assessmentData');
    }

          return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              You're a <span className="text-blue-600">{persona.personaLabel}</span>
            </h1>
            <div className="w-32 h-1 bg-blue-600 mx-auto rounded mb-4"></div>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-4 italic">
              {persona.personaDescription}
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {summary}
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

                  {kpiImpact && (
            <div className="bg-amber-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">{kpiImpact.title}</h2>
              <p className="text-gray-700 mb-4">
                {kpiImpact.description}
              </p>
              <div className="text-sm text-amber-700">
                <strong>Impact:</strong> {kpiImpact.impact}
              </div>
            </div>
          )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 h-8 flex items-center justify-center">You are tracking</div>
              <div className="text-2xl font-bold text-blue-600">{DataTransformer.formatScoreAsPercentage(scores.coverage)}%</div>
              <div className="text-xs text-gray-500 mt-1">of your core metrics</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 h-8 flex items-center justify-center">You are</div>
              <div className="text-2xl font-bold text-blue-600">{DataTransformer.formatScoreAsPercentage(scores.confidence)}%</div>
              <div className="text-xs text-gray-500 mt-1">confident in your KPIs</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 h-8 flex items-center justify-center">You are operating at</div>
              <div className="text-2xl font-bold text-blue-600">{DataTransformer.formatScoreAsPercentage(scores.latency)}%</div>
              <div className="text-xs text-gray-500 mt-1">of your potential reporting speed</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 h-8 flex items-center justify-center">You are automating</div>
              <div className="text-2xl font-bold text-blue-600">{DataTransformer.formatScoreAsPercentage(scores.automation)}%</div>
              <div className="text-xs text-gray-500 mt-1">of potential services</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 h-8 flex items-center justify-center">You are able to forecast</div>
              <div className="text-2xl font-bold text-blue-600">{DataTransformer.formatScoreAsPercentage(scores.forecast)}%</div>
              <div className="text-xs text-gray-500 mt-1">of your potential predictive capabilities</div>
            </div>
          </div>

        <div className="text-center mb-8">
          <div className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg">
            <span className="text-lg font-medium">Total Maturity Score: </span>
            <span className="text-2xl font-bold">{scores.total}/47</span>
          </div>
        </div>

                  <div className="text-center bg-green-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              {ctaConfig.primaryCTA}
            </h3>
            <p className="text-green-700">
              {ctaConfig.valueProposition}
            </p>
            {leadPriority.level === 'HIGH' && (
              <div className="mt-3 text-sm bg-green-200 text-green-800 px-3 py-1 rounded-full inline-block">
                {leadPriority.emoji} {leadPriority.label}
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

  const currentSectionData = sectionsWithIcons[currentSection];
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
            {sectionsWithIcons.map((section, index) => {
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
            {currentQuestions.map((question) => (
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
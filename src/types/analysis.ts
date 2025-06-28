export interface Speaker {
  id: string;
  name: string;
  avatar: string;
  timeSpoken: number;
  confidence?: number;
  role?: 'moderator' | 'panelist' | 'guest' | 'audience' | 'unknown';
  identificationData?: SpeakerIdentificationData;
  emotionProfile: EmotionProfile;
  segments: SpeechSegment[];
}

export interface SpeakerIdentificationData {
  speakerId: string;
  confidence: number;
  role: 'moderator' | 'panelist' | 'guest' | 'audience' | 'unknown';
  visualFeatures: {
    faceEmbedding: number[];
    position: { x: number; y: number; width: number; height: number };
    screenTime: number;
  };
  audioFeatures: {
    voiceEmbedding: number[];
    speakingTime: number;
    averageVolume: number;
    speechRate: number;
  };
  contextualClues: {
    introducedAs?: string;
    titleMentioned?: string;
    expertiseArea?: string;
    speakingPattern: 'frequent' | 'moderate' | 'occasional';
  };
}

export interface SpeechSegment {
  start: number;
  end: number;
  text: string;
  confidence: number;
  emotions: EmotionScore[];
}

export interface EmotionProfile {
  dominant: string;
  scores: EmotionScore[];
}

export interface EmotionScore {
  emotion: string;
  score: number;
  color: string;
}

export interface FactCheck {
  claim: string;
  verdict: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED';
  confidence: number;
  sources: string[];
  explanation: string;
}

export interface BiasDetection {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  examples: string[];
  confidence: number;
}

// New advanced metrics interfaces
export interface CredibilityMetrics {
  sourceReliability: number;
  factAccuracy: number;
  citationQuality: number;
  expertConsensus: number;
  dataTransparency: number;
  methodologyClarity: number;
}

export interface CommunicationMetrics {
  clarity: number;
  engagement: number;
  persuasiveness: number;
  emotionalAppeal: number;
  logicalStructure: number;
  audienceAdaptation: number;
}

export interface BiasMetrics {
  confirmationBias: number;
  selectionBias: number;
  authorityBias: number;
  anchoringBias: number;
  availabilityBias: number;
  framingEffect: number;
}

export interface EmotionalMetrics {
  selfAwareness: number;
  empathy: number;
  emotionalRegulation: number;
  socialSkills: number;
  motivation: number;
  adaptability: number;
}

export interface AnalysisResult {
  id: string;
  videoUrl: string;
  title: string;
  duration: number;
  speakers: Speaker[];
  factChecks: FactCheck[];
  biases: BiasDetection[];
  overallSentiment: number;
  processingTime: number;
  
  // New advanced metrics
  credibilityMetrics?: CredibilityMetrics;
  communicationMetrics?: CommunicationMetrics;
  biasMetrics?: BiasMetrics;
  emotionalMetrics?: EmotionalMetrics;
}

export interface GraphNode {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  dependencies: string[];
  agent: string;
  api?: string;
}
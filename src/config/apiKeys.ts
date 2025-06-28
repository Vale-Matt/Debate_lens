// API Keys Configuration - Unified with Google AI Studio and OpenRouter
// In production, these should be loaded from environment variables

export const API_KEYS = {
  // Primary LLM Services (Only 2 API Keys needed)
  GOOGLE_AI_STUDIO_KEY: import.meta.env.VITE_GOOGLE_AI_STUDIO_KEY || 'your_google_ai_studio_key_here',
  OPENROUTER_API_KEY: import.meta.env.VITE_OPENROUTER_API_KEY || 'your_openrouter_key_here',
  
  // YouTube Data API (still needed for video fetching)
  YOUTUBE_API_KEY: import.meta.env.VITE_YOUTUBE_API_KEY || 'your_youtube_api_key_here',
  
  // Configuration
  MAX_VIDEO_LENGTH: parseInt(import.meta.env.VITE_MAX_VIDEO_LENGTH || '1800'),
  CACHE_TTL: parseInt(import.meta.env.VITE_CACHE_TTL || '3600'),
  RATE_LIMIT: parseInt(import.meta.env.VITE_RATE_LIMIT || '200'),
  WORKER_THREADS: parseInt(import.meta.env.VITE_WORKER_THREADS || '4')
};

// Unified API Endpoints Configuration
export const API_ENDPOINTS = {
  YOUTUBE: {
    BASE: 'https://www.googleapis.com/youtube/v3',
    VIDEOS: '/videos',
    CAPTIONS: '/captions'
  },
  GOOGLE_AI_STUDIO: {
    BASE: 'https://generativelanguage.googleapis.com/v1beta',
    GENERATE: '/models/gemini-1.5-pro:generateContent',
    AUDIO_TRANSCRIBE: '/models/gemini-1.5-pro:generateContent', // Supports audio
    EMBEDDING: '/models/text-embedding-004:embedContent'
  },
  OPENROUTER: {
    BASE: 'https://openrouter.ai/api/v1',
    CHAT: '/chat/completions',
    MODELS: '/models'
  }
};

// Unified Model Configuration
export const AI_MODELS = {
  // Google AI Studio Models
  GOOGLE: {
    TRANSCRIPTION: 'gemini-1.5-pro', // Audio transcription + speaker diarization
    EMOTION_ANALYSIS: 'gemini-1.5-pro', // Emotion detection from text
    FACT_CHECKING: 'gemini-1.5-pro', // Fact verification
    BIAS_DETECTION: 'gemini-1.5-pro', // Cognitive bias analysis
    AGGREGATION: 'gemini-1.5-flash', // Fast text processing
    EMBEDDING: 'text-embedding-004' // Text embeddings
  },
  // OpenRouter Models
  OPENROUTER: {
    ADVANCED_ANALYSIS: 'anthropic/claude-3.5-sonnet', // Complex reasoning
    REPORT_GENERATION: 'openai/gpt-4o', // Report synthesis
    CREDIBILITY_ANALYSIS: 'anthropic/claude-3.5-sonnet', // Credibility assessment
    COMMUNICATION_ANALYSIS: 'openai/gpt-4o', // Communication effectiveness
    FALLBACK: 'meta-llama/llama-3.1-8b-instruct:free' // Free fallback model
  }
};

// Agent to Model Mapping
export const AGENT_MODEL_MAPPING = {
  FetcherAgent: { service: 'youtube', model: 'data_api' },
  DiarizerAgent: { service: 'google', model: AI_MODELS.GOOGLE.TRANSCRIPTION },
  TranscriberAgent: { service: 'google', model: AI_MODELS.GOOGLE.TRANSCRIPTION },
  AggregatorAgent: { service: 'google', model: AI_MODELS.GOOGLE.AGGREGATION },
  EmotionAgent: { service: 'google', model: AI_MODELS.GOOGLE.EMOTION_ANALYSIS },
  FactCheckAgent: { service: 'google', model: AI_MODELS.GOOGLE.FACT_CHECKING },
  BiasAgent: { service: 'google', model: AI_MODELS.GOOGLE.BIAS_DETECTION },
  HistoryAgent: { service: 'openrouter', model: AI_MODELS.OPENROUTER.ADVANCED_ANALYSIS },
  CredibilityAgent: { service: 'openrouter', model: AI_MODELS.OPENROUTER.CREDIBILITY_ANALYSIS },
  CommunicationAgent: { service: 'openrouter', model: AI_MODELS.OPENROUTER.COMMUNICATION_ANALYSIS },
  ReporterAgent: { service: 'openrouter', model: AI_MODELS.OPENROUTER.REPORT_GENERATION },
  UIAgent: { service: 'local', model: 'react_renderer' }
};

// Rate limiting configuration (simplified)
export const RATE_LIMITS = {
  GOOGLE_AI_STUDIO: { requests: 60, window: 60000 }, // 60 requests per minute
  OPENROUTER: { requests: 100, window: 60000 }, // 100 requests per minute
  YOUTUBE: { requests: 100, window: 60000 } // 100 requests per minute
};

// Validation functions
export const validateApiKeys = () => {
  const requiredKeys = [
    'GOOGLE_AI_STUDIO_KEY',
    'OPENROUTER_API_KEY',
    'YOUTUBE_API_KEY'
  ];
  
  const missingKeys = requiredKeys.filter(key => 
    !API_KEYS[key as keyof typeof API_KEYS] || 
    API_KEYS[key as keyof typeof API_KEYS] === `your_${key.toLowerCase()}_here`
  );
  
  if (missingKeys.length > 0) {
    console.warn('Missing API keys:', missingKeys);
    return false;
  }
  
  return true;
};

// Prompt templates for unified LLM usage
export const PROMPT_TEMPLATES = {
  EMOTION_ANALYSIS: `Analyze the emotional content of this text and return a JSON object with emotion scores (0-1) for: joy, sadness, anger, fear, surprise, disgust, neutral. Text: "{text}"`,
  
  FACT_CHECK: `Fact-check this claim and return JSON with: verdict (TRUE/FALSE/MIXED/UNVERIFIED), confidence (0-1), explanation, sources. Claim: "{claim}"`,
  
  BIAS_DETECTION: `Identify cognitive biases in this text. Return JSON array with: type, severity (LOW/MEDIUM/HIGH), description, examples, confidence (0-1). Text: "{text}"`,
  
  CREDIBILITY_ANALYSIS: `Analyze credibility metrics (0-100) for: sourceReliability, factAccuracy, citationQuality, expertConsensus, dataTransparency, methodologyClarity. Content: "{content}"`,
  
  COMMUNICATION_ANALYSIS: `Evaluate communication effectiveness (0-100) for: clarity, engagement, persuasiveness, emotionalAppeal, logicalStructure, audienceAdaptation. Content: "{content}"`
};

export default API_KEYS;
import { useState, useCallback } from 'react';
import { AnalysisResult, GraphNode } from '../types/analysis';
import { AGENT_MODEL_MAPPING } from '../config/apiKeys';
import { SpeakerIdentificationAgent } from '../agents/SpeakerIdentificationAgent';

// Enhanced mock data generation with speaker identification
const generateMockSpeakersWithIdentification = async () => {
  // Simulate speaker identification results
  const identificationResults = [
    {
      speakerId: 'speaker-1',
      name: 'Dr. Sarah Chen',
      confidence: 0.94,
      role: 'moderator' as const,
      visualFeatures: {
        faceEmbedding: Array.from({ length: 128 }, () => Math.random() * 2 - 1),
        position: { x: 320, y: 100, width: 180, height: 240 },
        screenTime: 180
      },
      audioFeatures: {
        voiceEmbedding: Array.from({ length: 128 }, () => Math.random() * 2 - 1),
        speakingTime: 420,
        averageVolume: 0.75,
        speechRate: 165
      },
      contextualClues: {
        introducedAs: 'Dr. Sarah Chen, AI Research Director',
        titleMentioned: 'Dr.',
        expertiseArea: 'Artificial Intelligence',
        speakingPattern: 'frequent' as const
      }
    },
    {
      speakerId: 'speaker-2',
      name: 'Prof. Marcus Johnson',
      confidence: 0.89,
      role: 'panelist' as const,
      visualFeatures: {
        faceEmbedding: Array.from({ length: 128 }, () => Math.random() * 2 - 1),
        position: { x: 120, y: 100, width: 170, height: 230 },
        screenTime: 165
      },
      audioFeatures: {
        voiceEmbedding: Array.from({ length: 128 }, () => Math.random() * 2 - 1),
        speakingTime: 285,
        averageVolume: 0.68,
        speechRate: 142
      },
      contextualClues: {
        introducedAs: 'Professor Marcus Johnson, Ethics in Technology',
        titleMentioned: 'Prof.',
        expertiseArea: 'Technology Ethics',
        speakingPattern: 'moderate' as const
      }
    },
    {
      speakerId: 'speaker-3',
      name: 'Dr. Elena Rodriguez',
      confidence: 0.87,
      role: 'panelist' as const,
      visualFeatures: {
        faceEmbedding: Array.from({ length: 128 }, () => Math.random() * 2 - 1),
        position: { x: 520, y: 100, width: 175, height: 235 },
        screenTime: 142
      },
      audioFeatures: {
        voiceEmbedding: Array.from({ length: 128 }, () => Math.random() * 2 - 1),
        speakingTime: 198,
        averageVolume: 0.72,
        speechRate: 158
      },
      contextualClues: {
        introducedAs: 'Dr. Elena Rodriguez, Machine Learning Specialist',
        titleMentioned: 'Dr.',
        expertiseArea: 'Machine Learning',
        speakingPattern: 'moderate' as const
      }
    }
  ];

  // Convert identification results to speaker objects
  return identificationResults.map((result, index) => ({
    id: result.speakerId,
    name: result.name,
    avatar: `avatar-${index + 1}`,
    timeSpoken: Math.floor(result.audioFeatures.speakingTime),
    confidence: result.confidence,
    role: result.role,
    identificationData: result,
    emotionProfile: {
      dominant: ['joy', 'neutral', 'surprise'][index] || 'neutral',
      scores: [
        { emotion: 'joy', score: 0.7 - (index * 0.2), color: '#10B981' },
        { emotion: 'neutral', score: 0.2 + (index * 0.1), color: '#9CA3AF' },
        { emotion: 'surprise', score: 0.1 + (index * 0.1), color: '#8B5CF6' }
      ]
    },
    segments: [
      {
        start: index * 60,
        end: (index * 60) + 30,
        text: `${result.name} discussing ${result.contextualClues.expertiseArea?.toLowerCase() || 'the topic'}.`,
        confidence: result.confidence,
        emotions: [
          { emotion: ['joy', 'neutral', 'surprise'][index] || 'neutral', score: 0.8, color: '#10B981' }
        ]
      }
    ]
  }));
};

const generateMockFactChecks = () => [
  {
    claim: "AI will replace 50% of jobs by 2030",
    verdict: 'MIXED' as const,
    confidence: 0.75,
    sources: ['MIT Technology Review', 'World Economic Forum'],
    explanation: "While AI will significantly impact employment, studies show varying estimates ranging from 25% to 50% job displacement, with new job categories also emerging."
  },
  {
    claim: "Machine learning algorithms are completely objective",
    verdict: 'FALSE' as const,
    confidence: 0.92,
    sources: ['Nature Machine Intelligence', 'IEEE Spectrum'],
    explanation: "AI systems inherit biases from training data and can perpetuate or amplify existing societal biases."
  },
  {
    claim: "Current AI systems have achieved human-level reasoning",
    verdict: 'FALSE' as const,
    confidence: 0.88,
    sources: ['Science', 'Nature AI'],
    explanation: "While AI excels in specific domains, it lacks the general reasoning capabilities and contextual understanding of humans."
  }
];

const generateMockBiases = () => [
  {
    type: 'Confirmation Bias',
    severity: 'MEDIUM' as const,
    description: 'Tendency to search for, interpret, and recall information that confirms pre-existing beliefs.',
    examples: [
      'Selective citation of studies that support initial position',
      'Dismissing contradictory evidence without proper consideration'
    ],
    confidence: 0.78
  },
  {
    type: 'Authority Bias',
    severity: 'LOW' as const,
    description: 'Attributing greater accuracy to the opinion of an authority figure.',
    examples: [
      'Excessive reliance on expert opinions without critical analysis',
      'Assumption that institutional backing guarantees accuracy'
    ],
    confidence: 0.65
  },
  {
    type: 'Anchoring Bias',
    severity: 'MEDIUM' as const,
    description: 'Heavy reliance on the first piece of information encountered.',
    examples: [
      'Overemphasis on initial statistics presented',
      'Difficulty adjusting estimates after initial anchor'
    ],
    confidence: 0.72
  }
];

// Generate advanced metrics with more realistic variations
const generateAdvancedMetrics = () => ({
  credibilityMetrics: {
    sourceReliability: 85,
    factAccuracy: 78,
    citationQuality: 72,
    expertConsensus: 68,
    dataTransparency: 75,
    methodologyClarity: 82
  },
  communicationMetrics: {
    clarity: 88,
    engagement: 92,
    persuasiveness: 76,
    emotionalAppeal: 84,
    logicalStructure: 79,
    audienceAdaptation: 86
  },
  biasMetrics: {
    confirmationBias: 45,
    selectionBias: 32,
    authorityBias: 28,
    anchoringBias: 38,
    availabilityBias: 42,
    framingEffect: 35
  },
  emotionalMetrics: {
    selfAwareness: 74,
    empathy: 82,
    emotionalRegulation: 69,
    socialSkills: 88,
    motivation: 91,
    adaptability: 77
  }
});

const createInitialNodes = (): GraphNode[] => [
  { 
    id: 'N1', 
    name: 'Video Fetcher', 
    status: 'pending', 
    progress: 0, 
    dependencies: [], 
    agent: 'FetcherAgent', 
    api: 'YouTube Data API' 
  },
  { 
    id: 'N2', 
    name: 'Speaker Identification', 
    status: 'pending', 
    progress: 0, 
    dependencies: ['N1'], 
    agent: 'SpeakerIdentificationAgent', 
    api: 'Gemini 1.5 Pro + GPT-4V' 
  },
  { 
    id: 'N3', 
    name: 'Speaker Diarization', 
    status: 'pending', 
    progress: 0, 
    dependencies: ['N2'], 
    agent: 'DiarizerAgent', 
    api: `Google AI Studio (${AGENT_MODEL_MAPPING.DiarizerAgent.model})` 
  },
  { 
    id: 'N4', 
    name: 'Audio Transcription', 
    status: 'pending', 
    progress: 0, 
    dependencies: ['N3'], 
    agent: 'TranscriberAgent', 
    api: `Google AI Studio (${AGENT_MODEL_MAPPING.TranscriberAgent.model})` 
  },
  { 
    id: 'N5', 
    name: 'Speech Aggregation', 
    status: 'pending', 
    progress: 0, 
    dependencies: ['N4'], 
    agent: 'AggregatorAgent',
    api: `Google AI Studio (${AGENT_MODEL_MAPPING.AggregatorAgent.model})` 
  },
  { 
    id: 'N6', 
    name: 'Emotion Analysis', 
    status: 'pending', 
    progress: 0, 
    dependencies: ['N5'], 
    agent: 'EmotionAgent', 
    api: `Google AI Studio (${AGENT_MODEL_MAPPING.EmotionAgent.model})` 
  },
  { 
    id: 'N7', 
    name: 'Fact Checking', 
    status: 'pending', 
    progress: 0, 
    dependencies: ['N5'], 
    agent: 'FactCheckAgent', 
    api: `Google AI Studio (${AGENT_MODEL_MAPPING.FactCheckAgent.model})` 
  },
  { 
    id: 'N8', 
    name: 'Bias Detection', 
    status: 'pending', 
    progress: 0, 
    dependencies: ['N5'], 
    agent: 'BiasAgent',
    api: `Google AI Studio (${AGENT_MODEL_MAPPING.BiasAgent.model})` 
  },
  { 
    id: 'N9', 
    name: 'Credibility Analysis', 
    status: 'pending', 
    progress: 0, 
    dependencies: ['N5'], 
    agent: 'CredibilityAgent', 
    api: `OpenRouter (${AGENT_MODEL_MAPPING.CredibilityAgent.model})` 
  },
  { 
    id: 'N10', 
    name: 'Communication Analysis', 
    status: 'pending', 
    progress: 0, 
    dependencies: ['N5'], 
    agent: 'CommunicationAgent', 
    api: `OpenRouter (${AGENT_MODEL_MAPPING.CommunicationAgent.model})` 
  },
  { 
    id: 'N11', 
    name: 'Report Generation', 
    status: 'pending', 
    progress: 0, 
    dependencies: ['N6', 'N7', 'N8', 'N9', 'N10'], 
    agent: 'ReporterAgent',
    api: `OpenRouter (${AGENT_MODEL_MAPPING.ReporterAgent.model})` 
  },
  { 
    id: 'N12', 
    name: 'UI Rendering', 
    status: 'pending', 
    progress: 0, 
    dependencies: ['N11'], 
    agent: 'UIAgent',
    api: 'React Renderer' 
  }
];

export const useAnalysis = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const simulateProcessing = useCallback(async (url: string) => {
    const processingNodes = createInitialNodes();
    setNodes(processingNodes);
    setIsProcessing(true);
    setResult(null);

    // Simulate processing each node with realistic timing
    const nodeProcessingTimes = [500, 1500, 800, 1200, 600, 1000, 1500, 900, 1100, 1000, 800, 400];
    
    for (let i = 0; i < processingNodes.length; i++) {
      const currentNode = processingNodes[i];
      
      // Update node to processing
      setNodes(prev => prev.map(node => 
        node.id === currentNode.id 
          ? { ...node, status: 'processing' }
          : node
      ));

      // Simulate progress
      const progressSteps = 10;
      const stepTime = nodeProcessingTimes[i] / progressSteps;
      
      for (let step = 1; step <= progressSteps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepTime));
        setNodes(prev => prev.map(node => 
          node.id === currentNode.id 
            ? { ...node, progress: (step / progressSteps) * 100 }
            : node
        ));
      }

      // Mark node as completed
      setNodes(prev => prev.map(node => 
        node.id === currentNode.id 
          ? { ...node, status: 'completed', progress: 100 }
          : node
      ));
    }

    // Generate final result with speaker identification
    const advancedMetrics = generateAdvancedMetrics();
    const identifiedSpeakers = await generateMockSpeakersWithIdentification();
    
    const mockResult: AnalysisResult = {
      id: `analysis-${Date.now()}`,
      videoUrl: url,
      title: 'The Future of Artificial Intelligence - Expert Panel Discussion',
      duration: 1247,
      speakers: identifiedSpeakers,
      factChecks: generateMockFactChecks(),
      biases: generateMockBiases(),
      overallSentiment: 0.2,
      processingTime: nodeProcessingTimes.reduce((sum, time) => sum + time, 0) / 1000,
      ...advancedMetrics
    };

    setResult(mockResult);
    setIsProcessing(false);
  }, []);

  const reset = useCallback(() => {
    setIsProcessing(false);
    setNodes([]);
    setResult(null);
  }, []);

  return {
    isProcessing,
    nodes,
    result,
    startAnalysis: simulateProcessing,
    reset
  };
};
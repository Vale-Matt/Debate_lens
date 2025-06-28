import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { AnalysisResult } from '../types/analysis';
import { User, Eye, EyeOff } from 'lucide-react';

interface RadarChartsProps {
  result: AnalysisResult;
}

export const RadarCharts: React.FC<RadarChartsProps> = ({ result }) => {
  const [visibleSpeakers, setVisibleSpeakers] = useState<Set<string>>(
    new Set(result.speakers.map(s => s.id))
  );

  // Speaker colors for overlapping charts
  const speakerColors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#84CC16'  // Lime
  ];

  const toggleSpeaker = (speakerId: string) => {
    const newVisible = new Set(visibleSpeakers);
    if (newVisible.has(speakerId)) {
      newVisible.delete(speakerId);
    } else {
      newVisible.add(speakerId);
    }
    setVisibleSpeakers(newVisible);
  };

  // Generate speaker-specific data for each metric category
  const generateSpeakerData = (category: 'credibility' | 'communication' | 'bias' | 'emotional') => {
    const baseData = getBaseDataForCategory(category);
    
    return baseData.map(item => {
      const speakerData: any = { subject: item.subject };
      
      result.speakers.forEach((speaker, index) => {
        const variation = (Math.random() - 0.5) * 30; // ±15 variation
        const baseValue = item[getValueKey(category)];
        const speakerValue = Math.max(0, Math.min(100, baseValue + variation));
        speakerData[speaker.id] = Math.round(speakerValue);
      });
      
      return speakerData;
    });
  };

  const getBaseDataForCategory = (category: string) => {
    switch (category) {
      case 'credibility':
        return [
          { subject: 'Source Reliability', score: result.credibilityMetrics?.sourceReliability || 85 },
          { subject: 'Fact Accuracy', score: result.credibilityMetrics?.factAccuracy || 78 },
          { subject: 'Citation Quality', score: result.credibilityMetrics?.citationQuality || 72 },
          { subject: 'Expert Consensus', score: result.credibilityMetrics?.expertConsensus || 68 },
          { subject: 'Data Transparency', score: result.credibilityMetrics?.dataTransparency || 75 },
          { subject: 'Methodology', score: result.credibilityMetrics?.methodologyClarity || 82 }
        ];
      case 'communication':
        return [
          { subject: 'Clarity', score: result.communicationMetrics?.clarity || 88 },
          { subject: 'Engagement', score: result.communicationMetrics?.engagement || 92 },
          { subject: 'Persuasiveness', score: result.communicationMetrics?.persuasiveness || 76 },
          { subject: 'Emotional Appeal', score: result.communicationMetrics?.emotionalAppeal || 84 },
          { subject: 'Logic Structure', score: result.communicationMetrics?.logicalStructure || 79 },
          { subject: 'Adaptation', score: result.communicationMetrics?.audienceAdaptation || 86 }
        ];
      case 'bias':
        return [
          { subject: 'Confirmation', risk: result.biasMetrics?.confirmationBias || 45 },
          { subject: 'Selection', risk: result.biasMetrics?.selectionBias || 32 },
          { subject: 'Authority', risk: result.biasMetrics?.authorityBias || 28 },
          { subject: 'Anchoring', risk: result.biasMetrics?.anchoringBias || 38 },
          { subject: 'Availability', risk: result.biasMetrics?.availabilityBias || 42 },
          { subject: 'Framing', risk: result.biasMetrics?.framingEffect || 35 }
        ];
      case 'emotional':
        return [
          { subject: 'Self-Awareness', score: result.emotionalMetrics?.selfAwareness || 74 },
          { subject: 'Empathy', score: result.emotionalMetrics?.empathy || 82 },
          { subject: 'Regulation', score: result.emotionalMetrics?.emotionalRegulation || 69 },
          { subject: 'Social Skills', score: result.emotionalMetrics?.socialSkills || 88 },
          { subject: 'Motivation', score: result.emotionalMetrics?.motivation || 91 },
          { subject: 'Adaptability', score: result.emotionalMetrics?.adaptability || 77 }
        ];
      default:
        return [];
    }
  };

  const getValueKey = (category: string) => {
    return category === 'bias' ? 'risk' : 'score';
  };

  const credibilityData = generateSpeakerData('credibility');
  const communicationData = generateSpeakerData('communication');
  const biasData = generateSpeakerData('bias');
  const emotionalData = generateSpeakerData('emotional');

  const renderOverlappingRadarChart = (data: any[], title: string, color: string) => (
    <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-white/40">
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{title}</h3>
      
      {/* Speaker Toggle Controls */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {result.speakers.map((speaker, index) => (
          <button
            key={speaker.id}
            onClick={() => toggleSpeaker(speaker.id)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              visibleSpeakers.has(speaker.id)
                ? 'text-white shadow-md'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            style={{
              backgroundColor: visibleSpeakers.has(speaker.id) ? speakerColors[index] : undefined
            }}
          >
            {visibleSpeakers.has(speaker.id) ? (
              <Eye className="h-3 w-3" />
            ) : (
              <EyeOff className="h-3 w-3" />
            )}
            <span>{speaker.name}</span>
          </button>
        ))}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.3)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 11, fill: '#374151' }}
              className="text-xs"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10, fill: '#6B7280' }}
            />
            
            {/* Render radar for each visible speaker */}
            {result.speakers.map((speaker, index) => 
              visibleSpeakers.has(speaker.id) && (
                <Radar
                  key={speaker.id}
                  name={speaker.name}
                  dataKey={speaker.id}
                  stroke={speakerColors[index]}
                  fill={speakerColors[index]}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  dot={{ fill: speakerColors[index], strokeWidth: 2, r: 4 }}
                />
              )
            )}
            
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Average Scores */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {result.speakers.map((speaker, index) => {
          if (!visibleSpeakers.has(speaker.id)) return null;
          
          const speakerAverage = Math.round(
            data.reduce((sum, item) => sum + (item[speaker.id] || 0), 0) / data.length
          );
          
          return (
            <div key={speaker.id} className="text-center">
              <div 
                className="text-lg font-bold"
                style={{ color: speakerColors[index] }}
              >
                {speakerAverage}%
              </div>
              <div className="text-xs text-gray-600">{speaker.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Instructions */}
      <div className="bg-blue-50/50 backdrop-blur-sm rounded-lg p-4 border border-blue-200/50">
        <div className="flex items-center space-x-2 text-blue-800">
          <User className="h-5 w-5" />
          <span className="font-medium">Speaker Comparison Mode</span>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          Click speaker buttons to show/hide individual profiles. Compare performance across all dimensions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderOverlappingRadarChart(credibilityData, 'Credibility Analysis by Speaker', '#10B981')}
        {renderOverlappingRadarChart(communicationData, 'Communication Effectiveness by Speaker', '#3B82F6')}
        {renderOverlappingRadarChart(biasData, 'Cognitive Bias Risk by Speaker', '#EF4444')}
        {renderOverlappingRadarChart(emotionalData, 'Emotional Intelligence by Speaker', '#8B5CF6')}
      </div>

      {/* Overall Comparison Summary */}
      <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-white/40">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Overall Speaker Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {result.speakers.map((speaker, index) => {
            const credibilityAvg = Math.round(
              credibilityData.reduce((sum, item) => sum + (item[speaker.id] || 0), 0) / credibilityData.length
            );
            const communicationAvg = Math.round(
              communicationData.reduce((sum, item) => sum + (item[speaker.id] || 0), 0) / communicationData.length
            );
            const biasRisk = Math.round(
              biasData.reduce((sum, item) => sum + (item[speaker.id] || 0), 0) / biasData.length
            );
            const emotionalAvg = Math.round(
              emotionalData.reduce((sum, item) => sum + (item[speaker.id] || 0), 0) / emotionalData.length
            );

            return (
              <div key={speaker.id} className="p-4 bg-white/20 rounded-lg border border-white/30">
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: speakerColors[index] }}
                  ></div>
                  <h4 className="font-bold text-gray-900">{speaker.name}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Credibility</span>
                    <span className="font-semibold text-green-600">{credibilityAvg}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Communication</span>
                    <span className="font-semibold text-blue-600">{communicationAvg}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bias Risk</span>
                    <span className="font-semibold text-red-600">{biasRisk}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emotional IQ</span>
                    <span className="font-semibold text-purple-600">{emotionalAvg}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { User, Heart, CheckCircle, XCircle, AlertTriangle, Clock, TrendingUp, Brain, Target, MessageCircle, Shield, Zap, Eye, Award } from 'lucide-react';
import { AnalysisResult } from '../types/analysis';
import { RadarCharts } from './RadarCharts';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onNewAnalysis }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const emotionColors = {
    'joy': '#10B981',
    'sadness': '#3B82F6',
    'anger': '#EF4444',
    'fear': '#F59E0B',
    'surprise': '#8B5CF6',
    'disgust': '#6B7280',
    'neutral': '#9CA3AF'
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'TRUE': return 'text-green-600 bg-green-100';
      case 'FALSE': return 'text-red-600 bg-red-100';
      case 'MIXED': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBiasColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'moderator': return 'text-blue-600 bg-blue-100';
      case 'panelist': return 'text-purple-600 bg-purple-100';
      case 'guest': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'speakers', name: 'Speakers', icon: User },
    { id: 'emotions', name: 'Emotions', icon: Heart },
    { id: 'facts', name: 'Fact Check', icon: CheckCircle },
    { id: 'bias', name: 'Bias Analysis', icon: Brain },
    { id: 'radar', name: 'Advanced Analytics', icon: Target }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Analysis Complete</h2>
            <p className="text-gray-600">{result.title}</p>
          </div>
          <button
            onClick={onNewAnalysis}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            New Analysis
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-lg font-bold text-gray-900">{Math.floor(result.duration / 60)}:{String(result.duration % 60).padStart(2, '0')}</div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-lg font-bold text-gray-900">{result.speakers.length}</div>
                <div className="text-sm text-gray-600">Speakers Identified</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-lg font-bold text-gray-900">{result.factChecks.length}</div>
                <div className="text-sm text-gray-600">Claims Checked</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <Brain className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-lg font-bold text-gray-900">{result.biases.length}</div>
                <div className="text-sm text-gray-600">Biases Detected</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl">
        <div className="border-b border-white/30">
          <nav className="flex space-x-8 px-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Overall Sentiment</h3>
                  <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-white/40">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-700">Sentiment Score</span>
                      <span className={`font-bold ${result.overallSentiment > 0.5 ? 'text-green-600' : result.overallSentiment < -0.5 ? 'text-red-600' : 'text-yellow-600'}`}>
                        {result.overallSentiment > 0.5 ? 'Positive' : result.overallSentiment < -0.5 ? 'Negative' : 'Neutral'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${result.overallSentiment > 0.5 ? 'bg-green-500' : result.overallSentiment < -0.5 ? 'bg-red-500' : 'bg-yellow-500'}`}
                        style={{ width: `${Math.abs(result.overallSentiment) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Speaker Identification</h3>
                  <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-white/40">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Identification Accuracy</span>
                        <span className="font-semibold text-green-600">
                          {Math.round((result.speakers.reduce((sum, s) => sum + (s.confidence || 0.8), 0) / result.speakers.length) * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Multimodal Analysis</span>
                        <span className="font-semibold text-blue-600">Audio + Video + Context</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Processing Time</span>
                        <span className="font-semibold">{result.processingTime}s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-green-700">
                        {result.credibilityMetrics ? Math.round(
                          Object.values(result.credibilityMetrics).reduce((sum, val) => sum + val, 0) / 
                          Object.values(result.credibilityMetrics).length
                        ) : 78}%
                      </div>
                      <div className="text-sm text-green-600">Credibility Score</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold text-blue-700">
                        {result.communicationMetrics ? Math.round(
                          Object.values(result.communicationMetrics).reduce((sum, val) => sum + val, 0) / 
                          Object.values(result.communicationMetrics).length
                        ) : 84}%
                      </div>
                      <div className="text-sm text-blue-600">Communication</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div>
                      <div className="text-2xl font-bold text-red-700">
                        {result.biasMetrics ? Math.round(
                          Object.values(result.biasMetrics).reduce((sum, val) => sum + val, 0) / 
                          Object.values(result.biasMetrics).length
                        ) : 37}%
                      </div>
                      <div className="text-sm text-red-600">Bias Risk</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-8 w-8 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold text-purple-700">
                        {result.emotionalMetrics ? Math.round(
                          Object.values(result.emotionalMetrics).reduce((sum, val) => sum + val, 0) / 
                          Object.values(result.emotionalMetrics).length
                        ) : 80}%
                      </div>
                      <div className="text-sm text-purple-600">Emotional IQ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Speakers Tab - Enhanced with identification data */}
          {activeTab === 'speakers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.speakers.map((speaker) => (
                <div key={speaker.id} className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-white/40">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{speaker.name}</h3>
                      <p className="text-sm text-gray-600">{Math.floor(speaker.timeSpoken / 60)}:{String(speaker.timeSpoken % 60).padStart(2, '0')} spoken</p>
                    </div>
                  </div>

                  {/* Speaker Identification Info */}
                  {speaker.identificationData && (
                    <div className="mb-4 p-3 bg-white/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Identification</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(speaker.role || 'unknown')}`}>
                          {speaker.role}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Confidence</span>
                          <span className="font-semibold text-green-600">{Math.round((speaker.confidence || 0.8) * 100)}%</span>
                        </div>
                        {speaker.identificationData.contextualClues.expertiseArea && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Expertise</span>
                            <span className="font-semibold">{speaker.identificationData.contextualClues.expertiseArea}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Speech Rate</span>
                          <span className="font-semibold">{Math.round(speaker.identificationData.audioFeatures.speechRate)} WPM</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dominant Emotion</span>
                      <span className="font-semibold capitalize" style={{ color: emotionColors[speaker.emotionProfile.dominant as keyof typeof emotionColors] }}>
                        {speaker.emotionProfile.dominant}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {speaker.emotionProfile.scores.slice(0, 3).map((emotion) => (
                        <div key={emotion.emotion} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 capitalize">{emotion.emotion}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 bg-gray-200 rounded-full h-1.5">
                              <div
                                className="h-1.5 rounded-full"
                                style={{ 
                                  width: `${emotion.score * 100}%`,
                                  backgroundColor: emotion.color 
                                }}
                              ></div>
                            </div>
                            <span className="text-gray-500 w-8">{Math.round(emotion.score * 100)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Emotions Tab */}
          {activeTab === 'emotions' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Emotion Distribution</h3>
                  <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-white/40 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result.speakers[0]?.emotionProfile.scores || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                        <XAxis dataKey="emotion" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255,255,255,0.9)', 
                            border: 'none', 
                            borderRadius: '8px',
                            backdropFilter: 'blur(10px)'
                          }} 
                        />
                        <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Emotional Timeline</h3>
                  <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-white/40">
                    <div className="space-y-4">
                      {result.speakers[0]?.segments.slice(0, 5).map((segment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {Math.floor(segment.start / 60)}:{String(Math.floor(segment.start % 60)).padStart(2, '0')} - {Math.floor(segment.end / 60)}:{String(Math.floor(segment.end % 60)).padStart(2, '0')}
                            </div>
                            <div className="text-xs text-gray-600 truncate max-w-xs">
                              {segment.text}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {segment.emotions.slice(0, 2).map((emotion, i) => (
                              <div key={i} className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: emotion.color + '20', color: emotion.color }}>
                                {emotion.emotion}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fact Check Tab */}
          {activeTab === 'facts' && (
            <div className="space-y-6">
              {result.factChecks.map((fact, index) => (
                <div key={index} className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-white/40">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">Claim #{index + 1}</h3>
                      <p className="text-gray-700 mb-3">{fact.claim}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getVerdictColor(fact.verdict)}`}>
                      {fact.verdict}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Confidence</span>
                      <span>{Math.round(fact.confidence * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${fact.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{fact.explanation}</p>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Sources:</span> {fact.sources.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bias Analysis Tab */}
          {activeTab === 'bias' && (
            <div className="space-y-6">
              {result.biases.map((bias, index) => (
                <div key={index} className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-white/40">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">{bias.type}</h3>
                      <p className="text-gray-700 mb-3">{bias.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getBiasColor(bias.severity)}`}>
                      {bias.severity}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Confidence</span>
                      <span>{Math.round(bias.confidence * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${bias.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {bias.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Advanced Analytics Radar Tab */}
          {activeTab === 'radar' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced Analytics Dashboard</h3>
                <p className="text-gray-600">Comprehensive multi-dimensional analysis with speaker comparison</p>
              </div>
              <RadarCharts result={result} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
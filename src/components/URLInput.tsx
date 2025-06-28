import React, { useState } from 'react';
import { Play, Link, AlertCircle, CheckCircle } from 'lucide-react';

interface URLInputProps {
  onAnalyze: (url: string) => void;
  isProcessing: boolean;
}

export const URLInput: React.FC<URLInputProps> = ({ onAnalyze, isProcessing }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');

  const validateYouTubeURL = (url: string): boolean => {
    const patterns = [
      /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^https?:\/\/youtu\.be\/[\w-]+/,
      /^https?:\/\/(?:www\.)?youtube\.com\/embed\/[\w-]+/
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (value.trim()) {
      const valid = validateYouTubeURL(value.trim());
      setIsValid(valid);
      setError(valid ? '' : 'Please enter a valid YouTube URL');
    } else {
      setIsValid(false);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isProcessing) {
      onAnalyze(url.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Analyze Any YouTube Video
          </h2>
          <p className="text-gray-600 text-lg">
            Extract insights using our advanced Graph of Thoughts AI system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full pl-12 pr-12 py-4 text-lg bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={isProcessing}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              {url && (
                isValid ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : error ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : null
              )}
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid || isProcessing}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-3"
          >
            <Play className="h-5 w-5" />
            <span>{isProcessing ? 'Processing...' : 'Generate Analysis'}</span>
          </button>
        </form>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="text-2xl font-bold text-blue-600">10+</div>
            <div className="text-sm text-gray-600">AI Agents</div>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="text-2xl font-bold text-green-600">&lt;2min</div>
            <div className="text-sm text-gray-600">Analysis Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Video Analysis Platform</h1>
              <p className="text-xs text-gray-600">AI-Powered Insights & Graph of Thoughts</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All Systems Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
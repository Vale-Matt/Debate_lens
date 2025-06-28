import React from 'react';
import { CheckCircle, Clock, AlertCircle, Loader } from 'lucide-react';
import { GraphNode } from '../types/analysis';

interface GraphProgressProps {
  nodes: GraphNode[];
}

export const GraphProgress: React.FC<GraphProgressProps> = ({ nodes }) => {
  const getStatusIcon = (status: GraphNode['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Loader className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: GraphNode['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'processing':
        return 'border-blue-500 bg-blue-50';
      case 'error':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Graph of Thoughts Processing
          </h3>
          <p className="text-gray-600">
            Multi-agent AI system analyzing your video
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node, index) => (
            <div
              key={node.id}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${getStatusColor(node.status)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(node.status)}
                  <div>
                    <h4 className="font-semibold text-gray-900">{node.name}</h4>
                    <p className="text-xs text-gray-600">{node.agent}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    N{index + 1}
                  </div>
                  {node.api && (
                    <div className="text-xs text-gray-500">{node.api}</div>
                  )}
                </div>
              </div>

              {node.status === 'processing' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{node.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${node.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {node.dependencies.length > 0 && (
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Depends on:</span>{' '}
                  {node.dependencies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="bg-white/30 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/40">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Header } from './components/Header';
import { URLInput } from './components/URLInput';
import { GraphProgress } from './components/GraphProgress';
import { AnalysisResults } from './components/AnalysisResults';
import { useAnalysis } from './hooks/useAnalysis';

function App() {
  const { isProcessing, nodes, result, startAnalysis, reset } = useAnalysis();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {!isProcessing && !result && (
          <URLInput onAnalyze={startAnalysis} isProcessing={isProcessing} />
        )}

        {isProcessing && (
          <GraphProgress nodes={nodes} />
        )}

        {result && (
          <AnalysisResults result={result} onNewAnalysis={reset} />
        )}
      </main>

      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 Video Analysis Platform. Powered by Graph of Thoughts AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
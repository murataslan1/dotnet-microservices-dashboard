import React, { useState } from 'react';
import Card from './Card';
import Spinner from './Spinner';
import { GeminiIcon, PaperAirplaneIcon, ExclamationTriangleIcon } from './icons';

const AiGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Explain microservices in 2 lines');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      // Use relative path to leverage the Vite proxy
      const res = await fetch('/ai/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`The AI service returned an error: ${res.status} ${res.statusText}. Ensure your GEMINI_API_KEY is set in the AiService environment.`);
      }

      const data = await res.json();
      setResponse(data.output || 'No output received from AI.');
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message || "An unknown error occurred. Is the AiService running?");
        } else {
            setError("An unknown error occurred. Is the AiService running?");
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Gemini AI Assistant" icon={<GeminiIcon />}>
      <div className="flex flex-col h-full">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Gemini anything..."
            className="flex-grow bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="flex-shrink-0 bg-cyan-600 text-white rounded-md p-2 h-10 w-10 flex items-center justify-center hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Spinner size="5" /> : <PaperAirplaneIcon />}
          </button>
        </form>
        
        <div className="mt-4 flex-grow bg-slate-900/70 rounded-md p-4 min-h-[120px] max-h-[250px] overflow-y-auto border border-slate-700">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Spinner message="Gemini is thinking..." />
            </div>
          )}
          {error && (
             <div className="text-center text-red-400 flex flex-col items-center justify-center h-full">
                <div className="w-10 h-10 mb-2"><ExclamationTriangleIcon/></div>
                <p className="font-semibold">Request Failed</p>
                <p className="text-sm text-slate-400 max-w-md">{error}</p>
             </div>
          )}
          {response && (
            <p className="text-slate-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">{response}</p>
          )}
          {!isLoading && !error && !response && (
            <p className="text-slate-500 text-center pt-8">The AI's response will appear here.</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AiGenerator;

import React from 'react';
import { DotNetIcon, GeminiIcon, OcelotIcon, ReactIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-md sticky top-0 z-10 border-b border-slate-700">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 tracking-tight">
            .NET Microservices Dashboard
          </h1>
          <p className="text-slate-400 mt-1 text-sm md:text-base">
            Ocelot API Gateway + Gemini AI
          </p>
        </div>
        <div className="flex items-center space-x-4">
            <div title="React" className="h-8 w-8 text-cyan-400"><ReactIcon /></div>
            <div title=".NET" className="h-7 w-7 text-purple-400"><DotNetIcon /></div>
            <div title="Ocelot" className="h-7 w-7 text-green-400"><OcelotIcon /></div>
            <div title="Gemini" className="h-7 w-7 text-blue-400"><GeminiIcon /></div>
        </div>
      </div>
    </header>
  );
};

export default Header;

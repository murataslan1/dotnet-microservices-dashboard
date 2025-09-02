
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 h-full flex flex-col ${className}`}>
      <div className="flex items-center p-4 border-b border-slate-700">
        <div className="h-6 w-6 mr-3 text-cyan-400">{icon}</div>
        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      </div>
      <div className="p-4 flex-grow relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Card;


import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import OrderList from './components/OrderList';
import AiGenerator from './components/AiGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-3">
            <AiGenerator />
          </div>
          <div className="lg:col-span-2">
            <OrderList />
          </div>
          <div>
            <ProductList />
          </div>
        </div>
        <footer className="text-center text-slate-500 mt-12 pb-4">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
          <p>Interfacing with a .NET Microservices Backend via Ocelot API Gateway</p>
        </footer>
      </main>
    </div>
  );
};

export default App;

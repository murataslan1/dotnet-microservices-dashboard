import React, { useState, useEffect, useCallback } from 'react';
import { Product, Status } from '../types';
import Card from './Card';
import Spinner from './Spinner';
import { CubeIcon, ExclamationTriangleIcon } from './icons';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>(Status.Idle);

  const fetchProducts = useCallback(async () => {
    setStatus(Status.Loading);
    try {
      // Use relative path to leverage the Vite proxy
      const response = await fetch('/catalog/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      setProducts(data);
      setStatus(Status.Success);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setStatus(Status.Error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    switch (status) {
      case Status.Loading:
        return <div className="absolute inset-0 flex items-center justify-center"><Spinner message="Loading Products..." /></div>;
      case Status.Error:
        return (
          <div className="text-center text-red-400 flex flex-col items-center justify-center h-full">
             <div className="w-12 h-12 mb-2"><ExclamationTriangleIcon/></div>
            <p className="font-semibold">Failed to load products.</p>
            <p className="text-sm text-slate-400">Is the CatalogService running?</p>
            <button onClick={fetchProducts} className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-md text-white text-sm font-semibold transition-colors">
              Retry
            </button>
          </div>
        );
      case Status.Success:
        return (
          <ul className="space-y-3 h-96 overflow-y-auto pr-2">
            {products.map((product) => (
              <li key={product.id} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-md">
                <span className="text-slate-300">{product.name}</span>
                <span className="font-mono text-cyan-400 bg-slate-900 px-2 py-1 rounded text-sm">
                  ${product.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <Card title="Product Catalog" icon={<CubeIcon />}>
      {renderContent()}
    </Card>
  );
};

export default ProductList;
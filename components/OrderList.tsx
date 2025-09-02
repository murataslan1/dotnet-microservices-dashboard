import React, { useState, useEffect, useCallback } from 'react';
import { Order, Status } from '../types';
import Card from './Card';
import Spinner from './Spinner';
import { ShoppingCartIcon, ExclamationTriangleIcon } from './icons';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<Status>(Status.Idle);

  const fetchOrders = useCallback(async () => {
    setStatus(Status.Loading);
    try {
      // Use relative path to leverage the Vite proxy
      const response = await fetch('/orders/api/orders');
       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Order[] = await response.json();
      setOrders(data);
      setStatus(Status.Success);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setStatus(Status.Error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    switch (status) {
      case Status.Loading:
        return <div className="absolute inset-0 flex items-center justify-center"><Spinner message="Loading Orders..."/></div>;
      case Status.Error:
        return (
          <div className="text-center text-red-400 flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 mb-2"><ExclamationTriangleIcon/></div>
            <p className="font-semibold">Failed to load orders.</p>
            <p className="text-sm text-slate-400">Is the OrderService running?</p>
             <button onClick={fetchOrders} className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-md text-white text-sm font-semibold transition-colors">
              Retry
            </button>
          </div>
        );
      case Status.Success:
        return (
          <div className="space-y-4 h-96 overflow-y-auto pr-2">
            {orders.map((order) => (
              <div key={order.id} className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-slate-200">Order #{order.id}</p>
                    <p className="text-sm text-slate-400">Customer: {order.customerName}</p>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <ul className="text-sm space-y-1 border-t border-slate-600 pt-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-slate-300">{item.quantity}x {item.productName}</span>
                      <span className="font-mono text-cyan-400">${(item.quantity * item.unitPrice).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card title="Recent Orders" icon={<ShoppingCartIcon />}>
      {renderContent()}
    </Card>
  );
};

export default OrderList;

import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl animate-slide-in flex flex-col">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-xl serif">Your Cart ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <p className="text-sm font-medium">Your cart is empty.</p>
              <button onClick={onClose} className="text-black border-b border-black text-sm pb-1 font-bold">START SHOPPING</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 bg-stone-100 overflow-hidden rounded-sm flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <span className="text-sm font-semibold">${item.price * item.quantity}</span>
                  </div>
                  <p className="text-xs text-stone-500 mb-3">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-stone-200 rounded-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-1 hover:bg-stone-50"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-1 hover:bg-stone-50"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-xs text-stone-400 hover:text-red-500 transition-colors"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-stone-100 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-500 font-medium">Subtotal</span>
              <span className="text-xl font-semibold">${total}</span>
            </div>
            <button className="w-full bg-stone-900 text-white py-4 rounded-sm font-bold tracking-widest text-sm hover:bg-stone-800 transition-colors">
              CHECKOUT
            </button>
            <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

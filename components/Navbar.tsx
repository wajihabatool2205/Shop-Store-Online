
import React from 'react';
import { SHOP_NAME } from '../constants';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAi: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenAi }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-2xl z-40 border-b border-stone-100/50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        
        {/* Left: Logo Name */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-[0.2em] serif cursor-pointer group w-fit">
            {SHOP_NAME}
            <span className="block h-px w-0 group-hover:w-full bg-black transition-all duration-500"></span>
          </h1>
        </div>

        {/* Center: Navigation Lists */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-10 text-[10px] font-bold tracking-[0.3em] text-[#6B6B6B] uppercase">
          <a href="#collection" className="hover:text-black transition-colors">New Arrivals</a>
          <a href="#collection" className="hover:text-black transition-colors">Furniture</a>
          <a href="#collection" className="hover:text-black transition-colors">Lighting</a>
          <a href="#collection" className="hover:text-black transition-colors">About</a>
        </div>

        {/* Right: Cart only */}
        <div className="flex-1 flex justify-end">
          <button 
            onClick={onOpenCart}
            className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-[#6B6B6B] hover:text-black transition-all relative group"
          >
            <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-stone-100 transition-all duration-500 border border-stone-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1C1C1C] text-white text-[8px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
                {cartCount}
              </span>
            )}
            <span className="hidden sm:inline uppercase">Cart</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

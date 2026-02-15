
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F4F0] mb-6 rounded-[2px]">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700"></div>
        <button 
          onClick={onAddToCart}
          className="absolute bottom-6 left-6 right-6 bg-white py-4 text-[10px] font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-xl"
        >
          ADD TO COLLECTION
        </button>
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-medium tracking-tight text-[#1C1C1C]">{product.name}</h3>
          <span className="text-xs font-semibold text-stone-400">${product.price}</span>
        </div>
        <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold italic">{product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;

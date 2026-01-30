
import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onAddToCart: (e: React.MouseEvent, product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="aspect-[4/5] overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-black">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-slate-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
      
      <button 
        onClick={(e) => onAddToCart(e, product)}
        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-black hover:text-white"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default ProductCard;

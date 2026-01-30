
import React from 'react';
import { ShoppingBag, Search, Menu, ChevronDown } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onCategorySelect: (cat: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onHomeClick, onCategorySelect }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 text-slate-500 hover:text-slate-900 lg:hidden">
              <Menu size={24} />
            </button>
            <button 
              onClick={onHomeClick}
              className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">S</div>
              <span>SimpleBuy</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => onCategorySelect('All')} className="text-sm font-medium text-slate-600 hover:text-slate-900">Shop All</button>
            <button onClick={() => onCategorySelect('Sports')} className="text-sm font-medium text-slate-600 hover:text-slate-900">Sports</button>
            <button onClick={() => onCategorySelect('Stationery')} className="text-sm font-medium text-slate-600 hover:text-slate-900">Stationery</button>
            <button onClick={() => onCategorySelect('Dresses')} className="text-sm font-medium text-slate-600 hover:text-slate-900">Dresses</button>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 group-hover:text-slate-900">
                More <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button onClick={() => onCategorySelect('Electronics')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">Electronics</button>
                <button onClick={() => onCategorySelect('Home')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">Home</button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-slate-500 hover:text-slate-900 hidden sm:block">
              <Search size={20} />
            </button>
            <button 
              onClick={onCartClick}
              className="group relative p-2 text-slate-500 hover:text-slate-900"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

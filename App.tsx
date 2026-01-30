
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ProductCard from './components/ProductCard';
import { Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import { ChevronRight, CheckCircle, Package, ArrowLeft, ShieldCheck, CreditCard } from 'lucide-react';

/** Home Page Component */
const HomePage: React.FC<{
  onProductClick: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  initialCategory?: string;
}> = ({ onProductClick, onAddToCart, initialCategory = 'All' }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Sync with URL if user clicks from Navbar
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(PRODUCTS.map(p => p.category)));
    return ['All', ...cats];
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Discover Everything
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mb-8">
          From high-performance sports gear to elegant stationery and fashion, explore our curated layers of quality products.
        </p>

        {/* Category Pill Bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat 
                ? 'bg-black text-white shadow-md' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={onProductClick}
            onAddToCart={(e, p) => {
              e.stopPropagation();
              onAddToCart(p);
            }}
          />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

/** Product Detail Page Component */
const ProductDetailPage: React.FC<{
  onAddToCart: (p: Product) => void;
}> = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) return <div className="p-20 text-center">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-500 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Gallery */}
        <div className="bg-slate-100 rounded-3xl overflow-hidden aspect-square shadow-inner">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{product.category}</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">{product.name}</h1>
          <p className="text-3xl font-light text-slate-900 mb-8">${product.price.toFixed(2)}</p>
          
          <div className="prose prose-slate mb-10">
            <p className="text-lg text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4 mb-10">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Key Features</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-slate-600">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => onAddToCart(product)}
            className="w-full sm:w-auto px-12 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl"
          >
            Add to Cart
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

/** Checkout Page Component */
const CheckoutPage: React.FC<{
  cart: CartItem[];
  onSuccess: () => void;
}> = ({ cart, onSuccess }) => {
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    setTimeout(() => navigate('/'), 0);
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-3xl font-bold">Secure Checkout</h1>
          
          <div className="p-8 bg-white border border-slate-200 rounded-2xl space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Package size={20} />
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                <input type="text" placeholder="John" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black outline-none" defaultValue="Demo" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black outline-none" defaultValue="User" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Address</label>
                <input type="text" placeholder="Street Address" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black outline-none" defaultValue="123 Innovation Drive" />
              </div>
            </div>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-2xl space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CreditCard size={20} />
              Payment (Simulated)
            </h2>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl border-dashed">
              <div className="flex items-center gap-3 text-slate-600">
                <ShieldCheck size={24} className="text-green-600" />
                <p className="text-sm">Payment information is mocked for this demo. No real transactions will occur.</p>
              </div>
            </div>
            <button 
              onClick={onSuccess}
              className="w-full bg-black text-white py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              Pay ${subtotal.toFixed(2)} Now
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 p-8 bg-slate-100 rounded-3xl space-y-6 shadow-sm">
            <h3 className="text-lg font-bold">Order Summary</h3>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between items-center text-sm">
                  <div className="flex gap-3 items-center">
                    <img src={item.product.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                    <span className="text-slate-600">{item.product.name} (x{item.quantity})</span>
                  </div>
                  <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Success Page Component */
const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
        <CheckCircle size={48} />
      </div>
      <h1 className="text-4xl font-black text-slate-900 mb-4">Order Confirmed!</h1>
      <p className="text-lg text-slate-500 mb-12">
        Thank you for your purchase. We've sent a confirmation email with your order details and tracking link.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
        >
          Return Home
        </button>
        <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors">
          Track Order
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  // Handle cross-page navigation to specific categories
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';

  return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <NavbarContent 
          totalCount={totalCount} 
          setIsCartOpen={setIsCartOpen} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePageContent addToCart={addToCart} initialCategory={initialCategory} />} />
            <Route path="/product/:id" element={<ProductDetailContent addToCart={addToCart} />} />
            <Route path="/checkout" element={<CheckoutContent cart={cart} clearCart={clearCart} />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-400 text-sm">
              &copy; 2024 SimpleBuy Demo. Built for showcase purposes.
            </p>
          </div>
        </footer>

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onRemove={removeFromCart}
          onCheckout={() => {
            setIsCartOpen(false);
            window.location.hash = '#/checkout';
          }}
        />
      </div>
  );
};

/** Wrap in Router at top level */
const AppWrapper = () => (
  <HashRouter>
    <ScrollToTop />
    <App />
  </HashRouter>
);

// Helper Components to avoid "useNavigate" errors outside Router context

const NavbarContent: React.FC<{ totalCount: number; setIsCartOpen: (b: boolean) => void }> = ({ totalCount, setIsCartOpen }) => {
  const navigate = useNavigate();
  return (
    <Navbar 
      cartCount={totalCount} 
      onCartClick={() => setIsCartOpen(true)}
      onHomeClick={() => navigate('/')}
      onCategorySelect={(cat) => navigate(`/?category=${cat}`)}
    />
  );
};

const HomePageContent: React.FC<{ addToCart: (p: Product) => void; initialCategory: string }> = ({ addToCart, initialCategory }) => {
  const navigate = useNavigate();
  return (
    <HomePage 
      onProductClick={(p) => navigate(`/product/${p.id}`)}
      onAddToCart={addToCart}
      initialCategory={initialCategory}
    />
  );
};

const ProductDetailContent: React.FC<{ addToCart: (p: Product) => void }> = ({ addToCart }) => {
  return <ProductDetailPage onAddToCart={addToCart} />;
};

const CheckoutContent: React.FC<{ cart: CartItem[]; clearCart: () => void }> = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  return (
    <CheckoutPage 
      cart={cart} 
      onSuccess={() => {
        clearCart();
        navigate('/success');
      }} 
    />
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default AppWrapper;


import { Product } from './types';

export const PRODUCTS: Product[] = [
  // --- ELECTRONICS ---
  {
    id: '1',
    name: 'Minimalist Wireless Headphones',
    price: 129.99,
    category: 'Electronics',
    description: 'Experience pure sound with our noise-cancelling wireless headphones. Designed for comfort and all-day listening.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    features: ['40h Battery Life', 'Active Noise Cancellation', 'Memory Foam Cushions']
  },
  {
    id: '6',
    name: 'Mechanical Keypad',
    price: 65.00,
    category: 'Electronics',
    description: 'Compact 60% mechanical keyboard with tactile brown switches and customizable RGB lighting for the ultimate setup.',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80',
    features: ['PBT Keycaps', 'USB-C Connectivity', 'Hotswappable']
  },

  // --- SPORTS ---
  {
    id: 'sports-1',
    name: 'Pro-Grip Yoga Mat',
    price: 45.00,
    category: 'Sports',
    description: 'Extra thick eco-friendly yoga mat with non-slip texture. Provides superior cushioning for joints during intense sessions.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
    features: ['Eco-friendly TPE', 'Non-slip surface', 'Carry strap included']
  },

  // --- STATIONERY ---
  {
    id: 'stat-1',
    name: 'Leather Bound Journal',
    price: 32.50,
    category: 'Stationery',
    description: 'Handcrafted genuine leather journal with cream-colored acid-free paper. The perfect place for your thoughts and sketches.',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80',
    features: ['160 GSM Paper', 'Refillable Cover', 'Elastic Closure']
  },
  {
    id: 'stat-2',
    name: 'Minimalist Brass Pen',
    price: 58.00,
    category: 'Stationery',
    description: 'A solid brass fountain pen that develops a unique patina over time. Weighted perfectly for a smooth writing experience.',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    features: ['Solid Brass', 'Fine Nib', 'Luxury Gift Box']
  },

  // --- DRESSES ---
  {
    id: 'dress-1',
    name: 'Linen Summer Wrap',
    price: 89.00,
    category: 'Dresses',
    description: 'Breathable 100% linen wrap dress in a soft oatmeal hue. Versatile enough for beach days or casual evening dinners.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    features: ['Pure Linen', 'Adjustable Tie', 'Side Pockets']
  },
  {
    id: 'dress-2',
    name: 'Midnight Silk Slip',
    price: 145.00,
    category: 'Dresses',
    description: 'Elegant silk slip dress with a cowl neckline. Effortless sophistication for your next special occasion.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    features: ['100% Mulberry Silk', 'Bias Cut', 'Adjustable Straps']
  },

  // --- HOME & TRAVEL ---
  {
    id: '2',
    name: 'Leather Weekend Bag',
    price: 89.50,
    category: 'Travel',
    description: 'Crafted from premium full-grain leather, this duffel bag is the perfect companion for your short trips and gym sessions.',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80',
    features: ['Water Resistant', 'Detachable Shoulder Strap', 'Internal Zip Pocket']
  },
  {
    id: '4',
    name: 'Aromatic Soy Candle',
    price: 24.99,
    category: 'Home',
    description: 'Hand-poured soy wax infused with essential oils of sandalwood and vanilla. Creates a soothing atmosphere anywhere.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    features: ['Organic Soy Wax', '50h Burn Time', 'Recyclable Glass']
  }
];

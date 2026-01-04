
import { Property } from './types';

export const THEME_CONFIG = {
  luxury: {
    bg: 'bg-[#fcfaf7]',
    card: 'bg-white/90 backdrop-blur-md border border-amber-200/50 shadow-[0_20px_50px_-12px_rgba(180,140,80,0.12)]',
    accent: 'text-[#b48c50]',
    button: 'bg-gradient-to-r from-[#d4af37] to-[#b48c50] hover:from-[#b48c50] hover:to-[#a07b45] text-white shadow-lg shadow-amber-200/50',
    secondary: 'text-[#7a6e5a]',
    border: 'border-[#e5d5bc]',
    font: 'font-serif',
    gradient: 'from-[#fdfcfb] via-[#fcfaf7] to-[#f5f0e6]',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000'
  },
  pop: {
    bg: 'bg-[#f0f9ff]',
    card: 'bg-white border-2 border-pink-200 rounded-3xl shadow-[8px_8px_0px_0px_rgba(244,114,182,0.2)]',
    accent: 'text-pink-600',
    button: 'bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold shadow-lg transform hover:scale-105 transition-all',
    secondary: 'text-indigo-600',
    border: 'border-pink-200',
    font: 'font-sans',
    gradient: 'from-yellow-100 to-pink-100',
    heroImage: ''
  },
  minimalist: {
    bg: 'bg-white',
    card: 'bg-white border border-slate-200 shadow-sm',
    accent: 'text-slate-900',
    button: 'bg-slate-900 hover:bg-slate-800 text-white',
    secondary: 'text-slate-500',
    border: 'border-slate-100',
    font: 'font-sans',
    gradient: 'from-slate-50 to-white',
    heroImage: ''
  }
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'THE ROA 南青山レジデンス',
    location: '東京都港区南青山',
    price: 128000000,
    yield: 3.8,
    age: 2,
    type: '1LDK / Premium',
    image: 'https://images.unsplash.com/photo-1600607687940-47a04b62d7a6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: '中目黒アーバン・リトリート',
    location: '東京都目黒区上目黒',
    price: 82000000,
    yield: 4.5,
    age: 8,
    type: '1K / High-rise',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'スカイゲート西新宿 48F',
    location: '東京都新宿区西新宿',
    price: 59000000,
    yield: 5.2,
    age: 15,
    type: 'Studio / Tower',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_INVESTMENT: any = {
  propertyPrice: 85000000,
  downPayment: 20000000,
  loanTerm: 35,
  interestRate: 0.6,
  monthlyRent: 320000,
  managementFee: 25000,
  repairReserve: 15000,
  taxRate: 1.0
};

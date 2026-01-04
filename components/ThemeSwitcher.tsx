
import React from 'react';
import { ThemeMode } from '../types';
import { Palette, Crown, Smile, Zap } from 'lucide-react';

interface Props {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

const ThemeSwitcher: React.FC<Props> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="flex items-center gap-2 p-1 bg-white rounded-full border border-slate-200 shadow-sm">
      <button
        onClick={() => onThemeChange('luxury')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          currentTheme === 'luxury' ? 'bg-[#b48c50] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        <Crown size={14} /> Luxury
      </button>
      <button
        onClick={() => onThemeChange('pop')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          currentTheme === 'pop' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        <Smile size={14} /> Pop
      </button>
      <button
        onClick={() => onThemeChange('minimalist')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          currentTheme === 'minimalist' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        <Zap size={14} /> Minimal
      </button>
    </div>
  );
};

export default ThemeSwitcher;

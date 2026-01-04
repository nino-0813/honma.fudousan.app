
import React from 'react';
import { Property, ThemeMode } from '../types';
import { MapPin, TrendingUp, Home } from 'lucide-react';
import { THEME_CONFIG } from '../constants';

interface Props {
  property: Property;
  theme: ThemeMode;
}

const PropertyCard: React.FC<Props> = ({ property, theme }) => {
  const styles = THEME_CONFIG[theme];

  return (
    <div className={`group overflow-hidden transition-all duration-300 ${styles.card} hover:shadow-2xl`}>
      <div className="relative h-48">
        <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md bg-white/80 text-slate-800 border border-white/50`}>
            {property.type}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className={`text-lg font-bold mb-2 truncate ${theme === 'luxury' ? 'text-[#4a3f35]' : 'text-slate-900'}`}>{property.name}</h3>
        <div className="flex items-center gap-1.5 text-xs mb-4 text-slate-500">
          <MapPin size={14} className={styles.accent} />
          <span>{property.location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={`p-3 rounded-xl bg-slate-50 border ${styles.border}`}>
            <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Price</p>
            <p className={`text-sm font-bold ${theme === 'luxury' ? 'text-[#4a3f35]' : ''}`}>¥{(property.price / 10000).toLocaleString()}万</p>
          </div>
          <div className={`p-3 rounded-xl bg-slate-50 border ${styles.border}`}>
            <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Yield</p>
            <div className="flex items-center gap-1">
              <TrendingUp size={12} className="text-emerald-600" />
              <p className="text-sm font-bold text-emerald-600">{property.yield}%</p>
            </div>
          </div>
        </div>

        <button className={`w-full py-2.5 text-xs font-bold transition-all ${styles.button}`}>
          詳細・シミュレーション
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;

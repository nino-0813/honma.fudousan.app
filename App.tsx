
import React, { useState } from 'react';
import { ThemeMode, InvestmentData } from './types';
import { THEME_CONFIG, MOCK_PROPERTIES, INITIAL_INVESTMENT } from './constants';
import ThemeSwitcher from './components/ThemeSwitcher';
import Simulator from './components/Simulator';
import AIAdvisor from './components/AIAdvisor';
import PropertyCard from './components/PropertyCard';
import { Building2, Search, Filter, ShieldCheck, TrendingUp, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('luxury');
  const [investmentData, setInvestmentData] = useState<InvestmentData>(INITIAL_INVESTMENT);
  const styles = THEME_CONFIG[theme];

  return (
    <div className={`min-h-screen transition-all duration-700 ${styles.bg} ${styles.font} relative overflow-x-hidden`}>
      {/* Background Decor for White Luxury */}
      {theme === 'luxury' && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/linen.png')] opacity-40"></div>
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-amber-100/50 blur-[180px] -mr-96 -mt-96 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-amber-50/30 blur-[150px] -ml-48 -mb-48 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)] opacity-60"></div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${styles.border} ${theme === 'luxury' ? 'bg-white/70' : 'bg-white/80'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${styles.button}`}>
              <Building2 size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tighter leading-none ${theme === 'luxury' ? 'text-[#4a3f35]' : 'text-slate-900'}`}>
                Mansion<span className={styles.accent}>Invest</span>
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 ${theme === 'luxury' ? 'text-[#b48c50]' : 'text-slate-500'}`}>
                Premium AI Concierge
              </span>
            </div>
          </div>
          <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          {theme === 'luxury' && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-amber-200 bg-white/50 backdrop-blur-md">
              <Sparkles size={12} className="text-[#b48c50]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#b48c50]">Exclusively for Selected Investors</span>
            </div>
          )}
          <h1 className={`text-5xl md:text-7xl font-black mb-8 leading-[1] ${theme === 'luxury' ? 'text-[#4a3f35]' : 'text-slate-900'}`}>
            データが導く、<br />
            <span className={`bg-gradient-to-r ${theme === 'luxury' ? 'from-[#b48c50] via-[#d4af37] to-[#b48c50]' : 'from-pink-500 to-indigo-500'} bg-clip-text text-transparent`}>
              確信ある投資。
            </span>
          </h1>
          <p className={`text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed ${styles.secondary}`}>
            複雑な不動産投資の収支計算を、直感的なインターフェースで可視化。
            AIがあなたの資産形成を24時間体制でバックアップします。
          </p>
        </div>

        {/* Main Dashboard Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">
          <div className="lg:col-span-8 space-y-10">
            <Simulator data={investmentData} setData={setInvestmentData} theme={theme} />
            
            {/* Value Props Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: "リスク分析", desc: "将来の資産価値の下落や、賃料変動のシビアなシナリオをAIが事前シミュレート。" },
                { icon: TrendingUp, title: "資産価値最大化", desc: "税務対策から修繕計画まで。長期的なキャッシュフローを最適化する戦略を構築。" }
              ].map((item, idx) => (
                <div key={idx} className={`p-8 rounded-[2rem] group transition-all duration-500 ${styles.card} hover:-translate-y-1`}>
                  <item.icon className={`mb-6 ${styles.accent}`} size={32} strokeWidth={1.5} />
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'luxury' ? 'text-[#4a3f35]' : ''}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${styles.secondary}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4 sticky top-28 h-fit">
            <AIAdvisor investmentData={investmentData} theme={theme} />
            <div className={`mt-6 p-6 rounded-[2rem] ${styles.card} border-dashed border-amber-300`}>
              <h4 className={`text-sm font-bold mb-3 ${theme === 'luxury' ? 'text-[#4a3f35]' : ''}`}>専門家への相談</h4>
              <p className={`text-xs mb-4 leading-relaxed ${styles.secondary}`}>シミュレーション結果を元に、プロのコンサルタントがより詳細なライフプランを作成します。</p>
              <button className={`w-full py-3 rounded-xl text-xs font-bold ${styles.button}`}>
                個別カウンセリング予約
              </button>
            </div>
          </div>
        </div>

        {/* Property Listing */}
        <div className="mb-24">
          <div className="flex items-end justify-between mb-12 border-b border-amber-100 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-8 h-[1px] bg-[#b48c50]`}></span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${styles.accent}`}>Selected Selection</span>
              </div>
              <h2 className={`text-4xl font-black ${theme === 'luxury' ? 'text-[#4a3f35]' : 'text-slate-900'}`}>厳選プレミアム物件</h2>
            </div>
            <div className="flex gap-4">
              <button className={`p-4 rounded-2xl border transition-all ${styles.border} ${styles.secondary} hover:bg-amber-50`}>
                <Filter size={20} />
              </button>
              <button className={`p-4 rounded-2xl border transition-all ${styles.border} ${styles.secondary} hover:bg-amber-50`}>
                <Search size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {MOCK_PROPERTIES.map(p => (
              <PropertyCard key={p.id} property={p} theme={theme} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <button className={`group inline-flex items-center gap-3 px-10 py-4 rounded-full border transition-all ${styles.border} ${styles.secondary} hover:bg-amber-50 font-bold`}>
              すべての物件を閲覧する <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`relative overflow-hidden p-20 rounded-[4rem] text-center transition-all duration-700 ${styles.card} border-amber-200/50`}>
          {theme === 'luxury' && (
            <div className="absolute inset-0 z-0 opacity-10 scale-110 blur-sm">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" alt="bg" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white"></div>
            </div>
          )}
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className={`text-5xl font-black mb-8 leading-tight ${theme === 'luxury' ? 'text-[#4a3f35]' : 'text-slate-900'}`}>
              理想の未来を、<br />今ここからデザインする。
            </h2>
            <p className={`text-lg mb-12 leading-relaxed ${styles.secondary}`}>
              データとAIの力で、マンション投資をより確かなものに。<br />
              一歩踏み出すための、最高のパートナーであり続けます。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className={`px-12 py-5 rounded-2xl text-lg font-bold transition-all ${styles.button} scale-105 shadow-2xl`}>
                無料資産診断を始める
              </button>
              <button className={`px-12 py-5 rounded-2xl text-lg font-bold border ${styles.border} ${theme === 'luxury' ? 'text-[#b48c50] hover:bg-amber-50' : 'text-slate-900 hover:bg-slate-50'}`}>
                パンフレット請求
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className={`py-24 border-t transition-colors duration-500 ${styles.border} ${theme === 'luxury' ? 'text-[#7a6e5a]' : 'text-slate-400'} bg-[#fdfcfb]`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${styles.button}`}>
                  <Building2 size={22} />
                </div>
                <span className={`text-2xl font-black tracking-tighter ${theme === 'luxury' ? 'text-[#4a3f35]' : 'text-slate-900'}`}>
                  MansionInvest AI
                </span>
              </div>
              <p className="max-w-sm text-base leading-relaxed opacity-70">
                次世代の不動産投資プラットフォーム。AIとビッグデータを駆使し、
                すべての人に透明性の高い投資判断を。
              </p>
            </div>
            <div>
              <h4 className={`text-sm font-black uppercase tracking-widest mb-8 ${theme === 'luxury' ? 'text-[#4a3f35]' : 'text-slate-900'}`}>Service</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-[#b48c50] transition-colors">物件検索</a></li>
                <li><a href="#" className="hover:text-[#b48c50] transition-colors">収益シミュレーション</a></li>
                <li><a href="#" className="hover:text-[#b48c50] transition-colors">AI相談</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`text-sm font-black uppercase tracking-widest mb-8 ${theme === 'luxury' ? 'text-[#4a3f35]' : 'text-slate-900'}`}>Company</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-[#b48c50] transition-colors">運営会社</a></li>
                <li><a href="#" className="hover:text-[#b48c50] transition-colors">ニュース</a></li>
                <li><a href="#" className="hover:text-[#b48c50] transition-colors">採用情報</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-amber-100 flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] uppercase tracking-[0.3em] font-black opacity-40">
            <p>© 2024 MansionInvest AI. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-10">
              <a href="#" className="hover:text-[#b48c50] transition-colors">利用規約</a>
              <a href="#" className="hover:text-[#b48c50] transition-colors">プライバシーポリシー</a>
              <a href="#" className="hover:text-[#b48c50] transition-colors">特定商取引法</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

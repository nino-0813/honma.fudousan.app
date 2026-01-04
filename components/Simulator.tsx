
import React, { useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { InvestmentData, SimulationResult, ThemeMode } from '../types';
import { THEME_CONFIG } from '../constants';
import { Info, TrendingUp, Wallet, Clock, BarChart3 } from 'lucide-react';

interface Props {
  data: InvestmentData;
  setData: (data: InvestmentData) => void;
  theme: ThemeMode;
}

// Fix: Move InputGroup and SliderInput outside of Simulator to resolve children typing errors and improve performance.
interface InputGroupProps {
  label: string;
  icon: any;
  children: React.ReactNode;
  styles: any;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, icon: Icon, children, styles }) => (
  <div className={`p-4 rounded-2xl border ${styles.border} bg-white/50 space-y-4`}>
    <div className="flex items-center gap-2 mb-2">
      <Icon size={16} className={styles.accent} />
      <span className={`text-xs font-bold uppercase tracking-widest ${styles.secondary}`}>{label}</span>
    </div>
    {children}
  </div>
);

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  suffix: string;
  theme: ThemeMode;
  styles: any;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, value, min, max, step, onChange, suffix, theme, styles }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <label className={`text-[10px] font-medium ${styles.secondary}`}>{label}</label>
      <span className={`text-sm font-bold ${theme === 'luxury' ? 'text-[#4a3f35]' : ''}`}>{value.toLocaleString()}{suffix}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value} 
      onChange={(e) => onChange(Number(e.target.value))}
      className={`w-full h-1 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-[#b48c50]`}
    />
  </div>
);

const Simulator: React.FC<Props> = ({ data, setData, theme }) => {
  const styles = THEME_CONFIG[theme];

  const simulationResults = useMemo(() => {
    const results: SimulationResult[] = [];
    let cumulativeCashFlow = 0;
    const loanAmount = Math.max(0, data.propertyPrice - data.downPayment);
    const monthlyRate = (data.interestRate / 100) / 12;
    const totalMonths = data.loanTerm * 12;
    
    const monthlyPayment = loanAmount > 0 && monthlyRate > 0
      ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmount > 0 ? loanAmount / totalMonths : 0;
    
    let currentLoanBalance = loanAmount;

    for (let year = 1; year <= 30; year++) {
      let annualCashFlow = 0;
      for (let month = 1; month <= 12; month++) {
        const interestPayment = currentLoanBalance * monthlyRate;
        const principalPayment = Math.max(0, monthlyPayment - interestPayment);
        currentLoanBalance = Math.max(0, currentLoanBalance - principalPayment);
        
        const monthlyCashFlow = data.monthlyRent - monthlyPayment - data.managementFee - data.repairReserve;
        annualCashFlow += monthlyCashFlow;
      }
      cumulativeCashFlow += annualCashFlow;
      
      results.push({
        year,
        cashFlow: Math.floor(annualCashFlow),
        cumulativeCashFlow: Math.floor(cumulativeCashFlow),
        loanRemaining: Math.floor(currentLoanBalance),
        equity: Math.floor(data.propertyPrice - currentLoanBalance)
      });
    }
    return results;
  }, [data]);

  const kpis = useMemo(() => {
    const annualRent = data.monthlyRent * 12;
    const surfaceYield = (annualRent / data.propertyPrice) * 100;
    const annualExpenses = (data.managementFee + data.repairReserve) * 12;
    const netYield = ((annualRent - annualExpenses) / data.propertyPrice) * 100;
    const annualCashFlow = simulationResults[0]?.cashFlow || 0;
    
    return {
      surfaceYield: surfaceYield.toFixed(2),
      netYield: netYield.toFixed(2),
      annualCashFlow: Math.floor(annualCashFlow / 10000),
      roi: ((annualCashFlow / (data.downPayment || 1)) * 100).toFixed(1)
    };
  }, [data, simulationResults]);

  const handleChange = (field: keyof InvestmentData, value: number) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className={`p-8 rounded-[2.5rem] ${styles.card} transition-all duration-500`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className={`text-3xl font-black ${styles.accent} tracking-tight mb-1`}>収益・資産性分析</h2>
          <p className={`text-sm ${styles.secondary}`}>物件条件を変更して、将来の資産推移をシミュレーションします。</p>
        </div>
        <div className="flex gap-2">
          <button className={`px-4 py-2 rounded-xl text-xs font-bold border ${styles.border} ${styles.secondary} hover:bg-amber-50 transition-all`}>
            レポート保存
          </button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "表面利回り", value: `${kpis.surfaceYield}%`, icon: BarChart3, color: "text-[#b48c50]" },
          { label: "実質利回り", value: `${kpis.netYield}%`, icon: TrendingUp, color: "text-emerald-600" },
          { label: "年間手残り", value: `¥${kpis.annualCashFlow}万`, icon: Wallet, color: "text-blue-600" },
          { label: "自己資金利回り", value: `${kpis.roi}%`, icon: Clock, color: "text-purple-600" }
        ].map((kpi, i) => (
          <div key={i} className={`p-4 rounded-3xl bg-white border ${styles.border} shadow-sm backdrop-blur-sm`}>
            <div className="flex items-center gap-2 mb-1">
              <kpi.icon size={14} className={kpi.color} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${styles.secondary}`}>{kpi.label}</span>
            </div>
            <div className={`text-xl font-black ${theme === 'luxury' ? 'text-[#4a3f35]' : 'text-slate-900'}`}>{kpi.value}</div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Inputs Section */}
        <div className="xl:col-span-5 space-y-6">
          <InputGroup label="物件・購入条件" icon={BarChart3} styles={styles}>
            <SliderInput 
              label="物件価格" min={10000000} max={300000000} step={1000000} 
              value={data.propertyPrice} suffix="円" 
              onChange={(v: number) => handleChange('propertyPrice', v)} 
              theme={theme}
              styles={styles}
            />
            <SliderInput 
              label="頭金" min={0} max={data.propertyPrice} step={1000000} 
              value={data.downPayment} suffix="円" 
              onChange={(v: number) => handleChange('downPayment', v)} 
              theme={theme}
              styles={styles}
            />
          </InputGroup>

          <InputGroup label="ローン・維持費" icon={TrendingUp} styles={styles}>
            <div className="grid grid-cols-2 gap-6">
              <SliderInput 
                label="金利" min={0} max={5} step={0.1} 
                value={data.interestRate} suffix="%" 
                onChange={(v: number) => handleChange('interestRate', v)} 
                theme={theme}
                styles={styles}
              />
              <SliderInput 
                label="期間" min={1} max={35} step={1} 
                value={data.loanTerm} suffix="年" 
                onChange={(v: number) => handleChange('loanTerm', v)} 
                theme={theme}
                styles={styles}
              />
            </div>
            <SliderInput 
              label="想定家賃" min={50000} max={1000000} step={5000} 
              value={data.monthlyRent} suffix="円" 
              onChange={(v: number) => handleChange('monthlyRent', v)} 
              theme={theme}
              styles={styles}
            />
          </InputGroup>
        </div>

        {/* Chart Section */}
        <div className="xl:col-span-7 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${styles.secondary}`}>
              30年間の累積収支・資産価値推移
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#b48c50]"></div>
                <span className="text-[10px] text-[#b48c50] font-bold uppercase">Cash Flow</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={simulationResults} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b48c50" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#b48c50" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'luxury' ? '#e5d5bc' : '#eee'} />
                <XAxis 
                  dataKey="year" 
                  stroke={theme === 'luxury' ? '#b48c50' : '#999'} 
                  fontSize={10} 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(val) => `${val}年`}
                />
                <YAxis 
                  stroke={theme === 'luxury' ? '#b48c50' : '#999'} 
                  fontSize={10} 
                  tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  cursor={{ stroke: '#b48c50', strokeWidth: 1 }}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '16px', 
                    border: '1px solid #e5d5bc',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                    padding: '12px'
                  }}
                  itemStyle={{ color: '#b48c50', fontWeight: 'bold', fontSize: '12px' }}
                  labelStyle={{ color: '#4a3f35', marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase' }}
                  formatter={(value: any) => [`¥${(value / 10000).toLocaleString()}万`, "累積収支"]}
                  labelFormatter={(label) => `${label}年目時点`}
                />
                <Area 
                  type="monotone" 
                  dataKey="cumulativeCashFlow" 
                  stroke="#b48c50" 
                  fillOpacity={1} 
                  fill="url(#colorCf)" 
                  strokeWidth={3} 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className={`mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3 items-start`}>
            <Info size={16} className="text-[#b48c50] mt-0.5 shrink-0" />
            <p className="text-[11px] leading-relaxed text-[#7a6e5a]">
              ※本シミュレーションは一定の条件下での予測値であり、将来の収益を保証するものではありません。空室率、修繕費の上昇、金利変動等のリスクも考慮した詳細なプランニングを推奨します。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;

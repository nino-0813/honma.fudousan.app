
import React, { useState, useRef, useEffect } from 'react';
import { openaiService } from '../services/openaiService';
import { InvestmentData, ThemeMode } from '../types';
import { THEME_CONFIG } from '../constants';
import { Send, User, Bot, Sparkles, Loader2, Trash2, BrainCircuit, ChevronRight, Copy, Check } from 'lucide-react';

interface Props {
  investmentData: InvestmentData;
  theme: ThemeMode;
}

const QUICK_QUESTIONS = [
  "収益性を上げるには？",
  "空室リスクの対策は？",
  "東京23区の将来性は？",
  "売却タイミングの判断"
];

const AIAdvisor: React.FC<Props> = ({ investmentData, theme }) => {
  const styles = THEME_CONFIG[theme];
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: '投資マンション選びやシミュレーション結果について、専門的な視点からアドバイスいたします。何からお話ししましょうか？' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    const advice = await openaiService.getInvestmentAdvice(text, investmentData);
    
    setMessages(prev => [...prev, { role: 'ai', text: advice }]);
    setLoading(false);
  };

  const analyzeCurrentPlan = () => {
    const prompt = `現在のシミュレーション（物件価格:${(investmentData.propertyPrice/10000).toLocaleString()}万円、金利:${investmentData.interestRate}%、期間:${investmentData.loanTerm}年）について、プロの視点で「良い点」と「懸念点」を簡潔に診断してください。`;
    handleSend(prompt);
  };

  const clearChat = () => {
    if (window.confirm('チャット履歴をクリアしますか？')) {
      setMessages([{ role: 'ai', text: 'チャットをリセットしました。新しいご相談をどうぞ。' }]);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className={`flex flex-col h-[600px] rounded-[2.5rem] ${styles.card} overflow-hidden transition-all duration-500 border-opacity-50`}>
      {/* Header */}
      <div className={`p-6 border-b ${styles.border} flex items-center justify-between bg-white/50 backdrop-blur-md`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200">
            <Sparkles className="text-[#b48c50]" size={20} />
          </div>
          <div>
            <h3 className={`font-bold text-sm ${theme === 'luxury' ? 'text-[#4a3f35]' : 'text-slate-900'}`}>AI投資コンシェルジュ</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold">Online Advisory</span>
            </div>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className={`p-2 rounded-xl hover:bg-amber-50 transition-colors ${styles.secondary}`}
          title="履歴をクリア"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Chat Body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-amber-100">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} group animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`flex gap-3 max-w-[90%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${
                m.role === 'user' 
                  ? 'bg-[#b48c50] border-[#b48c50] text-white' 
                  : 'bg-white border-[#e5d5bc] text-[#b48c50]'
              }`}>
                {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className="space-y-2">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative ${
                  m.role === 'user' 
                    ? `bg-[#b48c50] text-white rounded-tr-none` 
                    : `bg-white border border-[#e5d5bc] rounded-tl-none ${theme === 'luxury' ? 'text-[#4a3f35]' : 'text-slate-700'}`
                }`}>
                  {m.text.split('\n').map((line, idx) => (
                    <p key={idx} className={line.trim() === '' ? 'h-2' : 'mb-1 last:mb-0'}>
                      {line}
                    </p>
                  ))}
                  
                  {m.role === 'ai' && (
                    <button 
                      onClick={() => copyToClipboard(m.text, i)}
                      className="absolute -bottom-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-[#b48c50]/60 hover:text-[#b48c50]"
                    >
                      {copiedIndex === i ? <Check size={12} /> : <Copy size={12} />}
                      {copiedIndex === i ? 'コピーしました' : 'アドバイスをコピー'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#e5d5bc] flex items-center justify-center text-[#b48c50]">
                <Loader2 className="animate-spin" size={18} />
              </div>
              <div className="bg-white border border-[#e5d5bc] p-4 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#b48c50]/50 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#b48c50]/50 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-[#b48c50]/50 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions & Input */}
      <div className={`p-6 border-t ${styles.border} bg-white/50 backdrop-blur-xl space-y-4`}>
        <div className="flex flex-col gap-3">
          <button 
            onClick={analyzeCurrentPlan}
            disabled={loading}
            className={`w-full py-3 rounded-2xl bg-amber-50 border border-amber-200 text-[#b48c50] text-xs font-bold flex items-center justify-center gap-2 hover:bg-amber-100 transition-all group disabled:opacity-50`}
          >
            <BrainCircuit size={16} className="group-hover:rotate-12 transition-transform" />
            現在のシミュレーションをAI診断する
            <ChevronRight size={14} />
          </button>
          
          <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
            {QUICK_QUESTIONS.map((q, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(q)}
                disabled={loading}
                className={`shrink-0 text-[10px] font-bold px-4 py-2 rounded-full border transition-all ${
                  theme === 'luxury'
                  ? 'border-[#e5d5bc] bg-white text-[#7a6e5a] hover:border-[#b48c50] hover:text-[#b48c50]'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                } disabled:opacity-50`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
          className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all bg-white ${
            loading ? 'opacity-50' : 'focus-within:border-[#b48c50]'
          } ${styles.border}`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="投資の疑問を詳しく聞く..."
            className={`flex-1 p-2.5 bg-transparent text-sm outline-none ${
              theme === 'luxury' ? 'text-[#4a3f35] placeholder:text-slate-400' : 'text-slate-900'
            }`}
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${styles.button} disabled:opacity-30 disabled:grayscale`}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAdvisor;

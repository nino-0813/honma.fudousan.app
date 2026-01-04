
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Always use process.env.API_KEY directly for initialization as per guidelines.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getInvestmentAdvice(query: string, context?: any) {
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      あなたは世界最高峰の不動産投資戦略コンサルタントです。
      「MansionInvest AI」の利用者に対し、客観的、論理的、かつ資産形成を成功に導くための鋭いアドバイスを提供してください。

      【現在のシミュレーション状況】
      - 物件価格: ¥${context?.propertyPrice?.toLocaleString()}
      - 自己資金: ¥${context?.downPayment?.toLocaleString()}
      - ローン金利: ${context?.interestRate}%
      - ローン期間: ${context?.loanTerm}年
      - 想定家賃: ¥${context?.monthlyRent?.toLocaleString()}/月

      【回答の指針】
      1. 現実的な診断: 収支が厳しい場合は、はっきりとリスクを指摘してください。
      2. 具体的アクション: 「頭金を増やす」「管理費を抑える」「エリアを見直す」など、具体的な改善策を提示してください。
      3. 市場動向の反映: 最新の金利上昇リスクや、人口動態に基づいた賃貸需要の視点を含めてください。
      4. プロフェッショナルな品格: 高級感のあるサービスにふさわしい、丁寧かつ信頼感のある言葉遣い（日本語）を徹底してください。

      回答はMarkdown形式を使用し、重要な数値や結論は太字で強調してください。
      専門用語には必要に応じて簡潔な説明を添えてください。
    `;

    try {
      // Use ai.models.generateContent directly with the model name and contents.
      const response = await this.ai.models.generateContent({
        model,
        contents: query,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
      // Directly access .text property as per guidelines.
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "申し訳ありません。AIアドバイザーとの通信中にエラーが発生しました。時間を置いて再度お試しください。";
    }
  }
}

export const geminiService = new GeminiService();

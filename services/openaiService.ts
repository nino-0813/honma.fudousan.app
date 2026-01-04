import OpenAI from "openai";

export class OpenAIService {
  private client: OpenAI | null = null;

  private getApiKey(): string | null {
    // Viteでは VITE_ プレフィックス付きの環境変数は自動的に import.meta.env に注入される
    // vite.config.ts の define で process.env にも設定される
    return (import.meta.env.VITE_OPENAI_API_KEY as string) || 
           (import.meta.env.OPENAI_API_KEY as string) ||
           (process.env.API_KEY as string) || 
           (process.env.OPENAI_API_KEY as string) ||
           null;
  }

  private getClient(): OpenAI {
    if (!this.client) {
      const apiKey = this.getApiKey();
      if (!apiKey) {
        throw new Error("OpenAI API key is not set. Please set VITE_OPENAI_API_KEY in your environment variables.");
      }
      this.client = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, API calls should be made from a backend server
      });
    }
    return this.client;
  }

  async getInvestmentAdvice(query: string, context?: any) {
    const systemInstruction = `
      あなたは世界最高峰の不動産投資戦略コンサルタントです。
      「MansionInvest AI」の利用者に対し、客観的、論理的、かつ資産形成を成功に導くための鋭いアドバイスを提供してください。

      【現在のシミュレーション状況】
      - 物件価格: ¥${context?.propertyPrice?.toLocaleString() || '未設定'}
      - 自己資金: ¥${context?.downPayment?.toLocaleString() || '未設定'}
      - ローン金利: ${context?.interestRate || '未設定'}%
      - ローン期間: ${context?.loanTerm || '未設定'}年
      - 想定家賃: ¥${context?.monthlyRent?.toLocaleString() || '未設定'}/月

      【回答の指針】
      1. 現実的な診断: 収支が厳しい場合は、はっきりとリスクを指摘してください。
      2. 具体的アクション: 「頭金を増やす」「管理費を抑える」「エリアを見直す」など、具体的な改善策を提示してください。
      3. 市場動向の反映: 最新の金利上昇リスクや、人口動態に基づいた賃貸需要の視点を含めてください。
      4. プロフェッショナルな品格: 高級感のあるサービスにふさわしい、丁寧かつ信頼感のある言葉遣い（日本語）を徹底してください。

      回答はMarkdown形式を使用し、重要な数値や結論は太字で強調してください。
      専門用語には必要に応じて簡潔な説明を添えてください。
    `;

    try {
      const client = this.getClient();
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini", // または "gpt-4o" を使用可能
        messages: [
          {
            role: "system",
            content: systemInstruction
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.7,
      });

      const responseText = completion.choices[0]?.message?.content;
      if (!responseText) {
        throw new Error("No response from OpenAI");
      }
      
      return responseText;
    } catch (error: any) {
      console.error("OpenAI API Error:", error);
      if (error?.message?.includes("API key is not set")) {
        return "⚠️ OpenAI APIキーが設定されていません。Vercelの環境変数設定で `VITE_OPENAI_API_KEY` を設定してください。";
      }
      return "申し訳ありません。AIアドバイザーとの通信中にエラーが発生しました。時間を置いて再度お試しください。";
    }
  }
}

export const openaiService = new OpenAIService();


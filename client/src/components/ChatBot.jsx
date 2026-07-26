import { useState, useRef, useEffect } from "react";
import { api } from "../api";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  Milk,
  Stethoscope,
  Lightbulb,
  DollarSign,
  ShieldAlert,
  ArrowUp
} from "lucide-react";

// Domain Knowledge Base for smart instant responses
const DAIRY_KNOWLEDGE_BASE = [
  {
    keywords: ["fat", "snf", "increase fat", "quality", "density", "cream"],
    title: "Milk Fat & SNF Enhancement",
    response: `To increase Milk Fat & Solid-Not-Fat (SNF) percentage in cows and buffaloes:

1. **Fiber Ratio:** Ensure 60% Roughage (Dry + Green Fodder) and 40% Concentrate. Lack of dry fodder (straw/hay) drops fat %.
2. **Dry Fodder:** Feed 4-6 kg of dry straw (Paddy or Wheat straw / Ragi straw) daily.
3. **Bypass Fat & Mineral Mixture:** Add 50g-100g of Bypass Fat and 50g Chelated Mineral Mixture into daily concentrate feed.
4. **Buffering:** Mix 20g Sodium Bicarbonate (baking soda) in feed daily to maintain rumen pH between 6.2 - 6.8.
5. **Clean Water:** Ensure 24/7 unlimited access to fresh, cool drinking water.`
  },
  {
    keywords: ["mastitis", "udder", "swelling", "blood in milk", "clots", "ಕೆಚ್ಚಲು"],
    title: "Mastitis Treatment & Prevention Guide",
    response: `⚠️ **Mastitis (ಕೆಚ್ಚಲು ಬಾವು) Early Action Plan:**

1. **Immediate Isolation:** Separate affected animal and milk it LAST to prevent spreading.
2. **Cold Compress:** Apply ice packs or cold water on the swollen quarter 3-4 times daily.
3. **Teat Dipping:** Dip teats in 0.5% Povidone-Iodine solution post-milking.
4. **Strip Test:** Regularly test first strips of milk on a dark plate for clots or discoloration.
5. **Veterinary Urgent Care:** Contact a certified Vet immediately for intramammary antibiotic infusions (e.g. Ceftriaxone / Pendistrin SH). Do not consume milk during antibiotic treatment!`
  },
  {
    keywords: ["feed", "diet", "ration", "silage", "green fodder", "napier", "maize"],
    title: "Optimal Daily Feed Ration Plan",
    response: `🌾 **Recommended Daily Ration for High-Yielding Cattle (per animal):**

• **Green Fodder:** 25 - 30 kg (Co4/Co5 Super Napier, Maize, SSG, Lucerne)
• **Dry Fodder:** 4 - 6 kg (Ragi straw, Paddy straw, or Hay)
• **Cattle Feed / Concentrate:** 
  - Maintenance: 1.5 - 2.0 kg base feed
  - Milk Production: Add 1 kg concentrate per 2.5 Liters of milk produced.
• **Water:** 70 - 100 Liters clean water daily.
• **Silage:** 15-20 kg corn silage recommended during dry summer months.`
  },
  {
    keywords: ["vaccine", "vaccination", "fmd", "lsd", "hs", "bq", "schedule"],
    title: "Cattle Vaccination Schedule",
    response: `💉 **Essential Annual Vaccination Schedule:**

1. **FMD (Foot & Mouth Disease / ಬಾಯಿ-ಕಾಲು ರೋಗ):** Twice a year (May & November).
2. **LSD (Lumpy Skin Disease):** Goat Pox vaccine once a year (Pre-monsoon).
3. **HS (Hemorrhagic Septicemia / ಗಲಘೋಟು):** Once a year (May/June before monsoon).
4. **BQ (Black Quarter / ಕಪ್ಪು ಬೇನೆ):** Once a year (May/June for young cattle > 6 months).
5. **Deworming:** Deworm all adult animals every 3-4 months with Fenbendazole / Ivermectin.`
  },
  {
    keywords: ["calf", "newborn", "colostrum", "weaning", "ಕರು"],
    title: "Newborn Calf Care & Management",
    response: `🐄 **Newborn Calf First 24-Hour Checklist:**

1. **Colostrum (Junnu Milk):** Feed 2 Liters of warm colostrum within 2 hours of birth. Essential for immunity!
2. **Navel Cord Care:** Dip umbilical cord in 7% Tincture Iodine immediately to prevent navel ill infection.
3. **Warmth:** Keep calf dry and protected from cold winds on dry straw bedding.
4. **Deworming:** Give first deworming syrup (Piperazine / Albendazole) on Day 7 of life.`
  },
  {
    keywords: ["finance", "profit", "cost", "revenue", "price", "income"],
    title: "Dairy Farm Profitability Tips",
    response: `💰 **Dairy Farm Financial Optimization Tips:**

1. **Feed Cost Reduction:** Feed accounts for 70% of farm expenses. Grow green fodder (Napier & Lucerne) on farm land to cut feed costs by 30%.
2. **Direct Milk Sales:** Sell directly to households, sweet shops, or apartments at ₹45 - ₹65/L rather than relying solely on low society pricing (₹32 - ₹38/L).
3. **Dung & Bio-products:** Convert cattle manure into Vermicompost or Slurry to earn extra ₹3,000 - ₹8,000 per animal annually.`
  }
];

const QUICK_CARDS = [
  {
    icon: Milk,
    title: "Increase Milk Fat & SNF",
    query: "How to increase milk fat and SNF percentage in my cows and buffaloes?"
  },
  {
    icon: Stethoscope,
    title: "Mastitis Prevention",
    query: "What are early symptoms of Mastitis and how to treat it?"
  },
  {
    icon: Lightbulb,
    title: "Daily Feed Ration",
    query: "What is the best daily fodder and concentrate feed ratio for high milk yield?"
  },
  {
    icon: DollarSign,
    title: "Cut Feed Costs",
    query: "How to cut dairy feed costs and maximize profit?"
  }
];

export default function ChatBot({ stats = {}, user = null, authToken = "" }) {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  
  // Daily 5 chat limit per user account
  const todayStr = new Date().toISOString().split("T")[0];
  const userStorageKey = `dairy_chat_usage_${user?.id || user?._id || "anon"}_${todayStr}`;
  
  const [chatsUsedToday, setChatsUsedToday] = useState(() => {
    try {
      const stored = localStorage.getItem(userStorageKey);
      return stored ? Math.min(Number(stored), 5) : 0;
    } catch {
      return 0;
    }
  });

  const remainingChats = Math.max(0, 5 - chatsUsedToday);
  const limitReached = remainingChats <= 0;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const incrementDailyChatCount = (serverCount) => {
    const nextCount = typeof serverCount === "number" ? serverCount : chatsUsedToday + 1;
    const safeCount = Math.min(nextCount, 5);
    setChatsUsedToday(safeCount);
    try {
      localStorage.setItem(userStorageKey, String(safeCount));
    } catch {
      // Storage fallback
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateAiAnswer = (userPrompt) => {
    const promptLower = userPrompt.toLowerCase();
    
    for (const kb of DAIRY_KNOWLEDGE_BASE) {
      if (kb.keywords.some((kw) => promptLower.includes(kw))) {
        return kb.response;
      }
    }

    if (promptLower.includes("cows") || promptLower.includes("cow") || promptLower.includes("buffalo")) {
      return `For your current herd of **${stats.cows || 0} Cows** and **${stats.buffaloes || 0} Buffaloes** (Total Capacity: ${stats.totalMilkCapacity || 0} L/day):

• **Herd Management:** Maintain individual health cards and monitor daily milk production logs.
• **Heat Detection:** Watch for standing heat early morning. Artificial Insemination (AI) should be done 12-18 hours after onset of heat.
• **Deworming:** Ensure all lactating animals are dewormed before monsoon.

If you have specific health or feeding questions, ask about *feed ratio, milk fat %, mastitis, or vaccination*.`;
    }

    return `Here are key expert guidelines for **"${userPrompt}"**:

1. **Nutrition:** Maintain a balanced total mixed ration (TMR) combining green fodder, dry straw, and high-protein concentrate.
2. **Hygiene:** Keep cattle sheds dry and sanitized to minimize bacterial infections.
3. **Health Monitoring:** Watch out for sudden drop in milk yield, temperature changes, or reduced chewing of cud.
4. **Hydration:** Ensure continuous access to clean, uncontaminated drinking water.

Feel free to ask about specific topics like *milk fat enhancement, disease symptoms, or calf care*!`;
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputQuery).trim();
    if (!text || isTyping || limitReached) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    setInputQuery("");
    setIsTyping(true);

    try {
      const response = await api.sendAiChat(authToken, text, messages);
      
      if (response?.limitReached) {
        setChatsUsedToday(5);
        const limitMsg = {
          id: `ai-limit-${Date.now()}`,
          sender: "ai",
          text: "🚫 **Daily Free Limit Reached!** You have used all **5/5 free AI prompts** for today. Your limit resets tomorrow!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, limitMsg]);
        return;
      }

      const aiReplyText = response?.reply || generateAiAnswer(text);

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, aiMsg]);
      incrementDailyChatCount(response?.chatsUsedToday);
    } catch (err) {
      console.warn("OpenRouter API fallback:", err.message);
      
      // If server responded with 429 limit error
      if (err.message?.includes("limit") || err.message?.includes("429")) {
        setChatsUsedToday(5);
        const limitMsg = {
          id: `ai-limit-${Date.now()}`,
          sender: "ai",
          text: "🚫 **Daily Free Limit Reached!** You have used all **5/5 free AI prompts** for today. Your limit resets tomorrow!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, limitMsg]);
        return;
      }

      const fallbackReplyText = generateAiAnswer(text);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: fallbackReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, aiMsg]);
      incrementDailyChatCount();
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-140px)] max-w-4xl flex-col rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* ChatGPT / Gemini Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ambermilk text-ink shadow-md shadow-ambermilk/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-base font-semibold text-white flex items-center gap-2">
              Dairy AI
              <span className="rounded-full bg-ambermilk/10 border border-ambermilk/30 px-2 py-0.5 text-[10px] font-mono text-ambermilk uppercase tracking-wider">
                Vite 1.0
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Daily Limit Badge */}
          <div
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition ${
              limitReached
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            }`}
            title="Each account gets 5 free AI chat prompts per day"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>
              {limitReached
                ? "0/5 Free Chats Left Today"
                : `${remainingChats}/5 Free Chats Left`}
            </span>
          </div>

          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
              title="New Chat"
            >
              <Trash2 className="h-3.5 w-3.5 text-red-400" />
              <span>New Chat</span>
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages / Hero Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 space-y-6">
        {messages.length === 0 ? (
          /* Empty / Landing Hero State like ChatGPT / Gemini */
          <div className="flex h-full flex-col items-center justify-center text-center my-auto py-12">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-ambermilk/10 text-ambermilk border border-ambermilk/20 shadow-xl shadow-ambermilk/10">
              <Sparkles className="h-8 w-8" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              What can I help with today?
            </h1>
            <p className="max-w-md text-xs sm:text-sm text-white/60 mb-8">
              Ask any question about cattle health, milk fat/SNF, feed ratios, disease treatment, or farm finances.
            </p>

            <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              {QUICK_CARDS.map((card, index) => {
                const Icon = card.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(card.query)}
                    className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-ambermilk/50 hover:bg-white/10 active:scale-[0.98] group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ambermilk/10 text-ambermilk group-hover:bg-ambermilk group-hover:text-ink transition">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-white">
                      {card.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Active Chat Stream */
          messages.map((msg) => {
            const isAi = msg.sender === "ai";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isAi ? "justify-start" : "justify-end"}`}
              >
                {isAi && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ambermilk text-ink shadow-sm">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`group relative max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    isAi
                      ? "bg-slate-900/90 text-white/90 border border-white/10"
                      : "bg-ambermilk text-ink font-medium"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">
                    {msg.text.split("\n").map((line, lIdx) => {
                      const formattedLine = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return (
                            <strong key={pIdx} className={isAi ? "text-ambermilk font-semibold" : "font-bold"}>
                              {part.slice(2, -2)}
                            </strong>
                          );
                        }
                        return part;
                      });

                      return (
                        <p key={lIdx} className={line === "" ? "h-2" : "my-0.5"}>
                          {formattedLine}
                        </p>
                      );
                    })}
                  </div>

                  {isAi && (
                    <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-white/40">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="flex items-center gap-1 rounded-md px-2 py-0.5 text-white/60 transition hover:bg-white/10 hover:text-white"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {!isAi && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ambermilk text-ink">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-2.5 text-xs text-white/70 flex items-center gap-2">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-ambermilk" />
              <span>Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ChatGPT Style Floating Input Container */}
      <div className="border-t border-white/10 bg-slate-950 p-3 sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative flex items-center rounded-2xl border border-white/15 bg-white/5 p-1.5 transition focus-within:border-ambermilk focus-within:ring-1 focus-within:ring-ambermilk">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                limitReached
                  ? "Daily free limit reached (5/5 prompts used today)..."
                  : "Message Dairy AI..."
              }
              className="flex-1 bg-transparent px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none disabled:opacity-50"
              disabled={isTyping || limitReached}
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping || limitReached}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-ambermilk text-ink transition hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowUp className="h-5 w-5 font-bold" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-white/30">
            Dairy AI provides general cattle & farm management guidance.
          </p>
        </form>
      </div>
    </div>
  );
}

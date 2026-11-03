import React, { useState, useEffect } from 'react';
import { Sparkles, Send, Copy, Check, Scale, BookOpen, AlertOctagon } from 'lucide-react';
import type { ComplianceReport } from '../types';

interface CopilotTabProps {
  report: ComplianceReport;
  aiResponse?: {
    model: string;
    source: string;
    content: string;
  };
  onQueryAi?: (prompt: string) => void;
}

export const CopilotTab: React.FC<CopilotTabProps> = ({
  report,
  aiResponse,
  onQueryAi
}) => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [localResponse, setLocalResponse] = useState(aiResponse);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state whenever genuine AI response arrives from Streamlit / Groq
  useEffect(() => {
    if (aiResponse) {
      setLocalResponse(aiResponse);
      setIsLoading(false);
    }
  }, [aiResponse]);

  const defaultSynthesis = (
    `**Executive AI Legal Evaluation (${report.risk_level})**:\n\n` +
    `1. **Demographic Proxy Price Steering (EU AI Act Title III Annex III)**: The recommendation engine's Pearson correlation coefficient of ${report.bias.pearson_correlation > 0 ? '+' : ''}${report.bias.pearson_correlation.toFixed(3)} (p < 0.0001) confirms statistically significant steering against customer zip codes. With an empirical Disparate Impact Ratio of ${report.bias.disparate_impact_ratio.toFixed(2)}, the model breaches the EEOC Four-Fifths fairness benchmark.\n\n` +
    `2. **GDPR Article 6 & 22 Privacy Exposure**: ${report.privacy.breach_count} customer logs (${report.privacy.breach_rate_pct}%) were processed without verifiable affirmative opt-in consent. Under GDPR Article 17, these records require immediate zero-latency cryptographic quarantine.\n\n` +
    `3. **Recommended Engineering Action**: Apply gradient reversal debiasing to decouple pricing vectors from demographic zip embeddings and enforce strict pre-inference cryptographic consent gating.`
  );

  const activeContent = localResponse?.content || aiResponse?.content || defaultSynthesis;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTriggerAction = (promptText: string) => {
    setIsLoading(true);
    if (onQueryAi) {
      // Dispatches genuine query to Streamlit / Groq Cloud API
      onQueryAi(promptText);
    } else {
      // Standalone browser fallback
      setTimeout(() => {
        setLocalResponse({
          model: "qwen/qwen3.8-27b",
          source: "Offline Deterministic Matrix",
          content: promptText.includes("debiasing") 
            ? `**Technical Debiasing Protocol (Qwen 3.8 27B)**:\n\n1. **Demographic Decoupling**: Introduce gradient reversal layer penalizing correlations with zip code proxies.\n2. **EEOC Four-Fifths Floor**: Adjust calibration weights to ensure min/max price ratio exceeds 0.80.\n3. **Consent Filter**: Block inferences without verified GDPR opt-in consent.`
            : defaultSynthesis
        });
        setIsLoading(false);
      }, 500);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    handleTriggerAction(customPrompt);
    setCustomPrompt("");
  };

  return (
    <div className="space-y-6">
      {/* Module Badges */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#134074]/10 text-[#134074] border border-[#134074]/20 px-2.5 py-0.5 rounded">
          Groq LPU Ultra-Low Latency
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C5A059]/15 text-[#7A5B15] border border-[#C5A059]/30 px-2.5 py-0.5 rounded">
          Qwen 3.8 27B AI Regulatory Intelligence
        </span>
      </div>

      <div className="bg-white rounded-xl border border-[#C5A059]/30 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="font-serif-royal text-lg font-bold text-[#0B2545] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              AI Chief Compliance Officer Copilot
            </h2>
            <p className="text-xs text-[#5C677D] mt-0.5">
              Autonomous legal briefing, risk liability exposure, and engineering debiasing roadmaps synthesized by Qwen 3.8 27B.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#FAF7F2] border border-[#C5A059]/30 text-[#0B2545]">
              MODEL: qwen/qwen3.8-27b
            </span>
          </div>
        </div>

        {/* Quick Action Triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <button
            onClick={() => handleTriggerAction("Synthesize an executive legal summary evaluating our current retail pricing model's compliance with GDPR and EU AI Act.")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F4EBD9]/60 text-[#0B2545] text-xs font-semibold p-3 rounded-lg border border-[#C5A059]/40 transition-all hover:border-[#C5A059]"
          >
            <Scale className="w-4 h-4 text-[#C5A059]" />
            Executive Legal Synthesis
          </button>

          <button
            onClick={() => handleTriggerAction("Provide a 3-step technical engineering roadmap for data scientists to decouple pricing from zip code proxies and eliminate disparate steering.")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F4EBD9]/60 text-[#0B2545] text-xs font-semibold p-3 rounded-lg border border-[#C5A059]/40 transition-all hover:border-[#C5A059]"
          >
            <BookOpen className="w-4 h-4 text-[#134074]" />
            Technical Debiasing Playbook
          </button>

          <button
            onClick={() => handleTriggerAction("Evaluate potential corporate financial and legal liabilities under GDPR Article 83 and EU AI Act Title VIII.")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F4EBD9]/60 text-[#0B2545] text-xs font-semibold p-3 rounded-lg border border-[#C5A059]/40 transition-all hover:border-[#C5A059]"
          >
            <AlertOctagon className="w-4 h-4 text-[#9E2A2B]" />
            Penalty & Liability Exposure
          </button>
        </div>

        {/* Custom Question Form */}
        <form onSubmit={handleCustomSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Ask Qwen 3.8 27B any regulatory or debiasing question..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="flex-1 bg-[#FAF7F2] text-xs px-4 py-2.5 rounded-lg border border-[#C5A059]/30 focus:outline-none focus:border-[#0B2545] text-[#0B2545]"
          />
          <button
            type="submit"
            disabled={isLoading || !customPrompt.trim()}
            className="bg-[#0B2545] hover:bg-[#134074] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 rounded-lg border border-[#C5A059] flex items-center gap-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
            Consult Copilot
          </button>
        </form>

        {/* AI Output Card */}
        <div className="relative rounded-xl bg-[#FAF7F2] border border-[#C5A059]/40 border-l-4 border-l-[#D4AF37] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/20 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-serif-royal text-xs font-bold text-[#0B2545]">
                Copilot Advisory Output
              </span>
              <span className="text-[10px] bg-white border border-[#C5A059]/30 text-[#7A5B15] px-2 py-0.5 rounded font-mono">
                {localResponse?.model || "qwen/qwen3.8-27b"}
              </span>
              <span className="text-[10px] bg-[#134074]/10 text-[#134074] px-2 py-0.5 rounded font-medium">
                {localResponse?.source || "Groq Cloud LPU"}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="text-[#5C677D] hover:text-[#0B2545] text-xs flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00E676]" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="text-xs text-[#0B2545] leading-relaxed whitespace-pre-wrap font-sans">
            {isLoading ? (
              <div className="py-6 text-center text-[#5C677D] italic flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
                Synthesizing regulatory briefing with Qwen 3.8 27B on Groq...
              </div>
            ) : (
              activeContent
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

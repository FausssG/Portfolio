/// <reference path="../vite-env.d.ts" />

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { ParticleNetwork } from "./components/ParticleNetwork";
import { GameNodeSystem } from "./components/GameNodeSystem";
import { NodeContent } from "./components/NodeContent";
import { LoginScreen } from "./components/LoginScreen";
import { MatrixRain } from "./components/MatrixRain";
import { HelpPanel } from "./components/HelpPanel";
import { translations } from "./utils/translations";

export default function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [completedNodeId, setCompletedNodeId] = useState<string | null>(null);
  const [unlockSequence, setUnlockSequence] = useState(0);
  const [language, setLanguage] = useState<string>("es");
  const [showSystemHint, setShowSystemHint] = useState(false);

  const handleLoginComplete = (lang: string) => {
    setLanguage(lang);
    setShowLogin(false);
  };

  const handleNodeClose = () => {
    if (selectedNode) {
      setCompletedNodeId(selectedNode);
      setUnlockSequence((current) => current + 1);
    }
    setSelectedNode(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {showLogin ? (
        <LoginScreen onLoginComplete={handleLoginComplete} />
      ) : (
        <>
          <MatrixRain />
          <ParticleNetwork />
          <div className="relative z-10">
            <GameNodeSystem
              onNodeSelect={setSelectedNode}
              completedNodeId={completedNodeId}
              unlockSequence={unlockSequence}
              language={language as any}
            />
          </div>
      {selectedNode && (
        <NodeContent
          nodeId={selectedNode}
          onClose={handleNodeClose}
          language={language as any}
        />
      )}

      {/* Top Bar Controls */}
      <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2">
        {/* System info overlay - Responsive & Clickeable */}
        <motion.button
          onClick={() => {
            setShowSystemHint(true);
            setTimeout(() => setShowSystemHint(false), 3000);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 sm:p-2.5 bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-lg hover:border-cyan-500/60 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-cyan-400 font-mono">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="hidden sm:inline">{translations[language as keyof typeof translations].systemOnline}</span>
            <span className="sm:hidden">ONLINE</span>
          </div>
        </motion.button>

        {/* Location Pill */}
        <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-black/80 backdrop-blur-xl border border-violet-500/30 rounded-lg flex items-center gap-1.5 text-[10px] sm:text-xs text-violet-300 font-mono">
          <span className="text-violet-400">📍</span>
          <span className="hidden sm:inline">{translations[language as keyof typeof translations].contactInfo.location}</span>
          <span className="sm:hidden">Munich</span>
        </div>
      </div>

      {/* Quick Language Switcher */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-[228px] z-20 flex items-center bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-1 gap-1 text-[10px] sm:text-xs font-mono shadow-lg shadow-black/50">
        {[
          { code: 'es', label: 'ES', flag: '🇪🇸' },
          { code: 'en', label: 'EN', flag: '🇺🇸' },
          { code: 'de', label: 'DE', flag: '🇩🇪' },
        ].map(item => (
          <button
            key={item.code}
            onClick={() => setLanguage(item.code)}
            className={`px-1.5 sm:px-2 py-1 rounded transition-all flex items-center gap-1 cursor-pointer ${
              language === item.code
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/20 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title={`Cambiar a ${item.label}`}
          >
            <span>{item.flag}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>

      {/* System Online Hint */}
      <AnimatePresence>
        {showSystemHint && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 sm:top-20 left-3 sm:left-4 z-20 px-4 py-2 bg-red-600/90 backdrop-blur-xl border border-red-400 rounded-lg"
          >
            <p className="text-white font-mono text-xs sm:text-sm">
              {translations[language as keyof typeof translations].systemOnlineHint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Panel (collapsible) */}
      <HelpPanel language={language as any} />
        </>
      )}
      <Analytics />
    </div>
  );
}
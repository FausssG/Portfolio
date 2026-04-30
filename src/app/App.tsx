/// <reference path="../vite-env.d.ts" />

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ParticleNetwork } from "./components/ParticleNetwork";
import { GameNodeSystem } from "./components/GameNodeSystem";
import { TerminalLoader } from "./components/TerminalLoader";
import { NodeContent } from "./components/NodeContent";
import { LoginScreen } from "./components/LoginScreen";
import { MatrixRain } from "./components/MatrixRain";
import { HelpPanel } from "./components/HelpPanel";
import { LogoutButton } from "./components/LogoutButton";
import { translations } from "./utils/translations";

export default function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("es");
  const [showSystemHint, setShowSystemHint] = useState(false);

  const handleLoginComplete = (lang: string) => {
    setLanguage(lang);
    setShowLogin(false);
    setIsLoading(true);
  };

  const handleLogout = () => {
    setShowLogin(true);
    setIsLoading(false);
    setSelectedNode(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {showLogin ? (
        <LoginScreen onLoginComplete={handleLoginComplete} />
      ) : isLoading ? (
        <TerminalLoader onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <MatrixRain />
          <ParticleNetwork />
          <div className="relative z-10">
            <GameNodeSystem onNodeSelect={setSelectedNode} />
          </div>
          {selectedNode && (
            <NodeContent
              nodeId={selectedNode}
              onClose={() => setSelectedNode(null)}
              language={language as any}
            />
          )}

          {/* System info overlay - Responsive & Clickeable */}
          <motion.button
            onClick={() => {
              setShowSystemHint(true);
              setTimeout(() => setShowSystemHint(false), 3000);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed top-3 left-3 sm:top-4 sm:left-4 z-20 p-2 sm:p-3 bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-lg hover:border-cyan-500/60 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-cyan-400 font-mono">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="hidden sm:inline">{translations[language as keyof typeof translations].systemOnline}</span>
              <span className="sm:hidden">ONLINE</span>
            </div>
          </motion.button>

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

          {/* Logout Button */}
          <LogoutButton onLogout={handleLogout} language={language} />

          {/* Help Panel (collapsible) */}
          <HelpPanel language={language as any} />
        </>
      )}
    </div>
  );
}
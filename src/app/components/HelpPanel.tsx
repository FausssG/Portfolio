import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { HelpCircle, X } from "lucide-react";
import { translations, Language } from "../utils/translations";

export function HelpPanel({ language }: { language: Language }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language];

  return (
    <>
      {/* Help Button - Responsive */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 p-3 sm:p-4 bg-violet-600/80 backdrop-blur-xl border border-violet-500/30 rounded-full shadow-lg hover:shadow-violet-500/50 transition-all"
      >
        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </motion.button>

      {/* Help Panel - Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-16 sm:bottom-20 right-2 sm:right-4 z-20 w-[calc(100vw-1rem)] sm:w-80 max-w-[320px] bg-black/90 backdrop-blur-xl border border-violet-500/30 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-cyan-600 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
              <h3 className="text-white font-mono text-sm sm:text-base">{t.instructions}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
              <ul className="text-xs sm:text-sm text-gray-300 font-mono space-y-2">
                {t.instructionsList.map((instruction, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-cyan-400 mt-0.5 sm:mt-1">•</span>
                    <span className="leading-tight">{instruction}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Extra tip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 sm:mt-4 p-2 sm:p-3 bg-violet-950/50 border border-violet-500/30 rounded-lg"
              >
                <p className="text-[10px] sm:text-xs text-violet-300 font-mono leading-tight">
                  💡 TIP: {language === "es" ? "Toca los nodos para ver más información" : language === "en" ? "Tap nodes to see more information" : "Tippen Sie auf die Knoten für weitere Informationen"}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

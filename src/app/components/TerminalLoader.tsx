import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const bootSequence = [
  "INICIALIZANDO SISTEMA...",
  "CARGANDO MÓDULOS PRINCIPALES...",
  "ESTABLECIENDO CONEXIÓN NEURAL...",
  "SINCRONIZANDO BASE DE DATOS...",
  "ACTIVANDO INTERFAZ GRÁFICA...",
  "SISTEMA LISTO. BIENVENIDO."
];

export function TerminalLoader({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setProgress(((currentLine + 1) / bootSequence.length) * 100);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(onComplete, 800);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLine, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center"
    >
      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)"
        }}
        animate={{ y: [0, 20] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-2xl w-full px-6">
        {/* Terminal window */}
        <div className="bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20">
          {/* Terminal header */}
          <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-cyan-500/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-cyan-400 text-sm font-mono ml-4">system@portfolio:~$</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm space-y-2 min-h-[300px]">
            <AnimatePresence mode="sync">
              {bootSequence.slice(0, currentLine + 1).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-cyan-400">{">"}</span>
                  <span className="text-green-400">{line}</span>
                  {index === currentLine && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-green-400"
                    >
                      _
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Progress bar */}
            {currentLine > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 space-y-2"
              >
                <div className="flex justify-between text-cyan-400 text-xs">
                  <span>PROGRESO</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-cyan-500/30">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 bg-[length:200%_100%]"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${progress}%`,
                      backgroundPosition: ["0% 0%", "100% 0%"]
                    }}
                    transition={{
                      width: { duration: 0.5 },
                      backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Glitch effect text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-center mt-4 text-cyan-400 font-mono text-sm"
        >
          CONSTRUYENDO EXPERIENCIA INTERACTIVA...
        </motion.div>
      </div>
    </motion.div>
  );
}

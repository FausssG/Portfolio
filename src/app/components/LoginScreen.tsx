import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Fingerprint, Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" }
];

const translations = {
  es: {
    welcome: "BIENVENIDO",
    subtitle: "PORTFOLIO DIGITAL",
    systemVersion: "v2.5.8 | PROTOCOLO SEGURO",
    selectLanguage: "SELECCIONAR IDIOMA",
    enter: "ACCEDER AL SISTEMA",
    authSteps: [
      "INICIANDO SISTEMA...",
      "CARGANDO MÓDULOS...",
      "ESTABLECIENDO CONEXIÓN...",
      "PREPARANDO INTERFAZ...",
      "ACCESO CONCEDIDO"
    ],
    serverActive: "SERVIDOR ACTIVO",
    secureConnection: "CONEXIÓN SEGURA SSL/TLS 256-BIT"
  },
  en: {
    welcome: "WELCOME",
    subtitle: "DIGITAL PORTFOLIO",
    systemVersion: "v2.5.8 | SECURE PROTOCOL",
    selectLanguage: "SELECT LANGUAGE",
    enter: "ACCESS SYSTEM",
    authSteps: [
      "INITIALIZING SYSTEM...",
      "LOADING MODULES...",
      "ESTABLISHING CONNECTION...",
      "PREPARING INTERFACE...",
      "ACCESS GRANTED"
    ],
    serverActive: "SERVER ACTIVE",
    secureConnection: "SECURE CONNECTION SSL/TLS 256-BIT"
  },
  de: {
    welcome: "WILLKOMMEN",
    subtitle: "DIGITALES PORTFOLIO",
    systemVersion: "v2.5.8 | SICHERES PROTOKOLL",
    selectLanguage: "SPRACHE WÄHLEN",
    enter: "SYSTEM ZUGREIFEN",
    authSteps: [
      "SYSTEM WIRD GESTARTET...",
      "MODULE WERDEN GELADEN...",
      "VERBINDUNG WIRD HERGESTELLT...",
      "SCHNITTSTELLE WIRD VORBEREITET...",
      "ZUGRIFF GEWÄHRT"
    ],
    serverActive: "SERVER AKTIV",
    secureConnection: "SICHERE VERBINDUNG SSL/TLS 256-BIT"
  }
};

export function LoginScreen({ onLoginComplete }: { onLoginComplete: (lang: string) => void }) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("es");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  const t = translations[selectedLanguage as keyof typeof translations];
  const authSteps = t.authSteps;

  useEffect(() => {
    if (isAuthenticating && authStep < authSteps.length) {
      const timer = setTimeout(() => {
        setAuthStep(prev => prev + 1);
        setScanProgress(((authStep + 1) / authSteps.length) * 100);
      }, 600);
      return () => clearTimeout(timer);
    } else if (authStep === authSteps.length) {
      const completeTimer = setTimeout(() => onLoginComplete(selectedLanguage), 800);
      return () => clearTimeout(completeTimer);
    }
  }, [isAuthenticating, authStep, authSteps.length, onLoginComplete, selectedLanguage]);

  const handleEnter = () => {
    setIsAuthenticating(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}>
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 2px)"
        }}
        animate={{ y: [0, 20] }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <AnimatePresence mode="wait">
          {!isAuthenticating ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              {/* Logo/Header - Responsive */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8 sm:mb-10"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="inline-block p-4 sm:p-6 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 rounded-full mb-4 sm:mb-6 border border-violet-500/30"
                >
                  <Fingerprint className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" />
                </motion.div>
                <h1 className="text-3xl sm:text-5xl bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2 sm:mb-3" style={{ fontWeight: 700 }}>
                  {t.welcome}
                </h1>
                <p className="text-xl sm:text-2xl text-white mb-2" style={{ fontWeight: 600 }}>
                  Faustino Gnavi
                </p>
                <p className="text-cyan-400 font-mono text-xs sm:text-sm">{t.subtitle}</p>
                <p className="text-gray-500 font-mono text-[10px] sm:text-xs mt-2">{t.systemVersion}</p>
              </motion.div>

              {/* Language Selector - Responsive */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-5 sm:mb-6"
              >
                <div className="flex items-center gap-2 mb-2 sm:mb-3 text-cyan-400 font-mono text-xs sm:text-sm">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{t.selectLanguage}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm transition-all relative overflow-hidden ${
                        selectedLanguage === lang.code
                          ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-2 border-cyan-400"
                          : "bg-slate-800/80 text-gray-400 border-2 border-violet-500/30 hover:border-violet-500/50"
                      }`}
                    >
                      {selectedLanguage === lang.code && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-violet-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.2 }}
                        />
                      )}
                      <div className="relative z-10">
                        <div className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{lang.flag}</div>
                        <div className="text-[10px] sm:text-xs">{lang.name}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Enter Button - Responsive */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={handleEnter}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl font-mono text-base sm:text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-violet-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t.enter}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Footer info - Responsive */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 sm:mt-8 text-center space-y-1.5 sm:space-y-2"
              >
                <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-violet-400 font-mono">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>{t.serverActive}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 font-mono">
                  {t.secureConnection}
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md"
            >
              {/* Authentication Process - Responsive */}
              <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6 sm:p-8 shadow-2xl shadow-violet-500/20">
                <div className="text-center mb-4 sm:mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <Fingerprint className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" />
                  </motion.div>
                </div>

                {/* Auth steps - Responsive */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <AnimatePresence mode="sync">
                    {authSteps.slice(0, authStep + 1).map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono"
                      >
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="text-cyan-400">{step}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Progress bar - Responsive */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between text-[10px] sm:text-xs text-cyan-400 font-mono">
                    <span>AUTENTICACIÓN</span>
                    <span>{Math.round(scanProgress)}%</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden border border-cyan-500/30">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${scanProgress}%`,
                        backgroundPosition: ["0% 0%", "200% 0%"]
                      }}
                      transition={{
                        width: { duration: 0.5 },
                        backgroundPosition: { duration: 1.5, repeat: Infinity, ease: "linear" }
                      }}
                      style={{ backgroundSize: "200% 100%" }}
                    />
                  </div>
                </div>

                {/* Biometric scan animation - Responsive */}
                <motion.div
                  className="mt-4 sm:mt-6 relative h-16 sm:h-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: authStep >= 1 ? 1 : 0 }}
                >
                  <div className="absolute inset-0 border border-cyan-500/30 rounded">
                    <motion.div
                      className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      animate={{ y: [0, authStep >= 1 ? 80 : 64, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-cyan-400/30 font-mono text-[10px] sm:text-xs"
                    >
                      ESCANEANDO...
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

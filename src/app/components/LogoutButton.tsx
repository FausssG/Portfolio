import { motion } from "motion/react";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function LogoutButton({ onLogout, language }: { onLogout: () => void; language: string }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setShowConfirm(false);
    onLogout();
  };

  const texts = {
    es: { logout: "Cerrar Sesión", confirm: "¿Salir del sistema?", yes: "Sí", no: "No" },
    en: { logout: "Logout", confirm: "Exit system?", yes: "Yes", no: "No" },
    de: { logout: "Abmelden", confirm: "System verlassen?", yes: "Ja", no: "Nein" }
  };

  const t = texts[language as keyof typeof texts] || texts.es;

  return (
    <>
      <motion.button
        onClick={() => setShowConfirm(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 left-4 z-20 px-4 py-2 bg-red-600/80 backdrop-blur-xl border border-red-500/30 rounded-lg shadow-lg hover:shadow-red-500/50 transition-all flex items-center gap-2 group"
      >
        <LogOut className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-300" />
        <span className="text-white font-mono text-sm hidden md:inline">{t.logout}</span>
      </motion.button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900/95 backdrop-blur-xl border border-red-500/30 rounded-xl p-6 max-w-sm mx-4 shadow-2xl shadow-red-500/20"
          >
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-red-500/20 rounded-full mb-4">
                <LogOut className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl text-white font-mono mb-2">{t.confirm}</h3>
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowConfirm(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all font-mono text-white"
              >
                {t.no}
              </motion.button>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all font-mono text-white"
              >
                {t.yes}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

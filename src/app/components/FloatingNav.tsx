import { motion } from "motion/react";
import { Home, User, Briefcase, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { id: "hero", icon: Home, label: "Inicio" },
  { id: "about", icon: User, label: "Sobre mí" },
  { id: "projects", icon: Briefcase, label: "Proyectos" },
  { id: "contact", icon: Mail, label: "Contacto" }
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId === "hero" ? "" : sectionId);
        if (element || sectionId === "hero") {
          const target = sectionId === "hero" ? document.body : element;
          if (target) {
            const offsetTop = sectionId === "hero" ? 0 : (target as HTMLElement).offsetTop;
            const offsetBottom = offsetTop + (target as HTMLElement).offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 p-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-lg shadow-violet-500/20">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-3 rounded-full transition-all duration-300 ${
              activeSection === item.id
                ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
            {activeSection === item.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}

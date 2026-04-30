import { motion, AnimatePresence } from "motion/react";
import { X, Github, Linkedin, Mail, Terminal, Code, Database, Zap, Download, Award, Globe as GlobeIcon } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { translations, Language } from "../utils/translations";
import { ProjectCard } from "./ProjectCard";

interface NodeContentProps {
  nodeId: string;
  onClose: () => void;
  language: Language;
}

export function NodeContent({ nodeId, onClose, language }: NodeContentProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [mailStatus, setMailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [mailMessage, setMailMessage] = useState('');
  const t = translations[language];
  const ui = t.nodeContent;
  const skillStyleMap: Record<string, { icon: typeof Code; wrapper: string; iconClass: string; titleClass: string; chipClass: string }> = {
    languages: {
      icon: Code,
      wrapper: "bg-violet-950/30 border-violet-500/30",
      iconClass: "text-violet-400",
      titleClass: "text-violet-400",
      chipClass: "bg-violet-500/20 text-violet-300 border-violet-500/30"
    },
    frameworks: {
      icon: Database,
      wrapper: "bg-cyan-950/30 border-cyan-500/30",
      iconClass: "text-cyan-400",
      titleClass: "text-cyan-400",
      chipClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
    },
    databases: {
      icon: Database,
      wrapper: "bg-sky-950/30 border-sky-500/30",
      iconClass: "text-sky-400",
      titleClass: "text-sky-400",
      chipClass: "bg-sky-500/20 text-sky-300 border-sky-500/30"
    },
    version: {
      icon: Terminal,
      wrapper: "bg-pink-950/30 border-pink-500/30",
      iconClass: "text-pink-400",
      titleClass: "text-pink-400",
      chipClass: "bg-pink-500/20 text-pink-300 border-pink-500/30"
    },
    data: {
      icon: Zap,
      wrapper: "bg-emerald-950/30 border-emerald-500/30",
      iconClass: "text-emerald-400",
      titleClass: "text-emerald-400",
      chipClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    },
    simulation: {
      icon: Terminal,
      wrapper: "bg-amber-950/30 border-amber-500/30",
      iconClass: "text-amber-400",
      titleClass: "text-amber-400",
      chipClass: "bg-amber-500/20 text-amber-300 border-amber-500/30"
    },
    design: {
      icon: Code,
      wrapper: "bg-fuchsia-950/30 border-fuchsia-500/30",
      iconClass: "text-fuchsia-400",
      titleClass: "text-fuchsia-400",
      chipClass: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30"
    },
    iot: {
      icon: Terminal,
      wrapper: "bg-orange-950/30 border-orange-500/30",
      iconClass: "text-orange-400",
      titleClass: "text-orange-400",
      chipClass: "bg-orange-500/20 text-orange-300 border-orange-500/30"
    },
    methods: {
      icon: Database,
      wrapper: "bg-indigo-950/30 border-indigo-500/30",
      iconClass: "text-indigo-400",
      titleClass: "text-indigo-400",
      chipClass: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
    }
  };
  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/FausssG" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/faustino-gnavi/" },
    { icon: Mail, label: "Email", href: "mailto:faustinognavi@gmail.com" },
  ];

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setMailStatus('error');
      setMailMessage(language === 'es' ? 'Por favor completa todos los campos' : language === 'en' ? 'Please fill in all fields' : 'Bitte füllen Sie alle Felder aus');
      setTimeout(() => setMailStatus('idle'), 3000);
      return;
    }

    setMailStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setMailStatus('success');
        setMailMessage(ui.sentSuccess);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setMailStatus('idle'), 3000);
      } else {
        throw new Error('Error en la respuesta');
      }
    } catch (error) {
      setMailStatus('error');
      setMailMessage(ui.sendError);
      setTimeout(() => setMailStatus('idle'), 3000);
    }
  };

  const content: Record<string, any> = {
    main: {
      title: t.nodes.main.title,
      component: (
        <div className="space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="text-center"
          >
            <div className="inline-block p-6 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full mb-4">
              <Terminal className="w-16 h-16 text-cyan-400" />
            </div>
            <h3 className="text-3xl mb-2 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
              {t.name}
            </h3>
            <p className="text-cyan-400 font-mono mb-4">{t.role}</p>

            {/* Welcome message */}
            <div className="max-w-md mx-auto mb-6 p-4 bg-violet-950/30 border border-violet-500/20 rounded-lg">
              <p className="text-gray-300 text-sm leading-relaxed">
                {t.mainDescription}
              </p>
            </div>
          </motion.div>

          {/* Quick access note */}
          <div className="text-center mb-3">
            <p className="text-xs text-violet-400 font-mono">{t.quickAccess}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {[
              t.stats.projects,
              t.stats.experience,
              t.stats.technologies,
              t.stats.gpa
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-3 sm:p-4 bg-gradient-to-br from-violet-950/50 to-cyan-950/50 border border-violet-500/30 rounded-xl text-center"
              >
                <div className="text-xl sm:text-2xl text-cyan-400 font-mono" style={{ fontWeight: 700 }}>{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    about: {
      title: t.aboutTitle,
      component: (
        <div className="space-y-4">
          <div className="p-4 bg-violet-950/30 border border-violet-500/30 rounded-lg">
            <h4 className="text-cyan-400 font-mono mb-2">{t.identification}</h4>
            <p className="text-gray-300 text-sm">
              {t.identificationText}
            </p>
          </div>
          <div className="p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-lg">
            <h4 className="text-violet-400 font-mono mb-2">{t.mission}</h4>
            <p className="text-gray-300 text-sm">
              {t.missionText}
            </p>
          </div>
          <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-lg">
            <h4 className="text-emerald-400 font-mono mb-2">{t.interpersonalSkillsTitle}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.interpersonalSkillsText}
            </p>
          </div>
        </div>
      )
    },
    skills: {
      title: t.skillsTitle,
      component: (
        <div className="space-y-3 -mr-2 sm:-mr-4 pr-2 sm:pr-4" style={{ maxHeight: 'calc(70vh - 200px)', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
          {t.skillCategories.map((group, i) => {
            const style = skillStyleMap[group.key] ?? skillStyleMap.languages;

            return (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 ${style.wrapper} border rounded-lg`}
            >
              <div className="flex items-center gap-2 mb-3">
                <style.icon className={`w-5 h-5 ${style.iconClass}`} />
                <h4 className={`${style.titleClass} font-mono`}>{group.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className={`px-3 py-1 ${style.chipClass} rounded-full text-xs font-mono border`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            );
          })}
        </div>
      )
    },
    projects: {
      title: t.projectsTitle,
      component: (
        <div className="space-y-3 sm:space-y-4 -mr-2 sm:-mr-4 pr-2 sm:pr-4" style={{ maxHeight: 'calc(70vh - 200px)', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
          {t.projectsList.map((project, i) => (
            <ProjectCard key={project.name} project={project as any} index={i} />
          ))}
        </div>
      )
    },
    languages: {
      title: t.languagesTitle,
      component: (
        <div className="space-y-4">
          {t.languagesList.map((lang, i) => (
            <motion.div
              key={lang.language}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="p-4 bg-gradient-to-br from-violet-950/40 to-cyan-950/40 border border-violet-500/30 rounded-xl hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{lang.flag}</span>
                <div className="flex-1">
                  <h4 className="text-white font-mono text-lg">{lang.language}</h4>
                  <p className="text-cyan-400 font-mono text-sm">{lang.level}</p>
                </div>
                <Award className="w-6 h-6 text-violet-400" />
              </div>
              <p className="text-gray-400 text-sm font-mono">{lang.description}</p>

              {/* Progress bar */}
              <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: lang.level.includes("Nativo") || lang.level.includes("Native") ? "100%" : lang.level.includes("C1") || lang.level.includes("Advanced") ? "85%" : "50%" }}
                  transition={{ duration: 1, delay: i * 0.15 + 0.3 }}
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    cv: {
      title: t.cvTitle,
      component: (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block p-6 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full mb-4"
            >
              <Download className="w-12 h-12 text-cyan-400" />
            </motion.div>
            <p className="text-gray-400 text-sm font-mono">
              {t.lastUpdated}: 30/04/2026
            </p>
          </div>

          <motion.a
            href="/src/imports/CV_FAUSTINO_GNAVI.pdf"
            download="CV_Faustino_Gnavi_ES.pdf"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="block p-4 bg-gradient-to-r from-violet-950/50 to-purple-950/50 border border-violet-500/30 rounded-xl hover:border-violet-500/60 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇪🇸</span>
                <div>
                  <h4 className="text-white font-mono">{t.cvSpanish}</h4>
                  <p className="text-gray-500 text-xs font-mono">PDF • 291 KB</p>
                </div>
              </div>
              <Download className="w-5 h-5 text-violet-400 group-hover:text-cyan-400 transition-colors" />
            </div>
          </motion.a>

          <motion.a
            href="/src/imports/CV_Faustino_Gnavi_EN.pdf"
            download="CV_Faustino_Gnavi_EN.pdf"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="block p-4 bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border border-cyan-500/30 rounded-xl hover:border-cyan-500/60 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇺🇸</span>
                <div>
                  <h4 className="text-white font-mono">{t.cvEnglish}</h4>
                  <p className="text-gray-500 text-xs font-mono">PDF • 289 KB</p>
                </div>
              </div>
              <Download className="w-5 h-5 text-cyan-400 group-hover:text-violet-400 transition-colors" />
            </div>
          </motion.a>

          <motion.a
            href="/src/imports/CV_Faustino_Gnavi_DE.pdf"
            download="CV_Faustino_Gnavi_DE.pdf"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="block p-4 bg-gradient-to-r from-indigo-950/50 to-violet-950/50 border border-indigo-500/30 rounded-xl hover:border-indigo-500/60 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇩🇪</span>
                <div>
                  <h4 className="text-white font-mono">{t.cvGerman || "Lebenslauf (Deutsch)"}</h4>
                  <p className="text-gray-500 text-xs font-mono">PDF • 285 KB</p>
                </div>
              </div>
              <Download className="w-5 h-5 text-indigo-400 group-hover:text-violet-400 transition-colors" />
            </div>
          </motion.a>

          <div className="mt-6 p-4 bg-violet-950/30 border border-violet-500/20 rounded-lg">
            <p className="text-xs text-violet-300 font-mono text-center">
              💡 {ui.downloadFilesHint}
            </p>
          </div>
        </div>
      )
    },
    contact: {
      title: t.contactTitle,
      component: (
        <div className="space-y-4">
          <form className="space-y-3" onSubmit={handleContactSubmit}>
            <input
              type="text"
              placeholder={t.formPlaceholders.name}
              className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded text-cyan-400 placeholder-cyan-700 font-mono text-sm focus:outline-none focus:border-cyan-500"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
              disabled={mailStatus === 'sending'}
            />
            <input
              type="email"
              placeholder={t.formPlaceholders.email}
              className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded text-cyan-400 placeholder-cyan-700 font-mono text-sm focus:outline-none focus:border-cyan-500"
              value={formData.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
              disabled={mailStatus === 'sending'}
            />
            <textarea
              placeholder={t.formPlaceholders.message}
              rows={3}
              className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded text-cyan-400 placeholder-cyan-700 font-mono text-sm focus:outline-none focus:border-cyan-500 resize-none"
              value={formData.message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, message: e.target.value})}
              disabled={mailStatus === 'sending'}
            />
            <button
              type="submit"
              disabled={mailStatus === 'sending'}
              className={`w-full py-2 rounded font-mono transition-all ${
                mailStatus === 'sending' 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:shadow-lg hover:shadow-cyan-500/50'
              }`}
            >
              {mailStatus === 'sending' ? `⏳ ${ui.sending}` : t.formLabels.submit}
            </button>
            
            {/* Feedback visual */}
            {mailStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-500/20 border border-green-500/50 rounded text-green-400 text-sm font-mono text-center"
              >
                ✅ {mailMessage}
              </motion.div>
            )}
            {mailStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-sm font-mono text-center"
              >
                ❌ {mailMessage}
              </motion.div>
            )}
          </form>
          <div className="pt-3 border-t border-violet-500/20">
            <p className="text-xs text-gray-400 font-mono mb-2">{ui.contactDirect}</p>
            <div className="space-y-1 text-xs text-cyan-400 font-mono">
              <p>{t.contactInfo.email}</p>
              <p>{t.contactInfo.phone}</p>
              <p className="text-gray-500">{t.contactInfo.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-violet-950/30 border border-violet-500/30 rounded hover:bg-violet-950/50 transition-all group text-center"
              >
                <social.icon className="w-5 h-5 text-violet-400 mx-auto group-hover:text-cyan-400 transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      )
    },
    secret: {
      title: t.nodes.secret.title,
      component: (
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <div className="inline-block p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full mb-4 border-2 border-yellow-400/50">
              <Terminal className="w-16 h-16 text-yellow-400" />
            </div>
            <h3 className="text-3xl mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
              ¡HACK EXITOSO!
            </h3>
            <p className="text-yellow-400 font-mono mb-2">{ui.unlockSystem}</p>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-orange-400 font-mono"
            >
              +100 XP {ui.bonusUnlocked}
            </motion.div>
          </motion.div>

          <div className="p-4 bg-gradient-to-r from-yellow-950/30 to-orange-950/30 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-300 font-mono text-sm text-center leading-relaxed">
              {language === "es"
                ? "¡Felicidades! Has descubierto el nodo secreto. Tu curiosidad y dedicación te han llevado a encontrar este mensaje oculto. Esto demuestra que prestas atención a los detalles."
                : language === "en"
                ? "Congratulations! You discovered the secret node. Your curiosity and dedication led you to find this hidden message. This shows you pay attention to details."
                : "Glückwunsch! Sie haben den geheimen Knoten entdeckt. Ihre Neugier und Ihr Engagement haben Sie zu dieser versteckten Nachricht geführt. Dies zeigt, dass Sie auf Details achten."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-yellow-950/20 border border-yellow-500/30 rounded-xl text-center"
            >
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-xs text-yellow-300 font-mono">{ui.achievement}</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-orange-950/20 border border-orange-500/30 rounded-xl text-center"
            >
              <div className="text-2xl mb-1">🎁</div>
              <div className="text-xs text-orange-300 font-mono">{ui.bonusUnlocked}</div>
            </motion.div>
          </div>

          <div className="p-3 bg-slate-900/50 border border-yellow-500/20 rounded text-center">
            <p className="text-xs text-gray-400 font-mono">
              {language === "es"
                ? "Gracias por explorar mi portfolio de manera tan completa"
                : language === "en"
                ? "Thank you for exploring my portfolio so thoroughly"
                : "Vielen Dank, dass Sie mein Portfolio so gründlich erkundet haben"}
            </p>
          </div>
        </div>
      )
    }
  };

  const currentContent = content[nodeId] || content.main;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        style={{ touchAction: 'none' }}
      >
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0,
            rotateX: 90,
            y: 100
          }}
          animate={{
            scale: 1,
            opacity: 1,
            rotateX: 0,
            y: 0
          }}
          exit={{
            scale: 0.8,
            opacity: 0,
            rotateX: -20,
            y: 50
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.3
          }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-hidden"
          style={{
            touchAction: 'auto',
            perspective: '1000px'
          }}
        >
          {/* Terminal window */}
          <motion.div
            initial={{ boxShadow: "0 0 0 rgba(34, 211, 238, 0)" }}
            animate={{ boxShadow: "0 20px 60px rgba(34, 211, 238, 0.2)" }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-lg overflow-hidden h-full flex flex-col"
          >
            {/* Header */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="bg-slate-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-cyan-500/30 flex-shrink-0"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-cyan-400 font-mono text-xs sm:text-sm">{currentContent.title}</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </button>
            </motion.div>

            {/* Content - Scrollable */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.2 }}
              className="p-4 sm:p-6 overflow-y-auto flex-1"
            >
              {currentContent.component}
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
              className="bg-slate-800 px-3 sm:px-4 py-2 border-t border-cyan-500/30 flex-shrink-0"
            >
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-cyan-400 font-mono">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                <span>{ui.systemActive}</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

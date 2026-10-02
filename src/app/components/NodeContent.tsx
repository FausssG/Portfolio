import { motion, AnimatePresence } from "motion/react";
import { X, Github, Linkedin, Mail, Terminal, Code, Database, Zap, Download, Award, Globe as GlobeIcon, MapPin, Building2, Server, Target, CheckCircle2, Eye, ExternalLink, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("all");
  const [selectedCvLang, setSelectedCvLang] = useState<'es' | 'en' | 'de' | null>(null);

  useEffect(() => {
    setSelectedCvLang(null);
  }, [nodeId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <div className="inline-block p-4 sm:p-6 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full mb-3 sm:mb-4">
              <Terminal className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl mb-1 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-bold">
              {t.name}
            </h3>
            <p className="text-cyan-400 font-mono text-xs sm:text-sm mb-2">{t.role}</p>

            {/* Location Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-black/60 border border-violet-500/40 rounded-full text-[11px] sm:text-xs font-mono text-cyan-300 mb-3 sm:mb-4 shadow-sm shadow-violet-500/10">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.contactInfo.location}</span>
            </div>

            {/* Welcome message */}
            <div className="max-w-md mx-auto mb-4 sm:mb-6 p-3 sm:p-4 bg-violet-950/30 border border-violet-500/20 rounded-lg">
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {t.mainDescription}
              </p>
            </div>
          </div>

          {/* Quick access note */}
          <div className="text-center mb-2 sm:mb-3">
            <p className="text-[11px] sm:text-xs text-violet-400 font-mono">{t.quickAccess}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {[
              t.stats.projects,
              t.stats.experience,
              t.stats.technologies,
              t.stats.gpa
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-2.5 sm:p-4 bg-gradient-to-br from-violet-950/50 to-cyan-950/50 border border-violet-500/30 rounded-xl text-center"
              >
                <div className="text-lg sm:text-2xl text-cyan-400 font-mono font-bold">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    about: {
      title: t.aboutTitle,
      component: (
        <div className="space-y-3 sm:space-y-4">
          {/* Current Location Card */}
          <div className="p-3 sm:p-3.5 bg-gradient-to-r from-violet-950/40 to-cyan-950/40 border border-violet-500/30 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="p-1.5 bg-cyan-500/20 rounded-md">
                <MapPin className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono text-gray-400 block">
                  {language === "es" ? "Residencia actual" : language === "en" ? "Current Residence" : "Aktueller Wohnort"}
                </span>
                <span className="text-xs sm:text-sm font-mono text-white font-semibold">{t.contactInfo.location}</span>
              </div>
            </div>
            <span className="text-xl sm:text-2xl">🇩🇪</span>
          </div>

          <div className="p-3 sm:p-4 bg-violet-950/30 border border-violet-500/30 rounded-lg">
            <h4 className="text-cyan-400 font-mono text-xs sm:text-sm mb-1.5 font-semibold">{t.identification}</h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              {t.identificationText}
            </p>
          </div>
          <div className="p-3 sm:p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-lg">
            <h4 className="text-violet-400 font-mono text-xs sm:text-sm mb-1.5 font-semibold">{t.mission}</h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              {t.missionText}
            </p>
          </div>
          <div className="p-3 sm:p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-lg">
            <h4 className="text-emerald-400 font-mono text-xs sm:text-sm mb-1.5 font-semibold">{t.interpersonalSkillsTitle}</h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              {t.interpersonalSkillsText}
            </p>
          </div>
        </div>
      )
    },
    skills: {
      title: t.skillsTitle,
      component: (
        <div className="space-y-3 sm:space-y-4">
          {/* Category Filter Pills - Organized Toolbar */}
          <div className="p-2 sm:p-2.5 bg-black/50 border border-cyan-500/25 rounded-xl flex flex-wrap items-center gap-1.5 shadow-inner">
            <span className="text-[10px] font-mono text-cyan-400/70 uppercase tracking-wider mr-1 hidden sm:inline">
              {language === "es" ? "Filtrar:" : language === "en" ? "Filter:" : "Filter:"}
            </span>
            <button
              onClick={() => setSelectedSkillCategory("all")}
              className={`px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono border transition-all cursor-pointer flex items-center gap-1 ${
                selectedSkillCategory === "all"
                  ? "bg-cyan-500/25 text-cyan-300 border-cyan-400 font-bold shadow-sm shadow-cyan-500/20"
                  : "bg-slate-900/80 text-gray-400 border-white/10 hover:text-white hover:border-cyan-500/30"
              }`}
            >
              <span>{language === "es" ? "Todos" : language === "en" ? "All" : "Alle"}</span>
              <span className="text-[10px] opacity-60">({t.skillCategories.length})</span>
            </button>
            {t.skillCategories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedSkillCategory(cat.key)}
                className={`px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono border transition-all cursor-pointer ${
                  selectedSkillCategory === cat.key
                    ? "bg-violet-500/25 text-violet-300 border-violet-400 font-bold shadow-sm shadow-violet-500/20"
                    : "bg-slate-900/80 text-gray-400 border-white/10 hover:text-white hover:border-violet-500/30"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Filtered Skills List - Balanced masonry layout without empty stretched voids */}
          <div className={selectedSkillCategory === "all" ? "columns-1 sm:columns-2 gap-3 [column-fill:_balance]" : "max-w-xl mx-auto"}>
            {t.skillCategories
              .filter(cat => selectedSkillCategory === "all" || selectedSkillCategory === cat.key)
              .map((group) => {
                const style = skillStyleMap[group.key] ?? skillStyleMap.languages;

                return (
                  <div
                    key={group.key}
                    className={`break-inside-avoid mb-3 p-3.5 sm:p-4 ${style.wrapper} border rounded-xl hover:border-cyan-500/40 transition-all shadow-md group`}
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                      <div className="flex items-center gap-2">
                        <style.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${style.iconClass}`} />
                        <h4 className={`${style.titleClass} font-mono text-xs sm:text-sm font-semibold`}>{group.title}</h4>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
                        {group.skills.length}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map(skill => (
                        <span
                          key={skill}
                          className={`px-2 sm:px-2.5 py-0.5 sm:py-1 ${style.chipClass} rounded-md text-[11px] sm:text-xs font-mono border hover:scale-105 transition-transform`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )
    },
    experience: {
      title: t.experienceTitle,
      component: (
        <div className="space-y-3 sm:space-y-4">
          {/* Header Card with Logo and Role */}
          <div className="p-3.5 sm:p-5 bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900/60 border border-blue-500/30 rounded-xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
              <div className="bg-white/95 p-2 sm:p-3 rounded-xl border border-white/30 shadow-lg shadow-blue-500/10 flex items-center justify-center shrink-0">
                <img
                  src={t.experienceData.logo}
                  alt={t.experienceData.company}
                  className="h-8 sm:h-11 w-auto max-w-[170px] sm:max-w-[210px] object-contain"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    {t.experienceData.period}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {t.experienceData.status}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-mono text-white font-bold leading-tight">
                  {t.experienceData.company}
                </h3>
                <p className="text-cyan-400 font-mono text-xs sm:text-sm mt-0.5">
                  {t.experienceData.role}
                </p>
              </div>
            </div>
          </div>

          {/* Objective Card */}
          <div className="p-3 sm:p-4 bg-violet-950/30 border border-violet-500/30 rounded-xl">
            <h4 className="text-cyan-400 font-mono text-xs sm:text-sm uppercase tracking-wider mb-1.5 flex items-center gap-2 font-semibold">
              <Target className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{t.experienceData.objectiveTitle}</span>
            </h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              {t.experienceData.objectiveText}
            </p>
          </div>

          {/* Pillars / Key Areas Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {t.experienceData.areas.map((area) => (
              <div
                key={area.title}
                className="p-3 sm:p-3.5 bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-cyan-500/20 hover:border-cyan-500/40 rounded-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <h5 className="text-white font-mono text-xs sm:text-sm font-semibold">{area.title}</h5>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed font-sans sm:font-mono">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="p-3 sm:p-3.5 bg-black/40 border border-blue-500/30 rounded-xl">
            <div className="text-[10px] sm:text-[11px] font-mono text-blue-300 mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === "es" ? "Stack Tecnológico & Entorno:" : language === "en" ? "Tech Stack & Environment:" : "Technologie-Stack & Umgebung:"}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {t.experienceData.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-md text-[11px] sm:text-xs font-mono text-cyan-300 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    projects: {
      title: t.projectsTitle,
      component: (
        <div className="space-y-3 sm:space-y-4">
          {t.projectsList.map((project, i) => (
            <ProjectCard key={project.name} project={project as any} index={i} />
          ))}
        </div>
      )
    },
    languages: {
      title: t.languagesTitle,
      component: (
        <div className="space-y-3 sm:space-y-4">
          {t.languagesList.map((lang) => (
            <div
              key={lang.language}
              className="p-3.5 sm:p-4 bg-gradient-to-br from-violet-950/40 to-cyan-950/40 border border-violet-500/30 rounded-xl hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
                <span className="text-3xl sm:text-4xl">{lang.flag}</span>
                <div className="flex-1">
                  <h4 className="text-white font-mono text-base sm:text-lg font-bold">{lang.language}</h4>
                  <p className="text-cyan-400 font-mono text-xs sm:text-sm">{lang.level}</p>
                </div>
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
              </div>
              <p className="text-gray-400 text-xs sm:text-sm font-mono leading-relaxed">{lang.description}</p>

              {/* Progress bar */}
              <div className="mt-2.5 sm:mt-3 h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: lang.level.includes("Nativo") || lang.level.includes("Native") ? "100%" : lang.level.includes("C1") || lang.level.includes("Advanced") ? "85%" : "50%" }}
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      )
    },
    cv: {
      title: selectedCvLang ? `${t.cvTitle} [${selectedCvLang.toUpperCase()}]` : t.cvTitle,
      component: (() => {
        const cvList = [
          {
            code: 'es' as const,
            flag: '🇪🇸',
            title: t.cvSpanish,
            file: '/assets/projects/CV_GNAVI_FAUSTINO_ES.pdf',
            filename: 'CV_GNAVI_FAUSTINO_ES.pdf',
            size: 'PDF • 291 KB',
            gradient: 'from-violet-950/50 to-purple-950/50',
            border: 'border-violet-500/30 hover:border-violet-500/60',
            glow: 'shadow-violet-500/10'
          },
          {
            code: 'en' as const,
            flag: '🇺🇸',
            title: t.cvEnglish,
            file: '/assets/projects/CV_GNAVI_FAUSTINO_EN.pdf',
            filename: 'CV_GNAVI_FAUSTINO_EN.pdf',
            size: 'PDF • 289 KB',
            gradient: 'from-cyan-950/50 to-blue-950/50',
            border: 'border-cyan-500/30 hover:border-cyan-500/60',
            glow: 'shadow-cyan-500/10'
          },
          {
            code: 'de' as const,
            flag: '🇩🇪',
            title: t.cvGerman || (language === "de" ? "Lebenslauf (Deutsch)" : "CV in German"),
            file: '/assets/projects/CV_GNAVI_FAUSTINO_DE.pdf',
            filename: 'CV_GNAVI_FAUSTINO_DE.pdf',
            size: 'PDF • 285 KB',
            gradient: 'from-indigo-950/50 to-violet-950/50',
            border: 'border-indigo-500/30 hover:border-indigo-500/60',
            glow: 'shadow-indigo-500/10'
          }
        ];

        const activeCv = cvList.find(c => c.code === selectedCvLang) || cvList[0];

        if (selectedCvLang !== null) {
          return (
            <div className="space-y-3">
              {/* Header Controls */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-black/60 border border-cyan-500/30 rounded-xl">
                <button
                  onClick={() => setSelectedCvLang(null)}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white rounded-lg text-xs font-mono border border-white/10 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.backToList || (language === "es" ? "Volver" : language === "en" ? "Back" : "Zurück")}</span>
                </button>

                {/* Quick language toggle buttons */}
                <div className="flex items-center gap-1 bg-slate-900 p-0.5 sm:p-1 rounded-lg border border-white/10">
                  {cvList.map((cv) => (
                    <button
                      key={cv.code}
                      onClick={() => setSelectedCvLang(cv.code)}
                      className={`px-2 sm:px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                        selectedCvLang === cv.code
                          ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/60 font-bold shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <span>{cv.flag}</span>
                      <span>{cv.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>

                {/* Open in new tab & Download buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <a
                    href={activeCv.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-mono transition-all font-semibold"
                    title={t.openInNewTab}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.openInNewTab}</span>
                    <span className="sm:hidden">Pestaña</span>
                  </a>

                  <a
                    href={activeCv.file}
                    download={activeCv.filename}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 border border-violet-500/40 rounded-lg text-xs font-mono transition-all"
                    title={t.downloadCV}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* PDF Preview Frame - Responsive height for mobile/tablet */}
              <div className="w-full h-[50dvh] sm:h-[60vh] md:h-[64vh] rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-2xl relative">
                <iframe
                  src={`${activeCv.file}#view=FitH&toolbar=1`}
                  title={activeCv.title}
                  className="w-full h-full bg-white"
                />
              </div>

              {/* Fallback link */}
              <div className="text-center text-[10px] sm:text-xs font-mono text-gray-400 flex items-center justify-center gap-1.5">
                <span>💡 {language === "es" ? "¿Prefieres pantalla completa?" : language === "en" ? "Prefer full screen?" : "Vollbild bevorzugt?"}</span>
                <a
                  href={activeCv.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-semibold"
                >
                  {t.openInNewTab} ↗
                </a>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center mb-3 sm:mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block p-3.5 sm:p-5 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full mb-2"
              >
                <Eye className="w-7 h-7 sm:w-10 sm:h-10 text-cyan-400" />
              </motion.div>
              <p className="text-cyan-400 font-mono text-xs sm:text-sm font-semibold mb-0.5">
                {t.viewOnlineHint || "Haz clic para ver la vista previa en el navegador"}
              </p>
              <p className="text-gray-500 text-[10px] sm:text-xs font-mono">
                {t.lastUpdated}: 02/06/2026
              </p>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {cvList.map((cv) => (
                <div
                  key={cv.code}
                  onClick={() => setSelectedCvLang(cv.code)}
                  className={`p-3 sm:p-4 bg-gradient-to-r ${cv.gradient} border ${cv.border} rounded-xl transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 cursor-pointer shadow-md ${cv.glow}`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="text-2xl sm:text-3xl">{cv.flag}</span>
                    <div>
                      <h4 className="text-white font-mono text-sm sm:text-base font-bold group-hover:text-cyan-300 transition-colors">
                        {cv.title}
                      </h4>
                      <p className="text-gray-400 text-[10px] sm:text-xs font-mono">{cv.size}</p>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t border-white/5 sm:border-0" onClick={(e) => e.stopPropagation()}>
                    {/* Preview Button */}
                    <button
                      onClick={() => setSelectedCvLang(cv.code)}
                      className="flex-1 sm:flex-initial justify-center px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400/50 rounded-lg text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer font-semibold shadow-sm shadow-cyan-500/20"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.previewCV || "Vista previa"}</span>
                    </button>

                    {/* Open in new tab button */}
                    <a
                      href={cv.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-white/20 rounded-lg text-gray-300 hover:text-white text-xs font-mono flex items-center transition-all"
                      title={t.openInNewTab}
                    >
                      <ExternalLink className="w-4 h-4 text-violet-300" />
                    </a>

                    {/* Download button */}
                    <a
                      href={cv.file}
                      download={cv.filename}
                      className="p-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-white/20 rounded-lg text-gray-300 hover:text-white text-xs font-mono flex items-center transition-all"
                      title={t.downloadCV}
                    >
                      <Download className="w-4 h-4 text-cyan-400" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()
    },
    contact: {
      title: t.contactTitle,
      component: (
        <div className="space-y-3 sm:space-y-4">
          <form className="space-y-2.5 sm:space-y-3" onSubmit={handleContactSubmit}>
            <input
              type="text"
              placeholder={t.formPlaceholders.name}
              className="w-full px-3.5 py-2 sm:px-4 sm:py-2.5 bg-black/50 border border-cyan-500/30 rounded text-cyan-400 placeholder-cyan-700 font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
              disabled={mailStatus === 'sending'}
            />
            <input
              type="email"
              placeholder={t.formPlaceholders.email}
              className="w-full px-3.5 py-2 sm:px-4 sm:py-2.5 bg-black/50 border border-cyan-500/30 rounded text-cyan-400 placeholder-cyan-700 font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
              value={formData.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
              disabled={mailStatus === 'sending'}
            />
            <textarea
              placeholder={t.formPlaceholders.message}
              rows={3}
              className="w-full px-3.5 py-2 sm:px-4 sm:py-2.5 bg-black/50 border border-cyan-500/30 rounded text-cyan-400 placeholder-cyan-700 font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-500 resize-none"
              value={formData.message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, message: e.target.value})}
              disabled={mailStatus === 'sending'}
            />
            <button
              type="submit"
              disabled={mailStatus === 'sending'}
              className={`w-full py-2.5 sm:py-2.5 rounded font-mono text-xs sm:text-sm transition-all font-semibold ${
                mailStatus === 'sending' 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer'
              }`}
            >
              {mailStatus === 'sending' ? `⏳ ${ui.sending}` : t.formLabels.submit}
            </button>
            
            {/* Feedback visual */}
            {mailStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 sm:p-3 bg-green-500/20 border border-green-500/50 rounded text-green-400 text-xs sm:text-sm font-mono text-center"
              >
                ✅ {mailMessage}
              </motion.div>
            )}
            {mailStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 sm:p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-xs sm:text-sm font-mono text-center"
              >
                ❌ {mailMessage}
              </motion.div>
            )}
          </form>
          <div className="pt-2.5 sm:pt-3 border-t border-violet-500/20">
            <p className="text-[11px] sm:text-xs text-gray-400 font-mono mb-2">{ui.contactDirect}</p>
            <div className="space-y-1 sm:space-y-1.5 text-xs font-mono">
              <p className="text-cyan-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span className="break-all">{t.contactInfo.email}</span>
              </p>
              <p className="text-cyan-400 flex items-center gap-2">
                <span className="text-violet-400 shrink-0">📞</span>
                <span>{t.contactInfo.phone}</span>
              </p>
              <p className="text-cyan-300 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-semibold">{t.contactInfo.location}</span>
              </p>
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
                className="p-2.5 sm:p-3 bg-violet-950/30 border border-violet-500/30 rounded-lg hover:bg-violet-950/50 transition-all group text-center flex items-center justify-center cursor-pointer"
              >
                <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 group-hover:text-cyan-400 transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      )
    },
    secret: {
      title: t.nodes.secret.title,
      component: (
        <div className="space-y-3 sm:space-y-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <div className="inline-block p-4 sm:p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full mb-3 sm:mb-4 border-2 border-yellow-400/50">
              <Terminal className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl mb-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-bold">
              ¡HACK EXITOSO!
            </h3>
            <p className="text-yellow-400 font-mono text-xs sm:text-sm mb-2">{ui.unlockSystem}</p>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-orange-400 font-mono"
            >
              +100 XP {ui.bonusUnlocked}
            </motion.div>
          </motion.div>

          <div className="p-3 sm:p-4 bg-gradient-to-r from-yellow-950/30 to-orange-950/30 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-300 font-mono text-xs sm:text-sm text-center leading-relaxed">
              {language === "es"
                ? "¡Felicidades! Has descubierto el nodo secreto. Tu curiosidad y dedicación te han llevado a encontrar este mensaje oculto. Esto demuestra que prestas atención a los detalles."
                : language === "en"
                ? "Congratulations! You discovered the secret node. Your curiosity and dedication led you to find this hidden message. This shows you pay attention to details."
                : "Glückwunsch! Sie haben den geheimen Knoten entdeckt. Ihre Neugier und Ihr Engagement haben Sie zu dieser versteckten Nachricht geführt. Dies zeigt, dass Sie auf Details achten."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 sm:p-4 bg-yellow-950/20 border border-yellow-500/30 rounded-xl text-center"
            >
              <div className="text-xl sm:text-2xl mb-1">🏆</div>
              <div className="text-[10px] sm:text-xs text-yellow-300 font-mono">{ui.achievement}</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 sm:p-4 bg-orange-950/20 border border-orange-500/30 rounded-xl text-center"
            >
              <div className="text-xl sm:text-2xl mb-1">🎁</div>
              <div className="text-[10px] sm:text-xs text-orange-300 font-mono">{ui.bonusUnlocked}</div>
            </motion.div>
          </div>

          <div className="p-2.5 sm:p-3 bg-slate-900/50 border border-yellow-500/20 rounded text-center">
            <p className="text-[10px] sm:text-xs text-gray-400 font-mono">
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
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full ${
            nodeId === 'cv' && selectedCvLang !== null ? 'max-w-4xl' : 'max-w-xl md:max-w-2xl lg:max-w-3xl'
          } max-h-[88dvh] sm:max-h-[85vh] flex flex-col bg-slate-900/98 backdrop-blur-xl border border-cyan-500/40 rounded-xl sm:rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden`}
        >
          {/* Header */}
          <div
            className="bg-slate-800/95 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between border-b border-cyan-500/30 shrink-0"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex gap-1.5 sm:gap-2">
                <button onClick={onClose} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity cursor-pointer" title="Cerrar ventana" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 opacity-60" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 opacity-60" />
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs sm:text-sm">
                <span className="text-gray-500 text-[10px] hidden sm:inline">ROOT://</span>
                <span className="font-bold tracking-wide truncate max-w-[170px] sm:max-w-none">{currentContent.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400/80 border border-cyan-500/30 font-mono hidden md:inline">0x{nodeId.length.toString(16).toUpperCase()}F</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 font-mono hidden sm:inline">[ESC]</span>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-1 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white cursor-pointer -mr-1"
                title="Cerrar ventana"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Content - Scrollable with custom cyber scrollbar */}
          <div
            className="p-3.5 sm:p-5 md:p-6 overflow-y-auto flex-1 min-h-0 cyber-scrollbar overscroll-contain"
          >
            {currentContent.component}
          </div>

          {/* Footer */}
          <div
            className="bg-slate-800/90 px-3 sm:px-4 py-1.5 sm:py-2 border-t border-cyan-500/30 shrink-0"
          >
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-cyan-400 font-mono">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{ui.systemActive}</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

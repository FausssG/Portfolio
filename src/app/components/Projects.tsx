import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { Language } from "../utils/translations";

export function Projects({ language = "es" as Language }: { language?: Language }) {
  const projects = [
    {
      id: 1,
      title: language === 'es' ? 'Plataforma E-Commerce' : language === 'en' ? 'E-Commerce Platform' : 'E-Commerce-Plattform',
      description: language === 'es' ? 'Plataforma completa de comercio electrónico con carrito, pagos y panel de administración' : language === 'en' ? 'Complete e-commerce platform with cart, payments and admin panel' : 'Vollständige E-Commerce-Plattform mit Warenkorb, Zahlungen und Admin-Panel',
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      gradient: "from-violet-600 to-purple-600"
    },
    {
      id: 2,
      title: language === 'es' ? 'Aplicación de Chat con IA' : language === 'en' ? 'AI Chat Application' : 'KI-Chat-Anwendung',
      description: language === 'es' ? 'Aplicación de chat en tiempo real con integración de IA para respuestas automáticas' : language === 'en' ? 'Real-time chat application with AI integration for automatic responses' : 'Echtzeit-Chat-Anwendung mit KI-Integration für automatische Antworten',
      tags: ["Next.js", "WebSocket", "OpenAI", "TailwindCSS"],
      gradient: "from-cyan-600 to-blue-600"
    },
    {
      id: 3,
      title: language === 'es' ? 'Dashboard de Analíticas' : language === 'en' ? 'Analytics Dashboard' : 'Analyse-Dashboard',
      description: language === 'es' ? 'Dashboard interactivo con visualizaciones de datos en tiempo real y reportes' : language === 'en' ? 'Interactive dashboard with real-time data visualizations and reports' : 'Interaktives Dashboard mit Echtzeit-Datenvisualisierungen und Berichten',
      tags: ["React", "D3.js", "Firebase", "Material-UI"],
      gradient: "from-pink-600 to-rose-600"
    },
    {
      id: 4,
      title: language === 'es' ? 'App Fitness Móvil' : language === 'en' ? 'Mobile Fitness App' : 'Mobile Fitness-App',
      description: language === 'es' ? 'App móvil para seguimiento de ejercicios, nutrición y objetivos fitness' : language === 'en' ? 'Mobile app for tracking workouts, nutrition and fitness goals' : 'Mobile App zur Verfolgung von Workouts, Ernährung und Fitnesszielen',
      tags: ["React Native", "Express", "PostgreSQL", "AWS"],
      gradient: "from-emerald-600 to-green-600"
    }
  ];

  return (
    <section id="projects" className="relative min-h-screen py-20 px-6 bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-4" style={{ fontWeight: 700 }}>
            {language === 'es' ? 'Mis Proyectos' : language === 'en' ? 'My Projects' : 'Meine Projekte'}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === 'es' ? 'Explora algunos de los proyectos en los que he trabajado' : language === 'en' ? 'Explore some of the projects I have worked on' : 'Entdecken Sie einige der Projekte, an denen ich gearbeitet habe'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              <div className="relative p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl text-white" style={{ fontWeight: 600 }}>
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Github className="w-5 h-5 text-gray-300" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-300" />
                    </motion.button>
                  </div>
                </div>

                <p className="text-gray-400 mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm border border-violet-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

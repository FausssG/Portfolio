import { motion } from "motion/react";
import { Code2, Rocket, Zap, Brain } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Desarrollo Web",
    description: "Experiencia en React, Next.js, Node.js y tecnologías modernas"
  },
  {
    icon: Rocket,
    title: "Innovación",
    description: "Siempre buscando las últimas tecnologías y mejores prácticas"
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimización y velocidad en cada línea de código"
  },
  {
    icon: Brain,
    title: "Problem Solving",
    description: "Soluciones creativas para desafíos complejos"
  }
];

export function About() {
  return (
    <section id="about" className="relative min-h-screen py-20 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-4" style={{ fontWeight: 700 }}>
            Sobre Mí
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Apasionado por la tecnología y el desarrollo de soluciones innovadoras
          </p>
        </motion.div>

        {/* Bio Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl"
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            Soy un desarrollador full stack con más de X años de experiencia creando aplicaciones web modernas y escalables.
            Mi pasión es transformar ideas en productos digitales que generen impacto real. Siempre estoy explorando nuevas
            tecnologías y metodologías para mejorar la experiencia del usuario y la eficiencia del desarrollo.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group p-6 bg-gradient-to-br from-violet-950/50 to-cyan-950/50 backdrop-blur-xl border border-violet-500/20 rounded-xl hover:border-violet-500/50 transition-all duration-300"
            >
              <div className="mb-4 p-3 bg-violet-500/20 rounded-lg w-fit group-hover:bg-violet-500/30 transition-colors">
                <skill.icon className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-xl text-white mb-2" style={{ fontWeight: 600 }}>
                {skill.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

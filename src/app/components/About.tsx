import { motion } from "motion/react";
import { Code2, Rocket, Zap, Brain } from "lucide-react";
import { Language } from "../utils/translations";

export function About({ language = "es" as Language }: { language?: Language }) {
  const skills = [
    {
      icon: Code2,
      title: language === 'es' ? 'Desarrollo Web' : language === 'en' ? 'Web Development' : 'Webentwicklung',
      description: language === 'es' ? 'Experiencia en React, Next.js, Node.js y tecnologías modernas' : language === 'en' ? 'Experience with React, Next.js, Node.js and modern technologies' : 'Erfahrung mit React, Next.js, Node.js und modernen Technologien'
    },
    {
      icon: Rocket,
      title: language === 'es' ? 'Innovación' : language === 'en' ? 'Innovation' : 'Innovation',
      description: language === 'es' ? 'Siempre buscando las últimas tecnologías y mejores prácticas' : language === 'en' ? 'Always looking for the latest technologies and best practices' : 'Immer auf der Suche nach den neuesten Technologien und Best Practices'
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Performance' : language === 'en' ? 'Performance' : 'Performance',
      description: language === 'es' ? 'Optimización y velocidad en cada línea de código' : language === 'en' ? 'Optimization and speed in every line of code' : 'Optimierung und Geschwindigkeit in jeder Codezeile'
    },
    {
      icon: Brain,
      title: language === 'es' ? 'Problem Solving' : language === 'en' ? 'Problem Solving' : 'Problemlösung',
      description: language === 'es' ? 'Soluciones creativas para desafíos complejos' : language === 'en' ? 'Creative solutions for complex challenges' : 'Kreative Lösungen für komplexe Herausforderungen'
    }
  ];

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
            {language === 'es' ? 'Sobre Mí' : language === 'en' ? 'About Me' : 'Über mich'}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === 'es' ? 'Apasionado por la tecnología y el desarrollo de soluciones innovadoras' : language === 'en' ? 'Passionate about technology and building innovative solutions' : 'Leidenschaftlich für Technologie und innovative Lösungen'}
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
            {language === 'es'
              ? 'Soy un desarrollador full stack con más de X años de experiencia creando aplicaciones web modernas y escalables. Mi pasión es transformar ideas en productos digitales que generen impacto real. Siempre estoy explorando nuevas tecnologías y metodologías para mejorar la experiencia del usuario y la eficiencia del desarrollo.'
              : language === 'en'
              ? 'I am a full stack developer with more than X years of experience building modern and scalable web applications. My passion is turning ideas into digital products that create real impact. I am always exploring new technologies and methodologies to improve the user experience and development efficiency.'
              : 'Ich bin ein Full-Stack-Entwickler mit mehr als X Jahren Erfahrung in der Entwicklung moderner und skalierbarer Webanwendungen. Meine Leidenschaft ist es, Ideen in digitale Produkte zu verwandeln, die echten Mehrwert schaffen. Ich erkunde ständig neue Technologien und Methoden, um die Benutzererfahrung und die Entwicklungseffizienz zu verbessern.'}
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

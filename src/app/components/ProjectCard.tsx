import { motion } from "motion/react";
import { ExternalLink, Github, Calendar, Cpu } from "lucide-react";
import { memo, FC } from "react";

interface Project {
  name: string;
  tech: string;
  status: string;
  description: string;
  fullDescription?: string;
  image?: string;
  technologies?: string[];
  github?: string;
  demo?: string;
  date?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCardComponent: FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-violet-950/30 to-cyan-950/30 border border-violet-500/30 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
    >
      {/* Project Image */}
      {project.image && (
        <div className="relative h-40 overflow-hidden bg-slate-900/50">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h4 className="text-lg text-white font-mono mb-1 group-hover:text-cyan-400 transition-colors">
              {project.name}
            </h4>
            {project.date && (
              <div className="flex items-center gap-1 text-xs text-gray-500 font-mono mb-2">
                <Calendar className="w-3 h-3" />
                <span>{project.date}</span>
              </div>
            )}
          </div>
          <span className={`px-2 py-1 rounded text-xs font-mono whitespace-nowrap ml-2 ${
            project.status.includes("DESARROLLO") || project.status.includes("DEVELOPMENT") || project.status.includes("ENTWICKLUNG")
              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              : "bg-green-500/20 text-green-400 border border-green-500/30"
          }`}>
            {project.status}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {project.fullDescription || project.description}
        </p>

        {/* Technologies */}
        {project.technologies && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-violet-500/10 text-violet-300 rounded text-xs font-mono border border-violet-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Tech line if no technologies array */}
        {!project.technologies && (
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500 text-xs font-mono">{project.tech}</span>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-2">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 px-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm font-mono text-gray-300"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 px-3 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-cyan-500/30 rounded-lg hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2 text-sm font-mono text-cyan-400"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-cyan-600/5 to-violet-600/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ backgroundSize: "200% 200%" }}
      />
    </motion.div>
  );
};

export const ProjectCard = memo(ProjectCardComponent);

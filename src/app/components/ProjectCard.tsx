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

const ProjectCardComponent: FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-violet-950/30 to-cyan-950/30 border border-violet-500/30 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
    >
      {/* Sci-fi HUD corner accents */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/40 pointer-events-none group-hover:border-cyan-400 transition-colors z-10" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-violet-400/40 pointer-events-none group-hover:border-violet-400 transition-colors z-10" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/40 pointer-events-none group-hover:border-cyan-400 transition-colors z-10" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-violet-400/40 pointer-events-none group-hover:border-violet-400 transition-colors z-10" />

      {/* Project Image */}
      {project.image && (
        <div className="relative h-32 sm:h-40 md:h-44 overflow-hidden bg-slate-900/50">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-3.5 sm:p-5">
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="text-base sm:text-lg text-white font-mono mb-0.5 sm:mb-1 group-hover:text-cyan-400 transition-colors truncate">
              {project.name}
            </h4>
            {project.date && (
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-500 font-mono mb-1.5 sm:mb-2">
                <Calendar className="w-3 h-3 shrink-0" />
                <span>{project.date}</span>
              </div>
            )}
          </div>
          <span className={`px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-mono whitespace-nowrap shrink-0 ${
            project.status.includes("DESARROLLO") || project.status.includes("DEVELOPMENT") || project.status.includes("ENTWICKLUNG")
              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              : "bg-green-500/20 text-green-400 border border-green-500/30"
          }`}>
            {project.status}
          </span>
        </div>

        <p className="text-gray-400 text-xs sm:text-sm mb-2.5 sm:mb-3 line-clamp-2">
          {project.fullDescription || project.description}
        </p>

        {/* Technologies */}
        {project.technologies && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-violet-500/10 text-violet-300 rounded text-[11px] sm:text-xs font-mono border border-violet-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Tech line if no technologies array */}
        {!project.technologies && (
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 shrink-0" />
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
              className="flex-1 py-1.5 sm:py-2 px-2.5 sm:px-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-mono text-gray-300 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
              className="flex-1 py-1.5 sm:py-2 px-2.5 sm:px-3 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-cyan-500/30 rounded-lg hover:border-cyan-500/50 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-mono text-cyan-400 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
    </div>
  );
};

export const ProjectCard = memo(ProjectCardComponent);

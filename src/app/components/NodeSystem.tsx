import { motion } from "motion/react";
import { User, Code, Mail, Briefcase, Terminal, Cpu, Database, Globe } from "lucide-react";
import { useState } from "react";

interface NodeData {
  id: string;
  title: string;
  icon: any;
  position: { x: number; y: number };
  color: string;
  description: string;
}

const nodes: NodeData[] = [
  {
    id: "main",
    title: "SISTEMA CENTRAL",
    icon: Cpu,
    position: { x: 50, y: 50 },
    color: "from-violet-500 to-purple-600",
    description: "Núcleo del sistema"
  },
  {
    id: "about",
    title: "PERFIL",
    icon: User,
    position: { x: 50, y: 15 },
    color: "from-cyan-500 to-blue-600",
    description: "Información personal"
  },
  {
    id: "skills",
    title: "HABILIDADES",
    icon: Code,
    position: { x: 80, y: 30 },
    color: "from-emerald-500 to-green-600",
    description: "Stack tecnológico"
  },
  {
    id: "projects",
    title: "PROYECTOS",
    icon: Briefcase,
    position: { x: 85, y: 65 },
    color: "from-pink-500 to-rose-600",
    description: "Portfolio de trabajos"
  },
  {
    id: "contact",
    title: "CONTACTO",
    icon: Mail,
    position: { x: 50, y: 85 },
    color: "from-orange-500 to-amber-600",
    description: "Red de comunicación"
  },
  {
    id: "cv",
    title: "CURRICULUM",
    icon: Database,
    position: { x: 15, y: 65 },
    color: "from-teal-500 to-cyan-600",
    description: "Descargar CV"
  },
  {
    id: "languages",
    title: "IDIOMAS",
    icon: Globe,
    position: { x: 20, y: 30 },
    color: "from-indigo-500 to-violet-600",
    description: "Certificaciones"
  }
];

export function NodeSystem({ onNodeSelect }: { onNodeSelect: (nodeId: string) => void }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>("main");
  const [dataFlowActive, setDataFlowActive] = useState(false);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
    setDataFlowActive(true);
    onNodeSelect(nodeId);
    setTimeout(() => setDataFlowActive(false), 2000);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Hexagonal grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />

      {/* Nodes */}
      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
          style={{
            position: "absolute",
            left: `${node.position.x}%`,
            top: `${node.position.y}%`,
            transform: "translate(-50%, -50%)"
          }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <motion.button
            onClick={() => handleNodeClick(node.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="relative group cursor-pointer"
          >
            {/* Orbital rings */}
            <motion.div
              className="absolute inset-0 -m-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className={`absolute inset-0 rounded-full border border-${node.color.split(' ')[0].replace('from-', '')} opacity-20`}
                  style={{
                    margin: `${ring * 10}px`,
                    borderWidth: '1px'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: hoveredNode === node.id ? 1 : 0,
                    opacity: hoveredNode === node.id ? 0.3 : 0
                  }}
                  transition={{ delay: ring * 0.1 }}
                />
              ))}
            </motion.div>

            {/* Outer glow ring */}
            <motion.div
              animate={{
                scale: selectedNode === node.id ? [1, 1.3, 1] : 1,
                opacity: selectedNode === node.id ? [0.5, 0.8, 0.5] : 0
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${node.color} blur-xl -z-10`}
            />

            {/* Node circle */}
            <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${node.color} p-[2px] shadow-lg`}>
              <div className="w-full h-full rounded-full bg-slate-900/90 backdrop-blur-xl flex items-center justify-center">
                <node.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>

            {/* Pulse effect when selected */}
            {selectedNode === node.id && (
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${node.color}`}
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: hoveredNode === node.id ? 1 : 0, y: hoveredNode === node.id ? 0 : 10 }}
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <div className="px-3 py-1 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-lg">
                <p className="text-xs text-white font-mono">{node.title}</p>
                <p className="text-xs text-gray-400 font-mono">{node.description}</p>
              </div>
            </motion.div>

            {/* Data stream effect */}
            {selectedNode === node.id && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ overflow: "visible" }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1.5 h-1.5 bg-gradient-to-r ${node.color} rounded-full`}
                    style={{
                      left: '50%',
                      top: '50%',
                      filter: 'blur(1px)'
                    }}
                    animate={{
                      x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                      y: [0, Math.sin(i * 60 * Math.PI / 180) * 40],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            )}

          </motion.button>
        </motion.div>
      ))}

      {/* Center pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-violet-500/10 pointer-events-none"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}

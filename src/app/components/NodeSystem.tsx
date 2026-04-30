import { motion } from "motion/react";
import { User, Code, Mail, Briefcase, Terminal, Cpu, Database, Globe } from "lucide-react";
import { useState } from "react";
import { translations, Language } from "../utils/translations";

interface NodeData {
  id: string;
  title: string;
  icon: any;
  position: { x: number; y: number };
  color: string;
  description: string;
}

export function NodeSystem({ onNodeSelect, language = "es" as Language }: { onNodeSelect: (nodeId: string) => void; language?: Language }) {
  const t = translations[language];
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>("main");
  const [dataFlowActive, setDataFlowActive] = useState(false);

  const nodes: NodeData[] = [
    {
      id: "main",
      title: t.nodes.main.title,
      icon: Cpu,
      position: { x: 50, y: 50 },
      color: "from-violet-500 to-purple-600",
      description: t.nodes.main.description
    },
    {
      id: "about",
      title: t.nodes.about.title,
      icon: User,
      position: { x: 50, y: 15 },
      color: "from-cyan-500 to-blue-600",
      description: t.nodes.about.description
    },
    {
      id: "skills",
      title: t.nodes.skills.title,
      icon: Code,
      position: { x: 80, y: 30 },
      color: "from-emerald-500 to-green-600",
      description: t.nodes.skills.description
    },
    {
      id: "projects",
      title: t.nodes.projects.title,
      icon: Briefcase,
      position: { x: 85, y: 65 },
      color: "from-pink-500 to-rose-600",
      description: t.nodes.projects.description
    },
    {
      id: "contact",
      title: t.nodes.contact.title,
      icon: Mail,
      position: { x: 50, y: 85 },
      color: "from-orange-500 to-amber-600",
      description: t.nodes.contact.description
    },
    {
      id: "cv",
      title: t.nodes.cv.title,
      icon: Database,
      position: { x: 15, y: 65 },
      color: "from-teal-500 to-cyan-600",
      description: t.nodes.cv.description
    },
    {
      id: "languages",
      title: t.nodes.languages.title,
      icon: Globe,
      position: { x: 20, y: 30 },
      color: "from-indigo-500 to-violet-600",
      description: t.nodes.languages.description
    }
  ];

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

    </div>
  );
}

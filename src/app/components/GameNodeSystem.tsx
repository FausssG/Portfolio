import { motion, AnimatePresence } from "motion/react";
import { User, Code, Mail, Briefcase, Terminal, Cpu, Database, Globe, Lock, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { translations, Language } from "../utils/translations";

interface NodeData {
  id: string;
  title: string;
  icon: any;
  position: { x: number; y: number };
  color: string;
  description: string;
  requiredNodes?: string[];
  xpReward?: number;
}

const nodes: NodeData[] = [
  {
    id: "main",
    title: "SISTEMA CENTRAL",
    icon: Cpu,
    position: { x: 50, y: 50 },
    color: "from-violet-500 to-purple-600",
    description: "Núcleo del sistema",
    xpReward: 0,
  },
  {
    id: "about",
    title: "PERFIL",
    icon: User,
    position: { x: 50, y: 20 },
    color: "from-cyan-500 to-blue-600",
    description: "Información personal",
    requiredNodes: ["main"],
    xpReward: 15,
  },
  {
    id: "skills",
    title: "HABILIDADES",
    icon: Code,
    position: { x: 75, y: 32 },
    color: "from-emerald-500 to-green-600",
    description: "Stack tecnológico",
    requiredNodes: ["about"],
    xpReward: 25,
  },
  {
    id: "projects",
    title: "PROYECTOS",
    icon: Briefcase,
    position: { x: 75, y: 68 },
    color: "from-pink-500 to-rose-600",
    description: "Portfolio de trabajos",
    requiredNodes: ["skills"],
    xpReward: 35,
  },
  {
    id: "contact",
    title: "CONTACTO",
    icon: Mail,
    position: { x: 50, y: 80 },
    color: "from-orange-500 to-amber-600",
    description: "Red de comunicación",
    requiredNodes: ["projects", "cv"],
    xpReward: 20,
  },
  {
    id: "cv",
    title: "CURRICULUM",
    icon: Database,
    position: { x: 25, y: 68 },
    color: "from-teal-500 to-cyan-600",
    description: "Descargar CV",
    requiredNodes: ["languages"],
    xpReward: 15,
  },
  {
    id: "languages",
    title: "IDIOMAS",
    icon: Globe,
    position: { x: 25, y: 32 },
    color: "from-indigo-500 to-violet-600",
    description: "Certificaciones",
    requiredNodes: ["about"],
    xpReward: 15,
  },
  // 🎮 EASTER EGG - Nodo Secreto
  {
    id: "secret",
    title: "???",
    icon: Terminal,
    position: { x: 50, y: 50 }, // Base position, offset applied in render
    color: "from-yellow-500 to-orange-600",
    description: "Nodo secreto descubierto!",
    requiredNodes: [],
    xpReward: 100,
  }
];

export function GameNodeSystem({
  onNodeSelect,
  completedNodeId,
  unlockSequence,
  language,
}: {
  onNodeSelect: (nodeId: string) => void;
  completedNodeId: string | null;
  unlockSequence: number;
  language: Language;
}) {
  const t = translations[language];
  const ui = t.nodeSystem;
  const localizedNodes = nodes.map(node => ({
    ...node,
    title: t.nodes[node.id as keyof typeof t.nodes]?.title ?? node.title,
    description: t.nodes[node.id as keyof typeof t.nodes]?.description ?? node.description,
  }));
  const showConnectionLines = false;
  const NODE_SHIFT_X_PERCENT = 0;
  const NODE_SHIFT_Y_PERCENT = 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [unlockedNodes, setUnlockedNodes] = useState<string[]>(["main"]);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<string>("main");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [travelingTo, setTravelingTo] = useState<string | null>(null);
  const [totalXP, setTotalXP] = useState<number>(0);
  const [showUnlockEffect, setShowUnlockEffect] = useState<string | null>(null);
  const [unlockToast, setUnlockToast] = useState<{ title: string; xp: number } | null>(null);
  const [xpParticles, setXpParticles] = useState<Array<{ id: number; amount: number; x: number; y: number }>>([]);
  const [secretNodeVisible, setSecretNodeVisible] = useState(false);
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  // Pan/Drag functionality
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Pan limits (prevent going too far)
  const PAN_LIMIT = 300;
  const clampPan = (value: number) => Math.max(-PAN_LIMIT, Math.min(PAN_LIMIT, value));

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateSize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const toPixelPoint = (position: { x: number; y: number }) => ({
    x: ((position.x + NODE_SHIFT_X_PERCENT) / 100) * containerSize.width,
    y: ((position.y + NODE_SHIFT_Y_PERCENT) / 100) * containerSize.height,
  });

  // Pan handlers for desktop (mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start drag if clicking on a node button
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = clampPan(e.clientX - dragStart.x);
    const newY = clampPan(e.clientY - dragStart.y);
    setPanOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Pan handlers for mobile (touch)
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const newX = clampPan(touch.clientX - dragStart.x);
    const newY = clampPan(touch.clientY - dragStart.y);
    setPanOffset({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Easter Egg: Secret binary code detector (7 clicks required)
  const handleEasterEggClick = () => {
    if (easterEggFound) return;

    const newClicks = easterEggClicks + 1;
    setEasterEggClicks(newClicks);

    // Glitch effect on each click
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 200);

    if (newClicks === 7) {
      // Activate Easter Egg
      setSecretNodeVisible(true);
      setUnlockedNodes([...unlockedNodes, "secret"]);
      setEasterEggFound(true);
      setShowUnlockEffect("secret");
      setTimeout(() => setShowUnlockEffect(null), 3000);
    }
  };

  useEffect(() => {
    if (!completedNodeId) return;

    const node = nodes.find(n => n.id === completedNodeId);
    if (!node) return;
    const localizedNode = localizedNodes.find(n => n.id === completedNodeId) ?? node;

    let isNewVisit = false;
    setVisitedNodes(prev => {
      if (prev.includes(completedNodeId)) return prev;
      isNewVisit = true;
      return [...prev, completedNodeId];
    });

    if (!isNewVisit) return;

    const xpReward = node.xpReward ?? 0;

    setCurrentNode(completedNodeId);

    if (xpReward > 0) {
      setTotalXP(prev => prev + xpReward);

      const particleId = Date.now();
      setXpParticles(prev => [...prev, {
        id: particleId,
        amount: xpReward,
        x: node.position.x,
        y: node.position.y,
      }]);

      setTimeout(() => {
        setXpParticles(prev => prev.filter(p => p.id !== particleId));
      }, 2000);
    }

    const connectedNodes = nodes
      .filter(n => n.requiredNodes?.includes(completedNodeId))
      .map(n => n.id);

    const newUnlocks = connectedNodes.filter(id => !unlockedNodes.includes(id));

    if (newUnlocks.length > 0) {
      setUnlockedNodes(prev => Array.from(new Set([...prev, ...newUnlocks])));
      newUnlocks.forEach(id => {
        setShowUnlockEffect(id);
        setTimeout(() => setShowUnlockEffect(null), 2000);
      });
    }

    setUnlockToast({ title: localizedNode.title, xp: xpReward });
    setTimeout(() => setUnlockToast(null), 2200);
  }, [completedNodeId, unlockSequence, language]);

  const isNodeUnlocked = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node || !node.requiredNodes) return unlockedNodes.includes(nodeId);
    return node.requiredNodes.some(req => visitedNodes.includes(req)) || unlockedNodes.includes(nodeId);
  };

  const handleNodeClick = (nodeId: string) => {
    if (!isNodeUnlocked(nodeId)) return;

    // Travel animation
    setTravelingTo(nodeId);

    setTimeout(() => {
      setCurrentNode(nodeId);
      setTravelingTo(null);
      onNodeSelect(nodeId);
    }, 400);
  };

  const getPathToNode = (targetId: string) => {
    const target = nodes.find(n => n.id === targetId);
    const current = nodes.find(n => n.id === currentNode);
    if (!target || !current) return null;

    return {
      x1: current.position.x,
      y1: current.position.y,
      x2: target.position.x,
      y2: target.position.y,
    };
  };

  const regularNodes = nodes.filter(n => n.id !== "secret");
  const regularVisited = visitedNodes.filter(n => n !== "secret");
  const completionPercentage = Math.round((regularVisited.length / regularNodes.length) * 100);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Central radial gradient overlay for focus */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(2, 6, 23, 0.4) 40%, rgba(2, 6, 23, 0.8) 100%)'
      }} />

      {/* Progress HUD - Responsive */}
      {/* Progress HUD - Desktop */}
      <div className="hidden sm:block fixed top-4 right-4 z-20 p-3 sm:p-4 bg-black/80 backdrop-blur-xl border border-violet-500/30 rounded-xl w-[180px] sm:min-w-[200px]">
        <div className="space-y-2 sm:space-y-3">
          <div>
            <div className="flex justify-between text-[10px] sm:text-xs text-violet-400 font-mono mb-1">
              <span>{ui.progress}</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[10px] sm:text-xs text-cyan-400 font-mono">XP</span>
            <motion.span
              className="text-base sm:text-lg font-mono bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
              key={totalXP}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
            >
              {totalXP}
            </motion.span>
          </div>

          <div className="text-[10px] sm:text-xs text-gray-400 font-mono">
            <div className="flex justify-between">
              <span>{ui.nodes}:</span>
              <span className="text-cyan-400">{regularVisited.length}/{regularNodes.length}</span>
            </div>
          </div>

          {/* Easter Egg Hidden Trigger - Binary code icon */}
          {!easterEggFound && (
            <motion.button
              onClick={handleEasterEggClick}
              className="w-full mt-2 p-2 bg-slate-900/50 border border-slate-700/30 rounded relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{
                  opacity: glitchEffect ? [1, 0.2, 1, 0.5, 1] : 1,
                  x: glitchEffect ? [0, -2, 2, -1, 0] : 0,
                }}
                transition={{ duration: 0.2 }}
                className="text-[8px] sm:text-[9px] font-mono text-gray-600 group-hover:text-cyan-500/50 transition-colors leading-tight"
              >
                <div>01001000 01000001</div>
                <div>01000011 01001011</div>
              </motion.div>

              {/* Progress indicator */}
              {easterEggClicks > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(easterEggClicks / 7) * 100}%` }}
                  />
                </div>
              )}
            </motion.button>
          )}

          {/* Secret achievement indicator */}
          {easterEggFound && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-2 p-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded"
            >
              <div className="text-[10px] sm:text-xs text-yellow-300 font-mono text-center">
                {ui.secretUnlocked}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Compact mobile progress button */}
      <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => setShowMobilePanel(true)}
          className="w-14 h-14 rounded-full bg-black/70 border border-violet-500/30 flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Open progress details"
        >
          <div className="text-xs font-mono text-cyan-300 font-bold">{completionPercentage}%</div>
        </button>
      </div>

      {/* Mobile Progress Bubble Pop-up */}
      <AnimatePresence>
        {showMobilePanel && (
          <motion.div
            key="mobile-panel-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sm:hidden fixed inset-0 z-40 flex items-center justify-center p-4"
            onClick={() => setShowMobilePanel(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            <motion.div
              initial={{ scale: 0, opacity: 0, y: "calc(100vh - 80px)" }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: "calc(100vh - 80px)" }}
              transition={{ duration: 0.35, type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-900/98 backdrop-blur-xl border border-violet-500/40 rounded-3xl p-5 max-w-[85vw] shadow-2xl shadow-violet-500/20"
              style={{ originY: 1 }}
            >
              <button
                onClick={() => setShowMobilePanel(false)}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600/80 hover:bg-red-600 text-white text-xs flex items-center justify-center transition-colors"
              >
                ✕
              </button>

              <div className="space-y-3">
                <div className="text-center">
                  <h2 className="text-lg font-mono text-white mb-3 font-bold">{ui.progress}</h2>

                  <div className="flex items-center justify-around mb-3">
                    <div className="text-center">
                      <div className="text-3xl font-mono text-cyan-400 font-bold">{completionPercentage}%</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">complete</div>
                    </div>
                    <div className="border-l border-white/10 h-12 mx-2" />
                    <div className="text-center">
                      <div className="text-2xl font-mono text-yellow-300 font-bold">{totalXP}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">XP</div>
                    </div>
                  </div>

                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 via-cyan-500 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-gray-300 font-mono text-xs">
                    <span>{ui.nodes} visited:</span>
                    <span className="text-cyan-300 font-bold">{regularVisited.length} / {regularNodes.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300 font-mono text-xs">
                    <span>Nodes unlocked:</span>
                    <span className="text-violet-300 font-bold">{unlockedNodes.length}</span>
                  </div>
                </div>

                {/* Hidden Easter Egg - small and subtle */}
                {!easterEggFound && (
                  <motion.button
                    onClick={() => { handleEasterEggClick(); }}
                    className="mt-2 w-full p-1.5 bg-slate-800/40 border border-slate-700/20 rounded-lg hover:bg-slate-800/60 transition-colors group opacity-60 hover:opacity-100"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <motion.div
                      animate={{
                        opacity: glitchEffect ? [0.5, 0.1, 0.5, 0.3, 0.5] : 0.5,
                        x: glitchEffect ? [0, -1, 1, 0] : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-[7px] font-mono text-gray-600 group-hover:text-gray-500 transition-colors leading-tight"
                    >
                      <div>01001000</div>
                    </motion.div>
                  </motion.button>
                )}

                {easterEggClicks > 0 && !easterEggFound && (
                  <div className="mt-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(easterEggClicks / 7) * 100}%` }}
                    />
                  </div>
                )}

                {easterEggFound && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-2 p-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg text-center"
                  >
                    <div className="text-[11px] text-yellow-300 font-mono">
                      ✨ {ui.secretUnlocked}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unlock toast - top center */}
      <AnimatePresence>
        {unlockToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-violet-600 to-cyan-600 border border-white/20 rounded-full shadow-2xl shadow-cyan-500/20 text-center"
          >
            <div className="text-[10px] sm:text-xs font-mono text-white uppercase tracking-[0.2em]">
              {ui.unlockToastTitle}
            </div>
            <div className="text-sm sm:text-base font-mono text-cyan-100">
              {unlockToast.title} +{unlockToast.xp} XP
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* XP Particles - Responsive */}
      <AnimatePresence>
        {xpParticles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 1,
              scale: 1
            }}
            animate={{
              y: '10%',
              opacity: 0,
              scale: 1.5
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="fixed pointer-events-none z-50"
            style={{
              left: 0,
              top: 0,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="text-lg sm:text-2xl font-mono bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
              +{particle.amount} XP
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Pannable container for nodes and connections */}
      <div
        ref={containerRef}
        className="absolute inset-0 transition-transform duration-100"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
          pointerEvents: 'none'
        }}
      >
        {showConnectionLines && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" width={containerSize.width} height={containerSize.height}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0.4)" />
              </linearGradient>
              <linearGradient id="activePathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.8)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0.8)" />
              </linearGradient>
            </defs>

            {nodes.map((node) =>
              node.requiredNodes?.map((reqId) => {
                const reqNode = nodes.find(n => n.id === reqId);
                if (!reqNode) return null;

                const start = toPixelPoint(reqNode.position);
                const end = toPixelPoint(node.position);

                const isUnlocked = unlockedNodes.includes(node.id);
                const isActive = visitedNodes.includes(node.id) && visitedNodes.includes(reqId);

                // Subdivide into segments
                const SEGMENT_COUNT = 8;
                const segments: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
                for (let i = 0; i < SEGMENT_COUNT; i++) {
                  const t1 = i / SEGMENT_COUNT;
                  const t2 = (i + 1) / SEGMENT_COUNT;
                  segments.push({
                    x1: start.x + (end.x - start.x) * t1,
                    y1: start.y + (end.y - start.y) * t1,
                    x2: start.x + (end.x - start.x) * t2,
                    y2: start.y + (end.y - start.y) * t2,
                  });
                }

                return (
                  <g key={`${reqId}-${node.id}`}>
                    {segments.map((seg, i) => {
                      const segmentKey = `${reqId}-${node.id}-seg-${i}`;
                      // If connection is unlocked, animate segments sequentially when showUnlockEffect equals node id
                      const shouldAnimateNow = showUnlockEffect === node.id;

                      const stroke = isUnlocked ? "url(#activePathGradient)" : "url(#pathGradient)";
                      const baseOpacity = isUnlocked ? 1 : 0.22;
                      const strokeW = isActive ? 1.6 : 1;

                      return (
                        <motion.line
                          key={segmentKey}
                          x1={seg.x1}
                          y1={seg.y1}
                          x2={seg.x2}
                          y2={seg.y2}
                          stroke={stroke}
                          strokeWidth={strokeW}
                          strokeLinecap="round"
                          initial={{ opacity: shouldAnimateNow ? 0 : baseOpacity }}
                          animate={{ opacity: isUnlocked ? 1 : baseOpacity }}
                          transition={{ duration: 0.35, delay: shouldAnimateNow ? i * 0.06 : 0 }}
                        />
                      );
                    })}

                    {/* Traveling particle still follows whole path */}
                    {travelingTo === node.id && currentNode === reqId && (
                      <motion.circle
                        r="1"
                        fill="rgba(34, 211, 238, 1)"
                        initial={{ cx: start.x, cy: start.y }}
                        animate={{ cx: end.x, cy: end.y }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <animate attributeName="r" values="0.8;1.3;0.8" dur="0.5s" repeatCount="indefinite" />
                      </motion.circle>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        )}

        {/* Nodes */}
          {localizedNodes.map((node, index) => {
          // Hide secret node until unlocked
          if (node.id === "secret" && !secretNodeVisible) return null;

          const unlocked = isNodeUnlocked(node.id);
          const visited = visitedNodes.includes(node.id);
          const isCurrent = currentNode === node.id;
          const isSecret = node.id === "secret";

          // Compute pixel positions so SVG lines and nodes share coordinates
          const pixel = toPixelPoint(node.position);
          // Apply secret offset in pixels (10vw/10vh equivalent)
          const secretOffsetX = isSecret ? (containerSize.width * 0.10) : 0;
          const secretOffsetY = isSecret ? (containerSize.height * 0.10) : 0;
          const leftPosition = `${pixel.x + secretOffsetX}px`;
          const topPosition = `${pixel.y + secretOffsetY}px`;

          return (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            style={{
              position: "absolute",
              left: leftPosition,
              top: topPosition,
              transform: "translate(-50%, -50%)",
              pointerEvents: 'auto'
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.button
              onClick={() => handleNodeClick(node.id)}
              whileHover={unlocked ? { scale: 1.1 } : {}}
              whileTap={unlocked ? { scale: 0.95 } : {}}
              className={`relative group ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              disabled={!unlocked}
            >
              {/* Unlock effect */}
              {showUnlockEffect === node.id && (
                <>
                  <motion.div
                    className="absolute inset-0 -m-16"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div className={`w-full h-full rounded-full border-4 ${isSecret ? 'border-yellow-400' : 'border-cyan-400'}`} />
                  </motion.div>
                  {/* Particles on unlock */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 rounded-full ${isSecret ? 'bg-yellow-400' : 'bg-cyan-400'}`}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 1
                      }}
                      animate={{
                        x: Math.cos(i * 30 * Math.PI / 180) * 100,
                        y: Math.sin(i * 30 * Math.PI / 180) * 100,
                        opacity: 0,
                        scale: 0
                      }}
                      transition={{ duration: 1 }}
                    />
                  ))}
                </>
              )}

              {/* Secret node special effect */}
              {isSecret && (
                <motion.div
                  className="absolute inset-0 -m-8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: Math.cos(i * 90 * Math.PI / 180) * 40,
                        y: Math.sin(i * 90 * Math.PI / 180) * 40,
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {/* Current node indicator */}
              {isCurrent && (
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${node.color}`}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Node circle - Responsive sizing */}
              <div
                className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full p-[2px] transition-all duration-300 ${
                  unlocked
                    ? `bg-gradient-to-br ${node.color} shadow-lg`
                    : 'bg-gray-700 opacity-50'
                }`}
              >
                <div className={`w-full h-full rounded-full flex items-center justify-center relative ${
                  unlocked ? 'bg-slate-900/90 backdrop-blur-xl' : 'bg-slate-800/90'
                }`}>
                  {unlocked ? (
                    <>
                      <node.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white relative z-10" />
                      {visited && (
                        <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-green-500 rounded-full p-0.5 sm:p-1">
                          <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                        </div>
                      )}
                    </>
                  ) : (
                    <Lock className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-500" />
                  )}
                </div>
              </div>

              {/* XP Badge - Responsive */}
              {node.xpReward && node.xpReward > 0 && !visited && unlocked && (
                <motion.div
                  animate={isSecret ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute -top-1 -right-1 sm:-top-2 sm:-right-2 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-mono text-white border ${
                    isSecret
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-400'
                      : 'bg-gradient-to-r from-violet-600 to-purple-600 border-violet-400'
                  }`}
                >
                  +{node.xpReward} {isSecret && '🎁'}
                </motion.div>
              )}

              {/* Label */}
              <AnimatePresence>
                {hoveredNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className={`px-3 py-2 backdrop-blur-xl border rounded-lg ${
                      isSecret
                        ? 'bg-yellow-900/90 border-yellow-400'
                        : 'bg-slate-900/90 border-white/10'
                    }`}>
                      <p className={`text-xs font-mono ${isSecret ? 'text-yellow-300' : 'text-white'}`}>
                        {(t.nodes as Record<string, { title: string; description: string }>)[node.id]?.title || node.title} {isSecret && '🎮'}
                      </p>
                      <p className={`text-xs font-mono ${isSecret ? 'text-yellow-200' : 'text-gray-400'}`}>
                        {(t.nodes as Record<string, { title: string; description: string }>)[node.id]?.description || node.description}
                      </p>
                      {!unlocked && (
                        <p className="text-xs text-red-400 font-mono mt-1">🔒 {ui.locked}</p>
                      )}
                      {isSecret && visited && (
                        <p className="text-xs text-yellow-300 font-mono mt-1">✨ {ui.secretHint}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        );
        })}
      </div>

      {/* Pan hint - Shows briefly at start */}
      {visitedNodes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl sm:text-8xl"
          >
            ✋
          </motion.div>
        </motion.div>
      )}

      {/* Tutorial hint - Responsive */}
      {visitedNodes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 px-4 sm:px-6 py-2 sm:py-3 bg-violet-600/90 backdrop-blur-xl border border-violet-400 rounded-full max-w-[90%] sm:max-w-none"
        >
          <p className="text-white font-mono text-xs sm:text-sm text-center">
            {ui.tutorial}
            <span className="block mt-1 text-[10px] sm:text-xs text-cyan-200">{ui.dragHint}</span>
          </p>
        </motion.div>
      )}
    </div>
  );
}

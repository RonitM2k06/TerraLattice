"use client";
import React, { useState, useEffect } from 'react';
import { Activity, Database, GitMerge, FileText, Settings, FlaskConical, LayoutDashboard, BrainCircuit } from 'lucide-react';
import KnowledgeGraphExplorer from '@/components/graph/KnowledgeGraphExplorer';
import GraphInspector from '@/components/graph/GraphInspector';
import SimulationStudio from '@/components/studio/SimulationStudio';
import HistoricalReplayLab from '@/components/replay/HistoricalReplayLab';
import CounterfactualLab from '@/components/counterfactual/CounterfactualLab';
import ResearchLibrary from '@/components/research/ResearchLibrary';
import CommandPalette from '@/components/CommandPalette';

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState('Knowledge Graph');
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  useEffect(() => {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
              e.preventDefault();
              setIsPaletteOpen(true);
          }
      };
      window.addEventListener('keydown', handleGlobalKeyDown);
      return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const addLog = (msg: string) => {
      setConsoleLogs(prev => [...prev.slice(-4), msg]);
  };

  const handleCrossNavigation = (tab: string, context?: any) => {
      setActiveTab(tab);
      addLog(`Navigated to ${tab} via Command Palette`);
      if (context?.node) {
          setHighlightedNode(context.node);
          addLog(`Focused graph on node: ${context.node}`);
      }
      if (context?.action === 'run') {
          addLog(`Triggering Monte Carlo Simulation automatically.`);
      }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-300 font-sans overflow-hidden relative">
      
      <CommandPalette 
          isOpen={isPaletteOpen} 
          onClose={() => setIsPaletteOpen(false)} 
          onNavigate={handleCrossNavigation}
      />

      {/* LEFT: Mission Explorer */}
      <aside className="w-64 flex flex-col border-r border-slate-800 bg-slate-900 z-10 shadow-xl">
        <div className="p-4 border-b border-slate-800">
          <h1 className="text-lg font-bold text-white tracking-widest uppercase flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-emerald-500" />
            TerraLattice
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Mission Control</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {[
              { name: 'Knowledge Graph', icon: GitMerge },
              { name: 'Simulation Studio', icon: FlaskConical },
              { name: 'Historical Replays', icon: Activity },
              { name: 'Counterfactual Lab', icon: BrainCircuit },
              { name: 'Research Library', icon: FileText },
              { name: 'Dataset Manager', icon: Database },
              { name: 'Policy Profiles', icon: Settings },
            ].map((item) => (
              <li key={item.name}>
                <button 
                  onClick={() => { setActiveTab(item.name); addLog(`Switched to ${item.name}`); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left ${activeTab === item.name ? 'bg-slate-800 text-emerald-400 font-medium' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  <item.icon className={`w-4 h-4 ${activeTab === item.name ? 'text-emerald-500' : 'text-slate-400'}`} />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
            <span>Global Search</span>
            <span className="font-mono bg-slate-800 px-1 py-0.5 rounded border border-slate-700 text-[10px]">CTRL K</span>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* CENTER: Tabbed Workspace */}
        {/* We use CSS display to maintain component state when switching tabs */}
        <main className="flex-1 overflow-hidden relative flex flex-col">
           <div className={`absolute inset-0 flex flex-col ${activeTab === 'Knowledge Graph' ? 'z-10' : 'opacity-0 pointer-events-none'}`}>
               <div className="absolute top-4 left-4 z-10">
                   <h2 className="text-2xl font-semibold text-white tracking-wide drop-shadow-md">Knowledge Graph Explorer</h2>
                   <p className="text-slate-400 text-sm mt-1 drop-shadow-md">Planetary-scale causal model visualization.</p>
                   {highlightedNode && <p className="text-emerald-400 text-xs mt-2 font-mono">Focused on: {highlightedNode}</p>}
               </div>
               <KnowledgeGraphExplorer />
           </div>
           
           <div className={`absolute inset-0 ${activeTab === 'Simulation Studio' ? 'z-10 opacity-100' : 'opacity-0 pointer-events-none'}`}>
               <SimulationStudio />
           </div>

           <div className={`absolute inset-0 ${activeTab === 'Historical Replays' ? 'z-10 opacity-100' : 'opacity-0 pointer-events-none'}`}>
               <HistoricalReplayLab />
           </div>

           <div className={`absolute inset-0 ${activeTab === 'Counterfactual Lab' ? 'z-10 opacity-100' : 'opacity-0 pointer-events-none'}`}>
               <CounterfactualLab />
           </div>

           <div className={`absolute inset-0 ${activeTab === 'Research Library' ? 'z-10 opacity-100' : 'opacity-0 pointer-events-none'}`}>
               <ResearchLibrary onNodeSelect={(id) => handleCrossNavigation('Knowledge Graph', { node: id })} />
           </div>
        </main>

        {/* BOTTOM: Scientific Console */}
        <footer className="h-48 border-t border-slate-800 bg-slate-900 flex flex-col z-20 shadow-2xl relative">
          <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center bg-slate-950">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Terminal Log</span>
            <span className="text-xs font-mono text-emerald-500">System Nominal</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-400 space-y-1">
            <p><span className="text-emerald-500">[SYS]</span> TerraLattice Mission Control Initialized.</p>
            {consoleLogs.map((log, idx) => (
                <p key={idx}><span className="text-blue-500">[ACT]</span> {log}</p>
            ))}
          </div>
        </footer>
      </div>

      {/* RIGHT: Inspector */}
      <div className={`${activeTab === 'Knowledge Graph' ? 'w-80' : 'w-0'} transition-all overflow-hidden border-l border-slate-800 bg-slate-900 z-10`}>
          <GraphInspector />
      </div>
      
    </div>
  );
}

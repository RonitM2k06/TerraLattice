"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, Activity, Database, FileText, Settings, Play, RefreshCw, Layers } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onNavigate }: { isOpen: boolean, onClose: () => void, onNavigate: (tab: string, context?: any) => void }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setQuery("");
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (query.length > 1) {
            fetch(`http://127.0.0.1:8000/api/research/search?query=${query}`)
                .then(res => res.json())
                .then(data => setResults(data));
        } else {
            setResults([]);
        }
    }, [query]);

    const handleAction = (result: any, action: string) => {
        console.log(`Executing ${action} on ${result.id}`);
        
        if (action === "Execute Directly" && result.id === "reset_workspace") {
            // Trigger global reset logic here via a store or event
            alert("Workspace Reset Triggered");
            onClose();
            return;
        }

        if (action === "Execute Directly" && result.id === "run_monte_carlo") {
            onNavigate('Simulation Studio', { action: "run" });
            onClose();
            return;
        }

        if (result.type === 'node' || action.includes('Graph')) {
            onNavigate('Knowledge Graph', { node: result.id });
        } else if (result.type === 'document' || action.includes('Documentation') || action.includes('Citation')) {
            onNavigate('Research Library', { doc: result.id });
        } else if (result.type === 'event' || action.includes('Replay')) {
            onNavigate('Historical Replays', { event: result.id });
        } else if (action.includes('Counterfactual') || action.includes('Compare')) {
            onNavigate('Counterfactual Lab', { query: result.id });
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[9999] flex justify-center items-start pt-[15vh]">
            <div 
                className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="flex items-center px-4 py-4 border-b border-slate-800">
                    <Search className="w-6 h-6 text-emerald-500 mr-3" />
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search TerraLattice (nodes, events, docs, commands...)" 
                        className="w-full bg-transparent outline-none text-lg text-white placeholder-slate-500"
                    />
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                        <span className="px-1 border border-slate-700 rounded">ESC</span> to close
                    </div>
                </div>

                {/* Results Area */}
                <div className="max-h-[60vh] overflow-y-auto">
                    {query.length === 0 ? (
                        <div className="p-4 space-y-4">
                            <div>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Suggestions</span>
                                <div className="space-y-1">
                                    <button onClick={() => setQuery("California Drought")} className="w-full text-left px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 rounded flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500" /> Analyze California Drought</button>
                                    <button onClick={() => setQuery("Crop Yield")} className="w-full text-left px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 rounded flex items-center gap-2"><Database className="w-4 h-4 text-blue-500" /> Inspect Crop Yield parameters</button>
                                    <button onClick={() => setQuery("Run")} className="w-full text-left px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 rounded flex items-center gap-2"><Play className="w-4 h-4 text-amber-500" /> Run Monte Carlo Simulation</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-2 space-y-1">
                            {results.map((res, i) => (
                                <div key={i} className="group p-3 bg-slate-900 hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-700 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            {res.type === 'node' && <Database className="w-4 h-4 text-emerald-400" />}
                                            {res.type === 'event' && <Activity className="w-4 h-4 text-amber-400" />}
                                            {res.type === 'document' && <FileText className="w-4 h-4 text-blue-400" />}
                                            {res.type === 'command' && <Command className="w-4 h-4 text-purple-400" />}
                                            <span className="text-sm font-medium text-slate-200">{res.title}</span>
                                        </div>
                                        <span className="text-[10px] uppercase text-slate-500 font-mono tracking-widest">{res.type}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pl-6">
                                        {res.actions?.map((action: string, j: number) => (
                                            <button 
                                                key={j}
                                                onClick={() => handleAction(res, action)}
                                                className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-[10px] text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

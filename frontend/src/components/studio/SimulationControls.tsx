import React from 'react';
import { Play, Pause, RotateCcw, FastForward, Settings2 } from 'lucide-react';
import { useGraphStore } from '@/store/useGraphStore';

export default function SimulationControls() {
    const { isSimulating, setSimulating } = useGraphStore();

    return (
        <>
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Execution Controls</h3>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center items-center gap-6">
                
                <div className="flex gap-4">
                    <button 
                        onClick={() => setSimulating(!isSimulating)}
                        className={`px-6 py-3 rounded flex items-center gap-2 font-medium transition-all shadow-lg ${isSimulating ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30 text-white' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30 text-white'}`}
                    >
                        {isSimulating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        {isSimulating ? "Pause" : "Execute Scenario"}
                    </button>
                    <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors">
                        <RotateCcw className="w-5 h-5" />
                    </button>
                    <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors">
                        <FastForward className="w-5 h-5" />
                    </button>
                </div>

                <div className="w-full max-w-md bg-slate-950 p-4 rounded border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Mode</span>
                        <select className="bg-slate-900 border border-slate-700 rounded p-1 text-emerald-400">
                            <option>Monte Carlo (Ensemble)</option>
                            <option>Deterministic</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Iterations</span>
                        <input type="number" defaultValue={100} className="w-20 bg-slate-900 border border-slate-700 rounded p-1 text-right text-slate-300" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Playback Speed</span>
                        <select className="bg-slate-900 border border-slate-700 rounded p-1 text-slate-300">
                            <option>1x (Quarter / sec)</option>
                            <option>2x</option>
                            <option>Instant</option>
                        </select>
                    </div>
                </div>

            </div>
        </>
    );
}

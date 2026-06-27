import React from 'react';
import { Play, Pause, RotateCcw, Download } from 'lucide-react';

export default function ReplayControls() {
    return (
        <>
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Replay Controls</h3>
                <button className="text-emerald-500 hover:text-emerald-400 flex items-center gap-2 text-xs">
                    <Download className="w-3 h-3" /> Export Report
                </button>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center gap-4 relative">
                <div className="absolute top-4 right-4 text-xs font-mono text-slate-500">
                    Seed: 482910A
                </div>
                <div className="flex gap-4 justify-center">
                    <button className="px-6 py-2 rounded flex items-center gap-2 font-medium transition-all shadow-lg bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30 text-white">
                        <Play className="w-4 h-4" /> Run Replay
                    </button>
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                        <input type="radio" name="mode" defaultChecked className="accent-emerald-500" />
                        <label className="text-xs text-slate-400">Deterministic</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" name="mode" className="accent-emerald-500" />
                        <label className="text-xs text-slate-400">Monte Carlo</label>
                    </div>
                </div>
            </div>
        </>
    );
}

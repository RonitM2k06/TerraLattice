import React from 'react';

export default function SimulationSummary() {
    return (
        <>
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Post-Simulation Analysis</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-6">
                
                <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest">Systemic Risk Score</label>
                    <div className="text-3xl font-bold text-emerald-400 mt-1">84.2</div>
                    <p className="text-xs text-slate-400 mt-1">Peak cascade reached at Q12.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase tracking-widest">Cascade Depth</label>
                        <div className="text-lg text-slate-200 mt-1 font-mono">6 Nodes</div>
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase tracking-widest">Recovery Time</label>
                        <div className="text-lg text-slate-200 mt-1 font-mono">18 Quarters</div>
                    </div>
                </div>

                <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest">Primary Causal Chain</label>
                    <div className="mt-2 p-2 bg-slate-950 border border-slate-800 rounded font-mono text-xs text-slate-400 flex flex-col gap-1">
                        <span className="text-blue-400">Drought Index (+2.5)</span>
                        <span className="pl-4 border-l-2 border-slate-700">&rarr; Crop Yield (-35%)</span>
                        <span className="pl-8 border-l-2 border-slate-700">&rarr; Food Prices (+80%)</span>
                        <span className="pl-12 border-l-2 border-slate-700">&rarr; <span className="text-amber-400">Social Stress (+45%)</span></span>
                    </div>
                </div>

                <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded text-sm transition-colors mt-4">
                    Export Full Report (.md)
                </button>

            </div>
        </>
    );
}

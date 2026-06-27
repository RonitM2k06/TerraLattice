import React from 'react';
import { Plus } from 'lucide-react';

export default function InterventionBuilder() {
    return (
        <>
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Intervention Builder</h3>
                <button className="text-emerald-500 hover:text-emerald-400">
                   <Plus className="w-4 h-4" />
                </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="p-3 bg-slate-800/50 rounded border border-slate-700/50">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Reservoir Release</span>
                        <span className="text-[10px] text-emerald-400 border border-emerald-500/50 bg-emerald-950 px-2 py-0.5 rounded uppercase">Active</span>
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span className="text-slate-500 block mb-1">Start Quarter</span>
                                <input type="number" defaultValue={2} className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-slate-300" />
                            </div>
                            <div>
                                <span className="text-slate-500 block mb-1">Duration (Qtrs)</span>
                                <input type="number" defaultValue={1} className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-slate-300" />
                            </div>
                        </div>
                        <div>
                            <span className="text-slate-500 text-xs block mb-1">Intensity Modifier</span>
                            <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-emerald-500" />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 border-t border-slate-700/50 pt-2 mt-2">
                            <span>Cost: 25.0M</span>
                            <span>Delay: 0 Qtr</span>
                            <span>Conf: High</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

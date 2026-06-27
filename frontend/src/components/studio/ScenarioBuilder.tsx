import React from 'react';
import { Plus } from 'lucide-react';

export default function ScenarioBuilder() {
    return (
        <>
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Scenario Builder</h3>
                <button className="text-emerald-500 hover:text-emerald-400">
                   <Plus className="w-4 h-4" />
                </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="p-3 bg-slate-800/50 rounded border border-slate-700/50">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-slate-400 uppercase tracking-widest">Shock 1</span>
                        <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Active</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <label className="text-[10px] text-slate-500 uppercase">Target Node</label>
                            <select className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-slate-300 mt-1">
                                <option>Temperature</option>
                                <option>Drought_Index</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] text-slate-500 uppercase">Type</label>
                            <select className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-slate-300 mt-1">
                                <option>Increase</option>
                                <option>Decrease</option>
                                <option>Absolute Override</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] text-slate-500 uppercase">Value</label>
                            <input type="number" defaultValue={2.5} className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-slate-300 mt-1" />
                        </div>
                        <div>
                            <label className="text-[10px] text-slate-500 uppercase">Start Quarter</label>
                            <input type="number" defaultValue={1} className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-slate-300 mt-1" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

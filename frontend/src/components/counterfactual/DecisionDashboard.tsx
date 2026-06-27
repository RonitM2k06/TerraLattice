"use client";
import React, { useEffect, useState } from 'react';

export default function DecisionDashboard() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/counterfactual/diagnostics")
            .then(r => r.json())
            .then(d => setStats(d));
    }, []);

    if (!stats) return <div className="p-4 text-xs text-slate-500">Loading intelligence...</div>;

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Decision Intelligence</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-900/50 text-blue-400 border border-blue-800">Pareto Rank: {stats["Pareto Rank"]}</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                
                <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Recommendation</span>
                    <div className="text-sm font-bold text-emerald-400">{stats.Recommendation}</div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono border-y border-slate-800 py-3">
                    <div className="flex flex-col">
                        <span className="text-slate-500 uppercase text-[10px]">B/C Ratio</span>
                        <span className="text-emerald-400">{stats["Benefit Cost Ratio"]}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500 uppercase text-[10px]">Policy Cost</span>
                        <span className="text-amber-400">{stats["Policy Cost"]}M</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500 uppercase text-[10px]">GDP Preserved</span>
                        <span className="text-blue-400">{stats["GDP Preserved"]}B</span>
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <div>
                        <span className="text-[10px] text-emerald-500 uppercase tracking-widest block mb-1">Suppressed Cascades (Mitigated)</span>
                        <div className="text-xs text-slate-400 p-2 bg-slate-950 border border-slate-800 rounded font-mono">
                            {stats["Suppressed Cascades"][0]}
                        </div>
                    </div>
                    <div>
                        <span className="text-[10px] text-red-500 uppercase tracking-widest block mb-1">New Cascades Introduced (Trade-off)</span>
                        <div className="text-xs text-red-400 p-2 bg-red-950/20 border border-red-900/50 rounded font-mono">
                            {stats["New Cascades"][0]}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

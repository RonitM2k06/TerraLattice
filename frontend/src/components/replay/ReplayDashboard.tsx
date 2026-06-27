"use client";
import React, { useEffect, useState } from 'react';

export default function ReplayDashboard() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/replay/diagnostics")
            .then(r => r.json())
            .then(data => setStats(data));
    }, []);

    if (!stats) return <div className="p-4 text-xs text-slate-500">Loading metrics...</div>;

    return (
        <>
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Replay Evaluation</h3>
                <span className={`px-2 py-1 rounded text-xs font-mono uppercase ${stats["Replay Quality Grade"] === "Good" ? "bg-emerald-900/50 text-emerald-400" : "bg-amber-900/50 text-amber-400"}`}>{stats["Replay Quality Grade"]}</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex items-end gap-3 mb-6">
                    <div className="text-4xl font-bold text-emerald-400 font-mono">{stats["Agreement Score"]}%</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Historical Agreement</div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs font-mono">
                    <div className="flex flex-col">
                        <span className="text-slate-500 uppercase">Direction Acc.</span>
                        <span className="text-slate-300">{stats["Direction Accuracy"]}%</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500 uppercase">Magnitude Err.</span>
                        <span className="text-amber-400">{stats["Magnitude Error"]}%</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500 uppercase">Propagation Acc.</span>
                        <span className="text-slate-300">{stats["Propagation Accuracy"]}%</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500 uppercase">Recovery Err.</span>
                        <span className="text-slate-300">{stats["Recovery Error"]}%</span>
                    </div>
                </div>

                <div className="mt-6 space-y-2 border-t border-slate-800 pt-4 text-[10px] font-mono">
                    <div className="flex justify-between">
                        <span className="text-slate-500 uppercase">Best Var</span>
                        <span className="text-emerald-400">{stats["Best Variable"]}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500 uppercase">Worst Var</span>
                        <span className="text-red-400">{stats["Worst Variable"]}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

"use client";
import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function FailureAnalysisPanel() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/replay/diagnostics")
            .then(r => r.json())
            .then(data => setStats(data));
    }, []);

    if (!stats) return null;

    return (
        <>
            <div className="px-4 py-3 border-b border-red-900/50 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-red-400 tracking-widest uppercase flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Failure Analysis
                </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-mono">
                
                <div>
                    <span className="text-[10px] text-red-500 uppercase tracking-widest block mb-1">Largest Residual</span>
                    <span className="text-red-300 bg-red-950/30 px-2 py-1 rounded border border-red-900/50">{stats["Largest Residual"]}</span>
                </div>

                <div>
                    <span className="text-[10px] text-red-500 uppercase tracking-widest block mb-1">Missing Ontology</span>
                    <ul className="list-disc pl-4 text-slate-400 space-y-1">
                        {stats["Missing Ontology"].map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <span className="text-[10px] text-amber-500 uppercase tracking-widest block mb-1">Calibration Recs</span>
                    <p className="text-slate-400 leading-relaxed bg-amber-950/20 p-2 rounded border border-amber-900/30">
                        {stats["Calibration Recommendations"][0]}
                    </p>
                </div>

            </div>
        </>
    );
}

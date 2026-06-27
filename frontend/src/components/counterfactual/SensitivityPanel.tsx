"use client";
import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function SensitivityPanel() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/counterfactual/diagnostics")
            .then(r => r.json())
            .then(d => setStats(d));
    }, []);

    if (!stats) return null;

    return (
        <div className="flex flex-col h-full bg-amber-950/10">
            <div className="px-4 py-2 border-b border-amber-900/30 flex justify-between items-center bg-slate-950">
                <h3 className="text-xs font-bold text-amber-500 tracking-widest uppercase flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Sensitivity Analysis
                </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
                <div>
                    <span className="text-[10px] text-amber-500/70 uppercase tracking-widest block mb-1">Largest Uncertainty Source</span>
                    <div className="text-xs text-amber-200 border-l-2 border-amber-500 pl-2">
                        {stats["Largest Uncertainty"]}
                    </div>
                </div>
                <div>
                    <span className="text-[10px] text-amber-500/70 uppercase tracking-widest block mb-1">Confidence</span>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

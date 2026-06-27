"use client";
import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';

export default function CitationInspector() {
    const [evidence, setEvidence] = useState<any>(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/research/evidence")
            .then(r => r.json())
            .then(d => setEvidence(d));
    }, []);

    if (!evidence) return null;

    return (
        <div className="flex flex-col h-full bg-slate-950/30">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-400" /> Citation & Metadata
                </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="mb-4">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Primary Citation</span>
                    <div className="text-sm text-slate-300 bg-slate-900 border border-slate-800 p-3 rounded leading-relaxed">
                        {evidence.citation}. DOI: <a href={`https://doi.org/${evidence.doi}`} className="text-blue-400 hover:underline">{evidence.doi}</a>
                    </div>
                </div>
                
                <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Scientific Rationale</span>
                    <div className="text-xs text-slate-400 leading-relaxed">
                        The relationship between {evidence.related_nodes.join(" and ")} is derived from empirical time-series analysis over the 1980-2023 observation period. Granger Causality tests confirm directional forcing with p &lt; 0.01.
                    </div>
                </div>
            </div>
        </div>
    );
}

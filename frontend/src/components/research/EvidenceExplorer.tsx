"use client";
import React, { useEffect, useState } from 'react';
import { Database, Link } from 'lucide-react';

export default function EvidenceExplorer({ docId }: { docId: string }) {
    const [evidence, setEvidence] = useState<any>(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/research/evidence")
            .then(r => r.json())
            .then(d => setEvidence(d));
    }, [docId]);

    if (!evidence) return null;

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Evidence Explorer</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                        <span className="text-slate-500 uppercase block mb-1">Evidence Level</span>
                        <span className="text-emerald-400 font-bold">{evidence.evidence_level}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 uppercase block mb-1">Confidence</span>
                        <span className="text-white">{evidence.confidence}%</span>
                    </div>
                    <div>
                        <span className="text-slate-500 uppercase block mb-1">Dataset</span>
                        <span className="text-blue-400 flex items-center gap-1"><Database className="w-3 h-3" /> {evidence.dataset}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 uppercase block mb-1">Status</span>
                        <span className="text-white">{evidence.calibration_status}</span>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-4">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-2">Related Graph Entities</span>
                    <div className="flex flex-wrap gap-2">
                        {evidence.related_nodes.map((node: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono text-slate-300">{node}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";
import React, { useEffect, useState } from 'react';

export default function PortfolioExplorer() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/counterfactual/pareto")
            .then(res => res.json())
            .then(d => setData(d));
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Portfolio Explorer</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-500 uppercase tracking-wider">
                        <tr>
                            <th className="p-3 font-medium">Portfolio ID</th>
                            <th className="p-3 font-medium">Cost</th>
                            <th className="p-3 font-medium">Profile</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {data.map((p: any, i: number) => (
                            <tr key={i} className={`hover:bg-slate-800 transition-colors cursor-pointer ${i === 3 ? 'bg-slate-800/80 border-l-2 border-emerald-500' : ''}`}>
                                <td className="p-3 font-mono text-slate-300">{p.id}</td>
                                <td className="p-3 font-mono text-amber-400">{p.cost}M</td>
                                <td className="p-3"><span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">{p.profile}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

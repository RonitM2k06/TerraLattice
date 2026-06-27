"use client";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';

const mockData = Array.from({ length: 40 }).map((_, i) => ({
    quarter: `Q${i+1}`,
    mean: 100 + (Math.sin(i / 5) * 20) + (i * 0.5),
    upper: 100 + (Math.sin(i / 5) * 20) + (i * 0.5) + 15,
    lower: 100 + (Math.sin(i / 5) * 20) + (i * 0.5) - 15,
}));

export default function TimelineView() {
    const [showEnsembles, setShowEnsembles] = useState(false);

    return (
        <>
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Systemic Trajectory</h3>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setShowEnsembles(!showEnsembles)}
                        className={`text-xs px-2 py-1 rounded border ${showEnsembles ? 'bg-emerald-900 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                    >
                        Show Ensembles
                    </button>
                    <select className="text-xs bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-300">
                        <option>Food Prices (Index)</option>
                        <option>GDP Impact (%)</option>
                    </select>
                </div>
            </div>
            <div className="flex-1 p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={mockData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                            itemStyle={{ color: '#34d399' }}
                        />
                        {/* Uncertainty Band (5th-95th Percentile) */}
                        {!showEnsembles && (
                            <Area type="monotone" dataKey="upper" stroke="none" fill="#34d399" fillOpacity={0.1} />
                        )}
                        {!showEnsembles && (
                            <Area type="monotone" dataKey="lower" stroke="none" fill="#0f172a" fillOpacity={1} />
                        )}
                        {/* Mean Trajectory */}
                        <Line type="monotone" dataKey="mean" stroke="#34d399" strokeWidth={2} dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

"use client";
import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ParetoFrontier() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/counterfactual/pareto")
            .then(res => res.json())
            .then(d => setData(d));
    }, []);

    // Color by Confidence level
    const getColor = (confidence: string) => {
        if (confidence === 'High') return '#10b981'; // Emerald
        if (confidence === 'Medium') return '#f59e0b'; // Amber
        return '#ef4444'; // Red
    };

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Pareto Optimization</h3>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> High Conf</span>
                    <span className="flex items-center gap-1 text-[10px] text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Med Conf</span>
                    <span className="flex items-center gap-1 text-[10px] text-red-400"><span className="w-2 h-2 rounded-full bg-red-500"></span> Low Conf</span>
                </div>
            </div>
            <div className="flex-1 p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis type="number" dataKey="cost" name="Cost" stroke="#94a3b8" label={{ value: 'Policy Cost (M)', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10, dy: 10 }} fontSize={10} tickLine={false} />
                        <YAxis type="number" dataKey="benefit" name="Benefit" stroke="#94a3b8" label={{ value: 'Humanitarian Benefit', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10, dx: -10 }} fontSize={10} tickLine={false} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                        <Scatter name="Portfolios" data={data} fill="#8884d8">
                            {data.map((entry: any, index) => (
                                <Cell key={`cell-${index}`} fill={getColor(entry.confidence)} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';

const mockData = Array.from({ length: 20 }).map((_, i) => {
    const baseline = 100 + (Math.sin(i / 4) * 20);
    const counterfactual = 100 + (Math.sin(i / 4) * 5) - (i * 0.5); // Mitigated
    return {
        quarter: `Q${i+1}`,
        baseline,
        counterfactual,
        upper: counterfactual + 5,
        lower: counterfactual - 5,
        difference: baseline - counterfactual
    };
});

export default function ScenarioComparison() {
    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h3 className="text-sm font-bold text-white tracking-widest uppercase">Scenario Comparison</h3>
                    <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300">
                        <option>Difference Mode</option>
                        <option>Full Simulation Mode</option>
                    </select>
                </div>
                <select className="text-xs bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-300">
                    <option>Food Prices (Index)</option>
                    <option>Social Stress (%)</option>
                </select>
            </div>
            
            <div className="flex-1 p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={mockData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                        
                        {/* Difference fill */}
                        <Area type="monotone" dataKey="baseline" stroke="none" fill="#ef4444" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="counterfactual" stroke="none" fill="#0f172a" fillOpacity={1} />
                        
                        {/* Uncertainty band around counterfactual */}
                        <Area type="monotone" dataKey="upper" stroke="none" fill="#10b981" fillOpacity={0.15} />
                        <Area type="monotone" dataKey="lower" stroke="none" fill="#0f172a" fillOpacity={1} />

                        <Line type="monotone" dataKey="baseline" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Baseline" />
                        <Line type="monotone" dataKey="counterfactual" stroke="#10b981" strokeWidth={2} dot={false} name="Counterfactual" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

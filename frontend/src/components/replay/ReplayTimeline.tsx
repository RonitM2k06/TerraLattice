"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';

const mockData = Array.from({ length: 20 }).map((_, i) => {
    const observed = 100 + (Math.sin(i / 3) * 15) + (i * 1.2);
    const simulated = 100 + (Math.sin(i / 3.2) * 14) + (i * 1.1) + (Math.random() * 5 - 2.5);
    return {
        quarter: `Q${i+1}`,
        observed,
        simulated,
        upper: simulated + 10,
        lower: simulated - 10,
        residual: observed - simulated
    };
});

export default function ReplayTimeline() {
    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Comparison Timeline</h3>
                <select className="text-xs bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-300">
                    <option>Food Prices (Index)</option>
                    <option>GDP Impact (%)</option>
                </select>
            </div>
            
            {/* Primary Chart: Observed vs Simulated */}
            <div className="flex-[2] p-4 min-h-0 border-b border-slate-800 border-dashed">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={mockData} syncId="replaySync">
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                        <Area type="monotone" dataKey="upper" stroke="none" fill="#3b82f6" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="lower" stroke="none" fill="#0f172a" fillOpacity={1} />
                        <Line type="monotone" dataKey="simulated" stroke="#3b82f6" strokeWidth={2} dot={false} name="Simulated" />
                        <Line type="monotone" dataKey="observed" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Observed" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Secondary Chart: Residuals */}
            <div className="flex-1 p-4 min-h-0 relative bg-slate-950/50">
                <div className="absolute top-2 left-4 text-[10px] uppercase text-slate-500 font-mono">Residual Error</div>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={mockData} syncId="replaySync">
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} hide />
                        <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={[-20, 20]} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                        {/* 0 Baseline */}
                        <Line type="linear" dataKey={() => 0} stroke="#94a3b8" strokeWidth={1} dot={false} isAnimationActive={false} />
                        <Area type="monotone" dataKey="residual" fill="#ef4444" stroke="#ef4444" fillOpacity={0.2} strokeWidth={1} name="Residual" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

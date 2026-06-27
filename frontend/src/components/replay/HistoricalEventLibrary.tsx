import React from 'react';
import { Database } from 'lucide-react';

const EVENTS = [
    { name: "2003 European Heatwave", region: "Europe", years: "2003", hazard: "Heatwave", score: 88, status: "Calibrated" },
    { name: "Pakistan Floods", region: "South Asia", years: "2010", hazard: "Flood", score: 82, status: "Review Required" },
    { name: "California Drought", region: "North America", years: "2012-2016", hazard: "Drought", score: 91, status: "Calibrated" },
    { name: "Horn of Africa Drought", region: "East Africa", years: "2011", hazard: "Drought", score: 76, status: "Weak" },
];

export default function HistoricalEventLibrary() {
    return (
        <>
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Historical Event Library</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-500 uppercase tracking-wider">
                        <tr>
                            <th className="p-3 font-medium">Event</th>
                            <th className="p-3 font-medium">Region</th>
                            <th className="p-3 font-medium">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {EVENTS.map((evt, i) => (
                            <tr key={i} className={`hover:bg-slate-800 transition-colors cursor-pointer ${i === 0 ? 'bg-slate-800' : ''}`}>
                                <td className="p-3">
                                    <div className="font-medium text-slate-300">{evt.name}</div>
                                    <div className="text-[10px] text-slate-500 mt-0.5">{evt.hazard} &bull; {evt.years}</div>
                                </td>
                                <td className="p-3 text-slate-400">{evt.region}</td>
                                <td className="p-3">
                                    <div className={`font-mono ${evt.score >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>{evt.score}%</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

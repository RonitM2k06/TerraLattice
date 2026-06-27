"use client";
import React, { useEffect, useState } from 'react';
import { Folder, FileText, ChevronRight } from 'lucide-react';

export default function ResearchNavigator({ activeDoc, onSelect }: { activeDoc: string, onSelect: (id: string) => void }) {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/research/library")
            .then(res => res.json())
            .then(d => setCategories(d));
    }, []);

    return (
        <div className="flex flex-col h-full bg-slate-950/50">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Research Navigator</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                {categories.map((cat, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">
                            <Folder className="w-3 h-3" /> {cat.category}
                        </div>
                        <ul className="space-y-1">
                            {cat.docs.map((doc: any, j: number) => (
                                <li key={j}>
                                    <button 
                                        onClick={() => onSelect(doc.id)}
                                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-xs text-left transition-colors ${activeDoc === doc.id ? 'bg-slate-800 text-emerald-400 font-medium' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'}`}
                                    >
                                        <FileText className="w-3 h-3" /> {doc.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

"use client";
import React, { useState } from 'react';
import { Search, FileText, Database, Share2 } from 'lucide-react';

export default function ResearchSearch({ onNodeSelect, onDocSelect }: { onNodeSelect?: (nodeId: string) => void, onDocSelect?: (docId: string) => void }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 2) {
            const res = await fetch(`http://127.0.0.1:8000/api/research/search?query=${val}`);
            const data = await res.json();
            setResults(data);
        } else {
            setResults([]);
        }
    };

    const handleSelect = (result: any) => {
        if (result.type === 'node') {
            onNodeSelect?.(result.id);
        } else if (result.type === 'document') {
            onDocSelect?.(result.id);
        }
        setResults([]);
        setQuery("");
    };

    return (
        <div className="relative">
            <div className="flex items-center gap-3 px-3">
                <Search className="w-5 h-5 text-emerald-500" />
                <input 
                    type="text" 
                    placeholder="Search documents, parameters, or graph nodes... (try 'Crop Yield' or 'Validation')" 
                    className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 py-2"
                    value={query}
                    onChange={handleSearch}
                />
            </div>
            {results.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-50 overflow-hidden">
                    {results.map((res, i) => (
                        <div 
                            key={i} 
                            onClick={() => handleSelect(res)}
                            className="px-4 py-3 hover:bg-slate-700 cursor-pointer flex items-center gap-3 border-b border-slate-700/50 last:border-0 text-sm"
                        >
                            {res.type === 'node' && <Database className="w-4 h-4 text-emerald-400" />}
                            {res.type === 'edge' && <Share2 className="w-4 h-4 text-emerald-400" />}
                            {res.type === 'document' && <FileText className="w-4 h-4 text-blue-400" />}
                            <span className="text-slate-300 font-medium">{res.title}</span>
                            <span className="ml-auto text-[10px] uppercase text-slate-500">{res.type}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

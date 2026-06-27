"use client";
import React from 'react';
import { useGraphStore } from '@/store/useGraphStore';

export default function GraphInspector() {
    const { selectedNode, selectedEdge } = useGraphStore();

    return (
      <aside className="w-80 border-l border-slate-800 bg-slate-900 flex flex-col z-10 shadow-xl">
         <div className="px-4 py-3 border-b border-slate-800 bg-slate-950">
            <h3 className="text-sm font-bold text-white tracking-widest uppercase">Node Inspector</h3>
         </div>
         <div className="flex-1 p-4 overflow-y-auto">
            {selectedNode && (
                <div className="space-y-6">
                    <div>
                       <label className="text-[10px] text-slate-500 uppercase tracking-widest">Selected Entity</label>
                       <div className="text-white font-mono mt-1 text-sm bg-slate-800/50 p-2 rounded border border-slate-700/50">{selectedNode.data.label as string}</div>
                    </div>
                    <div>
                       <label className="text-[10px] text-slate-500 uppercase tracking-widest">Metadata</label>
                       <div className="mt-2 space-y-2">
                           <div className="flex justify-between text-xs">
                               <span className="text-slate-400">Category</span>
                               <span className="text-slate-200">{selectedNode.data.category as string}</span>
                           </div>
                           <div className="flex justify-between text-xs">
                               <span className="text-slate-400">Current Value</span>
                               <span className="text-slate-200">{selectedNode.data.value as number} {selectedNode.data.unit as string}</span>
                           </div>
                           <div className="flex justify-between text-xs">
                               <span className="text-slate-400">Baseline</span>
                               <span className="text-slate-200">{selectedNode.data.baseline as number}</span>
                           </div>
                           <div className="flex justify-between text-xs">
                               <span className="text-slate-400">Volatility</span>
                               <span className="text-slate-200">{selectedNode.data.volatility as number}</span>
                           </div>
                           <div className="flex justify-between text-xs">
                               <span className="text-slate-400">Status</span>
                               <span className="text-emerald-400">{selectedNode.data.calibration_status as string || "Calibrated"}</span>
                           </div>
                       </div>
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase tracking-widest">Description</label>
                        <p className="text-xs text-slate-400 mt-2">{selectedNode.data.description as string || "No description provided in ontology."}</p>
                    </div>
                </div>
            )}
            
            {selectedEdge && (
                <div className="space-y-6">
                    <div>
                       <label className="text-[10px] text-slate-500 uppercase tracking-widest">Causal Linkage</label>
                       <div className="text-white font-mono mt-1 text-sm bg-slate-800/50 p-2 rounded border border-slate-700/50">{selectedEdge.source} &rarr; {selectedEdge.target}</div>
                    </div>
                    <div>
                       <label className="text-[10px] text-slate-500 uppercase tracking-widest">Metadata</label>
                       <div className="mt-2 space-y-2">
                           <div className="flex justify-between text-xs">
                               <span className="text-slate-400">Strength</span>
                               <span className="text-slate-200">{selectedEdge.data?.strength as number}</span>
                           </div>
                           <div className="flex justify-between text-xs">
                               <span className="text-slate-400">Lag (Quarters)</span>
                               <span className="text-slate-200">{selectedEdge.data?.lag as number}</span>
                           </div>
                           <div className="flex justify-between text-xs">
                               <span className="text-slate-400">Confidence</span>
                               <span className="text-slate-200">{selectedEdge.data?.confidence as number}</span>
                           </div>
                           <div className="flex justify-between text-xs">
                               <span className="text-slate-400">Evidence Level</span>
                               <span className="text-emerald-400">{selectedEdge.data?.evidence_level as string}</span>
                           </div>
                           <div className="flex justify-between text-xs">
                               <span className="text-slate-400">Method</span>
                               <span className="text-slate-200">{selectedEdge.data?.calibration_method as string}</span>
                           </div>
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] text-slate-500 uppercase tracking-widest">Citation</label>
                       <p className="text-xs text-slate-400 mt-2 italic border-l-2 border-emerald-500 pl-2">{selectedEdge.data?.citation as string || "N/A"}</p>
                       <p className="text-[10px] text-blue-400 mt-1 font-mono hover:underline cursor-pointer">{selectedEdge.data?.doi as string}</p>
                    </div>
                </div>
            )}

            {!selectedNode && !selectedEdge && (
                <div className="text-center mt-12">
                   <p className="text-xs text-slate-500 italic">Select a node or edge in the Knowledge Graph Explorer to view deep metadata.</p>
                </div>
            )}
         </div>
      </aside>
    );
}

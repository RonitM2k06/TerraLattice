"use client";
import React, { useState } from 'react';
import ResearchNavigator from './ResearchNavigator';
import DocumentViewer from './DocumentViewer';
import EvidenceExplorer from './EvidenceExplorer';
import CitationInspector from './CitationInspector';
import ResearchSearch from './ResearchSearch';

export default function ResearchLibrary({ onNodeSelect }: { onNodeSelect?: (nodeId: string) => void }) {
    const [activeDoc, setActiveDoc] = useState<string>("implementation_plan");

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4 overflow-hidden text-slate-300">
            {/* Global Search Bar */}
            <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 shadow-lg">
                <ResearchSearch onNodeSelect={onNodeSelect} onDocSelect={(docId) => setActiveDoc(docId)} />
            </div>

            {/* Top Row */}
            <div className="flex flex-[2] gap-4 overflow-hidden min-h-[400px]">
                <div className="w-[25%] bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <ResearchNavigator activeDoc={activeDoc} onSelect={setActiveDoc} />
                </div>
                <div className="w-[75%] bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <DocumentViewer docId={activeDoc} />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-[1] gap-4 overflow-hidden min-h-[250px]">
                <div className="w-[40%] bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <EvidenceExplorer docId={activeDoc} />
                </div>
                <div className="w-[60%] bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <CitationInspector />
                </div>
            </div>
        </div>
    );
}

"use client";
import React from 'react';
import HistoricalEventLibrary from './HistoricalEventLibrary';
import ReplayControls from './ReplayControls';
import ReplayTimeline from './ReplayTimeline';
import ReplayDashboard from './ReplayDashboard';
import FailureAnalysisPanel from './FailureAnalysisPanel';

export default function HistoricalReplayLab() {
    return (
        <div className="w-full h-full flex flex-col gap-4 p-4 overflow-hidden text-slate-300">
            {/* Top Row */}
            <div className="flex flex-1 gap-4 overflow-hidden min-h-[250px]">
                <div className="w-1/3 bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <HistoricalEventLibrary />
                </div>
                <div className="w-2/3 bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <ReplayControls />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-[2] gap-4 overflow-hidden min-h-[450px]">
                <div className="w-1/2 bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <ReplayTimeline />
                </div>
                <div className="w-1/2 flex flex-col gap-4">
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                        <ReplayDashboard />
                    </div>
                    <div className="flex-1 bg-slate-900 border border-red-900/50 rounded-lg flex flex-col overflow-hidden shadow-lg">
                        <FailureAnalysisPanel />
                    </div>
                </div>
            </div>
        </div>
    );
}

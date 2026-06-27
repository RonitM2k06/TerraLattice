"use client";
import React from 'react';
import ScenarioBuilder from './ScenarioBuilder';
import SimulationControls from './SimulationControls';
import TimelineView from './TimelineView';
import SimulationSummary from './SimulationSummary';

export default function SimulationStudio() {
    return (
        <div className="w-full h-full flex flex-col gap-4 p-4 overflow-hidden text-slate-300">
            {/* Top Row */}
            <div className="flex flex-1 gap-4 overflow-hidden min-h-[300px]">
                <div className="w-1/3 bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <ScenarioBuilder />
                </div>
                <div className="w-2/3 bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <SimulationControls />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-1 gap-4 overflow-hidden min-h-[400px]">
                <div className="w-2/3 bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <TimelineView />
                </div>
                <div className="w-1/3 bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <SimulationSummary />
                </div>
            </div>
        </div>
    );
}

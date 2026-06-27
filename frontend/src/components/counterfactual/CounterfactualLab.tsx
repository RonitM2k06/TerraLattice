"use client";
import React from 'react';
import InterventionBuilder from './InterventionBuilder';
import PortfolioExplorer from './PortfolioExplorer';
import ScenarioComparison from './ScenarioComparison';
import DecisionDashboard from './DecisionDashboard';
import ParetoFrontier from './ParetoFrontier';
import SensitivityPanel from './SensitivityPanel';

export default function CounterfactualLab() {
    return (
        <div className="w-full h-full flex flex-col gap-4 p-4 overflow-hidden text-slate-300">
            {/* Top Row */}
            <div className="flex flex-[1.5] gap-4 overflow-hidden min-h-[300px]">
                <div className="w-[30%] flex flex-col gap-4">
                    <div className="flex-[2] bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                        <InterventionBuilder />
                    </div>
                </div>
                <div className="w-[40%] bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <ParetoFrontier />
                </div>
                <div className="w-[30%] bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                    <PortfolioExplorer />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-[2] gap-4 overflow-hidden min-h-[400px]">
                <div className="w-[60%] flex flex-col gap-4">
                    <div className="flex-[2] bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                        <ScenarioComparison />
                    </div>
                </div>
                <div className="w-[40%] flex flex-col gap-4">
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-lg">
                        <DecisionDashboard />
                    </div>
                    <div className="flex-[0.8] bg-slate-900 border border-amber-900/40 rounded-lg flex flex-col overflow-hidden shadow-lg">
                        <SensitivityPanel />
                    </div>
                </div>
            </div>
        </div>
    );
}

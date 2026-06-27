import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const MODULE_COLORS: Record<string, string> = {
  Climate: 'border-blue-500 bg-blue-950',
  Water: 'border-cyan-500 bg-cyan-950',
  Agriculture: 'border-green-500 bg-green-950',
  FoodSecurity: 'border-lime-500 bg-lime-950',
  PublicHealth: 'border-purple-500 bg-purple-950',
  Economy: 'border-yellow-500 bg-yellow-950',
  Society: 'border-orange-500 bg-orange-950',
  Policy: 'border-red-500 bg-red-950',
};

function CustomNode({ data }: any) {
  const modColor = MODULE_COLORS[data.category] || 'border-slate-500 bg-slate-900';
  const healthColor = (data.value < (data.baseline||0)) ? 'text-red-400' : 'text-emerald-400';

  return (
    <div className={`px-4 py-2 shadow-md rounded-md border ${modColor} min-w-[150px] relative group`}>
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-slate-500" />
      
      <div className="flex flex-col">
        <div className="text-[10px] uppercase text-slate-400 tracking-widest">{data.category}</div>
        <div className="text-sm font-bold text-white">{data.label}</div>
        <div className="flex justify-between items-center mt-1">
          <div className={`text-xs font-mono ${healthColor}`}>{Number(data.value).toFixed(2)} {data.unit}</div>
          <div className="text-[10px] text-slate-500">Conf: {data.confidence}</div>
        </div>
      </div>
      
      {/* Tooltip on Hover */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-slate-800 border border-slate-700 p-3 rounded shadow-xl hidden group-hover:block z-50 pointer-events-none">
         <p className="text-xs text-slate-300">{data.description || 'No description provided.'}</p>
         <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-mono">
            <div>Baseline: {data.baseline}</div>
            <div>Vol: {data.volatility}</div>
            <div className="col-span-2">Calib: {data.calibration_status || 'Estimated'}</div>
         </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-slate-500" />
    </div>
  );
}

export default memo(CustomNode);

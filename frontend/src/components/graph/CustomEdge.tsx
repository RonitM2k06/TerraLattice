import React, { memo } from 'react';
import { BaseEdge, getBezierPath } from '@xyflow/react';

const EVIDENCE_COLORS: Record<string, string> = {
  PeerReviewed: '#00C853',
  GovDataset: '#2979FF',
  MultiSource: '#00BCD4',
  Statistical: '#FFB300',
  Expert: '#FB8C00',
  Placeholder: '#E53935'
};

function CustomEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  animated
}: any) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const strokeColor = EVIDENCE_COLORS[data?.evidence_level] || EVIDENCE_COLORS['Placeholder'];
  const strokeWidth = data?.strength ? Math.max(1, Math.abs(data.strength) * 4) : 2;
  const strokeOpacity = data?.confidence || 0.5;

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: strokeColor,
          strokeWidth,
          opacity: strokeOpacity,
          strokeDasharray: data?.lag > 0 ? '5,5' : 'none',
        }}
        className={animated ? "animate-pulse" : ""}
      />
    </>
  );
}

export default memo(CustomEdge);

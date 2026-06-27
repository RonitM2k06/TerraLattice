"use client";
import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import { useGraphStore } from '@/store/useGraphStore';

const nodeTypes = { custom: CustomNode };
const edgeTypes = { custom: CustomEdge };

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'LR') => {
  dagreGraph.setGraph({ rankdir: direction, align: 'UL', ranker: 'longest-path', nodesep: 100, edgesep: 50, ranksep: 200 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 150, height: 80 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = direction === 'LR' ? 'left' : 'top';
    node.sourcePosition = direction === 'LR' ? 'right' : 'bottom';
    node.position = {
      x: nodeWithPosition.x - 75,
      y: nodeWithPosition.y - 40,
    };
    return node;
  });

  return { nodes, edges };
};

export default function KnowledgeGraphExplorer() {
  const { setSelectedNode, setSelectedEdge, isSimulating } = useGraphStore();
  
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);

  useEffect(() => {
    async function fetchData() {
        try {
            const nodeRes = await fetch("http://127.0.0.1:8000/api/graph/nodes");
            const edgeRes = await fetch("http://127.0.0.1:8000/api/graph/edges");
            const rawNodes = await nodeRes.json();
            const rawEdges = await edgeRes.json();
            
            const initialNodes = rawNodes.map((n: any) => ({
                id: n.id,
                type: 'custom',
                data: { label: n.id, ...n },
                position: { x: 0, y: 0 }
            }));
            
            const initialEdges = rawEdges.map((e: any) => ({
                id: `${e.source}-${e.target}`,
                source: e.source,
                target: e.target,
                type: 'custom',
                animated: isSimulating,
                data: { ...e },
                markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' }
            }));

            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
        } catch (e) {
            console.error("Failed to fetch graph data", e);
        }
    }
    fetchData();
  }, [setNodes, setEdges, isSimulating]);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="w-full h-full bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node)}
        onEdgeClick={(_, edge) => setSelectedEdge(edge)}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background color="#334155" gap={20} size={1} />
        <Controls className="bg-slate-900 border-slate-700 fill-white" />
      </ReactFlow>
    </div>
  );
}

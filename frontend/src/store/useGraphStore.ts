import { create } from 'zustand';
import { Node, Edge } from '@xyflow/react';

interface GraphState {
  selectedNode: Node | null;
  selectedEdge: Edge | null;
  setSelectedNode: (node: Node | null) => void;
  setSelectedEdge: (edge: Edge | null) => void;
  isSimulating: boolean;
  setSimulating: (is: boolean) => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  selectedNode: null,
  selectedEdge: null,
  setSelectedNode: (node) => set({ selectedNode: node, selectedEdge: null }),
  setSelectedEdge: (edge) => set({ selectedEdge: edge, selectedNode: null }),
  isSimulating: false,
  setSimulating: (is) => set({ isSimulating: is }),
}));

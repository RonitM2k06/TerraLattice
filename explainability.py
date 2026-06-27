from typing import Dict
from state import StateHistory
from graph import Graph

class ExplainabilityFramework:
    def __init__(self, graph: Graph):
        self.graph = graph

    def trace_causality(self, history: StateHistory, target_node_id: str, t: int, depth: int = 3) -> Dict:
        """
        Traces backward through the graph from a target node at time t to find 
        what prior shocks contributed to its state change.
        Returns a tree structure representing the causal trace.
        """
        if depth == 0 or t <= 0:
            return {
                "node": target_node_id, 
                "time": t, 
                "value": history.get_node_value(t, target_node_id) if t in history.history else self.graph.nodes[target_node_id].baseline_value, 
                "contributors": []
            }
            
        node = self.graph.nodes[target_node_id]
        
        try:
            current_val = history.get_node_value(t, target_node_id)
        except KeyError:
            current_val = node.baseline_value
            
        try:
            prev_val = history.get_node_value(t-1, target_node_id)
        except KeyError:
            prev_val = node.baseline_value
            
        delta = current_val - prev_val
        
        contributors = []
        for edge in self.graph.incoming_edges.get(target_node_id, []):
            lag_t = t - edge.lag
            if lag_t >= 0 and lag_t in history.history:
                source_val = history.get_node_value(lag_t, edge.source)
                try:
                    source_prev = history.get_node_value(lag_t - 1, edge.source)
                except KeyError:
                    source_prev = self.graph.nodes[edge.source].baseline_value
                
                source_delta = source_val - source_prev
                effect = source_delta * edge.strength
                
                if abs(effect) > 1e-6: # Filter out negligible contributions
                    contributors.append({
                        "source": edge.source,
                        "lag": edge.lag,
                        "effect": effect,
                        "trace": self.trace_causality(history, edge.source, lag_t, depth - 1)
                    })
                    
        return {
            "node": target_node_id,
            "time": t,
            "value": current_val,
            "delta_from_prev": delta,
            "contributors": sorted(contributors, key=lambda x: abs(x["effect"]), reverse=True)
        }

import random
from typing import List, Dict, Set
from graph import Graph
from state import StateHistory

class SystemModule:
    """
    A domain-specific module (e.g., Climate, Economy) that owns a subset of nodes
    and calculates their quarterly updates based on lag-aware dependencies.
    """
    def __init__(self, name: str, graph: Graph, owned_node_ids: List[str]):
        self.name = name
        self.graph = graph
        self.owned_node_ids = owned_node_ids
        
        self.imported_dependencies: Set[str] = set()
        self.exported_indicators: Set[str] = set()
        
        for node_id in self.owned_node_ids:
            for edge in self.graph.incoming_edges.get(node_id, []):
                if edge.source not in self.owned_node_ids:
                    self.imported_dependencies.add(edge.source)
            for edge in self.graph.outgoing_edges.get(node_id, []):
                if edge.target not in self.owned_node_ids:
                    self.exported_indicators.add(node_id)
                    
    def update(self, t: int, history: StateHistory, stochastic: bool = True) -> Dict[str, float]:
        new_values = {}
        for node_id in self.owned_node_ids:
            node = self.graph.nodes[node_id]
            
            try:
                prev_val = history.get_node_value(t - 1, node_id)
            except KeyError:
                prev_val = node.baseline
                
            delta = 0.0
            
            for edge in self.graph.incoming_edges.get(node_id, []):
                lag_t = t - edge.lag
                if lag_t in history.history:
                    source_val_at_lag = history.get_node_value(lag_t, edge.source)
                    try:
                        source_prev_val = history.get_node_value(lag_t - 1, edge.source)
                    except KeyError:
                        source_prev_val = self.graph.nodes[edge.source].baseline
                    
                    source_delta = source_val_at_lag - source_prev_val
                    effect = source_delta * edge.strength
                    
                    if stochastic:
                        noise_scale = (1.0 - edge.confidence) * abs(effect)
                        noise = random.gauss(0, noise_scale) if noise_scale > 0 else 0
                        effect += noise
                        
                    delta += effect

            if node.mean_reversion > 0:
                reversion_amount = (node.baseline - prev_val) * node.mean_reversion
                delta += reversion_amount
                
            if stochastic and node.volatility > 0:
                delta += random.gauss(0, node.volatility)
                
            new_val = prev_val + delta
            new_val = max(node.minimum, min(node.maximum, new_val))
            
            new_values[node_id] = new_val
            
        return new_values

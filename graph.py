from dataclasses import dataclass
from typing import Dict, List

@dataclass
class Node:
    id: str
    name: str
    category: str
    unit: str
    baseline: float
    minimum: float
    maximum: float
    volatility: float
    mean_reversion: float
    description: str
    data_source: str
    calibration_status: str

@dataclass
class ScientificParameter:
    parameter_id: str
    source: str
    target: str
    strength: float
    confidence: float
    lag: int
    variance: float
    evidence_level: str
    citation: str
    status: str
    last_updated: str
    
    def __post_init__(self):
        if self.lag < 1:
            raise ValueError("Lag must be at least 1 quarter for strict causality.")

class Graph:
    def __init__(self):
        self.nodes: Dict[str, Node] = {}
        self.parameters: List[ScientificParameter] = []
        self.incoming_edges: Dict[str, List[ScientificParameter]] = {}
        self.outgoing_edges: Dict[str, List[ScientificParameter]] = {}
        
    def add_node(self, node: Node):
        self.nodes[node.id] = node
        self.incoming_edges[node.id] = []
        self.outgoing_edges[node.id] = []
        
    def add_parameter(self, param: ScientificParameter):
        self.parameters.append(param)
        if param.target in self.incoming_edges:
            self.incoming_edges[param.target].append(param)
        if param.source in self.outgoing_edges:
            self.outgoing_edges[param.source].append(param)

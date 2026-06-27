import copy
from typing import List, Dict
from graph import Graph
from module import SystemModule
from state import StateHistory

class SimulationEngine:
    """
    The core quarterly time-stepping simulation engine.
    Orchestrates the SystemModules, manages state history, and handles shocks.
    """
    def __init__(self, graph: Graph, modules: List[SystemModule]):
        self.graph = graph
        self.modules = modules
        self.history = StateHistory()
        self.shocks: Dict[int, Dict[str, float]] = {} 
        
    def initialize(self, overrides: Dict[str, float] = None):
        initial_state = {}
        for node_id, node in self.graph.nodes.items():
            initial_state[node_id] = node.baseline
        
        if overrides:
            for k, v in overrides.items():
                initial_state[k] = v
                
        self.history = StateHistory()
        self.history.initialize(0, initial_state)
        self.shocks = {}
        
    def inject_shock(self, t: int, node_id: str, value: float):
        if t not in self.shocks:
            self.shocks[t] = {}
        self.shocks[t][node_id] = value

    def step(self, stochastic: bool = True) -> Dict[str, float]:
        next_t = self.history.current_t + 1
        new_state = {}
        
        for module in self.modules:
            module_updates = module.update(next_t, self.history, stochastic=stochastic)
            new_state.update(module_updates)
            
        if next_t in self.shocks:
            for node_id, shock_val in self.shocks[next_t].items():
                node = self.graph.nodes[node_id]
                new_state[node_id] = max(node.minimum, min(node.maximum, shock_val))
                
        self.history.add_state(next_t, new_state)
        return new_state
        
    def run(self, quarters: int, stochastic: bool = True):
        for _ in range(quarters):
            self.step(stochastic=stochastic)
            
    def run_monte_carlo(self, quarters: int, iterations: int) -> List[StateHistory]:
        ensembles = []
        original_initial_state = self.history.get_state(0)
        original_shocks = copy.deepcopy(self.shocks)
        
        for _ in range(iterations):
            self.initialize(original_initial_state)
            self.shocks = copy.deepcopy(original_shocks)
            self.run(quarters, stochastic=True)
            ensembles.append(copy.deepcopy(self.history))
            
        return ensembles

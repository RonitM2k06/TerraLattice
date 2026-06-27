from typing import Dict

class StateHistory:
    def __init__(self):
        # Maps timestep (int) to a dictionary of node_id -> value
        self.history: Dict[int, Dict[str, float]] = {}
        self.current_t: int = 0
        
    def initialize(self, t: int, initial_state: Dict[str, float]):
        self.history[t] = initial_state
        self.current_t = t
        
    def get_state(self, t: int) -> Dict[str, float]:
        if t not in self.history:
            return {}
        return self.history[t]
        
    def get_node_value(self, t: int, node_id: str) -> float:
        state = self.get_state(t)
        if node_id not in state:
            raise KeyError(f"Node {node_id} not found at time {t}")
        return state[node_id]

    def add_state(self, t: int, state: Dict[str, float]):
        self.history[t] = state
        self.current_t = t

from typing import Dict, List
from graph import ScientificParameter

class ParameterRegistry:
    """
    Central repository for all scientific parameters bridging causal relationships.
    Decouples the parameters from the active graph simulation.
    """
    def __init__(self):
        self.registry: Dict[str, ScientificParameter] = {}
        
    def register(self, param: ScientificParameter):
        if param.parameter_id in self.registry:
            raise ValueError(f"Duplicate parameter ID: {param.parameter_id}")
        self.registry[param.parameter_id] = param
        
    def get_parameter(self, param_id: str) -> ScientificParameter:
        return self.registry[param_id]
        
    def get_all(self) -> List[ScientificParameter]:
        return list(self.registry.values())
        
    def get_by_source(self, source_id: str) -> List[ScientificParameter]:
        return [p for p in self.registry.values() if p.source == source_id]

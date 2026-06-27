import os
import yaml
from graph import Node, ScientificParameter, Graph
from parameter_registry import ParameterRegistry

class ParameterLoader:
    def __init__(self, parameters_dir: str):
        self.parameters_dir = parameters_dir
        
    def load_nodes(self, graph: Graph):
        for filename in os.listdir(self.parameters_dir):
            if filename.endswith("_nodes.yaml"):
                filepath = os.path.join(self.parameters_dir, filename)
                with open(filepath, 'r') as f:
                    data = yaml.safe_load(f) or []
                    for n in data:
                        node = Node(
                            id=n['id'], name=n['name'], category=n['category'],
                            unit=n['unit'], baseline=n['baseline'],
                            minimum=n['minimum'], maximum=n['maximum'],
                            volatility=n['volatility'], mean_reversion=n['mean_reversion'],
                            description=n['description'], data_source=n['data_source'],
                            calibration_status=n['calibration_status']
                        )
                        graph.add_node(node)
                        
    def load_parameters(self, registry: ParameterRegistry):
        for filename in os.listdir(self.parameters_dir):
            if filename.endswith("_edges.yaml"):
                filepath = os.path.join(self.parameters_dir, filename)
                with open(filepath, 'r') as f:
                    data = yaml.safe_load(f) or []
                    for e in data:
                        param = ScientificParameter(
                            parameter_id=e['parameter_id'], source=e['source'], target=e['target'],
                            strength=e['strength'], confidence=e['confidence'], lag=e['lag'],
                            variance=e['variance'], evidence_level=e['evidence_level'],
                            citation=e['citation'], status=e['status'], last_updated=e['last_updated']
                        )
                        registry.register(param)
                        
    def populate_graph(self, graph: Graph, registry: ParameterRegistry):
        for param in registry.get_all():
            graph.add_parameter(param)

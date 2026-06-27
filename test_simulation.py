import pytest
from graph import Graph, Node, Edge
from module import SystemModule
from simulation import SimulationEngine
from explainability import ExplainabilityFramework

def test_simulation_mechanics():
    g = Graph()
    
    # Climate Node
    g.add_node(Node("Drought", "Climate", "Index", 0.0, 0.0, "Drought index", min_val=0.0, max_val=1.0, mean_reversion_rate=0.1))
    # Ag Node
    g.add_node(Node("Crop_Yield", "Agriculture", "Tons/Ha", 100.0, 0.0, "Crop yield", min_val=0.0, max_val=200.0, mean_reversion_rate=0.5))
    
    # Edge: Drought reduces yield with lag 1
    g.add_edge(Edge("Drought", "Crop_Yield", strength=-50.0, confidence=0.9, lag=1, rationale="Less water for irrigation"))
    
    climate_mod = SystemModule("Climate", g, ["Drought"])
    ag_mod = SystemModule("Agriculture", g, ["Crop_Yield"])
    
    sim = SimulationEngine(g, [climate_mod, ag_mod])
    
    # Initialize
    sim.initialize()
    
    # Check Module logic
    assert "Drought" in ag_mod.imported_dependencies
    assert "Drought" in climate_mod.exported_indicators
    
    # Inject shock at t=1 (Drought spikes to 0.8)
    sim.inject_shock(1, "Drought", 0.8)
    
    # Run t=1 (Shock applies)
    sim.step(stochastic=False)
    assert sim.history.get_node_value(1, "Drought") == 0.8
    assert sim.history.get_node_value(1, "Crop_Yield") == 100.0 # Lag is 1, so no effect yet
    
    # Run t=2 (Effect propagates)
    sim.step(stochastic=False)
    # Drought mean reverts: old=0.8, baseline=0.0. diff=-0.8. reversion rate=0.1.
    # delta = -0.08. New drought = 0.72.
    assert pytest.approx(sim.history.get_node_value(2, "Drought")) == 0.72
    
    # Crop yield at t=2 affected by Drought delta at t=1 vs t=0.
    # Drought delta = 0.8 - 0.0 = 0.8.
    # Effect = 0.8 * -50.0 = -40.0.
    # Yield = 100 - 40 = 60.
    assert sim.history.get_node_value(2, "Crop_Yield") == 60.0
    
    # Run t=3
    sim.step(stochastic=False)
    # Crop yield mean reverts: old=60, base=100. diff=40. rate=0.5 -> +20.
    # Drought delta from t=1 to t=2 was 0.72 - 0.8 = -0.08.
    # Effect = -0.08 * -50.0 = +4.0.
    # Total crop yield change = 20 + 4 = 24.
    # New yield = 60 + 24 = 84.
    assert pytest.approx(sim.history.get_node_value(3, "Crop_Yield")) == 84.0
    
    # Explainability Tracing
    exp = ExplainabilityFramework(g)
    trace = exp.trace_causality(sim.history, "Crop_Yield", 2, depth=2)
    assert trace["delta_from_prev"] == -40.0
    assert len(trace["contributors"]) == 1
    assert trace["contributors"][0]["source"] == "Drought"
    assert trace["contributors"][0]["effect"] == -40.0

def test_monte_carlo():
    g = Graph()
    g.add_node(Node("NodeA", "Cat1", "U", 10.0, 2.0, "Desc", min_val=0, max_val=20))
    mod = SystemModule("Mod1", g, ["NodeA"])
    sim = SimulationEngine(g, [mod])
    
    sim.initialize()
    ensembles = sim.run_monte_carlo(quarters=5, iterations=3)
    assert len(ensembles) == 3
    assert len(ensembles[0].history) == 6 # t=0 to t=5

def test_edge_lag_validation():
    with pytest.raises(ValueError, match="Lag must be at least 1"):
        Edge("A", "B", 1.0, 0.9, 0, "Invalid lag")

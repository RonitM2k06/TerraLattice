from graph import Graph, Node, Edge
from module import SystemModule
from simulation import SimulationEngine
from explainability import ExplainabilityFramework
import json

def setup_graph():
    g = Graph()
    
    def add_n(id, cat, base=100.0, mr=0.1):
        g.add_node(Node(id, cat, "Index", base, 1.0, id, 0.0, 200.0, mr))
        
    add_n("Temperature", "Climate", 100.0, 0.5)
    add_n("Rainfall", "Climate", 100.0, 0.5)
    add_n("Drought", "Climate", 0.0, 0.2)
    add_n("Heatwave", "Climate", 0.0, 0.5)
    add_n("Flood", "Climate", 0.0, 0.5)
    add_n("Wildfire", "Climate", 0.0, 0.5)
    
    add_n("Reservoir_Levels", "Water", 100.0, 0.1)
    add_n("Groundwater", "Water", 100.0, 0.05)
    add_n("Water_Stress", "Water", 0.0, 0.2)
    
    add_n("Crop_Yield", "Agriculture", 100.0, 0.2)
    add_n("Food_Production", "Agriculture", 100.0, 0.2)
    add_n("Livestock", "Agriculture", 100.0, 0.1)
    
    add_n("Food_Prices", "Food Security", 100.0, 0.1)
    add_n("Food_Availability", "Food Security", 100.0, 0.2)
    add_n("Food_Security_Index", "Food Security", 100.0, 0.1)
    
    add_n("Disease_Risk", "Public Health", 0.0, 0.3)
    add_n("Heat_Mortality", "Public Health", 0.0, 0.5)
    
    add_n("GDP", "Economy", 100.0, 0.05)
    add_n("Inflation", "Economy", 2.0, 0.2)
    add_n("Employment", "Economy", 95.0, 0.1)
    
    add_n("Migration", "Society", 0.0, 0.1)
    add_n("Poverty", "Society", 20.0, 0.05)
    add_n("Political_Stability", "Society", 100.0, 0.05)
    
    add_n("Disaster_Relief", "Policy", 0.0, 0.5)
    add_n("Subsidies", "Policy", 10.0, 0.2)
    add_n("Climate_Adaptation", "Policy", 10.0, 0.05)
    
    def add_e(src, tgt, strength, lag=1, conf=0.9):
        g.add_edge(Edge(src, tgt, strength, conf, lag, f"{src} to {tgt}"))
        
    add_e("Temperature", "Heatwave", 1.0, 1)
    add_e("Rainfall", "Drought", -1.0, 1)
    add_e("Rainfall", "Flood", 1.0, 1)
    add_e("Drought", "Wildfire", 0.5, 1)
    add_e("Heatwave", "Wildfire", 0.5, 1)
    
    add_e("Drought", "Reservoir_Levels", -0.5, 2)
    add_e("Drought", "Groundwater", -0.2, 4)
    add_e("Rainfall", "Reservoir_Levels", 0.5, 1)
    add_e("Reservoir_Levels", "Water_Stress", -0.5, 1)
    add_e("Heatwave", "Water_Stress", 0.5, 1)
    
    add_e("Water_Stress", "Crop_Yield", -0.8, 1)
    add_e("Heatwave", "Crop_Yield", -0.5, 1)
    add_e("Flood", "Crop_Yield", -0.6, 1)
    add_e("Water_Stress", "Livestock", -0.5, 1)
    add_e("Crop_Yield", "Food_Production", 0.7, 1)
    add_e("Livestock", "Food_Production", 0.3, 1)
    
    add_e("Food_Production", "Food_Availability", 1.0, 1)
    add_e("Food_Availability", "Food_Prices", -1.5, 1)
    add_e("Food_Prices", "Food_Security_Index", -0.8, 1)
    
    add_e("Flood", "Disease_Risk", 0.8, 1)
    add_e("Heatwave", "Heat_Mortality", 0.8, 1)
    
    add_e("Food_Prices", "Inflation", 0.5, 1)
    add_e("Inflation", "GDP", -0.5, 2)
    add_e("Crop_Yield", "GDP", 0.2, 1)
    add_e("GDP", "Employment", 0.8, 2)
    
    add_e("Food_Security_Index", "Poverty", -0.5, 1)
    add_e("Employment", "Poverty", -0.8, 1)
    add_e("Poverty", "Migration", 0.5, 2)
    add_e("Food_Security_Index", "Migration", -0.5, 2)
    add_e("Disease_Risk", "Migration", 0.3, 1)
    add_e("Migration", "Political_Stability", -0.6, 2)
    add_e("Poverty", "Political_Stability", -0.4, 2)
    
    add_e("Flood", "Disaster_Relief", 0.8, 1)
    add_e("Drought", "Subsidies", 0.5, 2)
    add_e("Disaster_Relief", "Poverty", -0.4, 1)
    add_e("Subsidies", "Food_Prices", -0.5, 1)
    
    return g

def run_scenarios():
    g = setup_graph()
    modules = [
        SystemModule("Climate", g, ["Temperature", "Rainfall", "Drought", "Heatwave", "Flood", "Wildfire"]),
        SystemModule("Water", g, ["Reservoir_Levels", "Groundwater", "Water_Stress"]),
        SystemModule("Agriculture", g, ["Crop_Yield", "Food_Production", "Livestock"]),
        SystemModule("Food Security", g, ["Food_Prices", "Food_Availability", "Food_Security_Index"]),
        SystemModule("Public Health", g, ["Disease_Risk", "Heat_Mortality"]),
        SystemModule("Economy", g, ["GDP", "Inflation", "Employment"]),
        SystemModule("Society", g, ["Migration", "Poverty", "Political_Stability"]),
        SystemModule("Policy", g, ["Disaster_Relief", "Subsidies", "Climate_Adaptation"])
    ]
    
    scenarios = {
        "Severe Drought": [(1, "Drought", 100.0)],
        "Multi-Year Drought": [(1, "Drought", 100.0), (5, "Drought", 100.0)],
        "Heatwave": [(1, "Heatwave", 100.0)],
        "Extreme Flood": [(1, "Flood", 100.0)],
        "Wildfire": [(1, "Wildfire", 100.0)],
        "Water Scarcity": [(1, "Water_Stress", 100.0)],
        "Crop Failure": [(1, "Crop_Yield", 0.0)],
        "Food Crisis": [(1, "Food_Prices", 200.0)],
        "Disease Outbreak": [(1, "Disease_Risk", 100.0)],
        "Climate Migration": [(1, "Migration", 100.0)],
        "Compound Event": [(1, "Heatwave", 100.0), (1, "Drought", 100.0)],
        "Cascading Disaster": [(1, "Flood", 100.0), (3, "Disease_Risk", 100.0), (5, "Migration", 100.0)]
    }
    
    exp = ExplainabilityFramework(g)
    results = {}
    
    for name, shocks in scenarios.items():
        sim = SimulationEngine(g, modules)
        sim.initialize()
        for t, node, val in shocks:
            sim.inject_shock(t, node, val)
            
        sim.run(15, stochastic=False) 
        
        trace = exp.trace_causality(sim.history, "Political_Stability", 10, depth=6)
        
        # We need historical values of all nodes to generate insights
        all_hist = {}
        for t in range(0, 16):
            all_hist[t] = sim.history.get_state(t)
            
        results[name] = {
            "end_stability": sim.history.get_node_value(15, "Political_Stability"),
            "trace": trace,
            "history": all_hist
        }
    
    with open("scenario_results.json", "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    run_scenarios()

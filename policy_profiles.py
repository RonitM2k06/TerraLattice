class PolicyProfile:
    def __init__(self, name, weights):
        self.name = name
        self.weights = weights

PROFILES = {
    "Economic_Growth": {"GDP": 0.45, "Employment": 0.25, "Food_Security": 0.15, "Health": 0.10, "Environment": 0.05},
    "Humanitarian": {"Lives_Saved": 0.40, "Food_Security": 0.25, "Health": 0.20, "Migration_Reduction": 0.10, "GDP": 0.05},
    "Environmental": {"Ecosystem_Health": 0.35, "Water_Security": 0.25, "Agriculture": 0.20, "Carbon_Impact": 0.10, "GDP": 0.10},
    "Balanced": {"GDP": 0.20, "Food_Security": 0.20, "Health": 0.20, "Environment": 0.20, "Social_Stability": 0.20}
}

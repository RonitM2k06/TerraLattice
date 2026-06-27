class UnitRegistry:
    def __init__(self):
        self.canonical_units = {
            "Temperature": "°C",
            "Rainfall": "mm",
            "GDP": "USD",
            "Population": "Count",
            "Index": "Index"
        }
        self.conversion_rules = {
            "Temperature": {"K": lambda x: x - 273.15, "°F": lambda x: (x - 32) * 5/9},
            "Rainfall": {"cm": lambda x: x * 10, "m": lambda x: x * 1000},
            "GDP": {"Million USD": lambda x: x * 1e6, "Billion USD": lambda x: x * 1e9}
        }

    def normalize(self, node_category: str, value: float, current_unit: str) -> float:
        if node_category not in self.canonical_units:
            return value
        if current_unit == self.canonical_units[node_category]:
            return value
        if current_unit in self.conversion_rules.get(node_category, {}):
            return self.conversion_rules[node_category][current_unit](value)
        raise ValueError(f"Unknown unit {current_unit} for category {node_category}")

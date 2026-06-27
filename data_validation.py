class DataValidator:
    def validate_statistical(self, data):
        # Z-Score and IQR outlier detection
        pass
        
    def validate_physical(self, node_type, value):
        bounds = {
            "Temperature": (-90, 60),
            "Relative Humidity": (0, 100),
            "Rainfall": (0, float('inf'))
        }
        if node_type in bounds:
            min_v, max_v = bounds[node_type]
            if not (min_v <= value <= max_v):
                return False
        return True

    def validate_temporal(self, timeseries):
        # Check discontinuities, sensor failures
        pass

class QualityScorer:
    def score_dataset(self, metadata: dict) -> float:
        score = 100.0
        if not metadata.get("completeness", True): score -= 20
        if not metadata.get("temporal_continuity", True): score -= 30
        if not metadata.get("unit_validity", True): score -= 15
        if not metadata.get("physical_validity", True): score -= 35
        return max(0.0, score)

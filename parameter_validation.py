from parameter_registry import ParameterRegistry
from parameter_loader import ParameterLoader
from graph import Graph

class ParameterValidator:
    def __init__(self, registry: ParameterRegistry):
        self.registry = registry
        
    def audit(self) -> dict:
        params = self.registry.get_all()
        report = {
            "total_parameters": len(params),
            "strongest_assumptions": [],
            "weakest_assumptions": [],
            "unsupported_edges": [],
            "missing_citations": [],
            "conflicting_literature": [],
            "evidence_breakdown": {}
        }
        
        for p in params:
            # Evidence breakdown
            report["evidence_breakdown"][p.evidence_level] = report["evidence_breakdown"].get(p.evidence_level, 0) + 1
            
            # Missing citations
            if not p.citation or p.citation.lower() == "placeholder" or p.citation == "":
                report["missing_citations"].append(p.parameter_id)
                
            # Unsupported / Expert estimated edges
            if p.status in ["Expert", "Estimated"] or p.evidence_level in ["Estimated", "Synthetic"]:
                report["unsupported_edges"].append(p.parameter_id)
                
            # Strongest / Weakest
            if p.confidence >= 0.9 and p.evidence_level in ["PeerReviewed", "GovernmentReport"]:
                report["strongest_assumptions"].append(p.parameter_id)
            elif p.confidence < 0.7 or p.evidence_level == "Estimated":
                report["weakest_assumptions"].append(p.parameter_id)
                
        return report

if __name__ == "__main__":
    registry = ParameterRegistry()
    loader = ParameterLoader("parameters")
    
    try:
        loader.load_parameters(registry)
        validator = ParameterValidator(registry)
        report = validator.audit()
        print("Parameter Validation Audit:")
        for k, v in report.items():
            print(f"{k}: {len(v) if isinstance(v, list) else v}")
    except Exception as e:
        print(f"Error validating: {e}")

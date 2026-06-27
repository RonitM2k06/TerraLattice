from dataclasses import dataclass
from typing import Dict, Any, Optional

@dataclass
class TimeSeries:
    timestamp: str
    source: str
    node_id: str
    value: float
    unit: str
    country: Optional[str]
    region: Optional[str]
    confidence: float
    metadata: Dict[str, Any]

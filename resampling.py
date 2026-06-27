from collections import defaultdict
from typing import List
from schemas.timeseries import TimeSeries
from datetime import datetime

class ResamplingLayer:
    def aggregate_to_quarterly(self, ts_list: List[TimeSeries]) -> List[TimeSeries]:
        quarters = defaultdict(list)
        for ts in ts_list:
            try:
                dt = datetime.fromisoformat(ts.timestamp)
                quarter = (dt.month - 1) // 3 + 1
                key = (dt.year, quarter, ts.node_id)
                quarters[key].append(ts)
            except Exception:
                continue
            
        aggregated = []
        for (year, quarter, node_id), items in quarters.items():
            avg_value = sum(item.value for item in items) / len(items)
            aggregated.append(TimeSeries(
                timestamp=f"{year}-Q{quarter}",
                source=items[0].source,
                node_id=node_id,
                value=avg_value,
                unit=items[0].unit,
                country=items[0].country,
                region=items[0].region,
                confidence=items[0].confidence,
                metadata=items[0].metadata
            ))
        return aggregated

import csv
from datetime import datetime
from typing import List
from schemas.timeseries import TimeSeries

class NOAAAdapter:
    def fetch(self, source_path: str) -> List[dict]:
        data = []
        try:
            with open(source_path, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    data.append(row)
        except Exception as e:
            print(f"Error reading NOAA data: {e}")
        return data

    def normalize(self, raw_data: List[dict]) -> List[dict]:
        normalized = []
        for row in raw_data:
            if 'DATE' in row:
                try:
                    date_obj = datetime.strptime(row['DATE'], "%Y-%m-%d")
                    normalized.append({
                        'timestamp': date_obj.isoformat(),
                        'tavg': float(row.get('TAVG', 0.0) or 0.0),
                        'prcp': float(row.get('PRCP', 0.0) or 0.0)
                    })
                except ValueError:
                    pass
        return normalized

    def validate(self, normalized_data: List[dict]) -> List[dict]:
        valid = []
        for row in normalized_data:
            if -90 <= row.get('tavg', 0) <= 60 and row.get('prcp', 0) >= 0:
                valid.append(row)
        return valid

    def to_timeseries(self, valid_data: List[dict]) -> List[TimeSeries]:
        ts_list = []
        for row in valid_data:
            ts_list.append(TimeSeries(
                timestamp=row['timestamp'],
                source='NOAA',
                node_id='Temperature',
                value=row['tavg'],
                unit='°C',
                country='Global',
                region='Global',
                confidence=0.95,
                metadata={'quality': 'high'}
            ))
            ts_list.append(TimeSeries(
                timestamp=row['timestamp'],
                source='NOAA',
                node_id='Rainfall',
                value=row['prcp'],
                unit='mm',
                country='Global',
                region='Global',
                confidence=0.90,
                metadata={'quality': 'high'}
            ))
        return ts_list

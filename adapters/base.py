from abc import ABC, abstractmethod

class BaseAdapter(ABC):
    @abstractmethod
    def fetch(self, source_path: str): pass
    @abstractmethod
    def normalize(self): pass
    @abstractmethod
    def validate(self): pass
    @abstractmethod
    def to_timeseries(self): pass

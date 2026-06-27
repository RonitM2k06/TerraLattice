# TerraLattice FastAPI Documentation

The backend is built with FastAPI and runs on port `8000`.

## Endpoints

### 1. `GET /api/graph/nodes`
Fetches the initial state of the planetary ontology nodes.
**Response**:
```json
[
  {
    "id": "Temperature",
    "category": "Climate",
    "value": 15.2,
    "confidence": 0.95
  }
]
```

### 2. `POST /api/simulation/run`
Executes a forward simulation.
**Payload**:
```json
{
  "quarters": 10,
  "shocks": [{"node": "Temperature", "magnitude": 1.5, "start": 2, "duration": 4}]
}
```

### 3. `GET /api/counterfactual/pareto`
Fetches the optimized Pareto Frontier of intervention policies.
**Response**:
```json
[
  {"id": "P1", "cost": 12, "benefit": 85, "confidence": "High"}
]
```

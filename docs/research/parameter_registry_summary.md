# Parameter Registry Summary

The `ParameterRegistry` is the new core memory of TerraLattice. It decouples the scientific assumptions from the time-stepping mathematics.

## Capabilities
1.  **Dynamic Loading**: Parses 16 domain-specific YAML files via `ParameterLoader`.
2.  **Validation**: Evaluates edges for missing citations and unsupported assumptions using `ParameterValidator`.
3.  **Monte Carlo Coupling**: The registry dynamically injects `confidence` scores into the `SimulationEngine`. The engine inversely maps confidence to variance: lower confidence edges mathematically generate wider probability distributions in stochastic scenarios.

## Current Registry State (Skeleton Graph)
*   **Loaded Nodes**: 24 (across 8 domains)
*   **Loaded Parameters**: 16 (Placeholder paths)
*   *Note: This structure sets the stage for Phase 5 Real-World Calibration.*

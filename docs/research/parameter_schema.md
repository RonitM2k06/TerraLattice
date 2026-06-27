# Parameter & Node Schema Documentation

TerraLattice is entirely data-driven. The structure of the simulation graph is dictated by two classes of YAML files in the `parameters/` directory.

## Node Schema (`*_nodes.yaml`)
Nodes represent stateful indicators.
*   **id**: Unique identifier string (e.g., `Crop_Yield`)
*   **name**: Human-readable name.
*   **category**: System domain (e.g., `Agriculture`).
*   **unit**: Measurement unit (`%`, `°C`, `Index`).
*   **baseline**: Initial starting value at $t_0$.
*   **minimum**: Floor boundary value.
*   **maximum**: Ceiling boundary value.
*   **volatility**: Standard deviation of intrinsic noise.
*   **mean_reversion**: Pull factor towards baseline (0.0 to 1.0).
*   **description**: Scientific definition of the node.
*   **data_source**: Origin of ground-truth data (e.g., `FAOSTAT`).
*   **calibration_status**: `Synthetic`, `Calibrated`, `Expert_Tuned`.

## Parameter Schema (`*_edges.yaml`)
Parameters govern the causal transition logic.
*   **parameter_id**: Unique ID (e.g., `CLIMATE_001`).
*   **source**: Origin node ID.
*   **target**: Destination node ID.
*   **strength**: Multiplier applied to source $\Delta$.
*   **confidence**: Epistemic certainty [0.0 - 1.0]. Low confidence increases Monte Carlo variance.
*   **lag**: Quarters before effect is fully realized.
*   **variance**: Intrinsic noise parameter for the edge.
*   **evidence_level**: `PeerReviewed`, `GovernmentReport`, `InternationalAgency`, `MetaAnalysis`, `ExpertKnowledge`, `Estimated`, `Synthetic`.
*   **citation**: Reference to the underlying research.
*   **status**: `Literature`, `Expert`, `Estimated`, `Learned`.
*   **last_updated**: Date string.

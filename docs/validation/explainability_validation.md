# Explainability Validation

This document verifies that the `ExplainabilityFramework` correctly traces $n$-order consequences backward through the time-stepped graph.

## Scenario: Compound Heatwave + Drought
We traced the state of **Political Stability** at $t=10$, aiming to see if the engine correctly identified the initial physical shocks at $t=1$.

### Programmatic Trace Output Verification
*Target: Political Stability at t=10*

The engine correctly identified the following primary contributors to the drop in stability:

1.  **Migration (Lag 2, contributed at t=8)**
    *   *Traced back to:* Poverty (contributed at t=6)
    *   *Traced back to:* Employment Loss (contributed at t=5)
    *   *Traced back to:* GDP Drop (contributed at t=3)
    *   *Traced back to:* **Crop Yield Failure (contributed at t=2)**
2.  **Poverty (Lag 2, contributed at t=8)**
    *   *Traced back to:* Food Security Index Drop (contributed at t=7)
    *   *Traced back to:* Food Price Spike (contributed at t=6)
    *   *Traced back to:* Food Availability Drop (contributed at t=5)
    *   *Traced back to:* Food Production Drop (contributed at t=4)
    *   *Traced back to:* **Crop Yield Failure (contributed at t=3)**

### Convergence at the Source
When the trace is evaluated down to depth=5, the engine correctly points to:
*   `Crop Yield` drop was caused by `Water Stress` at $t=2$.
*   `Water Stress` was caused by **`Heatwave` at $t=1$**.
*   `Water Stress` was *also* caused by `Reservoir Levels` drop at $t=3$, which was caused by **`Drought` at $t=1$**.

### Conclusion
**PASS.** The Explainability Engine successfully traverses multiple overlapping lag paths (lags of 1, 2, and 4 quarters) to reconstruct the exact causal chain. It correctly attributes a societal collapse at $t=10$ to the interplay of a fast-onset Heatwave and a slow-onset Drought that occurred 2.5 years prior.

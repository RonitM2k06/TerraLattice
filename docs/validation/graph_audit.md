# Graph Audit

An evaluation of the causal structure based on the Phase 1.5 test runs.

## Strongest Edges
1.  **Food Availability $\rightarrow$ Food Prices (Strength: -1.5)**: Extremely reliable, highly sensitive transmission mechanism that immediately impacts the economic system.
2.  **Flood $\rightarrow$ Disease Risk (Strength: 0.8, Lag: 1)**: Accurately represents the rapid physical reality of post-disaster sanitation collapse.

## Weakest Edges
1.  **Migration $\rightarrow$ Political Stability (Strength: -0.6)**: Highly contingent. Migration only causes instability if political institutions are already weak or xenophobia is high. This edge needs a non-linear threshold function in Phase 2, not a linear multiplier.
2.  **Poverty $\rightarrow$ Migration (Strength: 0.5)**: The poorest often cannot afford to migrate (trapped populations). This edge might actually be an inverted U-shape.

## Missing Edges
*   **Political Stability $\rightarrow$ Policy (Feedback Loop)**: When stability crashes, the government's ability to issue Disaster Relief should approach zero. Currently, a failed state can still issue perfect relief in the simulation.
*   **Inflation $\rightarrow$ Poverty**: High inflation acts as a regressive tax, directly destroying the purchasing power of the lowest deciles.

## Dangerous Feedback Loops
*   **Food Prices $\leftrightarrow$ Subsidies**: If Food Prices trigger Subsidies, but Subsidies artificially suppress prices while blowing up national debt (which hurts GDP, hurting Employment, increasing Poverty), the system can oscillate wildly.

## Unstable Propagation Paths
*   **The Groundwater Lag (Lag=4)**: Because groundwater takes 4 quarters to respond to drought, a multi-year stochastic run can result in groundwater continuing to drop *years* after rainfall has returned to normal, potentially causing a delayed "ghost" agricultural crisis. This is physically realistic but mathematically tricky if mean-reversion is too aggressive.

## Boundary Violations
*   Without careful tuning of intrinsic `volatility`, nodes like Political Stability frequently hit the `0.0` boundary floor during heavy stochastic runs and get "stuck" there. We need stronger mean-reverting gravity near boundaries.

# Module Validation

Validation of the independent System Modules during the Phase 1.5 runs.

## 1. Climate Module
*   **Strongest Behaviour**: Translating single physical variables (Rainfall) into divergent hazard risks (Drought vs Flood).
*   **Weakest Behaviour**: Lacks spatial granularity. A global "Temperature" node is too abstract.
*   **Missing Dependencies**: Ocean temperatures (ENSO/IOD) which are critical for multi-year forecasting.

## 2. Water Module
*   **Strongest Behaviour**: The distinct lag profiles between Reservoir Levels (fast response) and Groundwater (slow response).
*   **Unrealistic Responses**: Groundwater does not currently cap out gracefully; it relies too heavily on hard boundaries.

## 3. Agriculture Module
*   **Strongest Behaviour**: Serving as the central physical-to-economic bridge. Accurately aggregates heat, flood, and water stress into a single economic shock parameter (Yield).
*   **Missing Dependencies**: Fertilizer availability/prices and energy costs (tractors/irrigation pumps).

## 4. Food Security Module
*   **Strongest Behaviour**: Price elasticity modeling. Supply drops correctly cause massive, immediate price spikes.
*   **Weakest Behaviour**: Does not distinguish between caloric availability and nutritional quality (malnutrition).

## 5. Public Health Module
*   **Strongest Behaviour**: Immediate response to fast-onset shocks (floods causing waterborne disease).
*   **Missing Dependencies**: Health Infrastructure Capacity. Disease risk should be modulated by how robust the local hospitals are (which should be tied to GDP).

## 6. Economy Module
*   **Strongest Behaviour**: Okun's Law implementation (GDP drops causing lagged Employment drops).
*   **Unrealistic Responses**: Inflation currently has no upper bound, risking runaway hyperinflation in stochastic runs without central bank policy loops.

## 7. Society Module
*   **Strongest Behaviour**: Political Stability acts as the ultimate "sink" node, aggregating stress from migration, poverty, and food insecurity beautifully.
*   **Weakest Behaviour**: Migration is modeled as a simple volume; it needs to distinguish between internal displacement and cross-border refugees.

## 8. Policy Module
*   **Strongest Behaviour**: Acting as a negative feedback loop (e.g., Disaster Relief reducing Poverty).
*   **Missing Dependencies**: Policy implementation is currently instant. In reality, Subsidies and Relief take months (lag) to reach the ground.

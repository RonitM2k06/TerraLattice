# TerraLattice Ontology Audit

This audit evaluates the resilience, logic, and potential blind spots of the expanded 8-system graph ontology before simulation development begins.

## 1. Strongest Assumptions
*   **First-Order Physical Impacts:** The causal links from the Climate System (e.g., Rainfall deficit, Temperature anomalies) to the Water System (e.g., Reservoir Levels) and Agriculture System (e.g., Crop Yield) are deeply supported by agrometeorology and physical science.
*   **Economic Price Elasticity:** The relationship mapping Food Availability (Supply) to Food Prices is governed by well-established microeconomic principles and highly reliable historical data.
*   **Public Health Heat Impacts:** The direct causal link between severe Temperature anomalies and Heat Mortality (Public Health System) is robustly quantifiable via epidemiology.

## 2. Weakest Assumptions
*   **Social Stress to Political Stability:** The threshold at which Poverty, Food Security Index drops, and Social Stress trigger Political Instability is highly non-linear, historically contingent, and exceptionally difficult to parameterize globally.
*   **Migration Triggers:** Attributing Migration directly to specific economic or climate nodes versus pre-existing socio-political contexts involves high uncertainty (low `confidence` edges).
*   **Policy System Reactivity:** Assuming a rational, predictable, or immediate Policy System response (e.g., Subsidies, Disaster Relief) to specific shocks. Real-world policy operates with unpredictable lags and political biases.

## 3. Missing Nodes
*   **Energy/Power System:** Power generation capacity, energy prices, and fossil fuel/renewable dependency. This is crucial for understanding how droughts affect hydropower, or how heatwaves stress grid capacity.
*   **Infrastructure/Supply Chain:** Port operability, road network integrity. Floods and sea-level rise directly destroy logistics infrastructure, heavily amplifying Food Accessibility issues.
*   **Financial System/Credit:** Insurance defaults, sovereign debt yields. Extreme climate shocks can cause localized credit freezing or debt crises before GDP is broadly impacted.

## 4. Missing Feedback Loops
*   **Political Stability $\rightarrow$ Policy Implementation:** If Political Stability drops significantly, the government's capacity to implement Disaster Relief or Subsidies should decay, creating a vicious cycle.
*   **Migration $\rightarrow$ Public Health:** Mass migration typically increases Disease Risk and Health System Stress in receiving regions, which can then feed back into localized Social Stress.
*   **Agriculture Expansion $\rightarrow$ Climate/Water:** Decreased Crop Yields often lead to forced short-term irrigation (further reducing Groundwater) or deforestation (increasing Wildfire Probability and reducing future local Rainfall).

## 5. Potential Instability Risks (Simulation Mechanics)
*   **Runaway Inflation/Poverty Loops:** A shock to Food Prices might increase Poverty, reducing Consumer Spending, lowering GDP, which could (if mis-parameterized) further constrain Food Availability, spiraling without strong mean-reversion mechanics.
*   **Lag Misalignment:** Quarterly timesteps might be too coarse for rapid phenomena (e.g., flash floods causing immediate disease outbreaks) and too fine for slow variables (sea level rise). This temporal impedance mismatch could cause numerical oscillations in the graph.
*   **Boundary Collisions:** Without careful calibration of the `volatility` parameter and the implementation of robust `min/max bounds`, stochastic Monte Carlo runs might frequently peg variables at their absolute limits (e.g., 0% Political Stability or 100% Poverty) and become permanently stuck, breaking the simulation.

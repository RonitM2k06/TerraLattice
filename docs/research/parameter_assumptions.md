# Phase 1.5 Parameter Assumptions & Skeleton Graph Roadmap

This document catalogs the temporary edges established for the Planetary Validation Harness. These assumptions serve as the roadmap for rigorous Phase 2 calibration.

## Climate System Interfaces
| Source | Target | Strength | Confidence | Lag (Q) | Scientific Rationale | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Temperature (+) | Heatwave | 1.0 | 0.9 | 1 | Temperature anomalies directly force heatwave thresholds. | Placeholder |
| Rainfall (-) | Drought | -1.0 | 0.9 | 1 | Precipitation deficit is the primary driver of meteorological drought. | Placeholder |
| Rainfall (+) | Flood | 1.0 | 0.9 | 1 | Extreme precipitation drives fluvial and pluvial flooding. | Placeholder |
| Drought (+) | Wildfire | 0.5 | 0.8 | 1 | Dry fuel loads exponentially increase wildfire probability. | Placeholder |
| Heatwave (+) | Wildfire | 0.5 | 0.8 | 1 | High temperatures dry out biomass, compounding ignition risk. | Placeholder |

## Water System Interfaces
| Source | Target | Strength | Confidence | Lag (Q) | Scientific Rationale | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Drought (-) | Reservoir Levels | -0.5 | 0.9 | 2 | Sustained drought depletes surface water over several months. | Expert Assumption |
| Drought (-) | Groundwater | -0.2 | 0.8 | 4 | Groundwater recharge deficits lag significantly behind meteorological drought. | Expert Assumption |
| Rainfall (+) | Reservoir Levels | 0.5 | 0.9 | 1 | Runoff immediately replenishes surface water systems. | Placeholder |
| Reservoir Levels (-) | Water Stress | -0.5 | 0.9 | 1 | Depleted surface storage directly creates municipal and agricultural stress. | Placeholder |
| Heatwave (+) | Water Stress | 0.5 | 0.8 | 1 | Extreme heat increases evapotranspiration and demand, spiking stress. | Placeholder |

## Agriculture System Interfaces
| Source | Target | Strength | Confidence | Lag (Q) | Scientific Rationale | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Water Stress (-) | Crop Yield | -0.8 | 0.9 | 1 | Irrigation deficits directly reduce biomass accumulation in crops. | Literature (FAO) |
| Heatwave (-) | Crop Yield | -0.5 | 0.9 | 1 | Heat shocks during anthesis/flowering destroy reproductive tissue. | Literature (IPCC) |
| Flood (-) | Crop Yield | -0.6 | 0.8 | 1 | Inundation causes anoxia and physical destruction of crops. | Placeholder |
| Water Stress (-) | Livestock | -0.5 | 0.8 | 1 | Heat and lack of water directly impact herd health and weight. | Placeholder |
| Crop Yield (+) | Food Prod. | 0.7 | 0.9 | 1 | Yield is the primary determinant of aggregate food production volume. | Placeholder |
| Livestock (+) | Food Prod. | 0.3 | 0.9 | 1 | Pastoral outputs supplement baseline food production. | Placeholder |

## Food Security & Economic Interfaces
| Source | Target | Strength | Confidence | Lag (Q) | Scientific Rationale | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Food Prod. (+) | Food Avail. | 1.0 | 0.9 | 1 | Domestic production translates linearly to market availability. | Placeholder |
| Food Avail. (-) | Food Prices | -1.5 | 0.9 | 1 | Inelastic demand for staple foods means supply drops cause non-linear price spikes. | Literature (WB) |
| Food Prices (-) | Food Sec. Index| -0.8 | 0.9 | 1 | High prices directly price out the poorest deciles. | Placeholder |
| Food Prices (+) | Inflation | 0.5 | 0.8 | 1 | Food is a massive component of CPI in developing economies. | Placeholder |
| Inflation (-) | GDP | -0.5 | 0.8 | 2 | Sustained inflation destroys consumer spending and triggers rate hikes, slowing GDP. | Placeholder |
| Crop Yield (+) | GDP | 0.2 | 0.8 | 1 | Agriculture constitutes a direct component of GDP in agrarian economies. | Placeholder |
| GDP (+) | Employment | 0.8 | 0.8 | 2 | Economic contraction destroys jobs with a lag (Okun's Law). | Literature |

## Health, Society & Policy Interfaces
| Source | Target | Strength | Confidence | Lag (Q) | Scientific Rationale | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Flood (+) | Disease Risk | 0.8 | 0.8 | 1 | Stagnant water breeds vectors (cholera, malaria). | Expert Assumption |
| Heatwave (+) | Heat Mortality | 0.8 | 0.9 | 1 | Direct physiological limit breaches in vulnerable demographics. | Placeholder |
| Food Sec. (-) | Poverty | -0.5 | 0.8 | 1 | Lack of food security is a primary driver of multidimensional poverty. | Placeholder |
| Employment (-) | Poverty | -0.8 | 0.9 | 1 | Job loss immediately triggers income poverty. | Placeholder |
| Poverty (+) | Migration | 0.5 | 0.7 | 2 | Poverty acts as a push factor for internal migration, but requires threshold triggers. | Placeholder |
| Food Sec. (-) | Migration | -0.5 | 0.8 | 2 | Starvation is a direct migration push factor. | Placeholder |
| Disease Risk (+) | Migration | 0.3 | 0.7 | 1 | Severe outbreaks trigger rapid evacuation/flight. | Placeholder |
| Migration (-) | Pol. Stability | -0.6 | 0.7 | 2 | Rapid demographic shifts strain institutions and trigger xenophobic stress. | Literature |
| Poverty (-) | Pol. Stability | -0.4 | 0.8 | 2 | Sustained economic misery erodes trust in institutions. | Placeholder |
| Flood (+) | Disaster Relief | 0.8 | 0.9 | 1 | Sudden onset disasters immediately trigger policy spending. | Placeholder |
| Drought (+) | Subsidies | 0.5 | 0.8 | 2 | Slow onset disasters trigger lagged agricultural bailouts. | Placeholder |
| Relief (-) | Poverty | -0.4 | 0.8 | 1 | Cash transfers and aid mitigate extreme poverty spikes. | Placeholder |
| Subsidies (-) | Food Prices | -0.5 | 0.8 | 1 | Consumer subsidies artificially suppress market prices. | Placeholder |

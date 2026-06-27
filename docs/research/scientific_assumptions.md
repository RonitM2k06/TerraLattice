# Scientific Assumptions & Evidence

This document outlines the hierarchy of evidence that parameterizes TerraLattice.

## Evidence Hierarchy
1.  **PeerReviewed / MetaAnalysis**: The gold standard. Parameters backed by these citations (e.g., IPCC AR6) are assigned `confidence > 0.90` and treated as quasi-deterministic laws in the simulation.
2.  **InternationalAgency / GovernmentReport**: High reliability (e.g., World Bank, NOAA). Assigned `confidence` between `0.80 - 0.90`.
3.  **ExpertKnowledge**: Expert elicitation used where historical time-series data is sparse (e.g., Political Stability thresholds). Assigned `confidence` around `0.70`.
4.  **Estimated / Synthetic**: Used for bridging gaps where no data exists. Assigned low `confidence (< 0.50)` which forces high Monte Carlo variance, explicitly declaring the model's epistemic uncertainty.

## Decoupling Mechanism
By storing parameters externally and enforcing the `status` and `evidence_level` fields, TerraLattice distinguishes between:
*   *How reliable the physics/economics are* (Evidence Level)
*   *How the parameter entered the digital twin* (Status: Learned via algorithms vs. extracted from Literature).

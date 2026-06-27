# TerraLattice: A Climate-Economy-Society Digital Twin for Cascading Risk Simulation and Planetary Intelligence

## Research Vision
TerraLattice aims to model the complex, cascading risks that climate shocks pose to interconnected global systems. By shifting focus from isolated impact models to a holistic, graph-based causal network, this research-grade digital twin explores how localized climate anomalies propagate through agriculture, economic indicators, migration patterns, and societal stability. The goal is to answer critical "What if?" scenarios and observe n-order consequences, ultimately providing a foundation for planetary-scale intelligence.

## System Architecture
The architecture is purposefully decoupled from traditional web and software application constraints, prioritizing scientific fidelity and simulation capabilities.

1. **Core Simulation Engine**: A deterministic or stochastic time-stepping simulator that evaluates the state of all system modules at `t` to compute the state at `t+1`. The simulation operates on **quarterly timesteps**.
2. **System Modules**: The graph is decoupled into independent domain-specific modules (Climate, Water, Agriculture, Food Security, Public Health, Economy, Society, Policy). Each module owns a subset of nodes, imports dependencies, exports indicators, and defines its own internal update function.
3. **Graph Data Structure**: The underlying foundation of the system, storing indicators (nodes) and their causal linkages (edges) across all modules.
4. **Shock Generator**: A mechanism for injecting localized or global perturbations into the graph to initiate a simulation run.
4. **Data Ingestion & Calibration Pipeline**: Tools to initialize and calibrate the graph. We will build and test the mechanics with **synthetic data first**, before progressing to real-world calibration using data from the **World Bank, FAO, NOAA, NASA, and UN Data**.
5. **Analysis & Metrics Engine**: A layer to compute cascading effects, node volatility, and systemic risk scores.

## Phase 0.5: Expanded Graph Ontology
The world is represented as a directed causal graph.

### Node Schema
Every node in the graph must contain the following parameters:
*   **Category**: The systemic domain (e.g., Climate, Economic).
*   **Unit**: The standardized unit of measurement (e.g., °C, %, USD).
*   **Baseline Value**: The starting state value at time $t_0$.
*   **Volatility**: The intrinsic variance or noise parameter.
*   **Description**: A semantic definition of the indicator.

> [!NOTE]
> **Mechanics:** Nodes incorporate **min/max boundary constraints** and **mean reversion** to ensure variables do not spiral into physically impossible states (e.g., negative population) over long stochastic runs.

### Core Systems
1.  **Climate System**: Temperature, Rainfall, Drought Index, Flood Risk, Wildfire Probability, Sea Level Rise.
2.  **Water System**: Reservoir Levels, Groundwater, River Flow, Water Stress, Irrigation Capacity.
3.  **Agriculture System**: Crop Yield, Food Production, Water Availability, Livestock Health.
4.  **Food Security System**: Food Availability, Food Accessibility, Food Security Index, Malnutrition Risk.
5.  **Public Health System**: Disease Risk, Heat Mortality, Health System Stress.
6.  **Economic System**: Food Prices, Inflation, GDP, Employment, Consumer Spending.
7.  **Social System**: Migration, Poverty, Social Stress, Political Stability.
8.  **Policy System**: Subsidies, Disaster Relief, Import Controls, Carbon Tax.

### Edge Schema
Edges define how a change in node A affects node B over time. Every edge must contain:
*   **Strength**: The magnitude of the effect.
*   **Confidence**: The epistemic certainty of this relationship.
*   **Lag**: The time delay before the effect is realized (measured in quarters).
*   **Direction**: A → B.
*   **Rationale**: The theoretical, physical, or empirical justification for the linkage.

## Simulation Methodology
1.  **State Initialization**: Set baseline values for all nodes at time $t_0$ using synthetic distributions.
2.  **Shock Injection**: Apply external forcing to a subset of nodes (e.g., `Drought += 40%`).
3.  **Propagation**: At each quarter $t$:
    *   For each node $j$, its new value at time $t$ is a function of its current state and the states of all incoming nodes $i$ at time $t - \text{lag}_{ij}$. Nodes apply mean-reversion and bounds checks.
4.  **Stochasticity**: Introduce noise based on `confidence` and `volatility` to generate Monte Carlo ensembles.

## Explainability Framework
*   **Causal Tracing**: Log the exact path of propagation (e.g., Drought → Crop Yield → Food Prices → Social Stress).
*   **Contribution Attribution**: For any node $X$ at time $t$, quantify the exact percentage contribution of upstream nodes $Y$ and $Z$ to $X$'s variance.
*   **Counterfactual Analysis**: Run parallel simulations with a single edge dampened to isolate mechanisms.

## Calibration Strategy
*   **Expert Elicitation**: Initial priors and rationales for edges (especially social/policy).
*   **Time-Series Econometrics**: Using VAR or Granger Causality on historical datasets to derive edge strengths and lags.
*   **Bayesian Updating**: Adjusting edge parameters as new ground-truth data is ingested.

## Development Roadmap
*   **Phase 1: Core Engine & Ontology**: Implement the node/edge schemas, the mathematical quarter-stepping simulation loop with mean-reversion/bounds. (COMPLETED)
*   **Phase 1.5: Planetary Validation Harness**: Scientifically validate the core engine mechanics using a skeleton graph across 12 canonical scenarios before fully populating the ontology. Deliverables include scenario validation, module validation, graph audit, and explainability validation.
*   **Phase 2: Scientific Parameterization**: Built the registry and YAML decoupling. (COMPLETED)
*   **Phase 3: Planetary Data Ingestion & Calibration**: Build the infrastructure to ingest historical datasets, align them into a unified TimeSeries schema, and algorithmically learn edge parameters via statistical calibration (Pearson, Spearman, Granger Causality). (COMPLETED)
*   **Phase 4: Historical Replay Engine & Scientific Benchmarking**: Build the framework to reconstruct real planetary events, compute historical agreement scores across multiple metrics (Magnitude, Lag, Accuracy), and run automated root-cause failure analysis to find ontology/parameter gaps. (COMPLETED)
*   **Phase 5: Counterfactual Intervention Engine**: Transform TerraLattice into a planetary decision-support system that evaluates mitigating interventions through exhaustive deterministic search, optimizing for systemic resilience, and outputting fully explainable causal narratives. (COMPLETED)
*   **Phase 6: End-to-End Scientific Validation & System Integration**: Validate TerraLattice as a complete scientific platform by orchestrating all subsystems into one continuous master pipeline, running rigorous integration tests, stress tests, performance profiling, and generating a final Research Readiness Score. (COMPLETED)
*   **Scientific Execution Sprint**: Replace all structural placeholders with real science, calibrate real parameters, execute the integration tests, connect a real NOAA/NASA data adapter, and produce the final scientific validation outputs. (COMPLETED)
*   **Phase 7: TerraLattice Mission Control**: Build a professional research workstation frontend using Next.js 15, exposing the python backend seamlessly without modifying the scientific logic.

## Phase 7: TerraLattice Mission Control Architecture

To provide researchers with a unified operating environment, we will build a frontend UI. The objective is to expose the existing, frozen scientific Python backend without redesigning any of its logic.

### 1. Technology Stack
*   **Framework**: Next.js 15 (App Router), TypeScript, TailwindCSS
*   **State Management**: Zustand
*   **Visualization**: React Flow (for Knowledge Graph), Recharts (for telemetry/timelines), Framer Motion (for smooth micro-interactions).
*   **Design Language**: Dark, dense, professional scientific workstation (akin to Bloomberg Terminal or NASA Mission Control).

### 2. Workspace Layout
The UI will use a strict four-pane layout:
*   **Left (Mission Explorer)**: Navigational tree for Modules, Historical Events, Datasets, Policy Profiles, and the Counterfactual Library.
*   **Center (Tabbed Workspace)**: The primary interaction zone containing the Simulation Studio, Historical Replay Lab, Counterfactual Lab, Policy Optimizer, Knowledge Graph Explorer, and Research Library.
*   **Bottom (Scientific Console)**: Real-time stdout stream for Pipeline Logs, Warnings, Calibration Events, and Validation Messages.
*   **Right (Inspector)**: Deep-dive metadata pane for the currently selected Node/Edge, showing historical metadata, calibration statistics, evidence, and citations.

### 3. Backend Integration Strategy
The UI communicates with the frozen Python backend via a lightweight **FastAPI wrapper (`api.py`)**. No simulation logic will exist in the frontend; it strictly fetches data via HTTP requests to endpoints mapping to the existing simulation, historical replay, and policy optimization engines.

## Phase 7.1: Knowledge Graph Explorer Architecture

The Knowledge Graph Explorer is the flagship visualization of TerraLattice. It is not a generic diagram, but an interactive, highly-detailed representation of the planetary causal model.

### 1. Graph Layout & Modules
*   Nodes will be visually clustered into their distinct scientific **Modules** (Climate, Water, Agriculture, Food Security, Public Health, Economy, Society, Policy).
*   We will use `dagre` or a clustered force-directed layout to arrange the nodes logically from upstream (Climate) down to downstream (Economy/Society).

### 2. Custom Node Design (`CustomNode.tsx`)
*   **Visuals**: Nodes will be color-coded based on systemic health/stress (e.g., green=nominal, red=stressed).
*   **Data Display**: Surface level shows Name, Current Value, Trend, and Confidence.
*   **Hover State**: Reveals Description, Unit, Baseline, Volatility, and Calibration Status.

### 3. Custom Edge Design (`CustomEdge.tsx`)
*   **Visuals**: Edges will visually represent Strength (thickness/opacity), Lag, and Confidence.
*   **Animation**: When a simulation runs, edges will feature animated propagation (using SVG `strokeDasharray` and Framer Motion) to show the causal flow of shocks.
*   **Data Display**: Hovering reveals Evidence Level, Citation, and Calibration Method.

### 4. Inspector Integration
*   Selecting a node or edge via React Flow will update a Zustand store (`useGraphStore`).
*   The Right Pane (Inspector) will listen to this store and populate with deep-dive metadata, citations, DOIs, and historical sensitivity metrics fetched from the backend.

### 5. Filtering and Search
*   **`GraphFilters.tsx`**: Allow researchers to filter out edges/nodes by Module, Confidence Threshold, or Evidence Level.
*   **`GraphSearch.tsx`**: Global search input. Finding a node will center the React Flow viewport on it, highlight it, and open the Inspector.

## Phase 7.2: Simulation Studio Architecture

The Simulation Studio is the central application inside Mission Control, allowing researchers to build, execute, and analyze complex planetary scenarios without leaving the screen.

### 1. Workspace Layout
The Center Tabbed Workspace will be subdivided into four quadrants:
*   **Top Left (Scenario Builder)**: Forms to construct arbitrary planetary shocks (Increase, Decrease, Override) across all domains, complete with Duration and Start/End Quarters.
*   **Top Right (Simulation Controls)**: The execution dashboard containing Run, Pause, Resume, Reset, Speed, Quarter Selection, Monte Carlo/Deterministic toggles, and Seed controls.
*   **Bottom Left (Timeline Visualization)**: A complex Recharts overlay plotting GDP, Food Prices, Water Stress, Crop Yield, Migration, Health Stress, Temperature, and Rainfall simultaneously with zoom, pan, and brush support.
*   **Bottom Right (Simulation Summary)**: Real-time calculation of Peak Stress, Recovery Time, Critical Nodes, Systemic Risk Score, Cascade Depth, Largest Losses/Recoveries, and Propagation Length.

### 2. State & Synchronization
*   The `useGraphStore` will be expanded to encompass simulation state (`currentQuarter`, `isRunning`, `scenarioConfig`).
*   Running a simulation will synchronously animate the Knowledge Graph Explorer (showing causal flow), the Timeline (plotting the data), and the Scientific Console (streaming logs like `[SYS] Quarter 2: Food prices increased.`).
*   All state originates from the FastAPI backend; the frontend merely orchestrates the visual updates across all four quadrants.

### 3. Backend Integration
*   The frontend will submit a complex JSON payload representing the Scenario Configuration to `/api/simulation/run`.
*   We will rely exclusively on the existing `system_pipeline.py` and `simulation.py` logic. No calculations occur in the Next.js layer.
*   The API will return the full timestep history and explainability metrics (Primary causal chain, Most influential node, Contribution attribution).

### 4. Export Capabilities
*   An `ExportDialog.tsx` component will be added, allowing the researcher to download the final state as CSV, JSON, Markdown Report, or a saved YAML Configuration.

## Phase 7.3: Historical Replay Laboratory Architecture

The Historical Replay Laboratory is TerraLattice's scientific validation center, allowing researchers to compare planetary simulations against reality and conduct automated failure analysis.

### 1. Workspace Layout
The Center Tabbed Workspace will be subdivided into four synchronized panels:
*   **Top Left (Historical Event Library)**: Navigable list of supported events (2003 European Heatwave, Pakistan Floods, etc.) displaying Region, Years, Primary Hazard, Agreement Score, and Calibration Status.
*   **Top Right (Replay Controls)**: Playback hub for Play/Pause/Resume, Speed control, Deterministic/Monte Carlo toggles, and metadata inspection.
*   **Bottom Left (Comparison Timeline)**: A Recharts view plotting Observed History vs Simulated History vs Difference, utilizing uncertainty bands and difference views.
*   **Bottom Right (Replay Evaluation Dashboard)**: Outputs the Historical Agreement Score alongside Direction Accuracy, Magnitude Error, Lag Error, Recovery Error, Propagation Accuracy, and Cascade Depth.

### 2. Failure Analysis Panel
*   An expanding drawer or integrated tab (`FailureAnalysisPanel.tsx`) will automatically flag the largest prediction errors, identifying missing ontology, weak parameters, or low confidence datasets.
*   It will present actionable priorities for model improvement, treating model failure as a scientific finding rather than a bug.

### 3. Knowledge Graph Synchronization
*   Replaying an event will actively animate the global `KnowledgeGraphExplorer`.
*   Nodes experiencing historical anomalies will glow, and the causal propagation paths will pulse, matching the timestamp of the Replay Controls.

### 4. Explainability & Outputs
*   The API will provide observed vs. simulated causal chains to highlight the largest divergence in mechanisms.
*   Researchers can export `Replay Reports` containing Agreement Metrics and Failure Analysis to CSV, JSON, or Markdown.

## Phase 7.4: Counterfactual Laboratory Architecture

The Counterfactual Laboratory transforms TerraLattice into a scientific decision-support platform, allowing researchers to evaluate, compare, and optimize intervention portfolios.

### 1. Workspace Layout
The Center Tabbed Workspace will be subdivided into four synchronized panels:
*   **Top Left (Intervention Builder)**: Interfaces to construct intervention portfolios, exposing Start Quarter, Duration, Intensity, Region, Cost, and Expected Delay.
*   **Top Right (Portfolio Explorer)**: A sortable grid or list of evaluated portfolios (individual, pairs, triplets) detailing Cost, Benefit, Risk Reduction, and profile-specific scores.
*   **Bottom Left (Scenario Comparison)**: A synchronized Recharts timeline plotting the Baseline scenario vs the Selected Portfolio scenario with difference and uncertainty visualizations across multiple variables.
*   **Bottom Right (Decision Intelligence Dashboard)**: Displays overarching recommendations, Pareto ranks, dominated solutions, and multi-dimensional metrics (Lives Protected, GDP Preserved, Policy Cost).

### 2. Analytical Components
*   **Pareto Frontier (`ParetoFrontier.tsx`)**: An interactive scatter plot with selectable axes (e.g., Cost vs Humanitarian Benefit). Clicking a point updates the entire UI to reflect that specific portfolio.
*   **Sensitivity Analysis (`SensitivityPanel.tsx`)**: Visualizes backend sensitivity outputs (e.g., Tornado Charts, Confidence Distributions) to expose instability and parameter dependencies in the recommendations.

### 3. Knowledge Graph Synchronization
*   Evaluating a portfolio animates the `KnowledgeGraphExplorer`, highlighting suppressed cascades and policy influence paths.

### 4. Backend Integration
*   The UI relies purely on the existing `counterfactual_engine.py`, `policy_optimizer.py`, and `pareto_analysis.py`.
*   The Next.js frontend strictly fetches optimized JSON outputs and orchestrates the visualization.

## Phase 7.5: Research Library & Scientific Knowledge Center Architecture

The Research Library centralizes all scientific documentation, methodology, validation outputs, and calibration logic into a single navigable workspace. It completely abstracts raw markdown files away from the user, presenting structured metadata and rendered text via Next.js.

### 1. Workspace Layout
The Center Tabbed Workspace will be subdivided into four synchronized panels:
*   **Top Left (Research Navigator)**: A categorised tree view (Architecture, Methodology, Validation, etc.) with support for favoriting, bookmarking, and recent document tracking.
*   **Top Right (Document Viewer)**: A rich Markdown renderer supporting tables, math equations, code blocks, Mermaid diagrams, and internal linking.
*   **Bottom Left (Evidence Explorer)**: For the currently active document or parameter, displays Evidence Level, Citations, DOI links, and Calibration Status.
*   **Bottom Right (Document Metadata & Citation Inspector)**: A deep-dive panel that opens when a specific citation or parameter is selected, displaying the scientific rationale, literature summary, and related historical/counterfactual dependencies.

### 2. Full-Text Search Engine
*   A global `ResearchSearch.tsx` component will span across Markdown reports, YAML configurations, and the Parameter Registry.
*   The frontend relies on the backend to execute the search, providing module, evidence, and citation filtering to the user.

### 3. Knowledge Graph Integration
*   Clicking a node or edge in the global `KnowledgeGraphExplorer` will automatically open the associated methodology or calibration report inside the Document Viewer.

### 4. Backend Integration
*   The FastAPI layer (`api.py`) will be extended with `/api/research/library`, `/api/research/document`, `/api/research/evidence`, and `/api/research/search`.
*   The Python backend is strictly responsible for parsing the `.md` and `.yaml` files from the disk and serving them as JSON payloads. The frontend will never read from the disk directly.

## Phase 7.6: Global Intelligence Workspace Architecture

The Global Intelligence Workspace acts as the connective tissue of Mission Control. It unifies all modules via a Command Palette, providing universal search, global navigation history, and quick actions to make TerraLattice a cohesive scientific operating system.

### 1. Command Palette & Universal Search (`CommandPalette.tsx`, `UniversalSearch.tsx`)
*   **Trigger**: Accessed globally via `CTRL + K`.
*   **Capabilities**: Searches across Nodes, Edges, Documents, Historical Events, Counterfactual Portfolios, Scenarios, Datasets, and System Commands (e.g., "Run Simulation").
*   **Context Awareness**: The search index biases results based on the active tab (e.g., prioritizing historical events when inside the Replay Lab).

### 2. Global Navigation & Workspace History (`GlobalNavigation.tsx`, `WorkspaceHistory.tsx`)
*   **Activity Timeline**: Maintains a log of user actions (e.g., "Opened California Drought", "Compared Policy Portfolio") allowing researchers to jump backward through their analysis.
*   **Routing**: Selecting any search result will programmatically switch the active workspace (tab), center viewports, and populate inspectors, ensuring no loss of context.

### 3. Quick Actions
*   Right-clicking or interacting with elements across the UI will expose contextual actions (e.g., "Open in Graph", "Inspect Citation", "Run Counterfactual") that securely route data between the disparate modules.

### 4. Backend Integration
*   The `api.py` wrapper will be expanded to serve `/api/search`, `/api/commands`, `/api/navigation`, `/api/history`, and `/api/recent`.

## Phase 8: Production & Open Source Release Sprint Architecture

Phase 8 transforms TerraLattice from a completed research prototype into a production-quality, open-source research platform suitable for GitHub, graduate applications, publications, and portfolio review. No new scientific features will be added.

### 8.1 Repository Audit
*   **Action**: Perform a comprehensive audit identifying duplicate files, dead code, missing docstrings, and TODOs.
*   **Deliverable**: `TERRALATTICE_FINAL_AUDIT.md` (Severity, Location, Recommendation, Blocking status).

### 8.2 Repository Structure
*   **Action**: Reorganize all existing markdown reports (currently stored as artifacts or scattered) into a clean `docs/` hierarchy (`docs/architecture/`, `docs/research/`, `docs/validation/`, `docs/benchmarks/`, `docs/api/`, `docs/examples/`).
*   **Deliverable**: A structured `docs/` directory with all internal markdown links updated.

### 8.3 README Rewrite
*   **Action**: Completely rewrite the repository root `README.md`.
*   **Deliverable**: A professional, academic-grade README containing project overview, motivation, research novelty, architecture, scientific methodology, ontology, simulation/calibration pipelines, Mission Control, installation, Docker, API, benchmarks, roadmap, citation, and acknowledgements. Mermaid diagrams will be utilized instead of screenshots.

### 8.4 Engineering & CI/CD
*   **Action**: Standardize the repository for open-source contributors.
*   **Deliverables**: `Dockerfile`, `docker-compose.yml`, `.github/workflows/ci.yml`, `.pre-commit-config.yaml`, and `.editorconfig`. GitHub Actions will enforce pytest, frontend build, linting, and requirements installation.

### 8.5 Research Assets
*   **Action**: Generate all necessary open-source project metadata.
*   **Deliverables**: `CITATION.cff`, `LICENSE` (MIT/Apache 2.0), `CHANGELOG.md`, `CONTRIBUTING.md`, `ROADMAP.md`, `CODE_OF_CONDUCT.md`.

### 8.6 API Documentation
*   **Action**: Document the `api.py` FastAPI endpoints used by Mission Control.
*   **Deliverable**: `docs/api.md` (Request, Response, Example Payload, Example Output).

### 8.7 Benchmarks
*   **Action**: Perform profiling and performance analysis on the Python backend (Graph Traversal, Monte Carlo Runtime, Replay Runtime, Memory Usage).
*   **Deliverables**: `docs/benchmarks/benchmark_report.md` and `docs/benchmarks/performance_summary.md`.

### 8.8 Release Validation
*   **Action**: Run a completely clean, end-to-end validation (pytest, frontend production build, API startup) to guarantee reproducibility.
*   **Deliverable**: Ensure all checks pass without error.

### 8.9 Release Report
*   **Action**: Grade and finalize the release.
*   **Deliverable**: `TERRALATTICE_V1_RELEASE_REPORT.md` (Engineering, Documentation, Scientific, Usability, Reproducibility scores, Publication Readiness, Limitations, Future Work).

## User Review Required (Phase 8)
> [!IMPORTANT]
> The architectural plan for Phase 8 Production & Open Source Release is ready for review.

## Open Questions
> [!WARNING]
> 1. Which license should be applied in `LICENSE`? (e.g., MIT, Apache 2.0, GPL-3.0)
> 2. For the `CITATION.cff`, who should be listed as the primary author(s)? (e.g., "Ronit", or a specific full name/institution?)

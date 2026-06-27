# TerraLattice Final Repository Audit

| Severity | Location | Issue | Recommendation | Blocks Release? |
|----------|----------|-------|----------------|-----------------|
| Medium | `build_palette.py`, `build_research_lab.py` | Leftover build scripts from Phase 7 frontend generation | Move to `scripts/` or delete them before final push. | No |
| Low | `api.py` | Hardcoded return values for `/api/research/search` and other endpoints | Refactor to dynamically read from the `docs/` and `parameters/` directories | Yes |
| Medium | Root directory | Missing setup files for Python package (`pyproject.toml`) | Generate standard package metadata | Yes |
| High | `README.md` | Outdated or auto-generated Next.js README in `frontend/` | Rewrite root README and delete Next.js default README | Yes |
| Low | `.github/` | Missing CI workflows | Generate `ci.yml` for tests and linting | Yes |
| Low | `parameters/*.yaml` | Synthetic/Mock data | Real data adapters are implemented but YAMLs contain mock values for UI testing. | No (V1 can launch with synthetic baseline, noted in limitations) |

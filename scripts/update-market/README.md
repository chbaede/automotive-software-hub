# Automated Market Data Architecture (Phase 2 Roadmap)

This directory is reserved for future GitHub Actions background sync scripts that will update automotive stock tickers, market capitalizations, and sector indexes into static data files.

## High-Level Architecture

```text
Daily GitHub Action (Post-Market Close)
       │
       ├── 1. Query financial APIs (Yahoo Finance / Alpha Vantage / Financial Modeling Prep)
       ├── 2. Map tickers from `Company` static metadata (`src/types/company.ts`)
       ├── 3. Write cached market snapshot to `src/data/market.json`
       └── 4. Rebuild static site on GitHub Pages
```

## Static Integration Guarantee
No client-side runtime API calls or key leaks required; all market snapshots are baked into static JSON during the CI/CD build.


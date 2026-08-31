# Automated Automotive Software News Sync (Phase 2 Roadmap)

This directory is reserved for future RSS/Atom feed aggregation scripts that periodically curate automotive software engineering news, tech blogs, and release notes.

## High-Level Pipeline

```text
Every 6 Hours GitHub Action
       │
       ├── 1. Parse official RSS feeds (Eclipse SDV, COVESA, Yocto, AGL, Android Developers Blog)
       ├── 2. Categorize articles by `TopicId`
       ├── 3. Filter spam & marketing releases
       ├── 4. Generate `src/data/news.json` static snapshot
       └── 5. Trigger GitHub Pages deployment
```


# Automated Events Sync Architecture

This directory is reserved for future GitHub Actions scheduled workflows that will fetch and normalize upcoming automotive tech conferences, webinars, and meetups.

## Target Automated Pipeline

```text
Scheduled GitHub Action (e.g. Weekly)
       │
       ├── 1. Fetch public CFP & event feeds (RSS, JSON APIs, scrapers)
       ├── 2. Normalize schema against `Event` TypeScript definition (`src/types/event.ts`)
       ├── 3. Deduplicate events by `id` or slug
       ├── 4. Update static dataset `src/data/events.ts`
       └── 5. Commit changes & trigger GitHub Pages static rebuild
```

## Data Schema Compliance
All fetched event items must strictly conform to `Event` type in `src/types/event.ts`:
- `id` (slugified name + year)
- `name` (`LocalizedText`)
- `startDate` & `endDate` (`YYYY-MM-DD`)
- `city`, `country`, `region`
- `format`: `"conference" | "meetup" | "webinar" | "workshop"`
- `cfpStatus`: `"open" | "closed" | "upcoming" | "none"`


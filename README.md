# Automotive Software Hub 🚗💻

An open-source, production-ready static reference portal and developer start page for automotive software developers, embedded software engineers, SDV engineers, Android Automotive developers, Yocto/Linux developers, AUTOSAR engineers, and automotive tech professionals.

Hosted entirely on **GitHub Pages** with zero backend infrastructure required.

---

## 🌟 Key Features

- **Developer Utilities (100% In-Browser Execution)**:
  - 🛠️ **CAN ID Converter & J1939 Parser**: Decodes 11-bit Standard & 29-bit Extended CAN IDs (Priority, PGN, Source Address).
  - 📊 **CAN Frame Visualizer**: Interactive byte matrix inspector with bit-level signal breakdown.
  - 🔢 **Hex / Decimal / Binary Converter**: Multi-base converter with 8/16/32-bit word padding.
  - 🔄 **Endianness Converter**: Big-Endian (Motorola) vs Little-Endian (Intel) 16/32-bit byte swapper.
  - ⚡ **Bit Manipulation Calculator**: Register bit toggle switches & bitwise AND/OR/XOR/NOT mask generation.
  - 🛡️ **CRC Calculator**: AUTOSAR / SAE J1850 CRC-8, CCITT CRC-16, and IEEE 802.3 CRC-32 checksums.
  - ⏱️ **Unix Timestamp Converter**: Epoch seconds/milliseconds to ISO-8601 & local timezone.
  - 🔐 **Base64 Encoder / Decoder**: UTF-8 safe client-side Base64 converter.
  - 🔗 **URL Encoder / Decoder**: URI component percent-encoding utility.
  - 📜 **JSON Formatter & Validator**: Pretty format, minify, and syntax error line diagnostic tool.

- **Internationalization (i18n)**:
  - Default language: **English (`en`)**
  - First-class support for **Korean (`ko`)**
  - Language switcher in header with instant reactive UI updates without page reloads.
  - User preference stored in `localStorage`.

- **Information Hub Sections**:
  - **Tools**: Filterable by category (Automotive, Embedded, Linux, Network, General) and availability status.
  - **Resources & Standards**: Official documentation for AUTOSAR, Android Automotive OS, Yocto, SocketCAN, ISO 26262.
  - **Open Source Projects**: Ecosystem projects from Yocto Project, Automotive Grade Linux, Eclipse SDV, COVESA, ROS 2.
  - **Events & Conferences**: Upcoming & past summits, meetups, webinars, and Call for Papers (CFP) deadlines.
  - **Ecosystem Companies Directory**: OEMs, Tier 1 suppliers, semiconductor manufacturers, and software platform vendors.

- **Global Client-Side Search**:
  - Search across tools, resources, open-source repos, events, and companies with instant results (Cmd+K / Ctrl+K).

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/) (`BrowserRouter` with GitHub Pages SPA fallback)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **i18n**: React `LanguageContext` with localized text dictionaries (`LocalizedText`)
- **CI/CD**: GitHub Actions workflow (`.github/workflows/deploy.yml`)

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/automotive-software-hub.git
   cd automotive-software-hub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Validate static data schemas**:
   ```bash
   npm run validate-data
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 GitHub Pages Deployment

This site is built as a static web application.

### Automatic GitHub Actions Deploy

1. Push your repository to GitHub.
2. In your repository settings on GitHub, navigate to **Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The workflow in `.github/workflows/deploy.yml` will automatically validate data, compile the project, and deploy the `./dist` folder to GitHub Pages.

---

## 📁 Data Structure & Schemas

All hub data is stored in strongly typed static TypeScript files under `src/data/`:

```text
src/
├── data/
│   ├── taxonomy.ts     # Shared Topic Taxonomy (TopicId)
│   ├── tools.ts        # Developer Tools dataset
│   ├── resources.ts    # Official Documentation & Standards
│   ├── projects.ts     # Open Source Projects
│   ├── events.ts       # Industry Events & Conferences
│   └── companies.ts    # Ecosystem Directory
```

### 1. How to Add a Tool
Edit `src/data/tools.ts`:
```ts
{
  id: 'new-tool-id',
  name: { en: 'Tool Name', ko: '도구 이름' },
  description: { en: 'Tool description in English', ko: '한글 설명' },
  category: 'automotive', // 'automotive' | 'embedded' | 'linux' | 'network' | 'general'
  status: 'available',    // 'available' | 'planned'
  topics: ['can', 'autosar'],
  tags: ['hex', 'can'],
  componentKey: 'MyInteractiveToolComponent'
}
```

### 2. How to Add a Resource
Edit `src/data/resources.ts`:
```ts
{
  id: 'resource-id',
  name: { en: 'Resource Name', ko: '자료 이름' },
  description: { en: 'Description...', ko: '설명...' },
  category: 'documentation', // 'documentation' | 'tutorials' | 'standards' | 'cheat-sheets' | 'specifications'
  topics: ['sdv', 'yocto'],
  url: 'https://official-site.org/docs',
  source: 'Publisher Name',
  language: 'en',
  official: true
}
```

### 3. How to Add an Event
Edit `src/data/events.ts`:
```ts
{
  id: 'event-id-2026',
  name: { en: 'Event Name', ko: '행사 이름' },
  description: { en: 'Description...', ko: '설명...' },
  startDate: '2026-10-15',
  endDate: '2026-10-16',
  city: 'Munich',
  country: 'Germany',
  region: 'europe', // 'europe' | 'north-america' | 'asia-pacific' | 'online'
  url: 'https://event-website.com',
  categories: ['SDV', 'AUTOSAR'],
  topics: ['sdv', 'autosar'],
  format: 'conference', // 'conference' | 'meetup' | 'webinar' | 'workshop'
  cfpStatus: 'open',
  registrationStatus: 'open'
}
```

### 4. How to Add a Company
Edit `src/data/companies.ts`:
```ts
{
  id: 'company-id',
  name: 'Company Name',
  category: 'oem', // 'oem' | 'tier1' | 'semiconductor' | 'software-platform' | 'cloud-tech'
  description: { en: 'Overview...', ko: '개요...' },
  website: 'https://company.com',
  headquarters: 'City, Country',
  ticker: 'TICK',
  exchange: 'NASDAQ',
  isPublic: true,
  automotiveTopics: ['sdv', 'adas'],
  technologies: ['Tech A', 'Tech B'],
  tags: ['oem', 'sdv']
}
```

---

## 🌐 Translation Guide

UI translation strings are defined in:
- `src/i18n/en.ts` (English dictionary)
- `src/i18n/ko.ts` (Korean dictionary)

To add a new translation key:
1. Open `src/i18n/en.ts` and add the string under the appropriate section.
2. Open `src/i18n/ko.ts` and add the corresponding Korean string.
3. Access in components using `const { t } = useLanguage();` e.g., `t.nav.home`.

---

## 🔮 Future Architecture Roadmap (Phase 2)

Future sections will include automated background data update pipelines:
- **Market**: Automated daily stock market ticker snapshots (`scripts/update-market/`).
- **Jobs**: Automotive software engineering job aggregators.
- **News**: RSS/Atom news feed sync (`scripts/update-news/`).

All future data updates will run via scheduled GitHub Actions that commit static JSON snapshots to preserve 100% serverless GitHub Pages hosting.

---

## 📄 License & Disclaimer

Automotive Software Hub is an independent open community resource. It is not affiliated with, sponsored by, or endorsed by AUTOSAR, Yocto Project, Linux Foundation, Eclipse Foundation, COVESA, or any listed OEMs/suppliers.

Released under the MIT License.


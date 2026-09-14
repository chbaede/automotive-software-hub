export interface RouteMetadata {
  path: string; // empty string for root '/'
  fullPath: string; // e.g. '/', '/stack', '/companies/strategy'
  priority: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  title: {
    en: string;
    ko: string;
  };
  description: {
    en: string;
    ko: string;
  };
}

export const CANONICAL_STATIC_ROUTES: RouteMetadata[] = [
  {
    path: '',
    fullPath: '/',
    priority: '1.0',
    changefreq: 'weekly',
    title: {
      en: 'Automotive Software Hub — SDV, AUTOSAR, AAOS & Embedded Linux Portal',
      ko: 'Automotive Software Hub — 오토모티브 SDV, AUTOSAR & 리눅스 개발자 포털',
    },
    description: {
      en: 'Open developer portal for automotive software engineers, SDV architects, AUTOSAR developers, and embedded Linux engineers.',
      ko: '차량용 소프트웨어 엔지니어, SDV 아키텍트, AUTOSAR 및 임베디드 리눅스 개발자를 위한 통합 포털.',
    },
  },
  {
    path: 'stack',
    fullPath: '/stack',
    priority: '0.95',
    changefreq: 'weekly',
    title: {
      en: 'Architecture Stack Explorer — Automotive Software Hub',
      ko: '차량 소프트웨어 아키텍처 스택 탐색기 — Automotive Software Hub',
    },
    description: {
      en: 'Interactive 10-layer automotive software architecture stack graph featuring SoCs, Hypervisors, RTOS, AUTOSAR, and SDV Middleware.',
      ko: 'SoC, 하이퍼바이저, RTOS, AUTOSAR 및 SDV 미들웨어를 아우르는 10계층 차량 소프트웨어 아키텍처 스택.',
    },
  },
  {
    path: 'architectures',
    fullPath: '/architectures',
    priority: '0.90',
    changefreq: 'weekly',
    title: {
      en: 'Automotive E/E & Software Architecture Profiles — Automotive Software Hub',
      ko: '차량 E/E 및 소프트웨어 아키텍처 프로파일 — Automotive Software Hub',
    },
    description: {
      en: 'Curated reference architectures: Central Zonal Compute, Cockpit & IVI, Safety ADAS, AUTOSAR Classic/Adaptive, and SDV Cloud-Native.',
      ko: '중앙 집중형 Zonal 컴퓨팅, 콕핏 IVI, 안전 ADAS, AUTOSAR 클래식/어댑티브 및 SDV 클라우드 네이티브 레퍼런스 아키텍처.',
    },
  },
  {
    path: 'stack-builder',
    fullPath: '/stack-builder',
    priority: '0.90',
    changefreq: 'weekly',
    title: {
      en: 'Interactive Automotive Stack Builder (Beta) — Automotive Software Hub',
      ko: '인터랙티브 차량 소프트웨어 스택 빌더 (Beta) — Automotive Software Hub',
    },
    description: {
      en: 'Compose custom automotive software stacks layer-by-layer with real-time architectural validation, compatibility scoring, and what-if analysis.',
      ko: '실시간 아키텍처 검증, 호환성 스코어링 및 What-if 분석을 통해 계층별 맞춤형 차량 소프트웨어 스택을 구성하는 대화형 빌더.',
    },
  },
  {
    path: 'tools',
    fullPath: '/tools',
    priority: '0.90',
    changefreq: 'monthly',
    title: {
      en: 'Interactive Protocol Developer Tools (CAN, SOME/IP, CRC) — Automotive Software Hub',
      ko: '차량용 프로토콜 개발자 도구 (CAN, SOME/IP, CRC) — Automotive Software Hub',
    },
    description: {
      en: 'In-browser automotive protocol developer tools: CAN Frame Visualizer, CAN ID Converter, SOME/IP Message Inspector, CRC Calc, and Endianness Converter.',
      ko: '웹 브라우저 기반 CAN 프레임 시각화, CAN ID 변환기, SOME/IP 메세지 분석기, CRC 계산기 및 엔디안 변환 도구.',
    },
  },
  {
    path: 'resources',
    fullPath: '/resources',
    priority: '0.85',
    changefreq: 'weekly',
    title: {
      en: 'Automotive Standards & Developer Documentation — Automotive Software Hub',
      ko: '오토모티브 기술 표준 & 개발자 문서 레퍼런스 — Automotive Software Hub',
    },
    description: {
      en: 'Curated technical reference documentation for AUTOSAR Classic/Adaptive, COVESA VSS, ISO 26262, ISO 21434, AAOS, and SocketCAN.',
      ko: 'AUTOSAR 클래식/어댑티브, COVESA VSS, ISO 26262, ISO 21434, AAOS 및 SocketCAN 기술 문서 모음.',
    },
  },
  {
    path: 'open-source',
    fullPath: '/open-source',
    priority: '0.85',
    changefreq: 'monthly',
    title: {
      en: 'Automotive Open Source Projects (AAOS, AGL, ROS 2, Apollo) — Automotive Software Hub',
      ko: '차량용 오픈소스 프로젝트 디렉토리 (AAOS, AGL, ROS 2, Apollo) — Automotive Software Hub',
    },
    description: {
      en: 'Comprehensive directory of open-source automotive software projects: AAOS, AGL, Eclipse SDV, ROS 2 Autoware, Baidu Apollo, and Linux Kernel.',
      ko: 'AAOS, AGL, Eclipse SDV, ROS 2 Autoware, 바이두 아폴로 및 리눅스 커널 등 차량용 핵심 오픈소스 프로젝트 디렉토리.',
    },
  },
  {
    path: 'events',
    fullPath: '/events',
    priority: '0.80',
    changefreq: 'weekly',
    title: {
      en: 'Automotive Industry Events & Conferences 2026 — Automotive Software Hub',
      ko: '2026 오토모티브 컨퍼런스 & 기술 행사 캘린더 — Automotive Software Hub',
    },
    description: {
      en: 'Verified schedule of global 2026 automotive events: COVESA, AUTOSAR Open Conference, AGL AMM, Automotive IQ Cyber Security, InCabin, and Linux Summit.',
      ko: 'COVESA, AUTOSAR 오픈 컨퍼런스, AGL AMM, Automotive IQ 사이버 보안 서밋 등 2026년 검증된 기술 행사 일정.',
    },
  },
  {
    path: 'companies',
    fullPath: '/companies',
    priority: '0.80',
    changefreq: 'monthly',
    title: {
      en: 'Automotive Ecosystem & Startup Directory (OEM, Tier 1, SoC, Korean Tech) — Automotive Software Hub',
      ko: '글로벌 오토모티브 기업 & 한국 테크 스타트업 디렉토리 — Automotive Software Hub',
    },
    description: {
      en: 'Global automotive company ecosystem directory covering OEMs, Tier 1 suppliers, semiconductor fabless vendors, QNX/Wind River, and Korean Tech Startups.',
      ko: '완성차(OEM), 티어 1 부품사, 차량용 반도체 팹리스, 전장 SW 기업 및 한국 오토모티브 테크 스타트업 디렉토리.',
    },
  },
  {
    path: 'companies/strategy',
    fullPath: '/companies/strategy',
    priority: '0.85',
    changefreq: 'weekly',
    title: {
      en: 'OEM & Tech SDV / EV Strategy Intelligence Roadmaps — Automotive Software Hub',
      ko: '완성차 및 테크 기업 SDV·EV 전략 인텔리전스 로드맵 — Automotive Software Hub',
    },
    description: {
      en: 'Strategic intelligence on vehicle OS (MB.OS, ccOS, Arene, Neue Klasse), zonal compute architectures, and electrification roadmaps synthesized from official IR disclosures.',
      ko: '공식 분기 IR 및 인베스터 데이 공시를 바탕으로 분석한 차량용 OS, Zonal 컴퓨팅 및 전동화 마일스톤 기술 인텔리전스.',
    },
  },
  {
    path: 'about',
    fullPath: '/about',
    priority: '0.70',
    changefreq: 'monthly',
    title: {
      en: 'About Automotive Software Hub — Mission & Architecture',
      ko: 'Automotive Software Hub 소개 — 비전 및 아키텍처',
    },
    description: {
      en: 'Learn about the mission, open architecture vision, and developer community driving Automotive Software Hub.',
      ko: 'Automotive Software Hub의 개방형 차량 소프트웨어 아키텍처 비전과 기술 로드맵 소개.',
    },
  },
];

export const ROUTE_SEO_MAP: Record<
  string,
  { title: { en: string; ko: string }; description: { en: string; ko: string } }
> = CANONICAL_STATIC_ROUTES.reduce((acc, route) => {
  acc[route.fullPath] = {
    title: route.title,
    description: route.description,
  };
  return acc;
}, {} as Record<string, { title: { en: string; ko: string }; description: { en: string; ko: string } }>);

// Alias /strategy to /companies/strategy for SEO
ROUTE_SEO_MAP['/strategy'] = ROUTE_SEO_MAP['/companies/strategy'];

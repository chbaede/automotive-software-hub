import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const routeSeoMap: Record<
  string,
  { title: { en: string; ko: string }; description: { en: string; ko: string } }
> = {
  '/': {
    title: {
      en: 'Automotive Software Hub — SDV, AUTOSAR, AAOS & Embedded Linux Portal',
      ko: 'Automotive Software Hub — 오토모티브 SDV, AUTOSAR & 리눅스 개발자 포털',
    },
    description: {
      en: 'Open developer portal for automotive software engineers, SDV architects, AUTOSAR developers, and embedded Linux engineers.',
      ko: '차량용 소프트웨어 엔지니어, SDV 아키텍트, AUTOSAR 및 임베디드 리눅스 개발자를 위한 통합 포털.',
    },
  },
  '/stack': {
    title: {
      en: 'Architecture Stack Explorer — Automotive Software Hub',
      ko: '차량 소프트웨어 아키텍처 스택 탐색기 — Automotive Software Hub',
    },
    description: {
      en: 'Interactive 10-layer automotive software architecture stack graph featuring SoCs, Hypervisors, RTOS, AUTOSAR, and SDV Middleware.',
      ko: 'SoC, 하이퍼바이저, RTOS, AUTOSAR 및 SDV 미들웨어를 아우르는 10계층 차량 소프트웨어 아키텍처 스택.',
    },
  },
  '/tools': {
    title: {
      en: 'Interactive Protocol Developer Tools (CAN, SOME/IP, CRC) — Automotive Software Hub',
      ko: '차량용 프로토콜 개발자 도구 (CAN, SOME/IP, CRC) — Automotive Software Hub',
    },
    description: {
      en: 'In-browser automotive protocol developer tools: CAN Frame Visualizer, CAN ID Converter, SOME/IP Message Inspector, CRC Calc, and Endianness Converter.',
      ko: '웹 브라우저 기반 CAN 프레임 시각화, CAN ID 변환기, SOME/IP 메세지 분석기, CRC 계산기 및 엔디안 변환 도구.',
    },
  },
  '/resources': {
    title: {
      en: 'Automotive Standards & Developer Documentation — Automotive Software Hub',
      ko: '오토모티브 기술 표준 & 개발자 문서 레퍼런스 — Automotive Software Hub',
    },
    description: {
      en: 'Curated technical reference documentation for AUTOSAR Classic/Adaptive, COVESA VSS, ISO 26262, ISO 21434, AAOS, and SocketCAN.',
      ko: 'AUTOSAR 클래식/어댑티브, COVESA VSS, ISO 26262, ISO 21434, AAOS 및 SocketCAN 기술 문서 모음.',
    },
  },
  '/open-source': {
    title: {
      en: 'Automotive Open Source Projects (AAOS, AGL, ROS 2, Apollo) — Automotive Software Hub',
      ko: '차량용 오픈소스 프로젝트 디렉토리 (AAOS, AGL, ROS 2, Apollo) — Automotive Software Hub',
    },
    description: {
      en: 'Comprehensive directory of open-source automotive software projects: AAOS, AGL, Eclipse SDV, ROS 2 Autoware, Baidu Apollo, and Linux Kernel.',
      ko: 'AAOS, AGL, Eclipse SDV, ROS 2 Autoware, 바이두 아폴로 및 리눅스 커널 등 차량용 핵심 오픈소스 프로젝트 디렉토리.',
    },
  },
  '/events': {
    title: {
      en: 'Automotive Industry Events & Conferences 2026 — Automotive Software Hub',
      ko: '2026 오토모티브 컨퍼런스 & 기술 행사 캘린더 — Automotive Software Hub',
    },
    description: {
      en: 'Verified schedule of global 2026 automotive events: COVESA, AUTOSAR Open Conference, AGL AMM, Automotive IQ Cyber Security, InCabin, and Linux Summit.',
      ko: 'COVESA, AUTOSAR 오픈 컨퍼런스, AGL AMM, Automotive IQ 사이버 보안 서밋 등 2026년 검증된 기술 행사 일정.',
    },
  },
  '/companies': {
    title: {
      en: 'Automotive Ecosystem & Startup Directory (OEM, Tier 1, SoC, Korean Tech) — Automotive Software Hub',
      ko: '글로벌 오토모티브 기업 & 한국 테크 스타트업 디렉토리 — Automotive Software Hub',
    },
    description: {
      en: 'Global automotive company ecosystem directory covering OEMs, Tier 1 suppliers, semiconductor fabless vendors, QNX/Wind River, and Korean Tech Startups.',
      ko: '완성차(OEM), 티어 1 부품사, 차량용 반도체 팹리스, 전장 SW 기업 및 한국 오토모티브 테크 스타트업 디렉토리.',
    },
  },
  '/about': {
    title: {
      en: 'About Automotive Software Hub — Mission & Roadmap',
      ko: 'Automotive Software Hub 소개 — 비전 및 로드맵',
    },
    description: {
      en: 'Learn about the mission, open architecture vision, and developer community driving Automotive Software Hub.',
      ko: 'Automotive Software Hub의 개방형 차량 소프트웨어 아키텍처 비전과 기술 로드맵 소개.',
    },
  },
};

export const useSEO = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const currentPath = location.pathname || '/';
    const seoData = routeSeoMap[currentPath] || routeSeoMap['/'];

    const langKey = language === 'ko' ? 'ko' : 'en';
    const pageTitle = seoData.title[langKey];
    const pageDesc = seoData.description[langKey];

    // Update document title
    document.title = pageTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDesc);
    }

    // Update Open Graph title & description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    }
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', pageDesc);
    }
  }, [location.pathname, language]);
};


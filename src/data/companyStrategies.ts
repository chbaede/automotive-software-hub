import { CompanyStrategyInsight } from '../types/strategy';

export const companyStrategies: CompanyStrategyInsight[] = [
  {
    companyId: 'mercedes-benz',
    companyName: 'Mercedes-Benz Group AG',
    category: 'oem',
    headquarters: 'Stuttgart, Germany',
    ticker: 'MBG',
    exchange: 'XETRA',
    irUrl: 'https://group.mercedes-benz.com/investors/',
    latestEventOrReport: {
      en: 'Mercedes-Benz Strategy Update (MB.OS Launch Architecture) & Annual Financial Reports',
      ko: '메르세데스-벤츠 전략 업데이트 (MB.OS 양산 아키텍처) 및 연례 경영 실적 보고서',
    },
    matrixSummary: {
      sdvOs: {
        en: 'MB.OS (Chip-to-Cloud)',
        ko: 'MB.OS (칩-투-클라우드)',
      },
      eeZonal: {
        en: '4 Central Domains + Zonal',
        ko: '4대 도메인 제어기 + Zonal 구조',
      },
      evPlatform: {
        en: 'MMA (800V) & MB.EA',
        ko: 'MMA (800V) 및 MB.EA 플랫폼',
      },
    },
    sdvArchitecture: {
      en: 'Proprietary MB.OS (Chip-to-Cloud architecture) decoupling hardware and software lifecycles. Features dedicated high-performance computing clusters with NVIDIA SoC, Google Cloud navigation integration, and Unity real-time 3D graphics.',
      ko: '하드웨어와 소프트웨어 수명 주기를 분리하는 자체 개발 칩-투-클라우드 MB.OS 아키텍처. 엔비디아 고성능 컴퓨팅 SoC, 구글 지도 내비게이션 연동, 유니티 실시간 3D 그래픽 엔진 탑재.',
    },
    eeZonalArchitecture: {
      en: 'Consolidation into 4 core domain controllers: Infotainment, Autonomous Driving (ADAS), Body & Comfort, and Driving & Charging. High-speed multi-Gigabit Ethernet backbone with zonal power and gateway distribution.',
      ko: '4대 핵심 도메인 제어기(인포테인먼트, 자율주행 ADAS, 바디/컴포트, 구동/충전)로 통합. 초고속 멀티 기가비트 이더넷 백본 및 영역(Zonal) 전원/게이트웨이 분산 구조.',
    },
    evPlatformStrategy: {
      en: 'MMA (Mercedes Modular Architecture) launching with the new CLA-Class (800V architecture, 750km+ WLTP range, silicon-oxide anode chemistry), followed by dedicated MB.EA (Medium & Large) and AMG.EA performance architectures.',
      ko: '신형 CLA부터 적용되는 MMA(메르세데스 모듈러 아키텍처, 800V 고전압, WLTP 750km+ 주행거리, 실리콘 옥사이드 음극재) 출시 후, 중대형 전용 MB.EA 및 고성능 AMG.EA로 확장.',
    },
    autonomousDrivingAi: {
      en: 'First certified commercial Level 3 Drive Pilot (operating up to 95 km/h on German Autobahns and certified in Nevada/California). Deploying next-gen Level 2++ on MMA vehicles powered by NVIDIA DRIVE Orin and LiDAR.',
      ko: '세계 최초 상용 인증 레벨 3 Drive Pilot(독일 아우토반 최고 95km/h 운행 및 미국 네바다/캘리포니아 인증). 신형 MMA 기반 모델에 엔비디아 오린(Orin) 및 라이다 탑재 레벨 2++ 대규모 양산.',
    },
    softwareMonetization: {
      en: 'Targeting over €1 billion in software-enabled EBIT by 2026, transitioning to lifetime and subscription navigation, entertainment, and ADAS feature packages over-the-air.',
      ko: '2026년까지 소프트웨어 기반 EBIT 10억 유로 이상 창출 목표. OTA를 통한 내비게이션, 엔터테인먼트, 고급 ADAS 기능의 평생 구독 및 패키지 수익화 모델 구축.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Market debut of first production MB.OS vehicle family on MMA platform (New CLA Coupe).',
          ko: 'MMA 플랫폼 기반 첫 번째 MB.OS 탑재 양산 모델(신형 CLA 쿠페) 글로벌 출시.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Introduction of MB.EA dedicated luxury EV platform and 95 km/h Drive Pilot L3 speed expansion.',
          ko: 'MB.EA 럭셔리 전용 전기차 플랫폼 투입 및 레벨 3 Drive Pilot 최고속도 95km/h 상향 상용화.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Complete portfolio transition readiness to all-electric and fully OTA-updatable vehicle fleet.',
          ko: '전 라인업 100% 전기차 및 전 영역 무선 OTA 지원 지능형 차량 전환 준비 완료.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Mercedes-Benz Capital Market Days & Strategy Updates",
          ko: "메르세데스-벤츠 캐피털 마켓 데이 및 전략 업데이트",
        },
        url: "https://group.mercedes-benz.com/investors/events/capital-market-days/",
        sourceType: "capital-markets-day",
        role: "latest",
        publishedDate: "2024-02-22",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Mercedes-Benz Group Official Investor Relations Portal",
          ko: "메르세데스-벤츠 그룹 공식 IR 포털",
        },
        url: "https://group.mercedes-benz.com/investors/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-07-26",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'tesla',
    companyName: 'Tesla, Inc.',
    category: 'oem',
    headquarters: 'Austin, Texas, USA',
    ticker: 'TSLA',
    exchange: 'NASDAQ',
    irUrl: 'https://ir.tesla.com/',
    latestEventOrReport: {
      en: 'Tesla Shareholder Deck & "We, Robot" Autonomous Mobility Event',
      ko: '테슬라 공식 주주 서한 및 "We, Robot" 자율주행 로보택시 공개 행사',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Tesla OS (Custom Linux)',
        ko: 'Tesla OS (자체 리눅스 기반)',
      },
      eeZonal: {
        en: '3 Zonal ECUs + 48V Bus',
        ko: '3개 Zonal ECU + 48V 전력망',
      },
      evPlatform: {
        en: 'Unboxed / Cybercab',
        ko: '언박스드 공정 / Cybercab 플랫폼',
      },
    },
    sdvArchitecture: {
      en: 'Vertically integrated Linux OS stack with complete in-house middleware, sensor fusion, and neural network runtime. Over-the-air firmware updates update every micro-controller across powertrain, thermal, safety, and infotainment.',
      ko: '자체 개발 리눅스 OS, 미들웨어, 센서 퓨전, 신경망 런타임의 수직 통합 스택. 파워트레인, 열관리, 안전, 인포테인먼트 등 전 영역 마이크로컨트롤러까지 100% 무선 OTA 펌웨어 업데이트 지원.',
    },
    eeZonalArchitecture: {
      en: 'Pioneer of central zonal compute: 3 zone controllers (Front, Left, Right) managing power distribution, sensor aggregation, and actuation, combined with 48V low-voltage architecture and Gigabit Ethernet communication.',
      ko: '중앙 영역(Zonal) 컴퓨팅의 선구자: 3개 존 제어기(전방, 좌측, 우측)가 전력 분배 및 센서/액추에이터 통합 관리. 사이버트럭 기준 48V 저전압 시스템 및 기가비트 이더넷 통신 전면 도입.',
    },
    evPlatformStrategy: {
      en: 'Next-Generation "Unboxed" vehicle platform delivering ~50% manufacturing cost reduction, structural 4680 battery packs, and dedicated Cybercab robotaxi platform without steering wheel or pedals.',
      ko: '제조 비용을 약 50% 절감하는 차세대 "언박스드(Unboxed)" 플랫폼, 4680 구조용 배터리 팩, 스티어링 휠과 페달이 없는 순수 로보택시 사이버캡(Cybercab) 전용 플랫폼.',
    },
    autonomousDrivingAi: {
      en: 'End-to-End Neural Network (FSD V12/V13) replacing over 300,000 lines of heuristic C++ code with unified camera-to-control deep learning models trained on massive Cortex supercomputing GPU clusters.',
      ko: '30만 줄 이상의 휴리스틱 C++ 코드를 카메라 영상에서 조향/가감속 제어까지 단일 딥러닝 모델로 처리하는 End-to-End 신경망(FSD V12/V13) 전면 전환. 코어텍스(Cortex) 대규모 GPU 클러스터 기반 학습.',
    },
    softwareMonetization: {
      en: 'Recurring high-margin revenues via FSD monthly subscription packages, Supercharger network access, in-car premium connectivity, and future Cybercab ride-hailing fleet service fee.',
      ko: 'FSD 월간 구독, 슈퍼차저 충전 네트워크 개방 수익, 차량 내 프리미엄 커넥티비티, 향후 자율주행 사이버캡 승차 공유 플랫폼 수수료 기반 고마진 반복 매출 창출.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Unsupervised Full Self-Driving rollout targeted in Texas and California; Launch of affordable next-gen EV model.',
          ko: '텍사스 및 캘리포니아 내 감독 없는 완전자율주행(Unsupervised FSD) 승인 목표 및 보급형 차세대 모델 출시.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Volume production kickoff of dedicated Cybercab autonomous vehicle.',
          ko: '스티어링 휠 없는 전용 자율주행차 사이버캡(Cybercab) 대량 양산 개시.',
        },
      },
      {
        year: '2028',
        milestone: {
          en: 'Commercial scaling of autonomous Robotaxi ride-hailing fleet worldwide.',
          ko: '글로벌 로보택시 자율주행 승차 공유 상용 네트워크 대규모 확장.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Tesla Investor Press Releases & Strategic Disclosures",
          ko: "테슬라 투자자 프레스 릴리스 및 공식 기업 공시",
        },
        url: "https://ir.tesla.com/press",
        sourceType: "press-release",
        role: "latest",
        publishedDate: "2025-01-29",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Tesla Official Investor Relations Portal & Shareholder Disclosures",
          ko: "테슬라 공식 IR 포털 및 주주 공시",
        },
        url: "https://ir.tesla.com/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-10-23",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'hyundai-motor-group',
    companyName: 'Hyundai Motor Group',
    category: 'oem',
    headquarters: 'Seoul, South Korea',
    ticker: '005380',
    exchange: 'KRX',
    irUrl: {
      en: 'https://www.hyundai.com/worldwide/en/company/ir',
      ko: 'https://www.hyundai.com/worldwide/ko/company/ir',
    },
    latestEventOrReport: {
      en: 'Hyundai CEO Investor Day ("Hyundai Way") & HMG SDV Tech Day',
      ko: '현대 CEO 인베스터 데이 ("현대 웨이") 및 HMG SDV 테크 데이',
    },
    matrixSummary: {
      sdvOs: {
        en: 'ccOS & 42dot Pleos',
        ko: 'ccOS 및 42dot Pleos OS',
      },
      eeZonal: {
        en: 'HPVC + Zone Controllers',
        ko: 'HPVC + 통합 영역(Zone) 제어기',
      },
      evPlatform: {
        en: 'IMA (13 segments)',
        ko: 'IMA 2세대 전기차 플랫폼 (13개 차급)',
      },
    },
    sdvArchitecture: {
      en: 'Two-track operating system strategy: deploying Connected Car Operating System (ccOS) across current volume production, while 42dot leads the development of next-generation unified SDV OS (Pleos) with cloud-native microservices.',
      ko: '투트랙 운영체제 전략: 양산 라인업에는 ccOS(Connected Car OS)를 순차 배포하고, 글로벌 소프트웨어 센터 포티투닷(42dot)을 통해 차세대 클라우드 네이티브 통합 SDV OS(Pleos) 개발 가속화.',
    },
    eeZonalArchitecture: {
      en: 'Migration to High-Performance Vehicle Computer (HPVC) and Zone Controllers by 2025-2026, eliminating hundreds of distributed ECUs and reducing vehicle wiring harness weight and complexity by over 30%.',
      ko: '2025-2026년까지 고성능 차량용 컴퓨터(HPVC)와 영역별 존 컨트롤러(Zone Controller) 체계로 전환. 수백 개의 분산 ECU를 통합하고 와이어링 하네스 무게와 복잡성을 30% 이상 경감.',
    },
    evPlatformStrategy: {
      en: 'Expansion of dedicated E-GMP electric platform alongside development of next-generation IMA (Integrated Modular Architecture) covering 13 models across compact, medium, and large SUV/pickup segments.',
      ko: '전용 전기차 E-GMP 플랫폼 확장 및 경형부터 대형 SUV/픽업까지 13개 차급을 아우르는 차세대 승용/상용 통합 모듈러 아키텍처 IMA(Integrated Modular Architecture) 개발.',
    },
    autonomousDrivingAi: {
      en: 'Commercial rollout of Highway Driving Assist (HDA 2/3) and collaboration with Motional on Ioniq 5 Robotaxi (Level 4 commercial deployment in the US).',
      ko: '고속도로 주행 보조(HDA 2/3) 상용화 및 자율주행 합작법인 모셔널(Motional)과 협력하여 아이오닉 5 로보택시(레벨 4) 미국 시장 상용 서비스 전개.',
    },
    softwareMonetization: {
      en: 'FoD (Features on Demand) marketplace expansion, connected fleet data monetization, and continuous performance/battery OTA upgrades.',
      ko: '구독형 서비스 FoD(Features on Demand) 마켓플레이스 확대, 상용 커넥티드 차량 관제 데이터 수익화 및 무선 OTA 배터리/출력 튜닝 서비스.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: '100% of new Hyundai/Kia/Genesis vehicle launches equipped with OTA update capability.',
          ko: '현대/기아/제네시스 전 신차 라인업 100% 무선 OTA 업데이트 기본 탑재.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Launch of first dedicated SDV Pace Car featuring 42dot unified OS and HPVC zonal architecture.',
          ko: '포티투닷 통합 SDV OS 및 HPVC 존 아키텍처를 최초 탑재한 SDV 페이스카(Pace Car) 양산.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Annual global target of 2 million EV sales and 5.55 million total vehicles underpinned by IMA platform.',
          ko: 'IMA 차세대 플랫폼 기반 연간 글로벌 전기차 200만 대 및 총 555만 대 판매 달성.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Hyundai CEO Investor Day (\"Hyundai Way\") Strategic Presentation",
          ko: "현대자동차 CEO 인베스터 데이 (\"Hyundai Way\") 공식 전략 발표",
        },
        url: "https://www.hyundai.com/worldwide/en/company/ir/ir-resources/ceo-investor-day",
        sourceType: "investor-presentation",
        role: "latest",
        publishedDate: "2024-08-28",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Hyundai Motor Company Official Investor Relations Portal",
          ko: "현대자동차 공식 IR 웹 포털",
        },
        url: "https://www.hyundai.com/worldwide/en/company/ir",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-08-28",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'bmw-group',
    companyName: 'BMW Group',
    category: 'oem',
    headquarters: 'Munich, Germany',
    ticker: 'BMW',
    exchange: 'XETRA',
    irUrl: 'https://www.bmwgroup.com/en/investor-relations.html',
    latestEventOrReport: {
      en: 'BMW Group Annual Conference & Neue Klasse Architecture Milestones',
      ko: 'BMW 그룹 연례 컨퍼런스 및 노이에 클라쎄 아키텍처 마일스톤',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Neue Klasse 4 Super-Brains',
        ko: '노이에 클라쎄 4대 슈퍼브레인 OS',
      },
      eeZonal: {
        en: '4 Super-Brains Compute',
        ko: '4개 고성능 슈퍼브레인 중앙 컴퓨팅',
      },
      evPlatform: {
        en: 'Neue Klasse 800V Gen6',
        ko: '노이에 클라쎄 800V 6세대 eDrive',
      },
    },
    sdvArchitecture: {
      en: 'BMW Operating System 8.5/9 (Android Automotive based) transitioning into the revolutionary Neue Klasse software architecture powered by 4 centralized "Super-Brains" high-performance computers.',
      ko: '안드로이드 오토모티브 기반 BMW OS 8.5/9에서 4개의 중앙 고성능 컴퓨터 "슈퍼 브레인(Super-Brains)"으로 제어되는 차세대 노이에 클라세(Neue Klasse) 소프트웨어 아키텍처로 도약.',
    },
    eeZonalArchitecture: {
      en: 'Neue Klasse 4 Super-Brains: Driving Dynamics Super-Brain ("Heart of Joy" integrating powertrain and dynamic chassis control), Automated Driving Super-Brain, Infotainment Super-Brain, and Vehicle Functions/Body Super-Brain.',
      ko: '노이에 클라세 4대 슈퍼 브레인: 구동과 섀시를 단일 처리하는 드라이빙 다이내믹스 컴퓨터("Heart of Joy"), 자율주행 컴퓨터, 인포테인먼트 컴퓨터, 차체/전장 제어 컴퓨터로 극대화된 영역 통합.',
    },
    evPlatformStrategy: {
      en: 'Dedicated 800V Neue Klasse electric architecture featuring Gen6 round lithium-ion battery cells (+30% range, +30% charging speed, -50% pack production cost) and bidirectional DC charging.',
      ko: '6세대 원통형 리튬이온 배터리(+30% 주행거리, +30% 충전속도 향상, 팩 제조원가 50% 절감) 및 양방향 충전을 지원하는 800V 전용 노이에 클라세 전기차 아키텍처.',
    },
    autonomousDrivingAi: {
      en: 'Level 2+ Highway Assistant with active eye-activated lane change, and certified Level 3 Personal Pilot operating on BMW 7 Series in Germany. Co-developing next-generation automated driving with Qualcomm Snapdragon Ride.',
      ko: '시선 유도 자동 차선 변경을 지원하는 레벨 2+ 고속도로 어시스턴트 및 BMW 7시리즈 탑재 인증 레벨 3 Personal Pilot. 퀄컴 스냅드래곤 라이드(Ride) 기반 차세대 자율주행 공동 개발.',
    },
    softwareMonetization: {
      en: 'BMW ConnectedDrive Store offering on-demand digital upgrades, gaming/video streaming subscriptions, and adaptive driving dynamics packages.',
      ko: 'BMW ConnectedDrive 스토어를 통한 디지털 온디맨드 기능 활성화, 게임/비디오 스트리밍 구독, 어댑티브 섀시 튜닝 패키지 판매.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Start of production (SOP) of first Neue Klasse EV model at the new Debrecen plant in Hungary.',
          ko: '헝가리 데브레첸 신공장에서 첫 번째 노이에 클라세 SAV 전기차 모델 양산 개시.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Start of Neue Klasse sedan production at Munich home plant.',
          ko: '독일 뮌헨 본사 공장에서 노이에 클라세 순수 전기 세단 양산 돌입.',
        },
      },
      {
        year: '2028',
        milestone: {
          en: 'Rollout of at least 6 Neue Klasse models globally within 24 months.',
          ko: '24개월 내 전 세계 시장에 최소 6종 이상의 노이에 클라세 패밀리 모델 투입.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "BMW Group Annual Financial & Corporate Reports",
          ko: "BMW 그룹 연간 재무 및 기업 보고서",
        },
        url: "https://www.bmwgroup.com/en/investor-relations/company-reports.html",
        sourceType: "annual-report",
        role: "latest",
        publishedDate: "2024-03-21",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "BMW Group Official Investor Relations Portal",
          ko: "BMW 그룹 공식 IR 포털",
        },
        url: "https://www.bmwgroup.com/en/investor-relations.html",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-03-21",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "BMW Group Innovation & Neue Klasse Architecture Portal",
          ko: "BMW 그룹 이노베이션 및 노이어 클라세 기술 포털",
        },
        url: "https://www.bmwgroup.com/en/innovation.html",
        sourceType: "official-website",
        role: "supporting",
        publishedDate: "2024-03-21",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'volkswagen-group',
    companyName: 'Volkswagen Group (CARIAD)',
    category: 'oem',
    headquarters: 'Wolfsburg, Germany',
    ticker: 'VOW3',
    exchange: 'XETRA',
    irUrl: 'https://www.volkswagen-group.com/en/investor-relations',
    latestEventOrReport: {
      en: 'Volkswagen Group Capital Markets Day & Rivian Joint Venture Announcement',
      ko: '폭스바겐 그룹 캐피털 마켓 데이 및 리비안(Rivian) 전략적 합작법인 발표',
    },
    matrixSummary: {
      sdvOs: {
        en: 'E3 1.2 / Rivian JV E3 2.0',
        ko: 'E3 1.2 / 리비안 합작 E3 2.0',
      },
      eeZonal: {
        en: 'Rivian-style Zonal Stack',
        ko: '리비안 협력 영역(Zonal) 아키텍처',
      },
      evPlatform: {
        en: 'PPE / SSP Platform',
        ko: 'PPE 및 차세대 SSP 통합 플랫폼',
      },
    },
    sdvArchitecture: {
      en: 'E3 1.2 software platform currently in volume production on Porsche Macan EV & Audi Q6 e-tron. Partnering with Rivian through a $5B joint venture to co-develop next-generation E3 2.0 SDV platform using Rivian\'s proven zonal software stack.',
      ko: '포르쉐 마칸 EV 및 아우디 Q6 e-트론에 탑재된 E3 1.2 소프트웨어 플랫폼 양산. 차세대 E3 2.0 SDV 아키텍처는 리비안(Rivian)과의 50억 달러 합작법인을 통해 리비안의 검증된 존 소프트웨어 스택을 기반으로 공동 개발.',
    },
    eeZonalArchitecture: {
      en: 'Transition from distributed domains to Rivian-inspired 3-to-4 zonal controller topology, vastly simplifying ECU complexity, reducing wire harness mass, and enabling continuous OTA code deployment across brands.',
      ko: '과거 분산 도메인 방식에서 탈피하여 리비안 방식의 3~4개 존 제어기 토폴로지로 신속 전환. ECU 복잡성을 대폭 낮추고 그룹 산하 전 브랜드에 걸친 상시 OTA 배포 체계 구축.',
    },
    evPlatformStrategy: {
      en: 'PPE (Premium Platform Electric) for luxury marques, MEB+ for volume models, and future unified SSP (Scalable Systems Platform) designed to underpin millions of group vehicles across all segments.',
      ko: '프리미엄 브랜드를 위한 PPE(Premium Platform Electric), 대중차를 위한 MEB+, 그리고 향후 전 세그먼트에 걸쳐 수백만 대를 통합할 차세대 통합 SSP(Scalable Systems Platform) 전개.',
    },
    autonomousDrivingAi: {
      en: 'Partnering with Mobileye (SuperVision & Chauffeur automated driving solutions) and CARIZON joint venture with Horizon Robotics in China for localized intelligent driving solutions.',
      ko: '모빌아이(SuperVision 및 Chauffeur 자율주행 솔루션)와 장기 파트너십 구축 및 중국 시장 공략을 위한 지평선(Horizon Robotics)과의 합작법인 카리존(CARIZON) 설립.',
    },
    softwareMonetization: {
      en: 'Group-wide digital ecosystem monetization including Cariad software licensing to third parties and brand-specific digital cockpit store subscriptions.',
      ko: '그룹 산하 브랜드 디지털 콕핏 스토어 구독 서비스 및 CARIAD 소프트웨어 라이선스 생태계 구축을 통한 소프트웨어 매출 다각화.',
    },
    strategicTargets: [
      {
        year: '2024',
        milestone: {
          en: 'Market launch of E3 1.2 platform with Android Automotive OS in Audi Q6 e-tron and Porsche Macan EV.',
          ko: '아우디 Q6 e-트론 및 포르쉐 마칸 EV를 통한 E3 1.2 플랫폼 및 안드로이드 기반 OS 시장 안착.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'First production vehicles utilizing joint venture software architecture developed with Rivian.',
          ko: '리비안 합작법인(JV)에서 공동 개발한 차세대 소프트웨어 아키텍처 기반 첫 양산차 출시.',
        },
      },
      {
        year: '2028',
        milestone: {
          en: 'Introduction of Scalable Systems Platform (SSP) unified software-defined vehicle architecture.',
          ko: '소프트웨어 정의 차량 전용 단일 통합 플랫폼 SSP(Scalable Systems Platform) 본격 도입.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Volkswagen Group Corporate Press Releases & Strategic Announcements",
          ko: "폭스바겐 그룹 공식 보도자료 및 전략 공시",
        },
        url: "https://www.volkswagen-group.com/en/press-releases",
        sourceType: "press-release",
        role: "latest",
        publishedDate: "2024-06-25",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Volkswagen Group Official Investor Relations Portal",
          ko: "폭스바겐 그룹 공식 IR 포털",
        },
        url: "https://www.volkswagen-group.com/en/investor-relations",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-06-25",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "CARIAD Official Software Architecture Portal",
          ko: "CARIAD 공식 소프트웨어 아키텍처 포털",
        },
        url: "https://cariad.technology/",
        sourceType: "official-website",
        role: "supporting",
        publishedDate: "2024-06-25",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'toyota-motor',
    companyName: 'Toyota Motor Corporation (Woven by Toyota)',
    category: 'oem',
    headquarters: 'Toyota, Aichi, Japan',
    ticker: '7203',
    exchange: 'TSE',
    irUrl: 'https://global.toyota/en/ir/',
    latestEventOrReport: {
      en: 'Toyota Financial Results Briefing & Workshop "Let\'s Change the Future of Cars"',
      ko: '토요타 회계연도 실적 브리핑 및 기술 워크숍 "자동차의 미래를 바꾸자"',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Arene OS (Woven)',
        ko: 'Arene OS (우븐 플래닛 자체 개발)',
      },
      eeZonal: {
        en: 'Central E/E + Giga-casting',
        ko: '중앙 집중형 E/E + 기가캐스팅',
      },
      evPlatform: {
        en: 'Next-Gen BEV (Solid-State)',
        ko: '차세대 BEV 전용 플랫폼 (전고체 배터리)',
      },
    },
    sdvArchitecture: {
      en: 'Arene OS developed by Woven by Toyota: an integrated vehicle software operating system, simulation pipeline, and developer SDK designed to accelerate automotive software development and verification.',
      ko: '우븐 바이 토요타(Woven by Toyota)가 개발하는 아레네(Arene) OS: 차량용 운영체제, 가상 시뮬레이션 파이프라인, 개발자 SDK를 아우르는 소프트웨어 개발 및 검증 통합 플랫폼.',
    },
    eeZonalArchitecture: {
      en: 'Centralized E/E architecture coordinated with modular gigacasting vehicle body manufacturing. Drastic reduction in internal electronic connectors and centralized software execution.',
      ko: '3분할 기가캐스팅(Giga-casting) 차체 공법과 연계된 중앙 집중식 E/E 아키텍처. 내부 전장 커넥터와 케이블을 획기적으로 줄이고 중앙 소프트웨어 제어로 통합.',
    },
    evPlatformStrategy: {
      en: 'Next-generation BEV platform launching in 2026 with new software OS, paired with multi-pathway powertrain approach (BEV, PHEV, FCEV, Hydrogen ICE) and commercialization of solid-state batteries targeted for 2027-2028.',
      ko: '신규 OS와 결합된 차세대 BEV 플랫폼을 2026년 출시하고, 멀티 패스웨이(전기차, 플러그인, 수소연료전지, 수소엔진) 전략 유지 및 2027-2028년 전고체 배터리 상용화 추진.',
    },
    autonomousDrivingAi: {
      en: 'Toyota Teammate Advanced Drive / Park systems, continuous safety data feedback via cloud-connected fleet, and Arene Virtual validation tools for automated driving algorithms.',
      ko: '토요타 팀메이트(Toyota Teammate) 고도화 주행/주차 시스템, 커넥티드 차량 주행 데이터 클라우드 피드백 및 아레네 가상 검증 도구를 통한 자율주행 알고리즘 고도화.',
    },
    strategicTargets: [
      {
        year: '2026',
        milestone: {
          en: 'Launch of next-generation BEV line-up powered by Arene OS with 1.5 million annual EV capacity.',
          ko: '아레네(Arene) OS를 탑재한 차세대 전기차 라인업 출시 및 연간 150만 대 생산 체제 구축.',
        },
      },
      {
        year: '2027',
        milestone: {
          en: 'Commercial production launch of all-solid-state battery EV with 10-minute fast charging.',
          ko: '10분 초급속 충전을 지원하는 전고체 배터리 탑재 양산형 전기차 상용 출시.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Target 3.5 million annual battery electric vehicles across Toyota and Lexus brands.',
          ko: '토요타 및 렉서스 브랜드 합산 연간 350만 대 순수 배터리 전기차 판매 목표 달성.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Toyota Financial Results & Management Briefings Archive",
          ko: "토요타 실적 발표 및 경영 브리핑 아카이브",
        },
        url: "https://global.toyota/en/ir/financial-results/",
        sourceType: "investor-presentation",
        role: "latest",
        publishedDate: "2024-05-08",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Toyota Motor Corporation Official Investor Relations Portal",
          ko: "토요타 자동차 공식 IR 포털",
        },
        url: "https://global.toyota/en/ir/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-05-08",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Woven by Toyota Official Software & Arene Platform Portal",
          ko: "Woven by Toyota 공식 소프트웨어 및 Arene 플랫폼 포털",
        },
        url: "https://woven.toyota/en/",
        sourceType: "official-website",
        role: "supporting",
        publishedDate: "2024-05-08",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'nvidia',
    companyName: 'NVIDIA Corporation',
    category: 'semiconductor',
    headquarters: 'Santa Clara, California, USA',
    ticker: 'NVDA',
    exchange: 'NASDAQ',
    irUrl: 'https://investor.nvidia.com/',
    latestEventOrReport: {
      en: 'NVIDIA GTC Automotive Keynote & Quarterly Earnings Presentation',
      ko: '엔비디아 GTC 오토모티브 기조연설 및 분기 실적 발표',
    },
    matrixSummary: {
      sdvOs: {
        en: 'DRIVE Thor & Blackwell',
        ko: 'DRIVE Thor & 블랙웰(Blackwell)',
      },
      eeZonal: {
        en: 'DRIVE Thor Central Brain',
        ko: 'DRIVE Thor 중앙 집중 슈퍼컴퓨팅',
      },
      evPlatform: {
        en: 'Global OEM EV Stacks',
        ko: '글로벌 OEM 맞춤형 EV 솔루션',
      },
    },
    sdvArchitecture: {
      en: 'NVIDIA DRIVE platform: End-to-End automotive software and silicon stack. Introduces DRIVE Thor SoC delivering 2,000 TFLOPS of FP8 compute on Blackwell GPU architecture, unifying Cockpit, Cluster, and Autonomous Driving on a single processor.',
      ko: '엔비디아 DRIVE 플랫폼: 엔드투엔드 오토모티브 실리콘 및 소프트웨어 스택. 블랙웰(Blackwell) 아키텍처 기반 2,000 TFLOPS FP8 성능의 DRIVE Thor SoC를 통해 인포테인먼트, 계기판, 자율주행을 단일 칩으로 통합.',
    },
    eeZonalArchitecture: {
      en: 'Central Supercomputer architecture: Thor acts as the centralized brain communicating with zonal edge gateways via automotive Ethernet, replacing multiple separate domain ECUs with hardware-partitioned containers.',
      ko: '중앙 슈퍼컴퓨터 아키텍처: Thor SoC가 중앙 두뇌 역할을 수행하고 영역(Zone) 게이트웨이와 차량용 이더넷으로 통신하며, 하드웨어 분할 컨테이너를 통해 다수의 개별 ECU를 단일 시스템으로 대체.',
    },
    evPlatformStrategy: {
      en: 'Providing high-efficiency compute foundation for next-generation EV platforms worldwide (partnering with Mercedes-Benz, BYD, Volvo, Polestar, Xiaomi, NIO, XPENG, Zeekr, Li Auto).',
      ko: '메르세데스-벤츠, BYD, 볼보, 폴스타, 샤오미, 니오, 샤오펑, 지커, 리오토 등 전 세계 주요 전기차 제조사의 차세대 EV 플랫폼에 고효율 중앙 컴퓨트 기반 제공.',
    },
    autonomousDrivingAi: {
      en: 'Generative AI and Large Vision Models (LVM) for autonomous vehicles; end-to-end foundation models trained on DGX SuperPOD and validated using Omniverse Cosmos and Isaac Sim photorealistic synthetic data.',
      ko: '자율주행차를 위한 생성형 AI 및 대형 비전 모델(LVM) 지원. DGX 슈퍼컴퓨터 기반 학습 및 옴니버스 코스모스/아이작 심(Isaac Sim) 실시간 합성 데이터를 활용한 자율주행 안전성 검증 파이프라인.',
    },
    strategicTargets: [
      {
        year: '2024',
        milestone: {
          en: 'DRIVE Orin in mass production across over 30 global EV and ADAS models.',
          ko: '글로벌 30개 이상의 주요 전기차 및 첨단 운전자 보조 시스템에 DRIVE Orin 대량 양산 탑재.',
        },
      },
      {
        year: '2025',
        milestone: {
          en: 'Start of production (SOP) deployments of NVIDIA DRIVE Thor in commercial passenger vehicles.',
          ko: '상용 승용차 라인업에 차세대 NVIDIA DRIVE Thor SoC 양산 차량 출시 시작.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "NVIDIA Newsroom: Official Automotive News & Strategic Announcements",
          ko: "엔비디아 뉴스룸: 공식 오토모티브 뉴스 및 전략 보도자료",
        },
        url: "https://nvidianews.nvidia.com/news/automotive",
        sourceType: "press-release",
        role: "latest",
        publishedDate: "2024-08-28",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "NVIDIA Corporation Official Investor Relations Portal",
          ko: "엔비디아 공식 IR 포털",
        },
        url: "https://investor.nvidia.com/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-08-28",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'qualcomm',
    companyName: 'Qualcomm Technologies, Inc.',
    category: 'semiconductor',
    headquarters: 'San Diego, California, USA',
    ticker: 'QCOM',
    exchange: 'NASDAQ',
    irUrl: 'https://investor.qualcomm.com/',
    latestEventOrReport: {
      en: 'Qualcomm Automotive Investor Day & Snapdragon Summit',
      ko: '퀄컴 오토모티브 인베스터 데이 및 스냅드래곤 서밋 발표',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Snapdragon Digital Chassis',
        ko: '스냅드래곤 디지털 섀시',
      },
      eeZonal: {
        en: 'Snapdragon Ride Flex SoC',
        ko: '스냅드래곤 라이드 플렉스 통합 SoC',
      },
      evPlatform: {
        en: '$45B+ Design Pipeline',
        ko: '$45B+ 전장 수주 파이프라인',
      },
    },
    sdvArchitecture: {
      en: 'Snapdragon Digital Chassis: open, scalable, comprehensive platform spanning Snapdragon Cockpit, Snapdragon Ride (ADAS/AD), Snapdragon Auto Connectivity (5G/C-V2X), and Car-to-Cloud services.',
      ko: '스냅드래곤 디지털 섀시(Snapdragon Digital Chassis): 스냅드래곤 콕핏, 스냅드래곤 라이드(자율주행/ADAS), 스냅드래곤 오토 커넥티비티(5G/C-V2X), 카-투-클라우드를 아우르는 개방형 통합 플랫폼.',
    },
    eeZonalArchitecture: {
      en: 'Snapdragon Ride Flex SoC: world-first automotive SoC enabling both digital cockpit and ADAS functions simultaneously on a single piece of silicon with ISO 26262 ASIL-D functional safety isolation.',
      ko: '스냅드래곤 라이드 플렉스(Ride Flex) SoC: 단일 칩에서 디지털 콕핏과 ADAS 자율주행 기능을 ISO 26262 ASIL-D 기능 안전 격리 하에 동시 구동하는 세계 최초 통합 SoC.',
    },
    evPlatformStrategy: {
      en: 'Hardware reference platforms and software development kits for OEM-defined zonal EV architectures; automotive design-win pipeline surpassing $45 Billion across all global vehicle markets.',
      ko: '완성차 제조사의 Zonal EV 아키텍처 구축을 위한 하드웨어 레퍼런스 및 SDK 제공. 전 세계 주요 자동차 제조사 수주 잔고(Design-win pipeline) 450억 달러 이상 돌파.',
    },
    autonomousDrivingAi: {
      en: 'Snapdragon Ride Vision stack with scalable compute from Level 2 to Level 3+, partnering with BMW, Stellantis, GM, Renault, and Mercedes-Benz for next-generation automated driving.',
      ko: '레벨 2부터 레벨 3+까지 확장 가능한 스냅드래곤 라이드 비전(Vision) 스택. BMW, 스텔란티스, GM, 르노, 메르세데스-벤츠와 차세대 첨단 주행 솔루션 협력.',
    },
    strategicTargets: [
      {
        year: '2024',
        milestone: {
          en: 'Commercial rollout of Snapdragon Ride Flex SoC sampling with global tier-1s and automakers.',
          ko: '글로벌 티어1 및 완성차 제조사를 대상으로 스냅드래곤 라이드 플렉스 통합 SoC 상용 샘플링 공급.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Annual automotive revenue target of $4 Billion driven by Digital Chassis deployments.',
          ko: '디지털 섀시 전면 도입 확대를 기반으로 연간 오토모티브 부문 매출 40억 달러 달성 목표.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Targeting over $9 Billion in automotive business revenue.',
          ko: '오토모티브 사업 부문 연간 매출 90억 달러 이상 달성 장기 목표.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Qualcomm Official Investor Relations Portal",
          ko: "퀄컴 공식 IR 웹 포털",
        },
        url: "https://investor.qualcomm.com/",
        sourceType: "official-website",
        role: "latest",
        publishedDate: "2024-07-31",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Snapdragon Digital Chassis Automotive Product Architecture",
          ko: "스냅드래곤 디지털 섀시 오토모티브 제품군 공식 아키텍처",
        },
        url: "https://www.qualcomm.com/products/automotive",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-07-31",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'mobileye',
    companyName: 'Mobileye Global Inc.',
    category: 'semiconductor',
    headquarters: 'Jerusalem, Israel',
    ticker: 'MBLY',
    exchange: 'NASDAQ',
    irUrl: 'https://ir.mobileye.com/',
    latestEventOrReport: {
      en: 'Mobileye Investor Conference & Technology Briefing',
      ko: '모빌아이 인베스터 컨퍼런스 및 기술 브리핑',
    },
    matrixSummary: {
      sdvOs: {
        en: 'EyeQ6 & DXP Platform',
        ko: 'EyeQ6 SoC & DXP 플랫폼',
      },
      eeZonal: {
        en: 'True Redundancy ADAS/AD',
        ko: '트루 리던던시 ADAS/AD 아키텍처',
      },
      evPlatform: {
        en: 'VW, Porsche, Zeekr EVs',
        ko: '폭스바겐, 포르쉐, 지커 EV 탑재',
      },
    },
    sdvArchitecture: {
      en: 'Mobileye DXP (Developer Program) and EyeQ6 SoC family allowing automakers to customize algorithms while leveraging Mobileye\'s validated computer vision and REM (Road Experience Management) crowd-sourced mapping.',
      ko: '모빌아이 DXP(Developer Program) 및 EyeQ6 SoC 라인업을 통해 완성차 제조사가 자체 알고리즘을 커스텀 개발하면서도 모빌아이의 검증된 컴퓨터 비전과 REM 크라우드소싱 고정밀 지도를 활용할 수 있는 개방형 플랫폼.',
    },
    eeZonalArchitecture: {
      en: 'Modular ADAS/AD compute architecture that interfaces seamlessly with centralized vehicle domain controllers and zonal gateways over standard automotive protocols.',
      ko: '표준 오토모티브 프로토콜을 통해 중앙 집중식 도메인 컴퓨터 및 존 게이트웨이와 원활하게 연동되는 모듈형 ADAS/AD 컴퓨팅 아키텍처.',
    },
    evPlatformStrategy: {
      en: 'Deep platform integrations with Volkswagen Group (SuperVision on premium brands), Porsche, Zeekr, Geely, and Polestar.',
      ko: '폭스바겐 그룹(프리미엄 브랜드 대상 SuperVision 탑재), 포르쉐, 지커, 지리, 폴스타 등과의 전방위 EV 플랫폼 공급 계약 체결.',
    },
    autonomousDrivingAi: {
      en: 'True Redundancy architecture separating computer vision and radar/LiDAR sensor subsystems into independent channels for fail-operational Level 3/4 autonomous driving (Mobileye Chauffeur).',
      ko: '컴퓨터 비전과 레이더/라이다 서브시스템을 독립된 2개의 서브 채널로 분리하여 고장 시에도 안전을 보장하는 트루 리던던시(True Redundancy) 기반 레벨 3/4 자율주행(Mobileye Chauffeur).',
    },
    strategicTargets: [
      {
        year: '2024',
        milestone: {
          en: 'Launch of EyeQ6 Lite SoC in high-volume production models globally.',
          ko: '글로벌 대량 양산 차량 라인업에 차세대 고효율 EyeQ6 Lite SoC 탑재 시작.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Commercial volume production of EyeQ6 High and SuperVision hands-off/eyes-off systems.',
          ko: 'EyeQ6 High 기반 SuperVision 및 무인 자율주행 Chauffeur 시스템의 대규모 상용 양산.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Mobileye Global Inc. Official Investor Relations Portal",
          ko: "모빌아이 글로벌 공식 IR 포털",
        },
        url: "https://ir.mobileye.com/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-08-01",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'hyundai-mobis',
    companyName: 'Hyundai Mobis Co., Ltd.',
    category: 'tier1',
    headquarters: 'Seoul, South Korea',
    ticker: '012330',
    exchange: 'KRX',
    irUrl: {
      en: 'https://www.mobis.com/en/ir/ircop.do',
      ko: 'https://www.mobis.com/kr/ir/ircop.do',
    },
    latestEventOrReport: {
      en: 'Hyundai Mobis CEO Investor Day & Business Strategy Presentation',
      ko: '현대모비스 CEO 인베스터 데이 및 사업 전략 발표',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Software-Centric Vehicle',
        ko: '소프트웨어 중심 모빌리티(SCV)',
      },
      eeZonal: {
        en: 'Integrated Zonal DCU',
        ko: '통합 영역(Zonal) 제어기 & DCU',
      },
      evPlatform: {
        en: 'E-GMP & IMA Electrification',
        ko: 'E-GMP 및 차세대 IMA 전동화 PE 모듈',
      },
    },
    sdvArchitecture: {
      en: 'Software-Centric Vehicle (SCV) transformation: developing standardized middleware platforms, smart cockpit software (M.VICS), and integrated domain control units.',
      ko: '소프트웨어 중심 모빌리티(SCV)로의 전환: 표준화된 미들웨어 플랫폼, 스마트 콕핏(M.VICS) 솔루션, 통합 도메인 제어기(DCU) 소프트웨어 자체 개발 가속.',
    },
    eeZonalArchitecture: {
      en: 'Development of next-generation Integrated Zonal Controllers and High-Performance Vehicle Computers combining gateway, power routing, and body domain computing.',
      ko: '차량 내 게이트웨이, 전력 라우팅, 바디 제어를 단일 통합하는 차세대 통합 존 컨트롤러(Integrated Zonal Controller) 및 고성능 차량용 컴퓨터 개발.',
    },
    evPlatformStrategy: {
      en: 'Supplying complete electrification modules including BSA (Battery System Assembly), PE (Power Electric) systems, and 800V high-voltage power electronics for E-GMP and upcoming IMA platforms.',
      ko: 'E-GMP 및 차세대 IMA 플랫폼을 위한 배터리 시스템(BSA), 구동 시스템(PE 시스템), 800V 고전압 전력변환 전자장치 핵심 모듈 일괄 공급.',
    },
    autonomousDrivingAi: {
      en: 'Collaborating with Qualcomm and global semiconductor partners on integrated Level 2+ / Level 3 ADAS controllers and radar/camera sensor fusion technologies.',
      ko: '퀄컴 등 글로벌 반도체 선도 기업과 협력하여 레벨 2+ / 레벨 3 통합 ADAS 제어기 및 레이더/카메라 센서 퓨전 기술 개발.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Commercial mass production of integrated zonal control units for Hyundai Motor Group vehicles.',
          ko: '현대차그룹 차세대 차량용 통합 영역 제어기(Zonal Controller) 본격 양산.',
        },
      },
      {
        year: '2027',
        milestone: {
          en: 'Significant expansion of non-captive global automaker sales to over 40% of order intake.',
          ko: '글로벌 완성차 대상 전장 및 전동화 핵심 부품 수주 비중 40% 이상 확대.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Hyundai Mobis Earnings & Corporate Factbook Reports",
          ko: "현대모비스 실적 발표 및 기업 팩트북 보고서",
        },
        url: "https://www.mobis.com/en/ir/irreport.do",
        sourceType: "annual-report",
        role: "latest",
        publishedDate: "2024-07-26",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Hyundai Mobis Official Investor Relations Portal",
          ko: "현대모비스 공식 IR 포털",
        },
        url: "https://www.mobis.com/en/ir/ircop.do",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-07-26",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'lg-electronics-vs',
    companyName: 'LG Electronics (VS Company)',
    category: 'tier1',
    headquarters: 'Seoul, South Korea',
    ticker: '066570',
    exchange: 'KRX',
    irUrl: 'https://www.lg.com/global/investor-relations/',
    latestEventOrReport: {
      en: 'LG Electronics Global Corporate Presentation & VS Business Division Briefing',
      ko: 'LG전자 글로벌 기업 설명회 및 VS(전장) 사업본부 전략 브리핑',
    },
    matrixSummary: {
      sdvOs: {
        en: 'LG AlphaWare Suite',
        ko: 'LG 알파웨어(AlphaWare) 스위트',
      },
      eeZonal: {
        en: 'Telematics / Cockpit HPC',
        ko: '텔레매틱스 & 인포테인먼트 HPC 통합',
      },
      evPlatform: {
        en: 'LG Magna e-Powertrain',
        ko: 'LG마그나 e-파워트레인 모듈',
      },
    },
    sdvArchitecture: {
      en: 'LG AlphaWare software suite for SDVs consisting of 5 core modules: PlayWare (high-res IVI entertainment), MetaWare (AR-HUD & 3D graphics), VisionWare (AI driver monitoring & ADAS), BaseWare (AUTOSAR & OS abstraction), and OpsWare (cybersecurity & OTA fleet management).',
      ko: 'SDV를 위한 LG 알파웨어(LG AlphaWare) 소프트웨어 스위트: PlayWare(고해상도 IVI 엔터테인먼트), MetaWare(AR-HUD 및 3D 그래픽), VisionWare(AI 운전자 모니터링 및 ADAS), BaseWare(AUTOSAR 및 OS 추상화), OpsWare(사이버보안 및 무선 OTA 차량 관제)의 5대 핵심 모듈 제공.',
    },
    eeZonalArchitecture: {
      en: 'Pillar-to-Pillar curved display systems and centralized telematics / IVI high-performance compute integration, commanding global #1 telematics market share.',
      ko: '필러-투-필러(Pillar-to-Pillar) 초대형 커브드 디스플레이 시스템 및 텔레매틱스-IVI 중앙 통합 컴퓨팅 시스템 구축 (글로벌 텔레매틱스 시장 점유율 1위 유지).',
    },
    evPlatformStrategy: {
      en: 'LG Magna e-Powertrain joint venture supplying drive motors, power inverters, and onboard chargers to global OEMs, alongside ZKW automotive lighting electronics.',
      ko: 'LG 마그나 이파워트레인(LG Magna e-Powertrain) 합작법인을 통해 글로벌 완성차에 전기차 모터, 인버터, 온보드 차저 공급 및 ZKW 프리미엄 차량 조명 전자 시스템 연계.',
    },
    autonomousDrivingAi: {
      en: 'Cabin sensing AI, front-facing ADAS camera modules with Mobileye, and Next-Gen In-Cabin AI agents utilizing cloud and on-device machine learning.',
      ko: '차량 내부 캐빈 센싱 AI, 모빌아이 협력 전방 ADAS 카메라 모듈 및 온디바이스/클라우드 머신러닝을 활용한 차세대 차량 내 AI 에이전트 개발.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Full-scale commercial deployment of LG AlphaWare software solution across global automakers.',
          ko: '글로벌 완성차 고객사를 대상으로 LG AlphaWare SDV 소프트웨어 플랫폼 본격 상용 공급.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Targeting 20 Trillion KRW in vehicle component solutions revenue, cementing top-tier global supplier rank.',
          ko: 'VS(전장) 사업본부 연간 매출 20조 원 달성 및 글로벌 톱 티어 전장 기업 도약.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "LG Electronics Official Investor Relations Portal",
          ko: "LG전자 공식 IR 포털",
        },
        url: "https://www.lg.com/global/investor-relations/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-07-25",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'general-motors',
    companyName: 'General Motors Company',
    category: 'oem',
    headquarters: 'Detroit, Michigan, USA',
    ticker: 'GM',
    exchange: 'NYSE',
    irUrl: 'https://investor.gm.com/',
    latestEventOrReport: {
      en: 'GM Investor Day & Annual Financial Reporting',
      ko: 'GM 인베스터 데이 및 연례 재무 실적 보고서',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Ultifi (VIP Network)',
        ko: 'Ultifi (VIP 네트워크 기반)',
      },
      eeZonal: {
        en: 'Central Compute + Zonal Gateways',
        ko: '중앙 컴퓨팅 + Zonal 게이트웨이',
      },
      evPlatform: {
        en: 'Ultium EV Architecture',
        ko: 'Ultium 전용 전기차 플랫폼',
      },
    },
    sdvArchitecture: {
      en: 'Ultifi end-to-end software platform built upon GM\'s Vehicle Intelligence Platform (VIP). Features decoupled application layers, Linux/Android Automotive base, and cloud-native containerized software deployment enabling continuous over-the-air feature upgrades.',
      ko: 'GM의 차량 지능형 플랫폼(VIP) 위에 구축된 Ultifi 엔드투엔드 소프트웨어 플랫폼. 하드웨어와 분리된 애플리케이션 계층, 리눅스 및 안드로이드 오토모티브 기반 베이스, 클라우드 네이티브 컨테이너 배포를 통한 지속적 무선 OTA 기능 업데이트 제공.',
    },
    eeZonalArchitecture: {
      en: 'Vehicle Intelligence Platform (VIP) capable of managing up to 4.5 terabytes of data per hour with 10 Gbps Ethernet backbone. Migrating to centralized high-performance computing clusters and zonal power/signal distribution modules.',
      ko: '10 Gbps 고속 이더넷 백본을 통해 시간당 최대 4.5 테라바이트의 데이터를 처리할 수 있는 차량 지능형 플랫폼(VIP). 중앙 집중형 고성능 컴퓨팅 클러스터와 영역별(Zonal) 전력/신호 분배 모듈로 고도화.',
    },
    evPlatformStrategy: {
      en: 'Ultium flexible modular EV architecture supporting diverse vehicle form factors from compact crossovers to heavy-duty pickups, equipped with industry-first wireless battery management system (wBMS) reducing wiring by 90%.',
      ko: '소형 크로스오버부터 대형 픽업트럭까지 폭넓은 세그먼트를 아우르는 Ultium 모듈러 EV 아키텍처. 배선 하네스를 90% 감축한 업계 최초 무선 배터리 관리 시스템(wBMS) 탑재.',
    },
    autonomousDrivingAi: {
      en: 'Super Cruise true hands-free driver assistance system validated over 750,000 miles of compatible highways across North America, utilizing precision LiDAR map data, real-time driver attention systems, and radar/camera fusion.',
      ko: '북미 전역 75만 마일 이상의 호환 고속도로에서 검증된 Super Cruise 핸즈프리 운전자 보조 시스템. 정밀 라이다 맵 데이터, 실시간 운전자 주의 모니터링 및 레이더/카메라 센서 퓨전 기술 활용.',
    },
    softwareMonetization: {
      en: 'Targeting $20B to $25B in annual software and services revenue by 2030 through OnStar connected security, Super Cruise subscription upgrades, digital commerce, and in-vehicle app marketplaces.',
      ko: 'OnStar 커넥티드 안전 서비스, Super Cruise 유료 구독, 인포테인먼트 디지털 커머스 및 인앱 결제 생태계를 통해 2030년까지 연간 200억~250억 달러 규모의 소프트웨어·서비스 매출 달성 추진.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Full commercial scaling of Ultifi platform across mass-market EV portfolio (Equinox EV, Blazer EV).',
          ko: '대중형 전기차 라인업(이쿼녹스 EV, 블레이저 EV) 전반에 걸친 Ultifi 플랫폼 본격 양산 배포.',
        },
      },
      {
        year: '2028',
        milestone: {
          en: 'Expansion of hands-free highway driving to urban and arterial road environments with next-gen automated driving compute.',
          ko: '차세대 자율주행 컴퓨팅 플랫폼을 적용하여 고속도로를 넘어 도심 및 간선 도로 환경으로 핸즈프리 주행 확장.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Transition to all-electric light-duty vehicle portfolio with 100% connected, OTA-updatable vehicle fleet.',
          ko: '승용차 및 경상용차 라인업의 전면 전동화 달성 및 전 차량 100% 무선 OTA 상시 업데이트 체계 구축.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "General Motors Official Investor Relations Portal",
          ko: "제너럴 모터스 공식 IR 웹 포털",
        },
        url: "https://investor.gm.com/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-04-23",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "GM Investor Day Presentation on Software and EV Strategy",
          ko: "GM 인베스터 데이 소프트웨어 및 전동화 전략 발표",
        },
        url: "https://investor.gm.com/events-and-presentations",
        sourceType: "investor-presentation",
        role: "historical",
        publishedDate: "2023-11-15",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'ford',
    companyName: 'Ford Motor Company',
    category: 'oem',
    headquarters: 'Dearborn, Michigan, USA',
    ticker: 'F',
    exchange: 'NYSE',
    irUrl: 'https://shareholder.ford.com/',
    latestEventOrReport: {
      en: 'Ford Motor Company Capital Markets Day & Shareholder Reports',
      ko: '포드 모터 컴퍼니 캐피털 마켓 데이 및 공식 주주 보고서',
    },
    matrixSummary: {
      sdvOs: {
        en: 'FNV4 Centralized Software Stack',
        ko: 'FNV4 중앙 집중형 소프트웨어 스택',
      },
      eeZonal: {
        en: 'Zonal Gateways + Central HPC',
        ko: '영역 게이트웨이 + 중앙 HPC',
      },
      evPlatform: {
        en: 'Gen-2 Dedicated EV & Skunkworks Platform',
        ko: '2세대 전용 EV 및 스컹크웍스 플랫폼',
      },
    },
    sdvArchitecture: {
      en: 'FNV (Fully Networked Vehicle) Gen 4 architecture with modern cloud connectivity, transitioning toward an in-house unified vehicle operating system. Decouples software release cadence from vehicle hardware lifecycles with continuous microservice OTA updates.',
      ko: '모던 클라우드 연결성을 갖춘 FNV(Fully Networked Vehicle) 4세대 아키텍처 및 자체 통합 차량용 운영체제로의 진화. 마이크로서비스 무선 OTA 업데이트를 통해 하드웨어 양산 주기와 독립적인 소프트웨어 배포 체계 확립.',
    },
    eeZonalArchitecture: {
      en: 'Zonal gateway architecture consolidating body, chassis, and powertrain controllers into regional hubs connected via Gigabit Ethernet backbones to dual central high-performance computing units.',
      ko: '바디, 섀시 및 파워트레인 제어기를 기가비트 이더넷 백본 기반 듀얼 중앙 HPC와 연결된 지역 거점(Zonal) 게이트웨이로 통합하는 아키텍처.',
    },
    evPlatformStrategy: {
      en: 'Multi-platform EV strategy spanning commercial E-Transit / F-150 Lightning platforms, next-gen dedicated T3 truck architecture, and low-cost flexible electric skateboard platform engineered by a dedicated skunkworks team.',
      ko: 'E-트랜짓/F-150 라이트닝 상용 플랫폼, 차세대 전용 T3 전기 픽업 아키텍처, 그리고 전담 스컹크웍스 팀이 설계한 중저가 플렉서블 스케이트보드 플랫폼을 포함하는 다각화 전략.',
    },
    autonomousDrivingAi: {
      en: 'BlueCruise hands-free highway driving with over 125 million cumulative miles driven, featuring Lane Change Assist and In-Lane Repositioning. Supported by Latitude AI (wholly owned subsidiary) developing next-gen automated driving stacks.',
      ko: '차선 변경 보조 및 차선 내 위치 재조정 기능을 포함하여 1억 2,500만 마일 이상의 누적 주행을 달성한 BlueCruise 핸즈프리 시스템. 차세대 자율주행 기술을 개발하는 100% 자회사 Latitude AI의 인공지능 스택 접목.',
    },
    softwareMonetization: {
      en: 'Accelerating high-margin recurring revenues via Ford Pro commercial telematics, Fleet Management software, digital charging management, and consumer BlueCruise connected subscriptions.',
      ko: 'Ford Pro 상용차 텔레매틱스, 플릿 관리 소프트웨어, 지능형 충전 인프라 솔루션 및 일반 소비자 BlueCruise 구독 서비스를 통한 고수익 소프트웨어 사업 모델 구축.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Rollout of updated FNV architecture and expanded BlueCruise 1.3/1.4 features across core SUV/truck lines.',
          ko: '핵심 SUV 및 트럭 라인업 전반에 업그레이드된 FNV 아키텍처 및 BlueCruise 1.3/1.4 기능 확대 적용.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Market introduction of next-gen affordable EV platform and T3 electric truck with software-first design.',
          ko: '소프트웨어 퍼스트 설계가 적용된 차세대 중저가 EV 플랫폼 및 T3 전용 전기 트럭 시장 출시.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Expansion of Ford Pro connected subscriptions to over 1.2 million active paid vehicle subscriptions globally.',
          ko: '글로벌 유료 구독 커넥티드 차량 120만 대 이상 확보 및 소프트웨어 주도 수익성 극대화.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Ford Motor Company Annual Financial & Strategic Disclosures",
          ko: "포드 모터 컴퍼니 연간 재무 및 전략 공시",
        },
        url: "https://shareholder.ford.com/financials/default.aspx",
        sourceType: "annual-report",
        role: "latest",
        publishedDate: "2025-02-06",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Ford Motor Company Shareholder Relations Portal",
          ko: "포드 모터 컴퍼니 주주 및 공식 IR 웹 포털",
        },
        url: "https://shareholder.ford.com/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-05-02",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Ford Capital Markets Day Software & Electrification Presentation",
          ko: "포드 캐피털 마켓 데이 소프트웨어 및 전동화 전략 발표",
        },
        url: "https://shareholder.ford.com/events/event-details/2023/Delivering-Ford-Capital-Markets-Day-2023-2023-d-SUl4EM09/default.aspx",
        sourceType: "investor-presentation",
        role: "historical",
        publishedDate: "2023-05-22",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'stellantis',
    companyName: 'Stellantis N.V.',
    category: 'oem',
    headquarters: 'Hoofddorp, Netherlands',
    ticker: 'STLA',
    exchange: 'NYSE',
    irUrl: 'https://www.stellantis.com/en/investors',
    latestEventOrReport: {
      en: 'Stellantis Software Day & Dare Forward 2030 Strategic Updates',
      ko: '스텔란티스 소프트웨어 데이 및 Dare Forward 2030 전략 발표 자료',
    },
    matrixSummary: {
      sdvOs: {
        en: 'STLA Brain & SmartCockpit',
        ko: 'STLA Brain 및 SmartCockpit',
      },
      eeZonal: {
        en: '3 Central HPCs + Zonal Gateway',
        ko: '3대 중앙 HPC + Zonal 게이트웨이',
      },
      evPlatform: {
        en: 'STLA Small / Medium / Large / Frame',
        ko: 'STLA Small / Medium / Large / Frame',
      },
    },
    sdvArchitecture: {
      en: 'STLA Brain fully cloud-integrated centralized electrical/software architecture completely decoupling hardware and software lifecycles. Co-developed with Amazon and Foxconn to power the STLA SmartCockpit and STLA AutoDrive platforms.',
      ko: '하드웨어와 소프트웨어 수명 주기를 완전히 분리하는 클라우드 통합 중앙 집중형 전자/소프트웨어 아키텍처 STLA Brain. 아마존 및 폭스콘과의 협업을 통해 STLA SmartCockpit 및 STLA AutoDrive 플랫폼 구동.',
    },
    eeZonalArchitecture: {
      en: 'Architecture featuring 3 High-Performance Computing clusters (Core Compute, SmartCockpit, and Autonomous Driving) supported by zonal interface units, drastically reducing the physical wiring harness and ECU count.',
      ko: '3대 고성능 컴퓨팅 클러스터(중앙 컴퓨트, 스마트콕핏, 자율주행)와 영역 인터페이스 제어기로 구성되어 물리 배선 하네스와 ECU 개수를 획기적으로 절감하는 아키텍처.',
    },
    evPlatformStrategy: {
      en: 'Four dedicated pure-electric BEV-by-design architectures: STLA Small (500 km range), STLA Medium (700 km range), STLA Large (800 km range, 800V fast-charging), and STLA Frame (800 km range body-on-frame for commercial trucks).',
      ko: '4대 순수 전기차 전용 플랫폼 구축: STLA Small(500km 주행거리), STLA Medium(700km 주행거리), STLA Large(800km 주행거리 및 800V 고전압), STLA Frame(트럭·상용차용 프레임 바디 800km 주행거리).',
    },
    autonomousDrivingAi: {
      en: 'STLA AutoDrive platform developed in partnership with BMW and Mobileye, delivering Level 2, Level 2+ hands-free, and Level 3 conditional automated driving capabilities with continuous OTA upgradeability.',
      ko: 'BMW 및 모빌아이와 공동 개발한 STLA AutoDrive 플랫폼. 무선 OTA로 상시 업그레이드되는 레벨 2, 레벨 2+ 핸즈프리 및 조건부 레벨 3 자율주행 시스템 제공.',
    },
    softwareMonetization: {
      en: 'Aiming for €20 billion in annual software-driven revenues by 2030 under Dare Forward 2030, driven by 34 million monetizable connected cars and subscription-based feature activations.',
      ko: 'Dare Forward 2030 계획에 따라 3,400만 대의 커넥티드 차량과 소프트웨어 기능 구독 서비스를 통해 2030년까지 연간 200억 유로 규모의 소프트웨어 매출 달성 목표.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Initial commercial rollout of STLA Brain and STLA SmartCockpit on high-volume STLA Medium vehicles.',
          ko: '양산형 STLA Medium 플랫폼 기반 차량에 STLA Brain 및 STLA SmartCockpit 첫 상용 탑재.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Full production availability of Level 3 STLA AutoDrive systems across premium models.',
          ko: '프리미엄 세그먼트 전반에 레벨 3 STLA AutoDrive 자율주행 시스템 양산 공급.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: '100% BEV sales in Europe and 50% in the United States, fully enabled by STLA software platforms.',
          ko: '유럽 100%, 미국 50% 순수 전기차 판매 달성 및 STLA 소프트웨어 플랫폼 전면 적용.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Stellantis Annual Financial & Strategic Disclosures",
          ko: "스텔란티스 연간 재무 및 전략 공시",
        },
        url: "https://www.stellantis.com/en/investors/reporting/financial-reports",
        sourceType: "annual-report",
        role: "latest",
        publishedDate: "2025-02-26",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Stellantis Official Investor Relations Web Portal",
          ko: "스텔란티스 공식 투자자 관계 웹 포털",
        },
        url: "https://www.stellantis.com/en/investors",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-04-30",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Stellantis Software Day Keynote & Strategy Disclosure",
          ko: "스텔란티스 소프트웨어 데이 기조연설 및 전략 공시",
        },
        url: "https://www.stellantis.com/en/investors/events/sw-day-2021",
        sourceType: "official-event",
        role: "historical",
        publishedDate: "2021-12-07",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'renault-group',
    companyName: 'Renault Group',
    category: 'oem',
    headquarters: 'Boulogne-Billancourt, France',
    ticker: 'RNO',
    exchange: 'Euronext Paris',
    irUrl: 'https://www.renaultgroup.com/en/finance/',
    latestEventOrReport: {
      en: 'Renault Group Capital Market Day & Ampere Strategy Presentations',
      ko: '르노 그룹 캐피털 마켓 데이 및 암페어(Ampere) 전략 발표 자료',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Ampere SDV & OpenR Link',
        ko: '암페어 SDV 및 OpenR Link',
      },
      eeZonal: {
        en: 'Central HPC + 2 Zonal Nodes',
        ko: '중앙 HPC + 2개 Zonal 노드',
      },
      evPlatform: {
        en: 'AmpR Small / Medium (CMF-EV)',
        ko: 'AmpR Small / Medium (CMF-EV 기반)',
      },
    },
    sdvArchitecture: {
      en: 'Leading European SDV platform developed by Ampere in partnership with Qualcomm (Snapdragon Digital Chassis) and Google (Android Automotive OS / Google Built-In). Reduces onboard computing complexity and cuts development times from 5 to 3 years.',
      ko: '전기차·SW 전담 자회사 암페어(Ampere)가 퀄컴(스냅드래곤 디지털 섀시) 및 구글(안드로이드 오토모티브 OS)과 공동 개발하는 차세대 SDV 아키텍처. 차량 컴퓨팅 복잡도를 줄이고 개발 기간을 5년에서 3년으로 단축.',
    },
    eeZonalArchitecture: {
      en: 'Centralized computing topology featuring two primary computing brains (one dedicated to digital cockpit and services, the second to body and vehicle control) linked to two zonal regional gateway nodes over Ethernet.',
      ko: '인포테인먼트/서비스 전용 및 바디/차량 제어 전용의 2대 중앙 컴퓨팅 브레인과 이더넷으로 연결된 2개의 영역(Zonal) 게이트웨이 노드로 구성된 집중형 토폴로지.',
    },
    evPlatformStrategy: {
      en: 'AmpR Small (formerly CMF-B EV) powering compact urban EVs like the Renault 5 and Renault 4, and AmpR Medium (CMF-EV) dedicated electric skateboard platform for C- and D-segment crossovers with structural battery packaging.',
      ko: '르노 5 및 르노 4 등 소형 전기차를 위한 AmpR Small(구 CMF-B EV)과 C/D 세그먼트 크로스오버를 위한 셀투팩 구조 배터리 탑재 전용 스케이트보드 플랫폼 AmpR Medium(CMF-EV).',
    },
    autonomousDrivingAi: {
      en: 'Active Driver Assist Level 2 automation with predictive eco-driving assistance, camera/radar perception, and cooperative intelligent transportation system (C-ITS) infrastructure connectivity.',
      ko: '예측형 에코 드라이빙 어시스트, 카메라/레이더 기반 인지 및 협력형 지능형 교통 시스템(C-ITS) 통신이 융합된 액티브 드라이버 어시스트 레벨 2 자율주행 기술.',
    },
    softwareMonetization: {
      en: 'Generating recurring post-sale value through Mobilize financial and energy fleet services, OTA infotainment application subscriptions, and predictive smart fleet maintenance analytics.',
      ko: '모빌라이즈(Mobilize) 모빌리티 금융 및 스마트 에너지 플릿 서비스, OTA 기반 앱 구독, 예측 정비 데이터 분석을 통한 사후 지속적 부가가치 창출.',
    },
    strategicTargets: [
      {
        year: '2026',
        milestone: {
          en: 'Market launch of first fully Software-Defined Vehicle (SDV) engineered on the Ampere central architecture.',
          ko: '암페어 중앙 집중형 아키텍처를 기반으로 설계된 첫 번째 완전 SDV 양산 모델 시장 출시.',
        },
      },
      {
        year: '2028',
        milestone: {
          en: 'Integration of next-generation LFP and cell-to-pack battery chemistries across AmpR platforms.',
          ko: 'AmpR 플랫폼 전반에 차세대 LFP 및 셀투팩(Cell-to-Pack) 고효율 배터리 기술 도입.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: '100% electric passenger vehicle sales in Europe with full lifecycle OTA software upgradability.',
          ko: '유럽 시장 100% 전기차 전환 및 전 수명 주기에 걸친 무선 OTA 소프트웨어 업그레이드 지원.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Renault Group Investor Relations & Finance Portal",
          ko: "르노 그룹 공식 IR 및 재무 웹 포털",
        },
        url: "https://www.renaultgroup.com/en/finance/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-04-23",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Renault Group Capital Market Day & Ampere Strategy Disclosures",
          ko: "르노 그룹 캐피털 마켓 데이 및 암페어 전략 공시",
        },
        url: "https://www.renaultgroup.com/en/finance/publications/",
        sourceType: "capital-markets-day",
        role: "historical",
        publishedDate: "2023-11-15",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'honda',
    companyName: 'Honda Motor Co., Ltd.',
    category: 'oem',
    headquarters: 'Tokyo, Japan',
    ticker: '7267',
    exchange: 'TSE',
    irUrl: 'https://global.honda/en/investors/',
    latestEventOrReport: {
      en: 'Honda Global Strategy Briefing on Automotive Electrification & CES Keynote',
      ko: '혼다 글로벌 전동화 사업 전략 브리핑 및 CES 기조 발표',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Proprietary Vehicle OS (0 Series)',
        ko: '독자 차량용 OS (0 Series 기반)',
      },
      eeZonal: {
        en: 'Central E/E Architecture',
        ko: '중앙 집중형 E/E 아키텍처',
      },
      evPlatform: {
        en: 'Honda 0 Series Dedicated EV Architecture',
        ko: '혼다 0 시리즈 전용 EV 아키텍처',
      },
    },
    sdvArchitecture: {
      en: 'Developing a proprietary vehicle operating system to debut with the global "Honda 0 Series" EV family in 2026. Emphasizes ultra-thin, light, and wise architecture, learning driver preferences and driving environments using onboard and cloud AI.',
      ko: '2026년 글로벌 "혼다 0 시리즈" 전용 전기차와 함께 데뷔하는 독자 차량용 운영체제. "Thin, Light, and Wise(얇고 가볍고 현명한)" 개발 철학에 따라 온보드 및 클라우드 AI를 활용해 운전자 성향과 주행 환경을 학습.',
    },
    eeZonalArchitecture: {
      en: 'Centralized computing architecture linking autonomous driving, electric powertrain control, and digital infotainment into centralized compute modules via high-bandwidth automotive Ethernet networks.',
      ko: '고대역폭 차량용 이더넷 네트워크를 통해 자율주행, 전기 파워트레인 제어 및 디지털 인포테인먼트를 중앙 집중형 컴퓨팅 모듈로 연결하는 E/E 구조.',
    },
    evPlatformStrategy: {
      en: 'Dedicated Honda 0 Series platform utilizing low-height battery packaging, ultra-compact e-Axles, and 6,000-ton class megacasting aluminum die-cast body components to achieve superior energy efficiency and interior space.',
      ko: '저상 배터리 패키징, 초소형 e-Axle 및 6,000톤급 메가캐스팅 알루미늄 다이캐스팅 차체 부품을 활용하여 에너지 효율과 실내 공간을 극대화한 혼다 0 시리즈 전용 EV 플랫폼.',
    },
    autonomousDrivingAi: {
      en: 'Honda SENSING Elite (world\'s first commercially certified Level 3 Traffic Jam Pilot in Japan) evolving to next-generation automated driving with proprietary unsupervised AI models trained on human driver behaviors.',
      ko: '일본에서 세계 최초로 상용 인증된 레벨 3 Traffic Jam Pilot(Honda SENSING Elite)을 기반으로, 인간 운전자의 주행 행동을 학습한 독자 비지도 학습 AI 모델이 탑재된 차세대 자율주행 시스템으로 발전.',
    },
    softwareMonetization: {
      en: 'Building post-sale digital subscription streams including personalized cabin experiences, automated driving feature activations, and intelligent Home-to-Grid vehicle charging energy services.',
      ko: '개인화된 실내 콕핏 경험, 고급 자율주행 기능 활성화 및 가정-차량 간 전력망 연계(V2G/V2H) 지능형 충전 서비스를 포함하는 사후 디지털 구독 사업 구축.',
    },
    strategicTargets: [
      {
        year: '2026',
        milestone: {
          en: 'Global launch of first production Honda 0 Series flagship model (Saloon concept) with proprietary Vehicle OS.',
          ko: '자체 개발 차량용 OS를 탑재한 최초의 양산형 혼다 0 시리즈 플래그십(Saloon 기반) 글로벌 출시.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Launch of 30 EV models globally with annual production volume of over 2 million units.',
          ko: '글로벌 시장에 30개 모델의 전기차를 출시하고 연간 200만 대 이상의 전기차 생산 체제 구축.',
        },
      },
      {
        year: '2040',
        milestone: {
          en: '100% of global vehicle sales to be electric vehicles (EVs) and fuel cell electric vehicles (FCEVs).',
          ko: '글로벌 신차 판매의 100%를 순수 전기차(EV) 및 수소전기차(FCEV)로 전면 전환.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Honda Motor Global Investor Relations Web Portal",
          ko: "혼다 모터 글로벌 공식 IR 웹 포털",
        },
        url: "https://global.honda/en/investors/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-05-16",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Honda 0 Series Global Announcement & Strategy Briefing",
          ko: "혼다 0 시리즈 글로벌 공개 및 전동화 전략 브리핑",
        },
        url: "https://global.honda/en/newsroom/news/2024/c240110eng.html",
        sourceType: "official-event",
        role: "historical",
        publishedDate: "2024-01-09",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'nissan',
    companyName: 'Nissan Motor Co., Ltd.',
    category: 'oem',
    headquarters: 'Yokohama, Kanagawa, Japan',
    ticker: '7201',
    exchange: 'TSE',
    irUrl: 'https://www.nissan-global.com/EN/IR/',
    latestEventOrReport: {
      en: 'Nissan Mid-Term Business Plan "The Arc" & Financial Results',
      ko: '닛산 중기 경영 계획 "The Arc" 및 연례 재무 실적 발표',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Next-Gen Centralized SDV Platform',
        ko: '차세대 중앙 집중형 SDV 플랫폼',
      },
      eeZonal: {
        en: 'Domain to Zonal Evolution',
        ko: '도메인 제어에서 Zonal 구조로 진화',
      },
      evPlatform: {
        en: 'CMF-EV & Modular Electric Architecture',
        ko: 'CMF-EV 및 모듈러 전동화 아키텍처',
      },
    },
    sdvArchitecture: {
      en: 'Developing a standardized centralized software platform under "The Arc" midterm plan, exploring strategic software partnership with Honda on joint research of SDV platforms, foundational OS, and vehicle semiconductors.',
      ko: '중기 경영 계획 "The Arc"에 따라 표준화된 중앙 집중식 소프트웨어 플랫폼을 개발 중이며, 혼다와 SDV 플랫폼, 기반 운영체제 및 차량용 반도체 공동 연구를 위한 전략적 파트너십 추진.',
    },
    eeZonalArchitecture: {
      en: 'Evolution from distributed domain architecture to centralized multi-domain compute with high-speed Ethernet gateways, lowering hardware fragmentation and enabling synchronized whole-vehicle OTA updates.',
      ko: '분산형 도메인 아키텍처에서 고속 이더넷 게이트웨이 기반 중앙 집중형 멀티 도메인 컴퓨트로 진화하여, 하드웨어 파편화를 줄이고 차량 전체 무선 OTA 동기화 지원.',
    },
    evPlatformStrategy: {
      en: 'CMF-EV architecture serving the Nissan Ariya, transitioning to next-generation modular EV families sharing key components and targeting in-house all-solid-state batteries (ASSB) for market introduction by FY2028.',
      ko: '닛산 아리야에 탑재된 CMF-EV 아키텍처를 기반으로 핵심 전동화 부품을 모듈화하여 공유하며, 2028 회계연도까지 자체 개발 전고체 배터리(ASSB) 양산 적용을 목표로 추진.',
    },
    autonomousDrivingAi: {
      en: 'ProPILOT 2.0 hands-off highway driving system utilizing 360-degree sensor fusion with 3D high-definition mapping, advancing next-generation Ground Truth Perception technology integrated with next-gen LiDAR.',
      ko: '3D 정밀 지도와 360도 센서 퓨전을 결합한 ProPILOT 2.0 고속도로 핸즈오프 주행 시스템을 보유하며, 차세대 라이다를 적용한 Ground Truth Perception 인지 기술로 자율주행 성능 고도화.',
    },
    softwareMonetization: {
      en: 'Expanding NissanConnect telematics services, ProPILOT subscription activations, and automated energy management via vehicle-to-grid (V2G) technology.',
      ko: 'NissanConnect 텔레매틱스 커넥티드 서비스, ProPILOT 구독 활성화 및 V2G(Vehicle-to-Grid) 기반 지능형 에너지 관리 솔루션을 통한 사후 소프트웨어 비즈니스 확대.',
    },
    strategicTargets: [
      {
        year: '2026',
        milestone: {
          en: 'Execution of "The Arc" business plan with launch of 30 new models (including 16 electrified) globally.',
          ko: '"The Arc" 중기 계획에 따라 글로벌 시장에 30개 신차(전동화 모델 16종 포함) 투입.',
        },
      },
      {
        year: '2028',
        milestone: {
          en: 'Launch of first mass-production electric vehicle powered by in-house developed all-solid-state batteries (ASSB).',
          ko: '독자 개발 전고체 배터리(ASSB)를 탑재한 최초의 양산형 전기차 시장 출시.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: '55% global electrification mix under the long-term Nissan Ambition 2030 roadmap.',
          ko: '닛산 Ambition 2030 장기 비전에 따라 글로벌 전동화 모델 판매 비중 55% 달성.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Nissan Motor Official IR Library & Management Presentation Archive",
          ko: "닛산 자동차 공식 IR 라이브러리 및 경영 전략 발표 아카이브",
        },
        url: "https://www.nissan-global.com/EN/IR/LIBRARY/",
        sourceType: "investor-presentation",
        role: "latest",
        publishedDate: "2024-03-25",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Nissan Motor Corporation Official Investor Relations Portal",
          ko: "닛산 자동차 공식 IR 웹 포털",
        },
        url: "https://www.nissan-global.com/EN/IR/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-05-09",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'kia',
    companyName: 'Kia Corporation',
    category: 'oem',
    headquarters: 'Seoul, South Korea',
    ticker: '000270',
    exchange: 'KRX',
    irUrl: {
      en: 'https://worldwide.kia.com/en/company/investor-relations',
      ko: 'https://worldwide.kia.com/ko/company/investor-relations',
    },
    latestEventOrReport: {
      en: 'Kia CEO Investor Day & Business Strategy Presentation',
      ko: '기아 CEO 인베스터 데이 및 기업 전략 발표',
    },
    matrixSummary: {
      sdvOs: {
        en: 'ccNC & 42dot SDV OS Alignment',
        ko: 'ccNC 및 42dot SDV OS 정렬',
      },
      eeZonal: {
        en: 'Domain Architecture to Full Zonal',
        ko: '도메인 제어에서 완전 Zonal 구조로 전환',
      },
      evPlatform: {
        en: 'E-GMP (800V) & PBV Skateboard',
        ko: 'E-GMP (800V) 및 PBV 스케이트보드',
      },
    },
    sdvArchitecture: {
      en: 'Deploying connected car Navigation Cockpit (ccNC) across EV6, EV9, and EV3, fully transitioning to software-defined vehicles aligned with Hyundai Motor Group\'s unified SDV OS development spearheaded by 42dot. Features Features-on-Demand (FoD) marketplace and continuous OTA.',
      ko: 'EV6, EV9, EV3 등 전 라인업에 ccNC(커넥티드 카 내비게이션 콕핏)를 배포하고, 포티투닷(42dot) 주도의 현대차그룹 공용 SDV OS 개발과 정렬. Features-on-Demand(FoD) 스토어 및 무선 OTA를 통한 소프트웨어 중심 자동차 전환 가속.',
    },
    eeZonalArchitecture: {
      en: 'High-speed Ethernet domain controller backbone transitioning to a 4-quadrant centralized zonal E/E architecture, decoupling sensor/actuator interfaces from core vehicle application logic.',
      ko: '초고속 이더넷 기반 도메인 제어기 백본에서 4분면 영역(Zonal) 중앙 집중형 아키텍처로 진화하여, 센서 및 액추에이터 인터페이스를 핵심 차량 애플리케이션 로직과 완전 분리.',
    },
    evPlatformStrategy: {
      en: 'Dual platform approach: E-GMP (Electric-Global Modular Platform, 800V ultra-fast 10-80% charging in 18 minutes) for passenger EVs, and dedicated modular PBV (Platform Beyond Vehicle) skateboard architecture for commercial and custom mobility (PV5, PV7).',
      ko: '이원화 플랫폼 전략: 18분 만에 10-80% 충전이 가능한 800V 초고속 충전 E-GMP(전용 승용 전기차)와 비즈니스 및 맞춤형 모빌리티를 위한 스케이트보드 기반 전용 PBV(Platform Beyond Vehicle, PV5·PV7) 플랫폼.',
    },
    autonomousDrivingAi: {
      en: 'Highway Driving Assist 2 (HDA 2) deployed across mass production vehicles with lane-change assist and machine learning-based smart cruise control, progressing toward Highway Driving Pilot (HDP) conditional Level 3 autonomy.',
      ko: '차선 변경 보조 및 머신러닝 기반 스마트 크루즈 컨트롤이 적용된 HDA 2(고속도로 주행 보조 2)를 대량 양산차에 탑재하고, 조건부 레벨 3 고속도로 자율주행(HDP) 기술로 지속 고도화.',
    },
    softwareMonetization: {
      en: 'Kia Connect Store marketplace for post-purchase digital upgrades (Acceleration Boost, dynamic lighting patterns, streaming services) and fleet telematics for commercial PBV operators.',
      ko: '기아 커넥트 스토어를 통한 사후 디지털 기능 구독(가속 부스트, 다이내믹 라이팅 패턴, 스트리밍 서비스) 및 PBV 상용차 고객 대상 플릿 관리 소프트웨어 수익화.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Market debut of first dedicated Platform Beyond Vehicle (PBV) model, the modular PV5.',
          ko: '첫 번째 전용 PBV(Platform Beyond Vehicle) 양산 모델인 모듈러 PV5 시장 출시.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Full fleet transition to software-defined architectures with universal OTA firmware update capability.',
          ko: '전 차종 무선 OTA 펌웨어 업데이트를 기본 지원하는 완전한 소프트웨어 중심 자동차 체계 구축.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Achieve 1.6 million annual EV sales globally with expanded PBV mobility ecosystem.',
          ko: '글로벌 연간 전기차 판매 160만 대 달성 및 PBV 맞춤형 모빌리티 생태계 글로벌 확장.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Kia Corporation Official Investor Relations Portal",
          ko: "기아 공식 IR 웹 포털",
        },
        url: "https://worldwide.kia.com/en/company/investor-relations",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-04-05",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Kia 2024 CEO Investor Day Strategic Presentation",
          ko: "기아 2024 CEO 인베스터 데이 공식 전략 발표",
        },
        url: "https://worldwide.kia.com/en/company/investor-relations/library/ir-activities",
        sourceType: "investor-presentation",
        role: "historical",
        publishedDate: "2024-04-05",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'byd',
    companyName: 'BYD Company Limited',
    category: 'oem',
    headquarters: 'Shenzhen, Guangdong, China',
    ticker: '1211',
    exchange: 'HKEX',
    irUrl: 'https://www.bydglobal.com/en/InvestorRelations.html',
    latestEventOrReport: {
      en: 'BYD Dream Day Whole-Vehicle Intelligence Event & Annual Financials',
      ko: 'BYD 드림 데이 전차 지능화 전략 발표 및 연례 재무 보고서',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Xuanji AI Architecture & DiLink',
        ko: '현기(Xuanji) AI 아키텍처 및 DiLink',
      },
      eeZonal: {
        en: 'Dual-Brain Central Compute',
        ko: '듀얼 브레인 중앙 집중 컴퓨팅',
      },
      evPlatform: {
        en: 'e-Platform 3.0 Evo & CTB',
        ko: 'e-Platform 3.0 Evo 및 CTB(셀투바디)',
      },
    },
    sdvArchitecture: {
      en: 'Xuanji whole-vehicle intelligence architecture seamlessly integrating vehicle brain, cloud brain, and DiLink smart cockpit operating system. Powered by high-compute chips running large multi-modal language models for natural voice and real-time environment adaptation.',
      ko: '차량 브레인, 클라우드 브레인 및 DiLink 스마트 콕핏 OS를 통합한 현기(Xuanji) 전차 지능화 아키텍처. 고성능 컴퓨팅 칩과 대규모 멀티모달 언어 모델을 접목하여 자연어 음성 상호작용 및 주행 환경 실시간 최적화 지원.',
    },
    eeZonalArchitecture: {
      en: 'Dual-brain architecture consisting of the Central Vehicle Compute cluster and Cloud AI brain, communicating with 4 zonal domain controllers over a 1000Mbps Ethernet network backbone.',
      ko: '차량 중앙 집중형 컴퓨트 클러스터와 클라우드 AI 브레인으로 구성된 듀얼 브레인 구조로, 1000Mbps 고속 이더넷 백본을 통해 4대 영역 제어기와 초저지연 통신.',
    },
    evPlatformStrategy: {
      en: 'e-Platform 3.0 Evo featuring full 800V silicon carbide (SiC) high-voltage system, Cell-to-Body (CTB) battery integration, and the world\'s first 12-in-1 intelligent electric drive powertrain assembly.',
      ko: '전 영역 800V 탄화규소(SiC) 고전압 시스템, 배터리와 차체를 일체화한 CTB(Cell-to-Body) 기술 및 세계 최초 12-in-1 지능형 전기 구동 파워트레인을 탑재한 e-Platform 3.0 Evo.',
    },
    autonomousDrivingAi: {
      en: 'DiPilot intelligent driving assistance suite ranging from DiPilot 100 to DiPilot 300 (Navigation on Autopilot, NOA), powered by dual NVIDIA DRIVE Orin / Horizon Robotics Journey chips and LiDAR sensor arrays.',
      ko: '듀얼 엔비디아 드라이브 오린 및 호라이즌 로보틱스 저니 SoC, 라이다 센서 어레이를 탑재하여 고속도로 및 도심 고속 내비게이션 파일럿(NOA)을 지원하는 DiPilot 100~300 지능형 주행 보조 시스템.',
    },
    softwareMonetization: {
      en: 'OTA vehicle feature activations, DiLink app store ecosystem monetization, intelligent cloud fleet diagnostics, and smart vehicle energy management.',
      ko: '무선 OTA 기능 업그레이드, DiLink 앱스토어 생태계 수익화, 지능형 클라우드 차량 진단 및 스마트 에너지 관리 솔루션 제공.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Comprehensive deployment of Xuanji AI intelligence across all luxury and premium sub-brands (Denza, Yangwang, Fangchengbao).',
          ko: '덴자, 양왕, 팡청바오 등 프리미엄 서브 브랜드 전 라인업에 현기(Xuanji) AI 아키텍처 전면 적용.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Global commercial vehicle manufacturing and smart SDV expansion across Europe, Southeast Asia, and South America.',
          ko: '유럽, 동남아시아 및 남미 등 글로벌 생산 거점 가동 및 지능형 SDV 모델 수출 확대.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Solidify position as global leader in connected new energy vehicles with self-developed chip-to-cloud AI stack.',
          ko: '자체 칩-투-클라우드 AI 소프트웨어 스택을 기반으로 글로벌 커넥티드 신에너지차(NEV) 1위 위상 공고화.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "BYD Dream Day Whole-Vehicle Intelligence Strategy Presentation",
          ko: "BYD 드림 데이 차량 전체 지능화 전략 및 쉔지(Xuanji) 아키텍처 공식 발표",
        },
        url: "https://www.bydglobal.com/en/news/2024-01-16/BYD-Launches-Xuanji-Architecture",
        sourceType: "official-event",
        role: "latest",
        publishedDate: "2024-01-16",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "BYD Company Official Investor Relations Web Portal",
          ko: "BYD 컴퍼니 공식 IR 웹 포털",
        },
        url: "https://www.bydglobal.com/en/InvestorRelations.html",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-04-29",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'geely',
    companyName: 'Geely Holding Group (Geely Auto)',
    category: 'oem',
    headquarters: 'Hangzhou, Zhejiang, China',
    ticker: '0175',
    exchange: 'HKEX',
    irUrl: 'https://www.geelyauto.com.hk/announcements-and-notices/',
    latestEventOrReport: {
      en: 'Geely Auto Annual Strategy Presentation & Smart Geely 2025 Reports',
      ko: '지리 자동차 연례 경영 전략 발표 및 스마트 지리 2025 보고서',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Flyme Auto & G-EEA 3.0',
        ko: 'Flyme Auto 및 G-EEA 3.0',
      },
      eeZonal: {
        en: 'Central Supercomputing Cluster',
        ko: '중앙 슈퍼컴퓨팅 클러스터',
      },
      evPlatform: {
        en: 'SEA & GEA Architectures',
        ko: 'SEA 및 GEA 통합 전동화 아키텍처',
      },
    },
    sdvArchitecture: {
      en: 'Flyme Auto intelligent cockpit operating system co-developed with Meizu, deeply integrating smartphone and vehicle computing. Integrated with G-EEA 3.0 central electronics architecture and in-house low-Earth orbit satellite network connectivity.',
      ko: '메이주(Meizu)와 공동 개발한 Flyme Auto 스마트 콕핏 OS로 스마트폰과 차량 컴퓨팅을 심층 통합. G-EEA 3.0 중앙 집중형 전자 아키텍처 및 자체 저궤도 위성 통신망과 결합.',
    },
    eeZonalArchitecture: {
      en: 'G-EEA 3.0 centralized supercomputing architecture unifying cockpit, autonomous driving, and vehicle dynamics into centralized high-performance computing clusters with zonal control units.',
      ko: '스마트 콕핏, 자율주행, 차량 동역학 제어를 고성능 컴퓨팅 클러스터로 일원화하고 영역 제어기를 배치한 G-EEA 3.0 중앙 집중식 아키텍처.',
    },
    evPlatformStrategy: {
      en: 'Sustainable Experience Architecture (SEA) pure electric open-source platform deployed across Zeekr, Volvo, Polestar, and Lotus, complemented by the GEA (Global Intelligent Electric Architecture) supporting multiple powertrain configurations.',
      ko: '지커(Zeekr), 볼보, 폴스타, 로터스 등에 적용된 순수 전기 오픈 아키텍처 SEA(Sustainable Experience Architecture)와 다변화 파워트레인을 지원하는 차세대 GEA 플랫폼.',
    },
    autonomousDrivingAi: {
      en: 'G-Pilot autonomous driving systems scaling from L2+ Navigation on Autopilot (NOA) to L3 conditional automation, trained with Geely\'s Xingrui Cloud AI supercomputing center.',
      ko: '지리 성서(Xingrui) 클라우드 AI 슈퍼컴퓨팅 센터에서 학습된 모델을 바탕으로 레벨 2+ 고속/도심 NOA부터 조건부 레벨 3까지 지원하는 G-Pilot 자율주행 시스템.',
    },
    softwareMonetization: {
      en: 'Flyme Auto software ecosystem monetization, high-precision satellite positioning subscriptions, and OTA feature-on-demand services.',
      ko: 'Flyme Auto 소프트웨어 생태계 결제, 저궤도 위성 기반 고정밀 센티미터급 측위 구독 및 OTA 기능 주문형 서비스.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Completion of Smart Geely 2025 strategic objectives with over 50% new energy vehicle sales ratio.',
          ko: '스마트 지리 2025 전략 목표 달성 및 신에너지차(NEV) 판매 비중 50% 초과 달성.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Full deployment of 72 low-Earth orbit satellites providing global centimeter-level positioning for autonomous vehicles.',
          ko: '자율주행용 글로벌 센티미터급 측위를 지원하는 72기 저궤도 위성망 1차 구축 완료.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Achieve fully carbon-neutral manufacturing and global mobility platform leadership across luxury and mass brands.',
          ko: '글로벌 제조 탄소중립 달성 및 산하 럭셔리/대중 브랜드 전반의 글로벌 모빌리티 플랫폼 리더십 확보.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Geely Automobile Holdings Financial Documents & Strategic Disclosures",
          ko: "지리 자동차 재무 문서 및 전략 공시 보고서",
        },
        url: "https://www.geelyauto.com.hk/financial-documents/",
        sourceType: "annual-report",
        role: "latest",
        publishedDate: "2024-03-20",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Geely Automobile Holdings Limited Investor Centre (Announcements & Notices)",
          ko: "지리 자동차 지주회사 투자자 센터 (공시 및 통지)",
        },
        url: "https://www.geelyauto.com.hk/announcements-and-notices/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-03-20",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'saic',
    companyName: 'SAIC Motor Corporation Limited',
    category: 'oem',
    headquarters: 'Shanghai, China',
    ticker: '600104',
    exchange: 'SSE',
    irUrl: 'https://www.saicmotor.com/english/investor_relations/',
    latestEventOrReport: {
      en: 'SAIC Motor Corporate Annual Reports & Technology Strategy Updates',
      ko: '상하이 자동차(SAIC) 공식 연례 보고서 및 기술 전략 발표',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Galaxy Full-Stack 3.0 (Z-One VCOS)',
        ko: '은하(Galaxy) 풀스택 3.0 (Z-One VCOS)',
      },
      eeZonal: {
        en: 'Central Computing + Zonal Nodes',
        ko: '중앙 집중 컴퓨팅 + Zonal 노드',
      },
      evPlatform: {
        en: 'Nebula Dedicated Pure EV Platform',
        ko: '성운(Nebula) 전용 순수 전기차 플랫폼',
      },
    },
    sdvArchitecture: {
      en: 'Galaxy Full-Stack Solution 3.0 engineered by subsidiary Z-One Technology, featuring central compute Vehicle Central OS (VCOS) and Service-Oriented Architecture (SOA) developer platforms with microservices decoupling.',
      ko: '자회사 Z-One 테크놀로지가 개발한 은하(Galaxy) 풀스택 솔루션 3.0. 차량 중앙 운영체제(VCOS) 및 SOA(서비스 지향 아키텍처) 개발자 플랫폼을 기반으로 마이크로서비스 기능 분리 구현.',
    },
    eeZonalArchitecture: {
      en: 'Central computing plus zonal controllers (Central Brain compute cluster with Smart Cockpit and Smart Drive domain controllers), cutting distributed ECU count by over 50% and harness length by 30%.',
      ko: '스마트 콕핏 및 스마트 드라이브 도메인 제어기와 결합된 중앙 브레인 컴퓨팅 클러스터 및 영역 제어기로 분산 ECU 개수를 50% 이상 줄이고 배선 길이를 30% 감축.',
    },
    evPlatformStrategy: {
      en: 'Nebula scalable pure electric platform supporting ultra-high voltage 800V silicon carbide charging, super-thin battery packs, and semi-solid/solid-state battery integration in premium IM Motors models.',
      ko: '800V SiC 초고전압 충전, 초박형 배터리 팩 및 프리미엄 IM 모터스 라인업 대상 반고체/전고체 배터리 탑재를 지원하는 성운(Nebula) 모듈러 순수 전기차 플랫폼.',
    },
    autonomousDrivingAi: {
      en: 'IM AD autonomous driving system co-developed with Momenta, utilizing Deep Driving Unit (DDU) end-to-end neural network models for highway and complex urban Navigation on Autopilot (NOA).',
      ko: '모멘타(Momenta)와 공동 개발한 IM AD 자율주행 시스템. DDU(심층 주행 장치) 엔드투엔드 인공신경망 모델을 탑재하여 고속도로 및 복잡한 도심 환경에서 무인 내비게이션 파일럿(NOA) 수행.',
    },
    softwareMonetization: {
      en: 'SOA developer platform application marketplace, over-the-air premium driving feature activations, and intelligent commercial fleet management (MG, IM Motors, Roewe).',
      ko: 'SOA 개발자 플랫폼 기반 애플리케이션 스토어, 무선 OTA 프리미엄 자율주행 기능 활성화 및 산하 브랜드(MG, IM 모터스, 로위) 지능형 커넥티드 플릿 서비스.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Full commercial volume deployment of Galaxy Full-Stack 3.0 and quasi-solid state battery on IM Motors.',
          ko: 'IM 모터스 양산차에 은하 풀스택 3.0 및 반고체 배터리 본격 상용화 적용.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Commercial debut of all-solid-state batteries on production vehicles under the Guangyu brand.',
          ko: '광위(Guangyu) 브랜드 산하 양산 모델에 전고체 배터리 첫 상용 탑재.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Export over 1.5 million smart electric vehicles annually to global markets including Europe and Latin America.',
          ko: '유럽 및 남미 등 글로벌 시장에 연간 150만 대 이상의 스마트 전기차 수출 달성.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "SAIC Motor Annual Strategic & Financial Disclosure",
          ko: "상하이자동차 연간 전략 및 재무 공시 보고서",
        },
        url: "https://www.saicmotor.com/english/investor_relations/index.shtml",
        sourceType: "annual-report",
        role: "latest",
        publishedDate: "2024-04-28",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "SAIC Motor Corporation Official Investor Relations Portal",
          ko: "상하이자동차(SAIC) 공식 IR 웹 포털",
        },
        url: "https://www.saicmotor.com/english/investor_relations/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-04-28",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'nio',
    companyName: 'NIO Inc.',
    category: 'oem',
    headquarters: 'Shanghai, China',
    ticker: 'NIO',
    exchange: 'NYSE',
    irUrl: 'https://ir.nio.com/',
    latestEventOrReport: {
      en: 'NIO IN Innovation Day & NIO Day Strategic Announcements',
      ko: 'NIO IN 혁신의 날 및 NIO Day 전략 발표 자료',
    },
    matrixSummary: {
      sdvOs: {
        en: 'SkyOS (Tian Shu) Full-Stack OS',
        ko: '천추(SkyOS) 풀스택 차량용 운영체제',
      },
      eeZonal: {
        en: 'Adam Supercomputing + Shenji 5nm',
        ko: 'Adam 슈퍼컴퓨팅 + 신지 5nm 칩',
      },
      evPlatform: {
        en: 'NT 3.0 900V Architecture & Power Swap',
        ko: 'NT 3.0 900V 플랫폼 및 배터리 스왑',
      },
    },
    sdvArchitecture: {
      en: 'SkyOS (Tian Shu) China\'s first full-stack vehicle operating system, encompassing SkyOS-H (hypervisor), SkyOS-M (real-time microkernel), SkyOS-L (lightweight Linux), and SkyOS-C (cockpit Android), delivering deterministic communication and end-to-end security.',
      ko: '하이퍼바이저(SkyOS-H), 마이크로커널(SkyOS-M), 경량 리눅스(SkyOS-L), 안드로이드 콕핏(SkyOS-C)을 총망라한 중국 최초의 풀스택 차량용 운영체제 천추(SkyOS). 결정론적 통신 및 종단간 보안 보장.',
    },
    eeZonalArchitecture: {
      en: 'Central computing architecture powered by in-house Shenji NX9031 5nm high-performance autonomous driving SoC (over 50 billion transistors) and Adam supercomputer (4x NVIDIA DRIVE Orin chips delivering 1016 TOPS).',
      ko: '500억 개 이상의 트랜지스터를 집적한 5nm 공정 자체 개발 자율주행 칩 신지(Shenji NX9031)와 1016 TOPS 연산력의 Adam 슈퍼컴퓨터(4개 Orin SoC)로 구동되는 중앙 집중식 컴퓨팅.',
    },
    evPlatformStrategy: {
      en: 'NT 3.0 architecture featuring full-domain 900V ultra-high-voltage power electronics, 46105 large cylindrical cells, and automated Power Swap 4.0 stations capable of swapping battery packs in under 3 minutes.',
      ko: '전 영역 900V 초고전압 시스템, 46105 대형 원통형 배터리 셀 및 3분 이내 배터리 교체가 가능한 4세대 배터리 스왑(Power Swap 4.0) 인프라가 통합된 NT 3.0 전용 전기차 플랫폼.',
    },
    autonomousDrivingAi: {
      en: 'NIO Autonomous Driving (NAD) with Navigate on Pilot Plus (NOP+) covering highways and urban streets without HD map dependencies, powered by the NIO World Model (NWM) foundation model.',
      ko: '고정밀 지도 의존 없이 고속도로와 도심 전역을 커버하는 NOP+와 실시간 시뮬레이션 기반 대규모 기초 인공지능 모델 NIO World Model(NWM)로 구동되는 NAD 자율주행 시스템.',
    },
    softwareMonetization: {
      en: 'Pioneering Battery-as-a-Service (BaaS) monthly battery subscription, NOP+ intelligent driving monthly service subscriptions, and NOMI AI voice assistant digital ecosystem.',
      ko: '업계 선도적인 배터리 구독 서비스(BaaS), NOP+ 고도화 자율주행 월간 유료 구독 및 NOMI 차량용 AI 비서 기반 디지털 콘텐츠 수익화.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Delivery of flagship ET9 equipped with in-house Shenji 5nm chip and full-featured SkyOS operating system.',
          ko: '자체 개발 5nm 신지 칩과 풀스택 SkyOS가 최초 탑재된 플래그십 ET9 고객 인도 시작.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Expansion of multi-brand strategy (NIO premium, ONVO family, Firefly compact) into global European and global markets.',
          ko: 'NIO(프리미엄), ONVO(패밀리), Firefly(콤팩트) 등 다브랜드 전략을 바탕으로 유럽 등 글로벌 시장 공략 가속.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Operation of over 5,000 Power Swap battery swapping stations worldwide with autonomous battery swap support.',
          ko: '자율주행 자동 충전·스왑을 지원하는 글로벌 5,000개소 이상의 배터리 스왑 스테이션 운영.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "NIO Inc. Official Investor Relations Web Portal",
          ko: "NIO Inc. 공식 IR 웹 포털",
        },
        url: "https://ir.nio.com/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-06-06",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "NIO IN Innovation Day Full Technology Disclosure",
          ko: "NIO IN 이노베이션 데이 종합 기술 및 SkyOS 공식 발표",
        },
        url: "https://ir.nio.com/news-releases",
        sourceType: "official-event",
        role: "historical",
        publishedDate: "2023-09-21",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'xpeng',
    companyName: 'XPeng Inc.',
    category: 'oem',
    headquarters: 'Guangzhou, Guangdong, China',
    ticker: 'XPEV',
    exchange: 'NYSE',
    irUrl: 'https://ir.xiaopeng.com/',
    latestEventOrReport: {
      en: 'XPeng Tech Day & Quarterly Financial Reports',
      ko: '샤오펑(XPeng) 테크 데이 및 분기 실적 발표 자료',
    },
    matrixSummary: {
      sdvOs: {
        en: 'XOS Tianji Cockpit AI OS',
        ko: 'XOS 천기(Tianji) 콕핏 AI 운영체제',
      },
      eeZonal: {
        en: 'Turing AI Chip Central Compute',
        ko: '튜링(Turing) AI 칩 중앙 컴퓨팅',
      },
      evPlatform: {
        en: 'SEPA 2.0 (800V SiC Architecture)',
        ko: 'SEPA 2.0 (800V SiC 고전압 플랫폼)',
      },
    },
    sdvArchitecture: {
      en: 'XOS Tianji (AI-powered intelligent operating system) integrating large language models into smart cabin interactions, cross-device connectivity, and end-to-end autonomous driving perception and planning.',
      ko: '스마트 콕핏 상호작용, 기기간 크로스 연결 및 엔드투엔드 자율주행 인지·판단에 대규모 언어 모델을 결합한 XOS 천기(Tianji) 인공지능 차량 운영체제.',
    },
    eeZonalArchitecture: {
      en: 'In-house designed Turing AI chip featuring 40-core processor architecture capable of running 30B parameter LLM models locally, serving as the central compute brain for vehicle ADAS and cockpit processing.',
      ko: '300억 파라미터 대형 언어 모델을 로컬에서 구동할 수 있는 40코어 자체 설계 튜링(Turing) AI 칩 기반 중앙 집중식 컴퓨팅 브레인.',
    },
    evPlatformStrategy: {
      en: 'SEPA 2.0 (Smart Electric Platform Architecture) with standard full-scenario 800V silicon carbide high-voltage architecture, integrated front and rear aluminum die-casting, and CIB (Cell Integrated Body) battery technology.',
      ko: '전 영역 800V 탄화규소(SiC) 고전압 시스템, 전후방 일체형 알루미늄 다이캐스팅 차체 및 배터리-차체 일체화 CIB 기술이 적용된 SEPA 2.0 플랫폼.',
    },
    autonomousDrivingAi: {
      en: 'XNGP full-scenario intelligent driving deploying end-to-end neural network architecture (XNet perception + XPlanner trajectory planning + XBrain spatial reasoning) delivering door-to-door autonomous navigation without HD maps.',
      ko: '고정밀 지도 없이 출발지부터 목적지까지 도어-투-도어 자율 내비게이션을 수행하는 XNGP 풀시나리오 자율주행. XNet 인지, XPlanner 경로 계획, XBrain 공간 추론의 엔드투엔드 신경망 탑재.',
    },
    softwareMonetization: {
      en: 'Monetizing software through standard premium vehicle positioning, OTA continuous feature upgrades, and commercial autonomous Robotaxi fleet operation pilot programs.',
      ko: '기본 프리미엄 지능형 주행 사양화, 지속적인 무선 OTA 기능 고도화 및 상용 무인 로보택시 플릿 시범 운행을 통한 소프트웨어 사업화.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Mass deployment of in-house Turing AI chip across XPeng and MONA sub-brand lineups.',
          ko: '자체 튜링(Turing) AI 칩의 샤오펑 및 MONA 브랜드 신차 라인업 대규모 양산 적용.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Commercial launch of L4 Robotaxi fleet operations with fully driverless testing.',
          ko: '완전 무인 주행 테스트를 거친 레벨 4 로보택시 상용 서비스 정식 론칭.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Global presence across 60+ countries with AI mobility spanning smart EVs, humanoid robotics, and flying vehicles.',
          ko: '글로벌 60개국 이상 진출 및 스마트 EV, 휴머노이드 로봇, 플라잉 카를 아우르는 글로벌 AI 모빌리티 기업 도약.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "XPeng Inc. Investor Relations Web Portal",
          ko: "샤오펑(XPeng) 공식 IR 웹 포털",
        },
        url: "https://ir.xiaopeng.com/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-05-21",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "XPeng 1024 Tech Day Official Keynote Presentation",
          ko: "샤오펑 1024 테크 데이 공식 기조연설 및 XNGP 로드맵",
        },
        url: "https://ir.xiaopeng.com/news-releases",
        sourceType: "official-event",
        role: "historical",
        publishedDate: "2023-10-24",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'li-auto',
    companyName: 'Li Auto Inc.',
    category: 'oem',
    headquarters: 'Beijing, China',
    ticker: 'LI',
    exchange: 'NASDAQ',
    irUrl: 'https://ir.lixiang.com/',
    latestEventOrReport: {
      en: 'Li Auto Quarterly Earnings & Autonomous Driving Tech Updates',
      ko: '리오토(Li Auto) 분기 실적 발표 및 자율주행 기술 업데이트',
    },
    matrixSummary: {
      sdvOs: {
        en: 'Li OS & Mind GPT Multimodal AI',
        ko: 'Li OS 및 Mind GPT 멀티모달 AI',
      },
      eeZonal: {
        en: 'Central Compute HPC Cluster',
        ko: '중앙 집중식 HPC 컴퓨트 클러스터',
      },
      evPlatform: {
        en: 'Dual Platform: EREV & 800V 5C Pure EV',
        ko: '이원화 플랫폼: 주행거리연장형(EREV) 및 800V 5C 순수전기',
      },
    },
    sdvArchitecture: {
      en: 'Proprietary Li OS vehicle software platform embedded with in-house developed Mind GPT multi-modal cognitive model, enabling context-aware voice assistance, multi-screen family entertainment, and automated spatial comfort management.',
      ko: '자체 개발 Mind GPT 멀티모달 인지 인공지능 모델이 내장된 독자 Li OS 차량 소프트웨어 플랫폼. 맥락 인지 음성 비서, 다중 화면 패밀리 엔터테인먼트 및 공간 쾌적성 자동 제어 제공.',
    },
    eeZonalArchitecture: {
      en: 'Central compute HPC architecture unifying intelligent driving and smart cabin into a centralized high-performance computing cluster powered by dual NVIDIA DRIVE Orin-X processors (508 TOPS) with high-speed CAN FD/Ethernet backbone.',
      ko: '듀얼 엔비디아 드라이브 오린-X(508 TOPS) 프로세서 기반 중앙 집중형 HPC 클러스터로 자율주행과 스마트 콕핏을 통합하고 고속 CAN FD 및 이더넷 백본으로 연결.',
    },
    evPlatformStrategy: {
      en: 'Dual-architecture strategy: Range-Extended Electric Vehicle (EREV) architecture with 1,000+ km total range for family SUVs, and dedicated 800V pure electric platform featuring 5C ultra-fast charging Qilin battery capable of adding 500 km range in 12 minutes.',
      ko: '패밀리 SUV를 위한 1,000km+ 종합 주행거리의 EREV(주행거리연장형 전기차) 플랫폼과 12분 만에 500km 주행거리를 충전하는 800V 5C 기린(Qilin) 배터리 탑재 순수 전기차 플랫폼의 이원화 전략.',
    },
    autonomousDrivingAi: {
      en: 'Dual-system autonomous driving architecture combining an End-to-End (E2E) neural network fast-reaction model with a Vision-Language Model (VLM) for human-like slow reasoning in complex edge cases, delivering nationwide City and Highway NOA without HD maps.',
      ko: '신속한 직관 주행을 담당하는 엔드투엔드(E2E) 신경망과 복잡한 엣지 케이스 추론을 담당하는 비전-언어 모델(VLM)을 결합한 듀얼 시스템 자율주행 아키텍처. 고정밀 지도 없이 전국 도심 및 고속도로 NOA 제공.',
    },
    softwareMonetization: {
      en: 'Standard inclusion of full ADAS and smart cockpit features across vehicle trims without recurring subscription fees, driving high gross margins through premium vehicle ASP and software differentiation.',
      ko: '별도의 유료 구독료 없이 전 트림에 고급 ADAS 및 스마트 콕핏 기능을 기본 탑재하여, 프리미엄 차량 판매 단가 및 높은 하드웨어·소프트웨어 통합 마진 확보.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Rollout of multiple 800V pure electric SUV models and expansion of 5C ultra-fast charging network to 2,000+ stations.',
          ko: '다수의 800V 순수 전기 SUV 모델 출시 및 2,000개소 이상의 5C 초고속 충전 네트워크 구축.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Full rollout of Level 3 autonomous driving capabilities based on advanced E2E + VLM multimodal architecture.',
          ko: '고도화된 E2E + VLM 멀티모달 아키텍처 기반 레벨 3 자율주행 기능 전면 상용화.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Establishment as the premier global AI mobility company with autonomous family mobility solutions.',
          ko: '글로벌 자율주행 패밀리 모빌리티 솔루션을 선도하는 세계 최고 수준의 AI 모빌리티 기업 도약.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Li Auto Autonomous Driving Technology & Strategy Disclosure",
          ko: "리오토 자율주행 기술 및 VLM 모델 전략 공식 공시",
        },
        url: "https://ir.lixiang.com/news-releases",
        sourceType: "press-release",
        role: "latest",
        publishedDate: "2024-07-05",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Li Auto Inc. Official Investor Relations Web Portal",
          ko: "리오토(Li Auto) 공식 IR 웹 포털",
        },
        url: "https://ir.lixiang.com/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-05-20",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'tata-motors',
    companyName: 'Tata Motors Limited',
    category: 'oem',
    headquarters: 'Mumbai, Maharashtra, India',
    ticker: 'TATAMOTORS',
    exchange: 'NSE',
    irUrl: 'https://www.tatamotors.com/investors/',
    latestEventOrReport: {
      en: 'Tata Motors Annual Strategic Report & Capital Markets Day Disclosures',
      ko: '타타 모터스 연례 경영 전략 보고서 및 캐피털 마켓 데이 공시',
    },
    matrixSummary: {
      sdvOs: {
        en: 'acti.ev Software Stack & ZConnect',
        ko: 'acti.ev 소프트웨어 스택 및 ZConnect',
      },
      eeZonal: {
        en: 'Scalable Domain Architecture',
        ko: '확장형 도메인 제어 아키텍처',
      },
      evPlatform: {
        en: 'acti.ev Pure EV & Avinya EMA Platform',
        ko: 'acti.ev 전용 순수전기 및 Avinya EMA 플랫폼',
      },
    },
    sdvArchitecture: {
      en: 'acti.ev pure electric software architecture engineered for Software-Defined Vehicles with cloud-native connectivity, higher computing power, microservice OTA firmware updates, and integrated third-party app suites.',
      ko: '클라우드 네이티브 연결성, 고성능 컴퓨팅 파워, 마이크로서비스 무선 OTA 펌웨어 업데이트 및 서드파티 앱 생태계가 결합된 SDV 전용 acti.ev 순수 전기차 소프트웨어 아키텍처.',
    },
    eeZonalArchitecture: {
      en: 'Multi-domain architecture integrating powertrain, cockpit, body, and ADAS ECUs, progressively migrating toward a centralized zonal E/E layout in technical collaboration with Tata Technologies and Jaguar Land Rover (JLR).',
      ko: '파워트레인, 콕핏, 바디 및 ADAS 제어기를 통합하는 멀티 도메인 구조로, 타타 테크놀로지스 및 재규어랜드로버(JLR)와의 협업을 통해 중앙 집중식 Zonal E/E 레이아웃으로 진화.',
    },
    evPlatformStrategy: {
      en: 'Dual electric architecture strategy: acti.ev multi-layer architecture with 400V/500+ km range for mainstream Indian passenger EVs (Punch.ev, Curvv.ev), and premium Avinya skateboard architecture sharing JLR\'s Electrified Modular Architecture (EMA).',
      ko: '이원화 전동화 플랫폼 전략: 펀치 EV, 쿠르브 EV 등 인도 대중형 승용 전기차를 위한 acti.ev 아키텍처(400V, 500km+ 주행거리)와 JLR의 EMA 플랫폼을 공유하는 프리미엄 아비냐(Avinya) 스케이트보드 플랫폼.',
    },
    autonomousDrivingAi: {
      en: 'Level 2 ADAS suite tailored specifically for Indian traffic scenarios, featuring forward collision warning, autonomous emergency braking, lane keep assist, and 360-degree surround camera perception.',
      ko: '전방 충돌 경고, 자동 긴급 제동, 차선 유지 보조 및 360도 서라운드 뷰를 결합하여 인도 현지 도로 및 교통 환경에 최적화된 레벨 2 ADAS 솔루션 구축.',
    },
    softwareMonetization: {
      en: 'ZConnect connected mobility services suite with 60+ connected features, smart home charging management, and Fleet Edge commercial vehicle telematics platform.',
      ko: '60개 이상의 커넥티드 기능을 지원하는 ZConnect 모빌리티 서비스, 스마트 홈 충전 관리 및 Fleet Edge 상용차 원격 텔레매틱스 플랫폼을 통한 수익화.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Expansion of pure electric portfolio to 10 distinct models across passenger car and SUV segments in India.',
          ko: '인도 시장 승용 및 SUV 세그먼트에 걸쳐 순수 전기차 라인업을 10개 모델로 대폭 확대.',
        },
      },
      {
        year: '2026',
        milestone: {
          en: 'Market debut of first luxury Avinya electric vehicle engineered on JLR EMA modular platform.',
          ko: 'JLR EMA 모듈러 플랫폼 기반 프리미엄 전기차 아비냐(Avinya) 양산 모델 글로벌 시장 출시.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Achieve 50% EV penetration in passenger vehicle sales and net-zero carbon operations by 2040.',
          ko: '승용차 판매의 50% 전동화 전환 달성 및 2040년 넷제로(Net-Zero) 탄소중립 실현을 향한 기반 구축.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Tata Motors Annual Integrated Report & Financial Disclosures",
          ko: "타타 모터스 연간 통합 보고서 및 재무 전략 공시",
        },
        url: "https://www.tatamotors.com/investors/annual-reports/",
        sourceType: "annual-report",
        role: "latest",
        publishedDate: "2024-06-03",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Tata Motors Official Investor Relations Web Portal",
          ko: "타타 모터스 공식 IR 웹 포털",
        },
        url: "https://www.tatamotors.com/investors/",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-05-10",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
  {
    companyId: 'mahindra',
    companyName: 'Mahindra & Mahindra Limited',
    category: 'oem',
    headquarters: 'Mumbai, Maharashtra, India',
    ticker: 'M&M',
    exchange: 'NSE',
    irUrl: 'https://www.mahindra.com/investor-relations',
    latestEventOrReport: {
      en: 'Mahindra Capital Markets Day & Born Electric Strategy Announcements',
      ko: '마힌드라 캐피털 마켓 데이 및 본 일렉트릭(Born Electric) 전략 공시',
    },
    matrixSummary: {
      sdvOs: {
        en: 'AdrenoX Connected Intelligence',
        ko: 'AdrenoX 지능형 커넥티드 플랫폼',
      },
      eeZonal: {
        en: 'Centralized Domain Controller Layout',
        ko: '중앙 집중식 도메인 제어기 레이아웃',
      },
      evPlatform: {
        en: 'INGLO (VW MEB Components)',
        ko: 'INGLO 전용 플랫폼 (폭스바겐 MEB 전동화 부품)',
      },
    },
    sdvArchitecture: {
      en: 'AdrenoX intelligent cockpit system powered by Qualcomm Snapdragon platform with Amazon Alexa built-in, offering multi-screen interactive clusters, remote smartphone controls, and continuous over-the-air firmware updates.',
      ko: '퀄컴 스냅드래곤 플랫폼과 아마존 알렉사를 내장한 AdrenoX 지능형 콕핏 시스템. 멀티스크린 대화형 계기판, 스마트폰 원격 차량 제어 및 지속적인 무선 OTA 펌웨어 업데이트 제공.',
    },
    eeZonalArchitecture: {
      en: 'Domain controller architecture linking infotainment, chassis control, and electric powertrain via high-speed CAN FD and automotive Ethernet, designed for scalable migration toward zonal gateway architectures.',
      ko: '인포테인먼트, 섀시 제어, 전기 파워트레인을 고속 CAN FD 및 차량용 이더넷으로 연결하는 도메인 제어기 구조로, 향후 영역(Zonal) 게이트웨이로의 원활한 확장을 고려하여 설계.',
    },
    evPlatformStrategy: {
      en: 'INGLO (Born Electric) purpose-built EV platform utilizing Volkswagen Group\'s MEB unified battery cells and electric drive components under a long-term strategic supply agreement, supporting 60-80 kWh battery packs with 175 kW fast charging.',
      ko: '폭스바겐 그룹과의 장기 전략적 부품 공급 계약을 통해 폭스바겐 MEB 통합 배터리 셀과 전동 구동계를 탑재하는 INGLO(본 일렉트릭) 전용 플랫폼. 60~80 kWh 배터리 용량 및 175 kW 급속 충전 지원.',
    },
    autonomousDrivingAi: {
      en: 'Level 2 ADAS deployed on XUV700 and BE.05 architectures utilizing Mobileye vision chips and millimeter-wave radar fusion, providing adaptive cruise control, lane keep assist, and smart pilot assist.',
      ko: '모빌아이 비전 칩과 밀리미터파 레이더 센서 퓨전을 통해 어댑티브 크루즈 컨트롤, 차선 유지 보조 및 스마트 파일럿 보조를 제공하는 XUV700 및 BE.05 플랫폼 탑재 레벨 2 ADAS.',
    },
    softwareMonetization: {
      en: 'Adrenox Connect telematics subscription services, over-the-air performance updates, and smart fleet telematics for commercial mobility fleets.',
      ko: 'Adrenox Connect 텔레매틱스 커넥티드 구독 서비스, 무선 OTA 성능 업그레이드 및 상용 플릿 대상 스마트 원격 관제 소프트웨어 수익화.',
    },
    strategicTargets: [
      {
        year: '2025',
        milestone: {
          en: 'Market debut of first INGLO-based Born Electric EV models (BE.05 and XEV.9e).',
          ko: 'INGLO 플랫폼 기반 최초의 본 일렉트릭(Born Electric) 전용 전기차(BE.05 및 XEV.9e) 시장 출시.',
        },
      },
      {
        year: '2027',
        milestone: {
          en: 'Expansion of Born Electric EV lineup to 5 dedicated SUV models with localized production in Pune.',
          ko: '푸네 신공장 가동을 통한 5개 모델의 전용 본 일렉트릭 SUV 라인업 확대 및 생산 본격화.',
        },
      },
      {
        year: '2030',
        milestone: {
          en: 'Target 20% to 30% of total Mahindra SUV portfolio sales to be fully electric.',
          ko: '전체 마힌드라 SUV 판매량의 20~30%를 순수 전기차로 전환 달성.',
        },
      },
    ],
    sources: [
      {
        title: {
          en: "Mahindra & Mahindra Official Investor Relations Web Portal",
          ko: "마힌드라 & 마힌드라 공식 IR 웹 포털",
        },
        url: "https://www.mahindra.com/investor-relations",
        sourceType: "official-website",
        role: "primary",
        publishedDate: "2024-05-16",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
      {
        title: {
          en: "Mahindra Capital Markets Day Presentation on EV Roadmap",
          ko: "마힌드라 캐피털 마켓 데이 전기차 전략 공식 발표",
        },
        url: "https://www.mahindra.com/investor-relations/reports",
        sourceType: "investor-presentation",
        role: "historical",
        publishedDate: "2023-08-04",
        lastVerified: "2026-09-13",
        confidence: "official",
      },
    ],
    lastVerified: '2026-09-13',
  },
];

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
      en: 'Q2 2024 / H1 Results & Mercedes-Benz Strategy Update (MB.OS Launch Preparation)',
      ko: '2024년 2분기 실적 발표 및 메르세데스-벤츠 전략 업데이트 (MB.OS 양산 준비)',
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
    keyCitations: [
      'Mercedes-Benz Strategy Update: MB.OS Presentation',
      'Mercedes-Benz Group AG Annual Results & Capital Markets Information',
    ],
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
      en: 'Q2/Q3 2024 Shareholder Update & "We, Robot" Autonomous Event',
      ko: '2024년 2/3분기 주주 서한 및 "We, Robot" 자율주행 로보택시 공개 행사',
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
    keyCitations: [
      'Tesla Q2/Q3 Shareholder Presentation Deck',
      'Tesla "We, Robot" Event Keynote & Autonomous Transportation Deck',
    ],
  },
  {
    companyId: 'hyundai-motor-group',
    companyName: 'Hyundai Motor Group',
    category: 'oem',
    headquarters: 'Seoul, South Korea',
    ticker: '005380',
    exchange: 'KRX',
    irUrl: 'https://www.hyundai.com/worldwide/en/company/ir',
    latestEventOrReport: {
      en: 'Hyundai CEO Investor Day 2024 ("Hyundai Way") & HMG SDV Tech Day',
      ko: '2024 현대 CEO 인베스터 데이 ("현대 웨이") 및 HMG SDV 테크 데이',
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
    keyCitations: [
      'Hyundai CEO Investor Day 2024 Presentation ("Hyundai Way")',
      'Hyundai Motor Group Unlock the Software Age Keynote Deck',
    ],
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
      en: 'BMW Group Annual Conference & Half-Year Financial Report (Neue Klasse Milestones)',
      ko: 'BMW 그룹 연례 컨퍼런스 및 반기 실적 보고서 (노이에 클라세 주요 일정)',
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
    keyCitations: [
      'BMW Group Annual Conference Presentation',
      'BMW Vision Neue Klasse Technical Factsheet & Media Release',
    ],
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
    keyCitations: [
      'Volkswagen Group Capital Markets Day Presentation',
      'Volkswagen Group & Rivian Joint Venture Investor Factsheet',
    ],
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
    keyCitations: [
      'Toyota Motor Corporation Financial Results & Strategic Briefing',
      'Toyota Technical Workshop Presentation Materials',
    ],
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
    keyCitations: [
      'NVIDIA Automotive Investor Presentation',
      'NVIDIA GTC Keynote: Future of Autonomous Transport',
    ],
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
    keyCitations: [
      'Qualcomm Automotive Investor Day Presentation & Factsheet',
      'Snapdragon Digital Chassis Whitepaper & Technology Overview',
    ],
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
      en: 'Mobileye Investor Conference & Q2 Earnings Call',
      ko: '모빌아이 인베스터 컨퍼런스 및 2분기 실적 발표',
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
    keyCitations: [
      'Mobileye Investor Relations Presentation',
      'Mobileye Technology Briefing: True Redundancy & EyeQ6 Specs',
    ],
  },
  {
    companyId: 'hyundai-mobis',
    companyName: 'Hyundai Mobis Co., Ltd.',
    category: 'tier1',
    headquarters: 'Seoul, South Korea',
    ticker: '012330',
    exchange: 'KRX',
    irUrl: 'https://www.mobis.co.kr/en/ir/main.do',
    latestEventOrReport: {
      en: 'Hyundai Mobis CEO Investor Day & Business Strategy Presentation',
      ko: '현대모비스 CEO 인베스터 데이 및 사업 전략 발표',
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
    keyCitations: [
      'Hyundai Mobis CEO Investor Day Presentation',
      'Hyundai Mobis Sustainability & Corporate Factbook',
    ],
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
    keyCitations: [
      'LG Electronics Investor Relations Corporate Presentation',
      'LG AlphaWare SDV Solution Portfolio Technical Whitepaper',
    ],
  },
];


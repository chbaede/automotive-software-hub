import { StackLayer } from '../types/stack';

export const stackLayers: StackLayer[] = [
  // --- CORE VEHICLE STACK (Layered Architecture Top -> Base) ---
  {
    id: 'application-experience',
    name: { en: 'Application & Experience', ko: '애플리케이션 & 사용자 경험' },
    description: {
      en: 'In-Vehicle Infotainment (IVI), Digital Cockpit, Instrument Cluster, HUD, and ADAS application software.',
      ko: '인포테인먼트(IVI), 디지털 콕핏, 계기판, HUD 및 ADAS 애플리케이션.',
    },
    order: 1,
    layerType: 'core',
    colorTheme: 'purple',
  },
  {
    id: 'middleware-communication',
    name: { en: 'Middleware & Automotive Platforms', ko: '미들웨어 & 오토모티브 플랫폼' },
    description: {
      en: 'AUTOSAR Adaptive Platform, AUTOSAR Classic Platform, SOME/IP, DDS, Eclipse uProtocol, ROS 2, D-Bus, and IPC brokers.',
      ko: 'AUTOSAR Adaptive, AUTOSAR Classic, SOME/IP, DDS, Eclipse uProtocol, ROS 2, D-Bus 및 IPC 브로커.',
    },
    order: 2,
    layerType: 'core',
    colorTheme: 'indigo',
  },
  {
    id: 'vehicle-services',
    name: { en: 'Vehicle Services & Networks', ko: '차량 서비스 & 네트워크' },
    description: {
      en: 'CAN/CAN FD, Automotive Ethernet, UDS diagnostics, DoIP, COVESA VSS data models, and ISO 26262/21434 services.',
      ko: 'CAN/CAN FD, 오토모티브 이더넷, UDS 진단, DoIP, COVESA VSS 데이터 모델 및 기능 안전/보안.',
    },
    order: 3,
    layerType: 'core',
    colorTheme: 'emerald',
  },
  {
    id: 'operating-systems',
    name: { en: 'Operating Systems (OS)', ko: '운영체제 (OS)' },
    description: {
      en: 'Android Automotive OS, Embedded Linux, AGL UCB, QNX Neutrino RTOS, Green Hills INTEGRITY, and SYSGO PikeOS.',
      ko: '안드로이드 오토모티브 OS, 임베디드 리눅스, AGL UCB, QNX RTOS, Green Hills INTEGRITY 및 SYSGO PikeOS.',
    },
    order: 4,
    layerType: 'core',
    colorTheme: 'sky',
  },
  {
    id: 'hypervisor-virtualization',
    name: { en: 'Hypervisor & Virtualization', ko: '하이퍼바이저 & 가상화' },
    description: {
      en: 'Safety-certified Type-1 hypervisors (QNX Hypervisor, KVM, Xen, Jailhouse) for mixed-criticality isolation.',
      ko: '이종 안전도(Mixed-Criticality) 시스템 격리를 위한 기능 안전 Type-1 하이퍼바이저.',
    },
    order: 5,
    layerType: 'core',
    colorTheme: 'amber',
  },
  {
    id: 'hardware-compute',
    name: { en: 'Hardware & Compute (SoCs / MCUs)', ko: '하드웨어 & 컴퓨팅 (SoC / MCU)' },
    description: {
      en: 'Base silicon foundation: SoCs (NVIDIA Thor, Qualcomm Snapdragon), MCUs (NXP S32), Zonal Controllers, and ECUs.',
      ko: '최하단 실리콘 기반: SoC (NVIDIA Thor, Qualcomm Snapdragon), MCU (NXP S32), 영역 제어기 및 ECU.',
    },
    order: 6,
    layerType: 'core',
    colorTheme: 'slate',
  },

  // --- CROSS-CUTTING PILLARS (Process, Tooling, Build, Cloud & Security spanning all layers) ---
  {
    id: 'process-compliance-security',
    name: { en: 'Process, Safety & Compliance', ko: '프로세스, 안전, 보안 규제 & 컴플라이언스' },
    description: {
      en: 'Automotive SPICE (ASPICE 4.0), ISO 26262 ASIL-D, ISO 21434, EU Cyber Resilience Act (CRA), SBOM, and FOSS License Compliance.',
      ko: 'Automotive SPICE (ASPICE 4.0), ISO 26262 ASIL-D, ISO 21434, EU 사이버 복원력 법안(CRA), SBOM 및 오픈소스 라이선스 컴플라이언스.',
    },
    order: 10,
    layerType: 'cross-cutting',
    colorTheme: 'amber',
  },
  {
    id: 'build-platform',
    name: { en: 'Build & Platform Infrastructure', ko: '빌드 시스템 & 플랫폼 인프라' },
    description: {
      en: 'Cross-layer distribution & build engines: Yocto, BitBake, Bazel, Soong, Buildroot, and AOSP build.',
      ko: '전 레이어 커스텀 리눅스/안드로이드 빌드 엔진: Yocto, BitBake, Bazel, Soong, Buildroot.',
    },
    order: 11,
    layerType: 'cross-cutting',
    colorTheme: 'rose',
  },
  {
    id: 'development-testing',
    name: { en: 'Development, Testing & Simulation', ko: '개발 도구, 테스팅 & 시뮬레이션' },
    description: {
      en: 'dSPACE SCALEXIO HIL, IPG CarMaker, CARLA Simulator, SocketCAN, ADB, Google Perfetto, and Renode.',
      ko: 'dSPACE SCALEXIO HIL, IPG CarMaker, CARLA 시뮬레이터, SocketCAN, ADB, Perfetto 및 Renode.',
    },
    order: 12,
    layerType: 'cross-cutting',
    colorTheme: 'teal',
  },
  {
    id: 'cloud-devops',
    name: { en: 'Cloud & DevOps / OTA Platform', ko: '클라우드 & DevOps / OTA 플랫폼' },
    description: {
      en: 'Vehicle-to-cloud sync, OTA software update agents, fleet telematics, Eclipse Ankaios/Leda, and CI/CD.',
      ko: '차량-클라우드 연동, OTA 무선 소프트웨어 업데이트 에이전트, Eclipse Ankaios/Leda 및 CI/CD.',
    },
    order: 13,
    layerType: 'cross-cutting',
    colorTheme: 'violet',
  },
];

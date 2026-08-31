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
  },
  {
    id: 'vehicle-services',
    name: { en: 'Vehicle Services & Networks', ko: '차량 서비스 & 네트워크' },
    description: {
      en: 'CAN/CAN FD, Automotive Ethernet, UDS diagnostics, DoIP, COVESA VSS data models, and ISO 26262/21434 services.',
      ko: 'CAN/CAN FD, 오토모티브 이더넷, UDS 진단, DoIP, COVESA VSS 데이터 모델 및 기능 안전/보안.',
    },
    order: 2,
    layerType: 'core',
  },
  {
    id: 'middleware-communication',
    name: { en: 'Middleware & Communication', ko: '미들웨어 & 통신' },
    description: {
      en: 'Service-oriented RPC, SOME/IP, DDS, Eclipse uProtocol, ROS 2, D-Bus, and vehicle IPC brokers.',
      ko: '서비스 지향 RPC, SOME/IP, DDS, Eclipse uProtocol, ROS 2, D-Bus 및 IPC 브로커.',
    },
    order: 3,
    layerType: 'core',
  },
  {
    id: 'operating-systems',
    name: { en: 'Operating Systems (OS)', ko: '운영체제 (OS)' },
    description: {
      en: 'Android Automotive OS, Embedded Linux, QNX Neutrino RTOS, AUTOSAR Adaptive (ARA), and AUTOSAR Classic (BSW).',
      ko: '안드로이드 오토모티브 OS, 임베디드 리눅스, QNX RTOS, AUTOSAR Adaptive(ARA) 및 Classic(BSW).',
    },
    order: 4,
    layerType: 'core',
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
  },

  // --- CROSS-CUTTING PILLARS (Tooling, Build, Cloud & Process spanning all layers) ---
  {
    id: 'build-platform',
    name: { en: 'Build & Platform', ko: '빌드 시스템 & 플랫폼' },
    description: {
      en: 'Cross-layer Linux distro generators: Yocto Project, BitBake, CMake, and BSP build tools.',
      ko: '전 레이어 커스텀 리눅스 배포판 생성 도구: Yocto Project, BitBake, CMake 및 BSP 빌드 시스템.',
    },
    order: 10,
    layerType: 'cross-cutting',
  },
  {
    id: 'development-testing',
    name: { en: 'Development & Testing', ko: '개발 도구, 테스팅 & 프로파일링' },
    description: {
      en: 'SocketCAN, ADB, Google Perfetto, Vector CANoe, HIL/SIL simulation, and debuggers.',
      ko: 'SocketCAN, ADB, Perfetto, Vector CANoe, HIL/SIL 시뮬레이션 및 디버거.',
    },
    order: 11,
    layerType: 'cross-cutting',
  },
  {
    id: 'cloud-devops',
    name: { en: 'Cloud & DevOps / OTA', ko: '클라우드 & DevOps / OTA' },
    description: {
      en: 'Vehicle-to-cloud sync, OTA software update agents, fleet telematics, and CI/CD pipelines.',
      ko: '차량-클라우드 연동, OTA 무선 소프트웨어 업데이트 에이전트 및 텔레매틱스 플릿 관리.',
    },
    order: 12,
    layerType: 'cross-cutting',
  },
];

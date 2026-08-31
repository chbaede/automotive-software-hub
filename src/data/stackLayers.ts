import { StackLayer } from '../types/stack';

export const stackLayers: StackLayer[] = [
  {
    id: 'hardware-compute',
    name: { en: '1. Hardware & Compute', ko: '1. 하드웨어 및 컴퓨팅' },
    description: {
      en: 'SoCs, microcontrollers (MCU), domain/zonal controllers, vehicle computers, and automotive sensor bus hardware.',
      ko: 'SoC, 마이크로컨트롤러(MCU), 도메인/영역 제어기, 차량용 컴퓨터 및 센서 버스 하드웨어.',
    },
    order: 1,
  },
  {
    id: 'hypervisor-virtualization',
    name: { en: '2. Hypervisor & Virtualization', ko: '2. 하이퍼바이저 및 가상화' },
    description: {
      en: 'Safety-critical microkernel hypervisors and partition managers for mixed-criticality hardware isolation.',
      ko: '이종 안전도(Mixed-Criticality) 하드웨어 격리를 위한 기능 안전 인증 미크로커널 하이퍼바이저.',
    },
    order: 2,
  },
  {
    id: 'operating-systems',
    name: { en: '3. Operating Systems', ko: '3. 운영체제 (OS)' },
    description: {
      en: 'Embedded Linux, RTOS, Android Automotive OS, QNX Neutrino, AUTOSAR Classic (BSW), and AUTOSAR Adaptive (ARA).',
      ko: '임베디드 리눅스, RTOS, 안드로이드 오토모티브 OS, QNX, AUTOSAR Classic(BSW) 및 Adaptive(ARA).',
    },
    order: 3,
  },
  {
    id: 'build-platform',
    name: { en: '4. Build & Platform', ko: '4. 빌드 시스템 및 플랫폼' },
    description: {
      en: 'Custom Linux distribution generators, cross-compilers, recipes, and platform build systems.',
      ko: '맞춤형 리눅스 디스트리뷰션 생성기, 크로스 컴파일러, 레시피 및 플랫폼 빌드 시스템.',
    },
    order: 4,
  },
  {
    id: 'middleware-communication',
    name: { en: '5. Middleware & Communication', ko: '5. 미들웨어 및 통신' },
    description: {
      en: 'Service-oriented middleware, pub/sub, RPC, DDS, uProtocol, SOME/IP, and vehicle IPC brokers.',
      ko: '서비스 지향 미들웨어, Pub/Sub, RPC, DDS, uProtocol, SOME/IP 및 차량 내 IPC 브로커.',
    },
    order: 5,
  },
  {
    id: 'vehicle-services',
    name: { en: '6. Vehicle Services & Networks', ko: '6. 차량 서비스 및 네트워크' },
    description: {
      en: 'CAN, LIN, Automotive Ethernet, DoIP, UDS diagnostics, COVESA VSS data models, and ISO 26262/21434 stacks.',
      ko: 'CAN, LIN, 오토모티브 이더넷, DoIP, UDS 진단, COVESA VSS 데이터 모델 및 안전/보안 서비스.',
    },
    order: 6,
  },
  {
    id: 'application-experience',
    name: { en: '7. Application & Experience', ko: '7. 애플리케이션 및 사용자 경험' },
    description: {
      en: 'In-Vehicle Infotainment (IVI), Digital Cockpit, Instrument Cluster, ADAS perception, and vehicle apps.',
      ko: '차량 인포테인먼트(IVI), 디지털 콕핏, 계기판, ADAS 인지 알고리즘 및 차량용 앱.',
    },
    order: 7,
  },
  {
    id: 'cloud-devops',
    name: { en: '8. Cloud & DevOps', ko: '8. 커넥티드 카, 클라우드 & OTA' },
    description: {
      en: 'Over-The-Air (OTA) software update agents, telematics backends, fleet analytics, and vehicle-to-cloud sync.',
      ko: 'Over-The-Air (OTA) 소프트웨어 업데이트, 텔레매틱스 백엔드, 플릿 분석 및 차량-클라우드 연동.',
    },
    order: 8,
  },
  {
    id: 'development-testing',
    name: { en: '9. Development & Testing', ko: '9. 개발 도구, 에뮬레이션 & 시뮬레이션' },
    description: {
      en: 'Hardware-in-the-Loop (HIL), Software-in-the-Loop (SIL), SocketCAN, CANoe, ADB, trace profilers, and debuggers.',
      ko: 'HIL, SIL 시뮬레이션, SocketCAN, CANoe, ADB, 트레이스 프로파일러 및 하드웨어 디버거.',
    },
    order: 9,
  },
];


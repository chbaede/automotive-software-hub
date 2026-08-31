import { TopicId, TopicMeta } from '../types/taxonomy';

export const TOPIC_TAXONOMY: Record<TopicId, TopicMeta> = {
  sdv: {
    id: 'sdv',
    label: { en: 'Software-Defined Vehicle', ko: '소프트웨어 정의 차량 (SDV)' },
    description: { en: 'Architectures and platforms for software-defined mobility', ko: '소프트웨어 중심 모빌리티를 위한 아키텍처 및 플랫폼' },
  },
  'android-automotive': {
    id: 'android-automotive',
    label: { en: 'Android Automotive OS', ko: '안드로이드 오토모티브 OS' },
    description: { en: 'In-Vehicle Infotainment (IVI) operating system stack', ko: '차량용 인포테인먼트(IVI) 운영체제 스택' },
  },
  yocto: {
    id: 'yocto',
    label: { en: 'Yocto Project', ko: '요크토 프로젝트' },
    description: { en: 'Custom Linux distribution build system for embedded automotive hardware', ko: '임베디드 오토모티브 하드웨어 맞춤형 리눅스 빌드 시스템' },
  },
  'embedded-linux': {
    id: 'embedded-linux',
    label: { en: 'Embedded Linux', ko: '임베디드 리눅스' },
    description: { en: 'Kernel, drivers, and userland systems for automotive ECUs', ko: '차량용 ECU를 위한 커널, 드라이버 및 사용자 공간 시스템' },
  },
  qnx: {
    id: 'qnx',
    label: { en: 'QNX Neutrino RTOS', ko: 'QNX Neutrino RTOS' },
    description: { en: 'Safety-critical microkernel real-time operating system', ko: '기능 안전 인증 미크로커널 실시간 운영체제' },
  },
  autosar: {
    id: 'autosar',
    label: { en: 'AUTOSAR', ko: '오토사 (AUTOSAR)' },
    description: { en: 'Classic and Adaptive AUTOSAR standardized automotive software architectures', ko: '클래식 및 어댑티브 AUTOSAR 표준 차량용 소프트웨어 아키텍처' },
  },
  can: {
    id: 'can',
    label: { en: 'CAN / CAN FD', ko: 'CAN / CAN FD' },
    description: { en: 'Controller Area Network bus communications & frame protocols', ko: '차량 내 네트워크 버스 통신 및 프레임 프로토콜' },
  },
  someip: {
    id: 'someip',
    label: { en: 'SOME/IP', ko: 'SOME/IP' },
    description: { en: 'Scalable service-Oriented MiddlewarE over IP protocol', ko: 'IP 기반 확장 가능한 서비스 지향 미들웨어 프로토콜' },
  },
  doip: {
    id: 'doip',
    label: { en: 'DoIP (ISO 13400)', ko: 'DoIP (ISO 13400)' },
    description: { en: 'Diagnostic communication over Internet Protocol', ko: 'IP 기반 차량 진단 통신 표준' },
  },
  uds: {
    id: 'uds',
    label: { en: 'UDS (ISO 14229)', ko: 'UDS (ISO 14229)' },
    description: { en: 'Unified Diagnostic Services standard protocol for automotive ECUs', ko: '차량 ECU 통합 진단 서비스 표준 프로토콜' },
  },
  'automotive-ethernet': {
    id: 'automotive-ethernet',
    label: { en: 'Automotive Ethernet', ko: '오토모티브 이더넷' },
    description: { en: '100BASE-T1 / 1000BASE-T1 high-speed vehicle network transport', ko: '차량용 고속 네트워크 전송 기술' },
  },
  adas: {
    id: 'adas',
    label: { en: 'ADAS & Autonomous', ko: 'ADAS 및 자율주행' },
    description: { en: 'Advanced Driver Assistance Systems & automated driving software', ko: '첨단 운전자 보조 시스템 및 자율주행 소프트웨어' },
  },
  'functional-safety': {
    id: 'functional-safety',
    label: { en: 'Functional Safety (ISO 26262)', ko: '기능 안전 (ISO 26262)' },
    description: { en: 'ASIL risk classification and safety lifecycle development standards', ko: 'ASIL 위험도 분류 및 안전 수명주기 개발 표준' },
  },
  cybersecurity: {
    id: 'cybersecurity',
    label: { en: 'Cybersecurity (ISO 21434)', ko: '차량 사이버 보안 (ISO 21434)' },
    description: { en: 'Road vehicles cybersecurity engineering standards and threat modeling', ko: '차량 사이버 보안 공학 표준 및 위협 모델링' },
  },
  middleware: {
    id: 'middleware',
    label: { en: 'Middleware & Communication', ko: '미들웨어 및 통신' },
    description: { en: 'RPC, Pub/Sub, DDS, and message brokers for vehicles', ko: '차량용 RPC, Pub/Sub, DDS 및 메시지 브로커' },
  },
  cloud: {
    id: 'cloud',
    label: { en: 'Connected Car & Cloud', ko: '커넥티드 카 및 클라우드' },
    description: { en: 'Telematics, OTA updates, and cloud connectivity infrastructure', ko: '텔레매틱스, OTA 업데이트 및 클라우드 연동 인프라' },
  },
  'open-source': {
    id: 'open-source',
    label: { en: 'Open Source', ko: '오픈 소스' },
    description: { en: 'Open source projects, foundations, and community software', ko: '오픈 소스 프로젝트, 재단 및 커뮤니티 소프트웨어' },
  },
  ros2: {
    id: 'ros2',
    label: { en: 'ROS 2 / Autoware', ko: 'ROS 2 / 오토웨어' },
    description: { en: 'Robot Operating System and autonomous vehicle middleware', ko: '로봇 운영체제 및 자율주행 차량 미들웨어' },
  },
  covesa: {
    id: 'covesa',
    label: { en: 'COVESA / VSS', ko: 'COVESA / VSS' },
    description: { en: 'Connected Vehicle Systems Alliance & Vehicle Signal Specification', ko: '커넥티드 차량 시스템 연합 및 차량 신호 명세' },
  },
};

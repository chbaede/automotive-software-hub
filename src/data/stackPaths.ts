import { StackPath } from '../types/architecture';

export const stackPaths: StackPath[] = [
  {
    id: 'android-cockpit-path',
    name: {
      en: 'Android Automotive Cockpit Stack Path',
      ko: '안드로이드 오토모티브 디지털 콕핏 탐색 경로',
    },
    description: {
      en: 'Multi-display cockpit flow from Cockpit SoC hardware -> Type-1 Hypervisor -> Linux kernel -> AAOS platform -> Vehicle Signal Specification.',
      ko: '콕핏 SoC 하드웨어 -> Type-1 하이퍼바이저 -> 리눅스 커널 -> 안드로이드 오토모티브 OS -> 차량 신호 명세로 이어지는 콕핏 아키텍처 탐색 경로.',
    },
    architectureProfileId: 'android-automotive',
    topics: ['android-automotive', 'qnx', 'embedded-linux', 'someip'],
    hops: [
      {
        technologyId: 'qualcomm-snapdragon-cockpit',
        relationshipToNext: 'runs-on',
        note: {
          en: 'Snapdragon 8295 Cockpit SoC platform powering hardware partitions.',
          ko: '하드웨어 분할을 구동하는 Snapdragon 8295 콕핏 SoC 플랫폼.',
        },
      },
      {
        technologyId: 'qnx-hypervisor',
        relationshipToNext: 'depends-on',
        note: {
          en: 'Type-1 hypervisor partitioning safety cluster and Android OS.',
          ko: '계기판과 안드로이드 OS를 분할 격리하는 Type-1 하이퍼바이저.',
        },
      },
      {
        technologyId: 'linux-kernel',
        relationshipToNext: 'depends-on',
        note: {
          en: 'Mainline Linux kernel with Binder and VHAL drivers.',
          ko: '바인더 및 VHAL 드라이버를 포함한 리눅스 커널.',
        },
      },
      {
        technologyId: 'android-automotive-os',
        relationshipToNext: 'integrates-with',
        note: {
          en: 'Android Automotive OS framework and CarService.',
          ko: '안드로이드 오토모티브 OS 프레임워크 및 CarService.',
        },
      },
      {
        technologyId: 'covesa-vss',
        note: {
          en: 'Standardized vehicle signal tree for cockpit telemetry.',
          ko: '콕핏 텔레매틱스를 위한 표준 차량 신호 트리.',
        },
      },
    ],
  },
  {
    id: 'autosar-adaptive-path',
    name: {
      en: 'AUTOSAR Adaptive Service-Oriented (SOA) Path',
      ko: 'AUTOSAR Adaptive 서비스 지향 아키텍처 탐색 경로',
    },
    description: {
      en: 'High-performance MPU stack from POSIX OS (QNX Neutrino) -> ARA runtime -> ara::com SOME/IP -> vsomeip -> DoIP -> UDS diagnostics.',
      ko: 'POSIX OS (QNX) -> ARA 런타임 -> SOME/IP -> vsomeip -> DoIP -> UDS 진단으로 연결되는 서비스 지향 미들웨어 경로.',
    },
    architectureProfileId: 'autosar-adaptive',
    topics: ['autosar', 'someip', 'functional-safety', 'sdv'],
    hops: [
      {
        technologyId: 'qnx-neutrino',
        relationshipToNext: 'runs-on',
        note: {
          en: 'ASIL-D certified POSIX PSE51 microkernel runtime.',
          ko: 'ASIL-D 인증 POSIX PSE51 마이크로커널 런타임.',
        },
      },
      {
        technologyId: 'autosar-adaptive',
        relationshipToNext: 'depends-on',
        note: {
          en: 'AUTOSAR Adaptive Platform (ara::com / ara::exec).',
          ko: 'AUTOSAR Adaptive 미들웨어 플랫폼.',
        },
      },
      {
        technologyId: 'someip-protocol',
        relationshipToNext: 'implemented-by',
        note: {
          en: 'SOME/IP service-oriented IPC communication standard.',
          ko: 'SOME/IP 서비스 지향 IPC 통신 표준.',
        },
      },
      {
        technologyId: 'vsomeip-middleware',
        relationshipToNext: 'integrates-with',
        note: {
          en: 'COVESA C++ reference implementation of SOME/IP.',
          ko: 'COVESA SOME/IP C++ 레퍼런스 구현체.',
        },
      },
      {
        technologyId: 'doip-protocol',
        relationshipToNext: 'depends-on',
        note: {
          en: 'Diagnostic over IP (ISO 13400) high-speed transport.',
          ko: '이더넷 기반 고속 DoIP 진단 프로토콜.',
        },
      },
      {
        technologyId: 'uds-protocol',
        note: {
          en: 'ISO 14229 Unified Diagnostic Services.',
          ko: 'ISO 14229 통합 진단 서비스.',
        },
      },
    ],
  },
  {
    id: 'autosar-classic-ecu-path',
    name: {
      en: 'AUTOSAR Classic Microcontroller (MCU) Path',
      ko: 'AUTOSAR Classic 마이크로컨트롤러(MCU) 섀시 제어 경로',
    },
    description: {
      en: 'Real-time safety ECU stack: NXP S32 MCU -> AUTOSAR Classic BSW -> CAN/CAN-FD bus drivers -> UDS diagnostic services.',
      ko: 'NXP S32 MCU -> AUTOSAR Classic BSW -> CAN 버스 드라이버 -> UDS 진단 서비스로 이어지는 실시간 안전 제어기 스택 경로.',
    },
    architectureProfileId: 'zonal-architecture',
    topics: ['can', 'autosar', 'functional-safety'],
    hops: [
      {
        technologyId: 'nxp-s32',
        relationshipToNext: 'runs-on',
        note: {
          en: 'Real-time automotive microcontroller platform.',
          ko: '실시간 오토모티브 마이크로컨트롤러 SoC.',
        },
      },
      {
        technologyId: 'autosar-classic',
        relationshipToNext: 'depends-on',
        note: {
          en: 'AUTOSAR Classic Basic Software (BSW) & OSEK/VDX OS.',
          ko: 'AUTOSAR Classic BSW 및 OSEK/VDX 실시간 OS.',
        },
      },
      {
        technologyId: 'can-protocol',
        relationshipToNext: 'integrates-with',
        note: {
          en: 'CAN / CAN-FD bus communication stack.',
          ko: 'CAN / CAN-FD 버스 통신 드라이버 스택.',
        },
      },
      {
        technologyId: 'uds-protocol',
        note: {
          en: 'UDS (ISO 14229) diagnostic communication manager.',
          ko: 'ISO 14229 UDS 진단 통신 관리자.',
        },
      },
    ],
  },
  {
    id: 'centralized-hpc-path',
    name: {
      en: 'Centralized Vehicle Compute (HPC) Path',
      ko: '중앙 집중식 고성능 컴퓨팅 (HPC) 아키텍처 경로',
    },
    description: {
      en: 'Server-class vehicle central compute: NVIDIA Thor -> DRIVE OS Hypervisor -> Red Hat In-Vehicle OS -> Ankaios -> uProtocol.',
      ko: 'NVIDIA Thor -> DRIVE OS 하이퍼바이저 -> Red Hat In-Vehicle OS -> Ankaios -> uProtocol로 연결되는 서버급 중앙 컴퓨팅 경로.',
    },
    architectureProfileId: 'centralized-compute',
    topics: ['sdv', 'cloud', 'cybersecurity', 'someip'],
    hops: [
      {
        technologyId: 'nvidia-drive-thor',
        relationshipToNext: 'runs-on',
        note: {
          en: '2,000 TFLOPS Blackwell central compute SoC.',
          ko: '2,000 TFLOPS 성능의 중앙 집중식 고성능 SoC.',
        },
      },
      {
        technologyId: 'nvidia-drive-hypervisor',
        relationshipToNext: 'runs-on',
        note: {
          en: 'DRIVE OS Type-1 hardware hypervisor.',
          ko: 'DRIVE OS 하드웨어 Type-1 하이퍼바이저.',
        },
      },
      {
        technologyId: 'redhat-in-vehicle-os',
        relationshipToNext: 'runs-on',
        note: {
          en: 'Functional-safety certifiable Linux distribution.',
          ko: '기능 안전 인증 엔터프라이즈 리눅스 OS.',
        },
      },
      {
        technologyId: 'eclipse-ankaios',
        relationshipToNext: 'integrates-with',
        note: {
          en: 'Container workload orchestrator for SDV applications.',
          ko: 'SDV 앱을 위한 컨테이너 워크로드 오케스트레이터.',
        },
      },
      {
        technologyId: 'eclipse-uprotocol',
        note: {
          en: 'Ubiquitous cloud-to-car service communication protocol.',
          ko: '유비쿼터스 클라우드-차량 간 서비스 통신 프로토콜.',
        },
      },
    ],
  },
  {
    id: 'sdv-cloud-to-car-path',
    name: {
      en: 'Cloud-Native SDV Service Path',
      ko: '클라우드 네이티브 SDV 서비스 연동 탐색 경로',
    },
    description: {
      en: 'End-to-end cloud-to-vehicle pipeline: Cloud Fleet OTA -> uProtocol transport -> COVESA VSS signal model -> Ankaios containers.',
      ko: '클라우드 플릿 OTA -> uProtocol 전송 계층 -> COVESA VSS 신호 모델 -> Ankaios 컨테이너로 연결되는 클라우드-차량 연동 경로.',
    },
    architectureProfileId: 'sdv-platform',
    topics: ['sdv', 'open-source', 'cloud', 'covesa'],
    hops: [
      {
        technologyId: 'ota-cloud-fleet',
        relationshipToNext: 'integrates-with',
        note: {
          en: 'Cloud OTA updates and vehicle fleet management.',
          ko: '클라우드 기반 OTA 업데이트 및 차량 플릿 관리.',
        },
      },
      {
        technologyId: 'eclipse-uprotocol',
        relationshipToNext: 'integrates-with',
        note: {
          en: 'uProtocol cloud-to-car messaging abstraction.',
          ko: 'uProtocol 클라우드-차량 메시징 추상화.',
        },
      },
      {
        technologyId: 'covesa-vss',
        relationshipToNext: 'integrates-with',
        note: {
          en: 'COVESA Vehicle Signal Specification data tree.',
          ko: 'COVESA VSS 차량 표준 신호 데이터 트리.',
        },
      },
      {
        technologyId: 'eclipse-ankaios',
        note: {
          en: 'Target container runtime deploying microservices.',
          ko: '마이크로서비스를 배포하는 타겟 컨테이너 런타임.',
        },
      },
    ],
  },
  {
    id: 'adas-autonomous-path',
    name: {
      en: 'ADAS & Autonomous Perception Pipeline Path',
      ko: 'ADAS 및 자율주행 인지 파이프라인 경로',
    },
    description: {
      en: 'High-compute perception pipeline: NVIDIA Thor -> Real-Time Linux (PREEMPT_RT) -> ROS 2 / Autoware -> DDS -> iceoryx zero-copy IPC -> CARLA Simulator.',
      ko: 'NVIDIA Thor -> 실시간 리눅스 -> ROS 2 / Autoware -> DDS -> iceoryx 제로카피 IPC -> CARLA 시뮬레이터로 연결되는 자율주행 데이터 경로.',
    },
    architectureProfileId: 'adas-autonomous',
    topics: ['adas', 'ros2', 'functional-safety', 'open-source'],
    hops: [
      {
        technologyId: 'nvidia-drive-thor',
        relationshipToNext: 'runs-on',
        note: {
          en: 'Central compute AI accelerator silicon platform.',
          ko: '중앙 컴퓨팅 AI 가속기 실리콘 플랫폼.',
        },
      },
      {
        technologyId: 'embedded-linux-rt',
        relationshipToNext: 'runs-on',
        note: {
          en: 'PREEMPT_RT real-time kernel ensuring microsecond latency.',
          ko: '마이크로초 지연시간을 보장하는 PREEMPT_RT 실시간 커널.',
        },
      },
      {
        technologyId: 'ros2-autoware',
        relationshipToNext: 'depends-on',
        note: {
          en: 'Autoware Universe autonomous driving algorithm stack.',
          ko: 'Autoware Universe 자율주행 인지/판단 알고리즘 스택.',
        },
      },
      {
        technologyId: 'dds-protocol',
        relationshipToNext: 'integrates-with',
        note: {
          en: 'Data Distribution Service pub/sub middleware.',
          ko: 'DDS 게시/구독 분산 미들웨어.',
        },
      },
      {
        technologyId: 'eclipse-iceoryx',
        relationshipToNext: 'used-with',
        note: {
          en: 'Zero-copy shared memory IPC accelerating pointclouds.',
          ko: '라이다 포인트를 가속하는 제로카피 공유메모리 IPC.',
        },
      },
      {
        technologyId: 'carla-av-simulator',
        note: {
          en: 'CARLA virtual simulator for autonomous driving SIL validation.',
          ko: '자율주행 SIL 가증을 위한 CARLA 가상 시뮬레이터.',
        },
      },
    ],
  },
];

import { StackPath } from '../types/architecture';

export const stackPaths: StackPath[] = [
  {
    id: 'aaos-ivi-cockpit-path',
    pathType: 'runtime-stack',
    name: {
      en: 'Representative Android Automotive OS (AAOS) Cockpit Journey',
      ko: '대표 Android Automotive OS (AAOS) 콕핏 경로',
    },
    description: {
      en: 'Representative digital cockpit path: Qualcomm 8295 SoC -> QNX Hypervisor -> AAOS (Android OS) -> Vehicle HAL (VHAL) -> COVESA VSS telemetry data flow.',
      ko: 'Qualcomm 8295 SoC -> QNX 하이퍼바이저 -> AAOS (안드로이드 OS) -> Vehicle HAL (VHAL) -> COVESA VSS 차량 신호 데이터로 이어지는 대표적 콕핏 탐색 경로.',
    },
    topics: ['android-automotive', 'sdv', 'qnx', 'covesa'],
    lastVerified: '2026-09-02',
    hops: [
      {
        technologyId: 'qualcomm-snapdragon-cockpit',
        note: {
          en: 'Representative multi-display automotive digital cockpit SoC silicon platform.',
          ko: '다중 디스플레이 콕핏을 구동하는 대표적인 오토모티브 SoC 실리콘 플랫폼.',
        },
      },
      {
        technologyId: 'qnx-hypervisor',
        note: {
          en: 'Type-1 safety hypervisor partitioning hardware resources for mixed-criticality isolation.',
          ko: '이종 안전도 분리 격리를 위해 SoC 자원을 분할하는 Type-1 안전 하이퍼바이저.',
        },
      },
      {
        technologyId: 'android-automotive-os',
        note: {
          en: 'Native Android OS guest partition running the In-Vehicle Infotainment user experience.',
          ko: '차량 인포테인먼트 UX를 구동하는 네이티브 안드로이드 OS 게스트 파티션.',
        },
      },
      {
        technologyId: 'aaos-sdv-platform',
        note: {
          en: 'Vehicle HAL (VHAL) & cloud-native SDV extension framework connecting Android to vehicle buses.',
          ko: '안드로이드를 차량 버스에 연결하는 Vehicle HAL(VHAL) 및 SDV 프레임워크.',
        },
      },
      {
        technologyId: 'covesa-vss',
        note: {
          en: 'Standardized COVESA Vehicle Signal Specification data tree for vehicle property mapping.',
          ko: '차량 속성 매핑을 위한 COVESA 표준 차량 신호 데이터 모델.',
        },
      },
    ],
  },
  {
    id: 'autosar-adaptive-hpc-path',
    pathType: 'runtime-stack',
    name: {
      en: 'Representative AUTOSAR Adaptive SOA Gateway Journey',
      ko: '대표 AUTOSAR Adaptive 서비스 지향 게이트웨이 경로',
    },
    description: {
      en: 'Representative service-oriented gateway path: Renesas R-Car SoC -> QNX Neutrino RTOS -> AUTOSAR Adaptive Platform -> vsomeip communication -> libdoip & dlt-daemon diagnostics.',
      ko: 'Renesas R-Car SoC -> QNX Neutrino RTOS -> AUTOSAR Adaptive 플랫폼 -> vsomeip 통신 -> libdoip 및 dlt-daemon 진단/로깅으로 연결되는 SOA 통신 탐색 경로.',
    },
    architectureProfileId: 'autosar-adaptive',
    topics: ['autosar', 'someip', 'functional-safety', 'qnx'],
    lastVerified: '2026-09-02',
    hops: [
      {
        technologyId: 'renesas-rcar',
        note: {
          en: 'Representative automotive high-compute gateway & domain controller SoC silicon.',
          ko: '고성능 게이트웨이 및 도메인 제어기용 대표 오토모티브 SoC 실리콘.',
        },
      },
      {
        technologyId: 'qnx-neutrino',
        note: {
          en: 'ISO 26262 ASIL-D certified POSIX PSE51 compliant microkernel real-time OS.',
          ko: 'ISO 26262 ASIL-D 기능안전 인증을 획득한 POSIX 규격 실시간 마이크로커널 OS.',
        },
      },
      {
        technologyId: 'autosar-adaptive',
        note: {
          en: 'AUTOSAR Adaptive Platform service-oriented runtime (ara::com / ara::exec).',
          ko: 'AUTOSAR Adaptive 플랫폼 서비스 지향 런타임 (ara::com / ara::exec).',
        },
      },
      {
        technologyId: 'vsomeip-middleware',
        note: {
          en: 'COVESA open-source C++ reference implementation of SOME/IP protocol.',
          ko: 'COVESA SOME/IP 통신 프로토콜의 C++ 오픈소스 래퍼런스 구현체.',
        },
      },
      {
        technologyId: 'libdoip',
        note: {
          en: 'Open-source C++ ISO 13400-2 Diagnostic over IP (DoIP) transport stack for high-speed vehicle flashing.',
          ko: '고속 차량 플래싱 및 원격 진단을 위한 오픈소스 C++ ISO 13400-2 DoIP 전송 스택.',
        },
      },
      {
        technologyId: 'dlt-daemon',
        note: {
          en: 'COVESA Diagnostic Log and Trace (DLT) daemon for structured ECU logging and telemetry.',
          ko: '구조화된 ECU 진단 로깅 및 텔레메트리 캡처를 위한 COVESA DLT 데몬.',
        },
      },
    ],
  },
  {
    id: 'autosar-classic-ecu-path',
    pathType: 'runtime-stack',
    name: {
      en: 'Representative AUTOSAR Classic Safety ECU Journey',
      ko: '대표 AUTOSAR Classic 마이크로컨트롤러(MCU) 섀시 제어 경로',
    },
    description: {
      en: 'Representative real-time safety ECU platform path: NXP S32 MCU -> AUTOSAR Classic BSW & OSEK OS -> SocketCAN communication -> dlt-daemon logging.',
      ko: 'NXP S32 MCU -> AUTOSAR Classic BSW & OSEK OS -> SocketCAN 통신 드라이버 -> dlt-daemon 로깅으로 연결되는 실시간 안전 제어기 탐색 경로.',
    },
    topics: ['can', 'autosar', 'functional-safety'],
    lastVerified: '2026-09-02',
    hops: [
      {
        technologyId: 'nxp-s32',
        note: {
          en: 'Representative real-time automotive microcontroller (MCU) silicon platform.',
          ko: '대표적인 실시간 오토모티브 마이크로컨트롤러(MCU) 실리콘 플랫폼.',
        },
      },
      {
        technologyId: 'autosar-classic',
        note: {
          en: 'AUTOSAR Classic Platform architecture consisting of BSW, RTE, and OSEK/VDX RTOS.',
          ko: 'AUTOSAR Classic BSW 계층, RTE 및 OSEK/VDX 실시간 OS 플랫폼 아키텍처.',
        },
      },
      {
        technologyId: 'socketcan',
        note: {
          en: 'Representative Linux SocketCAN driver subsystem interfacing vehicle buses.',
          ko: '차량 CAN/CAN-FD 버스 제어를 위한 리눅스 SocketCAN 서브시스템.',
        },
      },
      {
        technologyId: 'dlt-daemon',
        note: {
          en: 'AUTOSAR DLT logging daemon collecting real-time traces from ECUs.',
          ko: 'ECU 런타임 로그와 트레이스를 실시간 수집하는 AUTOSAR DLT 데몬.',
        },
      },
    ],
  },
  {
    id: 'centralized-hpc-path',
    pathType: 'reference-architecture',
    name: {
      en: 'Representative Centralized Vehicle Compute Ecosystem',
      ko: '대표 중앙 집중식 고성능 컴퓨팅 (HPC) 생태계 경로',
    },
    description: {
      en: 'Representative server-class central vehicle compute ecosystem: NVIDIA Thor -> DRIVE OS Hypervisor -> Red Hat In-Vehicle OS -> Ankaios orchestrator -> uProtocol messaging.',
      ko: 'NVIDIA Thor -> DRIVE OS 하이퍼바이저 -> Red Hat In-Vehicle OS -> Ankaios 오케스트레이터 -> uProtocol 메시징으로 연계되는 고성능 컴퓨팅 생태계 탐색 경로.',
    },
    architectureProfileId: 'centralized-compute',
    topics: ['sdv', 'cloud', 'cybersecurity', 'someip'],
    lastVerified: '2026-09-02',
    hops: [
      {
        technologyId: 'nvidia-drive-thor',
        note: {
          en: 'Representative high-performance centralized compute SoC silicon platform.',
          ko: '중앙 집중식 고성능 컴퓨팅 SoC 실리콘 플랫폼.',
        },
      },
      {
        technologyId: 'nvidia-drive-hypervisor',
        note: {
          en: 'DRIVE OS Type-1 hardware hypervisor partitioning heterogeneous compute.',
          ko: '이종 컴퓨팅 자원을 분할 구동하는 DRIVE OS Type-1 하이퍼바이저.',
        },
      },
      {
        technologyId: 'redhat-in-vehicle-os',
        note: {
          en: 'Functional-safety certifiable Linux distribution for vehicle computers.',
          ko: '차량 컴퓨팅 노드를 위한 기능 안전 인증 리눅스 운영체제.',
        },
      },
      {
        technologyId: 'eclipse-ankaios',
        note: {
          en: 'Container workload orchestrator for modular SDV microservices.',
          ko: '모듈형 SDV 마이크로서비스를 배포하는 컨테이너 오케스트레이터.',
        },
      },
      {
        technologyId: 'eclipse-uprotocol',
        note: {
          en: 'Ubiquitous cloud-to-car service communication transport protocol.',
          ko: '유비쿼터스 클라우드-차량 간 서비스 통신 전송 프로토콜.',
        },
      },
    ],
  },
  {
    id: 'sdv-cloud-to-car-path',
    pathType: 'data-flow',
    name: {
      en: 'Representative Cloud-Native SDV Service & Telemetry Journey',
      ko: '대표 클라우드 네이티브 SDV 서비스 및 텔레매틱스 경로',
    },
    description: {
      en: 'Representative end-to-end cloud-to-vehicle journey: Cloud Fleet OTA -> uProtocol transport -> COVESA VSS signal model -> Ankaios containers.',
      ko: '클라우드 플릿 OTA 서비스 -> uProtocol 전송 계층 -> COVESA VSS 신호 모델 -> Ankaios 컨테이너로 연계되는 클라우드-차량 연동 탐색 경로.',
    },
    architectureProfileId: 'sdv-platform',
    topics: ['sdv', 'open-source', 'cloud', 'covesa'],
    lastVerified: '2026-09-02',
    hops: [
      {
        technologyId: 'ota-cloud-fleet',
        note: {
          en: 'Cloud-based OTA software update and vehicle fleet management services.',
          ko: '클라우드 기반 OTA 소프트웨어 업데이트 및 차량 플릿 관리 서비스.',
        },
      },
      {
        technologyId: 'eclipse-uprotocol',
        note: {
          en: 'uProtocol cloud-to-car messaging abstraction layer.',
          ko: 'uProtocol 클라우드-차량 메시징 추상화 계층.',
        },
      },
      {
        technologyId: 'covesa-vss',
        note: {
          en: 'COVESA Vehicle Signal Specification data tree defining vehicle telemetry.',
          ko: '차량 텔레매틱스 신호를 정의하는 COVESA VSS 표준 데이터 모델.',
        },
      },
      {
        technologyId: 'eclipse-ankaios',
        note: {
          en: 'In-vehicle target container runtime executing deployed applications.',
          ko: '배포된 애플리케이션을 구동하는 차량 내 컨테이너 런타임.',
        },
      },
    ],
  },
  {
    id: 'adas-autonomous-path',
    pathType: 'development-validation',
    name: {
      en: 'Representative ADAS Perception & SIL Simulation Journey',
      ko: '대표 ADAS 인지 및 SIL 시뮬레이션 검증 경로',
    },
    description: {
      en: 'Representative perception and simulation journey: NVIDIA Thor -> Real-Time Linux (PREEMPT_RT) -> ROS 2 / Autoware -> Eclipse Cyclone DDS -> iceoryx zero-copy IPC -> CARLA Simulator.',
      ko: 'NVIDIA Thor -> 실시간 리눅스 -> ROS 2 / Autoware -> Eclipse Cyclone DDS -> iceoryx 제로카피 IPC -> CARLA 시뮬레이터로 연계되는 자율주행 데이터 경로.',
    },
    architectureProfileId: 'adas-autonomous',
    topics: ['adas', 'ros2', 'functional-safety', 'open-source'],
    lastVerified: '2026-09-02',
    hops: [
      {
        technologyId: 'nvidia-drive-thor',
        note: {
          en: 'Central compute AI accelerator silicon platform.',
          ko: '중앙 컴퓨팅 AI 가속기 실리콘 플랫폼.',
        },
      },
      {
        technologyId: 'embedded-linux-rt',
        note: {
          en: 'PREEMPT_RT real-time kernel supporting deterministic scheduling.',
          ko: '결정론적 스케줄링 성능을 지원하는 PREEMPT_RT 실시간 커널.',
        },
      },
      {
        technologyId: 'ros2-autoware',
        note: {
          en: 'Autoware Universe autonomous driving perception/planning software stack.',
          ko: 'Autoware Universe 자율주행 인지/판단 알고리즘 소프트웨어 스택.',
        },
      },
      {
        technologyId: 'eclipse-cyclonedds',
        note: {
          en: 'Eclipse Cyclone DDS high-performance pub/sub middleware implementation.',
          ko: 'Eclipse Cyclone DDS 고성능 Pub/Sub 데이터 분산 미들웨어 구현체.',
        },
      },
      {
        technologyId: 'eclipse-iceoryx',
        note: {
          en: 'Ultra-fast zero-copy shared memory IPC accelerating pointcloud transfers.',
          ko: '라이다 포인트를 메모리 복사 없이 전달하는 제로카피 공유메모리 IPC.',
        },
      },
      {
        technologyId: 'carla-av-simulator',
        note: {
          en: 'CARLA virtual simulator for SIL validation (virtual testing environment, not in-vehicle runtime).',
          ko: '자율주행 SIL 검증을 위한 CARLA 가상 시뮬레이터 (차량 탑재용이 아닌 테스트 환경).',
        },
      },
    ],
  },
];

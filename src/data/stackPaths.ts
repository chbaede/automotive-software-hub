import { StackPath } from '../types/architecture';

export const stackPaths: StackPath[] = [
  {
    id: 'android-cockpit-path',
    name: {
      en: 'Android Automotive Digital Cockpit Path',
      ko: '안드로이드 오토모티브 디지털 콕핏 탐색 경로',
    },
    description: {
      en: 'Representative cockpit flow from SoC hardware -> Type-1 Hypervisor -> Guest Linux kernel -> AAOS platform & userspace VHAL -> Vehicle Signal Specification data tree.',
      ko: '콕핏 SoC 하드웨어 -> Type-1 하이퍼바이저 -> 게스트 리눅스 커널 -> 안드로이드 오토모티브 OS & 유저스페이스 VHAL -> 차량 신호 명세 데이터 트리로 이어지는 콕핏 아키텍처 탐색 경로.',
    },
    architectureProfileId: 'android-automotive',
    topics: ['android-automotive', 'qnx', 'embedded-linux', 'someip'],
    hops: [
      {
        technologyId: 'qualcomm-snapdragon-cockpit',
        note: {
          en: 'Representative Snapdragon 8295 Cockpit SoC platform powering hardware partitions.',
          ko: '하드웨어 분할을 구동하는 Snapdragon 8295 콕핏 SoC 실리콘 플랫폼.',
        },
      },
      {
        technologyId: 'qnx-hypervisor',
        note: {
          en: 'Type-1 hypervisor partitioning safety cluster RTOS and guest Android OS VM.',
          ko: '계기판 RTOS와 게스트 안드로이드 OS 가상머신을 물리 분할 격리하는 Type-1 하이퍼바이저.',
        },
      },
      {
        technologyId: 'linux-kernel',
        note: {
          en: 'Guest OS Linux kernel providing Binder IPC and VHAL driver interfaces.',
          ko: '바인더 IPC 및 VHAL 드라이버 인터페이스를 구동하는 게스트 리눅스 커널.',
        },
      },
      {
        technologyId: 'android-automotive-os',
        note: {
          en: 'Android Automotive OS platform framework, CarService, and userspace VHAL layer.',
          ko: '안드로이드 오토모티브 OS 프레임워크, CarService 및 유저스페이스 VHAL 계층.',
        },
      },
      {
        technologyId: 'covesa-vss',
        note: {
          en: 'Standardized COVESA Vehicle Signal Specification data model for cockpit telemetry.',
          ko: '콕핏 텔레매틱스 연동을 위한 COVESA 표준 차량 신호 데이터 모델.',
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
      en: 'High-performance MPU middleware path: POSIX RTOS (QNX Neutrino) -> ARA runtime -> SOME/IP protocol -> vsomeip C++ implementation -> DoIP -> UDS diagnostics.',
      ko: 'POSIX RTOS (QNX) -> ARA 런타임 -> SOME/IP 프로토콜 명세 -> vsomeip C++ 구현체 -> DoIP -> UDS 진단 서비스로 연계되는 미들웨어 탐색 경로.',
    },
    architectureProfileId: 'autosar-adaptive',
    topics: ['autosar', 'someip', 'functional-safety', 'sdv'],
    hops: [
      {
        technologyId: 'qnx-neutrino',
        note: {
          en: 'ASIL-D safety certified POSIX PSE51 microkernel operating system runtime.',
          ko: 'ASIL-D 기능 안전 인증 POSIX PSE51 마이크로커널 운영체제 런타임.',
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
        technologyId: 'someip-protocol',
        note: {
          en: 'Scalable service-Oriented IP (SOME/IP) communication protocol specification.',
          ko: '확장 가능한 서비스 지향 IP 통신 프로토콜 명세.',
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
        technologyId: 'doip-protocol',
        note: {
          en: 'Diagnostic over IP (ISO 13400) high-speed Ethernet transport layer.',
          ko: '차량 이더넷 기반 고속 DoIP (ISO 13400) 진단 전송 계층.',
        },
      },
      {
        technologyId: 'uds-protocol',
        note: {
          en: 'ISO 14229 Unified Diagnostic Services for ECU flashing and diagnostics.',
          ko: 'ECU 펌웨어 프로그래밍 및 진단을 위한 ISO 14229 UDS 규격.',
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
      en: 'Representative real-time safety ECU path: NXP S32 MCU -> AUTOSAR Classic BSW & OSEK OS -> CAN bus communication -> UDS diagnostic services.',
      ko: 'NXP S32 MCU -> AUTOSAR Classic BSW & OSEK OS -> CAN 버스 통신 드라이버 -> UDS 진단 서비스로 연결되는 실시간 안전 제어기 탐색 경로.',
    },
    architectureProfileId: 'zonal-architecture',
    topics: ['can', 'autosar', 'functional-safety'],
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
          en: 'AUTOSAR Classic Platform Basic Software (BSW), RTE, and OSEK/VDX RTOS.',
          ko: 'AUTOSAR Classic BSW 계층, RTE 및 OSEK/VDX 실시간 OS.',
        },
      },
      {
        technologyId: 'can-protocol',
        note: {
          en: 'Representative CAN / CAN-FD bus network communication drivers.',
          ko: '대표적인 CAN / CAN-FD 버스 네트워크 통신 드라이버 계층.',
        },
      },
      {
        technologyId: 'uds-protocol',
        note: {
          en: 'ISO 14229 Unified Diagnostic Services manager for ECU maintenance.',
          ko: 'ISO 14229 UDS 진단 통신 관리자 모듈.',
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
      en: 'Server-class vehicle central compute: NVIDIA Thor -> DRIVE OS Hypervisor -> Red Hat In-Vehicle OS -> Ankaios orchestrator -> uProtocol messaging.',
      ko: 'NVIDIA Thor -> DRIVE OS 하이퍼바이저 -> Red Hat In-Vehicle OS -> Ankaios 오케스트레이터 -> uProtocol 메시징으로 연계되는 고성능 컴퓨팅 경로.',
    },
    architectureProfileId: 'centralized-compute',
    topics: ['sdv', 'cloud', 'cybersecurity', 'someip'],
    hops: [
      {
        technologyId: 'nvidia-drive-thor',
        note: {
          en: 'Representative 2,000 TFLOPS centralized compute SoC silicon platform.',
          ko: '2,000 TFLOPS 성능의 중앙 집중식 고성능 컴퓨팅 SoC 실리콘 플랫폼.',
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
    name: {
      en: 'Cloud-Native SDV Service Path',
      ko: '클라우드 네이티브 SDV 서비스 연동 탐색 경로',
    },
    description: {
      en: 'End-to-end cloud-to-vehicle pipeline: Cloud Fleet OTA -> uProtocol transport -> COVESA VSS signal model -> Ankaios containers.',
      ko: '클라우드 플릿 OTA 서비스 -> uProtocol 전송 계층 -> COVESA VSS 신호 모델 -> Ankaios 컨테이너로 연계되는 클라우드-차량 연동 탐색 경로.',
    },
    architectureProfileId: 'sdv-platform',
    topics: ['sdv', 'open-source', 'cloud', 'covesa'],
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
    name: {
      en: 'ADAS & Autonomous Perception Pipeline Path',
      ko: 'ADAS 및 자율주행 인지 파이프라인 경로',
    },
    description: {
      en: 'Representative perception pipeline: NVIDIA Thor -> Real-Time Linux (PREEMPT_RT) -> ROS 2 / Autoware -> DDS -> iceoryx zero-copy IPC -> CARLA Simulator.',
      ko: 'NVIDIA Thor -> 실시간 리눅스 -> ROS 2 / Autoware -> DDS -> iceoryx 제로카피 IPC -> CARLA 시뮬레이터로 연계되는 자율주행 데이터 경로.',
    },
    architectureProfileId: 'adas-autonomous',
    topics: ['adas', 'ros2', 'functional-safety', 'open-source'],
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
          en: 'PREEMPT_RT real-time kernel ensuring microsecond-level determinism.',
          ko: '마이크로초 수준 결정론적 성능을 보장하는 PREEMPT_RT 실시간 커널.',
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
        technologyId: 'dds-protocol',
        note: {
          en: 'Data Distribution Service pub/sub middleware specification.',
          ko: 'DDS 게시/구독 분산 미들웨어 통신 프로토콜 명세.',
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
          en: 'CARLA virtual simulator for SIL validation (testing environment, not in-vehicle runtime).',
          ko: '자율주행 SIL 검증을 위한 CARLA 가상 시뮬레이터 (차량 탑재용이 아닌 테스트 환경).',
        },
      },
    ],
  },
];

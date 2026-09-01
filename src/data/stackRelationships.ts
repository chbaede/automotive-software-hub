import { TechnologyRelationship } from '../types/relationship';

export const stackRelationships: TechnologyRelationship[] = [
  // ========================================================
  // Application & In-Vehicle Experience Relationships
  // ========================================================
  {
    sourceId: 'android-automotive-os',
    targetId: 'linux-kernel',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Android Automotive OS requires the Linux kernel with Binder, Ashmem, and VHAL drivers.',
      ko: 'Android Automotive OS는 바인더(Binder) 및 VHAL 드라이버를 포함한 리눅스 커널 위에서 구동됩니다.',
    },
  },
  {
    sourceId: 'android-automotive-os',
    targetId: 'qnx-hypervisor',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Commonly deployed as a guest OS on QNX Hypervisor in production digital cockpits.',
      ko: '양산 디지털 콕핏에서 QNX 하이퍼바이저 상의 게스트 OS 가상머신으로 탑재됩니다.',
    },
  },
  {
    sourceId: 'android-automotive-os',
    targetId: 'open-synergy-coqos',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Runs virtualized on OpenSynergy COQOS Hypervisor utilizing VirtIO device standards.',
      ko: 'VirtIO 표준 디바이스 드라이버를 통해 OpenSynergy COQOS 가상화 환경에서 구동됩니다.',
    },
  },
  {
    sourceId: 'android-automotive-os',
    targetId: 'qualcomm-snapdragon-cockpit',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Optimized reference hardware platform for premium multi-display Android cockpit systems.',
      ko: '다중 디스플레이 프리미엄 안드로이드 콕핏 시스템의 표준 레퍼런스 SoC입니다.',
    },
  },
  {
    sourceId: 'android-automotive-os',
    targetId: 'aaos-sdv-platform',
    type: 'related',
    confidence: 'official',
    description: {
      en: 'Extended by AAOS SDV for centralized vehicle compute architectures and multi-zone displays.',
      ko: '중앙 집중식 SDV 아키텍처 및 다중 디스플레이 확장을 위해 AAOS SDV로 발전하고 있습니다.',
    },
  },
  {
    sourceId: 'android-automotive-os',
    targetId: 'agl-unified-codebase',
    type: 'coexists-with',
    confidence: 'community',
    description: {
      en: 'Coexists in modern cockpits where AGL drives instrument clusters while Android Automotive manages IVI.',
      ko: 'AGL이 계기판을 구동하고 Android Automotive가 IVI를 관장하는 이종 콕핏 아키텍처에서 공존합니다.',
    },
  },
  {
    sourceId: 'android-automotive-os',
    targetId: 'flutter-automotive',
    type: 'used-with',
    confidence: 'vendor',
    description: {
      en: 'Used to build high-performance custom vehicle UI apps running on Android Automotive.',
      ko: '안드로이드 오토모티브 상에서 동작하는 고성능 커스텀 차량 UI 앱 제작에 활용됩니다.',
    },
  },
  {
    sourceId: 'android-automotive-os',
    targetId: 'adb-perfetto-tools',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Debugged and profiled using Android Debug Bridge (ADB) and Google Perfetto tracer.',
      ko: 'ADB 및 구글 Perfetto 트레이서를 통해 성능 분석과 VHAL 지연 시간을 측정합니다.',
    },
  },
  {
    sourceId: 'android-automotive-os',
    targetId: 'soong-build-system',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Compiled and assembled from source using the AOSP Soong & Kati build system.',
      ko: 'AOSP Soong 빌드 시스템을 통해 Android.bp 명세로부터 플랫폼 바이너리를 빌드합니다.',
    },
  },
  {
    sourceId: 'agl-unified-codebase',
    targetId: 'yocto-project',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Built on the Yocto Project metadata framework using BitBake recipe layers.',
      ko: 'Yocto Project 메타데이터 레이어 및 BitBake 레시피를 기반으로 시스템 이미지가 생성됩니다.',
    },
  },
  {
    sourceId: 'flutter-automotive',
    targetId: 'qt-automotive',
    type: 'alternative',
    confidence: 'community',
    description: {
      en: 'Modern Dart-based alternative to Qt/QML for building automotive HMI experiences.',
      ko: '차량용 HMI 화면을 구현하기 위해 Qt/QML을 대체할 수 있는 현대적 크로스 플랫폼 프레임워크입니다.',
    },
  },
  {
    sourceId: 'kanzi-ui-engine',
    targetId: 'qt-automotive',
    type: 'alternative',
    confidence: 'vendor',
    description: {
      en: 'Commercial 3D graphics UI engine competing with Qt Automotive for digital clusters.',
      ko: '디지털 계기판 및 콕핏용 고성능 3D 그래픽 UI 제작을 위한 상용 전문 엔진입니다.',
    },
  },

  // ========================================================
  // Middleware & Communication Protocol Relationships
  // ========================================================
  {
    sourceId: 'autosar-adaptive',
    targetId: 'autosar-classic',
    type: 'coexists-with',
    confidence: 'official',
    description: {
      en: 'AUTOSAR Adaptive (for POSIX MPUs) and AUTOSAR Classic (for real-time MCUs) co-exist in modern vehicle architectures, communicating via SOME/IP signal gateways.',
      ko: 'AUTOSAR Adaptive (고성능 POSIX MPU)와 AUTOSAR Classic (실시간 MCU)은 차세대 아키텍처에서 공존하며 SOME/IP 게이트웨이를 통해 상호 연동됩니다.',
    },
  },
  {
    sourceId: 'autosar-adaptive',
    targetId: 'qnx-neutrino',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'POSIX PSE51 compliant OS providing execution runtime for ARA middleware.',
      ko: 'AUTOSAR Adaptive (ARA) 미들웨어를 실행하는 POSIX PSE51 규격의 운영체제입니다.',
    },
  },
  {
    sourceId: 'autosar-adaptive',
    targetId: 'embedded-linux-rt',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Runs on real-time Linux kernels with PREEMPT_RT for high-throughput gateway nodes.',
      ko: 'PREEMPT_RT 실시간 패치가 적용된 임베디드 리눅스 상에서 서비스 노드로 실행됩니다.',
    },
  },
  {
    sourceId: 'autosar-adaptive',
    targetId: 'someip-protocol',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Uses SOME/IP as the standard inter-ECU service-oriented communication mechanism (ara::com).',
      ko: 'ECU 간 서비스 지향 통신(ara::com)의 기본 프로토콜로 SOME/IP를 활용합니다.',
    },
  },
  {
    sourceId: 'autosar-adaptive',
    targetId: 'vsomeip-middleware',
    type: 'implemented-by',
    confidence: 'community',
    description: {
      en: 'Open-source C++ implementation of the SOME/IP communication protocol.',
      ko: 'SOME/IP 프로토콜을 C++ 오픈소스로 구현하여 Adaptive 스택에 연동할 수 있습니다.',
    },
  },
  {
    sourceId: 'autosar-adaptive',
    targetId: 'doip-protocol',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Integrates Diagnostic over IP (DoIP) for high-speed firmware flashing and remote diagnostics.',
      ko: '고속 펌웨어 프로그래밍 및 원격 진단을 위해 DoIP 프로토콜과 결합됩니다.',
    },
  },
  {
    sourceId: 'autosar-adaptive',
    targetId: 'iso-26262-functional-safety',
    type: 'compatible-with',
    confidence: 'official',
    description: {
      en: 'Engineered to comply with ISO 26262 functional safety requirements up to ASIL-D.',
      ko: 'ASIL-D 등급까지의 ISO 26262 기능 안전 요건을 준수하도록 개발됩니다.',
    },
  },
  {
    sourceId: 'autosar-classic',
    targetId: 'can-protocol',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Relies on CAN/CAN-FD communication drivers in the CAN Stack (CanIf, CanTp, PduR).',
      ko: 'AUTOSAR BSW의 CAN 통신 스택(CanIf, CanTp, PduR)을 통해 CAN 프레임을 송수신합니다.',
    },
  },
  {
    sourceId: 'autosar-classic',
    targetId: 'uds-protocol',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Implements ISO 14229 Unified Diagnostic Services via Diagnostic Communication Manager (DCM).',
      ko: 'DCM(Diagnostic Communication Manager) 모듈을 통해 UDS 진단 표준을 처리합니다.',
    },
  },
  {
    sourceId: 'autosar-classic',
    targetId: 'nxp-s32',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Standard real-time automotive microcontroller platform executing AUTOSAR Classic BSW.',
      ko: 'AUTOSAR Classic BSW 펌웨어가 탑재되어 차체 및 섀시를 제어하는 대표적 마이크로컨트롤러입니다.',
    },
  },
  {
    sourceId: 'eclipse-uprotocol',
    targetId: 'someip-protocol',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Transports uProtocol Cloud-to-Car packets over SOME/IP Ethernet transport in vehicles.',
      ko: '차량 내 이더넷 구간에서 SOME/IP 전송 계층을 통해 uProtocol 패킷을 중계합니다.',
    },
  },
  {
    sourceId: 'eclipse-uprotocol',
    targetId: 'dds-protocol',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Binds with Data Distribution Service (DDS) for high-rate sensor streaming and pub/sub.',
      ko: '고속 센서 데이터 스트리밍 및 Pub/Sub 메시징을 위해 DDS 트랜스포트와 결합합니다.',
    },
  },
  {
    sourceId: 'eclipse-uprotocol',
    targetId: 'covesa-vss',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Encodes vehicle telemetry adhering to the COVESA Vehicle Signal Specification tree.',
      ko: 'COVESA Vehicle Signal Specification(VSS) 표준 신호 트리를 준수하여 차량 데이터를 표현합니다.',
    },
  },
  {
    sourceId: 'eclipse-uprotocol',
    targetId: 'eclipse-ankaios',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Used by containerized SDV workloads managed by the Eclipse Ankaios orchestrator.',
      ko: 'Eclipse Ankaios에 의해 배포된 컨테이너 앱 간 서비스 통신 표준으로 쓰입니다.',
    },
  },
  {
    sourceId: 'eclipse-iceoryx',
    targetId: 'dds-protocol',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Provides ultra-fast zero-copy shared memory acceleration for Cyclone DDS and Fast DDS.',
      ko: 'Cyclone DDS 및 Fast DDS에 초고속 제로카피 공유 메모리 IPC 가속을 제공합니다.',
    },
  },
  {
    sourceId: 'eclipse-iceoryx',
    targetId: 'ros2-autoware',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Transports camera and LiDAR pointcloud frames between Autoware perception nodes without memory copies.',
      ko: 'Autoware 자율주행 인지 노드 간 대용량 카메라 및 라이다 포인트를 메모리 복사 없이 전달합니다.',
    },
  },
  {
    sourceId: 'ros2-autoware',
    targetId: 'dds-protocol',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Core ROS 2 Middleware (RMW) abstraction layer uses DDS for node publish-subscribe communication.',
      ko: 'ROS 2 미들웨어 계층(RMW)의 핵심 분산 통신 인프라로 DDS를 사용합니다.',
    },
  },
  {
    sourceId: 'ros2-autoware',
    targetId: 'carla-av-simulator',
    type: 'used-with',
    confidence: 'community',
    description: {
      en: 'Validated and trained against CARLA open autonomous driving simulator virtual worlds.',
      ko: 'CARLA 오픈 자율주행 시뮬레이터 가상 환경과 연동하여 주행 제어 알고리즘을 테스트합니다.',
    },
  },
  {
    sourceId: 'ros2-autoware',
    targetId: 'baidu-apollo-ad',
    type: 'alternative',
    confidence: 'community',
    description: {
      en: 'Open-source full-stack autonomous driving software suite competitor.',
      ko: '오픈소스 풀스택 자율주행 소프트웨어 플랫폼 간 대안 관계입니다.',
    },
  },

  // ========================================================
  // Hypervisors & Hardware SoC Relationships
  // ========================================================
  {
    sourceId: 'qnx-hypervisor',
    targetId: 'qnx-neutrino',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Built directly upon the QNX Neutrino microkernel architecture for fast context switching and partition isolation.',
      ko: 'QNX Neutrino 마이크로커널 아키텍처 위에 구축되어 신속한 컨텍스트 스위칭 및 파티션 격리를 제공합니다.',
    },
  },
  {
    sourceId: 'qnx-hypervisor',
    targetId: 'iso-26262-functional-safety',
    type: 'compatible-with',
    confidence: 'official',
    description: {
      en: 'Evaluated to ISO 26262 ASIL-D requirements for safety domain separation in automotive ECUs.',
      ko: '차량용 제어기 도메인 격리를 위해 ISO 26262 ASIL-D 요건을 충족합니다.',
    },
  },
  {
    sourceId: 'perseus-hypervisor',
    targetId: 'kvm-automotive',
    type: 'implemented-by',
    confidence: 'vendor',
    description: {
      en: 'Engineered as an open-source real-time virtualization hypervisor optimized for mixed-criticality SDVs.',
      ko: '오픈소스 KVM 가상화 기술을 기반으로 이종 안전도 SDV를 위해 자체 개발된 실시간 하이퍼바이저입니다.',
    },
  },
  {
    sourceId: 'perseus-hypervisor',
    targetId: 'iso-26262-functional-safety',
    type: 'compatible-with',
    confidence: 'vendor',
    description: {
      en: 'Architected to meet ISO 26262 ASIL-D safety requirements.',
      ko: 'ISO 26262 ASIL-D 기능 안전 요건을 충족하도록 설계되었습니다.',
    },
  },
  {
    sourceId: 'nvidia-drive-hypervisor',
    targetId: 'nvidia-drive-thor',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Native Type-1 hypervisor for DRIVE OS running on NVIDIA DRIVE Thor centralized compute SoC.',
      ko: 'NVIDIA DRIVE Thor 중앙 컴퓨팅 SoC 전용 Type-1 하이퍼바이저입니다.',
    },
  },
  {
    sourceId: 'qualcomm-hypervisor',
    targetId: 'qualcomm-snapdragon-cockpit',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Embedded Type-1 hypervisor partitioning Snapdragon 8295 cockpit compute resources.',
      ko: 'Snapdragon 8295 콕핏 칩의 CPU/GPU 자원을 안드로이드와 계기판으로 분할 구동하는 하이퍼바이저입니다.',
    },
  },
  {
    sourceId: 'socketcan',
    targetId: 'can-protocol',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Kernel network device driver abstraction for standard and extended CAN 2.0 / CAN-FD frames.',
      ko: 'CAN 2.0 및 CAN-FD 프레임을 리눅스 네트워크 소켓으로 다루는 표준 커널 드라이버 계층입니다.',
    },
  },
  {
    sourceId: 'dspace-scalexio-hil',
    targetId: 'can-protocol',
    type: 'used-with',
    confidence: 'vendor',
    description: {
      en: 'Simulates physical and electrical CAN bus loads for Hardware-in-the-Loop test validation.',
      ko: 'HIL 시험 환경에서 실제 CAN 버스 신호 및 전기적 부하를 실시간으로 모사합니다.',
    },
  },
  {
    sourceId: 'eclipse-ankaios',
    targetId: 'redhat-in-vehicle-os',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Orchestrates Podman/Docker containers dynamically on Red Hat In-Vehicle OS nodes.',
      ko: 'Red Hat In-Vehicle OS 노드 상에서 Podman/Docker 컨테이너 워크로드를 동적으로 오케스트레이션합니다.',
    },
  },
  {
    sourceId: 'iso-21434-cybersecurity',
    targetId: 'unece-r155-r156',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Technical standard providing the baseline engineering processes for UN R155 CSMS certification.',
      ko: 'UN R155 차량 사이버 보안 관리 체계(CSMS) 형식 승인을 위한 기술적 기반 엔지니어링 표준입니다.',
    },
  },
  {
    sourceId: 'someip-protocol',
    targetId: 'vsomeip-middleware',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'COVESA vsomeip is an open-source C++ implementation of the SOME/IP communication protocol specification.',
      ko: 'COVESA vsomeip는 SOME/IP 통신 프로토콜 명세의 C++ 오픈소스 래퍼런스 구현체입니다.',
    },
  },
  {
    sourceId: 'doip-protocol',
    targetId: 'uds-protocol',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Diagnostic over IP (ISO 13400) encapsulates ISO 14229 Unified Diagnostic Services (UDS) over Ethernet/TCP.',
      ko: 'DoIP(ISO 13400)는 차량 이더넷 TCP/IP 네트워크를 통해 ISO 14229 UDS 진단 메시지를 캡슐화 전송합니다.',
    },
  },
  {
    sourceId: 'socketcan',
    targetId: 'linux-kernel',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'SocketCAN is the official open-source CAN network subsystem integrated directly into the mainline Linux kernel.',
      ko: 'SocketCAN은 메인라인 리눅스 커널 패밀리에 내장된 공식 오픈소스 CAN 네트워크 서브시스템입니다.',
    },
  },
  {
    sourceId: 'redhat-in-vehicle-os',
    targetId: 'linux-kernel',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Red Hat In-Vehicle OS is built on the Linux kernel with functional-safety certification pipelines.',
      ko: 'Red Hat In-Vehicle OS는 기능 안전 검증 파이프라인을 갖춘 리눅스 커널 기반 오토모티브 OS입니다.',
    },
  },
  {
    sourceId: 'renode-emulator',
    targetId: 'zephyr-rtos',
    type: 'used-with',
    confidence: 'community',
    description: {
      en: 'Renode emulates multi-node MCU target hardware for automated Zephyr RTOS testing without physical hardware.',
      ko: 'Renode는 실물 타겟 없이 Zephyr RTOS 바이너리를 자동화 테스트하기 위한 가상 하드웨어 에뮬레이션을 제공합니다.',
    },
  },
  {
    sourceId: 'buildroot',
    targetId: 'yocto-project',
    type: 'alternative',
    confidence: 'community',
    description: {
      en: 'Buildroot is a lightweight Makefile-based alternative to Yocto for building embedded Linux root filesystems.',
      ko: 'Buildroot는 맞춤형 임베디드 리눅스 rootfs 생성을 위한 Yocto의 경량 Makefile 기반 대안 도구입니다.',
    },
  },
  {
    sourceId: 'ubuntu-for-automotive',
    targetId: 'linux-kernel',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Canonical Ubuntu for Automotive is built on the Linux kernel with real-time PREEMPT_RT patchset.',
      ko: 'Canonical Ubuntu for Automotive는 실시간 PREEMPT_RT 패치셋이 적용된 리눅스 커널 기반으로 구축됩니다.',
    },
  },
  {
    sourceId: 'eb-corbos-linux',
    targetId: 'ubuntu-for-automotive',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Elektrobit EB corbos Linux is a commercial safety-compliant automotive OS built directly on Ubuntu Linux.',
      ko: 'Elektrobit EB corbos Linux는 우분투(Ubuntu) 리눅스를 직접적인 기반으로 구축된 상용 오토모티브 OS입니다.',
    },
  },
  {
    sourceId: 'eb-corbos-linux',
    targetId: 'autosar-adaptive',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'EB corbos Linux integrates natively with EB corbos Adaptive AUTOSAR platform middleware.',
      ko: 'EB corbos Linux는 EB corbos Adaptive AUTOSAR 미들웨어 플랫폼과 네이티브로 연동 구동됩니다.',
    },
  },
];

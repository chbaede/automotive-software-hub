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
      en: 'Engineered as a commercial real-time virtualization hypervisor optimized for mixed-criticality SDVs.',
      ko: 'KVM 가상화 기술을 기반으로 이종 안전도 SDV를 위해 자체 개발된 상용 실시간 하이퍼바이저입니다.',
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
  // ==========================================
  // SDV & VEHICLE SERVICES RELATIONSHIPS
  // ==========================================
  {
    sourceId: 'covesa-vss',
    targetId: 'eclipse-kuksa',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'Eclipse KUKSA implements COVESA Vehicle Signal Specification (VSS) as its primary vehicle data model.',
      ko: 'Eclipse KUKSA는 COVESA 차량 신호 규격(VSS)을 기본 차량 데이터 모델로 채택하여 구현합니다.',
    },
  },
  {
    sourceId: 'eclipse-kuksa',
    targetId: 'kuksa-databroker',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'KUKSA Databroker provides the core high-performance Rust signal broker implementation for Eclipse KUKSA.',
      ko: 'KUKSA Databroker는 Eclipse KUKSA의 핵심 고성능 Rust 신호 브로커 엔진을 구현합니다.',
    },
  },
  {
    sourceId: 'eclipse-kuksa',
    targetId: 'kuksa-val',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'KUKSA.val provides the vehicle abstraction layer, feeders, and signal server services for KUKSA.',
      ko: 'KUKSA.val은 KUKSA 생태계 내 차량 신호 추상화 및 피더 연동 서비스를 제공합니다.',
    },
  },
  {
    sourceId: 'covesa-viss',
    targetId: 'covesa-vissr',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'COVESA VISSR is the official Golang reference server implementation for the VISS v2 specification.',
      ko: 'COVESA VISSR은 VISS v2 표준 규격의 공식 Golang 레퍼런스 서버 구현체입니다.',
    },
  },
  {
    sourceId: 'eclipse-kuksa',
    targetId: 'covesa-viss',
    type: 'compatible-with',
    confidence: 'official',
    description: {
      en: 'Eclipse KUKSA provides VISS-compatible endpoints for accessing vehicle signals over WebSockets.',
      ko: 'Eclipse KUKSA는 웹소켓 기반 차량 신호 조회를 위해 VISS 호환 인터페이스를 지원합니다.',
    },
  },
  {
    sourceId: 'covesa-uservices',
    targetId: 'eclipse-uprotocol',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'COVESA uServices standardizes automotive service interfaces explicitly built on top of Eclipse uProtocol.',
      ko: 'COVESA uServices는 Eclipse uProtocol 전송 계층을 기반으로 차량 마이크로서비스 API를 표준화합니다.',
    },
  },
  {
    sourceId: 'eclipse-score',
    targetId: 'autosar-adaptive',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'Eclipse S-CORE aligns open SDV architectures with AUTOSAR Adaptive middleware components.',
      ko: 'Eclipse S-CORE는 오픈 SDV 아키텍처와 AUTOSAR Adaptive 미들웨어 구성요소의 통합을 조율합니다.',
    },
  },
  {
    sourceId: 'eclipse-score',
    targetId: 'eclipse-kuksa',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'Eclipse S-CORE utilizes Eclipse KUKSA for standard in-vehicle signal abstraction.',
      ko: 'Eclipse S-CORE는 차량 내부 신호 추상화 및 데이터 제공을 위해 Eclipse KUKSA를 연동합니다.',
    },
  },
  {
    sourceId: 'eclipse-opensovd',
    targetId: 'uds-protocol',
    type: 'alternative',
    confidence: 'official',
    description: {
      en: 'ASAM SOVD (Eclipse OpenSOVD) provides a modern REST/JSON service-oriented alternative to classic UDS diagnostics.',
      ko: 'ASAM SOVD(OpenSOVD)는 기존 UDS 진단을 현대적인 REST/JSON 기반 서비스 지향 진단으로 보완 및 대체합니다.',
    },
  },
  {
    sourceId: 'eclipse-opensovd',
    targetId: 'doip-protocol',
    type: 'compatible-with',
    confidence: 'official',
    description: {
      en: 'OpenSOVD can interface with Ethernet-based DoIP diagnostic gateways for vehicle access.',
      ko: 'OpenSOVD는 차량 접근을 위해 이더넷 기반 DoIP 진단 게이트웨이와 연동될 수 있습니다.',
    },
  },
  {
    sourceId: 'eclipse-velocitas',
    targetId: 'eclipse-kuksa',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Eclipse Velocitas generated applications interact with in-vehicle signals via KUKSA Databroker.',
      ko: 'Eclipse Velocitas로 빌드된 컨테이너 앱은 KUKSA Databroker를 통해 실차 신호를 송수신합니다.',
    },
  },
  {
    sourceId: 'eclipse-leda',
    targetId: 'eclipse-kuksa',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Eclipse Leda distribution comes pre-integrated with Eclipse KUKSA Databroker as its standard signal server.',
      ko: 'Eclipse Leda 배포판은 표준 신호 서버로 Eclipse KUKSA Databroker를 사전 내장합니다.',
    },
  },
  {
    sourceId: 'eclipse-leda',
    targetId: 'eclipse-kanto',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Eclipse Leda integrates Eclipse Kanto as its lightweight edge container and device management runtime.',
      ko: 'Eclipse Leda는 경량 엣지 컨테이너 및 디바이스 런타임으로 Eclipse Kanto를 탑재합니다.',
    },
  },
  {
    sourceId: 'eclipse-kanto',
    targetId: 'eclipse-ankaios',
    type: 'coexists-with',
    confidence: 'vendor',
    description: {
      en: 'Eclipse Kanto edge container management coexists with Eclipse Ankaios workload orchestrators in SDVs.',
      ko: 'Eclipse Kanto 컨테이너 관리는 Eclipse Ankaios 워크로드 오케스트레이터와 SDV 환경에서 상호 보완적으로 운용됩니다.',
    },
  },

  // ==========================================
  // MIDDLEWARE & COMMUNICATION RELATIONSHIPS
  // ==========================================
  {
    sourceId: 'dds-protocol',
    targetId: 'eprosima-fastdds',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'eProsima Fast DDS is a widely used C++ implementation of the OMG DDS standard specification.',
      ko: 'eProsima Fast DDS는 OMG DDS 표준 규격을 C++로 충실히 구현한 대표적 미들웨어입니다.',
    },
  },
  {
    sourceId: 'dds-protocol',
    targetId: 'eclipse-cyclonedds',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'Eclipse Cyclone DDS is an open-source high-performance C implementation of the OMG DDS specification.',
      ko: 'Eclipse Cyclone DDS는 OMG DDS 규격을 구현한 고성능 오픈소스 C 기반 미들웨어입니다.',
    },
  },
  {
    sourceId: 'dds-protocol',
    targetId: 'rti-connext-dds',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'RTI Connext DDS provides an ISO 26262 ASIL-D certified commercial implementation of the OMG DDS standard.',
      ko: 'RTI Connext DDS는 OMG DDS 표준을 지원하는 ISO 26262 ASIL-D 기능안전 인증 상용 구현체입니다.',
    },
  },
  {
    sourceId: 'ros2-middleware',
    targetId: 'dds-protocol',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'ROS 2 relies on DDS (Data Distribution Service) as its standard underlying communication backbone.',
      ko: 'ROS 2는 표준 데이터 통신 백본으로 DDS(Data Distribution Service) 미들웨어 계층에 의존합니다.',
    },
  },
  {
    sourceId: 'ros2-middleware',
    targetId: 'eprosima-fastdds',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'eProsima Fast DDS serves as the default ROS 2 Middleware (RMW) communication implementation.',
      ko: 'eProsima Fast DDS는 ROS 2의 기본 RMW 통신 구현 계층으로 연동됩니다.',
    },
  },
  {
    sourceId: 'ros2-middleware',
    targetId: 'eclipse-cyclonedds',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'Eclipse Cyclone DDS is an officially supported high-performance tier-1 RMW implementation for ROS 2.',
      ko: 'Eclipse Cyclone DDS는 ROS 2의 공식 티어-1 RMW 미들웨어 구현체로 널리 채택되어 있습니다.',
    },
  },
  {
    sourceId: 'ros2-autoware',
    targetId: 'ros2-middleware',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Autoware autonomous driving stack is architected natively on top of the ROS 2 middleware framework.',
      ko: 'Autoware 자율주행 소프트웨어 스택은 ROS 2 미들웨어 프레임워크 위에서 네이티브로 동작합니다.',
    },
  },
  {
    sourceId: 'someip-protocol',
    targetId: 'someip-sd',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'SOME/IP-SD provides the standardized dynamic service discovery extension for SOME/IP networks.',
      ko: 'SOME/IP-SD는 SOME/IP 네트워크를 위한 표준화된 동적 서비스 디스커버리 확장 규격입니다.',
    },
  },
  {
    sourceId: 'vsomeip-middleware',
    targetId: 'someip-sd',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'vSomeIP implements SOME/IP Service Discovery (SOME/IP-SD) for service announcement and subscription.',
      ko: 'vSomeIP는 서비스 발행 및 이벤트 구독 관리를 위해 SOME/IP-SD를 자체 지원합니다.',
    },
  },
  {
    sourceId: 'ieee-tsn',
    targetId: 'someip-protocol',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Automotive SOME/IP messages are transported over deterministic IEEE TSN Ethernet backbones.',
      ko: '차량용 SOME/IP 서비스 메시지는 확정적 IEEE TSN 이더넷 백본을 통해 전송됩니다.',
    },
  },
  {
    sourceId: 'lin-bus-protocol',
    targetId: 'can-protocol',
    type: 'coexists-with',
    confidence: 'official',
    description: {
      en: 'LIN sub-buses coexist with CAN networks via body domain control gateways.',
      ko: 'LIN 서브버스는 바디 도메인 게이트웨이를 통해 메인 CAN 네트워크와 공존하며 연동됩니다.',
    },
  },
  {
    sourceId: 'flexray-protocol',
    targetId: 'can-protocol',
    type: 'coexists-with',
    confidence: 'official',
    description: {
      en: 'FlexRay deterministic networks coexist with CAN buses in chassis and active safety architectures.',
      ko: 'FlexRay 네트워크는 섀시 및 액티브 세이프티 아키텍처에서 CAN 버스와 상호 연동되어 공존합니다.',
    },
  },
  {
    sourceId: 'xcp-protocol',
    targetId: 'can-protocol',
    type: 'runs-on',
    confidence: 'official',
    description: {
      en: 'XCP on CAN (CAN FD) is the standard physical transport for ECU calibration access.',
      ko: 'XCP on CAN은 ECU 내부 파라미터 캘리브레이션을 위한 표준 전송 계층입니다.',
    },
  },
  {
    sourceId: 'xcp-protocol',
    targetId: 'vector-canape',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'XCP is the primary protocol utilized by Vector CANape for ECU measurement and calibration.',
      ko: 'XCP는 Vector CANape 도구에서 ECU 실시간 계측 및 캘리브레이션을 위해 사용하는 핵심 프로토콜입니다.',
    },
  },
  {
    sourceId: 'xcp-protocol',
    targetId: 'etas-inca',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'XCP is natively supported by ETAS INCA for powertrain and chassis controller calibration.',
      ko: 'XCP는 ETAS INCA 도구에서 파워트레인 및 섀시 제어기 파라미터 보정을 위해 네이티브로 사용됩니다.',
    },
  },
  {
    sourceId: 'dbus-ipc',
    targetId: 'linux-kernel',
    type: 'runs-on',
    confidence: 'official',
    description: {
      en: 'D-Bus IPC operates as the standard userspace message bus over Linux OS sockets in automotive systems.',
      ko: 'D-Bus IPC는 차량용 리눅스 환경에서 표준 유저스페이스 메시지 버스로 동작합니다.',
    },
  },
  {
    sourceId: 'android-binder-ipc',
    targetId: 'android-automotive-os',
    type: 'implemented-by',
    confidence: 'official',
    description: {
      en: 'Android Binder IPC forms the architectural foundation for CarService and AIDL communication in AAOS.',
      ko: '안드로이드 바인더(Binder) IPC는 AAOS의 CarService 및 AIDL 통신의 기초 아키텍처를 구성합니다.',
    },
  },
  {
    sourceId: 'eclipse-zenoh',
    targetId: 'ros2-middleware',
    type: 'compatible-with',
    confidence: 'community',
    description: {
      en: 'Eclipse Zenoh provides a high-efficiency alternative RMW plugin (rmw_zenoh) for ROS 2 networks.',
      ko: 'Eclipse Zenoh는 ROS 2 네트워크를 위한 고효율 대체 RMW 플러그인(rmw_zenoh)을 제공합니다.',
    },
  },
  {
    sourceId: 'ecal-middleware',
    targetId: 'eclipse-iceoryx',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'eCAL utilizes Eclipse iceoryx as its high-performance zero-copy shared memory transport layer.',
      ko: 'eCAL은 고성능 제로카피 공유 메모리 전송 백엔드로 Eclipse iceoryx를 연동합니다.',
    },
  },

  // ==========================================
  // ADAS & PERCEPTION RELATIONSHIPS
  // ==========================================
  {
    sourceId: 'baidu-apollo-ad',
    targetId: 'apollo-cyber-rt',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Baidu Apollo autonomous driving platform executes on its dedicated Cyber RT runtime framework.',
      ko: '바이두 아폴로 자율주행 스택은 자체 개발된 전용 Cyber RT 런타임 프레임워크 위에서 구동됩니다.',
    },
  },
  {
    sourceId: 'apex-os',
    targetId: 'ros2-middleware',
    type: 'implemented-by',
    confidence: 'vendor',
    description: {
      en: 'Apex.OS is an ISO 26262 ASIL-D safety-certified commercial operating framework implementing ROS 2 APIs.',
      ko: 'Apex.OS는 ROS 2 API를 호환 구현하여 ISO 26262 ASIL-D 인증을 획득한 상용 모빌리티 프레임워크입니다.',
    },
  },
  {
    sourceId: 'nvidia-cuda',
    targetId: 'nvidia-drive-thor',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'NVIDIA CUDA leverages the GPU acceleration hardware inside NVIDIA DRIVE Thor/Orin SoCs.',
      ko: 'NVIDIA CUDA는 NVIDIA DRIVE Thor 및 Orin SoC 내부의 GPU 가속 하드웨어를 직접 활용합니다.',
    },
  },
  {
    sourceId: 'nvidia-tensorrt',
    targetId: 'nvidia-cuda',
    type: 'depends-on',
    confidence: 'vendor',
    description: {
      en: 'NVIDIA TensorRT relies on CUDA libraries and GPU acceleration cores for deep learning inference.',
      ko: 'NVIDIA TensorRT는 딥러닝 추론 고속화를 위해 CUDA 라이브러리 및 GPU 코어에 의존합니다.',
    },
  },
  {
    sourceId: 'nvidia-driveworks-sdk',
    targetId: 'nvidia-tensorrt',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'NVIDIA DriveWorks SDK uses TensorRT for real-time neural network perception modules.',
      ko: 'NVIDIA DriveWorks SDK는 실시간 신경망 인지 모듈 처리를 위해 TensorRT 추론 엔진을 통합합니다.',
    },
  },
  {
    sourceId: 'opencv-automotive',
    targetId: 'gstreamer-automotive',
    type: 'used-with',
    confidence: 'community',
    description: {
      en: 'OpenCV computer vision pipelines ingest camera video frames decoded via GStreamer.',
      ko: 'OpenCV 컴퓨터 비전 파이프라인은 GStreamer로 디코딩된 카메라 비디오 프레임을 공급받아 처리합니다.',
    },
  },
  {
    sourceId: 'point-cloud-library',
    targetId: 'open3d-library',
    type: 'alternative',
    confidence: 'community',
    description: {
      en: 'Point Cloud Library (PCL) and Open3D serve as complementary open-source 3D spatial processing libraries.',
      ko: 'PCL과 Open3D는 자율주행 3D 포인트 클라우드 처리 분야에서 상호 보완적인 오픈소스 라이브러리입니다.',
    },
  },
  {
    sourceId: 'autoware-universe',
    targetId: 'ros2-autoware',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Autoware Universe contains the extended perception, planning, and control modules of the Autoware platform.',
      ko: 'Autoware Universe는 Autoware 자율주행 플랫폼의 확장 인지, 경로 계획 및 제어 알고리즘을 담당합니다.',
    },
  },
  {
    sourceId: 'autoware-universe',
    targetId: 'point-cloud-library',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Autoware Universe algorithms utilize PCL for LiDAR point cloud segmentation and ground filtering.',
      ko: 'Autoware Universe 알고리즘은 라이다 포인트 클라우드 분할 및 지면 필터링을 위해 PCL을 활용합니다.',
    },
  },

  // ==========================================
  // SIMULATION & TESTING RELATIONSHIPS
  // ==========================================
  {
    sourceId: 'asam-openscenario',
    targetId: 'asam-opendrive',
    type: 'coexists-with',
    confidence: 'official',
    description: {
      en: 'ASAM OpenSCENARIO defines dynamic scenarios that execute on road geometry described by ASAM OpenDRIVE.',
      ko: 'ASAM OpenSCENARIO는 ASAM OpenDRIVE로 기술된 정밀 도로 기하구조 위에서 동적 주행 시나리오를 정의합니다.',
    },
  },
  {
    sourceId: 'carla-av-simulator',
    targetId: 'asam-openscenario',
    type: 'compatible-with',
    confidence: 'official',
    description: {
      en: 'CARLA Autonomous Driving Simulator supports importing and executing ASAM OpenSCENARIO files.',
      ko: 'CARLA 자율주행 시뮬레이터는 ASAM OpenSCENARIO 규격의 시나리오 파일 임포트 및 실행을 지원합니다.',
    },
  },
  {
    sourceId: 'carla-av-simulator',
    targetId: 'asam-opendrive',
    type: 'compatible-with',
    confidence: 'official',
    description: {
      en: 'CARLA Simulator natively imports ASAM OpenDRIVE road networks to construct high-definition virtual maps.',
      ko: 'CARLA 시뮬레이터는 가상 맵 구축을 위해 ASAM OpenDRIVE 정밀 도로망을 네이티브로 임포트합니다.',
    },
  },
  {
    sourceId: 'eclipse-openpass',
    targetId: 'asam-openscenario',
    type: 'compatible-with',
    confidence: 'official',
    description: {
      en: 'Eclipse openPASS executes prospective safety assessments based on ASAM OpenSCENARIO definitions.',
      ko: 'Eclipse openPASS는 ASAM OpenSCENARIO 기반으로 위험 교통 시나리오의 안전성을 사전 예측 평가합니다.',
    },
  },
  {
    sourceId: 'eclipse-sumo',
    targetId: 'asam-opendrive',
    type: 'compatible-with',
    confidence: 'official',
    description: {
      en: 'SUMO traffic simulator converts ASAM OpenDRIVE road geometries into microscopic simulation networks.',
      ko: 'SUMO 교통 시뮬레이터는 ASAM OpenDRIVE 도로 기하구조를 미시적 교통 시뮬레이션 망으로 변환합니다.',
    },
  },
  {
    sourceId: 'eclipse-sumo',
    targetId: 'carla-av-simulator',
    type: 'integrates-with',
    confidence: 'community',
    description: {
      en: 'SUMO and CARLA co-simulate realistic multi-vehicle traffic flows within 3D urban driving environments.',
      ko: 'SUMO와 CARLA는 공동 시뮬레이션(Co-simulation)을 통해 3D 도심 환경에서 현실적인 교통 흐름을 구현합니다.',
    },
  },
  {
    sourceId: 'asam-xil',
    targetId: 'dspace-scalexio-hil',
    type: 'compatible-with',
    confidence: 'official',
    description: {
      en: 'dSPACE SCALEXIO supports ASAM XIL standard APIs for vendor-neutral test bench automation.',
      ko: 'dSPACE SCALEXIO HIL 벤치는 벤더 독립적 테스트 자동화를 위해 ASAM XIL 표준 인터페이스를 지원합니다.',
    },
  },
  {
    sourceId: 'gazebo-sim',
    targetId: 'ros2-middleware',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Gazebo Simulator integrates natively with ROS 2 through the ros_gz bridge for robotics testing.',
      ko: 'Gazebo 시뮬레이터는 ros_gz 브리지를 통해 ROS 2와 네이티브로 연동되어 센서 및 제어를 시뮬레이션합니다.',
    },
  },
  {
    sourceId: 'cyberbotics-webots',
    targetId: 'ros2-middleware',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Webots provides dedicated ROS 2 interface packages for autonomous mobile robot simulation.',
      ko: 'Webots는 자율 모바일 로봇 및 차량 시뮬레이션을 위해 전용 ROS 2 인터페이스 패키지를 제공합니다.',
    },
  },
  {
    sourceId: 'qemu-automotive-emulator',
    targetId: 'linux-kernel',
    type: 'used-with',
    confidence: 'community',
    description: {
      en: 'QEMU emulates ARM64 target hardware to boot and debug automotive Linux kernels without physical silicon.',
      ko: 'QEMU는 실제 실리콘 없이 ARM64 타깃 하드웨어를 에뮬레이션하여 차량용 리눅스 커널을 부팅하고 디버깅합니다.',
    },
  },
  {
    sourceId: 'vector-canoe',
    targetId: 'can-protocol',
    type: 'used-with',
    confidence: 'vendor',
    description: {
      en: 'Vector CANoe is the automotive industry standard simulation and testing environment for CAN networks.',
      ko: 'Vector CANoe는 CAN 네트워크의 잔여 버스 시뮬레이션 및 적합성 테스트를 위한 업계 표준 도구입니다.',
    },
  },
  {
    sourceId: 'vector-canoe',
    targetId: 'vector-canalyzer',
    type: 'coexists-with',
    confidence: 'vendor',
    description: {
      en: 'Vector CANoe and CANalyzer share common hardware interfaces (VN series) and logging formats (BLF/ASC).',
      ko: 'Vector CANoe와 CANalyzer는 공통 하드웨어 인터페이스(VN 시리즈) 및 로깅 포맷(BLF)을 공유합니다.',
    },
  },
  {
    sourceId: 'vector-canoe',
    targetId: 'vector-canape',
    type: 'coexists-with',
    confidence: 'vendor',
    description: {
      en: 'Vector CANoe and CANape integrate for synchronized ECU network simulation and parameter calibration.',
      ko: 'Vector CANoe와 CANape는 동기화된 ECU 네트워크 시뮬레이션 및 파라미터 캘리브레이션을 위해 연동됩니다.',
    },
  },
  {
    sourceId: 'matlab-simulink',
    targetId: 'autosar-classic',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'Simulink Embedded Coder generates production AUTOSAR Classic Software Components (SWCs) and ARXML.',
      ko: 'Simulink Embedded Coder는 양산용 AUTOSAR Classic 소프트웨어 컴포넌트(SWC) C 코드와 ARXML을 자동 생성합니다.',
    },
  },
  {
    sourceId: 'matlab-simulink',
    targetId: 'asam-xil',
    type: 'compatible-with',
    confidence: 'vendor',
    description: {
      en: 'Simulink Real-Time and test suites interface with ASAM XIL test automation environments.',
      ko: 'Simulink Real-Time 및 테스트 프레임워크는 ASAM XIL 기반 HIL/SIL 테스트 자동화 환경과 연동됩니다.',
    },
  },

  // ==========================================
  // HARDWARE COMPUTE RELATIONSHIPS
  // ==========================================
  {
    sourceId: 'infineon-aurix',
    targetId: 'autosar-classic',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Infineon AURIX TriCore MCUs run AUTOSAR Classic Basic Software (BSW) and MCAL drivers.',
      ko: '인피니언 AURIX TriCore 마이크로컨트롤러는 AUTOSAR Classic BSW 및 전용 MCAL 드라이버를 구동합니다.',
    },
  },
  {
    sourceId: 'mobileye-eyeq',
    targetId: 'autosar-adaptive',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Mobileye EyeQ SoC platforms integrate with AUTOSAR Adaptive and POSIX OS for surround vision ADAS.',
      ko: '모빌아이 EyeQ SoC 플랫폼은 서라운드 비전 ADAS를 위해 AUTOSAR Adaptive 및 POSIX OS와 연동됩니다.',
    },
  },
  {
    sourceId: 'ambarella-cv',
    targetId: 'opencv-automotive',
    type: 'compatible-with',
    confidence: 'vendor',
    description: {
      en: 'Ambarella CVflow SDK provides optimized OpenCV hardware acceleration for multi-camera vision.',
      ko: '암바렐라 CVflow SDK는 멀티 카메라 비전 처리를 위해 하드웨어 가속 OpenCV 라이브러리를 지원합니다.',
    },
  },

];

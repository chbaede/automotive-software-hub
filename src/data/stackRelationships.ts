import { TechnologyRelationship } from '../types/relationship';

export const stackRelationships: TechnologyRelationship[] = [
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
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'Engineered as a commercial real-time virtualization hypervisor optimized for mixed-criticality SDVs leveraging KVM mechanisms.',
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
{
    sourceId: 'qualcomm-snapdragon-ride',
    targetId: 'qualcomm-hypervisor',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Snapdragon Ride autonomous driving platform executes Qualcomm Type-1 Hypervisor for mixed-criticality domain isolation.',
      ko: '스냅드래곤 Ride 자율주행 플랫폼은 이종 안전도 도메인 격리를 위해 퀄컴 Type-1 하이퍼바이저를 구동합니다.',
    },
  },
{
    sourceId: 'qualcomm-snapdragon-ride',
    targetId: 'autosar-adaptive',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Snapdragon Ride compute platforms host AUTOSAR Adaptive middleware for high-performance ADAS applications.',
      ko: '스냅드래곤 Ride 컴퓨팅 플랫폼은 고성능 ADAS 애플리케이션을 위해 AUTOSAR Adaptive 미들웨어를 실행합니다.',
    },
  },
{
    sourceId: 'qualcomm-snapdragon-ride',
    targetId: 'qualcomm-snapdragon-cockpit',
    type: 'coexists-with',
    confidence: 'vendor',
    description: {
      en: 'Snapdragon Ride and Cockpit platforms integrate in Snapdragon Digital Chassis cross-domain architectures.',
      ko: '스냅드래곤 Ride와 콕핏 플랫폼은 스냅드래곤 디지털 섀시 크로스 도메인 아키텍처에서 상호 연동되어 공존합니다.',
    },
  },
{
    sourceId: 'renesas-rcar',
    targetId: 'linux-kernel',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Renesas R-Car automotive SoCs run mainline Linux and BSP kernels for IVI and gateway compute.',
      ko: '르네사스 R-Car 오토모티브 SoC는 차량 IVI 및 게이트웨이 컴퓨팅을 위해 메인라인 리눅스 커널을 구동합니다.',
    },
  },
{
    sourceId: 'renesas-rcar',
    targetId: 'autosar-adaptive',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Renesas R-Car Gen4 platforms host AUTOSAR Adaptive stacks for domain and zonal control.',
      ko: '르네사스 R-Car 4세대 플랫폼은 도메인 및 영역 제어를 위해 AUTOSAR Adaptive 스택을 호스팅합니다.',
    },
  },
{
    sourceId: 'renesas-rcar',
    targetId: 'qnx-neutrino',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'R-Car processors execute QNX Neutrino RTOS for instrument cluster display and ADAS control.',
      ko: 'R-Car 프로세서는 디지털 계기판 및 ADAS 제어를 위해 QNX Neutrino RTOS를 실행합니다.',
    },
  },
{
    sourceId: 'ti-jacinto',
    targetId: 'freertos',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'TI Jacinto processors host FreeRTOS on dedicated MCU cores (R5F) for safety and real-time processing.',
      ko: 'TI Jacinto 프로세서는 실시간 안전 처리를 위해 전용 MCU 코어(R5F)에서 FreeRTOS를 구동합니다.',
    },
  },
{
    sourceId: 'ti-jacinto',
    targetId: 'linux-kernel',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'TI Jacinto processor family runs Linux on Cortex-A application cores for edge compute.',
      ko: 'TI Jacinto 프로세서 제품군은 엣지 컴퓨팅을 위해 Cortex-A 애플리케이션 코어에서 리눅스를 구동합니다.',
    },
  },
{
    sourceId: 'ti-jacinto',
    targetId: 'autosar-classic',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Jacinto MCU safety cores execute AUTOSAR Classic BSW and MCAL drivers for vehicle networking.',
      ko: 'Jacinto MCU 안전 코어는 차량 네트워킹을 위해 AUTOSAR Classic BSW 및 MCAL 드라이버를 실행합니다.',
    },
  },
{
    sourceId: 'horizon-robotics-journey',
    targetId: 'linux-kernel',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Horizon Robotics Journey BPU SoCs run optimized embedded Linux kernels for ADAS compute.',
      ko: '호라이즌 로보틱스 Journey BPU SoC는 ADAS 컴퓨팅을 위해 최적화된 임베디드 리눅스 커널을 구동합니다.',
    },
  },
{
    sourceId: 'horizon-robotics-journey',
    targetId: 'ros2-middleware',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'Journey processors provide TogetheROS acceleration libraries compatible with ROS 2 for autonomous perception.',
      ko: 'Journey 프로세서는 자율주행 인식을 위해 ROS 2 호환 TogetheROS 가속 라이브러리를 제공합니다.',
    },
  },
{
    sourceId: 'black-sesame-huashan',
    targetId: 'linux-kernel',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Black Sesame Huashan A1000 SoCs execute Linux for autonomous driving computing platforms.',
      ko: '블랙세서미 Huashan A1000 SoC는 자율주행 컴퓨팅 플랫폼을 위해 리눅스 OS를 실행합니다.',
    },
  },
{
    sourceId: 'black-sesame-huashan',
    targetId: 'autosar-adaptive',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Huashan A1000 platforms support AUTOSAR Adaptive runtime for multi-domain vehicle compute.',
      ko: 'Huashan A1000 플랫폼은 멀티 도메인 차량 컴퓨팅을 위해 AUTOSAR Adaptive 런타임을 지원합니다.',
    },
  },
{
    sourceId: 'samsung-exynos-hypervisor',
    targetId: 'android-automotive-os',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Samsung Exynos Auto hypervisor framework hosts Android Automotive OS guest instances for IVI.',
      ko: '삼성 엑시노스 오토 하이퍼바이저 프레임워크는 IVI를 위해 안드로이드 오토모티브 OS 게스트 인스턴스를 호스팅합니다.',
    },
  },
{
    sourceId: 'samsung-exynos-hypervisor',
    targetId: 'open-synergy-coqos',
    type: 'coexists-with',
    confidence: 'vendor',
    description: {
      en: 'Exynos Auto processors partner with COQOS Hypervisor for VirtIO-based multi-display clustering.',
      ko: '엑시노스 오토 프로세서는 VirtIO 기반 멀티 디스플레이 클러스터링을 위해 COQOS 하이퍼바이저와 연동됩니다.',
    },
  },
{
    sourceId: 'xen-automotive',
    targetId: 'linux-kernel',
    type: 'runs-on',
    confidence: 'official',
    description: {
      en: 'Xen automotive hypervisor uses an embedded Linux domain (Dom0) for control and guest management.',
      ko: 'Xen 오토모티브 하이퍼바이저는 제어 및 게스트 관리를 위해 임베디드 리눅스 도메인(Dom0)을 실행합니다.',
    },
  },
{
    sourceId: 'xen-automotive',
    targetId: 'kvm-automotive',
    type: 'alternative',
    confidence: 'community',
    description: {
      en: 'Xen and KVM serve as alternative open-source Type-1/Type-2 virtualization hypervisors for automotive platforms.',
      ko: 'Xen과 KVM은 차량용 가상화 플랫폼에서 상호 대안적인 오픈소스 하이퍼바이저 솔루션입니다.',
    },
  },
{
    sourceId: 'ghs-integrity-rtos',
    targetId: 'kanzi-ui-engine',
    type: 'used-with',
    confidence: 'vendor',
    description: {
      en: 'Green Hills INTEGRITY RTOS hosts Rightware Kanzi UI engine for safety-critical digital instrument clusters.',
      ko: '그린힐스 INTEGRITY RTOS는 기능 안전 디지털 계기판 구현을 위해 Rightware Kanzi UI 엔진을 호스팅합니다.',
    },
  },
{
    sourceId: 'ghs-integrity-rtos',
    targetId: 'autosar-adaptive',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'INTEGRITY for Automotive hosts AUTOSAR Adaptive Platform POSIX runtimes.',
      ko: 'INTEGRITY for Automotive는 AUTOSAR Adaptive 플랫폼 POSIX 런타임을 구동합니다.',
    },
  },
{
    sourceId: 'sysgo-pikeos',
    targetId: 'autosar-adaptive',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'SYSGO PikeOS microkernel hypervisor hosts AUTOSAR Adaptive guest partitions for safe vehicle compute.',
      ko: 'SYSGO PikeOS 마이크로커널 하이퍼바이저는 안전한 차량 컴퓨팅을 위해 AUTOSAR Adaptive 파티션을 호스팅합니다.',
    },
  },
{
    sourceId: 'sysgo-pikeos',
    targetId: 'linux-kernel',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'PikeOS partitions host Linux guest OS instances alongside safety-critical real-time applications.',
      ko: 'PikeOS 파티션은 안전 필수 실시간 애플리케이션과 함께 리눅스 게스트 OS 인스턴스를 격리 구동합니다.',
    },
  },
{
    sourceId: 'freertos',
    targetId: 'infineon-aurix',
    type: 'runs-on',
    confidence: 'community',
    description: {
      en: 'FreeRTOS runs as an embedded RTOS kernel on Infineon TriCore and ARM Cortex-M/R microcontroller cores.',
      ko: 'FreeRTOS는 인피니언 TriCore 및 ARM Cortex-M/R 마이크로컨트롤러 코어에서 임베디드 RTOS 커널로 구동됩니다.',
    },
  },
{
    sourceId: 'freertos',
    targetId: 'zephyr-rtos',
    type: 'alternative',
    confidence: 'community',
    description: {
      en: 'FreeRTOS and Zephyr RTOS serve as popular open-source RTOS options for automotive MCUs and sensors.',
      ko: 'FreeRTOS와 Zephyr RTOS는 차량용 MCU 및 스마트 센서 노드를 위한 대표적 오픈소스 RTOS 대안입니다.',
    },
  },
{
    sourceId: 'vxworks-rtos',
    targetId: 'autosar-adaptive',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Wind River VxWorks RTOS hosts AUTOSAR Adaptive platform instances for mission-critical domain controllers.',
      ko: '윈드리버 VxWorks RTOS는 미션 크리티컬 도메인 제어기를 위해 AUTOSAR Adaptive 플랫폼을 구동합니다.',
    },
  },
{
    sourceId: 'vxworks-rtos',
    targetId: 'qnx-neutrino',
    type: 'alternative',
    confidence: 'vendor',
    description: {
      en: 'VxWorks and QNX Neutrino are leading commercial safety-certified POSIX RTOS platforms for automotive ECUs.',
      ko: 'VxWorks와 QNX Neutrino는 차량용 ECU를 위한 선도적 상용 기능 안전 인증 POSIX RTOS 솔루션입니다.',
    },
  },
{
    sourceId: 'huawei-qiankun-ads',
    targetId: 'autosar-adaptive',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Huawei Qiankun ADS runs on top of AUTOSAR Adaptive and HarmonyOS for intelligent driving control.',
      ko: '화웨이 첸쿤(Qiankun) ADS는 지능형 자율주행 제어를 위해 AUTOSAR Adaptive 및 HarmonyOS 기반으로 구동됩니다.',
    },
  },
{
    sourceId: 'huawei-qiankun-ads',
    targetId: 'momenta-flywheel-ad',
    type: 'alternative',
    confidence: 'vendor',
    description: {
      en: 'Huawei Qiankun and Momenta Flywheel serve as leading commercial Urban NOA autonomous driving software stacks.',
      ko: '화웨이 첸쿤과 모멘타 플라이휠은 도심 내비게이션 자율주행(Urban NOA) 분야의 상호 경쟁적 상용 솔루션입니다.',
    },
  },
{
    sourceId: 'mqtt-automotive',
    targetId: 'ota-cloud-fleet',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'MQTT protocol transports vehicle telemetry and trigger events between vehicles and OTA cloud fleet management platforms.',
      ko: 'MQTT 프로토콜은 차량과 OTA 클라우드 플릿 관리 플랫폼 간에 차량 텔레메트리 및 제어 이벤트를 전송합니다.',
    },
  },
{
    sourceId: 'mqtt-automotive',
    targetId: 'eclipse-kuksa',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'MQTT is widely used as a transport bridge connecting KUKSA vehicle data to edge brokers and cloud analytics.',
      ko: 'MQTT는 KUKSA 차량 데이터를 엣지 브로커 및 클라우드 분석 플랫폼과 연동하는 전송 브리지로 널리 사용됩니다.',
    },
  },
{
    sourceId: 'momenta-flywheel-ad',
    targetId: 'ros2-middleware',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'Momenta autonomous driving stack integrates with ROS 2 and DDS middleware for sensor data distribution.',
      ko: '모멘타 자율주행 스택은 센서 데이터 분배 및 모듈 연동을 위해 ROS 2 및 DDS 미들웨어를 활용합니다.',
    },
  },
{
    sourceId: 'momenta-flywheel-ad',
    targetId: 'nvidia-drive-thor',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Momenta Flywheel AD software is optimized to run on NVIDIA DRIVE Thor and Orin compute platforms.',
      ko: '모멘타 플라이휠 AD 소프트웨어는 엔비디아 DRIVE Thor 및 Orin 컴퓨팅 플랫폼에 최적화되어 구동됩니다.',
    },
  },
{
    sourceId: 'aspice-process',
    targetId: 'iso-26262-functional-safety',
    type: 'coexists-with',
    confidence: 'official',
    description: {
      en: 'Automotive SPICE (v4.0) quality process framework aligns with ISO 26262 functional safety lifecycle engineering.',
      ko: 'Automotive SPICE(ASPICE v4.0) 소프트웨어 프로세스 품질 프레임워크는 ISO 26262 기능 안전 수명주기 공학과 결합됩니다.',
    },
  },
{
    sourceId: 'aspice-process',
    targetId: 'iso-21434-cybersecurity',
    type: 'coexists-with',
    confidence: 'official',
    description: {
      en: 'ASPICE Engineering processes integrate ISO/SAE 21434 cybersecurity engineering requirements.',
      ko: 'ASPICE 개발 프로세스는 ISO/SAE 21434 사이버 보안 공학 요구사항과 유기적으로 통합 운용됩니다.',
    },
  },
{
    sourceId: 'eu-cra-sbom',
    targetId: 'openchain-foss-compliance',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'OpenChain (ISO/IEC 5230) provides standardized compliance management for EU Cyber Resilience Act Software Bill of Materials (SBOM).',
      ko: 'OpenChain(ISO/IEC 5230) 표준은 EU 사이버 복원력 법(CRA)의 소프트웨어 자재명세서(SBOM) 규정 준수 체계를 지원합니다.',
    },
  },
{
    sourceId: 'eu-cra-sbom',
    targetId: 'unece-r155-r156',
    type: 'coexists-with',
    confidence: 'official',
    description: {
      en: 'EU CRA and UN ECE R155/R156 jointly mandate software supply chain security and cybersecurity monitoring for connected vehicles.',
      ko: 'EU CRA 규정과 UN ECE R155/R156 법규는 커넥티드 차량의 소프트웨어 공급망 보안 및 취약점 모니터링을 공동으로 요구합니다.',
    },
  },
{
    sourceId: 'openchain-foss-compliance',
    targetId: 'yocto-project',
    type: 'used-with',
    confidence: 'community',
    description: {
      en: 'Yocto Project utilizes OpenChain-compliant tooling (OpenEmbedded SBOM generators) to ensure FOSS license compliance.',
      ko: 'Yocto Project는 오픈소스 라이선스 및 SBOM 무결성을 확보하기 위해 OpenChain 호환 도구를 적극 활용합니다.',
    },
  },
{
    sourceId: 'bazel-build-system',
    targetId: 'ros2-autoware',
    type: 'used-with',
    confidence: 'community',
    description: {
      en: 'Bazel is used for high-performance reproducible hermetic builds in autonomous driving stacks like Apollo and Autoware.',
      ko: 'Bazel은 아폴로 및 오토웨어와 같은 대규모 자율주행 스택에서 고속 재현 빌드 도구로 사용됩니다.',
    },
  },
{
    sourceId: 'bazel-build-system',
    targetId: 'yocto-project',
    type: 'alternative',
    confidence: 'community',
    description: {
      en: 'Bazel and Yocto/BitBake provide complementary build and dependency management paradigms in automotive software.',
      ko: 'Bazel과 Yocto/BitBake는 차량용 소프트웨어 빌드 및 배포 환경에서 상호 보완적인 빌드 패러다임을 제공합니다.',
    },
  },
{
    sourceId: 'ipg-carmaker-sim',
    targetId: 'asam-openscenario',
    type: 'compatible-with',
    confidence: 'vendor',
    description: {
      en: 'IPG CarMaker natively imports and simulates ASAM OpenSCENARIO dynamic driving maneuvers.',
      ko: 'IPG CarMaker는 ASAM OpenSCENARIO 표준 규격의 동적 주행 시나리오를 네이티브로 임포트하여 시뮬레이션합니다.',
    },
  },
{
    sourceId: 'ipg-carmaker-sim',
    targetId: 'matlab-simulink',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'IPG CarMaker provides co-simulation interfaces with MATLAB/Simulink for vehicle dynamics and chassis controllers.',
      ko: 'IPG CarMaker는 차량 동역학 및 섀시 제어 로직 검증을 위해 MATLAB/Simulink와의 연성 시뮬레이션 인터페이스를 제공합니다.',
    },
  },
{
    sourceId: 'ota-cloud-fleet',
    targetId: 'unece-r155-r156',
    type: 'compatible-with',
    confidence: 'official',
    description: {
      en: 'Connected Car OTA fleet platforms implement UN ECE R156 Software Update Management System (SUMS) compliance.',
      ko: '커넥티드 카 OTA 플릿 플랫폼은 UN ECE R156 소프트웨어 업데이트 관리 시스템(SUMS) 규제 요건을 충족합니다.',
    },
  },
{
    sourceId: 'ota-cloud-fleet',
    targetId: 'eclipse-ankaios',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'Fleet management platforms orchestrate container updates to in-vehicle systems running Eclipse Ankaios.',
      ko: '차량 플릿 관리 플랫폼은 Eclipse Ankaios를 실행하는 차량 내 제어기에 컨테이너 업데이트를 원격 배포합니다.',
    },
  },
{
    sourceId: 'nvidia-driveworks-sdk',
    targetId: 'nvidia-drive-thor',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'NVIDIA DriveWorks SDK delivers sensor abstraction and vision pipelines for DRIVE Thor and Orin platforms.',
      ko: 'NVIDIA DriveWorks SDK는 DRIVE Thor 및 Orin 플랫폼에서 센서 추상화 및 비전 파이프라인을 구동합니다.',
    },
  },
{
    sourceId: 'embedded-linux-rt',
    targetId: 'linux-kernel',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'Embedded Linux RT builds upon mainline Linux kernel using the PREEMPT_RT deterministic patchset.',
      ko: '임베디드 리눅스 RT는 메인라인 리눅스 커널에 PREEMPT_RT 실시간 패치셋을 적용하여 구축됩니다.',
    },
  },
{
    sourceId: 'nxp-s32',
    targetId: 'autosar-classic',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'NXP S32 vehicle microcontrollers run AUTOSAR Classic BSW and real-time MCAL drivers for gateway control.',
      ko: 'NXP S32 차량용 마이크로컨트롤러는 게이트웨이 및 바디 제어를 위해 AUTOSAR Classic BSW를 실행합니다.',
    },
  },
{
    sourceId: 'nxp-s32',
    targetId: 'zephyr-rtos',
    type: 'runs-on',
    confidence: 'community',
    description: {
      en: 'NXP S32K and S32Z/E MCU cores support Zephyr RTOS for open-source safety monitoring.',
      ko: 'NXP S32K 및 S32Z/E MCU 코어는 오픈소스 안전 모니터링을 위해 Zephyr RTOS를 지원합니다.',
    },
  },
{
    sourceId: 'aaos-sdv-platform',
    targetId: 'android-automotive-os',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'AAOS SDV Platform extends standard Android Automotive OS with cloud-native SDV services and HAL extensions.',
      ko: 'AAOS SDV 플랫폼은 표준 안드로이드 오토모티브 OS를 클라우드 네이티브 SDV 서비스 및 HAL 확장으로 강화합니다.',
    },
  },
{
    sourceId: 'soong-build-system',
    targetId: 'android-automotive-os',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Soong build system compiles and packages Android Automotive OS (AAOS) platform images.',
      ko: 'Soong 빌드 시스템은 안드로이드 오토모티브 OS(AAOS) 플랫폼 이미지를 빌드하고 패키징합니다.',
    },
  },
{
    sourceId: 'adb-perfetto-tools',
    targetId: 'android-automotive-os',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Perfetto tracing and ADB tools are standard performance profiling utilities for Android Automotive OS.',
      ko: 'Perfetto 트레이싱 및 ADB 도구는 안드로이드 오토모티브 OS의 성능 프로파일링 표준 유틸리티입니다.',
    },
  },
{
    sourceId: 'mobileye-eyeq',
    targetId: 'opencv-automotive',
    type: 'compatible-with',
    confidence: 'vendor',
    description: {
      en: 'Mobileye EyeQ surround vision pipelines interface with OpenCV pre-processing libraries.',
      ko: '모빌아이 EyeQ 서라운드 비전 파이프라인은 OpenCV 전처리 라이브러리와 호환되어 동작합니다.',
    },
  },
{
    sourceId: 'ambarella-cv',
    targetId: 'gstreamer-automotive',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'Ambarella CVflow processors utilize GStreamer multimedia pipelines for multi-camera video ingest.',
      ko: '암바렐라 CVflow 프로세서는 멀티 카메라 영상 입력을 위해 GStreamer 멀티미디어 파이프라인을 연동합니다.',
    },
  },
{
    sourceId: 'kuksa-databroker',
    targetId: 'eclipse-velocitas',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Eclipse Velocitas applications query and subscribe to vehicle signals via KUKSA Databroker.',
      ko: 'Eclipse Velocitas 애플리케이션은 KUKSA Databroker를 통해 실차 신호를 구독하고 제어합니다.',
    },
  },
{
    sourceId: 'kuksa-val',
    targetId: 'can-protocol',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'KUKSA.val CAN feeder translates raw CAN frames into COVESA VSS vehicle signal paths.',
      ko: 'KUKSA.val CAN 피더는 로우(Raw) CAN 프레임을 COVESA VSS 차량 신호 경로로 변환합니다.',
    },
  },
{
    sourceId: 'covesa-vissr',
    targetId: 'covesa-vss',
    type: 'depends-on',
    confidence: 'official',
    description: {
      en: 'COVESA VISSR server uses COVESA VSS as its underlying canonical vehicle signal tree.',
      ko: 'COVESA VISSR 서버는 기본 표준 신호 트리로 COVESA VSS 데이터 모델에 의존합니다.',
    },
  },
{
    sourceId: 'covesa-uservices',
    targetId: 'covesa-vss',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'COVESA uServices standard service definitions reference COVESA VSS data types and state attributes.',
      ko: 'COVESA uServices 표준 서비스 명세는 COVESA VSS 데이터 타입 및 상태 속성을 참조하여 정의됩니다.',
    },
  },
{
    sourceId: 'eclipse-velocitas',
    targetId: 'eclipse-leda',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Eclipse Velocitas applications deploy directly onto Eclipse Leda SDV distribution images.',
      ko: 'Eclipse Velocitas로 개발된 앱은 Eclipse Leda SDV 배포판 이미지에 즉시 배포되어 실행됩니다.',
    },
  },
{
    sourceId: 'eclipse-zenoh',
    targetId: 'eclipse-uprotocol',
    type: 'compatible-with',
    confidence: 'official',
    description: {
      en: 'Eclipse Zenoh provides an ultra-low overhead transport layer binding for Eclipse uProtocol.',
      ko: 'Eclipse Zenoh는 Eclipse uProtocol을 위한 초경량 저지연 전송 계층 바인딩을 제공합니다.',
    },
  },
{
    sourceId: 'rti-connext-dds',
    targetId: 'autosar-adaptive',
    type: 'integrates-with',
    confidence: 'vendor',
    description: {
      en: 'RTI Connext Drive integrates as the certified DDS Communication Management binding in AUTOSAR Adaptive.',
      ko: 'RTI Connext Drive는 AUTOSAR Adaptive 통신 관리(ara::com)의 공인 DDS 바인딩으로 통합됩니다.',
    },
  },
{
    sourceId: 'ieee-tsn',
    targetId: 'autosar-adaptive',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'AUTOSAR Adaptive platforms utilize TSN Ethernet for deterministic inter-HPC communication.',
      ko: 'AUTOSAR Adaptive 플랫폼은 고성능 컴퓨터(HPC) 간 확정적 실시간 통신을 위해 TSN 이더넷을 활용합니다.',
    },
  },
{
    sourceId: 'lin-bus-protocol',
    targetId: 'autosar-classic',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'AUTOSAR Classic defines standardized LIN Interface (LinIf) and LIN Driver (Lin) BSW modules.',
      ko: 'AUTOSAR Classic은 표준화된 LIN 인터페이스(LinIf) 및 LIN 드라이버 BSW 모듈을 규정합니다.',
    },
  },
{
    sourceId: 'flexray-protocol',
    targetId: 'autosar-classic',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'AUTOSAR Classic provides standardized FlexRay Interface (FrIf) and State Manager (FrSM) modules.',
      ko: 'AUTOSAR Classic은 표준화된 FlexRay 인터페이스(FrIf) 및 상태 관리자(FrSM) 모듈을 제공합니다.',
    },
  },
{
    sourceId: 'dbus-ipc',
    targetId: 'agl-unified-codebase',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Automotive Grade Linux (AGL) utilizes D-Bus as the system IPC bus between daemons and HMI apps.',
      ko: 'AGL UCB 플랫폼은 시스템 데몬과 HMI 애플리케이션 간의 시스템 IPC 버스로 D-Bus를 활용합니다.',
    },
  },
{
    sourceId: 'android-binder-ipc',
    targetId: 'aaos-sdv-platform',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Android Binder IPC facilitates high-throughput communication across AAOS SDV extension services and HALs.',
      ko: '안드로이드 바인더 IPC는 AAOS SDV 확장 서비스와 하드웨어 추상화 계층(HAL) 간 통신을 중계합니다.',
    },
  },
{
    sourceId: 'ecal-middleware',
    targetId: 'ros2-middleware',
    type: 'compatible-with',
    confidence: 'community',
    description: {
      en: 'eCAL provides a high-performance RMW implementation (rmw_ecal) for zero-copy ROS 2 communications.',
      ko: 'eCAL은 ROS 2를 위한 고성능 제로카피 RMW 구현체(rmw_ecal)를 제공합니다.',
    },
  },
{
    sourceId: 'apollo-cyber-rt',
    targetId: 'linux-kernel',
    type: 'runs-on',
    confidence: 'official',
    description: {
      en: 'Apollo Cyber RT executes on Linux kernel using real-time CPU affinity and lock-free memory queues.',
      ko: 'Apollo Cyber RT는 실시간 CPU 어피니티 및 락프리 큐를 활용하여 리눅스 커널 위에서 구동됩니다.',
    },
  },
{
    sourceId: 'apex-os',
    targetId: 'qnx-neutrino',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Apex.OS runs on safety-certified QNX Neutrino RTOS for mission-critical ADAS controllers.',
      ko: 'Apex.OS는 미션 크리티컬 ADAS 제어기를 위해 기능 안전 인증 QNX Neutrino RTOS 위에서 구동됩니다.',
    },
  },
{
    sourceId: 'gstreamer-automotive',
    targetId: 'linux-kernel',
    type: 'runs-on',
    confidence: 'official',
    description: {
      en: 'GStreamer utilizes Linux V4L2 (Video4Linux2) and DRM/KMS drivers for camera capture and display.',
      ko: 'GStreamer는 카메라 캡처 및 화면 출력을 위해 리눅스 V4L2 및 DRM/KMS 커널 드라이버를 활용합니다.',
    },
  },
{
    sourceId: 'open3d-library',
    targetId: 'ros2-autoware',
    type: 'used-with',
    confidence: 'community',
    description: {
      en: 'Open3D processes 3D LiDAR point clouds and HD map alignments in Autoware autonomous driving pipelines.',
      ko: 'Open3D는 Autoware 자율주행 파이프라인에서 3D 라이다 포인트 클라우드 및 HD 맵 정합 처리에 사용됩니다.',
    },
  },
{
    sourceId: 'eclipse-openpass',
    targetId: 'eclipse-sumo',
    type: 'integrates-with',
    confidence: 'official',
    description: {
      en: 'Eclipse openPASS co-simulates with SUMO to model dynamic background traffic in safety assessments.',
      ko: 'Eclipse openPASS는 안전 평가 시뮬레이션에서 동적 주변 교통 모델링을 위해 SUMO와 연동됩니다.',
    },
  },
{
    sourceId: 'gazebo-sim',
    targetId: 'carla-av-simulator',
    type: 'alternative',
    confidence: 'community',
    description: {
      en: 'Gazebo and CARLA serve as alternative 3D simulation environments for robotics and autonomous vehicles.',
      ko: 'Gazebo와 CARLA는 로보틱스 및 자율주행 차량 검증을 위한 대표적인 3D 물리 시뮬레이션 대안입니다.',
    },
  },
{
    sourceId: 'cyberbotics-webots',
    targetId: 'carla-av-simulator',
    type: 'alternative',
    confidence: 'community',
    description: {
      en: 'Webots and CARLA provide complementary virtual testing environments for autonomous systems.',
      ko: 'Webots와 CARLA는 자율주행 모빌리티 알고리즘을 위한 상호 보완적 가상 시뮬레이션 환경입니다.',
    },
  },
{
    sourceId: 'qemu-automotive-emulator',
    targetId: 'yocto-project',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Yocto Project generates QEMU-ready ARM64 virtual target images (runqemu) for automated testing.',
      ko: 'Yocto Project는 자동화 테스트를 위해 QEMU 기반 ARM64 가상 타깃 이미지(runqemu)를 생성합니다.',
    },
  },
{
    sourceId: 'vector-canalyzer',
    targetId: 'lin-bus-protocol',
    type: 'used-with',
    confidence: 'vendor',
    description: {
      en: 'Vector CANalyzer monitors and decodes LIN bus frames and schedule tables.',
      ko: 'Vector CANalyzer는 LIN 버스 프레임 및 스케줄 테이블의 트래픽을 모니터링하고 디코딩합니다.',
    },
  },
{
    sourceId: 'etas-inca',
    targetId: 'can-protocol',
    type: 'used-with',
    confidence: 'vendor',
    description: {
      en: 'ETAS INCA connects to vehicle CAN buses via ES58x interfaces for ECU calibration.',
      ko: 'ETAS INCA는 ECU 캘리브레이션을 위해 ES58x 하드웨어 인터페이스를 통해 차량 CAN 버스에 연결됩니다.',
    },
  },
{
    sourceId: 'nvidia-drive-hypervisor',
    targetId: 'qnx-hypervisor',
    type: 'alternative',
    confidence: 'vendor',
    description: {
      en: 'NVIDIA DRIVE OS Hypervisor and BlackBerry QNX Hypervisor serve as alternative Type-1 hypervisors on automotive SoCs.',
      ko: 'NVIDIA DRIVE OS 하이퍼바이저와 QNX 하이퍼바이저는 차량용 SoC에서 상호 대안적인 Type-1 가상화 솔루션입니다.',
    },
  },
{
    sourceId: 'soong-build-system',
    targetId: 'bazel-build-system',
    type: 'coexists-with',
    confidence: 'official',
    description: {
      en: 'Soong and Bazel co-exist within AOSP and Android Automotive OS build infrastructure.',
      ko: 'Soong과 Bazel은 AOSP 및 안드로이드 오토모티브 OS 빌드 시스템 전환 과정에서 공존합니다.',
    },
  },
{
    sourceId: 'buildroot',
    targetId: 'linux-kernel',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Buildroot cross-compiles embedded Linux kernel and root filesystem images for automotive targets.',
      ko: 'Buildroot는 차량용 타깃 장치를 위해 임베디드 리눅스 커널 및 루트 파일시스템 이미지를 크로스 컴파일합니다.',
    },
  },
{
    sourceId: 'adb-perfetto-tools',
    targetId: 'linux-kernel',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Perfetto captures Linux kernel ftrace, scheduling, and memory events for automotive system optimization.',
      ko: 'Perfetto는 시스템 최적화를 위해 리눅스 커널 ftrace, 스케줄링 및 메모리 이벤트를 수집합니다.',
    },
  },
{
    sourceId: 'renode-emulator',
    targetId: 'freertos',
    type: 'used-with',
    confidence: 'community',
    description: {
      en: 'Renode framework provides virtual hardware emulation for multi-core FreeRTOS automotive firmware.',
      ko: 'Renode 프레임워크는 멀티코어 FreeRTOS 차량용 펌웨어를 위한 가상 하드웨어 에뮬레이션을 제공합니다.',
    },
  },
{
    sourceId: 'android-automotive-os',
    targetId: 'renesas-rcar',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Renesas R-Car automotive system-on-chips provide certified Android Automotive OS reference BSPs.',
      ko: '르네사스 R-Car 자동차용 SoC는 Android Automotive OS 전용 레퍼런스 BSP 및 가속 드라이버를 제공합니다.',
    },
  },
{
    sourceId: 'android-automotive-os',
    targetId: 'ti-jacinto',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'TI Jacinto 7 processors support Android Automotive OS for centralized digital cockpit systems.',
      ko: 'TI Jacinto 7 프로세서는 중앙 집중식 디지털 콕핏 시스템을 위해 Android Automotive OS를 지원합니다.',
    },
  },
{
    sourceId: 'android-automotive-os',
    targetId: 'someip-protocol',
    type: 'used-with',
    confidence: 'vendor',
    description: {
      en: 'Android Automotive OS connects to vehicle ECUs via SOME/IP service-oriented communication through Vehicle HAL.',
      ko: 'Android Automotive OS는 Vehicle HAL을 통해 차량 ECU들과 SOME/IP 서비스 지향 통신으로 연동됩니다.',
    },
  },
{
    sourceId: 'android-automotive-os',
    targetId: 'covesa-vss',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'AAOS vehicle properties and SDV telemetry align with COVESA Vehicle Signal Specification (VSS).',
      ko: 'AAOS 차량 속성(Vehicle Property) 및 텔레메트리는 COVESA VSS 표준 데이터 모델과 상호 매핑됩니다.',
    },
  },
{
    sourceId: 'agl-unified-codebase',
    targetId: 'someip-protocol',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'AGL Unified Codebase integrates SOME/IP communication bindings via vsomeip for vehicle data exchange.',
      ko: 'AGL UCB는 vsomeip를 통한 SOME/IP 서비스 지향 통신 바인딩을 기본 지원합니다.',
    },
  },
{
    sourceId: 'agl-unified-codebase',
    targetId: 'covesa-vss',
    type: 'used-with',
    confidence: 'official',
    description: {
      en: 'Automotive Grade Linux incorporates COVESA VSS data models for connected vehicle telemetry and KUKSA.val.',
      ko: 'AGL은 KUKSA.val 및 커넥티드 텔레매틱스 서비스를 위해 COVESA VSS 차량 데이터 모델을 채택합니다.',
    },
  },
{
    sourceId: 'qt-automotive',
    targetId: 'linux-kernel',
    type: 'runs-on',
    confidence: 'official',
    description: {
      en: 'Qt for Automotive runs on the Linux kernel leveraging Wayland display server and DRM/KMS graphics drivers.',
      ko: 'Qt for Automotive는 Wayland 디스플레이 서버 및 DRM/KMS 드라이버를 통해 리눅스 커널 위에서 동작합니다.',
    },
  },
{
    sourceId: 'qt-automotive',
    targetId: 'android-automotive-os',
    type: 'runs-on',
    confidence: 'vendor',
    description: {
      en: 'Qt for Android Automotive allows building native 2D/3D digital cockpit and IVI apps running directly on AAOS.',
      ko: 'Qt for Android Automotive는 AAOS 상에서 직접 구동되는 고성능 2D/3D 콕핏 및 IVI 애플리케이션 개발을 지원합니다.',
    },
  },
];

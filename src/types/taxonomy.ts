export type TopicId =
  | 'sdv'
  | 'android-automotive'
  | 'yocto'
  | 'embedded-linux'
  | 'qnx'
  | 'autosar'
  | 'can'
  | 'someip'
  | 'doip'
  | 'uds'
  | 'automotive-ethernet'
  | 'adas'
  | 'functional-safety'
  | 'cybersecurity'
  | 'middleware'
  | 'cloud'
  | 'open-source'
  | 'ros2'
  | 'covesa';

export interface TopicMeta {
  id: TopicId;
  label: {
    en: string;
    ko: string;
  };
  description: {
    en: string;
    ko: string;
  };
  badgeColor?: string;
}

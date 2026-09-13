/**
 * General Formatters & String Helpers
 */

export function formatDate(dateString: string, lang: 'en' | 'ko' = 'en'): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat(lang === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatHexByte(val: number): string {
  return (val & 0xff).toString(16).toUpperCase().padStart(2, '0');
}

/**
 * Canonical ISO date formatter for lastVerified badges across components.
 */
export function formatVerifiedDate(isoDate: string, lang: 'en' | 'ko'): string {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  if (lang === 'ko') {
    return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  }
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const monthName = months[parseInt(month, 10) - 1] || month;
  return `${monthName} ${parseInt(day, 10)}, ${year}`;
}

/**
 * Canonical country flag emoji resolver from headquarters string.
 */
export function getCountryFlag(headquarters: string): string {
  const hq = headquarters.toLowerCase();
  if (hq.includes('south korea') || hq.includes('korea') || hq.includes('seoul')) return '🇰🇷';
  if (
    hq.includes('usa') ||
    hq.includes('united states') ||
    hq.includes('california') ||
    hq.includes('texas') ||
    hq.includes('michigan') ||
    hq.includes('connecticut')
  ) {
    return '🇺🇸';
  }
  if (
    hq.includes('germany') ||
    hq.includes('stuttgart') ||
    hq.includes('munich') ||
    hq.includes('wolfsburg')
  ) {
    return '🇩🇪';
  }
  if (hq.includes('japan') || hq.includes('aichi') || hq.includes('tokyo')) return '🇯🇵';
  if (hq.includes('france')) return '🇫🇷';
  if (hq.includes('ireland') || hq.includes('dublin')) return '🇮🇪';
  if (hq.includes('netherlands')) return '🇳🇱';
  if (
    hq.includes('china') ||
    hq.includes('hong kong') ||
    hq.includes('taiwan') ||
    hq.includes('beijing') ||
    hq.includes('shenzhen')
  ) {
    return '🇨🇳';
  }
  if (hq.includes('israel') || hq.includes('jerusalem')) return '🇮🇱';
  if (hq.includes('canada')) return '🇨🇦';
  if (hq.includes('uk') || hq.includes('united kingdom')) return '🇬🇧';
  if (hq.includes('sweden')) return '🇸🇪';
  return '🌐';
}


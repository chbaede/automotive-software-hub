import React from 'react';
import { Calendar, MapPin, ExternalLink, Tag } from 'lucide-react';
import { Event } from '../../types/event';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { formatDate } from '../../utils/formatters';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { language, t } = useLanguage();
  const name = getLocalizedText(event.name, language);
  const description = getLocalizedText(event.description, language);

  const formattedStart = formatDate(event.startDate, language);
  const formattedEnd = formatDate(event.endDate, language);

  return (
    <div className="flex flex-col justify-between p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition shadow-sm">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded">
            {event.format}
          </span>

          {event.cfpStatus === 'open' && (
            <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
              {t.events.cfpOpen}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
          {name}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {description}
        </p>

        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mb-4 font-mono">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-brand-500" />
            <span>
              {formattedStart} {event.startDate !== event.endDate ? `– ${formattedEnd}` : ''}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            <span>
              {event.city ? `${event.city}, ${event.country}` : 'Online / Global Event'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {event.categories.map((cat) => (
            <span key={cat} className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 text-slate-700 dark:text-slate-300 rounded-lg transition"
        >
          <span>Event Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};


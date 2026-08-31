import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Search, Filter } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { events } from '../../data/events';
import { EventCard } from '../../components/cards/EventCard';
import { getLocalizedText } from '../../types/i18n';

export const EventsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [timeTab, setTimeTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [formatFilter, setFormatFilter] = useState<string>(searchParams.get('format') || 'all');
  const [regionFilter, setRegionFilter] = useState<string>(searchParams.get('region') || 'all');

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredEvents = events.filter((ev) => {
    const name = getLocalizedText(ev.name, language).toLowerCase();
    const desc = getLocalizedText(ev.description, language).toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    const matchesQuery =
      !query ||
      name.includes(query) ||
      desc.includes(query) ||
      (ev.city && ev.city.toLowerCase().includes(query)) ||
      (ev.country && ev.country.toLowerCase().includes(query));

    const matchesTime =
      timeTab === 'all' ||
      (timeTab === 'upcoming' && ev.endDate >= todayStr) ||
      (timeTab === 'past' && ev.endDate < todayStr);

    const matchesFormat = formatFilter === 'all' || ev.format === formatFilter;
    const matchesRegion = regionFilter === 'all' || ev.region === regionFilter;

    return matchesQuery && matchesTime && matchesFormat && matchesRegion;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          <span>Industry Conferences, Technical Summits & Webinars</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {t.events.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          {t.events.subtitle}
        </p>
      </div>

      {/* Tabs & Search & Filters */}
      <div className="space-y-4">
        {/* Time Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          {(['upcoming', 'past', 'all'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTimeTab(tab)}
              className={`px-4 py-2.5 text-xs font-bold transition border-b-2 font-mono ${
                timeTab === tab
                  ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab === 'upcoming'
                ? t.events.upcomingTab
                : tab === 'past'
                ? t.events.pastTab
                : t.events.allTab}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.events.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg font-sans text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Format Filter */}
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none"
            >
              <option value="all">All Formats</option>
              <option value="conference">{t.events.formatConference}</option>
              <option value="meetup">{t.events.formatMeetup}</option>
              <option value="webinar">{t.events.formatWebinar}</option>
              <option value="workshop">{t.events.formatWorkshop}</option>
            </select>

            {/* Region Filter */}
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none"
            >
              <option value="all">{t.events.regionAll}</option>
              <option value="europe">{t.events.regionEurope}</option>
              <option value="north-america">{t.events.regionNorthAmerica}</option>
              <option value="asia-pacific">{t.events.regionAsiaPacific}</option>
              <option value="online">{t.events.regionOnline}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
          No matching automotive events found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      )}
    </div>
  );
};


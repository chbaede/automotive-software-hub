import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Cpu,
  Sparkles,
  ArrowRight,
  Filter,
  Search,
  Network,
  Compass,
  CheckCircle2,
  GitFork,
} from 'lucide-react';
import { architectureProfiles } from '../../data/architectureProfiles';
import { stackLayers } from '../../data/stackLayers';
import {
  ArchitectureProfile,
  ArchitectureProfileType,
  ARCHITECTURE_PROFILE_TYPE_METADATA,
} from '../../types/architecture';
import { StackLayerId } from '../../types/stack';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { technologyById } from '../../utils/graphIndexes';

const PROFILE_TYPES: ArchitectureProfileType[] = [
  'vehicle-architecture',
  'domain-architecture',
  'platform',
  'design-pattern',
  'reference-stack',
];

export const ArchitecturesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedType, setSelectedType] = useState<ArchitectureProfileType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = `${t.architectures.title} | Automotive Software Hub`;
  }, [t.architectures.title]);

  const getLayerName = (layerId: string) => {
    const layer = stackLayers.find((l) => l.id === layerId);
    return layer ? getLocalizedText(layer.name, language) : layerId;
  };

  const filteredProfiles = useMemo(() => {
    return architectureProfiles.filter((profile) => {
      // Filter by profile type
      if (selectedType !== 'all' && profile.profileType !== selectedType) {
        return false;
      }
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const name = getLocalizedText(profile.name, language).toLowerCase();
        const desc = getLocalizedText(profile.description, language).toLowerCase();
        const tags = (profile.tags || []).join(' ').toLowerCase();
        const topics = (profile.topics || []).join(' ').toLowerCase();

        return (
          name.includes(query) ||
          desc.includes(query) ||
          tags.includes(query) ||
          topics.includes(query)
        );
      }
      return true;
    });
  }, [selectedType, searchQuery, language]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-indigo-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'ko' ? '차량용 소프트웨어 아키텍처 탐색기' : 'Automotive Architecture Explorer'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.architectures.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.architectures.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>{architectureProfiles.length} {language === 'ko' ? '개 아키텍처 프로필' : 'Architecture Profiles'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>{stackLayers.length} {language === 'ko' ? '개 스택 계층' : 'Stack Layers'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Type Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedType === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.architectures.allTypes}
          </button>

          {PROFILE_TYPES.map((type) => {
            const meta = ARCHITECTURE_PROFILE_TYPE_METADATA[type];
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {getLocalizedText(meta.label, language)}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ko' ? '아키텍처 검색 (예: AAOS, ADAS, SDV)...' : 'Search architectures...'}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white shadow-2xs"
          />
        </div>
      </div>

      {/* Architecture Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProfiles.map((profile) => {
          const typeMeta = profile.profileType
            ? ARCHITECTURE_PROFILE_TYPE_METADATA[profile.profileType]
            : undefined;

          // Find distinct represented layers
          const layersInProfile = Array.from(
            new Set(
              profile.technologyIds
                .map((id) => technologyById.get(id)?.layerId)
                .filter((layerId): layerId is StackLayerId => Boolean(layerId))
            )
          );

          return (
            <div
              key={profile.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all hover:shadow-md group space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    {typeMeta && (
                      <span className="inline-block text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                        {getLocalizedText(typeMeta.label, language)}
                      </span>
                    )}
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {getLocalizedText(profile.name, language)}
                    </h2>
                  </div>

                  <span className="shrink-0 text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {profile.technologyIds.length} {language === 'ko' ? '개 기술' : 'Techs'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {getLocalizedText(profile.description, language)}
                </p>

                {/* Represented Stack Layers */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t.architectures.layersRepresented} ({layersInProfile.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {layersInProfile.map((layerId) => (
                      <span
                        key={layerId}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                      >
                        {getLayerName(layerId)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Topics / Tags */}
                {profile.tags && profile.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {profile.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {language === 'ko' ? '스택 계층별 구성 확인' : 'Explore Stack Composition'}
                </span>
                <Link
                  to={`/architectures/${profile.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition"
                >
                  <span>{t.architectures.viewArchitecture}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

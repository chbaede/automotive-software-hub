import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  Check,
  Globe,
  FileCode,
  Calendar,
  Layers,
  ShieldCheck,
  Building2,
  Code2,
  Wrench,
  BookOpen,
  Route,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Compass,
} from 'lucide-react';
import {
  getTechnology,
  getArchitecturesForTechnology,
  getStackPathsForTechnology,
  technologyById,
} from '../../utils/graphIndexes';
import { stackLayers } from '../../data/stackLayers';
import { tools } from '../../data/tools';
import { resources } from '../../data/resources';
import { projects } from '../../data/projects';
import { companies } from '../../data/companies';
import { events } from '../../data/events';
import { StackLadderVisualizer } from '../../components/stack/StackLadderVisualizer';
import {
  ARCHITECTURE_PROFILE_TYPE_METADATA,
  STACK_PATH_TYPE_METADATA,
} from '../../types/architecture';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import {
  getTechnologyDiscoveryResult,
  getExploreNextTechnologies,
  TechnologyInsightItem,
} from '../../lib/graph';
import { ExploreNextSection } from '../../components/discovery/ExploreNextSection';
import { RelationshipExplorerSection } from '../../components/discovery/RelationshipExplorerSection';

const DEFAULT_ARCH_LIMIT = 3;
const DEFAULT_PATH_LIMIT = 3;

const formatVerifiedDate = (isoDate: string, lang: 'en' | 'ko') => {
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
};

export const TechnologyDetailPage: React.FC = () => {
  const { technologyId } = useParams<{ technologyId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showAllArchs, setShowAllArchs] = useState(false);
  const [showAllPaths, setShowAllPaths] = useState(false);

  // Resolve canonical technology
  const technology = useMemo(() => {
    return technologyId ? getTechnology(technologyId) : undefined;
  }, [technologyId]);

  // Update Page Title and Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    if (technology) {
      document.title = `${technology.name} | Automotive Software Hub`;
    } else {
      document.title = `${t.techDetail.notFoundTitle} | Automotive Software Hub`;
    }
  }, [technology, t.techDetail.notFoundTitle]);

  // Authoritative Discovery Result (Directed Semantic Groups)
  const discoveryResult = useMemo(() => {
    return technology ? getTechnologyDiscoveryResult(technology.id) : null;
  }, [technology]);

  const architectures = useMemo(() => {
    return technology ? getArchitecturesForTechnology(technology.id) : [];
  }, [technology]);

  const stackPaths = useMemo(() => {
    return technology ? getStackPathsForTechnology(technology.id) : [];
  }, [technology]);

  // Collect all technology IDs already visible in Direct Relationships & Stack Path hops for Deduplication
  const displayedDiscoveryTechIds = useMemo(() => {
    if (!technology) return [];
    const set = new Set<string>();
    if (discoveryResult) {
      const addItems = (items: TechnologyInsightItem[]) => {
        items.forEach((item) => set.add(item.technology.id));
      };
      addItems(discoveryResult.dependencies);
      addItems(discoveryResult.dependents);
      addItems(discoveryResult.platforms);
      addItems(discoveryResult.hostedTechnologies);
      addItems(discoveryResult.integrations);
      addItems(discoveryResult.implementations);
      addItems(discoveryResult.alternatives);
      addItems(discoveryResult.compatibleWith);
      addItems(discoveryResult.usedWith);
      addItems(discoveryResult.coexistsWith);
      addItems(discoveryResult.related);
    }
    stackPaths.forEach((path) => {
      path.hops.forEach((hop) => set.add(hop.technologyId));
    });
    set.delete(technology.id);
    return Array.from(set);
  }, [technology, discoveryResult, stackPaths]);

  // Deduplicated Explore Next candidates (Primary Discovery Surface)
  const exploreNextRecommendations = useMemo(() => {
    if (!technology) return [];
    return getExploreNextTechnologies({
      technologyId: technology.id,
      alreadyDisplayedTechnologyIds: displayedDiscoveryTechIds,
      maxResults: 6,
    });
  }, [technology, displayedDiscoveryTechIds]);

  // Ecosystem linked objects
  const linkedTools = useMemo(() => {
    if (!technology?.toolIds) return [];
    return technology.toolIds
      .map((id) => tools.find((tool) => tool.id === id))
      .filter((tool): tool is (typeof tools)[0] => Boolean(tool));
  }, [technology]);

  const linkedResources = useMemo(() => {
    if (!technology?.resourceIds) return [];
    return technology.resourceIds
      .map((id) => resources.find((res) => res.id === id))
      .filter((res): res is (typeof resources)[0] => Boolean(res));
  }, [technology]);

  const linkedProjects = useMemo(() => {
    if (!technology?.openSourceProjectIds) return [];
    return technology.openSourceProjectIds
      .map((id) => projects.find((p) => p.id === id))
      .filter((p): p is (typeof projects)[0] => Boolean(p));
  }, [technology]);

  const linkedCompanies = useMemo(() => {
    if (!technology?.companyIds) return [];
    return technology.companyIds
      .map((id) => companies.find((c) => c.id === id))
      .filter((c): c is (typeof companies)[0] => Boolean(c));
  }, [technology]);

  const linkedEvents = useMemo(() => {
    if (!technology?.eventIds) return [];
    return technology.eventIds
      .map((id) => events.find((e) => e.id === id))
      .filter((e): e is (typeof events)[0] => Boolean(e));
  }, [technology]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Not Found State
  if (!technology) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.techDetail.notFoundTitle}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm">
            {t.techDetail.notFoundDesc}
            {technologyId && (
              <span className="block font-mono text-xs text-brand-600 dark:text-brand-400 mt-2 bg-slate-100 dark:bg-slate-900 py-1 px-2 rounded">
                ID: {technologyId}
              </span>
            )}
          </p>
        </div>
        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => navigate('/stack')}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.techDetail.backToStack}</span>
          </button>
        </div>
      </div>
    );
  }

  const layer = stackLayers.find((l) => l.id === technology.layerId);
  const layerName = layer ? getLocalizedText(layer.name, language) : technology.layerId;
  const description = getLocalizedText(technology.description, language);
  const whereDoesItFit = technology.whereDoesItFit
    ? getLocalizedText(technology.whereDoesItFit, language)
    : null;

  const visibleArchitectures = showAllArchs
    ? architectures
    : architectures.slice(0, DEFAULT_ARCH_LIMIT);
  const visibleStackPaths = showAllPaths
    ? stackPaths
    : stackPaths.slice(0, DEFAULT_PATH_LIMIT);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* 1. Breadcrumb Navigation & Action Buttons */}
      <nav className="flex items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2 min-w-0">
          <Link
            to="/stack"
            className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 font-medium transition shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.techDetail.backToStack}</span>
          </Link>
          <span>/</span>
          <span className="truncate text-slate-400">{layerName}</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-100 font-bold truncate">
            {technology.name}
          </span>
        </div>

        {/* Actions Row */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={`/stack-builder?${technology.layerId}=${technology.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition text-xs font-bold shadow-xs"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.techDetail.buildWithThisTech}</span>
          </Link>

          {/* Share Button */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition text-xs font-semibold shrink-0 shadow-2xs"
            title={t.techDetail.copyLink}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {t.techDetail.linkCopied}
                </span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.techDetail.copyLink}</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* 2. Overview Hero Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-3">
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Layer Badge */}
            <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30">
              {layerName}
            </span>

            {/* Functional Safety Badge */}
            {(technology.functionalSafety || technology.asilLevel) && (() => {
              const fs = technology.functionalSafety;
              const asil = fs?.asilLevel || technology.asilLevel;
              const claimType = fs?.claimType;

              let safetyText = asil || 'ISO 26262';
              if (claimType === 'certified' && asil) {
                safetyText = t.safety.certifiedBadge.replace('{asil}', asil);
              } else if (claimType === 'capable' && asil) {
                safetyText = t.safety.capableBadge.replace('{asil}', asil);
              } else if (claimType === 'supports' && asil) {
                safetyText = t.safety.supportsBadge.replace('{asil}', asil);
              } else if (claimType === 'compliant') {
                safetyText = t.safety.compliantBadge.replace('{asil}', asil || 'ISO 26262');
              } else if (claimType === 'suitable') {
                safetyText = t.safety.suitableBadge;
              }

              const isAsilD = asil === 'ASIL-D';

              return (
                <span
                  className={`px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider rounded-md border flex items-center gap-1 ${
                    isAsilD
                      ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{safetyText}</span>
                </span>
              );
            })()}

            {/* License Type Badge */}
            {technology.licenseType && (
              <span
                className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border ${
                  technology.licenseType === 'oss'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                }`}
              >
                {technology.licenseType === 'oss' ? 'OSS' : 'Commercial'}
              </span>
            )}

            {/* Status Badge */}
            {technology.status && (
              <span className="px-2.5 py-1 text-xs font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md font-semibold">
                {technology.status}
              </span>
            )}

            {/* Verified Date Badge */}
            {(technology.functionalSafety?.lastVerified || technology.lastVerified) && (() => {
              const verifiedDate = technology.functionalSafety?.lastVerified || technology.lastVerified;
              if (!verifiedDate) return null;
              const formatted = formatVerifiedDate(verifiedDate, language);
              return (
                <span className="px-2.5 py-1 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.trust.lastVerified.replace('{date}', formatted)}</span>
                </span>
              );
            })()}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {technology.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
            {description}
          </p>
        </div>

        {/* Tags and Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5">
            {technology.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {technology.website && (
              <a
                href={technology.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:underline"
              >
                <Globe className="w-4 h-4" />
                <span>{t.techDetail.officialWebsite}</span>
              </a>
            )}
            {technology.repositoryUrl && (
              <a
                href={technology.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 hover:underline"
              >
                <FileCode className="w-4 h-4" />
                <span>{t.techDetail.sourceRepository}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 3. Where Does It Fit? Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.techDetail.whereDoesItFit}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.techDetail.stackPositionDesc}
            </p>
          </div>
        </div>

        {whereDoesItFit && (
          <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed">
            {whereDoesItFit}
          </div>
        )}

        <StackLadderVisualizer
          currentLayerId={technology.layerId}
          techName={technology.name}
        />
      </div>

      {/* 4. Authoritative Direct Relationships Section (Compact & Scannable) */}
      {discoveryResult && (
        <RelationshipExplorerSection
          discoveryResult={discoveryResult}
        />
      )}

      {/* 5. Architectures & Representative Stack Paths Section */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Section Heading */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.techDetail.architecturesAndPaths}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'ko'
                    ? '이 기술이 통합 활용되는 참조 아키텍처 패턴 및 대표 실행 경로입니다.'
                    : 'Reference vehicle architecture patterns and representative software stack execution journeys.'}
                </p>
              </div>
            </div>

            <Link
              to="/architectures"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
            >
              <span>{t.stackBuilder.allArchitectures}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* Column A: Reference Architectures */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{t.techDetail.architectureContext}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    {architectures.length}
                  </span>
                </h3>

                {architectures.length > DEFAULT_ARCH_LIMIT && (
                  <button
                    onClick={() => setShowAllArchs((prev) => !prev)}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>
                      {showAllArchs
                        ? t.techDetail.showLess
                        : t.techDetail.viewAllCount.replace('{count}', String(architectures.length))}
                    </span>
                    {showAllArchs ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>

              {visibleArchitectures.length > 0 ? (
                <div className="space-y-3">
                  {visibleArchitectures.map((profile) => {
                    const profileTitle = getLocalizedText(profile.name, language);
                    const profileDesc = getLocalizedText(profile.description, language);
                    const typeMeta = profile.profileType
                      ? ARCHITECTURE_PROFILE_TYPE_METADATA[profile.profileType]
                      : undefined;
                    const typeName = typeMeta ? getLocalizedText(typeMeta.label, language) : profile.profileType;

                    return (
                      <div
                        key={profile.id}
                        className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            {typeName && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                {typeName}
                              </span>
                            )}
                            <span className="text-xs font-mono text-slate-500">
                              {t.architectures.technologiesCount.replace('{count}', String(profile.technologyIds.length))}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {profileTitle}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {profileDesc}
                          </p>
                        </div>

                        <div className="flex justify-end pt-1">
                          <Link
                            to={`/architectures/${profile.id}`}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <span>{t.techDetail.viewFullArchitecture}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
                  {t.techDetail.noArchitectures}
                </div>
              )}
            </div>

            {/* Column B: Representative Stack Paths */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{t.techDetail.stackPaths}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                    {stackPaths.length}
                  </span>
                </h3>

                {stackPaths.length > DEFAULT_PATH_LIMIT && (
                  <button
                    onClick={() => setShowAllPaths((prev) => !prev)}
                    className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>
                      {showAllPaths
                        ? t.techDetail.showLess
                        : t.techDetail.viewAllCount.replace('{count}', String(stackPaths.length))}
                    </span>
                    {showAllPaths ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>

              {visibleStackPaths.length > 0 ? (
                <div className="space-y-3">
                  {visibleStackPaths.map((path) => {
                    const pathTitle = getLocalizedText(path.name, language);
                    const typeMeta = path.pathType ? STACK_PATH_TYPE_METADATA[path.pathType] : undefined;
                    const typeName = typeMeta ? getLocalizedText(typeMeta.label, language) : path.pathType;

                    return (
                      <div
                        key={path.id}
                        className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {typeName && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                {typeName}
                              </span>
                            )}
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                              {pathTitle}
                            </h4>
                          </div>
                          <span className="text-xs font-mono text-slate-500 shrink-0">
                            {t.techDetail.hopsCount.replace('{count}', String(path.hops.length))}
                          </span>
                        </div>

                        {/* Flow Steps / Hops */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
                          {path.hops.map((hop, hIdx) => {
                            const hopTech = technologyById.get(hop.technologyId);
                            const isCurrent = hop.technologyId === technology.id;
                            const hopName = hopTech ? hopTech.name : hop.technologyId;

                            return (
                              <React.Fragment key={`${path.id}-hop-${hIdx}`}>
                                <Link
                                  to={`/stack/${hop.technologyId}`}
                                  className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border ${
                                    isCurrent
                                      ? 'bg-brand-600 text-white border-brand-500 shadow-xs font-bold'
                                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-brand-500/50'
                                  }`}
                                >
                                  <span>{hopName}</span>
                                  {isCurrent && (
                                    <span className="text-[8px] px-1 py-0.2 rounded bg-white/25 text-white font-mono uppercase font-bold">
                                      {t.techDetail.currentHop}
                                    </span>
                                  )}
                                </Link>
                                {hIdx < path.hops.length - 1 && (
                                  <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
                  {t.techDetail.noStackPaths}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Explore Next (Main Discovery Surface — Deduplicated) */}
      <ExploreNextSection
        currentTech={technology}
        recommendations={exploreNextRecommendations}
      />

      {/* 7. Connected Ecosystem (Tools, Resources, Companies, Projects, Events) */}
      {(linkedCompanies.length > 0 ||
        linkedProjects.length > 0 ||
        linkedTools.length > 0 ||
        linkedResources.length > 0 ||
        linkedEvents.length > 0) && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.techDetail.ecosystem}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {language === 'ko'
                  ? '이 기술과 관련된 기업, 오픈소스 프로젝트, 개발 도구, 기술 자료 및 행사입니다.'
                  : 'Vendors, open-source projects, tools, technical resources, and industry events tied to this technology.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Associated Companies */}
            {linkedCompanies.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <Building2 className="w-4 h-4 text-brand-500" />
                  <span>{t.techDetail.companies} ({linkedCompanies.length})</span>
                </div>
                <div className="space-y-2">
                  {linkedCompanies.map((company) => {
                    const companyWebsite = typeof company.website === 'string'
                      ? company.website
                      : getLocalizedText(company.website, language);
                    return (
                      <div
                        key={company.id}
                        className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {company.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {company.category} • {company.headquarters}
                          </div>
                        </div>
                        {companyWebsite && (
                          <a
                            href={companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 p-1"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Open Source Projects */}
            {linkedProjects.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <Code2 className="w-4 h-4 text-indigo-500" />
                  <span>{t.techDetail.openSourceProjects} ({linkedProjects.length})</span>
                </div>
                <div className="space-y-2">
                  {linkedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {project.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {project.license} • {project.organization}
                        </div>
                      </div>
                      {project.repository && (
                        <a
                          href={project.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 p-1"
                        >
                          <FileCode className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Developer Tools */}
            {linkedTools.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <Wrench className="w-4 h-4 text-cyan-500" />
                  <span>{t.techDetail.tools} ({linkedTools.length})</span>
                </div>
                <div className="space-y-2">
                  {linkedTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {getLocalizedText(tool.name, language)}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {tool.category}
                        </div>
                      </div>
                      <button
                        onClick={() => navigate('/tools')}
                        className="text-xs text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
                      >
                        {t.techDetail.launchTool}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources & Specs */}
            {linkedResources.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <span>{t.techDetail.documentation} ({linkedResources.length})</span>
                </div>
                <div className="space-y-2">
                  {linkedResources.map((res) => {
                    const resourceName = typeof res.name === 'string'
                      ? res.name
                      : getLocalizedText(res.name, language);
                    return (
                      <div
                        key={res.id}
                        className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {resourceName}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {res.category} • {res.source}
                          </div>
                        </div>
                        {res.url && (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 p-1"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Relevant Industry Events */}
            {linkedEvents.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-rose-500" />
                  <span>{t.techDetail.events} ({linkedEvents.length})</span>
                </div>
                <div className="space-y-2">
                  {linkedEvents.map((evt) => {
                    const evtName = typeof evt.name === 'string'
                      ? evt.name
                      : getLocalizedText(evt.name, language);
                    const location = [evt.city, evt.country].filter(Boolean).join(', ') || evt.region;
                    return (
                      <div
                        key={evt.id}
                        className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {evtName}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {evt.startDate} • {location}
                          </div>
                        </div>
                        {evt.url && (
                          <a
                            href={evt.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 p-1"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

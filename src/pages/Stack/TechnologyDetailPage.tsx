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
  Network,
  Zap,
  GitFork,
  ShieldCheck,
  Building2,
  Code2,
  Wrench,
  BookOpen,
  Route,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  AlertCircle,
  Cpu,
} from 'lucide-react';
import {
  getTechnology,
  getTechnologyGraphContext,
  getArchitecturesForTechnology,
  getStackPathsForTechnology,
  getNeighbors,
  technologyById,
} from '../../utils/graphIndexes';
import { stackLayers } from '../../data/stackLayers';
import { tools } from '../../data/tools';
import { resources } from '../../data/resources';
import { projects } from '../../data/projects';
import { companies } from '../../data/companies';
import { events } from '../../data/events';
import { TechRelationshipTree } from '../../components/stack/TechRelationshipTree';
import {
  ARCHITECTURE_PROFILE_TYPE_METADATA,
  STACK_PATH_TYPE_METADATA,
} from '../../types/architecture';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

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

  // Graph context & neighbors
  const graphContext = useMemo(() => {
    return technology ? getTechnologyGraphContext(technology.id) : null;
  }, [technology]);

  const directNeighbors = useMemo(() => {
    return technology ? getNeighbors(technology.id) : [];
  }, [technology]);

  const architectures = useMemo(() => {
    return technology ? getArchitecturesForTechnology(technology.id) : [];
  }, [technology]);

  const stackPaths = useMemo(() => {
    return technology ? getStackPathsForTechnology(technology.id) : [];
  }, [technology]);

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

  // 1. Not Found State
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
  const isCoreLayer = layer?.layerType === 'core';
  const description = getLocalizedText(technology.description, language);
  const whereDoesItFit = getLocalizedText(technology.whereDoesItFit, language);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Top Bar: Navigation Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
            {t.nav.home}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link to="/stack" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
            {t.nav.stackExplorer}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[150px]">
            {layerName}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-brand-600 dark:text-brand-400 font-bold truncate">
            {technology.name}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/stack')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.techDetail.backToStack}</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 border border-brand-500/30 text-xs font-semibold transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? t.techDetail.linkCopied : t.techDetail.copyLink}</span>
          </button>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-3">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Layer Badge */}
            <span
              className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border flex items-center gap-1.5 ${
                isCoreLayer
                  ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{layerName}</span>
              <span className="text-[10px] font-normal opacity-80 font-mono">
                ({isCoreLayer ? (language === 'ko' ? '코어' : 'Core') : (language === 'ko' ? '공통 영역' : 'Cross-cutting')})
              </span>
            </span>

            {/* Functional Safety Badge */}
            {(technology.functionalSafety || technology.asilLevel) && (() => {
              const fs = technology.functionalSafety;
              const asil = fs?.asilLevel || technology.asilLevel;
              const claimType = fs?.claimType;

              let safetyText = asil || 'ISO 26262';
              if (claimType === 'certified' && asil) {
                safetyText = `${asil} Certified`;
              } else if (claimType === 'capable' && asil) {
                safetyText = `${asil} Capable`;
              } else if (claimType === 'supports' && asil) {
                safetyText = `Supports ${asil}`;
              } else if (claimType === 'compliant') {
                safetyText = `${asil || 'ISO 26262'} Compliant`;
              } else if (claimType === 'suitable') {
                safetyText = `ISO 26262 Standard`;
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

            {/* Status Badge */}
            {technology.status && (
              <span className="px-2.5 py-1 text-xs font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md font-semibold">
                {technology.status}
              </span>
            )}

            {/* Hub Badge */}
            {graphContext?.isHub && (
              <span className="px-2.5 py-1 text-xs font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-md flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                <span>{language === 'ko' ? '핵심 허브' : 'Hub'}</span>
              </span>
            )}

            {/* Cross Layer Badge */}
            {graphContext?.isCrossLayer && (
              <span className="px-2.5 py-1 text-xs font-bold uppercase bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 rounded-md flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" />
                <span>{language === 'ko' ? '크로스 레이어' : 'Cross-Layer'}</span>
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

        {/* Tags and Quick Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Tags */}
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

          {/* External Links */}
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
                <ExternalLink className="w-3 h-3" />
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
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Graph Intelligence Context Bar */}
      {graphContext && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Network className="w-5 h-5" />
              <span>{t.techDetail.knowledgeGraphContext}</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Canonical Source: <span className="text-slate-200 font-bold">stackRelationships</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">{t.techDetail.connectedTechs}</div>
              <div className="text-2xl font-bold text-cyan-400 mt-1">{graphContext.connectionCount}</div>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">{t.techDetail.relationshipRecords}</div>
              <div className="text-2xl font-bold text-indigo-400 mt-1">{graphContext.relationshipCount}</div>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">{t.techDetail.connectedLayers}</div>
              <div className="text-2xl font-bold text-purple-400 mt-1">{graphContext.connectedLayersCount}</div>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">{t.stack.architectureProfilesBelongsTo}</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{architectures.length}</div>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">{t.techDetail.stackPaths}</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">{stackPaths.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Where Does It Fit Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.techDetail.whereDoesItFit}
          </h2>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {layerName} ({isCoreLayer ? t.techDetail.coreType : t.techDetail.crossCuttingType})
            </span>
            {layer && (
              <span className="font-mono text-slate-500">
                Layer {layer.order} of {stackLayers.length}
              </span>
            )}
          </div>
          {layer && (
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {getLocalizedText(layer.description, language)}
            </p>
          )}
        </div>

        <div className="pt-2 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
          {whereDoesItFit}
        </div>
      </div>

      {/* Semantic Knowledge Graph Relationships Tree */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.techDetail.relationships}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {language === 'ko'
                  ? '연결된 기술을 클릭하면 해당 기술의 상세 지식 그래프 페이지로 즉시 이동합니다.'
                  : 'Click any connected technology node to navigate directly to its dedicated detail page.'}
              </p>
            </div>
          </div>
        </div>

        {/* Tree Component (Deep linked via navigate) */}
        <TechRelationshipTree
          technology={technology}
          onSelectTech={(selected) => navigate(`/stack/${selected.id}`)}
        />
      </div>

      {/* Architecture Context Section (if any) */}
      {architectures.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.techDetail.architectureContext}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {language === 'ko'
                  ? '이 기술이 핵심 컴포넌트로 활용되는 참조 오토모티브 아키텍처 패턴입니다.'
                  : 'Reference vehicle architecture patterns where this technology is a core component.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {architectures.map((profile) => {
              const profileTitle = getLocalizedText(profile.name, language);
              const profileDesc = getLocalizedText(profile.description, language);
              const typeMeta = profile.profileType
                ? ARCHITECTURE_PROFILE_TYPE_METADATA[profile.profileType]
                : undefined;
              const typeName = typeMeta ? getLocalizedText(typeMeta.label, language) : profile.profileType;

              // Companion technologies in this profile
              const companionTechs = profile.technologyIds
                .filter((id) => id !== technology.id)
                .map((id) => technologyById.get(id))
                .filter((t): t is typeof technology => Boolean(t));

              return (
                <div
                  key={profile.id}
                  className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      {typeName && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          {typeName}
                        </span>
                      )}
                      <span className="text-xs font-mono text-slate-500">
                        {profile.technologyIds.length} Techs
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {profileTitle}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {profileDesc}
                    </p>
                  </div>

                  {companionTechs.length > 0 && (
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        {t.techDetail.companionTechs}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {companionTechs.slice(0, 5).map((comp) => (
                          <button
                            key={comp.id}
                            onClick={() => navigate(`/stack/${comp.id}`)}
                            className="px-2 py-0.5 text-xs font-medium bg-white dark:bg-slate-900 hover:bg-brand-500/10 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 rounded border border-slate-200 dark:border-slate-800 transition truncate max-w-[150px]"
                          >
                            {comp.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Representative Stack Paths Section (if any) */}
      {stackPaths.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Route className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.techDetail.stackPaths}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {language === 'ko'
                  ? '이 기술이 포함된 엔드-투-엔드 차량 양산 및 참조 소프트웨어 스택 경로입니다.'
                  : 'End-to-end production software execution journeys containing this technology.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {stackPaths.map((path) => {
              const pathTitle = getLocalizedText(path.name, language);
              const pathDesc = getLocalizedText(path.description, language);
              const typeMeta = path.pathType ? STACK_PATH_TYPE_METADATA[path.pathType] : undefined;
              const typeName = typeMeta ? getLocalizedText(typeMeta.label, language) : path.pathType;

              return (
                <div
                  key={path.id}
                  className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                          {typeName}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {pathTitle}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {pathDesc}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-500 shrink-0">
                      {path.hops.length} Hops
                    </span>
                  </div>

                  {/* Flow Steps */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                    {path.hops.map((hop, hIdx) => {
                      const hopTech = technologyById.get(hop.technologyId);
                      const isCurrent = hop.technologyId === technology.id;
                      const hopName = hopTech ? hopTech.name : hop.technologyId;

                      return (
                        <React.Fragment key={`${path.id}-hop-${hIdx}`}>
                          <button
                            onClick={() => navigate(`/stack/${hop.technologyId}`)}
                            className={`shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                              isCurrent
                                ? 'bg-brand-600 text-white border-brand-500 shadow-md ring-2 ring-brand-500/30'
                                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-brand-500/50'
                            }`}
                          >
                            <span>{hopName}</span>
                            {isCurrent && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/20 text-white font-mono">
                                Current
                              </span>
                            )}
                          </button>
                          {hIdx < path.hops.length - 1 && (
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Connected Ecosystem Sections (Conditional Rendering) */}
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
                  ? '이 기술과 관련된 오픈소스 프로젝트, 기업, 개발 도구 및 기술 자료입니다.'
                  : 'Open-source projects, vendors, tools, and technical resources tied to this technology.'}
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
                            <ExternalLink className="w-3.5 h-3.5" />
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
                          <ExternalLink className="w-3.5 h-3.5" />
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
                        Launch
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
                            <ExternalLink className="w-3.5 h-3.5" />
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

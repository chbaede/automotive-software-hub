import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Layers,
  Compass,
  Sparkles,
  ExternalLink,
  Route,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Wrench,
} from 'lucide-react';
import { profileById, technologyById } from '../../utils/graphIndexes';
import { stackLayers } from '../../data/stackLayers';
import { stackPaths } from '../../data/stackPaths';
import { StackTechnology, StackLayer } from '../../types/stack';
import {
  ARCHITECTURE_PROFILE_TYPE_METADATA,
  STACK_PATH_TYPE_METADATA,
} from '../../types/architecture';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

export const ArchitectureDetailPage: React.FC = () => {
  const { architectureId } = useParams<{ architectureId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const profile = useMemo(() => {
    return architectureId ? profileById.get(architectureId) : undefined;
  }, [architectureId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (profile) {
      document.title = `${getLocalizedText(profile.name, language)} | Automotive Software Hub`;
    } else {
      document.title = `${t.architectures.notFoundTitle} | Automotive Software Hub`;
    }
  }, [profile, language, t.architectures.notFoundTitle]);

  const typeMeta = profile?.profileType
    ? ARCHITECTURE_PROFILE_TYPE_METADATA[profile.profileType]
    : undefined;

  // Resolve all technologies in this profile
  const technologies = useMemo(() => {
    if (!profile) return [];
    return profile.technologyIds
      .map((id) => technologyById.get(id))
      .filter((tech): tech is StackTechnology => Boolean(tech));
  }, [profile]);

  // Group technologies by Stack Layer in canonical stack layer order
  const layerGroups = useMemo(() => {
    if (!profile) return [];

    const techByLayer = new Map<string, StackTechnology[]>();
    technologies.forEach((tech) => {
      const list = techByLayer.get(tech.layerId) || [];
      list.push(tech);
      techByLayer.set(tech.layerId, list);
    });

    return stackLayers
      .map((layer) => ({
        layer,
        technologies: techByLayer.get(layer.id) || [],
      }))
      .filter((group) => group.technologies.length > 0)
      .sort((a, b) => (b.layer.order ?? 0) - (a.layer.order ?? 0)); // Top layer to bottom layer
  }, [profile, technologies]);

  // Find relevant Stack Paths associated with this architecture's technologies
  const relevantPaths = useMemo(() => {
    if (!profile) return [];
    const techSet = new Set(profile.technologyIds);
    return stackPaths.filter((path) =>
      path.hops.some((hop) => techSet.has(hop.technologyId))
    );
  }, [profile]);

  // 1. Not Found State
  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.architectures.notFoundTitle}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm">
            {t.architectures.notFoundDesc}
            {architectureId && (
              <span className="block font-mono text-xs text-indigo-600 dark:text-indigo-400 mt-2 bg-slate-100 dark:bg-slate-900 py-1 px-2 rounded">
                ID: {architectureId}
              </span>
            )}
          </p>
        </div>
        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => navigate('/architectures')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.architectures.backToArchitectures}</span>
          </button>
        </div>
      </div>
    );
  }

  const profileName = getLocalizedText(profile.name, language);
  const profileDesc = getLocalizedText(profile.description, language);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link
          to="/architectures"
          className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-medium transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.architectures.backToArchitectures}</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-slate-100 font-bold truncate">
          {profileName}
        </span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-indigo-800/40 space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            {typeMeta && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                <Compass className="w-3.5 h-3.5" />
                <span>{getLocalizedText(typeMeta.label, language)}</span>
              </span>
            )}
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
              {technologies.length} {language === 'ko' ? '개 통합 기술' : 'Integrated Technologies'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {profileName}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {profileDesc}
          </p>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {(() => {
              const params = new URLSearchParams();
              technologies.forEach((tech) => {
                if (!params.has(tech.layerId)) {
                  params.set(tech.layerId, tech.id);
                }
              });
              return (
                <Link
                  to={`/stack-builder?${params.toString()}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>{t.techDetail.buildWithThisTech}</span>
                </Link>
              );
            })()}
          </div>

          {/* Tags */}
          {profile.tags && profile.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {profile.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Stack Layers & Technologies Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.architectures.techComposition}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {layerGroups.length} {language === 'ko' ? '개 스택 계층 매핑' : 'Layers Mapped'}
          </span>
        </div>

        <div className="space-y-6">
          {layerGroups.map(({ layer, technologies: layerTechs }) => {
            const layerName = getLocalizedText(layer.name, language);
            const isCore = layer.layerType === 'core';

            return (
              <div
                key={layer.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xs"
              >
                {/* Layer Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold flex items-center justify-center border border-indigo-500/20">
                      {layer.order}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{layerName}</span>
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                            isCore
                              ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300'
                              : 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
                          }`}
                        >
                          {isCore ? t.architectures.coreLayer : t.architectures.crossCuttingLayer}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {getLocalizedText(layer.description, language)}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-500">
                    {layerTechs.length} {language === 'ko' ? '개 기술' : 'techs'}
                  </span>
                </div>

                {/* Technology Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {layerTechs.map((tech) => {
                    const techDesc = getLocalizedText(tech.description, language);
                    return (
                      <Link
                        key={tech.id}
                        to={`/stack/${tech.id}`}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 bg-slate-50/60 dark:bg-slate-950/60 hover:bg-white dark:hover:bg-slate-900 transition-all group flex flex-col justify-between space-y-2 shadow-2xs hover:shadow-xs"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {tech.name}
                            </span>
                            <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                            {techDesc}
                          </p>
                        </div>

                        {/* Safety / Platform Tag */}
                        {tech.functionalSafety && (
                          <div className="pt-1">
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 font-bold">
                              {tech.functionalSafety.asilLevel || 'ISO 26262'}
                            </span>
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Relevant Representative Stack Paths */}
      {relevantPaths.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Route className="w-5 h-5 text-indigo-500" />
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.architectures.stackPathsHeader}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.architectures.stackPathsDesc}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {relevantPaths.length} {language === 'ko' ? '개 스택 경로' : 'Stack Paths'}
            </span>
          </div>

          <div className="space-y-3">
            {relevantPaths.map((path) => {
              const pathName = getLocalizedText(path.name, language);
              const pathDesc = getLocalizedText(path.description, language);
              const pathTypeMeta = path.pathType
                ? STACK_PATH_TYPE_METADATA[path.pathType]
                : undefined;

              return (
                <div
                  key={path.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {pathName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{pathDesc}</p>
                    </div>
                    {pathTypeMeta && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                        {getLocalizedText(pathTypeMeta.label, language)}
                      </span>
                    )}
                  </div>

                  {/* Hops Row */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {path.hops.map((hop, idx) => {
                      const hopTech = technologyById.get(hop.technologyId);
                      return (
                        <React.Fragment key={idx}>
                          {idx > 0 && (
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                          {hopTech ? (
                            <Link
                              to={`/stack/${hopTech.id}`}
                              className="text-xs font-bold px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                            >
                              {hopTech.name}
                            </Link>
                          ) : (
                            <span className="text-xs px-2 py-1 rounded bg-slate-200 text-slate-600 font-mono">
                              {hop.technologyId}
                            </span>
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
    </div>
  );
};

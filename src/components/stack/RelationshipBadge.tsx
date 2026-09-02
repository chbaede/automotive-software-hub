import React from 'react';
import { RelationshipType, RelationshipConfidence } from '../../types/relationship';
import { useLanguage } from '../../i18n/LanguageContext';

interface RelationshipBadgeProps {
  type: RelationshipType;
  confidence?: RelationshipConfidence;
  className?: string;
}

export const RelationshipBadge: React.FC<RelationshipBadgeProps> = ({
  type,
  confidence,
  className = '',
}) => {
  const { t } = useLanguage();

  const getStyle = (relType: RelationshipType) => {
    switch (relType) {
      case 'depends-on':
        return {
          label: t.relationships.dependsOn,
          classes: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/40',
        };
      case 'runs-on':
        return {
          label: t.relationships.runsOn,
          classes: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-400/40',
        };
      case 'implemented-by':
        return {
          label: t.relationships.implementedBy,
          classes: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-400/40',
        };
      case 'integrates-with':
        return {
          label: t.relationships.integratesWith,
          classes: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-400/40',
        };
      case 'coexists-with':
        return {
          label: t.relationships.coexistsWith,
          classes: 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-400/40',
        };
      case 'compatible-with':
        return {
          label: t.relationships.compatibleWith,
          classes: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-400/40',
        };
      case 'used-with':
        return {
          label: t.relationships.usedWith,
          classes: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/40',
        };
      case 'alternative':
        return {
          label: t.relationships.alternative,
          classes: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-400/40',
        };
      case 'related':
      default:
        return {
          label: t.relationships.related,
          classes: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-400/40',
        };
    }
  };

  const style = getStyle(type);

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded border ${style.classes} ${className}`}
    >
      {style.label}
    </span>
  );
};

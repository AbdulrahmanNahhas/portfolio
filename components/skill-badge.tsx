import { StarIcon } from "@phosphor-icons/react";

type SkillLevel =
  | 'Native'
  | 'Advanced'
  | 'Proficient'
  | 'Working Knowledge'
  | 'Intermediate'
  | 'Learning'
  | 'Beginner'
  | 'Planned'
  | 'Planned';

interface SkillBadgeProps {
  name: string;
  level?: SkillLevel;
  featured?: boolean;       // ← new: for starred/priority skills
  compact?: boolean;        // ← optional compact style
  className?: string;
}

export const SkillBadge = ({
  name,
  level,
  featured = false,
  compact = false,
  className = '',
}: SkillBadgeProps) => {
  // Map levels to style variants
  const getLevelStyles = () => {
    if (!level) return 'border-border/40 bg-muted/20 text-muted-foreground/90';

    switch (level) {
      case 'Native':
      case 'Advanced':
      case 'Proficient':
        return 'border-border bg-accent dark:bg-accent/10 text-primary font-medium';
      case 'Working Knowledge':
      case 'Intermediate':
        return 'border-sky-500/40 bg-sky-500/5 text-sky-700 dark:text-sky-300';
      case 'Learning':
      case 'Beginner':
        return 'border-purple-400/30 bg-purple-500/5 text-purple-600 dark:text-purple-300';
      case 'Planned':
      case 'Planned':
        return 'border-dashed border-border bg-muted/10 text-muted-foreground/70 italic';
      default:
        return 'border-border/40 bg-muted/20 text-muted-foreground/90';
    }
  };

  const levelStyle = getLevelStyles();

  // Featured / starred style override
  const featuredStyle = featured
    ? 'border-amber-500/60 bg-amber-500/10'
    : '';

  if (compact) {
    return (
      <div
        title={`${name} — ${level || 'Skill'}`}
        className={`
          inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
          border ${levelStyle} ${featuredStyle} ${className}
          transition-all hover:scale-[1.02] hover:shadow-sm
        `}
      >
        {featured && <StarIcon size={12} className="fill-amber-500 text-amber-500" />}
        <span>{name}</span>
        {level && <span className="opacity-70">• {level}</span>}
      </div>
    );
  }

  // Default card-like style
  return (
    <div
      title={`${name} — ${level || 'Skill'}`}
      className={`
        group relative flex flex-col gap-1 p-2.5 sm:p-3
        border rounded-lg transition-all duration-200
        hover:shadow-inner hover:translate-y-0.5
        ${levelStyle} ${featuredStyle} ${className}
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium leading-tight text-foreground">
          {name}
        </span>
        {featured && (
          <StarIcon
            size={14}
            className="shrink-0 fill-current! text-amber-500 opacity-90 group-hover:opacity-100"
          />
        )}
      </div>

      {level && (
        <span
          className={`
            text-[10px] sm:text-xs uppercase tracking-wide font-medium
            ${level.includes('Planned') || level.includes('Planned')
              ? 'italic opacity-75'
              : 'opacity-80'}
          `}
        >
          {level}
        </span>
      )}
    </div>
  );
};

export interface NavItem {
  label: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  subItems?: NavSubItem[];
}

export interface NavSubItem {
  label: string;
  href: string;
  icon?: string; // Icon name that maps to lucide-react icons
  disabled?: boolean;
  external?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Social link icons as separate components
const GitLabIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fill="currentColor"
      d="m18.73 5.41l-1.28 1L12 10.46L6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64"
    />
  </svg>
);

export const socialLinks: SocialLink[] = [
  {
    label: "GitLab",
    href: "https://gitlab.com/abdulrahmannahhas",
    icon: GitLabIcon,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/abdulrahmannahhas",
    icon: TwitterIcon,
  },
  {
    label: "Email",
    href: "mailto:abdulrahmannahhas@gmail.com",
    icon: EmailIcon,
  },
];

export const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  {
    label: "More",
    href: "/more",
    subItems: [
      {
        label: "Learning & Skills",
        href: "/learning",
        icon: "BookOpen",
        disabled: true,
      },
      {
        label: "Tools I Use",
        href: "/tools",
        icon: "Wrench",
        disabled: false,
      },
      {
        label: "CV / Resume",
        href: "/cv",
        icon: "FileText",
        disabled: true,
      },
      {
        label: "Contact Me",
        href: "mailto:abdulrahmannahhas@gmail.com",
        icon: "Mail",
        external: true,
        disabled: true,
      },
    ],
  },
];

export const getActiveHref = (pathname: string): string => {
  if (pathname === "/") return "/";
  if (pathname === "/work") return "/work";
  if (pathname === "/projects") return "/projects";
  if (pathname === "/tools") return "/tools";
  if (pathname === "/more") return "/more";
  if (pathname.startsWith("/projects/")) return "/projects";
  if (pathname.startsWith("/work/")) return "/work";
  if (pathname.startsWith("/tools/")) return "/tools";
  if (pathname.startsWith("/more/")) return "/more";
  return "/";
};

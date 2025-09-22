# Header Components

This directory contains the refactored header components that are now modular and easy to maintain.

## Structure

- `LogoDropdown.tsx` - Social media links dropdown
- `MoreDropdown.tsx` - More menu dropdown with sub-items
- `NavPill.tsx` - Individual navigation pill component
- `DesktopNavigation.tsx` - Desktop navigation container
- `MobileHamburger.tsx` - Mobile hamburger menu button
- `MobileBackdrop.tsx` - Mobile menu backdrop
- `MobileMenu.tsx` - Mobile navigation menu

## Configuration

Navigation items are configured in `/lib/navigation.ts`. This makes it very easy to:

### Add new navigation items
```typescript
export const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { 
    label: "New Page", 
    href: "/new-page",
    disabled: true // Shows "Coming Soon" state
  },
  {
    label: "More",
    href: "/more",
    subItems: [
      {
        label: "New Sub Item",
        href: "/new-sub-item",
        icon: "BookOpen", // Optional icon
        disabled: false,
        external: false
      }
    ]
  }
];
```

### Disable links (Coming Soon)
Simply set `disabled: true` on any navigation item or sub-item.

### Add social links
Update the `socialLinks` array in `/lib/navigation.ts`:

```typescript
export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/username",
    icon: ({ className }) => <GitHubIcon className={className} />
  }
];
```

## Benefits

1. **Easy to edit** - All navigation items are in one configuration file
2. **Type safe** - Full TypeScript support with proper interfaces
3. **Modular** - Each component has a single responsibility
4. **Maintainable** - Clean separation of concerns
5. **Reusable** - Components can be used independently
6. **Accessible** - Proper ARIA labels and keyboard navigation
7. **Responsive** - Works seamlessly on desktop and mobile

## Usage

The main header component automatically uses the configuration from `/lib/navigation.ts`. No additional setup required.

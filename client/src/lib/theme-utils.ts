// Theme-aware utility classes for consistent light/dark mode contrast

export const themeClasses = {
  // Text colors with proper contrast
  text: {
    primary: 'text-slate-900 dark:text-white',
    secondary: 'text-slate-700 dark:text-slate-300',
    muted: 'text-slate-600 dark:text-slate-400',
    accent: 'text-primary dark:text-primary-light',
  },
  
  // Background colors
  background: {
    card: 'bg-white dark:bg-slate-800',
    cardHover: 'hover:bg-slate-50 dark:hover:bg-slate-700',
    subtle: 'bg-slate-50 dark:bg-slate-900',
    accent: 'bg-primary/10 dark:bg-primary/20',
  },
  
  // Border colors
  border: {
    default: 'border-slate-200 dark:border-slate-700',
    accent: 'border-primary/30 dark:border-primary/50',
    hover: 'hover:border-primary/50 dark:hover:border-primary/70',
  },
  
  // Badge variants with proper contrast
  badge: {
    blue: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-800',
    green: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-800',
    purple: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-800',
    orange: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/50 dark:text-orange-200 dark:border-orange-800',
    red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800',
    gray: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/50 dark:text-gray-200 dark:border-gray-800',
  },
  
  // Button variants
  button: {
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800',
    outline: 'border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800',
  },
  
  // Shadow utilities
  shadow: {
    card: 'shadow-sm hover:shadow-md dark:shadow-none',
    cardHover: 'shadow-lg dark:shadow-none',
  }
};

// Utility function to combine theme classes
export const getThemeClasses = (...classes: string[]) => {
  return classes.join(' ');
};

// Badge color variants
export const badgeVariants = [
  'blue', 'green', 'purple', 'orange', 'red', 'gray'
] as const;

export type BadgeVariant = typeof badgeVariants[number];

// Get a badge variant class by index (useful for cycling through colors)
export const getBadgeVariantByIndex = (index: number): BadgeVariant => {
  return badgeVariants[index % badgeVariants.length];
};

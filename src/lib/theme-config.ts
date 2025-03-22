/**
 * Portfolio theme configuration
 * Using a professional modern teal/slate color palette
 */

export const themeColors = {
  // Main color palette - Modern Teal
  primary: 'hsl(192, 91%, 36%)', // Deep Teal (#0891B2)
  primaryLight: 'hsl(192, 91%, 46%)',
  primaryDark: 'hsl(192, 91%, 30%)',
  
  // Accent colors (slate blue)
  accent: 'hsl(217, 33%, 27%)', // Slate Blue (#334155)
  accentLight: 'hsl(217, 33%, 37%)',
  accentDark: 'hsl(217, 33%, 17%)',
  
  // Gradient definitions
  gradientPrimary: 'linear-gradient(to right, hsl(192, 91%, 36%), hsl(192, 70%, 46%))',
  gradientAccent: 'linear-gradient(to right, hsl(217, 33%, 27%), hsl(192, 91%, 36%))',
  
  // Special UI effects
  glow: 'hsla(192, 91%, 36%, 0.5)',
  backdrop: 'hsla(217, 33%, 27%, 0.1)'
}

// Export standardized styles for common components
export const standardStyles = {
  sectionTitle: "text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent",
  sectionDivider: "w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full",
  cardGlow: "before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px] before:bg-gradient-to-r before:from-primary/50 before:via-accent/30 before:to-primary/50 before:opacity-30 before:hover:opacity-100 before:transition-opacity",
  heroHeading: "text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
}

// Theme CSS variables to inject into tailwind
export const themeVariables = {
  light: {
    "--primary": "192 91% 36%",
    "--primary-foreground": "210 40% 98%",
    "--accent": "217 33% 27%"
  },
  dark: {
    "--primary": "192 91% 36%",
    "--primary-foreground": "210 40% 98%",
    "--accent": "217 33% 27%"
  }
}

/**
 * HRP Brand Color Palette
 * Strict 5-color system - DO NOT add colors outside this palette for base UI
 */

export const COLORS = {
  // Primary Dark - Main text, dark backgrounds, primary elements
  NAVY_DARK: '#162533',

  // Secondary Medium - Secondary text, borders, medium backgrounds
  SLATE_MEDIUM: '#546079',

  // Light Accent - Icons, highlights, light accents
  BLUE_LIGHT: '#7D97B6',

  // Very Light - Backgrounds, cards, light UI elements
  POWDER_LIGHT: '#E1E7F2',

  // Neutral - Optional neutral tone for specific sections
  TAUPE_NEUTRAL: '#716C66',
} as const

/**
 * Color utilities for creating variations
 */
export const colorUtils = {
  /**
   * Get color with opacity
   * @param color - Hex color from COLORS
   * @param opacity - 0-1
   */
  withOpacity: (color: string, opacity: number): string => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  },

  /**
   * Create gradient string for Tailwind
   * @param from - Start color
   * @param to - End color
   * @param direction - Gradient direction (default: 'to-br')
   */
  gradient: (from: string, to: string, direction: string = 'to-br'): string => {
    return `bg-gradient-${direction} from-[${from}] to-[${to}]`
  },

  /**
   * Get RGB values from hex
   */
  hexToRgb: (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  },
}

/**
 * Pre-defined Tailwind color classes using the palette
 * Use these for consistent styling
 */
export const colorClasses = {
  // Backgrounds
  bg: {
    navy: 'bg-[#162533]',
    slate: 'bg-[#546079]',
    blue: 'bg-[#7D97B6]',
    powder: 'bg-[#E1E7F2]',
    taupe: 'bg-[#716C66]',
  },

  // Text
  text: {
    navy: 'text-[#162533]',
    slate: 'text-[#546079]',
    blue: 'text-[#7D97B6]',
    powder: 'text-[#E1E7F2]',
    taupe: 'text-[#716C66]',
  },

  // Borders
  border: {
    navy: 'border-[#162533]',
    slate: 'border-[#546079]',
    blue: 'border-[#7D97B6]',
    powder: 'border-[#E1E7F2]',
    taupe: 'border-[#716C66]',
  },

  // Gradients (commonly used)
  gradient: {
    navyToSlate: 'bg-gradient-to-r from-[#162533] to-[#546079]',
    navyToBlueBr: 'bg-gradient-to-br from-[#162533] to-[#7D97B6]',
    slateToBlue: 'bg-gradient-to-r from-[#546079] to-[#7D97B6]',
    blueToPowder: 'bg-gradient-to-r from-[#7D97B6] to-[#E1E7F2]',
    powderToWhite: 'bg-gradient-to-b from-[#E1E7F2]/30 to-white',
  },
}

/**
 * Semantic color mapping
 * Maps UI purposes to palette colors
 */
export const semanticColors = {
  // Primary actions
  primary: {
    base: COLORS.NAVY_DARK,
    hover: colorUtils.withOpacity(COLORS.NAVY_DARK, 0.9),
    text: COLORS.POWDER_LIGHT,
  },

  // Secondary actions
  secondary: {
    base: COLORS.SLATE_MEDIUM,
    hover: colorUtils.withOpacity(COLORS.SLATE_MEDIUM, 0.9),
    text: COLORS.POWDER_LIGHT,
  },

  // Accents and highlights
  accent: {
    base: COLORS.BLUE_LIGHT,
    hover: colorUtils.withOpacity(COLORS.BLUE_LIGHT, 0.9),
    text: COLORS.NAVY_DARK,
  },

  // Backgrounds
  background: {
    primary: COLORS.POWDER_LIGHT,
    secondary: colorUtils.withOpacity(COLORS.POWDER_LIGHT, 0.5),
    dark: COLORS.NAVY_DARK,
  },

  // Text
  text: {
    primary: COLORS.NAVY_DARK,
    secondary: COLORS.SLATE_MEDIUM,
    light: COLORS.POWDER_LIGHT,
    accent: COLORS.BLUE_LIGHT,
  },

  // Borders
  border: {
    default: colorUtils.withOpacity(COLORS.POWDER_LIGHT, 0.6),
    hover: colorUtils.withOpacity(COLORS.BLUE_LIGHT, 0.4),
    focus: COLORS.BLUE_LIGHT,
  },
}

export default COLORS

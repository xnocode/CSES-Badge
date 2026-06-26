import { BadgeTheme, BadgeStyle, BadgeOptions } from '../types';

/**
 * Validates and sanitizes the user parameter.
 */
export function sanitizeUserId(user: string | null): string {
  if (!user) {
    throw new Error('Missing "user" query parameter');
  }
  const clean = user.trim();
  if (!/^\d+$/.test(clean)) {
    throw new Error('CSES user ID must be numeric (e.g., ?user=3)');
  }
  return clean;
}

/**
 * Parses query options and applies defaults.
 */
export function parseQueryOptions(url: URL): BadgeOptions {
  const searchParams = url.searchParams;

  const theme = (searchParams.get('theme') as BadgeTheme) || 'github';
  const style = (searchParams.get('style') as BadgeStyle) || 'rounded';
  const color = searchParams.get('color') || undefined;
  const label = searchParams.get('label') || undefined;
  const logo = searchParams.get('logo') || undefined;
  const card = searchParams.get('card') === 'true';

  // Validate theme
  const validThemes: BadgeTheme[] = [
    'light',
    'dark',
    'github',
    'ocean',
    'sunset',
    'emerald',
    'rose',
    'purple',
    'nord',
    'dracula',
  ];
  const sanitizedTheme = validThemes.includes(theme) ? theme : 'github';

  // Validate style
  const validStyles: BadgeStyle[] = ['flat', 'rounded', 'modern'];
  const sanitizedStyle = validStyles.includes(style) ? style : 'rounded';

  return {
    theme: sanitizedTheme,
    style: sanitizedStyle,
    color,
    label,
    logo,
    card,
  };
}

/**
 * Helper to validate if a string is a valid Hex Color code.
 */
export function isValidHexColor(color: string): boolean {
  return /^#?([0-9A-F]{3}){1,2}$/i.test(color);
}

/**
 * Normalizes color values (adds '#' if missing for hex colors).
 */
export function normalizeColor(color: string | undefined, defaultColor: string): string {
  if (!color) return defaultColor;

  const trimmed = color.trim();
  if (isValidHexColor(trimmed)) {
    return trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
  }

  const cssColorRegex = /^[a-z]+$/i;
  if (cssColorRegex.test(trimmed)) {
    return trimmed;
  }

  return defaultColor;
}

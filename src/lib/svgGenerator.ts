import { CsesProfile, BadgeOptions, BadgeTheme } from '../types';
import { normalizeColor } from './utils';

const CSES_LOGO_PATH = 'M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z';

/**
 * Complete theme definitions.
 */
const THEMES: Record<
  BadgeTheme,
  {
    bg: string;
    cardBg1: string;
    cardBg2: string;
    text: string;
    textMuted: string;
    accent: string;
    accentMuted: string;
    border: string;
    badgeLabelColor: string;
  }
> = {
  github: {
    bg: '#0d1117',
    cardBg1: '#161b22',
    cardBg2: '#0d1117',
    text: '#c9d1d9',
    textMuted: '#8b949e',
    accent: '#2ea44f',
    accentMuted: 'rgba(46, 164, 79, 0.12)',
    border: '#30363d',
    badgeLabelColor: '#9ca3af',
  },
  dark: {
    bg: '#09090b',
    cardBg1: '#18181b',
    cardBg2: '#09090b',
    text: '#f4f4f5',
    textMuted: '#a1a1aa',
    accent: '#10b981',
    accentMuted: 'rgba(16, 185, 129, 0.12)',
    border: '#27272a',
    badgeLabelColor: '#a1a1aa',
  },
  light: {
    bg: '#f8fafc',
    cardBg1: '#ffffff',
    cardBg2: '#f1f5f9',
    text: '#0f172a',
    textMuted: '#64748b',
    accent: '#2563eb',
    accentMuted: 'rgba(37, 99, 235, 0.08)',
    border: '#e2e8f0',
    badgeLabelColor: '#64748b',
  },
  ocean: {
    bg: '#0a1628',
    cardBg1: '#0f2035',
    cardBg2: '#0a1628',
    text: '#e0f2fe',
    textMuted: '#7dd3fc',
    accent: '#0ea5e9',
    accentMuted: 'rgba(14, 165, 233, 0.12)',
    border: '#164e63',
    badgeLabelColor: '#7dd3fc',
  },
  sunset: {
    bg: '#1c1007',
    cardBg1: '#27180e',
    cardBg2: '#1c1007',
    text: '#fef3c7',
    textMuted: '#fbbf24',
    accent: '#f97316',
    accentMuted: 'rgba(249, 115, 22, 0.12)',
    border: '#78350f',
    badgeLabelColor: '#fbbf24',
  },
  emerald: {
    bg: '#022c22',
    cardBg1: '#064e3b',
    cardBg2: '#022c22',
    text: '#d1fae5',
    textMuted: '#6ee7b7',
    accent: '#34d399',
    accentMuted: 'rgba(52, 211, 153, 0.12)',
    border: '#065f46',
    badgeLabelColor: '#6ee7b7',
  },
  rose: {
    bg: '#1a0a0e',
    cardBg1: '#2a1015',
    cardBg2: '#1a0a0e',
    text: '#ffe4e6',
    textMuted: '#fda4af',
    accent: '#f43f5e',
    accentMuted: 'rgba(244, 63, 94, 0.12)',
    border: '#4c0519',
    badgeLabelColor: '#fda4af',
  },
  purple: {
    bg: '#13071e',
    cardBg1: '#1e1033',
    cardBg2: '#13071e',
    text: '#f3e8ff',
    textMuted: '#c084fc',
    accent: '#a855f7',
    accentMuted: 'rgba(168, 85, 247, 0.12)',
    border: '#3b0764',
    badgeLabelColor: '#c084fc',
  },
  nord: {
    bg: '#2e3440',
    cardBg1: '#3b4252',
    cardBg2: '#2e3440',
    text: '#eceff4',
    textMuted: '#d8dee9',
    accent: '#88c0d0',
    accentMuted: 'rgba(136, 192, 208, 0.12)',
    border: '#4c566a',
    badgeLabelColor: '#d8dee9',
  },
  dracula: {
    bg: '#282a36',
    cardBg1: '#343746',
    cardBg2: '#282a36',
    text: '#f8f8f2',
    textMuted: '#6272a4',
    accent: '#bd93f9',
    accentMuted: 'rgba(189, 147, 249, 0.12)',
    border: '#44475a',
    badgeLabelColor: '#6272a4',
  },
};

/**
 * Main SVG Generator dispatcher.
 */
export function generateSvg(profile: CsesProfile, options: BadgeOptions): string {
  if (options.card) {
    return generateCardSvg(profile, options);
  }
  return generateBadgeSvg(profile, options);
}

/**
 * Badge: shows "CSES | 372 submissions"
 */
export function generateBadgeSvg(profile: CsesProfile, options: BadgeOptions): string {
  const { theme = 'github', style = 'rounded', color, label = 'CSES', logo } = options;

  const t = THEMES[theme] || THEMES.github;
  const accentColor = normalizeColor(color, t.accent);

  const rx = style === 'rounded' ? '6' : style === 'modern' ? '12' : '0';
  const hasShadow = style === 'modern';

  const valueText = `${profile.submissions} submissions`;

  const paddingX = 14;
  const logoWidth = logo !== 'false' ? 18 : 0;
  const logoGap = logo !== 'false' ? 8 : 0;
  const labelLength = label.length * 7;
  const valueLength = valueText.length * 7.5;
  const leftWidth = labelLength + paddingX * 2 + logoWidth + logoGap;
  const rightWidth = valueLength + paddingX * 2;
  const totalWidth = leftWidth + rightWidth;
  const height = 32;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}" fill="none">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700&amp;display=swap');
    .text { font-family: 'Inter', system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 700; }
    .label-text { fill: ${t.badgeLabelColor}; }
    .value-text { fill: #ffffff; }
  </style>
  ${hasShadow ? `<filter id="shadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>` : ''}
  <g ${hasShadow ? 'filter="url(#shadow)"' : ''}>
    <path d="M ${rx} 0 L ${leftWidth} 0 L ${leftWidth} ${height} L ${rx} ${height} A ${rx} ${rx} 0 0 1 0 ${height - Number(rx)} L 0 ${rx} A ${rx} ${rx} 0 0 1 ${rx} 0 Z" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
    <path d="M ${leftWidth} 0 L ${totalWidth - Number(rx)} 0 A ${rx} ${rx} 0 0 1 ${totalWidth} ${rx} L ${totalWidth} ${height - Number(rx)} A ${rx} ${rx} 0 0 1 ${totalWidth - Number(rx)} ${height} L ${leftWidth} ${height} Z" fill="${accentColor}"/>
    ${logo !== 'false' ? `<svg x="${paddingX}" y="${(height - 16) / 2}" width="16" height="16" viewBox="0 0 24 24" fill="${theme === 'light' ? '#374151' : '#ffffff'}"><path d="${CSES_LOGO_PATH}"/></svg>` : ''}
    <text x="${paddingX + logoWidth + logoGap}" y="${height / 2 + 4}" class="text label-text">${label}</text>
    <text x="${leftWidth + paddingX}" y="${height / 2 + 4}" class="text value-text">${valueText}</text>
  </g>
</svg>`;
}

/**
 * Card: shows all publicly visible CSES stats.
 * Title: "CSES", shows submissions, first/last dates, languages.
 */
export function generateCardSvg(profile: CsesProfile, options: BadgeOptions): string {
  const { theme = 'github', style = 'rounded', color } = options;

  const t = THEMES[theme] || THEMES.github;
  const accentColor = normalizeColor(color, t.accent);

  const width = 460;
  const rx = style === 'rounded' ? '12' : style === 'modern' ? '18' : '0';

  const submissions = profile.submissions || 0;
  const firstSub = profile.firstSubmission || 'N/A';
  const lastSub = profile.lastSubmission || 'N/A';
  const languages = profile.languages || [];

  // Dynamic height
  const langRowHeight = 22;
  const langSectionHeight = languages.length > 0 ? 40 + languages.length * langRowHeight : 0;
  const baseHeight = 175;
  const height = baseHeight + langSectionHeight;

  // Language rows
  const languagesSvg =
    languages.length > 0
      ? `
    <line x1="24" y1="150" x2="436" y2="150" stroke="${t.border}" stroke-width="1" stroke-dasharray="4,4" />
    <text x="24" y="175" class="section-title">Languages</text>
    ${languages
      .map((lang, idx) => {
        const rowY = 190 + idx * langRowHeight;
        return `<g>
      <text x="24" y="${rowY}" class="sec-label">${lang.name}</text>
      <text x="320" y="${rowY}" class="sec-value" text-anchor="end">${lang.count} submissions</text>
      <text x="436" y="${rowY}" class="sec-value" text-anchor="end">${lang.share}</text>
    </g>`;
      })
      .join('')}
  `
      : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&amp;display=swap');
      .card { font-family: 'Outfit', system-ui, -apple-system, sans-serif; }
      .title { font-size: 20px; font-weight: 700; fill: ${t.text}; }
      .subtitle { font-size: 12px; fill: ${t.textMuted}; }
      .stat-label { font-size: 14px; font-weight: 600; fill: ${t.text}; }
      .stat-value { font-size: 14px; font-weight: 700; fill: ${accentColor}; }
      .sec-label { font-size: 12px; fill: ${t.textMuted}; }
      .sec-value { font-size: 12px; font-weight: 600; fill: ${t.text}; }
      .section-title { font-size: 13px; font-weight: 700; fill: ${t.textMuted}; text-transform: uppercase; letter-spacing: 1px; }
      .card-bg { stroke: ${t.border}; stroke-width: 1.5; }
    </style>

    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.cardBg1}" />
      <stop offset="100%" stop-color="${t.cardBg2}" />
    </linearGradient>

    ${style === 'modern' ? `<filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000" flood-opacity="0.3"/></filter>` : ''}
  </defs>

  <g class="card" ${style === 'modern' ? 'filter="url(#cardShadow)"' : ''}>
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${rx}" fill="url(#cardGrad)" class="card-bg" />

    <!-- Header -->
    <g transform="translate(24, 28)">
      <rect width="36" height="36" rx="8" fill="${t.accentMuted}" />
      <svg x="8" y="8" width="20" height="20" viewBox="0 0 24 24" fill="${accentColor}">
        <path d="${CSES_LOGO_PATH}"/>
      </svg>
      <text x="48" y="18" class="title">CSES</text>
      <text x="48" y="34" class="subtitle">@${profile.username}</text>
    </g>

    <!-- Stats (only publicly visible data) -->
    <g transform="translate(24, 90)">
      <text x="0" y="18" class="stat-label">📊 Total Submissions</text>
      <text x="418" y="18" class="stat-value" text-anchor="end">${submissions.toLocaleString()}</text>

      <text x="0" y="46" class="stat-label">📅 First Submission</text>
      <text x="418" y="46" class="stat-value" text-anchor="end">${firstSub}</text>
    </g>

    <!-- Languages -->
    ${languagesSvg}
  </g>
</svg>`;
}

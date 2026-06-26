import { CsesProfile, BadgeOptions } from '../types';
import { normalizeColor } from './utils';

// Standard base64 CSES Logo path (or simple SVG representation)
const CSES_LOGO_PATH = 'M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z'; // simple grid representation

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
 * Generates a clean, simple, highly configurable SVG badge.
 */
export function generateBadgeSvg(profile: CsesProfile, options: BadgeOptions): string {
  const {
    theme = 'github',
    style = 'rounded',
    color,
    label = 'CSES',
    showTotal = true,
    showPercent = true,
    logo,
  } = options;

  // Curated color themes
  const themes = {
    github: {
      bg: '#0d1117',
      text: '#c9d1d9',
      accent: '#2ea44f',
      border: '#30363d',
    },
    dark: {
      bg: '#18181b',
      text: '#f4f4f5',
      accent: '#10b981',
      border: '#27272a',
    },
    light: {
      bg: '#ffffff',
      text: '#09090b',
      accent: '#2563eb',
      border: '#e4e4e7',
    },
  };

  const selectedTheme = themes[theme];
  const accentColor = normalizeColor(color, selectedTheme.accent);

  // Set style properties
  const rx = style === 'rounded' ? '6' : style === 'modern' ? '12' : '0';
  const hasShadow = style === 'modern';

  // Calculate values
  const solvedCount = profile.solved;
  const totalCount = profile.total;
  const percent = Math.min(100, Math.round((solvedCount / totalCount) * 100));

  let valueText = `${solvedCount}`;
  if (showTotal) valueText += `/${totalCount}`;
  if (showPercent) valueText += ` (${percent}%)`;

  // Dynamic layout measurements
  const paddingX = 14;
  const logoWidth = logo !== 'false' ? 18 : 0;
  const logoGap = logo !== 'false' ? 8 : 0;

  // Font metrics approximation
  const labelLength = label.length * 7;
  const valueLength = valueText.length * 7.5;

  const leftWidth = labelLength + paddingX * 2 + logoWidth + logoGap;
  const rightWidth = valueLength + paddingX * 2;
  const totalWidth = leftWidth + rightWidth;
  const height = 32;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}" fill="none">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700&amp;display=swap');
        .text {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 13px;
          font-weight: 700;
        }
        .label-text {
          fill: ${theme === 'light' ? '#4b5563' : '#9ca3af'};
        }
        .value-text {
          fill: #ffffff;
        }
        .badge-container {
          transition: transform 0.2s ease-in-out;
        }
        .badge-container:hover {
          transform: scale(1.02);
        }
      </style>
      
      ${hasShadow ? `
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/>
      </filter>
      ` : ''}

      <g class="badge-container" ${hasShadow ? 'filter="url(#shadow)"' : ''}>
        <!-- Left Side Background -->
        <path d="M ${rx} 0 L ${leftWidth} 0 L ${leftWidth} ${height} L ${rx} ${height} A ${rx} ${rx} 0 0 1 0 ${height - Number(rx)} L 0 ${rx} A ${rx} ${rx} 0 0 1 ${rx} 0 Z" fill="${selectedTheme.bg}" stroke="${selectedTheme.border}" stroke-width="1"/>
        
        <!-- Right Side Background -->
        <path d="M ${leftWidth} 0 L ${totalWidth - Number(rx)} 0 A ${rx} ${rx} 0 0 1 ${totalWidth} ${rx} L ${totalWidth} ${height - Number(rx)} A ${rx} ${rx} 0 0 1 ${totalWidth - Number(rx)} ${height} L ${leftWidth} ${height} Z" fill="${accentColor}"/>
        
        <!-- Logo -->
        ${logo !== 'false' ? `
        <svg x="${paddingX}" y="${(height - 16) / 2}" width="16" height="16" viewBox="0 0 24 24" fill="${theme === 'light' ? '#374151' : '#ffffff'}">
          <path d="${CSES_LOGO_PATH}"/>
        </svg>
        ` : ''}
        
        <!-- Text -->
        <text x="${paddingX + logoWidth + logoGap}" y="${height / 2 + 4}" class="text label-text">${label}</text>
        <text x="${leftWidth + paddingX}" y="${height / 2 + 4}" class="text value-text">${valueText}</text>
      </g>
    </svg>
  `.trim();
}

/**
 * Generates an exquisite, statistics-rich CSES profile card.
 */
export function generateCardSvg(profile: CsesProfile, options: BadgeOptions): string {
  const {
    theme = 'github',
    style = 'rounded',
    color,
    showPercent = true,
  } = options;

  // Curated color themes for cards
  const themes = {
    github: {
      bg: '#0d1117',
      cardBg: 'linear-gradient(135deg, #161b22 0%, #0d1117 100%)',
      text: '#c9d1d9',
      textMuted: '#8b949e',
      accent: '#58a6ff',
      accentMuted: 'rgba(88, 166, 255, 0.1)',
      border: '#30363d',
    },
    dark: {
      bg: '#09090b',
      cardBg: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
      text: '#f4f4f5',
      textMuted: '#a1a1aa',
      accent: '#10b981',
      accentMuted: 'rgba(16, 185, 129, 0.1)',
      border: '#27272a',
    },
    light: {
      bg: '#f4f4f5',
      cardBg: 'linear-gradient(135deg, #ffffff 0%, #f4f4f5 100%)',
      text: '#09090b',
      textMuted: '#71717a',
      accent: '#2563eb',
      accentMuted: 'rgba(37, 99, 235, 0.05)',
      border: '#e4e4e7',
    },
  };

  const selectedTheme = themes[theme];
  const accentColor = normalizeColor(color, selectedTheme.accent);

  // Card dimensions
  const width = 450;
  const height = 340;
  const rx = style === 'rounded' ? '12' : style === 'modern' ? '18' : '0';

  const solvedCount = profile.solved;
  const totalCount = profile.total;
  const submissions = profile.submissions || 0;
  const percent = Math.min(100, Math.round((solvedCount / totalCount) * 100));

  // Progress bar logic
  const progressWidth = 410;
  const activeProgressWidth = (percent / 100) * progressWidth;

  // Fallback category stats if sections not scraped
  const defaultSections = [
    { name: 'Introductory Problems', solved: Math.round(solvedCount * 0.1), total: 36 },
    { name: 'Sorting and Searching', solved: Math.round(solvedCount * 0.15), total: 35 },
    { name: 'Dynamic Programming', solved: Math.round(solvedCount * 0.12), total: 19 },
    { name: 'Graph Algorithms', solved: Math.round(solvedCount * 0.2), total: 36 },
  ];
  const sectionsToRender = profile.sections && profile.sections.length > 0 ? profile.sections : defaultSections;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&amp;display=swap');
          .card {
            font-family: 'Outfit', system-ui, -apple-system, sans-serif;
          }
          .title {
            font-size: 18px;
            font-weight: 700;
            fill: ${selectedTheme.text};
          }
          .subtitle {
            font-size: 12px;
            fill: ${selectedTheme.textMuted};
          }
          .stat-label {
            font-size: 14px;
            font-weight: 600;
            fill: ${selectedTheme.text};
          }
          .stat-value {
            font-size: 14px;
            font-weight: 700;
            fill: ${accentColor};
          }
          .sec-label {
            font-size: 12px;
            fill: ${selectedTheme.textMuted};
          }
          .sec-value {
            font-size: 12px;
            font-weight: 600;
            fill: ${selectedTheme.text};
          }
          .percentage-label {
            font-size: 16px;
            font-weight: 700;
            fill: ${accentColor};
          }
          .card-bg {
            stroke: ${selectedTheme.border};
            stroke-width: 1.5;
            transition: all 0.3s ease;
          }
          .hover-group {
            transition: transform 0.3s ease;
            cursor: pointer;
          }
          .hover-group:hover {
            transform: translateY(-3px);
          }
        </style>

        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme === 'light' ? '#ffffff' : '#1e1e24'}" />
          <stop offset="100%" stop-color="${selectedTheme.bg}" />
        </linearGradient>

        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${accentColor}" />
          <stop offset="100%" stop-color="${accentColor}cc" />
        </linearGradient>

        ${style === 'modern' ? `
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000" flood-opacity="0.3"/>
        </filter>
        ` : ''}
      </defs>

      <g class="card hover-group" ${style === 'modern' ? 'filter="url(#cardShadow)"' : ''}>
        <!-- Card Background -->
        <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${rx}" fill="url(#cardGrad)" class="card-bg" />

        <!-- Header -->
        <g transform="translate(24, 30)">
          <!-- CSES Styled Trophy/Icon -->
          <rect width="36" height="36" rx="8" fill="${selectedTheme.accentMuted}" />
          <path d="M 12 10 L 24 10 L 24 14 A 6 6 0 0 1 12 14 Z M 18 20 L 18 24 M 14 26 L 22 26" stroke="${accentColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          
          <text x="48" y="20" class="title">CSES Profile Card</text>
          <text x="48" y="34" class="subtitle">@${profile.username} (${profile.submissions ? 'Active user' : 'Profile'})</text>
        </g>

        <!-- Main Solved Stats Row -->
        <g transform="translate(24, 96)">
          <text x="0" y="20" class="stat-label">🏆 Solved Problems</text>
          <text x="402" y="20" class="stat-value" text-anchor="end">${solvedCount} / ${totalCount}</text>
          
          <text x="0" y="48" class="stat-label">⭐ Total Submissions</text>
          <text x="402" y="48" class="stat-value" text-anchor="end">${submissions}</text>
        </g>

        <!-- Separator -->
        <line x1="24" y1="170" x2="426" y2="170" stroke="${selectedTheme.border}" stroke-width="1" stroke-dasharray="4,4" />

        <!-- Categories Breakdown -->
        <g transform="translate(24, 185)">
          ${sectionsToRender.map((sec, idx) => {
            const rowY = idx * 24;
            return `
              <g transform="translate(0, ${rowY})">
                <text x="0" y="14" class="sec-label">${sec.name}</text>
                <text x="402" y="14" class="sec-value" text-anchor="end">${sec.solved} / ${sec.total}</text>
              </g>
            `;
          }).join('')}
        </g>

        <!-- Progress Section -->
        <g transform="translate(20, 290)">
          <!-- Background track -->
          <rect x="0" y="10" width="${progressWidth}" height="10" rx="5" fill="${theme === 'light' ? '#e4e4e7' : '#27272a'}" />
          <!-- Animated Progress track -->
          <rect x="0" y="10" width="${activeProgressWidth}" height="10" rx="5" fill="url(#progressGrad)">
            <animate attributeName="width" from="0" to="${activeProgressWidth}" dur="1.2s" cubic-bezier="0.4, 0, 0.2, 1" fill="freeze" />
          </rect>
          <!-- Percentage -->
          ${showPercent ? `
          <text x="${progressWidth}" y="0" class="percentage-label" text-anchor="end">${percent}% Completed</text>
          ` : ''}
        </g>
      </g>
    </svg>
  `.trim();
}

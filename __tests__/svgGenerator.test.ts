import { generateSvg, generateBadgeSvg, generateCardSvg } from '../src/lib/svgGenerator';
import { CsesProfile } from '../src/types';

describe('SVG Generator Tests', () => {
  const sampleProfile: CsesProfile = {
    username: 'peelo',
    submissions: 372,
    firstSubmission: '2015-01-10 17:59:13',
    lastSubmission: '2026-06-10 18:26:11',
    languages: [
      { name: 'C++', count: 355, share: '95.43%' },
      { name: 'Python', count: 17, share: '4.57%' },
    ],
  };

  test('generateBadgeSvg contains SVG element and submission count', () => {
    const svg = generateBadgeSvg(sampleProfile, {
      theme: 'github',
      style: 'rounded',
      label: 'CSES',
    });

    expect(svg).toContain('<svg');
    expect(svg).toContain('CSES');
    expect(svg).toContain('372 submissions');
  });

  test('generateCardSvg shows CSES title and public data', () => {
    const svg = generateCardSvg(sampleProfile, {
      theme: 'dark',
      style: 'modern',
    });

    expect(svg).toContain('<svg');
    expect(svg).toContain('CSES');
    expect(svg).toContain('peelo');
    expect(svg).toContain('372');
    expect(svg).toContain('2015-01-10');
    expect(svg).toContain('C++');
  });

  test('generateSvg routes to card or badge based on options', () => {
    const badgeSvg = generateSvg(sampleProfile, { card: false });
    const cardSvg = generateSvg(sampleProfile, { card: true });

    expect(badgeSvg).toContain('372 submissions');
    expect(cardSvg).toContain('Total Submissions');
  });

  test('custom color is applied in SVG output', () => {
    const svg = generateBadgeSvg(sampleProfile, { color: 'ff00ff' });
    expect(svg).toContain('fill="#ff00ff"');
  });

  test('all themes produce valid SVG', () => {
    const themes = [
      'github',
      'dark',
      'light',
      'ocean',
      'sunset',
      'emerald',
      'rose',
      'purple',
      'nord',
      'dracula',
    ] as const;

    for (const theme of themes) {
      const svg = generateCardSvg(sampleProfile, { theme });
      expect(svg).toContain('<svg');
      expect(svg).toContain('CSES');
    }
  });
});

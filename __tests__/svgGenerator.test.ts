import { generateSvg, generateBadgeSvg, generateCardSvg } from '../src/lib/svgGenerator';
import { CsesProfile } from '../src/types';

describe('SVG Generator Tests', () => {
  const sampleProfile: CsesProfile = {
    username: 'peelo',
    solved: 187,
    total: 400,
    submissions: 642,
    sections: [
      { name: 'Introductory Problems', solved: 35, total: 36 },
      { name: 'Sorting and Searching', solved: 18, total: 35 },
    ],
  };

  test('generateBadgeSvg returns correct SVG element and values', () => {
    const svg = generateBadgeSvg(sampleProfile, {
      theme: 'github',
      style: 'rounded',
      label: 'My CSES',
    });

    expect(svg).toContain('<svg');
    expect(svg).toContain('My CSES');
    expect(svg).toContain('187/400');
    expect(svg).toContain('47%');
  });

  test('generateCardSvg contains user data, percent, and progress bar width', () => {
    const svg = generateCardSvg(sampleProfile, {
      theme: 'dark',
      style: 'modern',
    });

    expect(svg).toContain('<svg');
    expect(svg).toContain('peelo');
    expect(svg).toContain('187 / 400');
    expect(svg).toContain('47% Completed');
    expect(svg).toContain('Introductory Problems');
  });

  test('generateSvg correctly routes to card or badge based on options', () => {
    const badgeSvg = generateSvg(sampleProfile, { card: false });
    const cardSvg = generateSvg(sampleProfile, { card: true });

    expect(badgeSvg).toContain('187/400');
    expect(cardSvg).toContain('CSES Profile Card');
  });

  test('custom color matches the SVG render output', () => {
    const customColor = 'ff00ff';
    const svg = generateBadgeSvg(sampleProfile, { color: customColor });
    expect(svg).toContain('fill="#ff00ff"');
  });
});

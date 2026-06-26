import { NextRequest, NextResponse } from 'next/server';
import { scrapeCsesProfile } from '../../../lib/scraper';
import { getCachedProfile, setCachedProfile } from '../../../lib/cache';
import { generateSvg } from '../../../lib/svgGenerator';
import { parseQueryOptions } from '../../../lib/utils';

/** Returns a simple SVG badge showing an error message */
function generateErrorBadge(message: string): string {
  const label = 'Error';
  const val = message;
  const labelWidth = 50;
  const valWidth = Math.max(120, val.length * 7);
  const totalWidth = labelWidth + valWidth;
  const height = 20;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}">
  <g>
    <rect width="${labelWidth}" height="${height}" fill="#555"/>
    <rect x="${labelWidth}" width="${valWidth}" height="${height}" fill="#d9534f"/>
  </g>
  <g fill="#fff" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="6" y="14" fill="#010101" fill-opacity=".3">${label}</text>
    <text x="6" y="13">${label}</text>
    <text x="${labelWidth + 6}" y="14" fill="#010101" fill-opacity=".3">${val}</text>
    <text x="${labelWidth + 6}" y="13">${val}</text>
  </g>
</svg>`;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userParam = url.searchParams.get('user');

  if (!userParam) {
    return new NextResponse(generateErrorBadge('Missing user param'), {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=60',
      },
    });
  }

  const userId = userParam.trim();

  if (!/^\d+$/.test(userId)) {
    return new NextResponse(generateErrorBadge('Use numeric User ID (e.g. user=3)'), {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }

  try {
    const options = parseQueryOptions(url);

    // Cache lookup
    let profile = getCachedProfile(userId);

    if (!profile) {
      profile = await scrapeCsesProfile(userId);
      setCachedProfile(userId, profile);
    }

    const svg = generateSvg(profile, options);

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=60',
      },
    });
  } catch (error: any) {
    const msg = error.message || 'Scraping failed';

    return new NextResponse(generateErrorBadge(msg), {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }
}

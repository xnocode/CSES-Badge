import { NextRequest, NextResponse } from 'next/server';
import { scrapeCsesProfile } from '../../../lib/scraper';
import { getCachedProfile, setCachedProfile } from '../../../lib/cache';
import { generateSvg } from '../../../lib/svgGenerator';
import { parseQueryOptions } from '../../../lib/utils';

// Helper to generate a clean SVG badge showing an error message
function generateErrorBadge(message: string): string {
  const label = 'Error';
  const val = message;
  const labelWidth = 50;
  const valWidth = Math.max(120, val.length * 7);
  const totalWidth = labelWidth + valWidth;
  const height = 20;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}">
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
    </svg>
  `.trim();
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
  
  // 1. Validate user ID format (CSES user profiles require a numeric ID)
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
    // 2. Read query options
    const options = parseQueryOptions(url);

    // 3. Cache lookup
    let profile = getCachedProfile(userId);

    if (!profile) {
      // 4. Scrape if cache miss
      profile = await scrapeCsesProfile(userId);
      setCachedProfile(userId, profile);
    }

    // 5. Allow query overrides for maximum customization
    const solvedOverride = url.searchParams.get('solved');
    if (solvedOverride !== null) {
      profile.solved = parseInt(solvedOverride, 10) || 0;
    }
    
    const submissionsOverride = url.searchParams.get('submissions');
    if (submissionsOverride !== null) {
      profile.submissions = parseInt(submissionsOverride, 10) || 0;
    }

    const totalOverride = url.searchParams.get('total');
    if (totalOverride !== null) {
      profile.total = parseInt(totalOverride, 10) || 400;
    }

    // 6. Generate the dynamic SVG
    const svg = generateSvg(profile, options);

    // 7. Return with premium cache headers (30 min cache CDN caching)
    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=60',
        'X-Cache-Status': 'HIT', // Will be customized by the wrapper if cached
      },
    });
  } catch (error: any) {
    const status = error.statusCode || 500;
    const msg = error.message || 'Scraping failed';
    
    return new NextResponse(generateErrorBadge(msg), {
      status: 200, // Return 200 with SVG error badge so it renders in READMEs
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300', // Cache errors for 5 mins to prevent spam
      },
    });
  }
}

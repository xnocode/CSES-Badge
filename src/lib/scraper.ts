import * as cheerio from 'cheerio';
import { CsesProfile } from '../types';

export class ScrapeError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'ScrapeError';
  }
}

/**
 * Fetches and scrapes a CSES user profile page.
 * @param userId CSES numeric user ID
 */
export async function scrapeCsesProfile(userId: string): Promise<CsesProfile> {
  // Validate that userId is a numeric string
  if (!/^\d+$/.test(userId)) {
    throw new ScrapeError('Invalid user ID. CSES user IDs must be numeric. (e.g. user=3)', 400);
  }

  const url = `https://cses.fi/user/${userId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (response.status === 404) {
      throw new ScrapeError(`CSES User with ID ${userId} not found`, 404);
    }

    if (!response.ok) {
      throw new ScrapeError(`Failed to fetch profile: HTTP ${response.status}`, response.status);
    }

    const html = await response.text();
    return parseCsesHtml(html, userId);
  } catch (error) {
    if (error instanceof ScrapeError) {
      throw error;
    }
    throw new ScrapeError(`Failed to fetch CSES profile: ${(error as Error).message}`, 500);
  }
}

/**
 * Parses the CSES profile HTML page using Cheerio.
 */
export function parseCsesHtml(html: string, userId: string): CsesProfile {
  const $ = cheerio.load(html);

  // Check if page contains "Not Found" or 404 header
  const title = $('title').text();
  if (title.includes('404') || $('h1').text().includes('404')) {
    throw new ScrapeError(`CSES User with ID ${userId} not found`, 404);
  }

  const headerText = $('h1').text().trim();
  const username = headerText.replace(/^User\s+/, '').trim() || `User ${userId}`;

  let submissions = 0;
  let solved = 0;
  let hasSolvedRow = false;

  // Parse "User information" table
  $('.summary-table tr, table.summary-table tr').each((_, row) => {
    const label = $(row).find('td').eq(0).text().trim().toLowerCase();
    const value = $(row).find('td').eq(1).text().trim();

    if (label.includes('submission count')) {
      submissions = parseInt(value, 10) || 0;
    } else if (label.includes('tasks solved') || label.includes('solved tasks') || label.includes('solved problems')) {
      solved = parseInt(value, 10) || 0;
      hasSolvedRow = true;
    }
  });

  // If there's no explicit solved count row (which is standard for public CSES profile pages),
  // we can use a heuristic or default to 0 (and let query parameters override it), or estimate it.
  // We'll set solved to a default of 0 unless we find a solved count row.
  // The API allows overriding via query parameters for full flexibility.
  if (!hasSolvedRow) {
    solved = 0; 
  }

  // Parse languages section for potential card stats
  const sections: { name: string; solved: number; total: number }[] = [];
  
  // We assume a total of 400 problems (standard CSES problem set size)
  const totalProblems = 400;

  return {
    username,
    solved,
    total: totalProblems,
    submissions,
    sections,
  };
}

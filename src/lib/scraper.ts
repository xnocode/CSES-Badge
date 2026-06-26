import * as cheerio from 'cheerio';
import { CsesProfile, CsesLanguage } from '../types';

export class ScrapeError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'ScrapeError';
  }
}

/**
 * Fetches and scrapes a CSES user profile page.
 * Only extracts publicly visible data (no login required).
 */
export async function scrapeCsesProfile(userId: string): Promise<CsesProfile> {
  if (!/^\d+$/.test(userId)) {
    throw new ScrapeError('Invalid user ID. CSES user IDs must be numeric. (e.g. user=3)', 400);
  }

  const url = `https://cses.fi/user/${userId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
 * Public profiles show: submission count, first/last submission, and language breakdown.
 */
export function parseCsesHtml(html: string, userId: string): CsesProfile {
  const $ = cheerio.load(html);

  const title = $('title').text();
  if (title.includes('404') || $('h1').text().includes('404')) {
    throw new ScrapeError(`CSES User with ID ${userId} not found`, 404);
  }

  const headerText = $('h1').text().trim();
  const username = headerText.replace(/^User\s+/, '').trim() || `User ${userId}`;

  let submissions = 0;
  let firstSubmission = '';
  let lastSubmission = '';

  // Parse summary table (publicly visible fields only)
  $('.summary-table tr, table.summary-table tr').each((_, row) => {
    const label = $(row).find('td').eq(0).text().trim().toLowerCase();
    const value = $(row).find('td').eq(1).text().trim();

    if (label.includes('submission count')) {
      submissions = parseInt(value, 10) || 0;
    } else if (label.includes('first submission')) {
      firstSubmission = value;
    } else if (label.includes('last submission')) {
      lastSubmission = value;
    }
  });

  // Parse language breakdown table
  const languages: CsesLanguage[] = [];
  $('table.narrow tr').each((idx, row) => {
    if (idx === 0) return; // skip header row
    const cells = $(row).find('td');
    if (cells.length >= 3) {
      const langName = cells.eq(0).text().trim();
      const langCount = parseInt(cells.eq(1).text().trim(), 10) || 0;
      const langShare = cells.eq(2).text().trim();
      if (langName) {
        languages.push({ name: langName, count: langCount, share: langShare });
      }
    }
  });

  return {
    username,
    submissions,
    firstSubmission,
    lastSubmission,
    languages,
  };
}

import { parseCsesHtml, scrapeCsesProfile, ScrapeError } from '../src/lib/scraper';

describe('CSES Profile Scraper Tests', () => {
  const mockHtmlWithStats = `
    <!DOCTYPE html>
    <html>
      <head><title>CSES - User peelo</title></head>
      <body>
        <h1>User peelo</h1>
        <table class="summary-table narrow">
          <tr><td>Submission count:</td><td>372</td></tr>
          <tr><td>First submission:</td><td>2015-01-10 17:59:13</td></tr>
          <tr><td>Last submission:</td><td>2026-06-10 18:26:11</td></tr>
        </table>
        <table class="narrow">
          <tr><th>language</th><th>number of submissions</th><th>share</th></tr>
          <tr><td>C++</td><td>355</td><td>95.43%</td></tr>
          <tr><td>Python</td><td>17</td><td>4.57%</td></tr>
        </table>
      </body>
    </html>
  `;

  const mockHtml404 = `
    <!DOCTYPE html>
    <html>
      <head><title>CSES - 404</title></head>
      <body>
        <h1>404 Not Found</h1>
      </body>
    </html>
  `;

  test('parseCsesHtml correctly parses public profile data', () => {
    const profile = parseCsesHtml(mockHtmlWithStats, '3');
    expect(profile.username).toBe('peelo');
    expect(profile.submissions).toBe(372);
    expect(profile.firstSubmission).toBe('2015-01-10 17:59:13');
    expect(profile.lastSubmission).toBe('2026-06-10 18:26:11');
    expect(profile.languages).toHaveLength(2);
    expect(profile.languages[0].name).toBe('C++');
    expect(profile.languages[0].count).toBe(355);
    expect(profile.languages[0].share).toBe('95.43%');
    expect(profile.languages[1].name).toBe('Python');
  });

  test('parseCsesHtml throws error for 404 page', () => {
    expect(() => {
      parseCsesHtml(mockHtml404, '99999');
    }).toThrow(ScrapeError);
  });

  test('scrapeCsesProfile rejects non-numeric User IDs', async () => {
    await expect(scrapeCsesProfile('abc')).rejects.toThrow('Invalid user ID');
  });

  test('scrapeCsesProfile handles mock fetch resolution', async () => {
    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(mockHtmlWithStats),
      })
    ) as jest.Mock;

    const profile = await scrapeCsesProfile('3');
    expect(profile.username).toBe('peelo');
    expect(profile.submissions).toBe(372);
    expect(profile.languages).toHaveLength(2);

    global.fetch = originalFetch;
  });
});

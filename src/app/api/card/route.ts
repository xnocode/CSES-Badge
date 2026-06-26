import { NextRequest, NextResponse } from 'next/server';
import { GET as getBadge } from '../badge/route';

export async function GET(request: NextRequest) {
  // Clone the request URL and append card=true to default to the card layout
  const url = new URL(request.url);
  if (!url.searchParams.has('card')) {
    url.searchParams.set('card', 'true');
  }

  // Re-run the badge GET request with the updated search parameter
  const modifiedRequest = new NextRequest(url.toString(), {
    headers: request.headers,
    method: request.method,
  });

  return getBadge(modifiedRequest);
}

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const url = 'https://raw.githubusercontent.com/cablechris/fred-daily-data/main/fred-data.json';

  // Logging for debugging
  console.log('fred-data API called');
  console.log('GITHUB_TOKEN present:', !!GITHUB_TOKEN);
  console.log('Fetching URL:', url);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.raw',
      },
    });

    console.log('GitHub fetch status:', response.status);

    if (!response.ok) {
      console.error('Failed to fetch data from GitHub', response.status, await response.text());
      return res.status(500).json({ error: 'Failed to fetch data from GitHub', status: response.status });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.error('fred-data API error:', error.message || error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
} 
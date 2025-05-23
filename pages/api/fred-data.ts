import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const url = 'https://raw.githubusercontent.com/cablechris/fred-daily-data/main/fred-data.json';

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.raw',
      },
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch data from GitHub', status: response.status });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
} 
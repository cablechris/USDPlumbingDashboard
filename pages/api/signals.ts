import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export type Metric = {
  id: string;
  title: string;
  value: number;
  status: 'green' | 'amber' | 'red';
  description: string;
  lastUpdated: string;
};

export type SignalsResponse = {
  metrics: Metric[];
  date: string;
  red_count: number;
  amber_count: number;
  move: { value: number; status: 'green' | 'amber' | 'red' };
};

async function fetchFedFundsRate(): Promise<number> {
  try {
    const response = await axios.get('https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates');
    const data = response.data.data[0];
    return parseFloat(data.avg_interest_rate_amt);
  } catch (error) {
    console.error('Error fetching Fed Funds Rate:', error);
    throw new Error('Failed to fetch Fed Funds Rate');
  }
}

async function fetchRRPUsage(): Promise<number> {
  try {
    const response = await axios.get('https://markets.newyorkfed.org/api/rp/reverserepo/propositions/search.json');
    const data = response.data;
    return data.totalAmount / 1e9; // Convert to billions
  } catch (error) {
    console.error('Error fetching RRP Usage:', error);
    throw new Error('Failed to fetch RRP Usage');
  }
}

async function fetchTIPSBreakeven(): Promise<number> {
  try {
    if (!process.env.FRED_API_KEY) {
      throw new Error('FRED API key is not configured');
    }

    const response = await axios.get('https://api.fred.stlouisfed.org/series/observations', {
      params: {
        series_id: 'T5YIE',
        api_key: process.env.FRED_API_KEY,
        file_type: 'json',
        sort_order: 'desc',
        limit: 1
      }
    });

    if (!response.data.observations?.[0]?.value) {
      throw new Error('No TIPS data available');
    }

    return parseFloat(response.data.observations[0].value);
  } catch (error) {
    console.error('Error fetching TIPS Breakeven:', error);
    throw new Error('Failed to fetch TIPS Breakeven');
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignalsResponse>
) {
  try {
    console.log('Starting data fetch...');
    
    // Fetch data from various sources
    const [fedFundsRate, rrpUsage, tipsBreakeven] = await Promise.all([
      fetchFedFundsRate(),
      fetchRRPUsage(),
      fetchTIPSBreakeven()
    ]);

    console.log('Data fetched successfully:', {
      fedFundsRate,
      rrpUsage,
      tipsBreakeven
    });

    // Calculate status based on thresholds
    const getStatus = (value: number, thresholds: { green: number; amber: number }): 'green' | 'amber' | 'red' => {
      if (value <= thresholds.green) return 'green';
      if (value <= thresholds.amber) return 'amber';
      return 'red';
    };

    const metrics: Metric[] = [
      {
        id: 'fed-funds',
        title: 'Fed Funds Rate',
        value: fedFundsRate,
        status: getStatus(fedFundsRate, { green: 5.0, amber: 5.5 }),
        description: 'Rate at which banks lend reserves to each other overnight',
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'rrp',
        title: 'RRP Facility Usage',
        value: rrpUsage,
        status: getStatus(rrpUsage, { green: 500, amber: 700 }),
        description: "Daily volume in the Fed's overnight reverse repo facility (billions)",
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'tips',
        title: '5Y TIPS Breakeven',
        value: tipsBreakeven,
        status: getStatus(tipsBreakeven, { green: 2.5, amber: 3.0 }),
        description: 'Market-implied 5-year inflation expectation',
        lastUpdated: new Date().toISOString(),
      },
    ];

    // Calculate red and amber counts
    const red_count = metrics.filter(m => m.status === 'red').length;
    const amber_count = metrics.filter(m => m.status === 'amber').length;

    // Calculate MOVE index (simplified)
    const moveValue = (fedFundsRate + tipsBreakeven) / 2;
    const move = {
      value: moveValue,
      status: getStatus(moveValue, { green: 3.5, amber: 4.0 })
    };

    console.log('Response prepared:', {
      metrics,
      red_count,
      amber_count,
      move
    });

    res.status(200).json({
      metrics,
      date: new Date().toISOString(),
      red_count,
      amber_count,
      move,
    });
  } catch (error) {
    console.error('Error in signals API:', error);
    res.status(500).json({
      error: 'Failed to fetch signals data',
      details: error instanceof Error ? error.message : 'Unknown error'
    } as any);
  }
} 
import useSWR from 'swr';
import type { SignalsResponse } from '@/types/signals';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useSignals() {
  const { data: signals, error, isLoading } = useSWR<SignalsResponse>('/api/signals', fetcher);

  return {
    signals,
    isLoading,
    isError: error,
  };
} 
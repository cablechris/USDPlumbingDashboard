/**
 * API utilities for data fetching
 */
import { ApiResponse } from '@/types';

/**
 * Generic fetch function with error handling
 * @param url API endpoint
 * @returns Typed response data or error
 */
export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

/**
 * Global fetch handler for SWR
 */
export const fetcher = <T>(url: string): Promise<T> => fetchData<T>(url);

/**
 * Utility to help address Next.js file permission issues in development
 * 
 * This can be called periodically to clear SWR cache and help prevent
 * the EPERM file permission issues that can occur with Next.js hot reloading
 */
export function clearSWRCache() {
  if (typeof window !== 'undefined') {
    // @ts-ignore - SWR internal cache
    const cache = window.__SWR_CACHE__;
    if (cache) {
      for (const key of cache.keys()) {
        cache.delete(key);
      }
    }
  }
} 
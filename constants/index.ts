/**
 * Application-wide constants
 */

// API endpoints
export const API_ENDPOINTS = {
  SIGNALS: '/api/signals',
};

// Status thresholds for indicators
export const THRESHOLDS = {
  PIVOT: {
    RED: 3,
    AMBER: 3,
  },
};

// Default configuration for components
export const DEFAULT_CONFIG = {
  // SWR configuration
  SWR: {
    refreshInterval: 300000, // 5 minutes
    revalidateOnFocus: true,
    dedupingInterval: 60000, // 1 minute
  },
};

// Status display configurations (used for UI elements)
export const STATUS_CONFIG = {
  COLORS: {
    red: '#ef4444',
    amber: '#f59e0b',
    green: '#10b981',
    stale: '#6b7280',
  },
  LABELS: {
    red: 'Critical',
    amber: 'Warning',
    green: 'Normal',
    stale: 'No Data',
  },
}; 
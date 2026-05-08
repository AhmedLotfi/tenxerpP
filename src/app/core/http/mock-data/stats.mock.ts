import { Stat } from '../../models/stats.model';

export const MOCK_STATS: Stat[] = [
  { key: 'clients', value: 1200, suffix: '+' },
  { key: 'transactions', value: 180, suffix: 'M' },
  { key: 'uptime', value: 99.99, suffix: '%', decimals: 2 },
  { key: 'countries', value: 24 },
];

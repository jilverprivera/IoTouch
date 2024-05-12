import { OwnArea } from './database';

export interface DashboardSlice {
  areas: OwnArea[];
}

export enum DASHBOARD_SELECTORS {
  'your-spaces' = 'Tus espacios',
  'shared-spaces' = 'Espacios compartidos',
}

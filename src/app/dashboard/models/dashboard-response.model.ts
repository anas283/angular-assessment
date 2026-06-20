import { ChartDataItem } from './chart-data.model';
import { User } from './user.model';

export interface DashboardResponse {
  success: boolean;
  chartDonut: ChartDataItem[];
  chartBar: ChartDataItem[];
  tableUsers: User[];
}

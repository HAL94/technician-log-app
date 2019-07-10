import { Task } from './task.model';

import { Status } from '../status';

export interface WeeklyEntry {
  id?: string;
  count_pending?: number;
  count_complete?: number;
  status?: Status;
  day?: number;
}
export interface Dashboard {
  id?: string;
  userId?: string;
  totalPending: number;
  totalCompleted: number;
  monthlyTarget: number;
  monthlyTargetReached: number;
  tasks: Task[];
  totalTasks: number;
  plot: any;
  weeklyEntries: WeeklyEntry[];
}

import { Status } from '../status';
import { Subtask } from './subtask.model';

export interface Task {
  id?: string;
  title: string;
  user?: string;
  date?: Date;
  details?: string;
  subtasks?: Subtask[];
  status?: Status;
}


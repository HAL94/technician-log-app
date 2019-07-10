import { Status } from '../status';

export interface Subtask {
  id?: string;
  title: string;
  parent: string;
  date?: Date;
  details?: string;
  status?: string;
}

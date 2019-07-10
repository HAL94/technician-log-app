import { Device } from './device.model';
import { Customer } from './customer.model';
import { Status } from './status';

export interface TechEntry {
  id?: string;
  device: Device;
  customer: Customer;
  user?: string;
  status: Status;
}



import { Device } from './device.model';
import { Customer } from './customer.model';

export interface TechEntry {
  id?: string;
  device: Device;
  customer: Customer;
  userId?: string;
}

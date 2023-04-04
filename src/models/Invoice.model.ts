import { InvoiceItemValues } from './InvoiceItem.model';

export interface Invoice {
  title: string;
  items: InvoiceItemValues[];
  note: string;
  paymentMethod: string;
  dueDate: string;
  status: string;
}

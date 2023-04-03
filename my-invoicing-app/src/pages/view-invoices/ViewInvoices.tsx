import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/table/Table';
import { Invoice } from '../../models/Invoice.model';
import { invoicesSelector } from '../../redux-slices/Invoices.slice';
import './ViewInvoices.scss';
interface ViewInvoiceModel {
  invoiceTitle: string;
  note: string;
  dueDate: string;
  paymentMethod: string;
  status: string;
}

const ViewInvoices = () => {
  const navigate = useNavigate();
  const [invoicesData, setInvoicesData] = useState<ViewInvoiceModel[]>([]);
  const { invoices } = useSelector(invoicesSelector);
  useEffect(() => {
    const mapData = async () => {
      if (invoices?.length > 0) {
        setInvoicesData([]);
        await invoices.forEach((invoice: Invoice, index: number) => {
          const invoiceData: ViewInvoiceModel = {
            invoiceTitle: invoice.title,
            note: invoice.note,
            dueDate: invoice.dueDate,
            paymentMethod: invoice.paymentMethod,
            status: invoice.status,
          };
          setInvoicesData((data) => [...data, invoiceData]);
        });
      }
    };

    mapData().catch(console.error);
  }, []);
  return (
    <div className='invoices-list'>
      <h3>View Invoices</h3>
      <div className='add-invoice-btn'>
        <button onClick={() => navigate('/add-invoice')}>Add Invoice</button>
      </div>
      {invoicesData.length > 0 ? (
        <Table
          headers={[
            'Invoice Title',
            'Note',
            'Due Date',
            'Payment Method',
            'Status',
          ]}
          data={invoicesData}
        ></Table>
      ) : (
        <div className='no-items'>No invoices to display</div>
      )}
    </div>
  );
};

export default ViewInvoices;

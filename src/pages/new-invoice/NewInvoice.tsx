import { useState } from 'react';
import Modal from '../../components/modal/Modal';
import Table from '../../components/table/Table';
import { Invoice } from '../../models/Invoice.model';
import InvoiceItem from './invoice-item/InvoiceItem';
import { addInvoice } from '../../redux-slices/Invoices.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './NewInvoice.scss';
import { InvoiceService } from '../../services/Invoice.service';

const NewInvoice = () => {
  const invoiceService = new InvoiceService();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [invoiceData, setInvoiceData] = useState<Invoice>({
    title: '',
    items: [],
    dueDate: '',
    note: '',
    paymentMethod: 'Cash',
    status: 'Outstanding',
  });
  const [showItemModal, setShowItemModal] = useState(false);

  const handleItemSubmit = (e: any) => {
    setShowItemModal(false);
    invoiceData.items.push(e);
    setInvoiceData({ ...invoiceData });
  };
  const handleInvoiceSubmit = (e: any) => {
    e.preventDefault();
    invoiceService.sendEmail().then((response) => {
      dispatch(addInvoice(invoiceData));
      //reset invoice data
      setInvoiceData({
        title: '',
        items: [],
        dueDate: '',
        note: '',
        paymentMethod: 'Cash',
        status: 'Outstanding',
      });
      navigate('/');
    });
  };

  const handleAddItemClick = () => {
    setShowItemModal(true);
  };

  return (
    <>
      <Modal
        isOpen={showItemModal}
        children={<InvoiceItem onSubmit={handleItemSubmit} />}
        onClose={() => setShowItemModal(false)}
      ></Modal>
      <div className='form-container'>
        <h3>Add New Invoice</h3>
        <div className='data-container'>
          <div className='invoice-item-header'>
            <label>Inovice Items:</label>
            <button onClick={handleAddItemClick}>Add Invoice item</button>
          </div>
          {invoiceData.items.length > 0 ? (
            <Table
              headers={['Work Hours', 'rate', 'expenses', 'materials', 'labor']}
              data={invoiceData.items}
            ></Table>
          ) : (
            <div className='no-items'>No items to display</div>
          )}
          <form onSubmit={handleInvoiceSubmit}>
            <>
              <label htmlFor='title'>Invoice Title:</label>
              <input
                type='text'
                id='title'
                name='title'
                value={invoiceData.title}
                onChange={(e) => {
                  setInvoiceData({ ...invoiceData, title: e.target.value });
                }}
                required
              />
            </>
            <>
              <label htmlFor='notes'>Notes:</label>
              <textarea
                id='notes'
                name='notes'
                value={invoiceData.note}
                onChange={(e) => {
                  setInvoiceData({ ...invoiceData, note: e.target.value });
                }}
                placeholder='Enter any additional notes here...'
              />
            </>
            <>
              <label htmlFor='date'>Due Date:</label>
              <input
                type='date'
                id='date'
                name='date'
                value={invoiceData.dueDate}
                onChange={(e) => {
                  setInvoiceData({ ...invoiceData, dueDate: e.target.value });
                }}
                required
              />
            </>
            <>
              <label htmlFor='method'>Payment Method:</label>
              <select
                id='method'
                name='method'
                value={invoiceData.paymentMethod}
                onChange={(e) => {
                  setInvoiceData({
                    ...invoiceData,
                    paymentMethod: e.target.value,
                  });
                }}
                required
              >
                <option value='Cash'>Cash</option>
                <option value='Visa'>Visa</option>
              </select>
            </>
            <>
              <label htmlFor='status'>Status:</label>
              <select
                id='status'
                name='status'
                value={invoiceData.status}
                onChange={(e) => {
                  setInvoiceData({ ...invoiceData, status: e.target.value });
                }}
              >
                <option value='Paid'>Paid</option>
                <option value='Outstanding'>Outstanding</option>
                <option value='Late'>Late</option>
              </select>
            </>
            <div className='buttons'>
              <button type='button' onClick={() => navigate('/')}>
                Cancel
              </button>
              <button type='submit'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewInvoice;

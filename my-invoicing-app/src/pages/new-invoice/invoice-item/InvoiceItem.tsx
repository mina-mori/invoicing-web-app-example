import React, { useState } from 'react';
import { InvoiceItemValues } from '../../../models/InvoiceItem.model';
import './InvoiceItem.scss';

const InvoiceItem = (props: {
  onSubmit: (invoiceItemValues: InvoiceItemValues) => void;
}) => {
  const [invoiceItemValues, setInvoiceItemValues] = useState<InvoiceItemValues>(
    {
      workHours: 0,
      rate: 0,
      expenses: 0,
      materials: 0,
      labor: 0,
    }
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInvoiceItemValues({
      ...invoiceItemValues,
      [name]: parseFloat(value),
    });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setInvoiceItemValues({
      workHours: 0,
      rate: 0,
      expenses: 0,
      materials: 0,
      labor: 0,
    });
    props.onSubmit(invoiceItemValues);
    // handle form submission here
  };
  return (
    <form onSubmit={handleSubmit} className='invoice-item'>
      <div className='form-group'>
        <label htmlFor='workHours'>Work Hours:</label>
        <input
          type='number'
          name='workHours'
          id='workHours'
          value={invoiceItemValues.workHours}
          onChange={handleInputChange}
          min={0}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='rate'>Rate:</label>
        <input
          type='number'
          name='rate'
          id='rate'
          value={invoiceItemValues.rate}
          onChange={handleInputChange}
          min={0}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='expenses'>Expenses:</label>
        <input
          type='number'
          name='expenses'
          id='expenses'
          value={invoiceItemValues.expenses}
          onChange={handleInputChange}
          min={0}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='materials'>Materials:</label>
        <input
          type='number'
          name='materials'
          id='materials'
          value={invoiceItemValues.materials}
          onChange={handleInputChange}
          min={0}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='labor'>Labor:</label>
        <input
          type='number'
          name='labor'
          id='labor'
          value={invoiceItemValues.labor}
          onChange={handleInputChange}
          min={0}
          required
        />
      </div>
      <div className='buttons'>
        <button type='submit'>Save</button>
      </div>
    </form>
  );
};

export default InvoiceItem;

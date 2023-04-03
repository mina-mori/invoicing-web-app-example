import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InvoiceItem from './InvoiceItem';

describe('InvoiceItem component', () => {
  it('should update invoice item values when form inputs change', () => {
    const onSubmitMock = jest.fn();
    render(<InvoiceItem onSubmit={onSubmitMock} />);
    const workHoursInput = screen.getByLabelText('Work Hours:');
    const rateInput = screen.getByLabelText('Rate:');
    const expensesInput = screen.getByLabelText('Expenses:');
    const materialsInput = screen.getByLabelText('Materials:');
    const laborInput = screen.getByLabelText('Labor:');

    fireEvent.change(workHoursInput, { target: { value: '5' } });
    fireEvent.change(rateInput, { target: { value: '50.75' } });
    fireEvent.change(expensesInput, { target: { value: '12.99' } });
    fireEvent.change(materialsInput, { target: { value: '35.20' } });
    fireEvent.change(laborInput, { target: { value: '4.25' } });

    expect(workHoursInput).toHaveValue(5);
    expect(rateInput).toHaveValue(50.75);
    expect(expensesInput).toHaveValue(12.99);
    expect(materialsInput).toHaveValue(35.2);
    expect(laborInput).toHaveValue(4.25);
  });

  it('should call onSubmit prop with correct invoice item values when form is submitted', () => {
    const onSubmitMock = jest.fn();
    render(<InvoiceItem onSubmit={onSubmitMock} />);
    const saveButton = screen.getByText('Save');
    const workHoursInput = screen.getByLabelText('Work Hours:');
    const rateInput = screen.getByLabelText('Rate:');
    const expensesInput = screen.getByLabelText('Expenses:');
    const materialsInput = screen.getByLabelText('Materials:');
    const laborInput = screen.getByLabelText('Labor:');

    fireEvent.change(workHoursInput, { target: { value: '5' } });
    fireEvent.change(rateInput, { target: { value: '50.75' } });
    fireEvent.change(expensesInput, { target: { value: '12.99' } });
    fireEvent.change(materialsInput, { target: { value: '35.20' } });
    fireEvent.change(laborInput, { target: { value: '4.25' } });
    fireEvent.click(saveButton);

    expect(onSubmitMock).toHaveBeenCalledWith({
      workHours: 5,
      rate: 50.75,
      expenses: 12.99,
      materials: 35.2,
      labor: 4.25,
    });
  });
});

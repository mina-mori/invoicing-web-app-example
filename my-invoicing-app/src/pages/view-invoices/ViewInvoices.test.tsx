/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import ViewInvoices from './ViewInvoices';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

const mockStore = configureMockStore();

describe('ViewInvoices component', () => {
  it('renders invoices data correctly', () => {
    const initialState = {
      invoices: {
        invoices: [
          {
            id: 1,
            title: 'Invoice 1',
            note: 'Note 1',
            dueDate: '2022-01-01',
            paymentMethod: 'Cash',
            status: 'Unpaid',
          },
          {
            id: 2,
            title: 'Invoice 2',
            note: 'Note 2',
            dueDate: '2022-02-01',
            paymentMethod: 'Credit Card',
            status: 'Paid',
          },
        ],
      },
    };
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<ViewInvoices></ViewInvoices>} path='/'></Route>
          </Routes>{' '}
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('Invoice Title')).toBeInTheDocument();
    expect(getByText('Note')).toBeInTheDocument();
    expect(getByText('Due Date')).toBeInTheDocument();
    expect(getByText('Payment Method')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();
    expect(getByText('Invoice 1')).toBeInTheDocument();
    expect(getByText('Note 1')).toBeInTheDocument();
    expect(getByText('2022-01-01')).toBeInTheDocument();
    expect(getByText('Cash')).toBeInTheDocument();
    expect(getByText('Unpaid')).toBeInTheDocument();
    expect(getByText('Invoice 2')).toBeInTheDocument();
    expect(getByText('Note 2')).toBeInTheDocument();
    expect(getByText('2022-02-01')).toBeInTheDocument();
    expect(getByText('Credit Card')).toBeInTheDocument();
    expect(getByText('Paid')).toBeInTheDocument();
  });
});

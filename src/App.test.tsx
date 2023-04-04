import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
describe('App', () => {
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

  test('renders ViewInvoices by default', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText(/View Invoices/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders NewInvoice when add-Invoice path is accessed', () => {
    window.history.pushState({}, 'New Invoice', '/add-Invoice');
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText(/New Invoice/i);
    expect(linkElement).toBeInTheDocument();
  });
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import NewInvoice from './NewInvoice';

const mockStore = configureStore([]);

describe('NewInvoice', () => {
  let store: any;
  let history: any;

  beforeEach(() => {
    store = mockStore({
      invoices: [],
    });

    history = createMemoryHistory();
  });

  it('should render the component without errors', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewInvoice />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Add New Invoice')).toBeInTheDocument();
  });

  it('should submit the form when Save button is clicked', async () => {
    render(
      <Provider store={store}>
        <Router>
          <NewInvoice />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Invoice Title:'), {
      target: { value: 'Test Invoice' },
    });

    fireEvent.change(screen.getByLabelText('Notes:'), {
      target: { value: 'Test notes' },
    });

    fireEvent.change(screen.getByLabelText('Due Date:'), {
      target: { value: '2023-04-30' },
    });

    fireEvent.change(screen.getByLabelText('Payment Method:'), {
      target: { value: 'Visa' },
    });

    fireEvent.change(screen.getByLabelText('Status:'), {
      target: { value: 'Paid' },
    });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(store.getActions()).toEqual([
        {
          type: 'invoices/addInvoice',
          payload: {
            title: 'Test Invoice',
            items: [],
            dueDate: '2023-04-30',
            note: 'Test notes',
            paymentMethod: 'Visa',
            status: 'Paid',
          },
        },
      ]);

      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(history.location.pathname).toBe('/');
    });
  });
});

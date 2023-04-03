import { createSlice } from '@reduxjs/toolkit';
import { Invoice } from '../models/Invoice.model';

const initialState = {
  invoices: [] as Invoice[],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices?.push(action.payload);
    },
  },
});

export const { addInvoice } = invoicesSlice.actions;
export const invoicesSelector = (state: any) => state.invoices;
export default invoicesSlice.reducer;

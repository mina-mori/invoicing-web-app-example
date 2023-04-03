import { combineReducers } from '@reduxjs/toolkit';
import invoicesSlice from './Invoices.slice';

const rootReducer = combineReducers({
  invoices: invoicesSlice,
});

export default rootReducer;

import './App.scss';
import NewInvoice from './pages/new-invoice/NewInvoice';
import ViewInvoices from './pages/view-invoices/ViewInvoices';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route element={<ViewInvoices></ViewInvoices>} path='/'></Route>
          <Route
            element={<NewInvoice></NewInvoice>}
            path='/add-Invoice'
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

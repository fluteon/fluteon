import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import CustomerRoutes from './Routers/CustomerRoutes';

import api from '../src/config/api';

import ScrollToTop from './customer/Components/ScrollTop';
function App() {
  const isAdmin=true;
  return (
    <>
    
      <ScrollToTop />
      {/* <ContactSidebar /> */}
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>
    </>
  );
}

export default App;

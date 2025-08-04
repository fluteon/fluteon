import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerRoutes from './Routers/CustomerRoutes';
import ScrollToTop from './customer/Components/ScrollTop';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromToken } from './Redux/Auth/Action'; 
import ChatWidget from './customer/Components/ChatAi/ChatWidget';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromToken()); 
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>
      <ChatWidget />
    </>
  );
}
export default App;
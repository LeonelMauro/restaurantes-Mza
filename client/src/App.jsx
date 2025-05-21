import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './Components/Headers';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Servicios from './pages/Servicios';
import { Toolbar } from '@mui/material';
import ListaRestaurantes from './pages/ListaRestaurantes';
import AddRestaurantForm from './pages/AddRestaurantForm';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/restaurantes" element={<ListaRestaurantes />} />
        <Route path="/addrestaurantes" element={<AddRestaurantForm />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

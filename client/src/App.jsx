import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './Components/Headers';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home';
import Footer from './Components/Footer';
import Servicios from './pages/Servicios';
import { Toolbar } from '@mui/material';
import ListaRestaurantes from './pages/ListaRestaurantes';
import AddRestaurantForm from './pages/AddRestaurantForm';
import VistaMontaña from './pages/VistaMontaña';
import RestauranteDetalle from './pages/RestauranteDetalle';
import BeneficiosRegistro from './pages/BeneficiosRegistro';
import BeneficiosDep from './pages/Departamento';
import MisReservas from './pages/MisReservas';
import MiRestaurante from './pages/MiRestaurante';
import FormularioMenu from './pages/FormularioMenu';
import BebidasManager from './pages/Bebidas';
import FormularioDepartamento from './pages/FormularioDepartamento';
import DepartamentoDialog from './pages/fetchDepartamentos';

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
        <Route path="/VistaMontaña" element={<VistaMontaña />} />
        <Route path="/restaurante/:id" element={<RestauranteDetalle />} />
        <Route path="/beneficios" element={<BeneficiosRegistro />} />
        <Route path="/BeneficiosDep" element={<BeneficiosDep />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/mi-restaurante/:id" element={<MiRestaurante />} />
        <Route path="/menu/create" element={<FormularioMenu />} />
        <Route path="/bebidas" element={<BebidasManager />} />
        <Route path="/form" element={<FormularioDepartamento />} />
        <Route path="/form1" element={<DepartamentoDialog />} />


      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

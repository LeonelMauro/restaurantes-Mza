import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './Components/Headers';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home';
import Footer from './Components/Footer';
import Servicios from './pages/Servicios';
import AddRestaurantForm from './pages/Restaurantes/AddRestaurantForm';
import VistaMontaña from './pages/Restaurantes/VistaMontaña';
import RestauranteDetalle from './pages/Restaurantes/RestauranteDetalle';
import BeneficiosRegistro from './pages/BeneficiosRegistro';
import MisReservas from './pages/Restaurantes/MisReservas';
import MiRestaurante from './pages/Restaurantes/MiRestaurante';
import FormularioMenu from './pages/Restaurantes/FormularioMenu';
import BebidasManager from './pages/Restaurantes/Bebidas';
import DepartamentoDialog from './pages/Departamentos/fetchDepartamentos';
import DepartamentoDetalle from './pages/Departamentos/DepartamentoDetalle';
import { Box } from '@mui/material';
import ReservasResto from './pages/Restaurantes/ReservaResto';
import Busqueda from './Busqueda';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box sx={{ height: { xs: 56, sm: 64 } }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/addrestaurantes" element={<AddRestaurantForm />} />
        <Route path="/VistaMontaña" element={<VistaMontaña />} />
        <Route path="/restaurante/:id" element={<RestauranteDetalle />} />
        <Route path="/beneficios" element={<BeneficiosRegistro />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/mi-restaurante/:id" element={<MiRestaurante />} />
        <Route path="/menu/create" element={<FormularioMenu />} />
        <Route path="/bebidas" element={<BebidasManager />} />
        <Route path="/form1" element={<DepartamentoDialog />} />
        <Route path="/departamento/:id" element={<DepartamentoDetalle />} />
        <Route path="/ReservasResto" element={<ReservasResto />} />
        <Route path="/buscar" element={<Busqueda />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

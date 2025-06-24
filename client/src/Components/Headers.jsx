import React, { useState, useEffect } from 'react';
import logo from '../assets/img/logo.png';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Button,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [restauranteExistente, setRestauranteExistente] = useState(null);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');
  const tipoUsuario = localStorage.getItem('tipo');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRestaurante = async () => {
      if (isLoggedIn && tipoUsuario === 'restaurante' && userId) {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`http://localhost:3000/restaurante/by-user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRestauranteExistente(res.data);
        } catch (err) {
          console.error('Error al obtener restaurante:', err);
          setRestauranteExistente(null);
        }
      }
      setLoading(false);
    };

    fetchRestaurante();
  }, [isLoggedIn, tipoUsuario, userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const sectionsBase = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicio', path: '/servicios' },
    { name: 'Restaurantes', path: '/VistaMontaña' },
  ];

  const sectionsRestauranteSinRegistro = [
    { name: 'Registrar restaurante', path: '/addrestaurantes' },
  ];

  const sectionsRestauranteConRegistro = [
    { name: 'Mi Restaurante', path: `/mi-restaurante/${restauranteExistente?.id}` },
    { name: 'Menú', path: '/menu/create' },
    { name: 'Bebidas', path: '/bebidas' },
    { name: 'Promociones', path: '/promociones' },
    { name: 'Eventos', path: '/eventos' },
  ];

  const sectionsTurista = [
    { name: 'Mis Reservas', path: '/mis-reservas' },
  ];

  const sectionsNoLogin = [
    { name: 'Iniciar sesión', path: '/login' },
    { name: 'Registro', path: '/register' },
  ];

  let sections = [...sectionsBase];

  if (!loading) {
    if (isLoggedIn && tipoUsuario === 'restaurante') {
      if (restauranteExistente) {
        sections = [...sections, ...sectionsRestauranteConRegistro];
      } else {
        sections = [...sections, ...sectionsRestauranteSinRegistro];
      }
    } else if (isLoggedIn && tipoUsuario === 'turista') {
      sections = [...sections, ...sectionsTurista];
    } else if (!isLoggedIn) {
      sections = [...sections, ...sectionsNoLogin];
    }
  }

  if (loading) {
    return (
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar sx={{ backgroundColor: '#8B5E3C' }}>
          <CircularProgress size={24} sx={{ color: '#F5E6D3', mx: 'auto' }} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar sx={{ backgroundColor: '#8B5E3C' }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            <Box component="img" src={logo} alt="Logo" sx={{ height: 30, mr: 2 }} />
          </Box>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setOpenDrawer(true)}
              >
                <MenuIcon sx={{ color: 'white' }} />
              </IconButton>
              <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
              >
                <List sx={{ width: 180 }}>
                  {sections.map((section) => (
                    <ListItem
                      button
                      key={section.path}
                      onClick={() => {
                        navigate(section.path);
                        setOpenDrawer(false);
                      }}
                    >
                      <ListItemText primary={section.name} />
                    </ListItem>
                  ))}
                  {isLoggedIn && (
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="Cerrar sesión" />
                    </ListItem>
                  )}
                </List>
              </Drawer>
            </>
          ) : (
            <>
              {sections.map((section) => (
                <Link
                  key={section.path}
                  to={section.path}
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    color: 'white',
                    textShadow: `
                      -1px -1px 0 #000,
                      1px -1px 0 #000,
                      -1px  1px 0 #000,
                      1px  1px 2px rgba(0,0,0,1)
                    `,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    padding: '4px 10px',
                    borderRadius: '4px',
                  }}
                >
                  {section.name}
                </Link>
              ))}
              {isLoggedIn && (
                <Button
                  onClick={handleLogout}
                  sx={{
                    ml: 2,
                    color: '#F5E6D3',
                    border: '1px solid #F5E6D3',
                    fontSize: '0.75rem',
                  }}
                >
                  Cerrar sesión
                </Button>
              )}
            </>
          )}

          <IconButton
            onClick={() => navigate(isLoggedIn ? '/perfil' : '/login')}
            sx={{ color: '#F5E6D3', ml: 'auto' }}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

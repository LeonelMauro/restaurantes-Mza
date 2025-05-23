import React, { useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token'); // Cambiá 'token' por lo que uses para verificar login

  const handleLogout = () => {
    localStorage.removeItem('token'); // o 'user', según lo que uses
    navigate('/');
    window.location.reload(); // para refrescar el header
  };

  const sections = [
    { name: 'Inicio', path: '/' },
    ...(isLoggedIn ? [{ name: 'Mis reservas', path: '/mis-reservas' }] : []),
    ...(isLoggedIn
      ? []
      : [
          { name: 'Iniciar sesión', path: '/login' },
          { name: 'Registro', path: '/register' },
        ]),
    { name: 'Servicio', path: '/servicios' },
    { name: 'Restaurantes', path: '/VistaMontaña' },
  ];

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
                <MenuIcon sx={{ color: 'white', flexGrow: 1 }} />
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
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textTransform: 'capitalize',
                    transition: 'background 0.3s',
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

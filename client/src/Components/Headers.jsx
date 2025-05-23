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
  useMediaQuery
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

  const sections = [
    { name: 'Inicio', path: '/' },
    { name: 'Iniciar seción', path: '/login' },
    { name: 'Registro', path: '/register' },
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
                <List sx={{ width: 50 }}>
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
            fontSize: '0.9rem', // Achicado
            fontWeight: 500, // Más moderno
            textTransform: 'capitalize', // Solo primera letra en mayúscula
            transition: 'background 0.3s',
            padding: '4px 10px',
            borderRadius: '4px',
          }}
        >
          {section.name}
        </Link>
        ))}
            </>
          )}

          <IconButton
            onClick={() => navigate('/login')}
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

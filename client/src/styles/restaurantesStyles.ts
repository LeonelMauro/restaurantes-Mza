export const restaurantesStyles = {
  section: {
    backgroundColor: '#fff',
    py: 6,
  },

  container: {
    px: {
      xs: 2,
      sm: 3,
      md: 4,
    },
  },

  title: {
    fontFamily: 'Kaushan Script',
    fontWeight: 'bold',
    color: 'black',
    fontSize: {
      xs: '2.5rem',
      sm: '3.2rem',
      md: '4rem',
    },
  },

  restaurantsTitle: {
    mb: 4,
  },

  restaurantGridItem: {
    display: 'flex',
    justifyContent: 'center',
  },

  link: {
    textDecoration: 'none',
    display: 'block',
  },

  restaurantCard: {
    width: {
      xs: '100%',
      sm: 300,
      md: 320,
    },
    maxWidth: 320,
    height: {
      xs: 290,
      sm: 300,
      md: 300,
    },
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 3,
    boxShadow: 3,
    backgroundColor: '#d2b48c',
    cursor: 'pointer',
    overflow: 'hidden',

    transition: 'transform 0.2s, box-shadow 0.2s',

    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: 6,
    },
  },

  restaurantImageContainer: {
    width: '100%',
    height: {
      xs: 160,
      sm: 170,
      md: 180,
    },
    flexShrink: 0,
    overflow: 'hidden',
  },

  noImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#c5a77d',
  },

  restaurantContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    px: 2,
    py: 2,
  },

  restaurantName: {
    fontFamily: 'Kaushan Script',
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 1.2,

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',

    height: 58,
  },

  rating: {
    mt: 1,
  },
};
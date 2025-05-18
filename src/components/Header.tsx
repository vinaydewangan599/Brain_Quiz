import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import { Brain, Home, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logOut } from '../firebase/firebase';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <AppBar position="static" color="transparent" sx={{ 
      boxShadow: 'none', 
      background: 'transparent',
      backdropFilter: 'blur(8px)',
    }}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <Brain size={32} color="#ff00ff" />
            <Typography variant="h5" component="div" sx={{ ml: 1, fontWeight: 700, color: 'primary.main' }}>
              BrainQuiz
            </Typography>
          </Link>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/" 
              startIcon={<Home size={18} />}
            >
              Home
            </Button>

            {currentUser ? (
              <Button 
                color="primary" 
                variant="outlined" 
                onClick={handleLogout}
                startIcon={<LogOut size={18} />}
              >
                Logout
              </Button>
            ) : (
              <Button 
                color="primary" 
                variant="contained" 
                component={Link} 
                to="/login"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
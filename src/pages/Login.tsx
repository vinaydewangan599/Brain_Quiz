import React, { useEffect } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../firebase/firebase';
import { useAuth } from '../contexts/AuthContext';
import { BrainCircuit } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ 
      py: 8, 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 200px)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <Paper sx={{ 
          p: 4, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(15, 41, 66, 0.8) 0%, rgba(10, 25, 41, 0.95) 100%)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background elements */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: -40, 
              left: -40, 
              width: 120, 
              height: 120, 
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff00ff22 0%, transparent 70%)',
              filter: 'blur(10px)',
              zIndex: 0
            }} 
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: -40, 
              right: -40, 
              width: 120, 
              height: 120, 
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00e5ff22 0%, transparent 70%)',
              filter: 'blur(10px)',
              zIndex: 0
            }} 
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box 
              component={motion.div}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 0.2 
              }}
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mb: 3 
              }}
            >
              <BrainCircuit size={72} color="#ff00ff" />
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Welcome to BrainQuiz
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Sign in to track your quiz progress and compete with friends on the leaderboard.
            </Typography>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleGoogleSignIn}
              sx={{
                py: 1.5,
                background: 'linear-gradient(45deg, #4285F4, #34A853, #FBBC05, #EA4335)',
                backgroundSize: '300% 300%',
                animation: 'gradient 5s ease infinite',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(66, 133, 244, 0.4)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Sign in with Google
            </Button>
            
            <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;
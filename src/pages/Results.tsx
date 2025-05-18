import React, { useEffect } from 'react';
import { Container, Typography, Box, Button, Paper, CircularProgress, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Home, RefreshCw, Heart } from 'lucide-react';
import { useQuiz } from '../contexts/QuizContext';
import { useAuth } from '../contexts/AuthContext';

const Results: React.FC = () => {
  const { score, livesLeft, category, resetQuiz } = useQuiz();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    // If no score data, redirect to home
    if (category === '') {
      navigate('/');
    }
  }, [category, navigate]);

  const handlePlayAgain = () => {
    resetQuiz();
    navigate(`/quiz/${category}`);
  };

  const handleHomeClick = () => {
    resetQuiz();
    navigate('/');
  };

  // Calculate percentage
  const percentage = Math.round((score / 10) * 100);
  
  // Determine result message based on score
  const getResultMessage = () => {
    if (percentage >= 90) return "Incredible!";
    if (percentage >= 70) return "Great job!";
    if (percentage >= 50) return "Good effort!";
    if (percentage >= 30) return "Nice try!";
    return "Better luck next time!";
  };

  if (category === '') {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
          {/* Decorative elements */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: -30, 
              right: -30, 
              width: 120, 
              height: 120, 
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff00ff22 0%, transparent 70%)',
              filter: 'blur(10px)'
            }} 
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: -40, 
              left: -40, 
              width: 150, 
              height: 150, 
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00e5ff22 0%, transparent 70%)',
              filter: 'blur(15px)'
            }} 
          />

          <Trophy size={60} color="#ffc107" style={{ marginBottom: 16 }} />
          
          <Typography variant="h3" component="h1" gutterBottom>
            {getResultMessage()}
          </Typography>
          
          <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary', textTransform: 'capitalize' }}>
            {category} Quiz Results
          </Typography>

          <Box sx={{ position: 'relative', display: 'inline-flex', my: 3 }}>
            <CircularProgress 
              variant="determinate" 
              value={percentage} 
              size={160}
              thickness={5}
              sx={{ 
                color: percentage >= 70 ? 'success.main' : percentage >= 40 ? 'warning.main' : 'error.main',
                boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h3" component="div" color="text.primary" fontWeight="bold">
                {percentage}%
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {score}/10 correct
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              px: 3, 
              py: 1, 
              borderRadius: 2, 
              backgroundColor: 'background.paper'
            }}>
              <Heart size={18} color="#ff5252" fill="#ff5252" />
              <Typography>
                Lives remaining: <strong>{livesLeft}</strong>
              </Typography>
            </Box>

            {currentUser && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                px: 3, 
                py: 1, 
                borderRadius: 2, 
                backgroundColor: 'background.paper'
              }}>
                <Typography>
                  Played as: <strong>{currentUser.email}</strong>
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              onClick={handlePlayAgain}
              startIcon={<RefreshCw />}
            >
              Play Again
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              size="large" 
              onClick={handleHomeClick}
              startIcon={<Home />}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Results;
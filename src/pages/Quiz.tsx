import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuizQuestion from '../components/QuizQuestion';
import LivesDisplay from '../components/LivesDisplay';
import { useQuiz } from '../contexts/QuizContext';
import { useAuth } from '../contexts/AuthContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
}

const Quiz: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { livesLeft, hintsLeft, setCategory } = useQuiz();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Image URLs with error handling
  const characterImages = {
    left: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=300',
    right: 'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=300'
  };

  useEffect(() => {
    if (!category) return;
    
    setCategory(category);
    
    const loadQuestions = async () => {
      try {
        const response = await fetch('/src/data/questions.json');
        const data = await response.json();
        
        if (data[category]) {
          setQuestions(data[category]);
        } else {
          console.error(`No questions found for category: ${category}`);
          navigate('/');
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to load questions:', error);
        setLoading(false);
        navigate('/');
      }
    };
    
    loadQuestions();
  }, [category, navigate, setCategory]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.display = 'none';
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress color="primary" size={60} />
        <Typography variant="h6" color="text.secondary">Loading questions...</Typography>
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh',
        flexDirection: 'column'
      }}>
        <Typography variant="h4" color="error.main" gutterBottom>No questions available</Typography>
        <Typography variant="body1" color="text.secondary">
          Please try another category or check back later.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ textAlign: 'center', mb: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          textTransform: 'capitalize',
          fontWeight: 600,
          background: 'linear-gradient(45deg, #ff00ff, #00e5ff)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent', 
        }}>
          {category} Quiz
        </Typography>

        <Box sx={{ 
          position: 'relative', 
          height: '100%', 
          width: '100%',
          display: { xs: 'none', md: 'block' } 
        }}>
          <Box 
            component="img"
            src={characterImages.left}
            alt=""
            onError={handleImageError}
            sx={{
              position: 'absolute',
              left: -50,
              top: 150,
              height: 300,
              opacity: 0.8,
              zIndex: -1,
              transform: 'scaleX(-1)',
              display: { xs: 'none', lg: 'block' },
              borderRadius: '12px',
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1
              }
            }}
          />
          <Box 
            component="img"
            src={characterImages.right}
            alt=""
            onError={handleImageError}
            sx={{
              position: 'absolute',
              right: -50,
              top: 150,
              height: 300,
              opacity: 0.8,
              zIndex: -1,
              display: { xs: 'none', lg: 'block' },
              borderRadius: '12px',
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1
              }
            }}
          />
        </Box>
      </Box>

      <LivesDisplay lives={livesLeft} hints={hintsLeft} />

      {questions[currentQuestionIndex] && (
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          onNextQuestion={handleNextQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      )}
    </Container>
  );
};

export default Quiz;
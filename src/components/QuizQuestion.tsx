import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, Button, CircularProgress, Fade } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../contexts/QuizContext';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import tickSound from '../assets/tick.mp3';
import correctSound from '../assets/correct.mp3';
import wrongSound from '../assets/wrong.mp3';

// Question interface
interface Question {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
}

interface QuizQuestionProps {
  question: Question;
  onNextQuestion: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  onNextQuestion, 
  currentQuestionIndex, 
  totalQuestions 
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hintUsed, setHintUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const { score, setScore, livesLeft, setLivesLeft, hintsLeft, setHintsLeft } = useQuiz();
  const navigate = useNavigate();
  
  // Sound hooks
  const [playTick] = useSound(tickSound, { volume: 0.25 });
  const [playCorrect] = useSound(correctSound, { volume: 0.5 });
  const [playWrong] = useSound(wrongSound, { volume: 0.5 });

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 10) {
          playTick();
        }
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeout();
    }
  }, [timeLeft, showResult, playTick]);

  // Reset on new question
  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    setTimeLeft(30);
    setHintUsed(false);
    setHiddenOptions([]);
  }, [question]);

  const handleOptionSelect = (optionIndex: number) => {
    if (showResult || selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    setShowResult(true);
    
    if (optionIndex === question.correctOption) {
      playCorrect();
      setScore(score + 1);
    } else {
      playWrong();
      setLivesLeft(livesLeft - 1);
      if (livesLeft <= 1) {
        setTimeout(() => {
          navigate('/results');
        }, 2000);
      }
    }
  };

  const handleTimeout = () => {
    playWrong();
    setShowResult(true);
    setLivesLeft(livesLeft - 1);
    if (livesLeft <= 1) {
      setTimeout(() => {
        navigate('/results');
      }, 2000);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex >= totalQuestions - 1 || livesLeft <= 0) {
      navigate('/results');
    } else {
      onNextQuestion();
    }
  };

  const useHint = () => {
    if (hintsLeft > 0 && !hintUsed && !showResult) {
      setHintUsed(true);
      setHintsLeft(hintsLeft - 1);
      
      // Find a wrong option to hide
      const wrongOptions = question.options.map((_, index) => index).filter(index => index !== question.correctOption);
      const randomWrongOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      setHiddenOptions([randomWrongOption]);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Card 
          sx={{ 
            maxWidth: 800, 
            mx: 'auto', 
            my: 4, 
            position: 'relative',
            overflow: 'visible',
            boxShadow: showResult 
              ? selectedOption === question.correctOption 
                ? '0 0 20px rgba(105, 240, 174, 0.7)' 
                : '0 0 20px rgba(255, 82, 82, 0.7)'
              : '0 8px 24px rgba(0, 0, 0, 0.2)',
          }}
          component={motion.div}
          animate={{
            boxShadow: showResult 
              ? selectedOption === question.correctOption 
                ? ['0 0 20px rgba(105, 240, 174, 0.7)', '0 0 40px rgba(105, 240, 174, 0.9)', '0 0 20px rgba(105, 240, 174, 0.7)'] 
                : ['0 0 20px rgba(255, 82, 82, 0.7)', '0 0 40px rgba(255, 82, 82, 0.9)', '0 0 20px rgba(255, 82, 82, 0.7)']
              : '0 8px 24px rgba(0, 0, 0, 0.2)'
          }}
          transition={{
            boxShadow: { repeat: showResult ? Infinity : 0, duration: 1.5 },
          }}
        >
          <CardContent>
            {/* Question Progress */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <CircularProgress 
                  variant="determinate" 
                  value={(timeLeft / 30) * 100}
                  color={timeLeft <= 10 ? "error" : "primary"}
                  size={40}
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
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {timeLeft}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Question Text */}
            <Typography variant="h5" component="div" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
              {question.question}
            </Typography>

            {/* Options */}
            <Grid container spacing={2}>
              {question.options.map((option, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Button
                    fullWidth
                    variant={selectedOption === index ? "contained" : "outlined"}
                    color={
                      showResult
                        ? index === question.correctOption
                          ? "success"
                          : selectedOption === index
                            ? "error"
                            : "primary"
                        : "primary"
                    }
                    onClick={() => handleOptionSelect(index)}
                    disabled={showResult || hiddenOptions.includes(index)}
                    sx={{
                      p: 2,
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      opacity: hiddenOptions.includes(index) ? 0.5 : 1,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Pulse animation for correct answer */}
                    {showResult && index === question.correctOption && (
                      <Box
                        component={motion.div}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'success.main',
                          borderRadius: 1,
                          zIndex: -1,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0.8, 0], scale: 1.5 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                    
                    <Typography variant="body1">
                      {String.fromCharCode(65 + index)}. {option}
                    </Typography>
                    
                    {hiddenOptions.includes(index) && (
                      <Typography 
                        variant="body2" 
                        color="error" 
                        sx={{ 
                          position: 'absolute', 
                          right: 8, 
                          fontStyle: 'italic' 
                        }}
                      >
                        (Hint: Not this one)
                      </Typography>
                    )}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {/* Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, alignItems: 'center' }}>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={useHint}
                disabled={hintsLeft <= 0 || hintUsed || showResult}
              >
                Use Hint ({hintsLeft} left)
              </Button>
              
              <Fade in={showResult}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleNext}
                  sx={{ visibility: showResult ? 'visible' : 'hidden' }}
                >
                  {currentQuestionIndex >= totalQuestions - 1 || livesLeft <= 0 ? 'See Results' : 'Next Question'}
                </Button>
              </Fade>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizQuestion;
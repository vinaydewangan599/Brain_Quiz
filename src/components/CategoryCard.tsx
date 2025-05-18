import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';

// Props for the CategoryCard component
interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// Animated MUI Card component
const AnimatedCard = motion(Card);

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, icon, color }) => {
  const navigate = useNavigate();
  const { setCategory, resetQuiz } = useQuiz();

  const handleCardClick = () => {
    resetQuiz();
    setCategory(title.toLowerCase());
    navigate(`/quiz/${title.toLowerCase()}`);
  };

  return (
    <AnimatedCard
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        backgroundImage: `linear-gradient(135deg, ${color}22 0%, transparent 100%)`,
        mb: 3,
      }}
      whileHover={{ 
        y: -10, 
        boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardActionArea 
        onClick={handleCardClick}
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          height: '100%',
          py: 2,
        }}
      >
        <Box 
          sx={{ 
            color, 
            fontSize: 60, 
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <CardContent sx={{ width: '100%' }}>
          <Typography gutterBottom variant="h5" component="div" textAlign="center" sx={{ color }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ minHeight: '60px' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </AnimatedCard>
  );
};

export default CategoryCard;
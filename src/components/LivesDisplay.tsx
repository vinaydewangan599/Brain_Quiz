import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Heart, Lightbulb } from 'lucide-react';

interface LivesDisplayProps {
  lives: number;
  hints: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 }
};

const LivesDisplay: React.FC<LivesDisplayProps> = ({ lives, hints }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: 4, 
      my: 2,
      flexWrap: 'wrap'
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ mb: 1, color: 'error.main', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Lives
        </Typography>
        <Box 
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          sx={{ display: 'flex', gap: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <Box 
              component={motion.div}
              key={i} 
              variants={item}
              sx={{ opacity: i < lives ? 1 : 0.3, transition: 'opacity 0.3s ease' }}
            >
              <Heart 
                fill={i < lives ? '#ff5252' : 'transparent'} 
                color={i < lives ? '#ff5252' : '#666'} 
                size={24} 
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ mb: 1, color: 'warning.main', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Hints
        </Typography>
        <Box 
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          sx={{ display: 'flex', gap: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <Box 
              component={motion.div}
              key={i} 
              variants={item}
              sx={{ opacity: i < hints ? 1 : 0.3, transition: 'opacity 0.3s ease' }}
            >
              <Lightbulb 
                fill={i < hints ? '#ffab40' : 'transparent'} 
                color={i < hints ? '#ffab40' : '#666'} 
                size={24} 
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LivesDisplay;
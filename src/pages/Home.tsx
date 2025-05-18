import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Film, Music, Code, Book, MapPin, FolderRoot as Football, FlaskRound as Flask, Pizza, Gamepad2, Tv } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import { useAuth } from '../contexts/AuthContext';

const categories = [
  { 
    title: 'Anime', 
    description: 'Test your knowledge of popular anime series and characters',
    icon: <Tv />,
    color: '#8e24aa' 
  },
  { 
    title: 'History', 
    description: 'Journey through time with questions about historical events and figures',
    icon: <Book />,
    color: '#c62828' 
  },
  { 
    title: 'Science', 
    description: 'Explore the fascinating world of scientific discoveries',
    icon: <Flask />,
    color: '#2e7d32' 
  },
  { 
    title: 'Sports', 
    description: 'Challenge yourself with questions about athletes and sporting events',
    icon: <Football />,
    color: '#1565c0' 
  },
  { 
    title: 'Geography', 
    description: 'Travel the world with questions about countries, landmarks, and more',
    icon: <MapPin />,
    color: '#00695c' 
  },
  { 
    title: 'Movies', 
    description: 'How well do you know films, directors, and movie stars?',
    icon: <Film />,
    color: '#6a1b9a' 
  },
  { 
    title: 'Music', 
    description: 'Test your knowledge of bands, songs, and musical history',
    icon: <Music />,
    color: '#d84315' 
  },
  { 
    title: 'Technology', 
    description: 'Questions about computers, gadgets, and tech innovations',
    icon: <Code />,
    color: '#283593' 
  },
  { 
    title: 'Food', 
    description: 'Satisfy your appetite for culinary knowledge',
    icon: <Pizza />,
    color: '#827717' 
  },
  { 
    title: 'Gaming', 
    description: 'Level up your knowledge about video games and gaming culture',
    icon: <Gamepad2 />,
    color: '#ad1457' 
  },
];

const Home: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ textAlign: 'center', mb: 6 }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ 
          fontWeight: 700, 
          background: 'linear-gradient(45deg, #ff00ff, #00e5ff)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2
        }}>
          Welcome to BrainQuiz!
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
          Choose a category and test your knowledge with our challenging quizzes
        </Typography>

        {currentUser && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            Logged in as: <Box component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>{currentUser.email}</Box>
          </Typography>
        )}
      </Box>

      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={category.title}
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <CategoryCard
              title={category.title}
              description={category.description}
              icon={category.icon}
              color={category.color}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import Header from './components/Header';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { QuizProvider } from './contexts/QuizContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <QuizProvider>
          <Router>
            <Box
              sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'radial-gradient(circle at center, #0f2942 0%, #0a1929 100%)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background decorative elements */}
              <Box
                sx={{
                  position: 'fixed',
                  top: -100,
                  right: -100,
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 0, 255, 0.1) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: 'fixed',
                  bottom: -150,
                  left: -150,
                  width: 400,
                  height: 400,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                  zIndex: 0,
                }}
              />

              <Header />
              <Box component="main" sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/quiz/:category" element={<Quiz />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </Box>
            </Box>
          </Router>
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuizContextType {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  livesLeft: number;
  setLivesLeft: React.Dispatch<React.SetStateAction<number>>;
  hintsLeft: number;
  setHintsLeft: React.Dispatch<React.SetStateAction<number>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [livesLeft, setLivesLeft] = useState(3);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [category, setCategory] = useState('');

  const resetQuiz = () => {
    setScore(0);
    setLivesLeft(3);
    setHintsLeft(3);
  };

  return (
    <QuizContext.Provider
      value={{
        score,
        setScore,
        livesLeft,
        setLivesLeft,
        hintsLeft,
        setHintsLeft,
        category,
        setCategory,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
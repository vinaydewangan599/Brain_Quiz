# BrainQuiz - Test Your Knowledge

BrainQuiz is an interactive quiz application designed to challenge and entertain users with questions across a variety of categories. It features user authentication, score tracking, and a dynamic user interface.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Firebase Configuration](#firebase-configuration)
  - [Running Locally](#running-locally)
- [Available Scripts](#available-scripts)
- [Usage](#usage)
- [Codebase Overview](#codebase-overview)
  - [Styling](#styling)
  - [State Management](#state-management)
  - [Routing](#routing)
  - [Data](#data)
- [License](#license)

## Features

- **User Authentication:** Secure login and registration using Firebase Authentication (Google Sign-In).
- **Diverse Quiz Categories:** Choose from multiple categories like Anime, History, Science, Sports, Geography, and Movies. (Note: Some categories like Music, Technology, Food, Gaming are placeholders for future expansion as seen in `src/data/questions.json`).
- **Interactive Quiz Experience:** Engaging question format with multiple-choice answers.
- **Scoring System:** Tracks user's score throughout the quiz.
- **Lives System:** Users have a limited number of lives.
- **Hints System:** Users can use hints to help answer questions.
- **Results Page:** Displays the user's performance after completing a quiz.
- **Dynamic UI:** Smooth transitions and a visually appealing interface with animated gradient backgrounds and decorative elements.
- **Sound Effects:** Audio feedback for correct/incorrect answers.

## Tech Stack

- **Frontend:** React 18.x, TypeScript
- **Build Tool:** Vite
- **UI Library:** Material UI (MUI) v5
- **Routing:** React Router DOM v6
- **State Management:** React Context API (`AuthContext`, `QuizContext`)
- **Styling:**
    - Material UI (`sx` prop, `ThemeProvider`)
    - Custom CSS for global styles and animations (see `index.html` and `src/index.css`)
    - (Note: Tailwind CSS is present in `devDependencies` and config files, but `src/main.tsx` indicates a move towards primarily using Material UI for styling.)
- **Linting:** ESLint with TypeScript ESLint (using flat config `eslint.config.js`)
- **Icons:** Lucide React
- **Sound:** `use-sound` library

## Project Structure

```
QuizPulse/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Sound files, images
│   ├── components/             # Reusable React components (CategoryCard, Header, etc.)
│   ├── contexts/               # React Context for global state (AuthContext, QuizContext)
│   ├── data/                   # Quiz questions (questions.json)
│   ├── firebase/               # Firebase configuration and utility functions (firebase.ts)
│   ├── pages/                  # Top-level page components (Home, Login, Quiz, Results)
│   ├── theme/                  # Material UI theme configuration (theme.ts)
│   ├── App.tsx                 # Main application component with routing
│   ├── index.css               # Global CSS styles
│   ├── main.tsx                # Entry point of the React application
│   └── vite-env.d.ts           # Vite environment variables typings
├── .env.example                # Example environment variables file
├── eslint.config.js            # ESLint configuration (flat config)
├── index.html                  # Main HTML file
├── package.json                # Project metadata and dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript compiler options (root)
├── tsconfig.app.json           # TypeScript compiler options (for app)
├── tsconfig.node.json          # TypeScript compiler options (for Node.js scripts like Vite config)
└── vite.config.ts              # Vite configuration
```

## Setup and Installation

### Prerequisites

- Node.js (v18 or later recommended)
- npm (comes with Node.js) or yarn

### Running Locally

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd QuizPulse
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    (If you prefer yarn: `yarn install`)

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, typically on `http://localhost:5173` (the `--host` flag in `package.json` makes it accessible on your local network).

## Available Scripts

In the `package.json` file, you can find the following scripts:

-   `npm run dev`: Starts the development server with Vite. Includes `--host` to expose it on the local network.
-   `npm run build`: Builds the application for production in the `dist` folder.
-   `npm run lint`: Runs ESLint to check for code quality and style issues.
-   `npm run preview`: Serves the production build locally to preview it.

## Usage

1.  Open your browser and navigate to the local development server URL (e.g., `http://localhost:5173`).
2.  You will be greeted by the Home page.
3.  **Login (Optional/Recommended):** Click on the Login button (usually in the Header) to sign in with your Google account. This might be required for saving progress or accessing certain features in future versions.
4.  **Select a Category:** On the Home page, choose a quiz category by clicking on one of the category cards.
5.  **Take the Quiz:**
    *   Answer the multiple-choice questions presented.
    *   Your score, lives left, and hints available will be displayed.
6.  **View Results:** After completing the quiz (either by answering all questions or running out of lives), you will be taken to the Results page to see your final score.

## Codebase Overview

### Styling

-   **Material UI (MUI):** The primary UI library. Components are styled using the `sx` prop for JSS-like styling and a custom theme defined in `src/theme/theme.ts`. `CssBaseline` is used for normalizing styles.
-   **Global CSS:** Basic global styles and the animated background gradient are defined in `index.html` (within `<style>` tags) and `src/index.css`.
-   **Tailwind CSS:** While configuration files (`tailwind.config.js`, `postcss.config.js`) and `tailwindcss` dependency exist, a comment in `src/main.tsx` ("// Remove Tailwind CSS since we're using Material UI") suggests it's not the primary styling method or is being phased out.

### State Management

-   **React Context API:** Used for managing global application state.
    -   `src/contexts/AuthContext.tsx`: Manages user authentication state (current user, loading status).
    -   `src/contexts/QuizContext.tsx`: Manages quiz-related state (score, lives, hints, current category, reset functionality).

### Routing

-   **React Router DOM v6:** Handles client-side routing.
    -   Routes are defined in `src/App.tsx` within the `<Routes>` component.
    -   Key routes include `/` (Home), `/quiz/:category` (Quiz page for a specific category), `/results` (Results page), and `/login` (Login page).

### Data

-   **Quiz Questions:** Stored in `src/data/questions.json`. This JSON file is structured by category, with each category containing an array of question objects.
    -   Currently, question objects primarily contain `correctOption`. Full question details (text, options) would need to be added for a complete quiz experience or are fetched/handled differently.
    -   Some categories (`music`, `technology`, `food`, `gaming`) are present as keys but have empty arrays, indicating areas for future content expansion.

## License

This project is licensed under the ISC License. See the `LICENSE` file (if present) or `package.json` for more details.

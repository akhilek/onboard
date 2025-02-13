import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { OnboardingForm } from './components/OnboardingForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4">
            <h1 className="text-2xl font-bold text-gray-900">PrimeEdgeAI Trucking Onboarding</h1>
          </div>
        </header>
        <OnboardingForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import InputBar from './components/InputBar';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: darkMode ? '#121212' : '#f5f5f5',
        color: darkMode ? '#ffffff' : '#000000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 2,
        }}
      >
        <Box sx={{ flex: 1 }} />
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          fontWeight="bold"
          sx={{ flex: 1, textAlign: 'center'}}
        >
          Clarify
        </Typography>
        <Box sx={{ flex: 1, textAlign: 'right' }}>
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Box>

      {/* Centered Main Text */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="600">
          Bring Clarity to Ideas
        </Typography>
      </Box>

      {/* Input Bar Fixed at Bottom */}
      <Box sx={{ px: 2, pb: 3 }}>
        <InputBar />
      </Box>
    </Box>
  );
};

export default App;

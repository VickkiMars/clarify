import React from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const InputBar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderRadius: '30px',
        px: 2,
        py: 1,
        boxShadow: 'inset 0 0 3px rgba(0,0,0,0.05)',
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder="Ask away..."
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <LinkIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <IconButton
        sx={{
          ml: 1,
          backgroundColor: 'black',
          color: 'white',
          '&:hover': { backgroundColor: '#222' },
        }}
      >
        <ArrowUpwardIcon sx={{ transform: 'rotate(90deg)' }} />
      </IconButton>
    </Box>
  );
};

export default InputBar;

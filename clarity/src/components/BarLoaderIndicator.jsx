import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const BarLoaderIndicator = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="text.secondary">Thinking</Typography>
      <Box
        sx={{
          width: 80,
          height: 8,
          overflow: 'hidden',
          borderRadius: '4px',
          position: 'relative',
          backgroundColor: '#e0e0e0',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            width: '40%',
            backgroundColor: '#000',
            borderRadius: '4px',
            position: 'absolute',
            left: 0,
          }}
          animate={{
            x: ['-40%', '100%'],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.6,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
      </Box>
    </Box>
  );
};

export default BarLoaderIndicator;

import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useAnimationControls } from 'framer-motion';

const BarLoaderIndicator = () => {
  const controls = useAnimationControls();

  useEffect(() => {
    const animateBar = async () => {
      await controls.start({
        x: '100%',
        transition: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        },
      });
    };
    controls.start({ x: '-100%' });
    animateBar();
  }, [controls]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="textSecondary">Thinking...</Typography>
      <Box sx={{ width: '10.4px', height: '10.4px', overflow: 'hidden', border: '1px solid currentColor', borderRadius: '5.2px' }}>
        <motion.div
          animate={controls}
          style={{ width: '100%', height: '100%', backgroundColor: 'currentColor', borderRadius: '5.2px' }}
        />
      </Box>
    </Box>
  );
};

export default BarLoaderIndicator;

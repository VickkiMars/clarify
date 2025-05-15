import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const InputBar = ({ onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => setMessageText(e.target.value);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [messageText]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', justifyContent: 'center' , p: 2,}}>
      <motion.div
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        animate={{
          width: isFocused ? (isMobile ? 'calc(100% - 40px)' : '450px') : (isMobile ? 'calc(100% - 60px)' : '400px'),
          transition: { duration: 0.2 },
        }}
      >
    <TextField
            inputRef={inputRef}
            multiline
            fullWidth
            placeholder="Search or type your message..."
            value={messageText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            sx={{
                '& .MuiInputBase-root': {
                alignItems: 'flex-start',
                maxHeight: '160px',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                },
                scrollbarColor: '#ffffff transparent', // Firefox support
                },
                '& textarea': {
                maxHeight: '160px',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                },
                scrollbarColor: '#ffffff transparent',
                },
            }}
            InputProps={{
                endAdornment: (
                <IconButton onClick={handleSendMessage} sx={{ color: (theme) => theme.palette.primary.main }}>
                    <Send size={24} />
                </IconButton>
                ),
            }}
            />
      </motion.div>
    </Box>
  );
};

export default InputBar;

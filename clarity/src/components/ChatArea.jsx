import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import Message from './Message';

const ChatArea = ({ messages, isSystemThinking, renderThinkingIndicator, cardsEnabled }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isSystemThinking]);

  return (
    <Box
      ref={containerRef}
      sx={{
        flex: 1,               // Fill available space in parent flex container
        overflowY: 'auto',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box',  // Ensures padding included in width/height
      }}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          cardsEnabled={cardsEnabled}
        />
      ))}
      {isSystemThinking && (
        <Box sx={{ alignSelf: 'flex-start', pl: 2 }}>
          {renderThinkingIndicator()}
        </Box>
      )}
    </Box>
  );
};

export default ChatArea;

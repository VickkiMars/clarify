import React, { useRef } from 'react';
import { Box } from '@mui/material';
import Message from './Message';

const ChatArea = ({ messages, isSystemThinking, renderThinkingIndicator, cardsEnabled }) => {
  const containerRef = useRef(null);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          containerRef={containerRef}
          cardsEnabled={cardsEnabled}
        />
      ))}
      {isSystemThinking && (
        <Box sx={{ alignSelf: 'flex-start', paddingLeft: 2 }}>
          {renderThinkingIndicator()}
        </Box>
      )}
    </Box>
  );
};

export default ChatArea;

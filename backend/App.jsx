import React, { useState } from 'react';
import InputBar from './components/InputBar';
import ChatArea from './components/ChatArea';
import BarLoaderIndicator from './components/BarLoaderIndicator';
import { Box, Button } from '@mui/material';
import { marked } from 'marked';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [cardsEnabled, setCardsEnabled] = useState(true);

  const handleSendMessage = async (text) => {
    setMessages(prev => [...prev, { sender: 'user', content: text }]);
    setIsThinking(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/clarify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: text }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || 'Failed to get clarification');
      }

      const data = await response.json();
      const rawMarkdown = `\n${data.explanation || ''}\n`;
      const htmlContent = marked.parse(rawMarkdown);

      setMessages(prev => [
        ...prev,
        {
          sender: 'system',
          content: htmlContent,
          isMarkdown: true,
        },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'system',
          content: `Error: ${error.message || 'Failed to communicate with the server.'}`,
          isMarkdown: false,
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100dvh"
      width="100vw"
      overflow="hidden"
    >
      <Box
        flexGrow={1}
        overflow="auto"
        px={2}
        py={1}
      >
        <Box mb={2} textAlign="left">
          <Button
            variant="outlined"
            onClick={() => setCardsEnabled(prev => !prev)}
          >
            {cardsEnabled ? 'Disband Cards' : 'Enable Cards'}
          </Button>
        </Box>

        <ChatArea
          messages={messages}
          isSystemThinking={isThinking}
          cardsEnabled={cardsEnabled}
          renderThinkingIndicator={() => <BarLoaderIndicator />}
        />
      </Box>

      <Box
        px={2}
        py={1}
        borderTop="1px solid #ccc"
        bgcolor="#fff"
        position="relative"
      >
        <InputBar onSendMessage={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default App;

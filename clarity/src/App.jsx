import React, { useState } from 'react';
import InputBar from './components/InputBar';
import ChatArea from './components/ChatArea';
import BarLoaderIndicator from './components/BarLoaderIndicator';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import { marked } from 'marked';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [cardsEnabled, setCardsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
      let markdownContent = data.explanation || '';

      const markdownMatch = markdownContent.match(/^```markdown\s*([\s\S]*?)```$/i);
      if (markdownMatch && markdownMatch[1]) {
        markdownContent = markdownMatch[1].trim();
      }

      const htmlContent = marked.parse(markdownContent);

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

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100dvh"
      width="100vw"
      overflow="hidden"
      bgcolor={darkMode ? '#303030' : '#fff'}
      color={darkMode ? '#fff' : '#000'}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        borderBottom={darkMode ? '1px solid #555' : '1px solid #ccc'}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Clarify
        </Typography>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
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
        borderTop={darkMode ? '1px solid #555' : '1px solid #ccc'}
        bgcolor={darkMode ? '#424242' : '#fff'}
        position="relative"
      >
        <InputBar onSendMessage={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default App;
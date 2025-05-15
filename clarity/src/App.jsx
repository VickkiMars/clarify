import React, { useState } from 'react';
import InputBar from './components/InputBar';
import ChatArea from './components/ChatArea';
import BarLoaderIndicator from './components/BarLoaderIndicator';
import { Box, Button } from '@mui/material';
import { marked } from 'marked';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [cardsEnabled, setCardsEnabled] = useState(true);

  const handleSendMessage = (text) => {
    setMessages([...messages, { sender: 'user', content: text }]);
    setIsThinking(true);

    setTimeout(() => {
      const markdown = `# The Conclave
**The Conclave** is an elite group of scholars.
## Members
- **Alice**
- **Bob**
- **Eve**

# Objectives
*Research*, *publish*, and *mentor*.`;

      // Store raw markdown string for rendering
      setMessages(prev => [...prev, { sender: 'system', content: markdown, isMarkdown: true }]);
      setIsThinking(false);
    }, 2000);
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
        {/* Toggle Button */}
        <Box mb={2}>
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

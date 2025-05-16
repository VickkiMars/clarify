import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import InputBar from './components/InputBar';
import ChatArea from './components/ChatArea';
import BarLoaderIndicator from './components/BarLoaderIndicator';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [cardsEnabled, setCardsEnabled] = useState(true);

  const predefinedMarkdown = `
# Introduction
This is a **Markdown** response. It includes various elements to test the \`markdownUtils.js\`.

## Features
## More features 

- Headings (H1–H3)
- **Bold text** and *italic text*
- \`inline code\`
- Lists
- Code blocks
- Blockquotes

### Code Sample
\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Blockquote
> This is a sample blockquote.

# Next Section
Here's more markdown content for testing purposes.
`;

  const handleSendMessage = (userText) => {
    setMessages(prev => [...prev, { sender: 'user', content: userText }]);
    setIsThinking(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'system',
          content: predefinedMarkdown,
          isMarkdown: true,
        },
      ]);
      setIsThinking(false);
    }, 1000); // Simulate response delay
  };

  return (
    <Box display="flex" flexDirection="column" height="100dvh" width="100vw" overflow="hidden">
      {/* Top: Toggle Button */}
      <Box px={2} py={1} bgcolor="#f9f9f9" borderBottom="1px solid #ccc">
        <Button variant="outlined" onClick={() => setCardsEnabled(prev => !prev)}>
          {cardsEnabled ? 'Disband Cards' : 'Enable Cards'}
        </Button>
      </Box>

      {/* Middle: Chat Area */}
      <Box flexGrow={1} overflow="auto" px={2} py={1}>
        <ChatArea
          messages={messages}
          isSystemThinking={isThinking}
          cardsEnabled={cardsEnabled}
          renderThinkingIndicator={() => <BarLoaderIndicator />}
        />
      </Box>

      {/* Bottom: Input */}
      <Box px={2} py={1} borderTop="1px solid #ccc" bgcolor="#fff">
        <InputBar onSendMessage={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default App;

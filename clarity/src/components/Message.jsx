import React from 'react';
import { Box, useTheme } from '@mui/material';
import { wrapMarkdownSectionsInCards } from '../utils/markdownUtils';
import { marked } from 'marked';

const Message = ({ message, cardsEnabled }) => {
  const theme = useTheme();
  const isUser = message.sender === 'user';

  const bgColor = isUser
    ? theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'
    : theme.palette.mode === 'dark' ? '#555' : '#D3D3D3';

  if (message.sender === 'system') {
    const rawHtml = marked(message.content);
    const finalHtml = cardsEnabled
      ? wrapMarkdownSectionsInCards(rawHtml)
      : rawHtml;

    return (
      <Box
        sx={{
          maxWidth: '90%',
          padding: 1.5,
          marginBottom: 1,
          borderRadius: '16px',
          alignSelf: 'flex-start',
          backgroundColor: bgColor,
          textAlign: 'left',
          color: theme.palette.text.primary,
          whiteSpace: 'pre-wrap',
        }}
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: finalHtml }}
      />
    );
  }

  return (
    <Box
      sx={{
        maxWidth: '100%',
        padding: 1.5,
        marginBottom: 1,
        borderRadius: '16px',
        alignSelf: 'flex-end',
        backgroundColor: bgColor,
        textAlign: 'right',
        color: theme.palette.text.primary,
        wordBreak: 'break-word',
      }}
    >
      {message.content}
    </Box>
  );
};

export default Message;

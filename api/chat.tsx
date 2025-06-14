// api/chat.js

import axios from 'axios';
import { cvData } from '../src/data/cvData';
import { prompt } from '../src/data/prompt';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: 'No messages provided' });
  }

  try {
    // Add system message with CV data and prompt at the beginning
    const messagesWithContext = [
      {
        role: 'system',
        content: `${prompt()}\n\nCV Data:\n${cvData}`
      },
      ...messages
    ];

    // Configure response for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4.1-nano',
        messages: messagesWithContext,
        temperature: 0.5,
        stream: true, // Enable streaming
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        responseType: 'stream',
      }
    );

    // Handle the streaming response
    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            res.write('data: [DONE]\n\n');
            res.end();
            return;
          }
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content;
            if (content) {
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }
    });

    response.data.on('end', () => {
      res.end();
    });

    response.data.on('error', (error) => {
      console.error('Stream error:', error);
      res.end();
    });

    // Handle client disconnect
    req.on('close', () => {
      response.data.destroy();
    });

  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Failed to fetch response from OpenAI',
      details: error.response ? error.response.data : error.message
    });
  }
};

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

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4.1-nano',
        messages: messagesWithContext,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Failed to fetch response from OpenAI',
      details: error.response ? error.response.data : error.message
    });
  }
};

// src/components/ChatBot.tsx
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import cvData from '../data/cvData';
import prompt from '../data/prompt';
import ReactMarkdown from 'react-markdown';
import { ImSpinner2 } from 'react-icons/im';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! How can I help you today regarding Thomas Viejo? 🤖',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const fetchAssistantMessage = async (userMessage: Message) => {
    try {
      const response = await axios.post('/api/chat', {
        messages: [
          { role: 'system', content: `${prompt}\n${cvData}` },
          ...messages,
          userMessage,
        ],
      });
      return response.data.choices[0].message;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const assistantMessage = await fetchAssistantMessage(userMessage);
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[800px] h-[500px] flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Chat with AI Assistant</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" aria-live="polite" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {loading && (
        <div className="p-4 text-center flex items-center justify-center gap-2">
          <ImSpinner2 className="animate-spin text-3xl text-gray-600" />
          <span className="text-gray-600">Starting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </Card>
  );
};

export default ChatBot;

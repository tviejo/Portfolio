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
  id: string;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      role: 'assistant',
      content: 'Hello! How can I help you today regarding Thomas Viejo? 🤖',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);

  const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    latestMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    const userMessage: Message = { role: 'user', content: input, id: generateId() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const loadingMessage: Message = {
      role: 'assistant',
      content: '',
      id: generateId(),
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const assistantMessageData = await fetchAssistantMessage(userMessage);
      const assistantMessage: Message = {
        role: 'assistant',
        content: assistantMessageData.content,
        id: loadingMessage.id,
      };
      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessage.id ? assistantMessage : msg))
      );
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'assistant',
          content: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="
        w-full max-w-[98%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl 
        min-w-[75%] h-[80vh] 
        flex flex-col mx-auto shadow-lg rounded-md overflow-hidden
      "
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Chat with AI Assistant</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-primary/10 p-2 rounded-full"
          aria-label="Close chat"
        >
          <X className="h-6 w-6 text-blue-500" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" aria-live="polite" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isLoadingMessage = loading && message.role === 'assistant' && !message.content;

            return (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[75%] sm:max-w-[85%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                  ref={
                    index === messages.length - 1 && message.role === 'assistant'
                      ? latestMessageRef
                      : null
                  }
                >
                  {isLoadingMessage ? (
                    <div className="flex items-center gap-2">
                      <ImSpinner2 className="animate-spin text-lg text-gray-600" />
                      <span className="text-gray-600">Typing...</span>
                    </div>
                  ) : (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            Send
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ChatBot;

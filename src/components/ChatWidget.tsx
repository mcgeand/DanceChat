import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '../lib/utils';
import MessageBubble from './MessageBubble';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            'fixed bottom-4 right-4 p-4 rounded-full bg-primary text-primary-foreground',
            'hover:bg-primary/90 transition-colors duration-200'
          )}
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        <Dialog.Content className={cn(
          'fixed right-4 bottom-20 w-[380px] max-h-[600px]',
          'rounded-lg border bg-card text-card-foreground shadow-lg',
          'flex flex-col'
        )}>
          <Dialog.Header className="p-4 border-b">
            <Dialog.Title className="text-lg font-semibold">
              Dance Studio Assistant
            </Dialog.Title>
            <Dialog.Close className="absolute right-4 top-4 opacity-70 hover:opacity-100">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </Dialog.Header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, i) => (
              <MessageBubble key={i} message={message} />
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={cn(
                  'flex-1 min-w-0 rounded-md border border-input',
                  'bg-background px-3 py-2 text-sm',
                  'ring-offset-background placeholder:text-muted-foreground',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-ring focus-visible:ring-offset-2'
                )}
              />
              <button
                type="submit"
                className={cn(
                  'rounded-md bg-primary px-3 py-2 text-sm font-medium',
                  'text-primary-foreground hover:bg-primary/90',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-ring focus-visible:ring-offset-2'
                )}
              >
                Send
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 
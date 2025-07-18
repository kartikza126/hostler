'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, MessageSquare, Send, User, Loader2 } from 'lucide-react';
import { handleChat } from '@/app/actions';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const query = input;
    setInput('');

    startTransition(async () => {
        const formData = new FormData();
        formData.append('query', query);
        const result = await handleChat(formData);
        
        if (result.success && result.response) {
            const assistantMessage: Message = { id: Date.now() + 1, role: 'assistant', content: result.response };
            setMessages((prev) => [...prev, assistantMessage]);
        } else {
             const errorMessage: Message = { id: Date.now() + 1, role: 'assistant', content: "Sorry, I couldn't get a response. Please try again." };
            setMessages((prev) => [...prev, errorMessage]);
        }
    });
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-20 right-4 h-16 w-16 rounded-full shadow-lg"
            style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}
            aria-label="Open chatbot"
          >
            <Bot className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2 font-headline">
                <Bot /> KotaStay Assistant
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3 text-sm max-w-[80%]">
                        <p>Hello! How can I help you find the perfect hostel in Kota today?</p>
                    </div>
                </div>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                     <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'rounded-lg p-3 text-sm max-w-[80%]',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p>{message.content}</p>
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback><User size={20}/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isPending && (
                <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3 text-sm">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-background">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about facilities, prices..."
                className="flex-1"
                disabled={isPending}
              />
              <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

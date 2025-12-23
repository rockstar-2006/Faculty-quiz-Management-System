import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Activity, Zap, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatInterfaceProps {
  onPromptSubmit: (prompt: string) => void;
  isGenerating: boolean;
}

export function AIChatInterface({ onPromptSubmit, isGenerating }: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your AI Knowledge Architect. I can help you synthesize customized assessment modules. Specify difficulty levels (EASY, MEDIUM, HARD) or target specific intellectual domains.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    onPromptSubmit(input);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'SYNTHESIZING: Analyzing request and generating validated question units...',
          timestamp: new Date(),
        },
      ]);
    }, 500);
  };

  const suggestions = [
    '5 EASY MCQS',
    '3 HARD UNITS ON CALC',
    'MIXED 10 (4E, 3M, 3H)',
    '5 DETAILED MCQS'
  ];

  return (
    <Card className="h-[600px] flex flex-col shadow-elevated border-sidebar-border/50 bg-card/60 backdrop-blur-xl overflow-hidden rounded-3xl group">
      {/* Premium Header */}
      <div className="p-6 border-b border-sidebar-border/30 bg-muted/20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-xs uppercase tracking-widest">Neural Architect</h3>
              <Badge className="bg-emerald-500/10 text-emerald-600 text-[8px] font-black uppercase tracking-widest h-4 px-1.5 border-none">ACTIVE</Badge>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5 italic">Intelligence System Operational</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex gap-4",
                  message.role === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all",
                  message.role === 'user' ? 'gradient-primary text-white shadow-glow' : 'bg-muted border border-sidebar-border/50'
                )}>
                  {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={cn(
                  "rounded-2xl p-4 max-w-[85%] shadow-sm relative",
                  message.role === 'user'
                    ? 'bg-primary text-white font-bold text-xs uppercase tracking-tight rounded-tr-none'
                    : 'bg-card border border-sidebar-border/30 text-xs font-medium leading-relaxed rounded-tl-none'
                )}>
                  {message.content}
                  <div className={cn(
                    "text-[8px] mt-2 font-black uppercase tracking-widest opacity-40",
                    message.role === 'user' ? 'text-white/60' : 'text-muted-foreground'
                  )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isGenerating && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 items-center pl-1">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-primary/40 italic">Synthesizing Asset Matrix...</span>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      <div className="p-6 border-t border-sidebar-border/30 bg-muted/10 space-y-6">
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-lg bg-muted border border-sidebar-border/50 text-[9px] font-black uppercase tracking-widest hover:border-primary/50 hover:bg-primary/5 transition-all disabled:opacity-50"
              onClick={() => setInput(suggestion)}
              disabled={isGenerating}
            >
              {suggestion}
            </motion.button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <div className="flex-1 relative group">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="COMMAND: SPECIFY GENERATION PARAMETERS..."
              className="min-h-[60px] max-h-[120px] bg-muted/30 border-sidebar-border/50 rounded-2xl p-4 font-bold text-xs uppercase tracking-tight focus-visible:ring-primary/20 resize-none pr-12 transition-all scrollbar-none"
              disabled={isGenerating}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute right-4 bottom-4 text-xs opacity-20 group-focus-within:opacity-40 transition-opacity">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isGenerating}
            className="h-[60px] w-[60px] gradient-primary rounded-2xl shadow-glow group active:scale-95 transition-all"
          >
            <Send className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </form>
      </div>
    </Card>
  );
}

function Badge({ children, variant, className }: any) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-all",
      variant === 'outline' ? "border border-input bg-background" : "bg-primary text-primary-foreground",
      className
    )}>{children}</span>
  )
}

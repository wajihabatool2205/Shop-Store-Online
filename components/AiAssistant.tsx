
import React, { useState, useRef, useEffect } from 'react';
import { Product, ChatMessage } from '../types';
import { getShoppingAdvice } from '../services/geminiService';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ isOpen, onClose, products }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Lumina. How can I assist with your interior curation today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getShoppingAdvice(userMsg, products);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute bottom-0 right-0 top-0 w-full max-w-md bg-stone-900 text-white shadow-2xl animate-slide-in flex flex-col">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-stone-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase">Lumina Stylist</h2>
              <p className="text-[10px] text-stone-400 uppercase tracking-tighter">AI-Powered Shopping Assistant</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-stone-800 text-stone-200' 
                  : 'bg-white/5 text-white italic border border-white/10'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 px-4 py-3 rounded-2xl animate-pulse flex gap-1">
                <div className="w-1.5 h-1.5 bg-stone-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-stone-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-stone-500 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-stone-900">
          <div className="relative">
            <input 
              type="text"
              placeholder="Ask about materials, dimensions, or styling advice..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full bg-stone-800 border-none rounded-full py-4 pl-6 pr-14 text-sm focus:ring-1 focus:ring-white/20 outline-none placeholder:text-stone-500"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-2 bottom-2 w-10 bg-white text-stone-900 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            </button>
          </div>
          <p className="mt-4 text-[10px] text-center text-stone-500">
            Powered by Gemini AI • Always consult dimensions for specific fits
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { askMathQuestion } from '@/app/actions/chat';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function MathChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '안녕하세요! 궁금한 수학 문제가 있나요? 무엇이든 물어보세요!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const result = await askMathQuestion(userMessage);
    
    if (result.answer) {
      setMessages(prev => [...prev, { role: 'assistant', content: result.answer as string }]);
    } else if (result.error) {
      setMessages(prev => [...prev, { role: 'assistant', content: `❌ 에러: ${result.error}` }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-center gap-4">
        <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-2xl">
          🤖
        </div>
        <div>
          <h2 className="text-white font-black text-lg tracking-tight">AI 수학 튜터</h2>
          <p className="text-blue-100 text-xs opacity-80">무엇이든 물어보세요!</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 dark:bg-slate-950/50"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none shadow-sm'
              }`}
            >
              {msg.content.split('\n').map((line, j) => (
                <p key={j} className={j > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 flex gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="문제를 입력하거나 질문을 남겨주세요..."
          className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-full outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:text-white"
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all active:scale-95 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </button>
      </form>
    </div>
  );
}

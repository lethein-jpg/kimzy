import React from 'react';
import MathChatbot from '@/components/MathChatbot';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] flex flex-col items-center justify-center py-20 px-4">
      
      {/* Welcome Title */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl sm:text-6xl font-black text-[#343A40] tracking-tight">
          AI <span className="text-[#5C7CFA]">Math</span> Tutor
        </h1>
        <p className="text-slate-500 font-medium">인공지능 튜터와 함께 수학을 마스터하세요!</p>
      </div>

      {/* AI Math Chatbot */}
      <section className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <MathChatbot />
      </section>

      {/* Instructions / Footer */}
      <div className="mt-16 text-center text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
        <p>기울기, 내적, 방명록 등 복잡한 기능은 잠시 잊고</p>
        <p>작고 소중한 인형과 함께 즐거운 시간을 보내세요. ✨</p>
      </div>

    </div>
  );
}

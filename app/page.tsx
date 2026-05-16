import React from 'react';
import VectorGame from '@/components/VectorGame';
import Guestbook from '@/components/Guestbook';
import { getGuestbookEntries } from '@/app/actions/guestbook';

export default async function Home() {
  const entries = await getGuestbookEntries();

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full px-4 text-center sm:px-6 lg:px-8 py-20">
      
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          나만의 <span className="text-blue-600 dark:text-blue-500">교육용 웹앱</span> 만들기
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          이 곳은 Vercel과 Neon DB를 연동하여 실제 데이터를 저장할 수 있는 교육용 보일러플레이트입니다.
        </p>
      </section>

      {/* 벡터 게임 컴포넌트 */}
      <section className="w-full max-w-4xl mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <VectorGame />
      </section>

      {/* 방명록 컴포넌트 (Neon DB 연동) */}
      <section className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
        <Guestbook initialEntries={entries} />
      </section>

      <div className="mt-12 p-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 w-full max-w-4xl flex items-center justify-center min-h-[100px]">
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          // 여기에 새로운 기능을 추가해 보세요!
        </p>
      </div>

    </div>
  );
}

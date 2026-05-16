import React from 'react';
import VectorGame from '@/components/VectorGame';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full px-4 text-center sm:px-6 lg:px-8 py-20">
      
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          나만의 <span className="text-blue-600 dark:text-blue-500">교육용 웹앱</span> 만들기
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          이 곳은 Vercel에 즉시 배포할 수 있도록 준비된 가장 단순하고 깔끔한 형태의 기본 보일러플레이트입니다. 복잡한 설정 없이 바로 기능 개발을 시작하세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* 가짜(Placeholder) 버튼 */}
          <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
            시작하기
          </button>
          
          <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
            자세히 알아보기
          </button>
        </div>
      </section>

      {/* 여기에 새로운 컴포넌트를 추가하세요 */}
      <section className="w-full max-w-4xl mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <VectorGame />
      </section>

      <div className="mt-12 p-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 w-full max-w-4xl flex items-center justify-center min-h-[100px]">
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          // 여기에 새로운 컴포넌트가 렌더링될 수 있습니다
        </p>
      </div>

    </div>
  );
}

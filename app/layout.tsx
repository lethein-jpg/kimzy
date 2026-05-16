import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kimlab | 나만의 교육용 웹앱",
  description: "가장 단순하고 깔끔한 교육용 웹 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        {/* 상단 헤더 */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                kimlab
              </span>
            </div>
            {/* 네비게이션 바 공간 */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="#" className="hover:text-blue-600 transition-colors">홈</a>
              <a href="#" className="hover:text-blue-600 transition-colors">강의</a>
              <a href="#" className="hover:text-blue-600 transition-colors">소개</a>
            </nav>
            <div className="md:hidden flex items-center">
               {/* 모바일 메뉴 버튼 공간 */}
               <button aria-label="메뉴 열기" className="p-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
               </button>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* 하단 푸터 */}
        <footer className="border-t bg-white dark:bg-slate-950 py-6 md:py-0">
          <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row px-4 text-sm text-slate-500 dark:text-slate-400">
            <p>&copy; {new Date().getFullYear()} kimlab. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

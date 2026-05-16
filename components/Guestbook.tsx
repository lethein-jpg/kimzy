'use client';

import React, { useRef, useState } from 'react';
import { addGuestbookEntry } from '@/app/actions/guestbook';

type Entry = {
  id: number;
  name: string;
  message: string;
  created_at: Date;
};

export default function Guestbook({ initialEntries }: { initialEntries: any[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const result = await addGuestbookEntry(formData);
    setIsSubmitting(false);

    if (result.success) {
      formRef.current?.reset();
    } else if (result.error) {
      alert(result.error);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-16 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">방명록</h2>
      
      {/* Form */}
      <form 
        ref={formRef}
        action={handleSubmit}
        className="space-y-4 mb-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            name="name"
            placeholder="이름"
            required
            className="sm:col-span-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            name="message"
            placeholder="응원 메시지를 남겨주세요!"
            required
            className="sm:col-span-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? '저장 중...' : '남기기'}
        </button>
      </form>

      {/* List */}
      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {initialEntries.length === 0 ? (
          <p className="text-center text-slate-400 py-10 italic">첫 번째 방명록을 남겨보세요!</p>
        ) : (
          initialEntries.map((entry) => (
            <div key={entry.id} className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-200 dark:hover:border-blue-900">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-700 dark:text-slate-200">{entry.name}</span>
                <span className="text-[10px] text-slate-400">
                  {new Date(entry.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {entry.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

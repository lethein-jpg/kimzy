'use client';

import React, { useState, useRef } from 'react';
import { submitAssignment } from '@/app/actions/assignments';

export default function AssignmentSubmit({ initialAssignments }: { initialAssignments: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for Base64 storage demo
        alert('파일 크기가 너무 큽니다 (최대 2MB).');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(formData: FormData) {
    if (!preview) {
      alert('사진을 선택해주세요.');
      return;
    }

    setIsSubmitting(true);
    // Add base64 data to form data manually since it's not a standard input
    const finalData = new FormData();
    finalData.append('student_name', formData.get('student_name') as string);
    finalData.append('image_data', preview);

    const result = await submitAssignment(finalData);
    setIsSubmitting(false);

    if (result.success) {
      setPreview(null);
      formRef.current?.reset();
      alert('과제가 성공적으로 제출되었습니다!');
    } else if (result.error) {
      alert(result.error);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">과제 제출방</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* 제출 폼 */}
        <div className="space-y-6">
          <form ref={formRef} action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 dark:text-slate-400">제출자 이름</label>
              <input
                name="student_name"
                placeholder="홍길동"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 dark:text-slate-400">과제 사진 첨부</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                  preview ? 'border-indigo-500' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400'
                }`}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    <span className="text-sm">사진 선택 (최대 2MB)</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden" 
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? '과제 제출 중...' : '과제 제출하기'}
            </button>
          </form>
        </div>

        {/* 제출 목록 */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-600 dark:text-slate-400">최근 제출 목록</label>
          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
            {initialAssignments.length === 0 ? (
              <div className="h-40 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 italic">
                제출된 과제가 없습니다.
              </div>
            ) : (
              initialAssignments.map((assignment) => (
                <div key={assignment.id} className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={assignment.image_data} alt={assignment.student_name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{assignment.student_name}</span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(assignment.submitted_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

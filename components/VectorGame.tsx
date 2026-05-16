'use client';

import React, { useState, useEffect } from 'react';

type Vector = { x: number; y: number };

export default function VectorGame() {
  const [vectorA, setVectorA] = useState<Vector>({ x: 0, y: 0 });
  const [vectorB, setVectorB] = useState<Vector>({ x: 0, y: 0 });
  const [userInput, setUserInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'none' }>({
    message: '',
    type: 'none',
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const range = 5;
    const getRandom = () => Math.floor(Math.random() * (range * 2 + 1)) - range;
    
    // Ensure vectors aren't zero
    let a = { x: getRandom(), y: getRandom() };
    let b = { x: getRandom(), y: getRandom() };
    
    while (a.x === 0 && a.y === 0) a = { x: getRandom(), y: getRandom() };
    while (b.x === 0 && b.y === 0) b = { x: getRandom(), y: getRandom() };

    setVectorA(a);
    setVectorB(b);
    setUserInput('');
    setFeedback({ message: '내적 값을 계산해보세요!', type: 'none' });
  };

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
    const userNum = parseInt(userInput);

    if (userNum === correctAnswer) {
      setScore(score + 10);
      setFeedback({ message: '정답입니다! +10점', type: 'success' });
      setTimeout(generateNewProblem, 1500);
    } else {
      setFeedback({ message: `틀렸습니다. 정답은 ${correctAnswer}입니다.`, type: 'error' });
      setTimeout(generateNewProblem, 2000);
    }
  };

  if (!isClient) return null;

  // SVG grid settings
  const size = 300;
  const gridRange = 6;
  const step = size / (gridRange * 2);
  const center = size / 2;

  const toSvgCoord = (v: number, axis: 'x' | 'y') => {
    if (axis === 'x') return center + v * step;
    return center - v * step; // SVG y-axis is inverted
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">벡터 내적 마스터</h2>
        <div className="px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-bold">
          Score: {score}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Visualization */}
        <div className="relative aspect-square bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Grid Lines */}
            {Array.from({ length: gridRange * 2 + 1 }).map((_, i) => (
              <React.Fragment key={i}>
                <line 
                  x1={i * step} y1={0} x2={i * step} y2={size} 
                  stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" 
                />
                <line 
                  x1={0} y1={i * step} x2={size} y2={i * step} 
                  stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" 
                />
              </React.Fragment>
            ))}
            
            {/* Axes */}
            <line x1={0} y1={center} x2={size} y2={center} stroke="currentColor" className="text-slate-400" strokeWidth="2" />
            <line x1={center} y1={0} x2={center} y2={size} stroke="currentColor" className="text-slate-400" strokeWidth="2" />

            {/* Vector A (Blue) */}
            <line 
              x1={center} y1={center} 
              x2={toSvgCoord(vectorA.x, 'x')} y2={toSvgCoord(vectorA.y, 'y')} 
              stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" 
            />
            <circle cx={toSvgCoord(vectorA.x, 'x')} cy={toSvgCoord(vectorA.y, 'y')} r="4" fill="#3B82F6" />
            
            {/* Vector B (Red) */}
            <line 
              x1={center} y1={center} 
              x2={toSvgCoord(vectorB.x, 'x')} y2={toSvgCoord(vectorB.y, 'y')} 
              stroke="#EF4444" strokeWidth="3" strokeLinecap="round" 
            />
            <circle cx={toSvgCoord(vectorB.x, 'x')} cy={toSvgCoord(vectorB.y, 'y')} r="4" fill="#EF4444" />
          </svg>
          
          <div className="absolute bottom-4 left-4 flex gap-4 text-xs font-mono">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-blue-600">a = ({vectorA.x}, {vectorA.y})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-red-600">b = ({vectorB.x}, {vectorB.y})</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">문제</label>
            <p className="text-xl font-bold dark:text-white">
              <span className="text-blue-600">$\vec{a}$</span>와 <span className="text-red-500">$\vec{b}$</span>의 내적 $\vec{a} \cdot \vec{b}$를 구하세요.
            </p>
            <p className="text-sm text-slate-400 italic">힌트: $x_1x_2 + y_1y_2$</p>
          </div>

          <form onSubmit={checkAnswer} className="space-y-4">
            <input
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="답을 입력하세요"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
            >
              제출하기
            </button>
          </form>

          <div className={`p-4 rounded-xl text-center font-medium transition-all ${
            feedback.type === 'success' ? 'bg-green-100 text-green-700' : 
            feedback.type === 'error' ? 'bg-red-100 text-red-700' : 
            'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
          }`}>
            {feedback.message}
          </div>
        </div>
      </div>
    </div>
  );
}

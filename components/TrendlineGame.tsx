'use client';

import React, { useState, useEffect, useMemo } from 'react';

type Point = { x: number; y: number };

export default function TrendlineGame() {
  const [points, setPoints] = useState<Point[]>([]);
  const [m, setM] = useState<number>(0);
  const [b, setB] = useState<number>(50);
  const [isClient, setIsClient] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Generate random data points following a trend
  const generateData = () => {
    const newPoints: Point[] = [];
    const actualM = Math.random() * 2 - 1; // -1 to 1
    const actualB = Math.random() * 40 + 30; // 30 to 70
    
    for (let i = 0; i < 15; i++) {
      const x = i * 6 + 5;
      const noise = (Math.random() - 0.5) * 20;
      const y = actualM * x + actualB + noise;
      newPoints.push({ x, y: Math.max(0, Math.min(100, y)) });
    }
    setPoints(newPoints);
    setM(0);
    setB(50);
    setShowAnswer(false);
  };

  useEffect(() => {
    setIsClient(true);
    generateData();
  }, []);

  // Calculate Mean Squared Error (Loss)
  const loss = useMemo(() => {
    if (points.length === 0) return 0;
    const sumSqError = points.reduce((acc, p) => {
      const predictedY = m * p.x + b;
      return acc + Math.pow(p.y - predictedY, 2);
    }, 0);
    return Math.round(sumSqError / points.length);
  }, [points, m, b]);

  // Simple Linear Regression for the "Best Fit" line
  const bestFit = useMemo(() => {
    if (points.length === 0) return { m: 0, b: 0 };
    const n = points.length;
    const sumX = points.reduce((a, p) => a + p.x, 0);
    const sumY = points.reduce((a, p) => a + p.y, 0);
    const sumXY = points.reduce((a, p) => a + p.x * p.y, 0);
    const sumX2 = points.reduce((a, p) => a + p.x * p.x, 0);
    
    const bestM = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const bestB = (sumY - bestM * sumX) / n;
    return { m: bestM, b: bestB };
  }, [points]);

  if (!isClient) return null;

  const size = 300;
  const scale = size / 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 mt-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">AI 추세선 맞추기</h2>
          <p className="text-sm text-slate-500">오차(Loss)를 최소화하여 최적의 선을 찾아보세요!</p>
        </div>
        <button 
          onClick={generateData}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          title="새 데이터"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Chart Area */}
        <div className="relative aspect-square bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center p-4">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
            {/* Grid */}
            <line x1="0" y1={size} x2={size} y2={size} stroke="#cbd5e1" strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2={size} stroke="#cbd5e1" strokeWidth="2" />
            
            {/* Best Fit Line (Hint) */}
            {showAnswer && (
              <line 
                x1={0} y1={size - bestFit.b * scale} 
                x2={size} y2={size - (bestFit.m * 100 + bestFit.b) * scale} 
                stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" 
              />
            )}

            {/* User Line */}
            <line 
              x1={0} y1={size - b * scale} 
              x2={size} y2={size - (m * 100 + b) * scale} 
              stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" 
            />

            {/* Error Lines (Residuals) */}
            {points.map((p, i) => {
              const predictedY = m * p.x + b;
              return (
                <line 
                  key={`error-${i}`}
                  x1={p.x * scale} y1={size - p.y * scale}
                  x2={p.x * scale} y2={size - predictedY * scale}
                  stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" opacity="0.5"
                />
              );
            })}

            {/* Data Points */}
            {points.map((p, i) => (
              <circle 
                key={i} 
                cx={p.x * scale} 
                cy={size - p.y * scale} 
                r="4" 
                fill="#475569" 
              />
            ))}
          </svg>
          
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loss (MSE)</span>
            <div className={`text-xl font-mono font-bold ${loss < 50 ? 'text-green-500' : 'text-red-500'}`}>
              {loss}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-300">기울기 (Slope: $m$)</label>
                <span className="text-sm font-mono text-blue-600">{m.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="-2" max="2" step="0.05" value={m}
                onChange={(e) => setM(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-300">y절편 (Intercept: $b$)</label>
                <span className="text-sm font-mono text-blue-600">{b.toFixed(0)}</span>
              </div>
              <input 
                type="range" min="0" max="100" step="1" value={b}
                onChange={(e) => setB(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
            <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">학습 포인트</h4>
            <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
              인공지능의 **선형 회귀(Linear Regression)**는 데이터와 선 사이의 거리(오차)의 제곱 합을 최소화하는 과정입니다. 슬라이더를 조절해 빨간 점선들의 길이를 최소로 만들어 보세요!
            </p>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setShowAnswer(!showAnswer)}
              className="flex-1 py-3 px-4 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              {showAnswer ? '정답 숨기기' : '정답 확인'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

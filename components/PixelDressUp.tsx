'use client';

import React, { useState } from 'react';

// Higher Resolution Pixel Art (32x32 Style)
// We'll use a "drawing" approach instead of huge strings to make it more detailed and manageable.

type PixelRect = { x: number; y: number; w: number; h: number; c: string };

const SKIN = '#FFDBAC';
const EYE = '#000000';
const BLUSH = '#FFB6C1';
const WHITE = '#FFFFFF';

const HAIR_COLORS = {
  pink: '#FF69B4',
  brown: '#4B2C20',
  blonde: '#FFD700',
  black: '#1A1A1A'
};

const OUTFIT_COLORS = {
  dress: '#9370DB',
  suit: '#2F4F4F',
  ribbon: '#FF4500',
  gold: '#FFD700',
  teal: '#20B2AA'
};

const PIXEL_DATA = {
  body: [
    // Head
    { x: 10, y: 4, w: 12, h: 11, c: SKIN },
    // Neck
    { x: 15, y: 15, w: 2, h: 2, c: SKIN },
    // Torso
    { x: 12, y: 17, w: 8, h: 8, c: SKIN },
    // Arms
    { x: 9, y: 17, w: 3, h: 7, c: SKIN },
    { x: 20, y: 17, w: 3, h: 7, c: SKIN },
    // Legs
    { x: 12, y: 25, w: 3, h: 6, c: SKIN },
    { x: 17, y: 25, w: 3, h: 6, c: SKIN },
  ],
  face: {
    base: [
      { x: 12, y: 10, w: 2, h: 2, c: EYE }, // Left Eye
      { x: 18, y: 10, w: 2, h: 2, c: EYE }, // Right Eye
      { x: 13, y: 10, w: 1, h: 1, c: WHITE }, // Eye Sparkle
      { x: 19, y: 10, w: 1, h: 1, c: WHITE },
      { x: 15, y: 12, w: 2, h: 1, c: '#FFADAD' }, // Mouth
    ],
    blush: [
      { x: 11, y: 12, w: 2, h: 1, c: BLUSH },
      { x: 19, y: 12, w: 2, h: 1, c: BLUSH },
    ]
  },
  hair: {
    twin: (color: string) => [
      { x: 9, y: 3, w: 14, h: 6, c: color }, // Main top
      { x: 8, y: 5, w: 1, h: 10, c: color }, // Left bang
      { x: 23, y: 5, w: 1, h: 10, c: color }, // Right bang
      { x: 5, y: 8, w: 4, h: 8, c: color }, // Left tail
      { x: 23, y: 8, w: 4, h: 8, c: color }, // Right tail
      { x: 6, y: 7, w: 2, h: 2, c: '#FF4500' }, // Bows
      { x: 24, y: 7, w: 2, h: 2, c: '#FF4500' },
    ],
    bob: (color: string) => [
      { x: 10, y: 3, w: 12, h: 12, c: color },
      { x: 9, y: 6, w: 14, h: 9, c: color },
      { x: 12, y: 3, w: 8, h: 1, c: '#FFFFFF55' }, // Highlight
    ],
    long: (color: string) => [
      { x: 10, y: 3, w: 12, h: 5, c: color },
      { x: 8, y: 5, w: 16, h: 18, c: color },
      { x: 12, y: 8, w: 8, h: 8, c: 'transparent' }, // Face cutout
    ]
  },
  outfits: {
    fancy_dress: [
      { x: 12, y: 17, w: 8, h: 8, c: '#9370DB' }, // Top
      { x: 10, y: 22, w: 12, h: 6, c: '#9370DB' }, // Skirt
      { x: 11, y: 23, w: 10, h: 6, c: '#8A2BE2' }, // Skirt detail
      { x: 14, y: 18, w: 4, h: 3, c: WHITE }, // Collar
      { x: 15, y: 19, w: 2, h: 2, c: '#FF4500' }, // Ribbon
    ],
    school_uniform: [
      { x: 12, y: 17, w: 8, h: 4, c: '#2F4F4F' }, // Jacket
      { x: 11, y: 21, w: 10, h: 5, c: '#483D8B' }, // Plaid skirt
      { x: 14, y: 17, w: 4, h: 2, c: WHITE }, // Shirt
      { x: 15, y: 18, w: 2, h: 2, c: '#B22222' }, // Tie
      { x: 12, y: 21, w: 8, h: 1, c: '#00000033' }, // Belt
    ],
    magical_girl: [
      { x: 11, y: 17, w: 10, h: 7, c: '#FFB6C1' }, // Main
      { x: 9, y: 22, w: 14, h: 5, c: '#FFB6C1' }, // Frills
      { x: 10, y: 23, w: 12, h: 5, c: WHITE }, // Frill layer
      { x: 14, y: 20, w: 4, h: 4, c: '#FFD700' }, // Star emblem
      { x: 9, y: 17, w: 3, h: 3, c: WHITE }, // Puffy sleeves
      { x: 20, y: 17, w: 3, h: 3, c: WHITE },
    ]
  }
};

export default function PixelDressUp() {
  const [hairType, setHairType] = useState<'twin' | 'bob' | 'long'>('twin');
  const [hairColor, setHairColor] = useState<keyof typeof HAIR_COLORS>('pink');
  const [outfitType, setOutfitType] = useState<keyof typeof PIXEL_DATA.outfits>('fancy_dress');
  const [isBlushing, setIsBlushing] = useState(true);

  const gridSize = 32;
  const cellSize = 12; // Controls overall display size

  const renderPixels = (rects: PixelRect[]) => {
    return rects.map((r, i) => (
      <div 
        key={i}
        className="absolute"
        style={{
          left: `${r.x * 100 / gridSize}%`,
          top: `${r.y * 100 / gridSize}%`,
          width: `${r.w * 100 / gridSize}%`,
          height: `${r.h * 100 / gridSize}%`,
          backgroundColor: r.c,
          imageRendering: 'pixelated'
        }}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center bg-white dark:bg-slate-900 p-10 rounded-[50px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-b-8 border-slate-200 dark:border-slate-800">
      
      <div className="flex flex-col xl:flex-row gap-16 items-start">
        
        {/* Doll Stage */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-pink-200 to-blue-200 dark:from-pink-900/20 dark:to-blue-900/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] bg-slate-50 dark:bg-slate-950 rounded-[40px] border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
              style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="absolute inset-0 m-8">
              {/* Layer 1: Body */}
              {renderPixels(PIXEL_DATA.body)}
              
              {/* Layer 2: Face */}
              {renderPixels(PIXEL_DATA.face.base)}
              {isBlushing && renderPixels(PIXEL_DATA.face.blush)}
              
              {/* Layer 3: Hair */}
              {renderPixels(PIXEL_DATA.hair[hairType](HAIR_COLORS[hairColor]))}
              
              {/* Layer 4: Clothes */}
              {renderPixels(PIXEL_DATA.outfits[outfitType])}
            </div>

            {/* Decorative Label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur px-6 py-2 rounded-full border border-pink-100 dark:border-pink-900/30 shadow-sm">
              <span className="text-xs font-black text-pink-500 uppercase tracking-[0.2em]">High Detail Mode</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="w-full max-w-md space-y-8">
          
          {/* Hair Style */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span> Hair Style
            </h3>
            <div className="flex gap-2">
              {(['twin', 'bob', 'long'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setHairType(type)}
                  className={`flex-1 py-3 rounded-2xl border-2 transition-all font-bold text-sm ${
                    hairType === type 
                    ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-md transform -translate-y-1' 
                    : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-pink-200'
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2 pt-2">
              {(Object.keys(HAIR_COLORS) as Array<keyof typeof HAIR_COLORS>).map(color => (
                <button
                  key={color}
                  onClick={() => setHairColor(color)}
                  className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 ${
                    hairColor === color ? 'border-slate-800 dark:border-white' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: HAIR_COLORS[color] }}
                />
              ))}
            </div>
          </div>

          {/* Outfits */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Detailed Outfits
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {(Object.keys(PIXEL_DATA.outfits) as Array<keyof typeof PIXEL_DATA.outfits>).map(type => (
                <button
                  key={type}
                  onClick={() => setOutfitType(type)}
                  className={`flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all font-bold ${
                    outfitType === type 
                    ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-md' 
                    : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-blue-200'
                  }`}
                >
                  <span>{type.replace('_', ' ').toUpperCase()}</span>
                  {outfitType === type && <span className="text-xl">✨</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Bonus Features */}
          <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
            <span className="font-bold text-slate-600 dark:text-slate-300">Blush Effect</span>
            <button 
              onClick={() => setIsBlushing(!isBlushing)}
              className={`w-14 h-8 rounded-full transition-colors relative ${isBlushing ? 'bg-pink-500' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isBlushing ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

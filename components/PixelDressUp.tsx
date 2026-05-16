'use client';

import React, { useState } from 'react';

// Pixel Art Data (16x16)
const PIXEL_MAPS = {
  body: [
    "                ",
    "                ",
    "                ",
    "      1111      ",
    "     111111     ",
    "     111111     ",
    "     111111     ",
    "      1111      ",
    "      1111      ",
    "     111111     ",
    "     111111     ",
    "      1111      ",
    "      1  1      ",
    "      1  1      ",
    "      1  1      ",
    "                "
  ],
  face: {
    normal: [
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "     E    E     ",
      "       v        ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                "
    ],
    blush: [
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "     E    E     ",
      "    B  v   B    ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                "
    ]
  },
  hair: {
    pink: [
      "      HHHH      ",
      "     HHHHHH     ",
      "    HHHHHHHH    ",
      "    HH    HH    ",
      "    HH    HH    ",
      "    HH    HH    ",
      "    HH    HH    ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                "
    ],
    brown: [
      "     BBBBBB     ",
      "    BBBBBBBB    ",
      "   BBBBBBBBBB   ",
      "   BB      BB   ",
      "   BB      BB   ",
      "   BB      BB   ",
      "   BB      BB   ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                "
    ],
    blonde: [
      "      YYYY      ",
      "     YYYYYY     ",
      "    YYYYYYYY    ",
      "    YY    YY    ",
      "    YY    YY    ",
      "    YY    YY    ",
      "    YY    YY    ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                "
    ]
  },
  clothes: {
    dress: [
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "      DDDD      ",
      "     DDDDDD     ",
      "    DDDDDDDD    ",
      "    DDDDDDDD    ",
      "    DDDDDDDD    ",
      "                ",
      "                ",
      "                ",
      "                "
    ],
    overall: [
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "      OOOO      ",
      "      OOOO      ",
      "     OOOOOO     ",
      "     OOOOOO     ",
      "     OO  OO     ",
      "     OO  OO     ",
      "     OO  OO     ",
      "                ",
      "                "
    ],
    sweater: [
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "                ",
      "      SSSS      ",
      "    SSSSSSSS    ",
      "    SSSSSSSS    ",
      "    SSSSSSSS    ",
      "      SSSS      ",
      "                ",
      "                ",
      "                ",
      "                "
    ]
  }
};

const COLORS: Record<string, string> = {
  '1': '#FFDBAC', // Skin
  'E': '#000000', // Eyes
  'v': '#FFADAD', // Mouth/Nose
  'B': '#FFB6C1', // Blush
  'H': '#FF69B4', // Pink Hair
  'B': '#4B2C20', // Brown Hair (Wait, B is used for blush too, let's change brown hair to C)
  'C': '#4B2C20', // Brown Hair
  'Y': '#FFD700', // Blonde
  'D': '#9370DB', // Purple Dress
  'O': '#20B2AA', // Teal Overall
  'S': '#FF7F50', // Coral Sweater
  ' ': 'transparent'
};

// Re-defining Brown hair map to use 'C'
PIXEL_MAPS.hair.brown = PIXEL_MAPS.hair.brown.map(row => row.replace(/B/g, 'C'));

export default function PixelDressUp() {
  const [selectedHair, setSelectedHair] = useState<string>('pink');
  const [selectedClothes, setSelectedClothes] = useState<string>('dress');
  const [isBlushing, setIsBlushing] = useState(false);

  const renderLayer = (map: string[]) => {
    return map.map((row, y) => (
      <div key={y} className="flex">
        {row.split('').map((pixel, x) => (
          <div 
            key={x} 
            className="w-4 h-4 sm:w-6 sm:h-6" 
            style={{ backgroundColor: COLORS[pixel] || 'transparent' }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#F0F4FF] rounded-[40px] shadow-2xl border-8 border-white">
      <h2 className="text-3xl font-black text-[#5C7CFA] mb-8 font-mono tracking-widest uppercase">Pixel Doll Studio</h2>
      
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Doll Display */}
        <div className="relative p-12 bg-white rounded-[32px] shadow-inner border-4 border-[#D0EBFF]">
          <div className="relative w-[256px] h-[256px] sm:w-[384px] sm:h-[384px]">
            {/* Layers */}
            <div className="absolute inset-0 z-10">{renderLayer(PIXEL_MAPS.body)}</div>
            <div className="absolute inset-0 z-20">{renderLayer(isBlushing ? PIXEL_MAPS.face.blush : PIXEL_MAPS.face.normal)}</div>
            <div className="absolute inset-0 z-30">{renderLayer((PIXEL_MAPS.hair as any)[selectedHair])}</div>
            <div className="absolute inset-0 z-40">{renderLayer((PIXEL_MAPS.clothes as any)[selectedClothes])}</div>
          </div>
          
          {/* Decorative Sparkles */}
          <div className="absolute top-4 left-4 text-2xl animate-bounce">✨</div>
          <div className="absolute bottom-4 right-4 text-2xl animate-pulse">💖</div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6 w-full max-w-sm">
          {/* Hair Section */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-[#D0EBFF]">
            <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-tighter">Hair Styles</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.keys(PIXEL_MAPS.hair).map(hair => (
                <button
                  key={hair}
                  onClick={() => setSelectedHair(hair)}
                  className={`py-3 rounded-2xl font-bold transition-all ${
                    selectedHair === hair 
                    ? 'bg-[#5C7CFA] text-white shadow-lg' 
                    : 'bg-[#F1F3F5] text-slate-500 hover:bg-[#E9ECEF]'
                  }`}
                >
                  {hair}
                </button>
              ))}
            </div>
          </section>

          {/* Clothes Section */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-[#D0EBFF]">
            <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-tighter">Outfits</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.keys(PIXEL_MAPS.clothes).map(outfit => (
                <button
                  key={outfit}
                  onClick={() => setSelectedClothes(outfit)}
                  className={`py-3 rounded-2xl font-bold transition-all ${
                    selectedClothes === outfit 
                    ? 'bg-[#FF922B] text-white shadow-lg' 
                    : 'bg-[#F1F3F5] text-slate-500 hover:bg-[#E9ECEF]'
                  }`}
                >
                  {outfit}
                </button>
              ))}
            </div>
          </section>

          {/* Expression Section */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-[#D0EBFF]">
            <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-tighter">Expression</h3>
            <button
              onClick={() => setIsBlushing(!isBlushing)}
              className={`w-full py-4 rounded-2xl font-bold transition-all ${
                isBlushing 
                ? 'bg-[#FF8787] text-white' 
                : 'bg-[#F1F3F5] text-slate-500'
              }`}
            >
              {isBlushing ? 'Hehe~ Blush!' : 'Normal Face'}
            </button>
          </section>
        </div>
      </div>

      <p className="mt-12 text-slate-400 font-mono text-xs uppercase tracking-widest">
        Created for my favorite user 🎀
      </p>
    </div>
  );
}

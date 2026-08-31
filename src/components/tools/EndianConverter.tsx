import React, { useState } from 'react';
import { formatHexByte } from '../../utils/formatters';

export const EndianConverter: React.FC = () => {
  const [hexVal, setHexVal] = useState<string>('12345678');
  const [width, setWidth] = useState<32 | 16>(32);

  const cleanHex = hexVal.replace(/^0x/i, '').replace(/[^0-9a-fA-F]/g, '');
  const paddedHex = cleanHex.padStart(width / 4, '0').slice(0, width / 4);
  const num = parseInt(paddedHex, 16) || 0;

  // Extract Bytes (Big Endian sequence: B0 B1 B2 B3)
  let bytes: number[] = [];
  if (width === 32) {
    bytes = [
      (num >> 24) & 0xff,
      (num >> 16) & 0xff,
      (num >> 8) & 0xff,
      num & 0xff,
    ];
  } else {
    bytes = [(num >> 8) & 0xff, num & 0xff];
  }

  // Reversed bytes (Little Endian)
  const reversedBytes = [...bytes].reverse();
  const swappedHex = reversedBytes.map(formatHexByte).join('');
  const swappedNum = parseInt(swappedHex, 16) || 0;

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Select Mode:</span>
        <div className="flex gap-2">
          {[16, 32].map((w) => (
            <button
              key={w}
              onClick={() => setWidth(w as 16 | 32)}
              className={`px-3 py-1 text-xs font-mono rounded font-semibold transition ${
                width === w
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {w}-bit Swap
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
          Input Hex String (0x)
        </label>
        <input
          type="text"
          value={hexVal}
          onChange={(e) => setHexVal(e.target.value)}
          placeholder={width === 32 ? '12345678' : '1234'}
          className="w-full font-mono text-sm px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Big Endian (Motorola Format) */}
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Big Endian (Motorola / MSB First)
            </span>
            <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400 font-mono">
              Standard Network Byte Order
            </span>
          </div>

          <div className="flex gap-2 font-mono">
            {bytes.map((b, i) => (
              <div key={i} className="flex-1 bg-white dark:bg-slate-950 p-2 rounded border border-slate-300 dark:border-slate-700 text-center">
                <div className="text-xs text-slate-400">Byte {i}</div>
                <div className="text-base font-bold text-brand-600 dark:text-brand-400">0x{formatHexByte(b)}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs font-mono space-y-1 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
            <div>Hex: <span className="font-bold text-slate-900 dark:text-slate-100">0x{paddedHex.toUpperCase()}</span></div>
            <div>Dec (Unsigned): <span className="font-bold text-slate-900 dark:text-slate-100">{num}</span></div>
          </div>
        </div>

        {/* Little Endian (Intel Format) */}
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Little Endian (Intel / LSB First)
            </span>
            <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400 font-mono">
              x86 / ARM Memory Format
            </span>
          </div>

          <div className="flex gap-2 font-mono">
            {reversedBytes.map((b, i) => (
              <div key={i} className="flex-1 bg-white dark:bg-slate-950 p-2 rounded border border-slate-300 dark:border-slate-700 text-center">
                <div className="text-xs text-slate-400">Byte {i}</div>
                <div className="text-base font-bold text-brand-600 dark:text-brand-400">0x{formatHexByte(b)}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs font-mono space-y-1 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
            <div>Hex: <span className="font-bold text-slate-900 dark:text-slate-100">0x{swappedHex.toUpperCase()}</span></div>
            <div>Dec (Unsigned): <span className="font-bold text-slate-900 dark:text-slate-100">{swappedNum}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';

export const BitManipulationCalc: React.FC = () => {
  const [val, setVal] = useState<number>(0x000000a5);
  const [maskVal, setMaskVal] = useState<number>(0x0000000f);

  const toggleBit = (bitIndex: number) => {
    setVal((prev) => prev ^ (1 << bitIndex));
  };

  const setAllBits = () => setVal(0xffffffff);
  const clearAllBits = () => setVal(0x00000000);

  const bits = Array.from({ length: 32 }, (_, i) => 31 - i);

  const hexString = (val >>> 0).toString(16).toUpperCase().padStart(8, '0');
  const binString = (val >>> 0).toString(2).padStart(32, '0');

  // Bitwise Ops with Mask
  const andResult = ((val & maskVal) >>> 0).toString(16).toUpperCase().padStart(8, '0');
  const orResult = ((val | maskVal) >>> 0).toString(16).toUpperCase().padStart(8, '0');
  const xorResult = ((val ^ maskVal) >>> 0).toString(16).toUpperCase().padStart(8, '0');
  const notResult = ((~val) >>> 0).toString(16).toUpperCase().padStart(8, '0');

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Current Register Value</div>
          <div className="text-xl font-mono font-bold text-brand-600 dark:text-brand-400">
            0x{hexString} <span className="text-sm text-slate-400 font-normal">({val >>> 0})</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={setAllBits}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded transition"
          >
            Set All (0xFFFFFFFF)
          </button>
          <button
            onClick={clearAllBits}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded transition"
          >
            Clear All (0x00)
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
          Interactive Bit Field Switches (Bit 31 down to 0) — Click to Toggle
        </label>
        <div className="grid grid-cols-8 sm:grid-cols-16 gap-1 font-mono text-xs">
          {bits.map((bitIdx) => {
            const isSet = ((val >>> bitIdx) & 1) === 1;
            return (
              <button
                key={bitIdx}
                onClick={() => toggleBit(bitIdx)}
                title={`Toggle Bit ${bitIdx}`}
                className={`flex flex-col items-center justify-center p-1.5 rounded border transition cursor-pointer select-none ${
                  isSet
                    ? 'bg-brand-600 text-white border-brand-700 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-400 hover:border-brand-400'
                }`}
              >
                <span className="font-bold text-sm">{isSet ? '1' : '0'}</span>
                <span className="text-[9px] opacity-75">{bitIdx}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bitwise Mask Operations */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            Bitwise Operator Mask (0x)
          </label>
          <input
            type="text"
            value={'0x' + maskVal.toString(16).toUpperCase()}
            onChange={(e) => {
              const num = parseInt(e.target.value.replace(/^0x/i, ''), 16);
              if (!isNaN(num)) setMaskVal(num);
            }}
            className="w-full font-mono text-sm px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800">
            <div className="text-slate-500 font-semibold mb-1">VAL & MASK (AND)</div>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">0x{andResult}</div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800">
            <div className="text-slate-500 font-semibold mb-1">VAL | MASK (OR)</div>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">0x{orResult}</div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800">
            <div className="text-slate-500 font-semibold mb-1">VAL ^ MASK (XOR)</div>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">0x{xorResult}</div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800">
            <div className="text-slate-500 font-semibold mb-1">~VAL (NOT)</div>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">0x{notResult}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


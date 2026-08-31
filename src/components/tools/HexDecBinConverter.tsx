import React, { useState } from 'react';

export const HexDecBinConverter: React.FC = () => {
  const [hexInput, setHexInput] = useState<string>('0x1A2F');
  const [decInput, setDecInput] = useState<string>('6703');
  const [binInput, setBinInput] = useState<string>('0001101000101111');
  const [bitWidth, setBitWidth] = useState<number>(16);

  const updateFromDecimal = (val: number, width: number) => {
    if (isNaN(val)) return;
    const clamped = Math.max(0, val);
    setDecInput(clamped.toString(10));
    setHexInput('0x' + clamped.toString(16).toUpperCase());
    setBinInput(clamped.toString(2).padStart(width, '0'));
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setHexInput(raw);
    const clean = raw.trim().replace(/^0x/i, '');
    const num = parseInt(clean, 16);
    if (!isNaN(num)) {
      setDecInput(num.toString(10));
      setBinInput(num.toString(2).padStart(bitWidth, '0'));
    }
  };

  const handleDecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDecInput(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num)) {
      setHexInput('0x' + num.toString(16).toUpperCase());
      setBinInput(num.toString(2).padStart(bitWidth, '0'));
    }
  };

  const handleBinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^01]/g, '');
    setBinInput(raw);
    if (raw) {
      const num = parseInt(raw, 2);
      if (!isNaN(num)) {
        setDecInput(num.toString(10));
        setHexInput('0x' + num.toString(16).toUpperCase());
      }
    }
  };

  const handleBitWidthSelect = (width: number) => {
    setBitWidth(width);
    const num = parseInt(decInput, 10);
    if (!isNaN(num)) {
      updateFromDecimal(num, width);
    }
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Word Bit Width Padding:</span>
        <div className="flex gap-2">
          {[8, 16, 32].map((w) => (
            <button
              key={w}
              onClick={() => handleBitWidthSelect(w)}
              className={`px-3 py-1 text-xs font-mono rounded font-semibold transition ${
                bitWidth === w
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {w}-bit
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            Hexadecimal (0x)
          </label>
          <input
            type="text"
            value={hexInput}
            onChange={handleHexChange}
            placeholder="0x1A2F"
            className="w-full font-mono text-sm px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            Decimal
          </label>
          <input
            type="text"
            value={decInput}
            onChange={handleDecChange}
            placeholder="6703"
            className="w-full font-mono text-sm px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            Binary
          </label>
          <input
            type="text"
            value={binInput}
            onChange={handleBinChange}
            placeholder="0001101000101111"
            className="w-full font-mono text-sm px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Binary Bit Breakdown</div>
        <div className="flex flex-wrap gap-1 font-mono text-xs">
          {binInput.split('').map((bit, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center w-7 h-9 rounded border ${
                bit === '1'
                  ? 'bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 font-bold'
                  : 'border-slate-300 dark:border-slate-800 text-slate-400'
              }`}
            >
              <span>{bit}</span>
              <span className="text-[9px] text-slate-400 font-normal">{binInput.length - 1 - idx}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';

export const CanFrameVisualizer: React.FC = () => {
  const [canId, setCanId] = useState<string>('0x18FEF100');
  const [dlc, setDlc] = useState<number>(8);
  const [payloadHex, setPayloadHex] = useState<string>('00 64 FF FF 00 00 FF AA');
  const [selectedByteIdx, setSelectedByteIdx] = useState<number | null>(1);

  const cleanBytesHex = payloadHex.replace(/0x/g, '').replace(/[^0-9a-fA-F]/g, '');
  const bytes: number[] = [];
  for (let i = 0; i < dlc * 2; i += 2) {
    const bStr = cleanBytesHex.substring(i, i + 2);
    const b = parseInt(bStr.padEnd(2, '0'), 16);
    bytes.push(isNaN(b) ? 0 : b);
  }

  const handleByteChange = (idx: number, hexVal: string) => {
    const clean = hexVal.replace(/[^0-9a-fA-F]/g, '').slice(0, 2);
    const num = parseInt(clean, 16) || 0;
    const newBytes = [...bytes];
    newBytes[idx] = num;
    setPayloadHex(newBytes.map((b) => b.toString(16).toUpperCase().padStart(2, '0')).join(' '));
  };

  const selectedByteVal = selectedByteIdx !== null && selectedByteIdx < bytes.length ? bytes[selectedByteIdx] : null;
  const selectedByteBin = selectedByteVal !== null ? selectedByteVal.toString(2).padStart(8, '0') : '';

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            CAN Identifier (Hex)
          </label>
          <input
            type="text"
            value={canId}
            onChange={(e) => setCanId(e.target.value)}
            className="w-full font-mono text-sm px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            Data Length Code (DLC): {dlc} Bytes
          </label>
          <input
            type="range"
            min={1}
            max={8}
            value={dlc}
            onChange={(e) => {
              const newDlc = parseInt(e.target.value, 10);
              setDlc(newDlc);
              if (selectedByteIdx !== null && selectedByteIdx >= newDlc) {
                setSelectedByteIdx(newDlc - 1);
              }
            }}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
          Payload Byte Matrix (Click a byte box to inspect individual bit signals)
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 font-mono">
          {bytes.map((b, idx) => {
            const isSelected = selectedByteIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedByteIdx(idx)}
                className={`p-2.5 rounded border text-center cursor-pointer transition select-none ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-700 shadow-md ring-2 ring-brand-400/50'
                    : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800 hover:border-brand-400'
                }`}
              >
                <div className="text-[10px] opacity-75 font-sans">Byte {idx}</div>
                <div className="text-base font-bold">0x{b.toString(16).toUpperCase().padStart(2, '0')}</div>
                <div className="text-[10px] opacity-75">{b} dec</div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedByteIdx !== null && selectedByteVal !== null && (
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Selected Byte {selectedByteIdx} Bit Signal Breakdown
            </span>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span>Edit Hex:</span>
              <input
                type="text"
                maxLength={2}
                value={selectedByteVal.toString(16).toUpperCase().padStart(2, '0')}
                onChange={(e) => handleByteChange(selectedByteIdx, e.target.value)}
                className="w-12 px-1.5 py-0.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded text-center font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-8 gap-1.5 font-mono text-center">
            {selectedByteBin.split('').map((bit, bitIdx) => {
              const bitPos = 7 - bitIdx;
              return (
                <div
                  key={bitIdx}
                  className={`p-2 rounded border ${
                    bit === '1'
                      ? 'bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 font-bold'
                      : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-sm font-bold">{bit}</div>
                  <div className="text-[9px] text-slate-400">Bit {bitPos}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};


import React, { useState } from 'react';
import { parseCanId } from '../../utils/canUtils';

export const CanIdConverter: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('0x18FEF100'); // Sample J1939 Extended CAN ID

  const parsed = parseCanId(inputVal);

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200">
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
          Enter CAN ID (Hex: 0x7DF or 0x18FEF100, or Decimal: 419352832)
        </label>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="0x18FEF100"
          className="w-full font-mono text-base px-3 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-brand-500 font-bold"
        />
        <div className="mt-1 text-xs text-slate-400">
          Supports 11-bit Standard (0x000..0x7FF) and 29-bit Extended CAN IDs (0x00000000..0x1FFFFFFF).
        </div>
      </div>

      {!parsed ? (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded text-xs font-mono text-amber-600 dark:text-amber-400">
          Invalid CAN ID format or value out of range (max 29-bit: 0x1FFFFFFF).
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3 font-mono">
            <div className="bg-slate-100 dark:bg-slate-900 p-3.5 rounded border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-400 font-semibold mb-1">CAN Frame Type</div>
              <div className="text-sm font-bold text-brand-600 dark:text-brand-400">
                {parsed.isExtended ? '29-bit Extended Frame (IDE=1)' : '11-bit Standard Frame (IDE=0)'}
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-900 p-3.5 rounded border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-400 font-semibold mb-1">Hexadecimal</div>
              <div className="text-base font-bold text-slate-900 dark:text-slate-100">{parsed.hex}</div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-900 p-3.5 rounded border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-400 font-semibold mb-1">Decimal</div>
              <div className="text-base font-bold text-slate-900 dark:text-slate-100">{parsed.raw}</div>
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Binary Bit Pattern</div>
            <div className="font-mono text-xs text-brand-600 dark:text-brand-400 font-bold bg-white dark:bg-slate-950 p-3 rounded border border-slate-200 dark:border-slate-800 break-all tracking-widest">
              {parsed.binary}
            </div>
          </div>

          {/* J1939 Field Breakdown for Extended 29-bit CAN IDs */}
          {parsed.isExtended && (
            <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  SAE J1939 Commercial Vehicle Protocol Breakdown
                </span>
                <span className="text-[10px] bg-brand-500/10 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded font-mono font-bold">
                  SAE J1939 Standard
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 font-mono text-xs">
                <div className="bg-white dark:bg-slate-950 p-3 rounded border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 mb-0.5">Priority (3-bits)</div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100">{parsed.priority}</div>
                  <div className="text-[10px] text-slate-500">(0 = Highest, 7 = Lowest)</div>
                </div>

                <div className="bg-white dark:bg-slate-950 p-3 rounded border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 mb-0.5">PGN (Parameter Group)</div>
                  <div className="text-base font-bold text-brand-600 dark:text-brand-400">
                    {parsed.pgn} (0x{parsed.pgn?.toString(16).toUpperCase()})
                  </div>
                  <div className="text-[10px] text-slate-500">PGN Identification</div>
                </div>

                <div className="bg-white dark:bg-slate-950 p-3 rounded border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 mb-0.5">PDU Format (PF)</div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                    0x{parsed.pf?.toString(16).toUpperCase().padStart(2, '0')} ({parsed.pf})
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {parsed.pf && parsed.pf < 240 ? 'PDU1 (Peer-to-Peer)' : 'PDU2 (Broadcast)'}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-950 p-3 rounded border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400 mb-0.5">Source Address (SA)</div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                    0x{parsed.sourceAddress?.toString(16).toUpperCase().padStart(2, '0')} ({parsed.sourceAddress})
                  </div>
                  <div className="text-[10px] text-slate-500">Source ECU Addr</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


import React, { useState } from 'react';

// CRC-8 (SAE J1850 / AUTOSAR, Poly 0x1D)
function calcCrc8(bytes: Uint8Array): number {
  let crc = 0xff;
  for (const b of bytes) {
    crc ^= b;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x80) {
        crc = ((crc << 1) ^ 0x1d) & 0xff;
      } else {
        crc = (crc << 1) & 0xff;
      }
    }
  }
  return crc ^ 0xff;
}

// CRC-16 (CCITT-FALSE, Poly 0x1021, Init 0xFFFF)
function calcCrc16(bytes: Uint8Array): number {
  let crc = 0xffff;
  for (const b of bytes) {
    crc ^= b << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc;
}

// CRC-32 (IEEE 802.3, Standard Poly 0xEDB88320)
function calcCrc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const b of bytes) {
    crc ^= b;
    for (let i = 0; i < 8; i++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xedb88320;
      } else {
        crc = crc >>> 1;
      }
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export const CrcCalculator: React.FC = () => {
  const [hexInput, setHexInput] = useState<string>('01 02 03 04 05 06 07 08');

  const cleanHex = hexInput.replace(/0x/g, '').replace(/[^0-9a-fA-F]/g, '');
  const byteArr: number[] = [];
  for (let i = 0; i < cleanHex.length; i += 2) {
    const b = parseInt(cleanHex.substring(i, i + 2), 16);
    if (!isNaN(b)) byteArr.push(b);
  }
  const bytes = new Uint8Array(byteArr);

  const crc8 = calcCrc8(bytes);
  const crc16 = calcCrc16(bytes);
  const crc32 = calcCrc32(bytes);

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200">
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
          Input Raw Bytes (Hex String, e.g. "01 02 03 04 05")
        </label>
        <input
          type="text"
          value={hexInput}
          onChange={(e) => setHexInput(e.target.value)}
          placeholder="01 02 03 04 05 06 07 08"
          className="w-full font-mono text-sm px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <div className="mt-1 text-xs text-slate-400">
          Parsed Payload Size: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{bytes.length} bytes</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* CRC-8 */}
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">CRC-8 (SAE J1850 / AUTOSAR)</div>
          <div className="text-lg font-mono font-bold text-brand-600 dark:text-brand-400">
            0x{crc8.toString(16).toUpperCase().padStart(2, '0')}
          </div>
          <div className="text-[11px] text-slate-400">Polynomial: 0x1D, Init: 0xFF</div>
        </div>

        {/* CRC-16 */}
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">CRC-16 (CCITT-FALSE)</div>
          <div className="text-lg font-mono font-bold text-brand-600 dark:text-brand-400">
            0x{crc16.toString(16).toUpperCase().padStart(4, '0')}
          </div>
          <div className="text-[11px] text-slate-400">Polynomial: 0x1021, Init: 0xFFFF</div>
        </div>

        {/* CRC-32 */}
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">CRC-32 (IEEE 802.3)</div>
          <div className="text-lg font-mono font-bold text-brand-600 dark:text-brand-400">
            0x{crc32.toString(16).toUpperCase().padStart(8, '0')}
          </div>
          <div className="text-[11px] text-slate-400">Polynomial: 0xEDB88320, Init: 0xFFFFFFFF</div>
        </div>
      </div>
    </div>
  );
};


/**
 * CAN & SAE J1939 Utility functions
 */

export interface ParsedCanId {
  raw: number;
  isExtended: boolean;
  hex: string;
  binary: string;
  // J1939 fields (if extended 29-bit)
  priority?: number;
  dataPage?: number;
  pf?: number; // PDU Format
  ps?: number; // PDU Specific (Group Extension or Destination Address)
  pgn?: number; // Parameter Group Number
  sourceAddress?: number;
}

export function parseCanId(input: string | number): ParsedCanId | null {
  let num: number;

  if (typeof input === 'number') {
    num = input;
  } else {
    const clean = input.trim().replace(/^0x/i, '').replace(/\s+/g, '');
    if (!clean) return null;
    num = parseInt(clean, 16);
  }

  if (isNaN(num) || num < 0 || num > 0x1fffffff) {
    return null;
  }

  const isExtended = num > 0x7ff;
  const hex = num.toString(16).toUpperCase().padStart(isExtended ? 8 : 3, '0');
  const binary = num.toString(2).padStart(isExtended ? 29 : 11, '0');

  if (!isExtended) {
    return {
      raw: num,
      isExtended: false,
      hex: `0x${hex}`,
      binary,
    };
  }

  // 29-bit J1939 Breakdown:
  // Bit 28-26: Priority (3 bits)
  // Bit 25: Reserved/Data Page (1 bit)
  // Bit 24: Data Page (1 bit)
  // Bit 23-16: PDU Format (PF, 8 bits)
  // Bit 15-8: PDU Specific (PS, 8 bits)
  // Bit 7-0: Source Address (SA, 8 bits)
  const priority = (num >> 26) & 0x07;
  const dataPage = (num >> 24) & 0x01;
  const pf = (num >> 16) & 0xff;
  const ps = (num >> 8) & 0xff;
  const sourceAddress = num & 0xff;

  // PGN calculation
  // If PF < 240 (PDU1 format), PS is destination address, PGN = (DP << 16) + (PF << 8)
  // If PF >= 240 (PDU2 format), PS is Group Extension, PGN = (DP << 16) + (PF << 8) + PS
  let pgn: number;
  if (pf < 240) {
    pgn = (dataPage << 16) | (pf << 8);
  } else {
    pgn = (dataPage << 16) | (pf << 8) | ps;
  }

  return {
    raw: num,
    isExtended: true,
    hex: `0x${hex}`,
    binary,
    priority,
    dataPage,
    pf,
    ps,
    pgn,
    sourceAddress,
  };
}


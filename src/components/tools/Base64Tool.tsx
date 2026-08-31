import React, { useState } from 'react';

export const Base64Tool: React.FC = () => {
  const [input, setInput] = useState<string>('Automotive Software Hub SDV 2026');
  const [output, setOutput] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  const processText = (text: string, currentMode: 'encode' | 'decode') => {
    setError(null);
    try {
      if (currentMode === 'encode') {
        // UTF-8 safe encode
        const encoded = btoa(unescape(encodeURIComponent(text)));
        setOutput(encoded);
      } else {
        // UTF-8 safe decode
        const decoded = decodeURIComponent(escape(atob(text)));
        setOutput(decoded);
      }
    } catch (e: any) {
      setError(`Invalid Base64 payload: ${e.message}`);
      setOutput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInput(text);
    processText(text, mode);
  };

  const handleModeToggle = (newMode: 'encode' | 'decode') => {
    setMode(newMode);
    processText(input, newMode);
  };

  return (
    <div className="space-y-4 text-slate-800 dark:text-slate-200">
      <div className="flex gap-2">
        <button
          onClick={() => handleModeToggle('encode')}
          className={`px-4 py-1.5 text-xs font-semibold rounded ${
            mode === 'encode' ? 'bg-brand-600 text-white' : 'bg-slate-200 dark:bg-slate-800'
          }`}
        >
          Encode to Base64
        </button>
        <button
          onClick={() => handleModeToggle('decode')}
          className={`px-4 py-1.5 text-xs font-semibold rounded ${
            mode === 'decode' ? 'bg-brand-600 text-white' : 'bg-slate-200 dark:bg-slate-800'
          }`}
        >
          Decode from Base64
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
          {mode === 'encode' ? 'Plain Text Input' : 'Base64 Encoded Input'}
        </label>
        <textarea
          rows={4}
          value={input}
          onChange={handleInputChange}
          className="w-full font-mono text-sm px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none"
        />
      </div>

      {error && <div className="text-xs font-mono text-red-500 font-semibold">{error}</div>}

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
          {mode === 'encode' ? 'Base64 Result' : 'Decoded Plain Text'}
        </label>
        <textarea
          rows={4}
          readOnly
          value={output}
          className="w-full font-mono text-sm px-3 py-2 bg-slate-200/60 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded focus:outline-none text-brand-600 dark:text-brand-400"
        />
      </div>
    </div>
  );
};


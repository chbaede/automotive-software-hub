import React, { useState } from 'react';

export const UrlEncoderTool: React.FC = () => {
  const [input, setInput] = useState<string>('https://automotive.example.com/api/v1/telematics?topic=sdv&region=europe');
  const [output, setOutput] = useState<string>('https%3A%2F%2Fautomotive.example.com%2Fapi%2Fv1%2Ftelematics%3Ftopic%3Dsdv%26region%3Deurope');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const processText = (text: string, currentMode: 'encode' | 'decode') => {
    try {
      if (currentMode === 'encode') {
        setOutput(encodeURIComponent(text));
      } else {
        setOutput(decodeURIComponent(text));
      }
    } catch {
      setOutput('Error decoding URL string');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    processText(val, mode);
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
          URL Encode Component
        </button>
        <button
          onClick={() => handleModeToggle('decode')}
          className={`px-4 py-1.5 text-xs font-semibold rounded ${
            mode === 'decode' ? 'bg-brand-600 text-white' : 'bg-slate-200 dark:bg-slate-800'
          }`}
        >
          URL Decode Component
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
          {mode === 'encode' ? 'Raw URI String' : 'Percent-Encoded URI String'}
        </label>
        <textarea
          rows={3}
          value={input}
          onChange={handleInputChange}
          className="w-full font-mono text-sm px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
          Output Result
        </label>
        <textarea
          rows={3}
          readOnly
          value={output}
          className="w-full font-mono text-sm px-3 py-2 bg-slate-200/60 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded focus:outline-none text-brand-600 dark:text-brand-400"
        />
      </div>
    </div>
  );
};


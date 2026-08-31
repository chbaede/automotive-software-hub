import React, { useState } from 'react';

export const JsonFormatterTool: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(
      {
        serviceId: '0x1234',
        methodId: '0x0001',
        protocolVersion: 1,
        interfaceVersion: 1,
        messageType: 'REQUEST',
        returnCode: 'E_OK',
        payload: { canId: '0x7DF', dlc: 8, data: [1, 2, 3, 4, 5, 6, 7, 8] },
      },
      null,
      2
    )
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const formatJson = (indent: number = 2) => {
    setErrorMsg(null);
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, indent));
    } catch (e: any) {
      setErrorMsg(`JSON Syntax Error: ${e.message}`);
    }
  };

  const minifyJson = () => {
    setErrorMsg(null);
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
    } catch (e: any) {
      setErrorMsg(`JSON Syntax Error: ${e.message}`);
    }
  };

  return (
    <div className="space-y-4 text-slate-800 dark:text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        <div className="flex gap-2">
          <button
            onClick={() => formatJson(2)}
            className="px-3 py-1 text-xs font-semibold bg-brand-600 text-white rounded hover:bg-brand-700 transition"
          >
            Format (2 Spaces)
          </button>
          <button
            onClick={() => formatJson(4)}
            className="px-3 py-1 text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded transition"
          >
            Format (4 Spaces)
          </button>
          <button
            onClick={minifyJson}
            className="px-3 py-1 text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded transition"
          >
            Minify JSON
          </button>
        </div>

        {errorMsg ? (
          <span className="text-xs text-red-500 font-bold font-mono">Invalid JSON</span>
        ) : (
          <span className="text-xs text-emerald-500 font-bold font-mono">Valid JSON</span>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-xs font-mono text-red-600 dark:text-red-400">
          {errorMsg}
        </div>
      )}

      <div>
        <textarea
          rows={10}
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            try {
              JSON.parse(e.target.value);
              setErrorMsg(null);
            } catch (err: any) {
              setErrorMsg(err.message);
            }
          }}
          className="w-full font-mono text-sm px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none"
        />
      </div>
    </div>
  );
};


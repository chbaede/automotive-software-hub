import React, { useState } from 'react';

export const TimestampConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState<string>(() => Math.floor(Date.now() / 1000).toString());
  const [isMillis, setIsMillis] = useState<boolean>(false);

  const num = parseInt(timestamp, 10);
  let dateObj: Date | null = null;
  if (!isNaN(num)) {
    const millis = isMillis ? num : num * 1000;
    dateObj = new Date(millis);
  }

  const setCurrentTime = () => {
    const now = Date.now();
    setTimestamp(isMillis ? now.toString() : Math.floor(now / 1000).toString());
  };

  const isoString = dateObj && !isNaN(dateObj.getTime()) ? dateObj.toISOString() : 'Invalid Date';
  const utcString = dateObj && !isNaN(dateObj.getTime()) ? dateObj.toUTCString() : 'Invalid Date';
  const localString = dateObj && !isNaN(dateObj.getTime()) ? dateObj.toLocaleString() : 'Invalid Date';

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setIsMillis(false)}
            className={`px-3 py-1 text-xs font-semibold rounded ${
              !isMillis ? 'bg-brand-600 text-white' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            Seconds (s)
          </button>
          <button
            onClick={() => setIsMillis(true)}
            className={`px-3 py-1 text-xs font-semibold rounded ${
              isMillis ? 'bg-brand-600 text-white' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            Milliseconds (ms)
          </button>
        </div>

        <button
          onClick={setCurrentTime}
          className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
        >
          Set to Current Time
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
          Unix Timestamp ({isMillis ? 'ms' : 'sec'})
        </label>
        <input
          type="text"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="w-full font-mono text-sm px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none"
        />
      </div>

      <div className="grid gap-3 font-mono text-xs">
        <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800">
          <div className="text-slate-400 font-semibold mb-0.5">ISO-8601 UTC Format</div>
          <div className="text-sm font-bold text-brand-600 dark:text-brand-400">{isoString}</div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800">
          <div className="text-slate-400 font-semibold mb-0.5">UTC String</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{utcString}</div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800">
          <div className="text-slate-400 font-semibold mb-0.5">Local System Timezone</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{localString}</div>
        </div>
      </div>
    </div>
  );
};


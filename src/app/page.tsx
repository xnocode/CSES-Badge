'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [userId, setUserId] = useState('3');
  const [theme, setTheme] = useState('github');
  const [style, setStyle] = useState('modern');
  const [color, setColor] = useState('#2563eb');
  const [customColor, setCustomColor] = useState('');
  const [label, setLabel] = useState('CSES');
  const [showTotal, setShowTotal] = useState(true);
  const [showPercent, setShowPercent] = useState(true);
  const [logo, setLogo] = useState(true);
  const [viewType, setViewType] = useState('card'); // 'badge' or 'card'

  const [badgeUrl, setBadgeUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate URL based on selected settings
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const origin = window.location.origin;
    const path = viewType === 'card' ? '/api/card' : '/api/badge';
    const params = new URLSearchParams();

    params.set('user', userId || '3');
    if (theme !== 'github') params.set('theme', theme);
    if (style !== 'rounded') params.set('style', style);
    
    const finalColor = customColor ? customColor.replace('#', '') : color.replace('#', '');
    if (finalColor && finalColor !== '2ea44f' && finalColor !== '58a6ff' && finalColor !== '2563eb') {
      params.set('color', finalColor);
    }
    
    if (label !== 'CSES' && viewType === 'badge') params.set('label', label);
    if (!showTotal && viewType === 'badge') params.set('showTotal', 'false');
    if (!showPercent) params.set('showPercent', 'false');
    if (!logo && viewType === 'badge') params.set('logo', 'false');

    setBadgeUrl(`${origin}${path}?${params.toString()}`);
  }, [userId, theme, style, color, customColor, label, showTotal, showPercent, logo, viewType]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const markdownCode = `[![CSES Profile](${badgeUrl})](${badgeUrl.replace(/\/api\/(badge|card)/, '/api/badge')})`;
  const htmlCode = `<a href="https://cses.fi/user/${userId}"><img src="${badgeUrl}" alt="CSES Profile" /></a>`;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-between p-6 sm:p-24 selection:bg-rose-500 selection:text-white">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="w-full max-w-5xl flex flex-col gap-12 z-10">
        {/* Header */}
        <div className="text-center sm:text-left flex flex-col gap-3">
          <div className="inline-flex self-center sm:self-start items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            CSES Readme Badge & Card Generator
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Elevate Your CSES Profile.
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            A premium, production-ready SVG renderer for your competitive programming stats. Fully customized, cached, and ready for your GitHub README.
          </p>
        </div>

        {/* Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-6 sm:p-8 rounded-3xl">
            <h2 className="text-xl font-semibold text-white">Customize Layout</h2>

            {/* Type selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">View Type</span>
              <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
                <button
                  onClick={() => setViewType('card')}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                    viewType === 'card'
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Profile Card
                </button>
                <button
                  onClick={() => setViewType('badge')}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                    viewType === 'badge'
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Simple Badge
                </button>
              </div>
            </div>

            {/* User ID */}
            <div className="flex flex-col gap-2">
              <label htmlFor="userId" className="text-xs font-semibold uppercase tracking-wider text-zinc-500">CSES User ID</label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 3"
                className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-white font-medium"
              />
              <span className="text-[11px] text-zinc-500">Must be your numerical User ID from the URL (e.g. cses.fi/user/3)</span>
            </div>

            {/* Theme */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Theme</span>
              <div className="grid grid-cols-3 gap-2">
                {['github', 'dark', 'light'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`py-2 border rounded-xl text-xs font-semibold capitalize transition-all ${
                      theme === t
                        ? 'border-rose-500 bg-rose-500/5 text-white'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Style */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Style</span>
              <div className="grid grid-cols-3 gap-2">
                {['modern', 'rounded', 'flat'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`py-2 border rounded-xl text-xs font-semibold capitalize transition-all ${
                      style === s
                        ? 'border-rose-500 bg-rose-500/5 text-white'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Accent Color</span>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {['#2563eb', '#2ea44f', '#d9534f', '#f59e0b'].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setColor(c);
                        setCustomColor('');
                      }}
                      style={{ backgroundColor: c }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        color === c && !customColor ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="#Hex Code"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-full px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-500 text-xs text-white uppercase font-mono"
                />
              </div>
            </div>

            {/* Config options based on type */}
            {viewType === 'badge' ? (
              <div className="flex flex-col gap-4 border-t border-zinc-800/50 pt-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="labelInput" className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Badge Label</label>
                  <input
                    id="labelInput"
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400 font-medium">Show Total Problems</span>
                    <input
                      type="checkbox"
                      checked={showTotal}
                      onChange={(e) => setShowTotal(e.target.checked)}
                      className="accent-rose-500 w-4 h-4 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400 font-medium">Show Percentage</span>
                    <input
                      type="checkbox"
                      checked={showPercent}
                      onChange={(e) => setShowPercent(e.target.checked)}
                      className="accent-rose-500 w-4 h-4 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400 font-medium">Include Logo</span>
                    <input
                      type="checkbox"
                      checked={logo}
                      onChange={(e) => setLogo(e.target.checked)}
                      className="accent-rose-500 w-4 h-4 rounded"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 border-t border-zinc-800/50 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 font-medium">Show Percentage</span>
                  <input
                    type="checkbox"
                    checked={showPercent}
                    onChange={(e) => setShowPercent(e.target.checked)}
                    className="accent-rose-500 w-4 h-4 rounded"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preview & Code Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            {/* Live Preview Card */}
            <div className="flex flex-col gap-4 bg-zinc-900/30 border border-zinc-800/80 p-8 rounded-3xl items-center justify-center min-h-[300px]">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 self-start mb-2">Live Preview</span>
              {badgeUrl && (
                <div className="bg-transparent p-2 rounded-xl flex items-center justify-center max-w-full overflow-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={badgeUrl}
                    alt="CSES Profile Dynamic Preview"
                    className="max-w-full object-contain drop-shadow-xl"
                  />
                </div>
              )}
            </div>

            {/* Generated Code Card */}
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-6 sm:p-8 rounded-3xl flex flex-col gap-6">
              <h3 className="text-lg font-bold text-white">Embed Code</h3>

              {/* URL */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Image URL</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={badgeUrl}
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-850 rounded-xl text-zinc-300 font-mono text-xs select-all focus:outline-none"
                  />
                  <button
                    onClick={() => copyToClipboard(badgeUrl)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-semibold transition-all shrink-0"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Markdown */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Markdown (Recommended)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={markdownCode}
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-850 rounded-xl text-zinc-300 font-mono text-xs select-all focus:outline-none"
                  />
                  <button
                    onClick={() => copyToClipboard(markdownCode)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-semibold transition-all shrink-0"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* HTML */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">HTML Code</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={htmlCode}
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-850 rounded-xl text-zinc-300 font-mono text-xs select-all focus:outline-none"
                  />
                  <button
                    onClick={() => copyToClipboard(htmlCode)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-semibold transition-all shrink-0"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {copied && (
                <div className="text-xs font-medium text-emerald-500 flex items-center gap-1.5 animate-fade-in self-end">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-zinc-600 text-xs mt-16 sm:mt-24 z-10 flex flex-col gap-2">
        <p>Built as an open-source project under MIT License.</p>
        <p>Not affiliated with cses.fi.</p>
      </footer>
    </main>
  );
}

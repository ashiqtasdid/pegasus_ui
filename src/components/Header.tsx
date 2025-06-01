'use client'

import React from 'react'

interface HeaderProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
  connectionStatus?: 'checking' | 'connected' | 'disconnected' | 'error'
  connectionMessage?: string
  backendInfo?: any
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  onToggleDarkMode, 
  connectionStatus = 'checking',
  connectionMessage = '',
  backendInfo 
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16 gap-8">
      <div className="flex items-center">
        <div className="relative group">
          {/* Enhanced animated glow effect */}
          <div className="absolute inset-0 bg-gradient-conic from-emerald-500 via-cyan-500 via-blue-500 via-purple-500 to-emerald-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 animate-spin-slow transition-all duration-500"></div>
          <div className="relative bg-gradient-conic from-emerald-500 via-cyan-500 via-blue-500 via-purple-500 to-emerald-500 p-5 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm transform group-hover:scale-105 transition-all duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white drop-shadow-lg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
              <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
              <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
        </div>
        <div className="ml-8">
          <h1 className="text-6xl font-black bg-gradient-conic from-emerald-600 via-cyan-600 via-blue-600 via-purple-600 to-emerald-600 dark:from-emerald-400 dark:via-cyan-400 dark:via-blue-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent leading-tight animate-shimmer" 
              style={{ backgroundSize: '400% 400%' }}>
            Plugin Generator
          </h1>
          <p className="text-slate-700 dark:text-slate-200 font-bold text-xl mt-2 flex items-center gap-3">
            ⚡ Create custom Minecraft plugins with AI
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 animate-pulse">
              ULTRA-MODERN
            </span>
          </p>
        </div>
      </div>      {/* Ultra-Modern Controls and Connection Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Enhanced Connection Status Indicator */}
        <div className="group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="relative flex items-center gap-4 px-6 py-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
            <div className={`relative w-5 h-5 rounded-full transition-all duration-300 ${
              connectionStatus === 'connected' ? 'bg-emerald-500 shadow-emerald-500/50 shadow-xl' :
              connectionStatus === 'checking' ? 'bg-amber-500 shadow-amber-500/50 shadow-xl' :
              connectionStatus === 'disconnected' ? 'bg-red-500 shadow-red-500/50 shadow-xl' :
              'bg-orange-500 shadow-orange-500/50 shadow-xl'
            }`}>
              {connectionStatus === 'checking' && (
                <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75"></div>
              )}
              {connectionStatus === 'connected' && (
                <>
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse opacity-75"></div>
                  <div className="absolute inset-1 rounded-full bg-white animate-pulse"></div>
                </>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                {connectionStatus === 'connected' ? '🟢 Backend Online' :
                 connectionStatus === 'checking' ? '🟡 Connecting...' :
                 connectionStatus === 'disconnected' ? '🔴 Backend Offline' :
                 '🟠 Connection Error'}
                <span className="inline-flex w-2 h-2 bg-current rounded-full animate-pulse opacity-60"></span>
              </span>
              {connectionMessage && (
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-44 truncate font-medium" title={connectionMessage}>
                  {connectionMessage}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Ultra-Modern Dark Mode Toggle */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
          <button
            onClick={onToggleDarkMode}
            className="modern-button relative p-5 rounded-3xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all duration-500 shadow-2xl hover:shadow-3xl group-hover:scale-110"
            aria-label="Toggle dark mode"
          >
            <div className="relative w-7 h-7">
              {isDarkMode ? (
                <svg
                  className="absolute inset-0 transition-all duration-500 rotate-0 scale-100 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="absolute inset-0 transition-all duration-500 rotate-0 scale-100 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </div>
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
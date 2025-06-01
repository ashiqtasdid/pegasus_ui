'use client'

import React from 'react'

interface ResponseDisplayProps {
  response: string
  type: 'success' | 'error' | 'loading'
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, type }) => {
  const getStyles = () => {
    const baseStyles = "relative rounded-[2rem] shadow-3xl border backdrop-blur-3xl p-10 transition-all duration-500 overflow-hidden hover:shadow-glow hover:scale-[1.01]"
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-white/[0.08] dark:bg-slate-900/[0.08] border-emerald-500/30 text-emerald-400 dark:text-emerald-300`
      case 'error':
        return `${baseStyles} bg-white/[0.08] dark:bg-slate-900/[0.08] border-red-500/30 text-red-400 dark:text-red-300`
      default:
        return `${baseStyles} bg-white/[0.08] dark:bg-slate-900/[0.08] border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200`
    }
  }

  const formatResponse = (text: string) => {
    return text
      .replace(/(\[Agent\].*?:)/g, '<span class="text-emerald-400 font-black drop-shadow-sm">$1</span>')
      .replace(/(Error:.*)/g, '<span class="text-red-400 font-black drop-shadow-sm">$1</span>')
      .replace(/(WARNING:.*)/g, '<span class="text-amber-400 font-black drop-shadow-sm">$1</span>')
  }

  return (
    <div className="mb-12 group">
      <div className="relative">
        {/* Ultra-modern outer glow */}
        <div className={`absolute inset-0 rounded-[2rem] blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-700 animate-spin-slow ${
          type === 'success' 
            ? 'bg-gradient-conic from-emerald-500/30 via-green-500/30 via-teal-500/30 to-emerald-500/30'
            : type === 'error'
            ? 'bg-gradient-conic from-red-500/30 via-orange-500/30 via-pink-500/30 to-red-500/30'
            : 'bg-gradient-conic from-blue-500/30 via-purple-500/30 via-cyan-500/30 to-blue-500/30'
        }`}></div>
        
        <div className={getStyles()}>
          {/* Ultra-modern animated header */}
          <div className="relative bg-gradient-mesh mb-8 -m-10 p-8 overflow-hidden">
            <div className={`absolute inset-0 backdrop-blur-sm ${
              type === 'success'
                ? 'bg-gradient-to-br from-emerald-600/90 via-green-600/90 to-teal-600/90'
                : type === 'error'
                ? 'bg-gradient-to-br from-red-600/90 via-orange-600/90 to-pink-600/90'
                : 'bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-cyan-600/90'
            }`}></div>
            
            {/* Floating geometric elements */}
            <div className="absolute top-6 right-8 w-20 h-20 bg-white/10 rounded-3xl blur-2xl animate-float"></div>
            <div className="absolute bottom-4 right-12 w-12 h-12 bg-cyan-300/20 rounded-2xl blur-xl animate-float-reverse"></div>
            
            <div className="relative z-10 flex items-center space-x-6">
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
                {type === 'success' ? (
                  <svg className="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : type === 'error' ? (
                  <svg className="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-white animate-spin drop-shadow-lg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-black text-white drop-shadow-lg flex items-center gap-3">
                  {type === 'success' ? '✅ Generation Complete' :
                   type === 'error' ? '❌ Generation Failed' :
                   '⚡ Processing Response'}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 animate-pulse">
                    AI-POWERED
                  </span>
                </h3>
                <p className="text-white/90 text-lg font-bold mt-1 drop-shadow-md">
                  {type === 'success' ? 'Plugin generation successful!' :
                   type === 'error' ? 'An error occurred during generation' :
                   'AI is working on your request...'}
                </p>
              </div>
            </div>
          </div>

          {/* Ultra-modern content area */}
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-3xl blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-2xl blur-xl"></div>
            
            <div className="relative">
              {type === 'loading' && (
                <div className="flex items-center space-x-8 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl animate-pulse"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                      <svg className="animate-spin h-8 w-8 text-white drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-black text-2xl text-slate-700 dark:text-slate-200 drop-shadow-sm">🤖 Generating plugin...</p>
                    <p className="text-slate-600 dark:text-slate-400 font-semibold text-lg mt-2">This may take a few minutes. Please don't close this window.</p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {type !== 'loading' && (
                <div className="prose prose-slate max-w-none prose-invert">
                  <div className="p-8 bg-gradient-to-br from-slate-100/50 to-slate-200/50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
                    <div 
                      className="whitespace-pre-wrap max-h-96 overflow-y-auto custom-scrollbar text-lg leading-relaxed font-medium tracking-wide"
                      dangerouslySetInnerHTML={{ __html: formatResponse(response) }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResponseDisplay
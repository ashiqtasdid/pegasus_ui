'use client'

import React, { useRef, useEffect } from 'react'

interface ChatMessage {
  type: 'user' | 'assistant'
  message: string
}

interface ChatSectionProps {
  messages: ChatMessage[]
  input: string
  isLoading: boolean
  show: boolean
  onInputChange: (value: string) => void
  onSendMessage: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
}

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  input,
  isLoading,
  show,
  onInputChange,
  onSendMessage,
  onKeyDown
}) => {
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, isLoading])
  if (!show) return null
  return (
    <div className="mb-12 group">
      <div className="relative">
        {/* Ultra-modern outer glow with animated conic gradient */}
        <div className="absolute inset-0 bg-gradient-conic from-cyan-500/30 via-purple-500/30 via-emerald-500/30 via-orange-500/30 to-cyan-500/30 rounded-[2rem] blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-700 animate-spin-slow"></div>
        
        <div className="relative bg-white/[0.08] dark:bg-slate-900/[0.08] backdrop-blur-3xl rounded-[2rem] shadow-3xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-glow transition-all duration-700 hover:scale-[1.01]">
          {/* Ultra-modern animated header */}
          <div className="relative bg-gradient-mesh p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/90 via-purple-600/90 to-emerald-600/90 backdrop-blur-sm"></div>
            
            {/* Floating geometric elements */}
            <div className="absolute top-6 right-8 w-24 h-24 bg-white/10 rounded-3xl blur-2xl animate-float"></div>
            <div className="absolute bottom-4 right-12 w-16 h-16 bg-cyan-300/20 rounded-2xl blur-xl animate-float-reverse"></div>
            <div className="absolute top-1/2 right-4 w-8 h-8 bg-white/15 rounded-xl blur-lg animate-pulse-slow"></div>
            
            <div className="relative z-10 flex items-center space-x-6">
              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
                <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-black text-white drop-shadow-lg flex items-center gap-3">
                  💬 Plugin Assistant
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 animate-pulse">
                    AI-POWERED
                  </span>
                </h3>
                <p className="text-white/90 text-xl font-bold mt-2 drop-shadow-md">
                  Ask questions about your generated plugin
                </p>
              </div>
            </div>
          </div>          {/* Ultra-modern Messages */}
          <div className="p-10">
            <div
              ref={messagesRef}
              className="space-y-8 mb-10 max-h-96 overflow-y-auto custom-scrollbar"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} group`}
                >
                  <div
                    className={`max-w-[85%] p-8 rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-500 transform hover:scale-[1.02] ${
                      msg.type === 'assistant'
                        ? 'bg-slate-800/60 text-slate-200 border border-slate-600/30 hover:bg-slate-800/80 hover:border-slate-500/50'
                        : 'bg-gradient-to-br from-emerald-500/90 to-cyan-500/90 text-white ml-auto border border-white/20 hover:from-emerald-400/90 hover:to-cyan-400/90'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {msg.type === 'assistant' && (
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/80 to-cyan-500/80 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 backdrop-blur-sm border border-purple-400/30 shadow-xl">
                          <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      {msg.type === 'user' && (
                        <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 backdrop-blur-sm border border-white/30 shadow-xl order-2">
                          <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <div className={msg.type === 'user' ? 'order-1' : ''}>
                        <p className={`font-black text-lg mb-3 drop-shadow-lg ${
                          msg.type === 'assistant' ? 'text-purple-300' : 'text-white'
                        }`}>
                          {msg.type === 'assistant' ? '🤖 Assistant' : '👤 You'}
                        </p>
                        <p className="leading-relaxed text-lg font-medium drop-shadow-md">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Ultra-modern loading state */}
              {isLoading && (
                <div className="flex justify-start group">
                  <div className="bg-slate-800/60 border border-slate-600/30 p-8 rounded-2xl shadow-2xl backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-500 transform hover:scale-[1.02]">
                    <div className="flex items-center space-x-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500/80 to-cyan-500/80 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-purple-400/30 shadow-xl">
                        <svg className="w-5 h-5 text-white animate-pulse drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce shadow-lg"></div>
                          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-purple-300 font-black text-lg drop-shadow-lg">🧠 Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>            {/* Ultra-modern Input Section */}
            <div className="flex space-x-6">
              <div className="flex-1 relative group">
                {/* Input glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                
                <input
                  type="text"
                  value={input}
                  onChange={(e) => onInputChange(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="relative w-full px-8 py-6 border-2 border-slate-600/50 rounded-2xl bg-slate-800/50 text-slate-200 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/70 transition-all duration-500 placeholder:text-slate-400 backdrop-blur-sm text-lg font-medium shadow-2xl hover:shadow-glow hover:border-slate-500/70 group-focus-within:scale-[1.02]"
                  placeholder="💭 Ask about your plugin..."
                />
                
                {/* Input border shimmer */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500/50 via-transparent to-cyan-500/50 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
              
              <button
                onClick={onSendMessage}
                disabled={isLoading}
                className="group relative overflow-hidden bg-gradient-conic from-purple-600 via-cyan-600 to-purple-600 hover:from-purple-500 hover:via-cyan-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-black text-lg py-6 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 disabled:scale-100 shadow-3xl hover:shadow-glow backdrop-blur-sm border border-white/20 disabled:opacity-50"
              >
                {/* Ultra-modern background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex items-center justify-center">
                  {isLoading ? (
                    <svg className="w-6 h-6 animate-spin drop-shadow-lg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatSection
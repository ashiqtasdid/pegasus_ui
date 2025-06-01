'use client'

import React from 'react'

interface PluginFormProps {
  pluginName: string
  pluginPrompt: string
  isGenerating: boolean
  onPluginNameChange: (value: string) => void
  onPluginPromptChange: (value: string) => void
  onSubmit: () => void
}

const PluginForm: React.FC<PluginFormProps> = ({
  pluginName,
  pluginPrompt,
  isGenerating,
  onPluginNameChange,
  onPluginPromptChange,
  onSubmit,
}) => {
  return (
    <div className="relative mb-12 group">
      {/* Ultra-modern outer glow */}
      <div className="absolute inset-0 bg-gradient-conic from-emerald-500/30 via-cyan-500/30 via-blue-500/30 via-purple-500/30 to-emerald-500/30 rounded-[2rem] blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-700 animate-spin-slow"></div>
      
      {/* Main form container with enhanced glass morphism */}
      <div className="relative bg-white/[0.08] dark:bg-slate-900/[0.08] backdrop-blur-3xl rounded-[2rem] shadow-3xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-glow transition-all duration-700 hover:scale-[1.02]">
        
        {/* Ultra-modern animated header */}
        <div className="relative bg-gradient-mesh p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 via-cyan-600/90 to-blue-600/90 backdrop-blur-sm"></div>
          
          {/* Floating geometric elements */}
          <div className="absolute top-8 right-8 w-32 h-32 bg-white/10 rounded-3xl blur-2xl animate-float"></div>
          <div className="absolute bottom-6 right-16 w-20 h-20 bg-cyan-300/20 rounded-2xl blur-xl animate-float-reverse"></div>
          <div className="absolute top-1/2 right-6 w-12 h-12 bg-white/15 rounded-xl blur-lg animate-pulse-slow"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-4 flex items-center gap-3">
              ⚡ Create Custom Plugin
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 animate-pulse">
                AI-POWERED
              </span>
            </h2>
            <p className="text-white/90 font-bold text-xl leading-relaxed">
              Generate sophisticated Java plugins with cutting-edge AI
            </p>
          </div>
        </div>

        {/* Ultra-modern form content */}
        <div className="p-12 space-y-10">          {/* Plugin Name Input - Ultra Modern */}
          <div className="group relative">
            <label
              htmlFor="pluginName"
              className="block text-xl font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3"
            >
              <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-white text-sm font-bold">
                🏷️
              </span>
              Plugin Name 
              <span className="text-red-500 text-2xl">*</span>
              <span className="ml-auto text-xs px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 font-medium">
                REQUIRED
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-500"></div>
              <input
                type="text"
                id="pluginName"
                value={pluginName}
                onChange={(e) => onPluginNameChange(e.target.value)}
                placeholder="Enter a unique name for your plugin..."
                className="modern-button relative w-full px-8 py-6 border-2 border-slate-200/50 dark:border-slate-600/50 rounded-2xl shadow-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl text-slate-800 dark:text-white focus:outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-500 placeholder:text-slate-400 text-xl font-semibold hover:shadow-2xl focus:shadow-glow"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-all duration-500">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-xl animate-pulse">
                  <svg className="w-5 h-5 text-white font-bold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Use alphanumeric characters and underscores only (e.g., MyPlugin, Economy_Plugin)
            </p>
          </div>          {/* Plugin Description - Ultra Modern */}
          <div className="group relative">
            <label
              htmlFor="pluginPrompt"
              className="block text-xl font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3"
            >
              <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white text-sm font-bold">
                📝
              </span>
              Plugin Description 
              <span className="text-red-500 text-2xl">*</span>
              <span className="ml-auto text-xs px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 font-medium">
                BE DETAILED
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-500"></div>
              <textarea
                id="pluginPrompt"
                value={pluginPrompt}
                onChange={(e) => onPluginPromptChange(e.target.value)}
                placeholder="Describe what you want your plugin to do... Be specific about features, commands, events, and functionality!"
                className="modern-button relative w-full px-8 py-6 border-2 border-slate-200/50 dark:border-slate-600/50 rounded-2xl shadow-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl text-slate-800 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-500 min-h-[280px] resize-y placeholder:text-slate-400 text-lg font-medium hover:shadow-2xl focus:shadow-glow"
                required
              />
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              The more details you provide, the better your plugin will be. Include commands, permissions, and functionality.
            </p>
          </div>

          {/* Ultra-Modern Generate Button */}
          <button
            onClick={onSubmit}
            disabled={isGenerating}
            className="group relative w-full bg-gradient-conic from-emerald-600 via-cyan-600 via-blue-600 via-purple-600 to-emerald-600 hover:from-emerald-700 hover:via-cyan-700 hover:via-blue-700 hover:via-purple-700 hover:to-emerald-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-black py-8 px-10 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] disabled:scale-100 shadow-3xl hover:shadow-glow disabled:shadow-none overflow-hidden text-2xl modern-button"
            style={{ backgroundSize: '400% 400%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center">
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-4 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  🤖 Generating Plugin...                </>
              ) : (
                <>
                  <svg className="mr-3 h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  ⚡ Generate Plugin
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PluginForm
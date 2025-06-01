'use client'

import React from 'react'

interface DownloadSectionProps {
  isDownloading: boolean
  onDownload: () => void
  onReset: () => void
  show: boolean
  pluginName?: string // Add this prop to show the plugin name
}

const DownloadSection: React.FC<DownloadSectionProps> = ({
  isDownloading,
  onDownload,
  onReset,
  show,
  pluginName
}) => {  if (!show) return null

  return (
    <div className="mb-12 group">
      <div className="relative">
        {/* Ultra-modern outer glow */}
        <div className="absolute inset-0 bg-gradient-conic from-emerald-500/30 via-cyan-500/30 via-green-500/30 via-teal-500/30 to-emerald-500/30 rounded-[2rem] blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-700 animate-spin-slow"></div>
        
        {/* Ultra-modern success message */}
        <div className="relative bg-white/[0.08] dark:bg-slate-900/[0.08] backdrop-blur-3xl border border-emerald-500/30 rounded-[2rem] mb-10 shadow-3xl hover:shadow-glow transition-all duration-700 hover:scale-[1.01] overflow-hidden">
          {/* Ultra-modern animated header */}
          <div className="relative bg-gradient-mesh p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 via-cyan-600/90 to-green-600/90 backdrop-blur-sm"></div>
            
            {/* Floating geometric elements */}
            <div className="absolute top-6 right-8 w-24 h-24 bg-white/10 rounded-3xl blur-2xl animate-float"></div>
            <div className="absolute bottom-4 right-12 w-16 h-16 bg-cyan-300/20 rounded-2xl blur-xl animate-float-reverse"></div>
            <div className="absolute top-1/2 right-4 w-8 h-8 bg-white/15 rounded-xl blur-lg animate-pulse-slow"></div>
            
            <div className="relative z-10 flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
                  <svg className="w-10 h-10 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-white drop-shadow-lg flex items-center gap-3 mb-4">
                  ✅ Plugin Generation Complete!
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 animate-pulse">
                    AI-POWERED
                  </span>
                </h3>
                <p className="text-white/90 text-xl font-bold leading-relaxed drop-shadow-md">
                  {pluginName ? (
                    <>Your ultra-modern plugin <span className="text-emerald-300 font-black">{pluginName}.jar</span> is ready for download! Deploy it to your Minecraft server and watch the magic happen. ⚡</>
                  ) : (
                    'Your cutting-edge plugin is now ready for download. Deploy it to your Minecraft server and experience the power of AI-generated code! 🚀'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra-modern Action Buttons */}
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="group relative bg-gradient-conic from-emerald-600 via-cyan-600 via-green-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:via-cyan-700 hover:via-green-700 hover:via-teal-700 hover:to-emerald-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-black py-6 px-12 rounded-2xl transition-all duration-500 transform hover:scale-105 disabled:scale-100 shadow-3xl hover:shadow-glow overflow-hidden text-xl modern-button"
          style={{ backgroundSize: '400% 400%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          <div className="relative flex items-center justify-center">
            {isDownloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-4 h-7 w-7 text-white drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                📦 Downloading Plugin...
              </>
            ) : (
              <>
                <svg className="w-7 h-7 mr-4 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                ⬇️ Download Plugin JAR
              </>
            )}
          </div>
        </button>

        <button
          onClick={onReset}
          className="group relative bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 border border-slate-500/50 text-white font-black py-6 px-12 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-glow overflow-hidden modern-button text-xl backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          <div className="relative flex items-center justify-center">
            <svg className="w-7 h-7 mr-4 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            🆕 Create Another Plugin
          </div>
        </button>
      </div>
    </div>
  )
}

export default DownloadSection
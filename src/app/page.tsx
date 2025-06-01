'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import PluginForm from '@/components/PluginForm'
import ProcessSteps from '@/components/ProcessSteps'
import ResponseDisplay from '@/components/ResponseDisplay'
import DownloadSection from '@/components/DownloadSection'
import ChatSection from '@/components/ChatSection'

// Define the chat message type
type ChatMessage = {
  type: 'user' | 'assistant'
  message: string
}

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const [pluginName, setPluginName] = useState('')
  const [pluginPrompt, setPluginPrompt] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [generateResponse, setGenerateResponse] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showProcessSteps, setShowProcessSteps] = useState(false)
  const [showDownloadSection, setShowDownloadSection] = useState(false)
  const [showChatSection, setShowChatSection] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [responseType, setResponseType] = useState<'success' | 'error' | 'loading'>('loading')
  const [currentPluginName, setCurrentPluginName] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      type: 'assistant',
      message: 'Your plugin has been generated! How can I help you understand how it works?'
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isChatLoading, setIsChatLoading] = useState(false)

  // Error handling state variables
  const [isError, setIsError] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  // Connection status state variables
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected' | 'error'>('checking')
  const [connectionMessage, setConnectionMessage] = useState('')
  const [backendInfo, setBackendInfo] = useState<{
    status?: string;
    message?: string;
    uptime?: number;
    version?: string;
    environment?: string;
    memory?: { heapUsed?: string };
    system?: { platform?: string; arch?: string };
    timestamp?: string;
  } | null>(null)

  // Initialize dark mode and test backend connection
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark) || savedTheme === null
    
    setIsDarkMode(shouldUseDark)
    
    if (shouldUseDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Automatically test backend connection on page load
    testConnectionSilently()
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Update process steps
  const updateProcessStep = (step: number) => {
    setCurrentStep(step)
    setShowProcessSteps(true)
  }

  // Test backend connection silently (automatic on page load)
  const testConnectionSilently = async () => {
    setConnectionStatus('checking')
    setConnectionMessage('Checking backend connection...')
    
    try {
      // Use the new health endpoint
      const response = await fetch('/health/detailed', { 
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      }).catch(() => null)
      
      if (response && response.ok) {        try {
          const healthData = await response.json()
          setConnectionStatus('connected')
          setConnectionMessage('Backend connected and healthy')
          setBackendInfo(healthData)
          return        } catch {
          setConnectionStatus('connected')
          setConnectionMessage('Backend connected (response format unexpected)')
          return
        }
      }
      
      // Fallback methods if health endpoint fails
      const fallbackResponse = await fetch('/api/create', { 
        method: 'OPTIONS',
        signal: AbortSignal.timeout(5000)
      }).catch(() => null)
      
      if (fallbackResponse && (fallbackResponse.ok || fallbackResponse.status === 405 || fallbackResponse.status === 404)) {
        setConnectionStatus('connected')
        setConnectionMessage('Backend reachable (health endpoint unavailable)')
        return
      }
      
      // If all methods fail
      setConnectionStatus('disconnected')
      setConnectionMessage('Cannot connect to backend server')
      
    } catch (error) {
      setConnectionStatus('error')
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      setConnectionMessage(`Connection test failed: ${errorMsg}`)
    }
  }

  // Test backend connection using the health endpoint (no plugin creation)
  const testConnection = async () => {
    try {
      alert('🔍 Testing backend connection...')
      
      // Use the new health endpoint
      const response = await fetch('/health/detailed', { 
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      }).catch(() => null)
      
      if (response && response.ok) {
        try {
          const healthData = await response.json()
          
          const statusMessage = `✅ Backend Connection Successful!
          
🚀 API Status: ${healthData.status || 'unknown'}
📝 Message: ${healthData.message || 'No message'}
⏰ Uptime: ${healthData.uptime ? Math.round(healthData.uptime) + 's' : 'unknown'}
🔧 Version: ${healthData.version || 'unknown'}
🌍 Environment: ${healthData.environment || 'unknown'}
💾 Memory Used: ${healthData.memory?.heapUsed || 'unknown'}
🖥️ Platform: ${healthData.system?.platform || 'unknown'} (${healthData.system?.arch || 'unknown'})
📅 Timestamp: ${healthData.timestamp ? new Date(healthData.timestamp).toLocaleString() : 'unknown'}`
          
          alert(statusMessage);
          return;
            } catch {
          alert('✅ Backend server is healthy, but response format is unexpected.')
          return
        }
      }
      
      // Fallback methods if health endpoint fails
      const fallbackResponse = await fetch('/api/create', { 
        method: 'OPTIONS',
        signal: AbortSignal.timeout(5000)
      }).catch(() => null)
      
      if (fallbackResponse && (fallbackResponse.ok || fallbackResponse.status === 405 || fallbackResponse.status === 404)) {
        alert('⚠️ Backend server is reachable, but health endpoint may not be configured properly.')
        return
      }
      
      // If all methods fail
      alert('❌ Cannot connect to backend server. Please ensure it\'s running on port 3001.')
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      alert(`❌ Connection test failed: ${errorMsg}`)
    }  }

  // Reset form
  const resetForm = () => {
    setPluginName('')
    setPluginPrompt('')
    setGenerateResponse('')
    setShowProcessSteps(false)
    setShowDownloadSection(false)
    setShowChatSection(false)
    setCurrentStep(0)
    setIsError(false)
    setIsComplete(false)
    setErrorMessage('')
    setChatMessages([{
      type: 'assistant',
      message: 'Your plugin has been generated! How can I help you understand how it works?'
    }])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Generate plugin with enhanced error handling
  // NOTE: This function creates actual plugins and may consume AI credits/cost money
  const generatePlugin = async () => {
    if (!pluginName.trim() || !pluginPrompt.trim()) {
      setGenerateResponse('Error: Please provide both plugin name and description.')
      setResponseType('error')
      setIsError(true)
      setErrorMessage('Please provide both plugin name and description.')
      updateProcessStep(1)
      setShowProcessSteps(true)
      return
    }

    if (!/^[a-zA-Z0-9_]+$/.test(pluginName)) {
      setGenerateResponse('Error: Plugin name must contain only letters, numbers, and underscores.')
      setResponseType('error')
      setIsError(true)
      setErrorMessage('Plugin name must contain only letters, numbers, and underscores.')
      updateProcessStep(1)
      setShowProcessSteps(true)
      return
    }

    // Reset states
    setShowDownloadSection(false)
    setShowChatSection(false)
    setIsGenerating(true)
    setIsError(false)
    setIsComplete(false)
    setErrorMessage('')
    updateProcessStep(1)
    setResponseType('loading')
    setGenerateResponse('Generating plugin... This process takes 5-10 minutes. Please be patient and don\'t close this window.')

    try {      setTimeout(() => updateProcessStep(2), 2000)
        const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pluginName,
          prompt: pluginPrompt,
        }),
        signal: AbortSignal.timeout(600000) // 10 minute timeout for plugin generation
      })

      setTimeout(() => updateProcessStep(3), 4000)
      
      // Enhanced error handling
      if (!response.ok) {
        let errorMsg = `Backend server error: ${response.status}`
        
        if (response.status === 502 || response.status === 503) {
          errorMsg = 'Backend server is not available. Please check if the server is running.'
        } else if (response.status === 500) {
          errorMsg = 'Internal server error occurred. Please try again.'
        }
          // Try to get more specific error message
        try {
          const errorData = await response.text()
          if (errorData && !errorData.includes('<!DOCTYPE html>')) {
            errorMsg = errorData.includes('Error:') ? errorData : `${errorMsg}: ${errorData}`
          }
        } catch {
          // If we can't parse the error, keep the generic message
        }
        
        throw new Error(errorMsg)
      }

      const result = await response.text()
      console.log('API Response:', result)
      
      setTimeout(() => updateProcessStep(4), 1000)
      
      setGenerateResponse(result)
      setCurrentPluginName(pluginName)

      // Better success detection
      if (result.includes('Maven build successful') || result.includes('Artifact:') || result.includes('successfully')) {
        setResponseType('success')
        setIsComplete(true)
        setTimeout(() => updateProcessStep(5), 500) // Move to final step
        setShowDownloadSection(true)
        setShowChatSection(true)
      } else if (result.includes('Error:') || result.includes('failed') || result.includes('BUILD FAILURE')) {
        setResponseType('error')
        setIsError(true)
        setErrorMessage('Build failed. Please check the response for details.')
      } else {
        // If we're not sure, default to success if we got a response
        setResponseType('success')
        setIsComplete(true)
        setTimeout(() => updateProcessStep(5), 500) // Move to final step
        setShowDownloadSection(true)
        setShowChatSection(true)
      }
    } catch (error) {
      console.error('Generation error:', error)
      let errorMsg = 'Unknown error occurred'
        if (error instanceof Error) {
        if (error.name === 'TimeoutError' || error.name === 'AbortError') {
          errorMsg = 'Plugin generation timed out after 10 minutes. This may happen with complex plugins. Please try again or simplify your request.'
        } else if (error.message.includes('Failed to fetch') || error.message.includes('ECONNRESET')) {
          errorMsg = 'Connection lost to backend server. The server may have restarted or become unavailable during the long generation process.'
        } else {
          errorMsg = error.message
        }
      }
      
      setGenerateResponse(`Error: ${errorMsg}`)
      setResponseType('error')
      setIsError(true)
      setErrorMessage(errorMsg)
    } finally {
      setIsGenerating(false)
    }
  }

  // Retry plugin generation
  const retryGeneration = () => {
    // Reset all error states
    setIsError(false)
    setErrorMessage('')
    setGenerateResponse('')
    setCurrentStep(0)
    setShowProcessSteps(false)
    setShowDownloadSection(false)
    setShowChatSection(false)
    setIsComplete(false)
    
    // Small delay before retrying to give user feedback
    setTimeout(() => {
      generatePlugin()
    }, 500)
  }

  // Download plugin with enhanced error handling and retry logic
  const downloadPlugin = async () => {
    if (!currentPluginName) {
      alert('No plugin name available. Please generate a plugin first.')
      return
    }

    setIsDownloading(true)

    const maxRetries = 3
    let attempts = 0

    const attemptDownload = async (): Promise<void> => {
      attempts++
      
      try {
        console.log(`Download attempt ${attempts} for plugin: ${currentPluginName}`)
        
        const downloadUrl = `/create/download/${currentPluginName}`
          // Add timeout to the fetch request
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 120000) // 2 minute timeout for download
        
        const response = await fetch(downloadUrl, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'Accept': 'application/octet-stream, application/java-archive, */*',
          }
        })
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          throw new Error(`Download failed: ${response.status} ${response.statusText}`)
        }
        
        // Check if the response actually contains data
        const contentLength = response.headers.get('content-length')
        if (contentLength === '0') {
          throw new Error('Downloaded file is empty')
        }
        
        const blob = await response.blob()
        
        // Verify the blob has content
        if (blob.size === 0) {
          throw new Error('Downloaded file is empty')
        }
        
        // Create download link
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${currentPluginName}.jar`
        a.style.display = 'none'
        
        // Trigger download
        document.body.appendChild(a)
        a.click()
        
        // Cleanup
        setTimeout(() => {
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }, 100)
        
        console.log('Download completed successfully')
        
      } catch (error) {
        console.error(`Download attempt ${attempts} failed:`, error)
        
        // Fix: Type guard for error handling
        const errorMessage = error instanceof Error ? error.message : String(error)
        const errorName = error instanceof Error ? error.name : 'UnknownError'
        
        if (errorName === 'AbortError') {
          throw new Error('Download timed out. Please try again.')
        }
        
        if (attempts < maxRetries && (
          errorMessage.includes('Failed to fetch') || 
          errorMessage.includes('network') ||
          errorMessage.includes('timeout')
        )) {
          console.log(`Retrying download in 2 seconds... (${attempts}/${maxRetries})`)
          await new Promise(resolve => setTimeout(resolve, 2000))
          return attemptDownload()
        }
        
        throw error instanceof Error ? error : new Error(errorMessage)
      }
    }

    try {
      await attemptDownload()
      
      // Show success message
      const successDiv = document.createElement('div')
      successDiv.innerHTML = `
        <div style="
          position: fixed; 
          top: 20px; 
          right: 20px; 
          background: #10b981; 
          color: white; 
          padding: 12px 24px; 
          border-radius: 8px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 9999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
          ✅ Plugin downloaded successfully!
        </div>
      `
      document.body.appendChild(successDiv)
      setTimeout(() => {
        if (document.body.contains(successDiv)) {
          document.body.removeChild(successDiv)
        }
      }, 3000)
      
    } catch (error) {
      console.error('Final download error:', error)
      
      // Show user-friendly error message
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred'
      
      // Create a more user-friendly error dialog
      const errorDiv = document.createElement('div')
      errorDiv.innerHTML = `
        <div style="
          position: fixed; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%);
          background: white; 
          border: 2px solid #ef4444;
          border-radius: 12px; 
          padding: 24px; 
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          z-index: 10000;
          max-width: 400px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
          <h3 style="margin: 0 0 12px 0; color: #ef4444; font-size: 18px;">Download Failed</h3>
          <p style="margin: 0 0 16px 0; color: #374151; line-height: 1.5;">${errorMsg}</p>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                    style="background: #6b7280; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">
              Close
            </button>
            <button onclick="location.reload()" 
                    style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">
              Retry
            </button>
          </div>
        </div>
        <div onclick="this.parentElement.remove()" 
             style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; cursor: pointer;">
        </div>
      `
      document.body.appendChild(errorDiv)
      
    } finally {
      setTimeout(() => {
        setIsDownloading(false)
      }, 1000)
    }
  }

  // Send chat message
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return
    
    const userMessage = chatInput.trim()
    setChatMessages(prev => [...prev, { type: 'user', message: userMessage }])
    setChatInput('')
    setIsChatLoading(true)
    
    try {      const response = await fetch('/api/create/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          pluginName: currentPluginName
        }),
      })
      
      if (!response.ok) {
        throw new Error(`Chat error: ${response.status}`)
      }
      
      const result = await response.text()
      setChatMessages(prev => [...prev, { type: 'assistant', message: result }])
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        type: 'assistant', 
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }])
    } finally {
      setIsChatLoading(false)
    }
  }

  // Handle Enter key in chat input
  const handleChatKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendChatMessage()
    }
  }
  return (
    <div className="min-h-screen relative overflow-hidden transition-all duration-700 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Ultra-modern animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary floating orbs with enhanced blur */}
        <div className="absolute -top-20 -right-20 w-[40rem] h-[40rem] bg-gradient-conic from-pink-500 via-purple-500 to-cyan-500 opacity-20 dark:opacity-10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-[35rem] h-[35rem] bg-gradient-conic from-emerald-400 via-teal-500 to-blue-600 opacity-25 dark:opacity-10 rounded-full blur-3xl animate-float-reverse"></div>
        
        {/* Accent floating elements */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-violet-400/30 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-radial from-cyan-400/25 to-transparent rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Geometric floating shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-purple-400/20 dark:from-pink-400/10 dark:to-purple-400/10 rounded-3xl blur-xl animate-spin-slow"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 dark:from-emerald-400/10 dark:to-teal-400/10 rounded-2xl blur-lg animate-bounce-slow"></div>
      </div>

      {/* Enhanced glass morphism overlay with mesh gradient */}
      <div className="min-h-screen relative backdrop-blur-lg bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-white/5 dark:via-white/2 dark:to-transparent border-t border-white/20 dark:border-white/10">
        <div className="relative max-w-4xl mx-auto px-6 py-8">
        <Header 
          isDarkMode={isDarkMode} 
          onToggleDarkMode={toggleDarkMode}
          connectionStatus={connectionStatus}
          connectionMessage={connectionMessage}
          backendInfo={backendInfo}
        />
        
        <PluginForm
          pluginName={pluginName}
          pluginPrompt={pluginPrompt}
          isGenerating={isGenerating}
          onPluginNameChange={setPluginName}
          onPluginPromptChange={setPluginPrompt}
          onSubmit={generatePlugin}
        />

        <ProcessSteps 
          currentStep={currentStep} 
          show={showProcessSteps} 
          isError={isError}
          isComplete={isComplete}
          errorMessage={errorMessage}
          onRetry={retryGeneration}
        />

        {generateResponse && (
          <ResponseDisplay response={generateResponse} type={responseType} />
        )}

        <DownloadSection
          isDownloading={isDownloading}
          onDownload={downloadPlugin}
          onReset={resetForm}
          show={showDownloadSection && !isError}
          pluginName={currentPluginName}
        />

        <ChatSection
          messages={chatMessages}
          input={chatInput}
          isLoading={isChatLoading}
          show={showChatSection && !isError}
          onInputChange={setChatInput}
          onSendMessage={sendChatMessage}
          onKeyDown={handleChatKeyDown}
        />

        {/* Enhanced Footer with Modern Design */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl px-10 py-8 shadow-2xl border border-slate-200/30 dark:border-slate-700/30 hover:shadow-3xl transition-all duration-500 hover:scale-105">
            <div className="flex flex-col items-center gap-6">
              {/* Main Title */}
              <div className="text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  🚀 Minecraft Plugin Generator
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  Powered by Advanced AI • © 2025 Pegasus Nest
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                <button
                  onClick={testConnection}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 text-white rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 font-semibold text-lg flex items-center gap-3"
                >
                  <span className="flex items-center gap-2">
                    🔧 Test Backend Connection
                    <div className="w-2 h-2 bg-white rounded-full opacity-70 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  </span>
                </button>
                
                {/* Enhanced Connection Status Indicator */}
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-100/80 dark:bg-slate-700/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-600/50">
                  <div className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                    connectionStatus === 'connected' ? 'bg-green-500 shadow-green-500/50 shadow-lg' :
                    connectionStatus === 'checking' ? 'bg-yellow-500 shadow-yellow-500/50 shadow-lg' :
                    connectionStatus === 'disconnected' ? 'bg-red-500 shadow-red-500/50 shadow-lg' :
                    'bg-orange-500 shadow-orange-500/50 shadow-lg'
                  }`}>
                    {connectionStatus === 'checking' && (
                      <div className="absolute inset-0 rounded-full bg-yellow-500 animate-ping opacity-75"></div>
                    )}
                    {connectionStatus === 'connected' && (
                      <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-75"></div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {connectionStatus === 'connected' ? '🟢 Backend Online' :
                       connectionStatus === 'checking' ? '🟡 Connecting...' :
                       connectionStatus === 'disconnected' ? '🔴 Backend Offline' :
                       '🟠 Connection Error'}
                    </span>
                    {connectionMessage && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-48 truncate" title={connectionMessage}>
                        {connectionMessage}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Backend Info Display */}
              {backendInfo && connectionStatus === 'connected' && (
                <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl px-6 py-3 border border-slate-200/30 dark:border-slate-700/30">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div>
                      <span className="font-semibold">Uptime:</span><br />
                      {backendInfo.uptime ? Math.round(backendInfo.uptime) + 's' : 'N/A'}
                    </div>
                    <div>
                      <span className="font-semibold">Version:</span><br />
                      {backendInfo.version || 'N/A'}
                    </div>
                    <div>
                      <span className="font-semibold">Environment:</span><br />
                      {backendInfo.environment || 'N/A'}
                    </div>
                    <div>
                      <span className="font-semibold">Platform:</span><br />
                      {backendInfo.system?.platform || 'N/A'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
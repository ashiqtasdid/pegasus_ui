"use client";

import React from "react";

interface ProcessStepsProps {
  currentStep: number;
  show: boolean;
  isError?: boolean;
  isComplete?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({
  currentStep,
  show,
  isError = false,
  isComplete = false,
  errorMessage,
  onRetry,
}) => {
  const steps = [
    {
      name: "Initialize",
      icon: "🚀",
      description: "Setting up project structure",
      duration: "Processing...",
    },
    {
      name: "AI Analysis",
      icon: "🧠",
      description: "Analyzing requirements with AI",
      duration: "Thinking...",
    },
    {
      name: "Code Generation",
      icon: "⚡",
      description: "Generating Java plugin code",
      duration: "Coding...",
    },
    {
      name: "Build & Compile",
      icon: "🔨",
      description: "Compiling with Maven",
      duration: "Building...",
    },
    {
      name: "Complete",
      icon: "✅",
      description: "Plugin ready for download",
      duration: "Done!",
    },
  ];
  if (!show) return null;
  return (
    <div className="mb-12 group">
      <div className="relative">
        {/* Ultra-modern outer glow */}
        <div className="absolute inset-0 bg-gradient-conic from-purple-500/30 via-cyan-500/30 via-emerald-500/30 via-orange-500/30 to-purple-500/30 rounded-[2rem] blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-700 animate-spin-slow"></div>
        
        <div className="relative bg-white/[0.08] dark:bg-slate-900/[0.08] backdrop-blur-3xl rounded-[2rem] shadow-3xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-glow transition-all duration-700 hover:scale-[1.01]">
          {/* Ultra-modern animated header */}
          <div className="relative bg-gradient-mesh p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-cyan-600/90 to-emerald-600/90 backdrop-blur-sm"></div>
            
            {/* Floating geometric elements */}
            <div className="absolute top-6 right-8 w-24 h-24 bg-white/10 rounded-3xl blur-2xl animate-float"></div>
            <div className="absolute bottom-4 right-12 w-16 h-16 bg-cyan-300/20 rounded-2xl blur-xl animate-float-reverse"></div>
            <div className="absolute top-1/2 right-4 w-8 h-8 bg-white/15 rounded-xl blur-lg animate-pulse-slow"></div>
            
            <div className="relative z-10 flex items-center space-x-6">
              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">                {isError ? (
                  <svg
                    className="w-8 h-8 text-white drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : isComplete ? (
                  <svg
                    className="w-8 h-8 text-white drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8 text-white animate-spin drop-shadow-lg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-3xl font-black text-white drop-shadow-lg flex items-center gap-3">
                  {isError
                    ? "❌ Generation Failed"
                    : isComplete
                    ? "✅ Generation Complete"
                    : "⚡ Generating Plugin"}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 animate-pulse">
                    AI-POWERED
                  </span>
                </h3>
                <p className="text-white/90 text-xl font-bold mt-2 drop-shadow-md">
                  {isError
                    ? errorMessage || "An error occurred during generation"
                    : isComplete
                    ? "Your plugin is ready for download!"
                    : `Processing step ${currentStep} of ${steps.length - 1}...`}
                </p>
              </div>
            </div>
          </div>          {/* Ultra-modern Steps */}
          <div className="p-10">
            <div className="space-y-8">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = currentStep > stepNumber || isComplete;
                const isCurrent =
                  currentStep === stepNumber && !isComplete && !isError;
                const isPending = currentStep < stepNumber && !isComplete;
                const hasError = isError && currentStep === stepNumber;

                return (
                  <div key={stepNumber} className="group relative">                    <div className="flex items-center space-x-8">
                      {/* Ultra-modern Step Icon */}
                      <div className="relative flex-shrink-0">
                        {/* Animated glow for current step */}
                        {isCurrent && (
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-cyan-500/50 rounded-2xl blur-xl animate-pulse"></div>
                        )}
                        <div
                          className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 backdrop-blur-sm border-2 shadow-2xl transform group-hover:scale-105 ${
                            hasError
                              ? "bg-gradient-to-br from-red-500 to-red-600 border-red-400/50 text-white scale-110 shadow-red-500/50"
                              : isCompleted
                              ? "bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400/50 text-white scale-110 shadow-emerald-500/50"
                              : isCurrent
                              ? "bg-gradient-to-br from-purple-500 to-cyan-500 border-purple-400/50 text-white animate-pulse scale-110 shadow-purple-500/50"
                              : "bg-slate-700/50 border-slate-600/50 text-slate-400 hover:bg-slate-600/50"
                          }`}
                        >
                          {hasError ? (
                            <svg
                              className="w-7 h-7"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : isCompleted ? (
                            <svg
                              className="w-7 h-7"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : isCurrent ? (
                            <div className="text-xl">{step.icon}</div>
                          ) : (
                            <span className="font-bold text-lg">{stepNumber}</span>
                          )}

                          {/* Animated ring for current step */}
                          {isCurrent && (
                            <div className="absolute inset-0 rounded-xl border-2 border-purple-400/60 animate-ping opacity-75"></div>
                          )}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4
                              className={`font-black text-2xl transition-colors duration-300 drop-shadow-lg ${
                                hasError
                                  ? "text-red-400"
                                  : isCompleted || isCurrent
                                  ? "text-emerald-400"
                                  : "text-slate-400"
                              }`}
                            >
                              {step.name}
                            </h4>
                            <p
                              className={`text-lg font-bold mt-1 transition-colors duration-300 drop-shadow-md ${
                                hasError
                                  ? "text-red-300"
                                  : isCompleted || isCurrent
                                  ? "text-slate-300"
                                  : "text-slate-500"
                              }`}
                            >
                              {step.description}
                            </p>
                            {isCurrent && !isError && (
                              <div className="mt-2 flex items-center space-x-2">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-purple-400 font-bold text-sm">{step.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>            {/* Overall progress */}
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">
                  Overall Progress
                </span>
                <span
                  className={`font-bold text-lg ${
                    isError
                      ? "text-red-400"
                      : isComplete
                      ? "text-emerald-400"
                      : "text-purple-400"
                  }`}
                >
                  {isError
                    ? "Failed"
                    : isComplete
                    ? "100%"
                    : `${Math.round((currentStep / steps.length) * 100)}%`}
                </span>
              </div>              <div className="mt-3 w-full bg-slate-800/50 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-slate-700/50 shadow-inner">
                <div
                  className={`h-4 rounded-full transition-all duration-500 relative overflow-hidden ${
                    isError
                      ? "bg-gradient-to-r from-red-500 to-red-400"
                      : isComplete
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                      : "bg-gradient-to-r from-purple-500 to-cyan-400"
                  }`}
                  style={{
                    width: isError
                      ? "100%"
                      : isComplete
                      ? "100%"
                      : `${(currentStep / steps.length) * 100}%`,
                  }}
                >
                  {/* Shimmer effect */}
                  {!isError && !isComplete && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-shimmer"></div>
                  )}
                </div>
              </div>
            </div>            {/* Ultra-modern retry button for error state */}
            {isError && onRetry && (
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <div className="text-center">
                  <button
                    onClick={onRetry}
                    className="group relative overflow-hidden bg-gradient-conic from-red-500 via-orange-500 to-red-500 hover:from-red-400 hover:via-orange-400 hover:to-red-400 text-white font-black text-xl py-6 px-12 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-3xl hover:shadow-glow backdrop-blur-sm border border-white/20 animate-pulse-slow"
                  >
                    {/* Ultra-modern background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative flex items-center justify-center space-x-3">
                      <svg
                        className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span className="drop-shadow-lg">🔄 Try Again</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;

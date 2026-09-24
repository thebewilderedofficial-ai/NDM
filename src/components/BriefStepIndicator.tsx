import React from "react";
import { Check, Sparkles } from "lucide-react";

export interface StepItem {
  id: number;
  label: string;
  description: string;
}

interface BriefStepIndicatorProps {
  steps: StepItem[];
  currentStep: number;
  serviceGradient?: string;
  completionDetail?: string;
  className?: string;
  isProcessing?: boolean;
}

export default function BriefStepIndicator({
  steps,
  currentStep,
  serviceGradient = "from-indigo-500 to-purple-600",
  completionDetail,
  className = "",
  isProcessing = false,
}: BriefStepIndicatorProps) {
  const currentStepItem = steps.find((s) => s.id === currentStep) || steps[0];
  const progressPercent = Math.min(
    100,
    Math.max(0, ((currentStep - 1) / Math.max(1, steps.length - 1)) * 100)
  );

  return (
    <div 
      className={`brief-step-indicator bg-zinc-900/60 border-b border-zinc-800/80 px-4 sm:px-6 py-3.5 transition-colors ${className}`}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label={`Brief progress: Step ${currentStep} of ${steps.length} - ${currentStepItem.label}`}
    >
      {/* Top Meta Status Row */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center space-x-2 min-w-0">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold truncate">
            Step {currentStep} of {steps.length} <span className="text-zinc-600 mx-1">·</span>
            <span className="text-white font-display font-medium">{currentStepItem.label}</span>
          </span>
          {isProcessing && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2 py-0.5 rounded-full shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping shrink-0" />
              <span>Analyzing</span>
            </span>
          )}
        </div>

        {completionDetail && (
          <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 shrink-0 bg-zinc-950/60 border border-zinc-800/80 px-2 sm:px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-indigo-400 shrink-0" />
            <span className="truncate max-w-[170px] sm:max-w-[240px]">{completionDetail}</span>
          </div>
        )}
      </div>

      {/* Horizontal Multi-Step Track */}
      <div className="relative flex items-center justify-between">
        {/* Background Track Line */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 h-[2px] bg-zinc-800 rounded-full z-0 overflow-hidden">
          {/* Animated Progress Fill */}
          <div
            className={`h-full bg-gradient-to-r ${serviceGradient} transition-all duration-500 ease-out`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Nodes */}
        {steps.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center group cursor-default"
              title={`${step.label}: ${step.description}`}
            >
              {/* Node Circle */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                    : isCurrent
                    ? `bg-zinc-950 text-white border-2 border-indigo-400 ring-2 ring-indigo-500/40 ring-offset-2 ring-offset-zinc-950 shadow-[0_0_15px_rgba(99,102,241,0.35)] scale-105`
                    : "bg-zinc-900 border border-zinc-800 text-zinc-500"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>

              {/* Sub-label for desktop/tablets */}
              <div className="hidden sm:flex flex-col items-center mt-1 text-center max-w-[90px]">
                <span
                  className={`text-[10px] font-display font-semibold tracking-tight transition-colors ${
                    isCurrent
                      ? "text-white"
                      : isCompleted
                      ? "text-zinc-300"
                      : "text-zinc-500"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 leading-tight">
                  {step.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

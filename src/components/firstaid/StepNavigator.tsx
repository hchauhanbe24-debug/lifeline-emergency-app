import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Lightbulb, 
  ShieldAlert, 
  CheckCircle, 
  RotateCcw,
  PhoneCall,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FirstAidGuide, FirstAidStep } from '../../types';

interface StepNavigatorProps {
  guide: FirstAidGuide;
  onBackToLibrary: () => void;
  onTriggerSos: () => void;
}

export const StepNavigator: React.FC<StepNavigatorProps> = ({
  guide,
  onBackToLibrary,
  onTriggerSos
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const totalSteps = guide.steps.length;
  const currentStep: FirstAidStep = guide.steps[currentStepIndex];
  const isLastStep = currentStepIndex === totalSteps - 1;
  const isFirstStep = currentStepIndex === 0;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Trigger celebratory completion
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  // Text-to-speech for hands-free emergency audio assistance!
  const speakInstruction = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Step ${currentStep.stepNumber}: ${currentStep.title}. ${currentStep.instruction}. ${currentStep.detail}`
      );
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation & Emergency Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-surface-border">
        <button
          type="button"
          onClick={onBackToLibrary}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-lifeline-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-lifeline-50 text-lifeline-primary border border-lifeline-200">
            {guide.categoryLabel}
          </span>
          <button
            type="button"
            onClick={onTriggerSos}
            className="flex items-center gap-1.5 px-3 py-1 bg-lifeline-primary hover:bg-lifeline-dark text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 112</span>
          </button>
        </div>
      </div>

      {/* Guide Header Summary */}
      <div className="bg-white rounded-2xl p-5 border border-surface-border shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-navy">{guide.title}</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{guide.subtitle}</p>
          </div>
          <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto">
            {guide.verifiedBy}
          </div>
        </div>

        {/* Progress Bar & Step Indicator */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span>Step {currentStepIndex + 1} of {totalSteps}</span>
            <span className="text-lifeline-primary">{Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-lifeline-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Step Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-lifeline-primary/20 shadow-md relative overflow-hidden">
        {/* Step Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-lifeline-primary text-white text-xs font-black uppercase tracking-wider shadow-sm">
            <span>Step {currentStep.stepNumber}</span>
          </div>
          
          <button
            type="button"
            onClick={speakInstruction}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
            title="Read instruction aloud"
          >
            <Volume2 className="w-3.5 h-3.5 text-lifeline-primary" />
            <span className="hidden sm:inline">Voice Assist</span>
          </button>
        </div>

        {/* Step Title & Instruction */}
        <h2 className="text-xl sm:text-2xl font-black text-navy tracking-tight mb-3">
          {currentStep.title}
        </h2>
        
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 mb-5">
          <p className="text-base sm:text-lg text-slate-800 font-bold leading-relaxed">
            {currentStep.instruction}
          </p>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {currentStep.detail}
          </p>
        </div>

        {/* Pro Tip or Warning if present */}
        {currentStep.tip && (
          <div className="flex items-start gap-3 bg-amber-50/80 border border-amber-200 rounded-2xl p-4 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              <strong>Key Tip:</strong> {currentStep.tip}
            </div>
          </div>
        )}

        {currentStep.warning && (
          <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-4">
            <AlertTriangle className="w-5 h-5 text-lifeline-primary shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-rose-950 leading-relaxed font-medium">
              <strong>Caution:</strong> {currentStep.warning}
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirstStep}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
              isFirstStep
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {isLastStep ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all"
                title="Restart this guide"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-95"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Complete Guide</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-7 py-3 bg-lifeline-primary hover:bg-lifeline-dark text-white font-extrabold text-sm rounded-xl shadow-md shadow-lifeline-primary/30 transition-all active:scale-95"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Safeguards: "What NOT to do" Collapsible / Section */}
      <div className="bg-white rounded-2xl p-5 border border-surface-border shadow-xs">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-3 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-lifeline-primary" />
          Critical Safeguards: What NOT to do
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
          {guide.whatNotToDo.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-rose-100 text-lifeline-primary font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                ✕
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Conservative Medical Notice */}
      <div className="text-center p-3 text-[11px] text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
        Notice: Content based on proposed academic curriculum. For verified real-world emergency use, always prioritize instructions from the live 112 emergency dispatcher.
      </div>
    </div>
  );
};

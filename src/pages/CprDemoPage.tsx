import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  PhoneCall, 
  CheckCircle,
  Baby,
  UserCheck,
  ShieldAlert,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FIRST_AID_GUIDES } from '../data/firstAidGuides';
import { CprMetronomeBar } from '../components/emergency/CprMetronomeBar';

interface CprDemoPageProps {
  onBackToLibrary: () => void;
  onTriggerSos: () => void;
}

export const CprDemoPage: React.FC<CprDemoPageProps> = ({
  onBackToLibrary,
  onTriggerSos
}) => {
  const [cprType, setCprType] = useState<'adult' | 'child'>('adult');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const guide = cprType === 'adult' ? FIRST_AID_GUIDES[0] : FIRST_AID_GUIDES[1];
  const steps = guide.steps;
  const totalSteps = steps.length;
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleTypeChange = (type: 'adult' | 'child') => {
    setCprType(type);
    setCurrentStepIndex(0);
  };

  const speakCurrentStep = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `Step ${currentStep.stepNumber}: ${currentStep.title}. ${currentStep.instruction}. ${currentStep.detail}`;
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 0.95;
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-border">
        <button
          type="button"
          onClick={onBackToLibrary}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-lifeline-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to First-Aid Library</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Adult vs Child Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-bold">
            <button
              type="button"
              onClick={() => handleTypeChange('adult')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                cprType === 'adult'
                  ? 'bg-lifeline-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-navy'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Adult CPR (8 Steps)</span>
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('child')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                cprType === 'child'
                  ? 'bg-lifeline-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-navy'
              }`}
            >
              <Baby className="w-3.5 h-3.5" />
              <span>Child / Infant</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onTriggerSos}
            className="flex items-center gap-1 px-3 py-1.5 bg-lifeline-primary hover:bg-lifeline-dark text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 112</span>
          </button>
        </div>
      </div>

      {/* Prominent Emergency Warning */}
      <div className="bg-rose-50 border-2 border-lifeline-primary/30 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-6 h-6 text-lifeline-primary shrink-0 mt-0.5 animate-pulse" />
        <div className="text-xs sm:text-sm text-navy">
          <p className="font-extrabold text-lifeline-primary uppercase tracking-wide">
            Critical Emergency Warning
          </p>
          <p className="mt-0.5 text-slate-700 leading-relaxed">
            If the victim is unconscious and not breathing normally, <strong>call 112 immediately</strong> or instruct someone nearby to call. Put phone on speaker and begin chest compressions without delay.
          </p>
        </div>
      </div>

      {/* CPR Audio & Visual Metronome Bar (Live 100-120 BPM Pace) */}
      <CprMetronomeBar />

      {/* Interactive Step Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-surface-border shadow-md relative overflow-hidden">
        {/* Step Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-lifeline-primary text-white text-xs font-black uppercase tracking-wider shadow-xs">
              Step {currentStep.stepNumber} of {totalSteps}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {cprType === 'adult' ? 'Standard Adult Protocol' : 'Pediatric Protocol'}
            </span>
          </div>

          <button
            type="button"
            onClick={speakCurrentStep}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5 text-lifeline-primary" />
            <span>Voice Assist</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
          <div 
            className="bg-lifeline-primary h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
            {currentStep.title}
          </h2>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentStep.instruction}
            </p>
            <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
              {currentStep.detail}
            </p>
          </div>

          {currentStep.tip && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 leading-relaxed">
              <strong>Clinical Tip:</strong> {currentStep.tip}
            </div>
          )}

          {currentStep.warning && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs sm:text-sm text-rose-950 leading-relaxed font-medium">
              <strong>Caution:</strong> {currentStep.warning}
            </div>
          )}
        </div>

        {/* Navigation Step Controls */}
        <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-100 gap-3">
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
                onClick={() => setCurrentStepIndex(0)}
                className="flex items-center gap-1.5 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart Cycle</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-95"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Completed (Cycle Logged)</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-7 py-3 bg-lifeline-primary hover:bg-lifeline-dark text-white font-extrabold text-sm rounded-xl shadow-md shadow-lifeline-primary/30 transition-all active:scale-95"
            >
              <span>Next Step ({currentStepIndex + 2}/{totalSteps})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* What NOT to do in CPR */}
      <div className="bg-white rounded-3xl p-6 border border-surface-border shadow-xs">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-3 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-lifeline-primary" />
          Critical CPR Errors (What NOT to do)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
          {guide.whatNotToDo.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-4 h-4 rounded-full bg-rose-100 text-lifeline-primary font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                ✕
              </span>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

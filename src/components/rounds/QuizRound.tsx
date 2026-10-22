import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, XCircle, ArrowRight, Lightbulb, HelpCircle } from 'lucide-react';
import { Question, Team, GameRound, TeamId } from '../../types';
import { soundManager } from '../../utils/audio';

interface QuizRoundProps {
  round: GameRound;
  questions: Question[];
  teams: Team[];
  activeTeamId: TeamId;
  timerSeconds: number;
  timerEnabled: boolean;
  onUpdateScore: (teamId: TeamId, points: number, correct: boolean) => void;
  onUseHint: (teamId: TeamId) => void;
  onSwitchTeam: () => void;
  onCompleteRound: () => void;
  onBackToMap: () => void;
}

export const QuizRound: React.FC<QuizRoundProps> = ({
  round,
  questions,
  teams,
  activeTeamId,
  timerSeconds,
  timerEnabled,
  onUpdateScore,
  onUseHint,
  onSwitchTeam,
  onCompleteRound,
  onBackToMap,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentQ = questions[currentIndex];
  const activeTeam = teams.find(t => t.id === activeTeamId) || teams[0];

  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 4 && prev > 1) soundManager.playTick();
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(optionIdx);

    const isCorrect = optionIdx === currentQ.correctIndex;
    if (isCorrect) {
      soundManager.playCorrect();
      onUpdateScore(activeTeamId, 100, true);
    } else {
      soundManager.playIncorrect();
      onUpdateScore(activeTeamId, 0, false);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(timerSeconds);
      setShowExplanation(false);
      setShowHint(false);
      onSwitchTeam();
    } else {
      onCompleteRound();
    }
  };

  const handleRequestHint = () => {
    if (activeTeam.hintsRemaining <= 0) {
      alert('Đội này đã hết 3 lần xem gợi ý!');
      return;
    }
    soundManager.playClick();
    onUseHint(activeTeamId);
    setShowHint(true);
  };

  const progressPercent = (timeLeft / timerSeconds) * 100;

  return (
    <div className="min-h-[calc(100vh-73px)] px-4 py-8 max-w-4xl mx-auto flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBackToMap} className="text-base font-bold text-slate-600 hover:text-slate-900 transition-colors">
          ← Trở về bản đồ
        </button>
        <span className="px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-sm font-extrabold">
          Vòng 3: Trắc Nghiệm — Câu {currentIndex + 1}/{questions.length}
        </span>
      </div>

      {/* Prominent Countdown Timer Bar */}
      <div className="mb-6 bg-white p-4 rounded-3xl shadow-md border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <Clock className={`w-5 h-5 ${timeLeft <= 5 ? 'text-rose-600 animate-bounce' : 'text-indigo-600'}`} />
            <span>Thời gian suy nghĩ:</span>
          </div>
          <span className={`text-base font-black font-mono px-3 py-1 rounded-xl ${
            timeLeft <= 5 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-900'
          }`}>
            {timeLeft} giây
          </span>
        </div>
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 rounded-full ${
              timeLeft <= 5 ? 'bg-rose-500 animate-pulse' : timeLeft <= 10 ? 'bg-amber-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
          />
        </div>
      </div>

      <div className="p-5 rounded-3xl mb-6 border shadow-md flex items-center justify-between bg-emerald-50 border-emerald-200">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-extrabold text-slate-900 text-lg">
            Lượt của: <span className="text-emerald-900 text-xl">{activeTeam.name}</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm font-bold">
          <span className="px-4 py-1.5 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs">
            💡 Gợi ý còn lại: {activeTeam.hintsRemaining}/3
          </span>
          <span className="px-4 py-1.5 rounded-2xl bg-white shadow-xs border font-black text-emerald-700 text-base">
            {activeTeam.score}đ
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 sm:p-10 mb-6">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 leading-relaxed">{currentQ.question}</h3>

        {/* Hint Box */}
        {currentQ.hint && !isAnswered && (
          <div className="mb-8">
            {!showHint ? (
              <button
                onClick={handleRequestHint}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-sm font-bold border-2 border-emerald-300 transition-all shadow-sm"
              >
                <Lightbulb className="w-5 h-5 text-emerald-700" />
                💡 Xem gợi ý ({activeTeam.hintsRemaining} lần còn lại)
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-950 text-base font-semibold"
              >
                <strong>Gợi ý:</strong> {currentQ.hint}
              </motion.div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {currentQ.options.map((opt, idx) => {
            let btnStyle = 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100';

            if (isAnswered) {
              if (idx === currentQ.correctIndex) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-4 ring-emerald-400/30';
              } else if (idx === selectedOption) {
                btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-4 ring-rose-400/30';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <motion.button
                key={idx}
                whileHover={!isAnswered ? { scale: 1.01 } : {}}
                whileTap={!isAnswered ? { scale: 0.99 } : {}}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-5 rounded-2xl border-2 font-black text-lg sm:text-xl transition-all shadow-sm flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-white border-2 border-slate-300 flex items-center justify-center text-sm font-black text-slate-700 shadow-xs shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
                {isAnswered && idx === currentQ.correctIndex && <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && <XCircle className="w-7 h-7 text-rose-600 shrink-0" />}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 rounded-3xl bg-indigo-50 border-2 border-indigo-200 shadow-md">
              <h4 className="font-extrabold text-indigo-950 text-lg mb-2 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-indigo-600" />
                Giải thích khoa học:
              </h4>
              <p className="text-indigo-900 text-base sm:text-lg leading-relaxed font-medium">{currentQ.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isAnswered && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xl rounded-2xl shadow-xl shadow-teal-500/30 flex items-center gap-3 transition-all"
          >
            <span>{currentIndex < questions.length - 1 ? 'Câu Tiếp Theo' : 'Hoàn Thành Vòng 3'}</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, XCircle, ArrowRight, Lightbulb, HelpCircle } from 'lucide-react';
import { Question, Team, GameRound, TeamId } from '../types';
import { soundManager } from '../utils/audio';

interface QuizRoundProps {
  round: GameRound;
  questions: Question[];
  teams: Team[];
  activeTeamId: TeamId;
  timerSeconds: number;
  timerEnabled: boolean;
  onUpdateScore: (teamId: TeamId, points: number, correct: boolean) => void;
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

  // Timer effect
  useEffect(() => {
    if (!timerEnabled || isAnswered) return;

    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 4 && prev > 1) {
          soundManager.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, timerEnabled]);

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

  const handleNextQuestion = () => {
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

  const getTeamColorStyle = (id: TeamId) => {
    switch (id) {
      case 'teamA': return 'bg-sky-50 border-sky-200 text-sky-700';
      case 'teamB': return 'bg-rose-50 border-rose-200 text-rose-700';
      case 'teamC': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'teamD': return 'bg-purple-50 border-purple-200 text-purple-700';
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] px-4 py-8 max-w-3xl mx-auto flex flex-col justify-between">
      {/* Top status info */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToMap}
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          ← Trở về bản đồ
        </button>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            Vòng {round} — Câu {currentIndex + 1}/{questions.length}
          </span>
          {timerEnabled && !isAnswered && (
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono ${
              timeLeft <= 5 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-700'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>
      </div>

      {/* Active Team Banner */}
      <div className={`p-4 rounded-2xl mb-6 border shadow-sm flex items-center justify-between transition-all ${getTeamColorStyle(activeTeamId)}`}>
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: activeTeam.color }} />
          <span className="font-bold text-slate-900 text-base">
            Lượt trả lời của: <span style={{ color: activeTeam.color }}>{activeTeam.name}</span>
          </span>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white shadow-xs border">
          Điểm hiện tại: {activeTeam.score}đ
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* Hint Button & Box */}
        {currentQ.hint && !isAnswered && (
          <div className="mb-6">
            {!showHint ? (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowHint(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition-all"
              >
                <Lightbulb className="w-4 h-4 text-amber-600" />
                💡 Xem gợi ý câu hỏi
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2"
              >
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">Gợi ý từ giáo viên:</strong>
                  {currentQ.hint}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((opt, idx) => {
            let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

            if (isAnswered) {
              if (idx === currentQ.correctIndex) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400/30';
              } else if (idx === selectedOption) {
                btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-400/30';
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
                className={`w-full text-left p-4 rounded-2xl border-2 font-semibold text-sm sm:text-base transition-all flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-xs shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswered && idx === currentQ.correctIndex && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                )}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation Box */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-100"
            >
              <h4 className="font-bold text-indigo-900 text-sm mb-1 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                Giải thích khoa học:
              </h4>
              <p className="text-indigo-800 text-xs sm:text-sm leading-relaxed">
                {currentQ.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next Question / Continue Button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <button
            onClick={handleNextQuestion}
            className="px-8 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center gap-3 transition-all"
          >
            <span>{currentIndex < questions.length - 1 ? 'Câu Tiếp Theo' : 'Hoàn Thành Vòng'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

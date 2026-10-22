import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, XCircle, ArrowRight, Lightbulb, HelpCircle } from 'lucide-react';
import { Team, TeamId } from '../../types';
import { ROUND_3_QUIZ } from '../../data/gameData';
import { soundManager } from '../../utils/audio';
import { HintModal } from '../HintModal';

interface SmallIntestineRoundProps {
  teams: Team[];
  activeTeamId: TeamId;
  questionTime: number;
  timerEnabled: boolean;
  onUpdateScore: (teamId: TeamId, points: number, correct: boolean) => void;
  onCompleteRound: () => void;
  onUseHint: (teamId: TeamId) => void;
}

export const SmallIntestineRound: React.FC<SmallIntestineRoundProps> = ({
  teams,
  activeTeamId,
  questionTime,
  timerEnabled,
  onUpdateScore,
  onCompleteRound,
  onUseHint,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questionTime);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentItem = ROUND_3_QUIZ[currentIndex];
  const activeTeam = teams.find(t => t.id === activeTeamId) || teams[0];

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setTimeLeft(questionTime);
  }, [currentIndex, currentItem, questionTime]);

  useEffect(() => {
    if (!timerEnabled || isAnswered) return;

    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      if (timeLeft <= 5) {
        soundManager.playTick();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, timerEnabled]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    soundManager.playIncorrect();
    onUpdateScore(activeTeamId, 0, false);
  };

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(idx);
    const correct = idx === currentItem.correctIndex;

    setIsAnswered(true);
    if (correct) {
      soundManager.playCorrect();
      onUpdateScore(activeTeamId, 10, true);
    } else {
      soundManager.playIncorrect();
      onUpdateScore(activeTeamId, 0, false);
    }
  };

  const handleNext = () => {
    if (currentIndex < ROUND_3_QUIZ.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onCompleteRound();
    }
  };

  const handleRequestHint = () => {
    if (activeTeam.hintsRemaining > 0 && !showHint) {
      onUseHint(activeTeamId);
      setShowHint(true);
      soundManager.playClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[calc(100vh-73px)] px-4 py-8 max-w-4xl mx-auto flex flex-col justify-between"
    >
      <div>
        {/* Header info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl shadow-inner">
              🧪
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Vòng 3 • Tiêu Hóa Ở Ruột Non
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Tá Tràng, Dịch Tụy, Dịch Mật & Hấp Thụ
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div 
              className="px-4 py-2 rounded-2xl text-white font-bold text-sm flex items-center gap-2 shadow-md"
              style={{ backgroundColor: activeTeam.color }}
            >
              <span className="text-lg">{activeTeam.avatar}</span>
              <span>Lượt của: {activeTeam.name}</span>
            </div>

            {timerEnabled && (
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-2xl font-bold text-slate-700">
                <Clock className="w-5 h-5 text-emerald-600 animate-pulse" />
                <span className={timeLeft <= 5 ? 'text-rose-600 animate-bounce' : ''}>{timeLeft}s</span>
              </div>
            )}
          </div>
        </div>

        {/* Question Card */}
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Câu hỏi {currentIndex + 1} / {ROUND_3_QUIZ.length}
            </span>

            <button
              onClick={handleRequestHint}
              disabled={showHint || activeTeam.hintsRemaining <= 0}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-all"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Gợi ý ({activeTeam.hintsRemaining} còn lại)
            </button>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6">
            {currentItem.question}
          </h3>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm font-medium flex items-start gap-3"
              >
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>{currentItem.hint}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentItem.options.map((option, idx) => {
              let btnStyle = "bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-800";
              if (isAnswered) {
                if (idx === currentItem.correctIndex) {
                  btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/20";
                } else if (idx === selectedOption) {
                  btnStyle = "bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-500/20";
                } else {
                  btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-60";
                }
              }

              return (
                <motion.button
                  key={idx}
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`p-5 rounded-2xl border-2 font-bold text-left transition-all flex items-start gap-4 ${btnStyle}`}
                >
                  <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 font-black">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 text-sm md:text-base leading-snug">{option}</span>
                </motion.button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-2xl border ${
                selectedOption === currentItem.correctIndex ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {selectedOption === currentItem.correctIndex ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-7 h-7 text-rose-600 shrink-0" />
                )}
                <h4 className="font-black text-lg">
                  {selectedOption === currentItem.correctIndex ? 'Chính xác! (+10 điểm)' : 'Chưa chính xác!'}
                </h4>
              </div>
              <p className="text-sm font-medium mb-4 pl-10 opacity-90">
                {currentItem.explanation}
              </p>
              <button
                onClick={handleNext}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{currentIndex < ROUND_3_QUIZ.length - 1 ? 'Câu Tiếp Theo' : 'Hoàn Thành Vòng 3'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <HintModal
        isOpen={showHint}
        hintText={currentItem.hint}
        activeTeam={activeTeam}
        onClose={() => setShowHint(false)}
      />
    </motion.div>
  );
};

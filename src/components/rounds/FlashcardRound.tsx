import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, XCircle, ArrowRight, Lightbulb, HelpCircle, RotateCw, Sparkles, BookOpen } from 'lucide-react';
import { FlashcardItem, Team, TeamId } from '../../types';
import { soundManager } from '../../utils/audio';
import { HintModal } from '../HintModal';
import { DrStomachAvatar, AcidDropAvatar, PepsinAvatar, MuscleAvatar } from '../Characters';

interface FlashcardRoundProps {
  items: FlashcardItem[];
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

export const FlashcardRound: React.FC<FlashcardRoundProps> = ({
  items,
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [showHint, setShowHint] = useState(false);

  const currentItem = items[currentIndex];
  const activeTeam = teams.find(t => t.id === activeTeamId) || teams[0];

  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft <= 0) {
      handleGrade(false); // Timeout -> incorrect
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

  const handleFlip = () => {
    soundManager.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleGrade = (correct: boolean) => {
    if (isAnswered) return;
    setIsAnswered(true);

    if (correct) {
      soundManager.playCorrect();
      onUpdateScore(activeTeamId, 100, true);
    } else {
      soundManager.playIncorrect();
      onUpdateScore(activeTeamId, 0, false);
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setIsAnswered(false);
      setShowHint(false);
      setTimeLeft(timerSeconds);
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[calc(100vh-73px)] px-4 py-8 max-w-4xl mx-auto flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBackToMap} className="text-base font-bold text-slate-600 hover:text-slate-900 transition-colors">
          ← Trở về bản đồ
        </button>
        <span className="px-4 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-sm font-extrabold">
          Vòng 2: Thẻ Học Từ Vựng (Flashcards) — Thẻ {currentIndex + 1}/{items.length}
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

      <div className="p-5 rounded-3xl mb-6 border shadow-md flex items-center justify-between bg-purple-50 border-purple-200">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 rounded-full bg-purple-600 animate-pulse" />
          <span className="font-extrabold text-slate-900 text-lg">
            Lượt của: <span className="text-purple-900 text-xl">{activeTeam.name}</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm font-bold">
          <span className="px-4 py-1.5 rounded-2xl bg-purple-100 text-purple-900 border border-purple-300 shadow-xs">
            💡 Gợi ý còn lại: {activeTeam.hintsRemaining}/3
          </span>
          <span className="px-4 py-1.5 rounded-2xl bg-white shadow-xs border font-black text-purple-700 text-base">
            {activeTeam.score}đ
          </span>
        </div>
      </div>

      {/* Flashcard Component */}
      <div className="flex flex-col items-center mb-6">
        <div 
          onClick={handleFlip}
          className="w-full max-w-2xl h-80 sm:h-96 cursor-pointer relative perspective-1000"
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: 'spring', damping: 20 }}
            className="w-full h-full relative rounded-3xl shadow-2xl border-4 border-purple-200 bg-white p-8 flex flex-col items-center justify-center text-center select-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front Side */}
            <div 
              className="absolute inset-0 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 rounded-3xl"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute top-4 left-4 px-3 py-1 bg-purple-200 text-purple-900 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Mặt trước (Câu hỏi / Thuật ngữ)
              </div>
              <div className="absolute top-4 right-4">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                  <AcidDropAvatar className="w-14 h-14 drop-shadow-md" />
                </motion.div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-relaxed mb-4 mt-6">
                {currentItem.front}
              </h3>
              <p className="text-sm text-purple-600 font-bold flex items-center gap-1 mt-2 animate-bounce">
                <RotateCw className="w-4 h-4" /> Nhấn vào thẻ để lật xem đáp án mặt sau
              </p>
            </div>

            {/* Back Side */}
            <div 
              className="absolute inset-0 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-3xl"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Mặt sau (Đáp án chuẩn)
              </div>
              <div className="absolute top-4 right-4">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                  <PepsinAvatar className="w-14 h-14 drop-shadow-md" />
                </motion.div>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-indigo-100 leading-relaxed mb-3 mt-6">
                {currentItem.back}
              </h3>
              <p className="text-xs sm:text-sm text-indigo-200 font-medium italic max-w-lg">
                <strong>Giải thích:</strong> {currentItem.explanation}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hint Box */}
        {!isAnswered && (
          <div className="mt-6 w-full max-w-2xl text-center">
            {!showHint ? (
              <button
                onClick={handleRequestHint}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-sm font-bold border-2 border-purple-300 transition-all shadow-sm"
              >
                <Lightbulb className="w-5 h-5 text-purple-700" />
                💡 Xem gợi ý ({activeTeam.hintsRemaining} lần còn lại)
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-purple-50 border-2 border-purple-200 text-purple-950 text-base font-semibold"
              >
                <strong>Gợi ý:</strong> {currentItem.hint}
              </motion.div>
            )}
          </div>
        )}

        {/* Grading Buttons after flipping / inspecting */}
        {isFlipped && !isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl"
          >
            <button
              onClick={() => handleGrade(false)}
              className="w-full sm:w-1/2 py-4 bg-rose-500 hover:bg-rose-600 text-white font-black text-lg rounded-2xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <XCircle className="w-6 h-6" />
              Chưa chính xác (0đ)
            </button>
            <button
              onClick={() => handleGrade(true)}
              className="w-full sm:w-1/2 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-6 h-6" />
              Chính xác (+100đ)
            </button>
          </motion.div>
        )}
      </div>

      {isAnswered && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xl rounded-2xl shadow-xl shadow-indigo-500/30 flex items-center gap-3 transition-all"
          >
            <span>{currentIndex < items.length - 1 ? 'Thẻ Tiếp Theo' : 'Hoàn Thành Vòng 2'}</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>
      )}

      <HintModal
        isOpen={showHint}
        hintText={currentItem.hint}
        activeTeam={activeTeam}
        onClose={() => setShowHint(false)}
      />
    </motion.div>
  );
};

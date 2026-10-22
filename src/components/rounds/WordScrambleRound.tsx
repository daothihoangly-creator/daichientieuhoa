import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, XCircle, ArrowRight, Lightbulb, HelpCircle, Shuffle } from 'lucide-react';
import { WordScrambleItem, Team, TeamId } from '../../types';
import { soundManager } from '../../utils/audio';

interface WordScrambleRoundProps {
  items: WordScrambleItem[];
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

export const WordScrambleRound: React.FC<WordScrambleRoundProps> = ({
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
  const currentItem = items[currentIndex];

  // Tile states
  const [availableTiles, setAvailableTiles] = useState<string[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const activeTeam = teams.find(t => t.id === activeTeamId) || teams[0];

  // Initialize randomized tiles when question changes
  useEffect(() => {
    const shuffled = [...currentItem.words].sort(() => Math.random() - 0.5);
    setAvailableTiles(shuffled);
    setSelectedTiles([]);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowExplanation(false);
    setShowHint(false);
    setTimeLeft(timerSeconds);
  }, [currentIndex, currentItem]);

  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft <= 0) {
      handleCheck(true); // Timeout -> auto check
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

  const handlePickTile = (tile: string, index: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setAvailableTiles(prev => prev.filter((_, i) => i !== index));
    setSelectedTiles(prev => [...prev, tile]);
  };

  const handleReturnTile = (tile: string, index: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedTiles(prev => prev.filter((_, i) => i !== index));
    setAvailableTiles(prev => [...prev, tile]);
  };

  const handleCheck = (isTimeout = false) => {
    if (isAnswered) return;
    setIsAnswered(true);

    const isMatch = !isTimeout && selectedTiles.length === currentItem.words.length &&
      selectedTiles.every((val, idx) => val === currentItem.words[idx]);

    setIsCorrect(isMatch);

    if (isMatch) {
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
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
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
        <span className="px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-sm font-extrabold">
          Vòng 1: Sắp Xếp Lại Từ — Câu {currentIndex + 1}/{items.length}
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

      <div className="p-5 rounded-3xl mb-6 border shadow-md flex items-center justify-between bg-amber-50 border-amber-200">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-white border border-amber-300 flex items-center justify-center text-xl shadow-xs shrink-0">
            {activeTeam.avatar}
          </span>
          <span className="font-extrabold text-slate-900 text-lg">
            Lượt của: <span className="text-amber-900 text-xl">{activeTeam.name}</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm font-bold">
          <span className="px-4 py-1.5 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
            💡 Gợi ý còn lại: {activeTeam.hintsRemaining}/3
          </span>
          <span className="px-4 py-1.5 rounded-2xl bg-white shadow-xs border font-black text-amber-700 text-base">
            {activeTeam.score}đ
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 sm:p-10 mb-6 text-center">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 leading-relaxed">
          {currentItem.question}
        </h3>
        <p className="text-slate-600 text-sm mb-6 font-medium">
          Nhấn vào các thẻ từ bên dưới để sắp xếp theo đúng thứ tự câu khoa học:
        </p>

        {/* Target Assembly Slots */}
        <div className="min-h-[80px] p-4 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 flex flex-wrap items-center justify-center gap-3 mb-8 shadow-inner">
          {selectedTiles.length === 0 ? (
            <span className="text-slate-400 font-semibold text-sm">Chưa chọn từ nào. Nhấn vào các thẻ ở dưới để đưa lên đây.</span>
          ) : (
            selectedTiles.map((tile, idx) => (
              <motion.button
                key={idx}
                layout
                whileHover={!isAnswered ? { scale: 1.05 } : {}}
                onClick={() => handleReturnTile(tile, idx)}
                disabled={isAnswered}
                className="px-6 py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-black text-lg rounded-2xl shadow-md border border-indigo-400"
              >
                {tile}
              </motion.button>
            ))
          )}
        </div>

        {/* Available Tiles Pool */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {availableTiles.map((tile, idx) => (
            <motion.button
              key={idx}
              layout
              whileHover={!isAnswered ? { scale: 1.05 } : {}}
              whileTap={!isAnswered ? { scale: 0.95 } : {}}
              onClick={() => handlePickTile(tile, idx)}
              disabled={isAnswered}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-black text-lg rounded-2xl shadow-md border-2 border-slate-200 transition-all"
            >
              {tile}
            </motion.button>
          ))}
        </div>

        {/* Hint Box */}
        {!isAnswered && (
          <div className="mb-6">
            {!showHint ? (
              <button
                onClick={handleRequestHint}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-sm font-bold border-2 border-amber-300 transition-all shadow-sm"
              >
                <Lightbulb className="w-5 h-5 text-amber-700" />
                💡 Xem gợi ý ({activeTeam.hintsRemaining} lần còn lại)
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-900 text-base max-w-xl mx-auto font-semibold"
              >
                <strong>Gợi ý:</strong> {currentItem.hint}
              </motion.div>
            )}
          </div>
        )}

        {/* Check Button */}
        {!isAnswered && (
          <button
            onClick={() => handleCheck(false)}
            disabled={selectedTiles.length === 0}
            className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/25 transition-all"
          >
            Kiểm tra kết quả
          </button>
        )}

        {/* Feedback & Explanation */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-6 rounded-3xl border-2 shadow-md text-left ${
                isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-xl mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                    <span>Chính xác! +100 điểm</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-7 h-7 text-rose-600" />
                    <span>Chưa chính xác! Đáp án đúng: {currentItem.words.join(' ')}</span>
                  </>
                )}
              </div>
              <p className="text-base sm:text-lg leading-relaxed font-medium mt-2">{currentItem.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isAnswered && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-xl rounded-2xl shadow-xl shadow-orange-500/30 flex items-center gap-3 transition-all"
          >
            <span>{currentIndex < items.length - 1 ? 'Câu Tiếp Theo' : 'Hoàn Thành Vòng 1'}</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

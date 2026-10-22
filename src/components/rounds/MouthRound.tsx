import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, XCircle, ArrowRight, Lightbulb, HelpCircle, Utensils, Sparkles } from 'lucide-react';
import { Team, TeamId, Question } from '../../types';
import { ROUND_1_WORD_SCRAMBLE } from '../../data/gameData';
import { soundManager } from '../../utils/audio';
import { HintModal } from '../HintModal';

interface MouthRoundProps {
  teams: Team[];
  activeTeamId: TeamId;
  questionTime: number;
  timerEnabled: boolean;
  onUpdateScore: (teamId: TeamId, points: number, correct: boolean) => void;
  onCompleteRound: () => void;
  onUseHint: (teamId: TeamId) => void;
}

export const MouthRound: React.FC<MouthRoundProps> = ({
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
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentItem = ROUND_1_WORD_SCRAMBLE[currentIndex];
  const activeTeam = teams.find(t => t.id === activeTeamId) || teams[0];

  useEffect(() => {
    // Shuffle words for current item
    const shuffled = [...currentItem.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setSelectedWords([]);
    setIsAnswered(false);
    setIsCorrect(false);
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
    setIsCorrect(false);
    soundManager.playIncorrect();
    onUpdateScore(activeTeamId, 0, false);
  };

  const handleWordClick = (word: string, fromSelected: boolean) => {
    if (isAnswered) return;
    soundManager.playClick();
    if (fromSelected) {
      setSelectedWords(prev => prev.filter(w => w !== word));
      setAvailableWords(prev => [...prev, word]);
    } else {
      setAvailableWords(prev => prev.filter(w => w !== word));
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const handleSubmit = () => {
    if (isAnswered || selectedWords.length === 0) return;
    
    const formedSentence = selectedWords.join(' ');
    const correctSentence = currentItem.words.join(' ');
    const correct = formedSentence === correctSentence;

    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      soundManager.playCorrect();
      onUpdateScore(activeTeamId, 10, true);
    } else {
      soundManager.playIncorrect();
      onUpdateScore(activeTeamId, 0, false);
    }
  };

  const handleNext = () => {
    if (currentIndex < ROUND_1_WORD_SCRAMBLE.length - 1) {
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
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner">
              🦷
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                Vòng 1 • Tiêu Hóa Ở Khoang Miệng
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Sắp Xếp Cụm Từ Cơ Học & Hóa Học Miệng
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Active team indicator */}
            <div 
              className="px-4 py-2 rounded-2xl text-white font-bold text-sm flex items-center gap-2 shadow-md"
              style={{ backgroundColor: activeTeam.color }}
            >
              <span className="text-lg">{activeTeam.avatar}</span>
              <span>Lượt của: {activeTeam.name}</span>
            </div>

            {timerEnabled && (
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-2xl font-bold text-slate-700">
                <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
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
              Câu hỏi {currentIndex + 1} / {ROUND_1_WORD_SCRAMBLE.length}
            </span>

            {/* Hint button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRequestHint}
                disabled={showHint || activeTeam.hintsRemaining <= 0}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-all"
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Gợi ý ({activeTeam.hintsRemaining} còn lại)
              </button>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6">
            {currentItem.question}
          </h3>

          {/* Hint box */}
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

          {/* Selected sentence builder zone */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Khu vực sắp xếp câu trả lời (Nhấn vào từ để bỏ chọn):
            </label>
            <div className="min-h-[80px] p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-wrap gap-2 items-center">
              {selectedWords.length === 0 ? (
                <span className="text-slate-400 text-sm italic">
                  Chưa có cụm từ nào được chọn. Nhấn vào các từ bên dưới để sắp xếp vào đây.
                </span>
              ) : (
                selectedWords.map((word, idx) => (
                  <motion.button
                    key={`sel-${idx}-${word}`}
                    layout
                    onClick={() => handleWordClick(word, true)}
                    disabled={isAnswered}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center gap-2"
                  >
                    <span>{word}</span>
                  </motion.button>
                ))
              )}
            </div>
          </div>

          {/* Available words pool */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Các cụm từ cho sẵn (Nhấn để đưa lên trên):
            </label>
            <div className="flex flex-wrap gap-3 p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
              {availableWords.map((word, idx) => (
                <motion.button
                  key={`avail-${idx}-${word}`}
                  layout
                  onClick={() => handleWordClick(word, false)}
                  disabled={isAnswered}
                  className="px-4 py-2.5 bg-white hover:bg-indigo-50 text-indigo-900 border border-indigo-200 font-bold rounded-xl shadow-xs transition-all text-sm hover:scale-105 active:scale-95"
                >
                  {word}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit button */}
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={selectedWords.length === 0}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 text-white font-bold text-base rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Xác Nhận Đáp Án</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-2xl border ${
                isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-7 h-7 text-rose-600 shrink-0" />
                )}
                <h4 className="font-black text-lg">
                  {isCorrect ? 'Chính xác! (+10 điểm)' : 'Chưa chính xác!'}
                </h4>
              </div>
              <p className="text-sm font-medium mb-4 pl-10 opacity-90">
                {currentItem.explanation}
              </p>
              <button
                onClick={handleNext}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{currentIndex < ROUND_1_WORD_SCRAMBLE.length - 1 ? 'Câu Tiếp Theo' : 'Hoàn Thành Vòng 1'}</span>
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

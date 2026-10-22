import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, X, Sparkles, AlertCircle } from 'lucide-react';
import { Team, TeamId } from '../types';
import { soundManager } from '../utils/audio';

interface HintModalProps {
  isOpen: boolean;
  hintText: string;
  activeTeam: Team;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  hintText,
  activeTeam,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl border border-amber-200 w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                <Lightbulb className="w-7 h-7 text-amber-200 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-0.5 rounded-full">
                  Gợi Ý Sư Phạm
                </span>
                <h3 className="text-xl font-black mt-1">Trợ Giúp Từ Chuyên Gia</h3>
              </div>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between bg-amber-50 px-4 py-3 rounded-2xl border border-amber-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeTeam.avatar}</span>
                <span className="font-bold text-slate-900 text-sm">{activeTeam.name}</span>
              </div>
              <div className="text-xs font-bold bg-amber-200/70 text-amber-900 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Còn lại: {activeTeam.hintsRemaining} lần gợi ý
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-800 text-base leading-relaxed font-medium">
              <p className="flex items-start gap-3">
                <span className="text-amber-500 text-xl font-black">💡</span>
                <span>{hintText}</span>
              </p>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Đã Hiểu, Tiếp Tục Trò Chơi</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Sparkles, Award } from 'lucide-react';
import { DrStomachAvatar, MuscleAvatar, PepsinAvatar, MouthChibiAvatar, IntestineChibiAvatar } from './Characters';
import { soundManager } from '../utils/audio';

interface StartScreenProps {
  onStart: () => void;
  onOpenInstructions: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, onOpenInstructions }) => {
  const handleStart = () => {
    soundManager.playClick();
    onStart();
  };

  return (
    <div className="relative min-h-[calc(100vh-73px)] flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-b from-sky-50 via-indigo-50/50 to-pink-50">
      {/* Background Decorative Elements */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto z-10"
      >
        {/* Badge KHTN 8 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 text-xs md:text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Chương trình GDPT 2018 — Khoa học tự nhiên 8</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight mb-2">
          ĐẠI CHIẾN TIÊU HÓA
        </h1>
        <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-rose-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent mb-6">
          HÀNH TRÌNH KHÁM PHÁ TOÀN BỘ ỐNG TIÊU HÓA
        </p>

        {/* Characters showcase */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-12">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="bg-white/95 backdrop-blur-sm p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center"
          >
            <MouthChibiAvatar className="w-16 h-16" />
            <span className="text-xs font-bold text-slate-700 mt-2">Khoang Miệng</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0.2, ease: "easeInOut" }}
            className="bg-white/95 backdrop-blur-sm p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center"
          >
            <DrStomachAvatar className="w-16 h-16" />
            <span className="text-xs font-bold text-slate-700 mt-2">Bác Dạ Dày</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0.4, ease: "easeInOut" }}
            className="bg-white/95 backdrop-blur-sm p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center"
          >
            <MuscleAvatar className="w-16 h-16" />
            <span className="text-xs font-bold text-slate-700 mt-2">Cơ Bóp</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0.6, ease: "easeInOut" }}
            className="bg-white/95 backdrop-blur-sm p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center"
          >
            <PepsinAvatar className="w-16 h-16" />
            <span className="text-xs font-bold text-slate-700 mt-2">Pepsin & HCl</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0.8, ease: "easeInOut" }}
            className="bg-white/95 backdrop-blur-sm p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center col-span-2 sm:col-span-1"
          >
            <IntestineChibiAvatar className="w-16 h-16" />
            <span className="text-xs font-bold text-slate-700 mt-2">Ruột Non & Già</span>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-rose-500/25 flex items-center justify-center gap-3 transition-all"
          >
            <Play className="w-6 h-6 fill-white" />
            BẮT ĐẦU CUỘC CHIẾN
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playClick();
              onOpenInstructions();
            }}
            className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-lg rounded-2xl shadow-lg border border-slate-200 flex items-center justify-center gap-2 transition-all"
          >
            <BookOpen className="w-5 h-5 text-indigo-600" />
            HƯỚNG DẪN CHƠI
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

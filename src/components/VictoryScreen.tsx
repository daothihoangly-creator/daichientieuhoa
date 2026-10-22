import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Sparkles, RotateCcw, BookOpen } from 'lucide-react';
import { Team } from '../types';
import { ROUND_BADGES } from '../data/gameData';
import { soundManager } from '../utils/audio';

interface VictoryScreenProps {
  teams: Team[];
  className: string;
  onRestart: () => void;
  onOpenSummary: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({ teams, className, onRestart, onOpenSummary }) => {
  // Sort teams by score descending
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];

  useEffect(() => {
    soundManager.playVictory();
  }, []);

  return (
    <div className="min-h-[calc(100vh-73px)] px-4 py-12 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Trophy Header */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 100 }}
        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl shadow-amber-500/30 flex items-center justify-center text-white mb-6"
      >
        <Trophy className="w-12 h-12" />
      </motion.div>

      <span className="px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold inline-flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-amber-600" />
        Bảng Xếp Hạng Chung Cuộc — {className} (4 Đội Thi Đua)
      </span>

      <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
        VINH DANH ĐỘI VÔ ĐỊCH: {winner.name}!
      </h2>
      <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto mb-10">
        "Chiến thắng lớn nhất là hiểu thêm một điều mới về cơ thể mình và hành trình kỳ diệu của đoàn thức ăn!"
      </p>

      {/* 4 Teams Leaderboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-10">
        {sortedTeams.map((team, index) => {
          const isWinner = index === 0;
          return (
            <div
              key={team.id}
              className={`p-5 rounded-3xl border shadow-xl relative overflow-hidden transition-all text-left flex items-center justify-between ${
                isWinner 
                  ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border-transparent ring-4 ring-amber-400/40' 
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    isWinner ? 'bg-white text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    #{index + 1}
                  </span>
                  <h3 className="text-lg font-bold">{team.name}</h3>
                </div>
                <p className={`text-xs ${isWinner ? 'text-amber-100' : 'text-slate-500'}`}>
                  Trả lời đúng: <span className="font-bold">{team.correctCount}</span> câu
                </p>
              </div>

              <div className="text-right">
                <div className="text-3xl font-black font-mono tracking-tight">{team.score}đ</div>
                {isWinner && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider mt-1">
                    👑 VÔ ĐỊCH
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Badges Earned */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 w-full max-w-2xl mb-10">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Huy hiệu đã thu thập trong hành trình
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ROUND_BADGES.map(badge => (
            <div key={badge.id} className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center text-center">
              <span className="text-2xl mb-1">{badge.icon}</span>
              <span className="text-xs font-bold text-amber-900 line-clamp-1">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <button
          onClick={onOpenSummary}
          className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl shadow-lg border border-slate-200 flex items-center justify-center gap-2 transition-all"
        >
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Xem lại đáp án chuẩn
        </button>

        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Chơi ván mới
        </button>
      </div>
    </div>
  );
};

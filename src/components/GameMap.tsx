import React from 'react';
import { motion } from 'motion/react';
import { Play, CheckCircle2, Lock, Sparkles, Award } from 'lucide-react';
import { GameRound, Badge, Team } from '../types';
import { ROUND_BADGES } from '../data/gameData';
import { soundManager } from '../utils/audio';
import { LeaderboardWidget } from './LeaderboardWidget';

interface GameMapProps {
  teams: Team[];
  completedRounds: GameRound[];
  onSelectRound: (round: GameRound) => void;
  onOpenSummary: () => void;
}

export const GameMap: React.FC<GameMapProps> = ({ teams, completedRounds, onSelectRound, onOpenSummary }) => {
  const roundsConfig = [
    {
      id: 1 as GameRound,
      title: 'Vòng 1: Tiêu Hóa Ở Khoang Miệng',
      subtitle: 'Sắp xếp cụm từ mô tả nhai, nghiền và amylase',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: '🦷'
    },
    {
      id: 2 as GameRound,
      title: 'Vòng 2: Tiêu Hóa Ở Dạ Dày',
      subtitle: 'Thẻ học thuật ngữ co bóp, dịch vị và pepsin',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50 border-purple-200 text-purple-900',
      icon: '🥣'
    },
    {
      id: 3 as GameRound,
      title: 'Vòng 3: Tiêu Hóa Ở Ruột Non',
      subtitle: 'Trắc nghiệm tá tràng, dịch tụy, dịch mật, lông ruột',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: '🧪'
    },
    {
      id: 4 as GameRound,
      title: 'Vòng 4: Ruột Già & Trực Tràng',
      subtitle: 'Điền từ hấp thụ nước, cô đặc chất bã và phân',
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50 border-rose-200 text-rose-900',
      icon: '🌿'
    }
  ];

  const allCompleted = completedRounds.length >= 4;

  return (
    <div className="min-h-[calc(100vh-73px)] px-4 py-12 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <span className="px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold inline-flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          Hành Trình Khám Phá Dạ Dày (4 Đội Thi Đua)
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Chọn Vòng Thử Thách
        </h2>
        <p className="text-slate-600 text-sm md:text-base mt-2">
          Hoàn thành các vòng chơi để thu thập huy hiệu và giải mã bí mật tiêu hóa!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Rounds list (2 columns on large screen) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {roundsConfig.map((r, index) => {
            const isCompleted = completedRounds.includes(r.id);
            const isUnlocked = index === 0 || completedRounds.includes(roundsConfig[index - 1]?.id as GameRound);

            return (
              <motion.div
                key={r.id}
                whileHover={isUnlocked ? { scale: 1.02 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                onClick={() => {
                  if (isUnlocked) {
                    soundManager.playClick();
                    onSelectRound(r.id);
                  }
                }}
                className={`relative rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                  isUnlocked 
                    ? 'bg-white shadow-xl border-slate-200 cursor-pointer hover:border-indigo-400 hover:shadow-indigo-500/10' 
                    : 'bg-slate-100/80 border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {r.icon}
                    </div>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        Đã hoàn thành
                      </span>
                    ) : isUnlocked ? (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Sẵn sàng
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        Đã khóa
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{r.title}</h3>
                  <p className="text-xs text-slate-500 mb-4">{r.subtitle}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-semibold text-amber-600 truncate max-w-[150px]">
                    <Award className="w-4 h-4 shrink-0" />
                    <span className="truncate">{ROUND_BADGES[index].name}</span>
                  </span>
                  {isUnlocked && (
                    <span className="text-indigo-600 font-bold flex items-center gap-1 shrink-0">
                      Vào chơi <Play className="w-3 h-3 fill-current" />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Leaderboard Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <LeaderboardWidget teams={teams} />
          </div>
        </div>
      </div>

      {/* Summary / Knowledge recap button when ready */}
      {allCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenSummary();
            }}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-3 mx-auto transition-all"
          >
            <Sparkles className="w-6 h-6" />
            XEM TỔNG KẾT & ÔN TẬP KIẾN THỨC
          </button>
        </motion.div>
      )}
    </div>
  );
};

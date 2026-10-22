import React from 'react';
import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';
import { Team, TeamId } from '../types';

interface LeaderboardWidgetProps {
  teams: Team[];
  activeTeamId?: TeamId;
  className?: string;
}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ teams, activeTeamId, className = "" }) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className={`bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <h4 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Bảng Xếp Hạng Trực Tiếp (4 Đội)
        </h4>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
          Live Scores
        </span>
      </div>

      <div className="space-y-2.5">
        {sortedTeams.map((team, index) => {
          const isActive = team.id === activeTeamId;
          const isTop = index === 0;

          return (
            <motion.div
              key={team.id}
              layout
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                isActive 
                  ? 'bg-indigo-50/90 border-indigo-400 shadow-sm ring-2 ring-indigo-400/20' 
                  : isTop 
                    ? 'bg-amber-50/70 border-amber-300' 
                    : 'bg-slate-50/60 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shadow-xs ${
                  index === 0 ? 'bg-amber-400 text-slate-900' :
                  index === 1 ? 'bg-slate-300 text-slate-800' :
                  index === 2 ? 'bg-amber-600/30 text-amber-900' : 'bg-slate-200 text-slate-600'
                }`}>
                  {index === 0 ? '👑 1' : index + 1}
                </span>

                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shadow-xs shrink-0">
                    {team.avatar}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block truncate max-w-[120px] sm:max-w-[150px]">
                      {team.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Đúng: <strong className="text-emerald-700">{team.correctCount}</strong> câu
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm sm:text-base font-black font-mono text-slate-900 tracking-tight">
                  {team.score}đ
                </span>
                {isActive && (
                  <span className="block text-[9px] font-extrabold text-indigo-600 uppercase tracking-tighter">
                    Đang trả lời
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

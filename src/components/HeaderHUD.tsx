import React from 'react';
import { Volume2, VolumeX, Maximize, RotateCcw, HelpCircle } from 'lucide-react';
import { Team, GameScreen, TeamId } from '../types';
import { soundManager } from '../utils/audio';

interface HeaderHUDProps {
  teams: Team[];
  activeTeamId: TeamId;
  currentScreen: GameScreen;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenInstructions: () => void;
  onResetGame: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  teams,
  activeTeamId,
  currentScreen,
  soundEnabled,
  onToggleSound,
  onOpenInstructions,
  onResetGame,
}) => {
  const toggleFullscreen = () => {
    soundManager.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <header className="w-full bg-white/85 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-3 sticky top-0 z-40 flex items-center justify-between gap-4">
      {/* Brand / Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-rose-500/20">
          ST
        </div>
        <div>
          <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Đại Chiến Tiêu Hóa
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">KHTN 8 — Toàn Bộ Ống Tiêu Hóa</p>
        </div>
      </div>

      {/* 4 Teams Scores HUD (Only shown when game started) */}
      {currentScreen !== 'start' && currentScreen !== 'setup' && teams.length >= 4 && (
        <div className="hidden lg:flex items-center gap-3">
          {teams.map(team => {
            const isActive = activeTeamId === team.id;
            return (
              <div
                key={team.id}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition-all ${
                  isActive 
                    ? 'ring-2 ring-indigo-400 shadow-sm font-bold bg-indigo-50/80 border-indigo-300' 
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}
              >
                <span className="text-base">{team.avatar}</span>
                <span className="text-xs font-bold text-slate-800 truncate max-w-[90px]">
                  {team.name}
                </span>
                <span className="text-xs font-black font-mono tabular-nums bg-white px-2 py-0.5 rounded-lg border">
                  {team.score}đ
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenInstructions}
          title="Hướng dẫn chơi"
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <button
          onClick={onToggleSound}
          title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
        </button>

        <button
          onClick={toggleFullscreen}
          title="Toàn màn hình"
          className="hidden sm:flex p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Maximize className="w-5 h-5" />
        </button>

        <button
          onClick={onResetGame}
          title="Chơi lại từ đầu"
          className="p-2 rounded-xl text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

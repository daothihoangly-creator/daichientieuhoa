import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Clock, Volume2, ArrowRight } from 'lucide-react';
import { GameSettings } from '../types';
import { soundManager } from '../utils/audio';

interface TeamSetupProps {
  initialSettings: GameSettings;
  onSaveSettings: (settings: GameSettings) => void;
}

const AVATAR_OPTIONS = ['🦁', '🐯', '🦊', '🐼', '🐨', '🐶', '🐱', '🐰', '🦄', '🦖', '🚀', '⭐', '🏆', '🔥'];

export const TeamSetup: React.FC<TeamSetupProps> = ({ initialSettings, onSaveSettings }) => {
  const [settings, setSettings] = useState<GameSettings>(initialSettings);
  const [activeAvatarPicker, setActiveAvatarPicker] = useState<'teamA' | 'teamB' | 'teamC' | 'teamD' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    onSaveSettings(settings);
  };

  const setAvatar = (teamKey: 'teamA' | 'teamB' | 'teamC' | 'teamD', emoji: string) => {
    soundManager.playClick();
    if (teamKey === 'teamA') setSettings({ ...settings, teamAAvatar: emoji });
    if (teamKey === 'teamB') setSettings({ ...settings, teamBAvatar: emoji });
    if (teamKey === 'teamC') setSettings({ ...settings, teamCAvatar: emoji });
    if (teamKey === 'teamD') setSettings({ ...settings, teamDAvatar: emoji });
    setActiveAvatarPicker(null);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-sky-50 via-indigo-50/50 to-pink-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Thiết Lập 4 Đội Chơi & Biểu Tượng Avatar</h2>
            <p className="text-sm text-slate-500">Chọn tên và icon cho các nhóm học sinh trong lớp</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Class Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tên lớp học</label>
            <input
              type="text"
              value={settings.className}
              onChange={e => setSettings({ ...settings, className: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 font-medium"
              placeholder="Ví dụ: Lớp 8A1"
              required
            />
          </div>

          {/* 4 Teams setup grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Team 1 */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
              <label className="block text-xs font-bold text-sky-800 mb-1.5 uppercase tracking-wide">Đội 1 (Đội Xanh)</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveAvatarPicker(activeAvatarPicker === 'teamA' ? null : 'teamA')}
                  className="w-12 h-12 rounded-xl bg-white border border-sky-300 text-2xl flex items-center justify-center shadow-xs hover:bg-sky-100 transition-all shrink-0"
                  title="Chọn avatar"
                >
                  {settings.teamAAvatar}
                </button>
                <input
                  type="text"
                  value={settings.teamAName}
                  onChange={e => setSettings({ ...settings, teamAName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-sky-300 bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-800 font-semibold"
                  required
                />
              </div>
              {activeAvatarPicker === 'teamA' && (
                <div className="mt-2 p-2 bg-white rounded-xl border border-sky-200 grid grid-cols-7 gap-1 shadow-md">
                  {AVATAR_OPTIONS.map(em => (
                    <button key={em} type="button" onClick={() => setAvatar('teamA', em)} className="p-1.5 text-xl hover:bg-sky-100 rounded-lg">
                      {em}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Team 2 */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <label className="block text-xs font-bold text-rose-800 mb-1.5 uppercase tracking-wide">Đội 2 (Đội Đỏ)</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveAvatarPicker(activeAvatarPicker === 'teamB' ? null : 'teamB')}
                  className="w-12 h-12 rounded-xl bg-white border border-rose-300 text-2xl flex items-center justify-center shadow-xs hover:bg-rose-100 transition-all shrink-0"
                  title="Chọn avatar"
                >
                  {settings.teamBAvatar}
                </button>
                <input
                  type="text"
                  value={settings.teamBName}
                  onChange={e => setSettings({ ...settings, teamBName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-rose-300 bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none text-slate-800 font-semibold"
                  required
                />
              </div>
              {activeAvatarPicker === 'teamB' && (
                <div className="mt-2 p-2 bg-white rounded-xl border border-rose-200 grid grid-cols-7 gap-1 shadow-md">
                  {AVATAR_OPTIONS.map(em => (
                    <button key={em} type="button" onClick={() => setAvatar('teamB', em)} className="p-1.5 text-xl hover:bg-rose-100 rounded-lg">
                      {em}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Team 3 */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <label className="block text-xs font-bold text-amber-800 mb-1.5 uppercase tracking-wide">Đội 3 (Đội Vàng)</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveAvatarPicker(activeAvatarPicker === 'teamC' ? null : 'teamC')}
                  className="w-12 h-12 rounded-xl bg-white border border-amber-300 text-2xl flex items-center justify-center shadow-xs hover:bg-amber-100 transition-all shrink-0"
                  title="Chọn avatar"
                >
                  {settings.teamCAvatar}
                </button>
                <input
                  type="text"
                  value={settings.teamCName}
                  onChange={e => setSettings({ ...settings, teamCName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-amber-300 bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-800 font-semibold"
                  required
                />
              </div>
              {activeAvatarPicker === 'teamC' && (
                <div className="mt-2 p-2 bg-white rounded-xl border border-amber-200 grid grid-cols-7 gap-1 shadow-md">
                  {AVATAR_OPTIONS.map(em => (
                    <button key={em} type="button" onClick={() => setAvatar('teamC', em)} className="p-1.5 text-xl hover:bg-amber-100 rounded-lg">
                      {em}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Team 4 */}
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
              <label className="block text-xs font-bold text-purple-800 mb-1.5 uppercase tracking-wide">Đội 4 (Đội Tím)</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveAvatarPicker(activeAvatarPicker === 'teamD' ? null : 'teamD')}
                  className="w-12 h-12 rounded-xl bg-white border border-purple-300 text-2xl flex items-center justify-center shadow-xs hover:bg-purple-100 transition-all shrink-0"
                  title="Chọn avatar"
                >
                  {settings.teamDAvatar}
                </button>
                <input
                  type="text"
                  value={settings.teamDName}
                  onChange={e => setSettings({ ...settings, teamDName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-purple-300 bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none text-slate-800 font-semibold"
                  required
                />
              </div>
              {activeAvatarPicker === 'teamD' && (
                <div className="mt-2 p-2 bg-white rounded-xl border border-purple-200 grid grid-cols-7 gap-1 shadow-md">
                  {AVATAR_OPTIONS.map(em => (
                    <button key={em} type="button" onClick={() => setAvatar('teamD', em)} className="p-1.5 text-xl hover:bg-purple-100 rounded-lg">
                      {em}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Timer Duration */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Thời gian trả lời mỗi câu hỏi
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[15, 20, 30].map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSettings({ ...settings, questionTime: time });
                  }}
                  className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                    settings.questionTime === time
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {time} giây
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-indigo-600" />
              <div>
                <span className="font-semibold text-slate-800 text-sm block">Bật đồng hồ đếm ngược</span>
                <span className="text-xs text-slate-500">Giới hạn thời gian suy nghĩ cho mỗi đội</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.timerEnabled}
                onChange={e => {
                  soundManager.playClick();
                  setSettings({ ...settings, timerEnabled: e.target.checked });
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-indigo-600" />
              <div>
                <span className="font-semibold text-slate-800 text-sm block">Bật âm thanh trò chơi</span>
                <span className="text-xs text-slate-500">Hiệu ứng âm thanh sinh động</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={e => {
                  soundManager.playClick();
                  soundManager.setEnabled(e.target.checked);
                  setSettings({ ...settings, soundEnabled: e.target.checked });
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 transition-all"
          >
            <span>VÀO BẢN ĐỒ THỬ THÁCH (4 ĐỘI)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

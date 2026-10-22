import React, { useState } from 'react';
import { GameScreen, GameRound, GameSettings, Team, TeamId } from './types';
import { ROUND_1_WORD_SCRAMBLE, ROUND_2_FLASHCARDS, ROUND_3_QUIZ, ROUND_4_CROSSWORD } from './data/gameData';
import { HeaderHUD } from './components/HeaderHUD';
import { StartScreen } from './components/StartScreen';
import { TeamSetup } from './components/TeamSetup';
import { GameMap } from './components/GameMap';
import { MouthRound } from './components/rounds/MouthRound';
import { FlashcardRound } from './components/rounds/FlashcardRound';
import { SmallIntestineRound } from './components/rounds/SmallIntestineRound';
import { LargeIntestineRound } from './components/rounds/LargeIntestineRound';
import { KnowledgeSummary } from './components/KnowledgeSummary';
import { VictoryScreen } from './components/VictoryScreen';
import { InstructionsModal } from './components/InstructionsModal';
import { soundManager } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('start');
  const [currentRound, setCurrentRound] = useState<GameRound>(1);
  const [completedRounds, setCompletedRounds] = useState<GameRound[]>([]);
  const [activeTeamIndex, setActiveTeamIndex] = useState<number>(0);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  const [settings, setSettings] = useState<GameSettings>({
    teamAName: 'Đội 1 (Xanh)',
    teamAAvatar: '🦁',
    teamBName: 'Đội 2 (Đỏ)',
    teamBAvatar: '🐯',
    teamCName: 'Đội 3 (Vàng)',
    teamCAvatar: '🦊',
    teamDName: 'Đội 4 (Tím)',
    teamDAvatar: '🐼',
    className: 'Lớp 8A',
    questionTime: 20,
    questionsPerRound: 4, // Exactly 4 questions per round
    timerEnabled: true,
    soundEnabled: true,
  });

  const [teams, setTeams] = useState<Team[]>([
    { id: 'teamA', name: 'Đội 1 (Xanh)', avatar: '🦁', color: '#0284C7', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
    { id: 'teamB', name: 'Đội 2 (Đỏ)', avatar: '🐯', color: '#DC2626', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
    { id: 'teamC', name: 'Đội 3 (Vàng)', avatar: '🦊', color: '#D97706', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
    { id: 'teamD', name: 'Đội 4 (Tím)', avatar: '🐼', color: '#7C3AED', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
  ]);

  const activeTeamId: TeamId = teams[activeTeamIndex].id;

  const handleSaveSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    setTeams([
      { id: 'teamA', name: newSettings.teamAName, avatar: newSettings.teamAAvatar, color: '#0284C7', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
      { id: 'teamB', name: newSettings.teamBName, avatar: newSettings.teamBAvatar, color: '#DC2626', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
      { id: 'teamC', name: newSettings.teamCName, avatar: newSettings.teamCAvatar, color: '#D97706', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
      { id: 'teamD', name: newSettings.teamDName, avatar: newSettings.teamDAvatar, color: '#7C3AED', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
    ]);
    setActiveTeamIndex(0);
    setCurrentScreen('map');
    if (newSettings.soundEnabled) {
      soundManager.startBgm();
    }
  };

  const handleUpdateScore = (teamId: TeamId, points: number, correct: boolean) => {
    setTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          score: t.score + points,
          correctCount: correct ? t.correctCount + 1 : t.correctCount,
          totalAnswered: t.totalAnswered + 1,
        };
      }
      return t;
    }));
  };

  const handleUseHint = (teamId: TeamId) => {
    setTeams(prev => prev.map(t => {
      if (t.id === teamId && t.hintsRemaining > 0) {
        return { ...t, hintsRemaining: t.hintsRemaining - 1 };
      }
      return t;
    }));
  };

  const handleSwitchTeam = () => {
    setActiveTeamIndex(prev => (prev + 1) % teams.length);
  };

  const handleCompleteRound = (round: GameRound) => {
    if (!completedRounds.includes(round)) {
      setCompletedRounds(prev => [...prev, round]);
    }
    setCurrentScreen('map');
  };

  const handleResetGame = () => {
    soundManager.stopBgm();
    setTeams([
      { id: 'teamA', name: settings.teamAName, avatar: settings.teamAAvatar, color: '#0284C7', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
      { id: 'teamB', name: settings.teamBName, avatar: settings.teamBAvatar, color: '#DC2626', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
      { id: 'teamC', name: settings.teamCName, avatar: settings.teamCAvatar, color: '#D97706', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
      { id: 'teamD', name: settings.teamDName, avatar: settings.teamDAvatar, color: '#7C3AED', score: 0, correctCount: 0, totalAnswered: 0, hintsRemaining: 3 },
    ]);
    setActiveTeamIndex(0);
    setCompletedRounds([]);
    setCurrentScreen('setup');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
      <HeaderHUD
        teams={teams}
        activeTeamId={activeTeamId}
        currentScreen={currentScreen}
        soundEnabled={settings.soundEnabled}
        onToggleSound={() => {
          const next = !settings.soundEnabled;
          setSettings(s => ({ ...s, soundEnabled: next }));
          soundManager.setEnabled(next);
        }}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        onResetGame={handleResetGame}
      />

      <main>
        {currentScreen === 'start' && (
          <StartScreen
            onStart={() => setCurrentScreen('setup')}
            onOpenInstructions={() => setIsInstructionsOpen(true)}
          />
        )}

        {currentScreen === 'setup' && (
          <TeamSetup
            initialSettings={settings}
            onSaveSettings={handleSaveSettings}
          />
        )}

        {currentScreen === 'map' && (
          <GameMap
            teams={teams}
            completedRounds={completedRounds}
            onSelectRound={round => {
              setCurrentRound(round);
              if (round === 1) setCurrentScreen('wordscramble' as GameScreen);
              else if (round === 2) setCurrentScreen('puzzle' as GameScreen);
              else if (round === 3) setCurrentScreen('quiz');
              else if (round === 4) setCurrentScreen('crossword');
            }}
            onOpenSummary={() => setCurrentScreen('summary')}
          />
        )}

        {currentScreen === ('wordscramble' as GameScreen) && (
          <MouthRound
            teams={teams}
            activeTeamId={activeTeamId}
            questionTime={settings.questionTime}
            timerEnabled={settings.timerEnabled}
            onUpdateScore={handleUpdateScore}
            onCompleteRound={() => handleCompleteRound(1)}
            onUseHint={handleUseHint}
          />
        )}

        {currentScreen === ('puzzle' as GameScreen) && (
          <FlashcardRound
            items={ROUND_2_FLASHCARDS}
            teams={teams}
            activeTeamId={activeTeamId}
            timerSeconds={settings.questionTime}
            timerEnabled={settings.timerEnabled}
            onUpdateScore={handleUpdateScore}
            onUseHint={handleUseHint}
            onSwitchTeam={handleSwitchTeam}
            onCompleteRound={() => handleCompleteRound(2)}
            onBackToMap={() => setCurrentScreen('map')}
          />
        )}

        {currentScreen === 'quiz' && (
          <SmallIntestineRound
            teams={teams}
            activeTeamId={activeTeamId}
            questionTime={settings.questionTime}
            timerEnabled={settings.timerEnabled}
            onUpdateScore={handleUpdateScore}
            onCompleteRound={() => handleCompleteRound(3)}
            onUseHint={handleUseHint}
          />
        )}

        {currentScreen === 'crossword' && (
          <LargeIntestineRound
            teams={teams}
            activeTeamId={activeTeamId}
            questionTime={settings.questionTime}
            timerEnabled={settings.timerEnabled}
            onUpdateScore={handleUpdateScore}
            onCompleteRound={() => handleCompleteRound(4)}
            onUseHint={handleUseHint}
          />
        )}

        {currentScreen === 'summary' && (
          <KnowledgeSummary
            onProceedToVictory={() => setCurrentScreen('victory')}
            onRestart={handleResetGame}
          />
        )}

        {currentScreen === 'victory' && (
          <VictoryScreen
            teams={teams}
            className={settings.className}
            onRestart={handleResetGame}
            onOpenSummary={() => setCurrentScreen('summary')}
          />
        )}
      </main>

      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />
    </div>
  );
}

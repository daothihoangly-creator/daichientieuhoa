export type GameScreen = 
  | 'start' 
  | 'setup' 
  | 'map' 
  | 'quiz' 
  | 'dragdrop' 
  | 'puzzle' 
  | 'crossword' 
  | 'wordscramble'
  | 'summary' 
  | 'victory';

export type GameRound = 1 | 2 | 3 | 4;

export type TeamId = 'teamA' | 'teamB' | 'teamC' | 'teamD';

export interface Team {
  id: TeamId;
  name: string;
  avatar: string;
  color: string;
  score: number;
  correctCount: number;
  totalAnswered: number;
  hintsRemaining: number;
}

export interface GameSettings {
  teamAName: string;
  teamAAvatar: string;
  teamBName: string;
  teamBAvatar: string;
  teamCName: string;
  teamCAvatar: string;
  teamDName: string;
  teamDAvatar: string;
  className: string;
  questionTime: number;
  questionsPerRound: number;
  timerEnabled: boolean;
  soundEnabled: boolean;
}

export interface Question {
  id: string;
  round: GameRound;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface WordScrambleItem {
  id: string;
  question: string;
  words: string[];
  explanation: string;
  hint: string;
}

export interface FlashcardItem {
  id: string;
  front: string; // Question / Term
  back: string;  // Answer / Definition
  explanation: string;
  hint: string;
}

export interface CrosswordItem {
  id: string;
  question: string;
  missingWord: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface Badge {
  id: GameRound;
  name: string;
  description: string;
  icon: string;
}

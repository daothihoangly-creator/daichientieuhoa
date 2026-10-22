import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Award, ArrowRight, BookOpen, RotateCcw, Eye, HelpCircle } from 'lucide-react';
import { ROUND_1_WORD_SCRAMBLE, ROUND_2_FLASHCARDS, ROUND_3_QUIZ, ROUND_4_CROSSWORD, SUMMARY_REVIEW_QUESTIONS } from '../data/gameData';
import { soundManager } from '../utils/audio';

interface KnowledgeSummaryProps {
  onProceedToVictory: () => void;
  onRestart: () => void;
}

export const KnowledgeSummary: React.FC<KnowledgeSummaryProps> = ({ onProceedToVictory, onRestart }) => {
  const [reviewAnswers, setReviewAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [showTeacherAnswerKey, setShowTeacherAnswerKey] = useState(false);

  const handleSelectOption = (qId: string, optIdx: number) => {
    soundManager.playClick();
    setReviewAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleCheckReview = () => {
    soundManager.playClick();
    setShowResults(true);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] px-4 py-12 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold inline-flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Tổng Kết Kiến Thức Trọng Tâm (GDPT 2018)
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          BÍ MẬT CỦA DẠ DÀY ĐÃ ĐƯỢC GIẢI MÃ!
        </h2>
        <p className="text-slate-600 text-sm md:text-base mt-2">
          Hệ thống hóa kiến thức tiêu hóa cơ học và hóa học tại dạ dày cho học sinh và giáo viên.
        </p>
      </div>

      {/* Teacher Answer Key Toggle Button */}
      <div className="mb-8 text-center">
        <button
          onClick={() => {
            soundManager.playClick();
            setShowTeacherAnswerKey(!showTeacherAnswerKey);
          }}
          className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-500/20 inline-flex items-center gap-2 transition-all"
        >
          <Eye className="w-5 h-5" />
          {showTeacherAnswerKey ? 'Ẩn bảng đáp án chuẩn của giáo viên' : '📖 Xem toàn bộ đáp án các vòng để tổng kết bài học'}
        </button>
      </div>

      {/* Teacher Answer Key Section */}
      {showTeacherAnswerKey && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-50/80 rounded-3xl shadow-xl border-2 border-indigo-200 p-6 md:p-8 mb-10 space-y-8"
        >
          <div className="border-b border-indigo-200 pb-4">
            <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              Bảng Đáp Án Chuẩn Toàn Bộ 4 Vòng Thử Thách
            </h3>
            <p className="text-xs text-indigo-700 mt-1">
              Dành cho giáo viên sử dụng tổng kết, giảng giải chi tiết cho 4 nhóm học sinh.
            </p>
          </div>

          {/* Vòng 1 */}
          <div className="space-y-4">
            <h4 className="font-bold text-indigo-900 text-base bg-indigo-100/70 px-4 py-2 rounded-xl">
              Vòng 1: Sắp Xếp Chữ (Tiêu hóa cơ học)
            </h4>
            <div className="space-y-3">
              {ROUND_1_WORD_SCRAMBLE.map((item, idx) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-xs">
                  <p className="font-semibold text-slate-900 text-sm mb-1">{idx + 1}. {item.question}</p>
                  <p className="text-xs text-emerald-700 font-bold mb-1">✓ Đáp án đúng: {item.words.join(' ')}</p>
                  <p className="text-xs text-slate-600 italic">Giải thích: {item.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vòng 2 */}
          <div className="space-y-4">
            <h4 className="font-bold text-indigo-900 text-base bg-indigo-100/70 px-4 py-2 rounded-xl">
              Vòng 2: Thẻ Học Từ Vựng (Flashcards)
            </h4>
            <div className="space-y-3">
              {ROUND_2_FLASHCARDS.map((item, idx) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-xs">
                  <p className="font-semibold text-slate-900 text-sm mb-1">{idx + 1}. Thuật ngữ mặt trước: {item.front}</p>
                  <p className="text-xs text-emerald-700 font-bold mb-1">✓ Định nghĩa mặt sau: {item.back}</p>
                  <p className="text-xs text-slate-600 italic">Giải thích: {item.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vòng 3 */}
          <div className="space-y-4">
            <h4 className="font-bold text-indigo-900 text-base bg-indigo-100/70 px-4 py-2 rounded-xl">
              Vòng 3: Trắc Nghiệm Protein
            </h4>
            <div className="space-y-3">
              {ROUND_3_QUIZ.map((item, idx) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-xs">
                  <p className="font-semibold text-slate-900 text-sm mb-1">{idx + 1}. {item.question}</p>
                  <p className="text-xs text-emerald-700 font-bold mb-1">✓ Đáp án đúng: {item.options[item.correctIndex]}</p>
                  <p className="text-xs text-slate-600 italic">Giải thích: {item.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vòng 4 */}
          <div className="space-y-4">
            <h4 className="font-bold text-indigo-900 text-base bg-indigo-100/70 px-4 py-2 rounded-xl">
              Vòng 4: Ô Chữ / Điền Từ Khuyết
            </h4>
            <div className="space-y-3">
              {ROUND_4_CROSSWORD.map((item, idx) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-xs">
                  <p className="font-semibold text-slate-900 text-sm mb-1">{idx + 1}. {item.question}</p>
                  <p className="text-xs text-emerald-700 font-bold mb-1">✓ Đáp án đúng: {item.options[item.correctIndex]}</p>
                  <p className="text-xs text-slate-600 italic">Giải thích: {item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Summary Cards */}
      <div className="space-y-6 mb-12">
        {/* Part A */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-lg">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900">TIÊU HÓA Ở KHOANG MIỆNG</h3>
          </div>
          <ul className="space-y-2 text-slate-700 text-sm md:text-base list-disc list-inside">
            <li><strong>Tiêu hóa cơ học:</strong> Nhờ hoạt động nhai, nghiền của răng và hoạt động đảo trộn của lưỡi.</li>
            <li><strong>Tiêu hóa hóa học:</strong> Enzyme amylase của tuyến nước bọt giúp biến đổi một phần tinh bột chín trong thức ăn thành đường maltose.</li>
          </ul>
        </div>

        {/* Part B */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900">TIÊU HÓA Ở DẠ DÀY</h3>
          </div>
          <ul className="space-y-2 text-slate-700 text-sm md:text-base list-disc list-inside">
            <li><strong>Tiêu hóa cơ học:</strong> Hoạt động co bóp của các lớp cơ thành dạ dày giúp thức ăn được nhuyễn và thấm đều dịch vị.</li>
            <li><strong>Tiêu hóa hóa học:</strong> Dịch vị chứa hydrochloric acid (HCl), enzyme lipase và enzyme pepsin.</li>
            <li><strong>Vai trò pepsin:</strong> Giúp biến đổi một phần protein trong thức ăn thành các chuỗi peptide ngắn hơn.</li>
          </ul>
        </div>

        {/* Part C */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900">TIÊU HÓA Ở RUỘT NON</h3>
          </div>
          <ul className="space-y-2 text-slate-700 text-sm md:text-base list-disc list-inside">
            <li><strong>Tá tràng:</strong> Nhận thức ăn từ dạ dày, có dịch tụy (tuyến tụy) và dịch mật (gan) đổ vào. Tuyến ruột tiết dịch ruột.</li>
            <li><strong>Biến đổi chất dinh dưỡng:</strong> Chứa các enzyme biến đổi chất dinh dưỡng thành các chất đơn giản mà cơ thể hấp thụ được.</li>
            <li><strong>Hấp thụ:</strong> Tiêu hóa chủ yếu ở ruột non nhờ mạng lưới mao mạch máu và bạch huyết dày đặc ở thành lông ruột.</li>
          </ul>
        </div>

        {/* Part D */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-lg">
              4
            </div>
            <h3 className="text-xl font-bold text-slate-900">TIÊU HÓA Ở RUỘT GIÀ & TRỰC TRÀNG</h3>
          </div>
          <ul className="space-y-2 text-slate-700 text-sm md:text-base list-disc list-inside">
            <li><strong>Hấp thụ nước:</strong> Ruột già hấp thụ thêm một số chất dinh dưỡng và chủ yếu hấp thụ lại nước, cô đặc chất bã.</li>
            <li><strong>Vi khuẩn phân huỷ:</strong> Vi khuẩn ruột già phân huỷ chất còn lại (protein, carbohydrate) lên men tạo thành phân.</li>
            <li><strong>Thải phân:</strong> Thải ra ngoài nhờ nhu động của ruột già và theo cơ chế phản xạ đại tiện.</li>
          </ul>
        </div>

        {/* Interactive Flow Diagram */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl shadow-2xl p-6 md:p-8 text-center">
          <h3 className="text-lg font-bold mb-6 text-indigo-300 uppercase tracking-wider">Sơ Đồ Tương Tác Quá Trình Tiêu Hóa Ở Dạ Dày</h3>
          
          <div className="flex flex-col items-center gap-3 max-w-md mx-auto text-sm">
            <div className="w-full py-3 px-4 bg-white/10 rounded-2xl border border-white/20 font-bold">
              THỨC ĂN ĐI VÀO DẠ DÀY
            </div>
            <div className="text-indigo-400 font-bold">↓</div>
            <div className="w-full py-3 px-4 bg-white/10 rounded-2xl border border-white/20 font-bold">
              CƠ CO BÓP, NHÀO TRỘN + DỊCH VỊ (HCl & Pepsin)
            </div>
            <div className="text-indigo-400 font-bold">↓</div>
            <div className="w-full py-3 px-4 bg-white/10 rounded-2xl border border-white/20 font-bold">
              TIÊU HÓA CƠ HỌC + TIÊU HÓA HÓA HỌC PROTEIN
            </div>
            <div className="text-indigo-400 font-bold">↓</div>
            <div className="w-full py-3 px-4 bg-white/10 rounded-2xl border border-white/20 font-bold">
              HỖN HỢP NHUYỄN (VỊ TRẤP)
            </div>
            <div className="text-indigo-400 font-bold">↓</div>
            <div className="w-full py-3 px-4 bg-emerald-600/80 rounded-2xl border border-emerald-400/40 font-bold">
              CHUYỂN XUỐNG RUỘT NON TIẾP TỤC TIÊU HÓA & HẤP THU
            </div>
          </div>
        </div>
      </div>

      {/* Quick Review Check Section */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 mb-12">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          Kiểm tra nhanh kiến thức đã học (5 câu hỏi)
        </h3>

        <div className="space-y-6">
          {SUMMARY_REVIEW_QUESTIONS.map((q, idx) => {
            const userChoice = reviewAnswers[q.id];
            const isCorrect = userChoice === q.correctIndex;

            return (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="font-semibold text-slate-900 text-sm md:text-base mb-3">
                  {idx + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    let btnBg = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                    if (userChoice === optIdx) {
                      if (showResults) {
                        btnBg = optIdx === q.correctIndex 
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold' 
                          : 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                      } else {
                        btnBg = 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold';
                      }
                    } else if (showResults && optIdx === q.correctIndex) {
                      btnBg = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={showResults}
                        className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition-all ${btnBg}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {showResults && (
                  <p className={`text-xs mt-2 font-semibold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isCorrect ? '✓ Chính xác!' : '✗ Chưa chính xác.'} {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {!showResults && (
          <div className="mt-6 text-center">
            <button
              onClick={handleCheckReview}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              Kiểm tra đáp án ôn tập
            </button>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Chơi lại từ đầu
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onProceedToVictory();
          }}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 transition-all"
        >
          <span>Đến Bảng Xếp Hạng 4 Đội</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

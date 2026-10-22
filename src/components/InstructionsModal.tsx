import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DrStomachAvatar } from './Characters';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <DrStomachAvatar className="w-16 h-16 shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Hướng Dẫn Chơi & Mục Tiêu Sư Phạm</h2>
              <p className="text-sm text-slate-500">Môn Khoa học tự nhiên lớp 8 — Chủ đề Tiêu hóa ở dạ dày</p>
            </div>
          </div>

          <div className="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
              <h3 className="font-semibold text-sky-900 mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-600" />
                Mục tiêu bài học (GDPT 2018)
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-sky-800">
                <li>Mô tả quá trình tiêu hóa cơ học: các lớp cơ co bóp, nhào trộn thức ăn với dịch vị, nghiền nhỏ.</li>
                <li>Mô tả quá trình tiêu hóa hóa học: enzyme pepsin phân giải một phần protein thành peptide ngắn.</li>
                <li>Hiểu vai trò của HCl: tạo môi trường acid cho pepsin hoạt động, biến tính protein, diệt khuẩn.</li>
                <li>Phân biệt tiêu hóa cơ học và tiêu hóa hóa học.</li>
                <li>Nắm bắt sản phẩm là vị trấp tiếp tục chuyển xuống ruột non.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-3 text-lg">Cấu Trúc 4 Vòng Thử Thách</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                  <span className="font-bold text-amber-800">Vòng 1: Đường đua nhào trộn</span>
                  <p className="text-xs text-amber-700 mt-1">Khám phá hoạt động tiêu hóa cơ học và sự co bóp của thành dạ dày.</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                  <span className="font-bold text-purple-800">Vòng 2: Giải mã dịch vị</span>
                  <p className="text-xs text-purple-700 mt-1">Tìm hiểu vai trò của HCl và enzyme pepsin trong tiêu hóa hóa học.</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="font-bold text-emerald-800">Vòng 3: Truy tìm mảnh ghép protein</span>
                  <p className="text-xs text-emerald-700 mt-1">Trò chơi kéo thả phân loại chính xác tiêu hóa cơ học và hóa học.</p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
                  <span className="font-bold text-rose-800">Vòng 4: Đấu trí khoa học</span>
                  <p className="text-xs text-rose-700 mt-1">Giải quyết các tình huống vận dụng thực tiễn sinh học.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Quy tắc đối kháng 2 đội
              </h3>
              <p className="text-slate-600 text-xs md:text-sm">
                Hai đội (Đội Xanh và Đội Đỏ) lần lượt trả lời câu hỏi hoặc thực hiện thử thách. Trả lời đúng nhận +100 điểm, sai nhận 0 điểm. Giáo viên có thể điều khiển lượt chơi, tạm dừng hoặc xem tổng kết khoa học chi tiết ở cuối game.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all"
            >
              Đã hiểu, bắt đầu thôi!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

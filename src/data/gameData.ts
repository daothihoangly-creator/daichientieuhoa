import { Question, WordScrambleItem, FlashcardItem, CrosswordItem, Badge } from '../types';

export const ROUND_BADGES: Badge[] = [
  {
    id: 1,
    name: 'Bậc thầy Khoang miệng',
    description: 'Nắm vững quá trình tiêu hóa cơ học và hóa học tại khoang miệng.',
    icon: '🦷'
  },
  {
    id: 2,
    name: 'Chuyên gia Dạ dày',
    description: 'Hiểu rõ hoạt động co bóp và dịch vị tiêu hóa protein ở dạ dày.',
    icon: '🥣'
  },
  {
    id: 3,
    name: 'Thợ săn Ruột non',
    description: 'Khám phá tá tràng, dịch tụy, dịch mật và cơ chế hấp thụ chất dinh dưỡng.',
    icon: '🧪'
  },
  {
    id: 4,
    name: 'Nhà khoa học Ruột già',
    description: 'Hoàn thành thử thách hấp thụ nước và cô đặc chất bã ở ruột già.',
    icon: '🌿'
  }
];

// VÒNG 1: TIÊU HÓA Ở KHOANG MIỆNG (Sắp xếp cụm từ - 2 câu)
export const ROUND_1_WORD_SCRAMBLE: WordScrambleItem[] = [
  {
    id: 'w1',
    question: 'Câu 1: Sắp xếp các cơ quan sau theo đúng thứ tự di chuyển của thức ăn trong ống tiêu hóa:',
    words: ['Khoang miệng', 'Dạ dày', 'Ruột non (tá tràng)', 'Ruột già và trực tràng'],
    explanation: 'Đáp án chuẩn theo tài liệu: Khoang miệng -> Dạ dày -> Ruột non (tá tràng) -> Ruột già và trực tràng.',
    hint: 'Gợi ý: Bắt đầu từ Khoang miệng.'
  },
  {
    id: 'w2',
    question: 'Câu 2: Sắp xếp các cụm từ mô tả vai trò enzyme amylase ở khoang miệng:',
    words: ['Enzyme amylase', 'của tuyến nước bọt', 'biến đổi một phần tinh bột chín', 'thành đường maltose'],
    explanation: 'Đáp án chuẩn: Enzyme amylase của tuyến nước bọt biến đổi một phần tinh bột chín thành đường maltose.',
    hint: 'Gợi ý: Bắt đầu bằng "Enzyme amylase".'
  }
];

// VÒNG 2: TIÊU HÓA Ở DẠ DÀY (Thẻ học Flashcards - 2 câu)
export const ROUND_2_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'f1',
    front: 'Nguyên nhân chính gây nên bệnh viêm loét dạ dày - tá tràng là gì?',
    back: 'Do vi khuẩn Helicobacter pylori (H. pylori) phá hủy lớp chất nhầy bảo vệ niêm mạc.',
    explanation: 'Tài liệu chuyên đề: Vi khuẩn H. pylori là tác nhân vi sinh hàng đầu phá hủy lớp niêm mạc dạ dày - tá tràng.',
    hint: 'Gợi ý: Loại vi khuẩn ký sinh ở dạ dày.'
  },
  {
    id: 'f2',
    front: 'Dịch vị dạ dày chứa các thành phần dịch và enzyme nào?',
    back: 'Hydrochloric acid (HCl), enzyme lipase và enzyme pepsin giúp tiêu hóa protein.',
    explanation: 'Hoạt động co bóp kết hợp dịch vị chứa HCl, lipase và pepsin giúp nhuyễn hóa và tiêu hóa một phần protein.',
    hint: 'Gợi ý: Gồm acid HCl cùng lipase và pepsin.'
  }
];

// VÒNG 3: TIÊU HÓA Ở RUỘT NON (Trắc nghiệm - 2 câu)
export const ROUND_3_QUIZ: Question[] = [
  {
    id: 'q1',
    round: 3,
    question: 'Câu 1. Sự tiêu hóa và hấp thụ các chất dinh dưỡng diễn ra chủ yếu ở bộ phận nào trong ống tiêu hóa?',
    options: ['Khoang miệng', 'Dạ dày', 'Ruột non', 'Ruột già'],
    correctIndex: 2,
    explanation: 'Đáp án chuẩn: Ruột non là cơ quan quan trọng nhất diễn ra tiêu hóa và hấp thụ chất dinh dưỡng nhờ lông ruột và các tuyến tiêu hóa.',
    hint: 'Gợi ý: Bộ phận có diện tích bề mặt lớn nhất trong ống tiêu hóa.'
  },
  {
    id: 'q2',
    round: 3,
    question: 'Câu 2. Tại tá tràng, thức ăn nhận dịch tụy, dịch mật và dịch ruột để biến đổi thành những chất đơn giản mà cơ thể có thể gì?',
    options: ['Thải ra ngoài', 'Hấp thụ được', 'Lưu trữ ở gan', 'Chuyển hóa thành mỡ'],
    correctIndex: 1,
    explanation: 'Đáp án chuẩn: Biến đổi thành những chất đơn giản mà cơ thể có thể hấp thụ được qua thành lông ruột.',
    hint: 'Gợi ý: Mục đích cuối cùng của tiêu hóa là để cơ thể làm gì?'
  }
];

// VÒNG 4: TIÊU HÓA Ở RUỘT GIÀ & TRỰC TRÀNG (Điền từ / Trắc nghiệm - 2 câu)
export const ROUND_4_CROSSWORD: CrosswordItem[] = [
  {
    id: 'cw1',
    question: 'Câu 1. Thức ăn chuyển xuống ruột già sẽ chủ yếu hấp thụ lại chất nào và cô đặc chất bã?',
    missingWord: 'nước',
    options: ['Nước', 'Protein', 'Lipid', 'Vitamin'],
    correctIndex: 0,
    explanation: 'Đáp án chuẩn: Ruột già chủ yếu hấp thụ lại nước để cô đặc chất bã trước khi tạo thành phân.',
    hint: 'Gợi ý: Chất lỏng chủ yếu được tái hấp thu ở ruột già.'
  },
  {
    id: 'cw2',
    question: 'Câu 2. Quá trình thải phân ở ruột già diễn ra nhờ nhu động của ruột và theo cơ chế nào?',
    missingWord: 'phản xạ',
    options: ['Chủ động hoàn toàn', 'Phản xạ (phản xạ đại tiện)', 'Tuần hoàn máu', 'Tiết tố hormone'],
    correctIndex: 1,
    explanation: 'Đáp án chuẩn: Quá trình thải phân diễn ra theo cơ chế phản xạ (phản xạ đại tiện) nhờ nhu động ruột.',
    hint: 'Gợi ý: Cơ chế tự nhiên không hoàn toàn kiểm soát ý chí.'
  }
];

export const SUMMARY_REVIEW_QUESTIONS: Question[] = [
  {
    id: 'rev_1',
    round: 1,
    question: 'Enzyme amylase của nước bọt biến đổi một phần tinh bột chín thành đường maltose đúng hay sai?',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'Amylase trong nước bọt thủy phân một phần tinh bột chín thành đường maltose tại khoang miệng.',
    hint: 'Gợi ý: Vai trò enzyme nước bọt.'
  },
  {
    id: 'rev_2',
    round: 2,
    question: 'Vi khuẩn Helicobacter pylori (H. pylori) là nguyên nhân chính gây bệnh viêm loét dạ dày - tá tràng đúng hay sai?',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'Vi khuẩn H. pylori phá hủy lớp chất nhầy bảo vệ niêm mạc gây viêm loét dạ dày - tá tràng.',
    hint: 'Gợi ý: Vi khuẩn gây viêm loét.'
  },
  {
    id: 'rev_3',
    round: 3,
    question: 'Ruột non là cơ quan tiêu hóa và hấp thụ chất dinh dưỡng chủ yếu của cơ thể đúng hay sai?',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'Ruột non có lông ruột, mạch máu và bạch huyết giúp tiêu hóa và hấp thụ triệt để dưỡng chất.',
    hint: 'Gợi ý: Cơ quan hấp thụ chính.'
  },
  {
    id: 'rev_4',
    round: 4,
    question: 'Ruột già có chức năng hấp thụ lại nước và cô đặc chất bã thành phân đúng hay sai?',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'Ruột già tái hấp thu nước, lên men vi khuẩn tạo phân và thải qua phản xạ đại tiện.',
    hint: 'Gợi ý: Chức năng của ruột già.'
  }
];

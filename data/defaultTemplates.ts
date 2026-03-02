
import { ExamConfig, ExamType, QuestionFormat } from '../types';

export interface DefaultTemplate {
  id: string;
  name: string;
  description: string;
  config: Partial<ExamConfig>;
}

export const DEFAULT_TEMPLATES: DefaultTemplate[] = [
  {
    id: 'math-mid-6',
    name: 'Toán 6 - Giữa kỳ 1',
    description: 'Cấu trúc chuẩn 70% TN + 30% TL, 60 phút',
    config: {
      subject: 'Toán học',
      grade: '6',
      examType: ExamType.MID_TERM,
      duration: 60,
      format: QuestionFormat.COMBINED,
      questionCounts: { part1: 12, part2: 0, part3: 0, part4: 4 },
      levelDistribution: { awareness: 40, understanding: 30, application: 30 }
    }
  },
  {
    id: 'literature-final-9',
    name: 'Ngữ văn 9 - Cuối kỳ',
    description: '100% Tự luận, 90 phút, Đọc hiểu + Làm văn',
    config: {
      subject: 'Ngữ văn',
      grade: '9',
      examType: ExamType.FINAL,
      duration: 90,
      format: QuestionFormat.ESSAY,
      questionCounts: { part1: 0, part2: 0, part3: 0, part4: 2 },
      levelDistribution: { awareness: 20, understanding: 40, application: 40 }
    }
  },
  {
    id: 'english-regular-10',
    name: 'Tiếng Anh 10 - Thường xuyên',
    description: '100% Trắc nghiệm, 45 phút',
    config: {
      subject: 'Ngoại ngữ 1 (Tiếng Anh)',
      grade: '10',
      examType: ExamType.REGULAR,
      duration: 45,
      format: QuestionFormat.MCQ,
      questionCounts: { part1: 40, part2: 0, part3: 0, part4: 0 },
      levelDistribution: { awareness: 50, understanding: 30, application: 20 }
    }
  },
  {
    id: 'science-mid-7',
    name: 'KHTN 7 - Giữa kỳ',
    description: 'Kết hợp TN + TL, 60 phút',
    config: {
      subject: 'Khoa học tự nhiên',
      grade: '7',
      examType: ExamType.MID_TERM,
      duration: 60,
      format: QuestionFormat.COMBINED,
      questionCounts: { part1: 16, part2: 0, part3: 0, part4: 3 },
      levelDistribution: { awareness: 40, understanding: 30, application: 30 }
    }
  }
];

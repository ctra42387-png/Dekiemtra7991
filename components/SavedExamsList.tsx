import React from 'react';
import { SavedExam } from '../types.ts';
import { History as HistoryIcon, Trash2, Eye, Calendar, BookOpen, Clock, ChevronLeft, Trash } from 'lucide-react';

interface Props {
  exams: SavedExam[];
  onView: (exam: SavedExam) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onBack: () => void;
  filterSubject?: string | null;
  onClearFilter?: () => void;
}

const SavedExamsList: React.FC<Props> = ({ exams, onView, onDelete, onClearAll, onBack, filterSubject, onClearFilter }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-xl transition-colors"
          >
            <ChevronLeft size={24} className="text-slate-600" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HistoryIcon className="text-blue-600" size={28} />
              {filterSubject ? `Lịch sử môn ${filterSubject}` : 'Kho Lưu Trữ Hồ Sơ'}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {filterSubject 
                ? `Danh sách các đề kiểm tra môn ${filterSubject} đã tạo` 
                : 'Danh sách các đề kiểm tra đã được AI tạo và lưu trữ'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {filterSubject && onClearFilter && (
            <button 
              onClick={onClearFilter}
              className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-100 transition-all"
            >
              Xem tất cả môn
            </button>
          )}
          {exams.length > 0 && (
          <button 
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn xóa tất cả hồ sơ đã lưu không?')) {
                onClearAll();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-100 transition-all"
          >
            <Trash size={16} />
            Xóa tất cả
          </button>
        )}
      </div>
    </div>

    {exams.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-12 text-center border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <HistoryIcon size={40} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Chưa có hồ sơ nào được lưu</h3>
          <p className="text-slate-500 max-w-xs mx-auto mb-6">Hãy tạo đề kiểm tra mới và nhấn nút "Lưu trữ" để xem lại tại đây.</p>
          <button 
            onClick={onBack}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-100 transition-all"
          >
            Tạo đề ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {exams.map((exam) => (
            <div 
              key={exam.id}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-white shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 group-hover:text-blue-700 transition-colors uppercase tracking-tight">
                    {exam.title || `${exam.config.subject} - Lớp ${exam.config.grade}`}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                      <Calendar size={14} /> {formatDate(exam.savedAt)}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                      <Clock size={14} /> {exam.config.duration} phút
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase">
                      {exam.config.examType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => onView(exam)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
                >
                  <Eye size={18} /> Xem lại
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm('Bạn có chắc chắn muốn xóa hồ sơ này không?')) {
                      onDelete(exam.id);
                    }
                  }}
                  className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                  title="Xóa hồ sơ"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedExamsList;

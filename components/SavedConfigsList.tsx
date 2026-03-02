
import React from 'react';
import { SavedConfig } from '../types.ts';
import { Trash2, Calendar, Book, GraduationCap, Clock, ChevronRight, Layout } from 'lucide-react';

interface Props {
  configs: SavedConfig[];
  onSelect: (config: SavedConfig) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onBack: () => void;
}

const SavedConfigsList: React.FC<Props> = ({ configs, onSelect, onDelete, onClearAll, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-600/20">
            <Layout size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Mẫu Thiết Lập Đã Lưu</h2>
            <p className="text-slate-500 font-medium">Sử dụng lại các cấu hình đề thi bạn đã thiết lập</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {configs.length > 0 && (
            <button 
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn xoá TẤT CẢ mẫu thiết lập đã lưu không? Hành động này không thể hoàn tác.')) {
                  onClearAll();
                }
              }}
              className="px-4 py-2 rounded-xl border border-red-100 text-red-500 font-bold hover:bg-red-50 transition-all flex items-center gap-2 text-xs"
            >
              <Trash2 size={16} /> XOÁ TẤT CẢ
            </button>
          )}
          <button 
            onClick={onBack}
            className="px-6 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
          >
            Quay lại
          </button>
        </div>
      </div>

      {configs.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-12 text-center border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Layout size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Chưa có mẫu thiết lập nào</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Bạn có thể lưu các thiết lập môn học, khối lớp và phạm vi kiến thức để sử dụng lại nhanh chóng cho các lần sau.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {configs.map((item) => (
            <div 
              key={item.id}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </h3>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-full border border-indigo-100">
                    {item.config.examType}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Book size={14} className="text-indigo-400" />
                    <span className="text-xs font-bold">{item.config.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <GraduationCap size={14} className="text-indigo-400" />
                    <span className="text-xs font-bold">Lớp {item.config.grade}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock size={14} className="text-indigo-400" />
                    <span className="text-xs font-bold">{item.config.duration} phút</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar size={14} />
                    <span className="text-[10px] font-medium">
                      {new Date(item.savedAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t md:border-t-0 pt-4 md:pt-0 relative z-[100]">
                <button 
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (window.confirm(`Bạn có chắc chắn muốn xóa mẫu thiết lập "${item.name}" không?`)) {
                      onDelete(item.id);
                    }
                  }}
                  className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-600 hover:text-white rounded-2xl transition-all border border-red-100 cursor-pointer active:scale-90 touch-manipulation shadow-sm pointer-events-auto"
                  style={{ zIndex: 100 }}
                  title="Xóa mẫu này"
                >
                  <Trash2 size={20} className="pointer-events-none" />
                </button>
                <button 
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onSelect(item);
                  }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-600/40 transition-all active:scale-95 touch-manipulation pointer-events-auto"
                  style={{ zIndex: 100 }}
                >
                  Sử dụng mẫu <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedConfigsList;

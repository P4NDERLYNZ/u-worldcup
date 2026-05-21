import { useState, useContext, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ArrowLeft, Check, Trash, Plus, X, Edit2, Save, Target, HelpCircle, ChevronDown } from 'lucide-react';

const tierOptions = [
  { value: 1, label: 'Tier 1 • พื้นฐาน (1 คะแนน)' },
  { value: 2, label: 'Tier 2 • ปานกลาง (2 คะแนน)' },
  { value: 3, label: 'Tier 3 • ระดับเซียน (3 คะแนน)' },
  { value: 4, label: 'Tier 4 • ระดับเทพ (4 คะแนน)' },
  { value: 5, label: 'Tier 5 • ระดับตำนาน (5 คะแนน)' }
];

const filterTierOptions = [
  { value: 'all', label: 'แสดงทุกระดับ (All Tiers)' },
  { value: 1, label: 'Tier 1 • พื้นฐาน' },
  { value: 2, label: 'Tier 2 • ปานกลาง' },
  { value: 3, label: 'Tier 3 • ระดับเซียน' },
  { value: 4, label: 'Tier 4 • ระดับเทพ' },
  { value: 5, label: 'Tier 5 • ระดับตำนาน' }
];

const typeOptions = [
  { value: 'Choice', label: 'แบบเลือกตอบ (Choice)' },
  { value: 'Score Input', label: 'แบบกรอกคะแนน/ตัวเลข (Score Input)' },
  { value: 'Both', label: 'มีทั้งคู่ (เลือกตอบและกรอกคะแนน)' }
];

const CustomSelect = ({ value, onChange, options, label, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value) || options[0];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label className="block text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[var(--color-surface)] border border-white/10 rounded-2xl px-5 py-3.5 text-white flex justify-between items-center hover:border-white/20 transition-all font-semibold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_15px_rgba(209,161,83,0.15)] text-left"
      >
        <span>{selectedOption.label}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[var(--color-card)]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden animate-fadeIn max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-3 text-sm transition-all duration-200 flex justify-between items-center ${
                  isSelected 
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]"></span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const QuestionManager = () => {
  const { matchId } = useParams();
  const { matches, questions, setCorrectAnswerAndCalculate, createQuestion, updateQuestion, deleteQuestion } = useContext(AppContext);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  // Add Question states
  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState('');
  const [newTier, setNewTier] = useState(1);
  const [newType, setNewType] = useState('Choice');
  const [newOptions, setNewOptions] = useState(['', '']);

  // Edit Question states
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editType, setEditType] = useState('Choice');
  const [editOptions, setEditOptions] = useState([]);

  // Filter/Search states
  const [filterTier, setFilterTier] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const match = matches.find(m => m.id === parseInt(matchId));
  const matchQuestions = questions.filter(q => q.matchId === parseInt(matchId));
  
  const filteredQuestions = matchQuestions.filter(q => {
    const matchesTier = filterTier === 'all' || q.tier === parseInt(filterTier);
    const matchesSearch = q.questionText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  if (!match) return <div className="text-white p-4 text-center font-bold">Match not found</div>;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Switch Add Question Type (Autopopulate home/away if Choice selected)
  const handleNewTypeChange = (type) => {
    setNewType(type);
    if (type === 'Choice' || type === 'Both') {
      setNewOptions([match.homeTeam, match.awayTeam, 'Draw']);
    } else {
      setNewOptions([]);
    }
  };

  // Add Question Choice handlers
  const handleNewOptionChange = (idx, value) => {
    const updated = [...newOptions];
    updated[idx] = value;
    setNewOptions(updated);
  };

  const addNewOptionField = () => {
    setNewOptions([...newOptions, '']);
  };

  const removeNewOptionField = (idx) => {
    setNewOptions(newOptions.filter((_, i) => i !== idx));
  };

  // Edit Question Choice handlers
  const handleEditOptionChange = (idx, value) => {
    const updated = [...editOptions];
    updated[idx] = value;
    setEditOptions(updated);
  };

  const addEditOptionField = () => {
    setEditOptions([...editOptions, '']);
  };

  const removeEditOptionField = (idx) => {
    setEditOptions(editOptions.filter((_, i) => i !== idx));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const filteredOptions = (newType === 'Choice' || newType === 'Both') 
      ? newOptions.map(o => o.trim()).filter(Boolean)
      : [];

    if ((newType === 'Choice' || newType === 'Both') && filteredOptions.length < 2) {
      alert('Please enter at least 2 choices!');
      return;
    }

    createQuestion({
      matchId: parseInt(matchId),
      questionText: newText,
      tier: parseInt(newTier),
      point: parseInt(newTier), // 1 point for Tier 1, 2 for Tier 2, etc.
      answerType: newType,
      options: filteredOptions,
      correctAnswer: null,
      status: 'Active',
      lockWhenMatchStarts: true
    });

    setNewText('');
    setNewOptions(['', '']);
    setNewTier(1);
    setNewType('Choice');
    setIsAdding(false);
    showToast('Question created successfully!');
  };

  const startEdit = (q) => {
    setEditingId(q.id);
    setEditText(q.questionText);
    setEditType(q.answerType);
    setEditOptions(q.options ? [...q.options] : []);
  };

  const handleSaveEdit = (qId) => {
    if (!editText.trim()) return;
    const filteredOptions = (editType === 'Choice' || editType === 'Both') 
      ? editOptions.map(o => o.trim()).filter(Boolean)
      : [];

    updateQuestion(qId, {
      questionText: editText,
      answerType: editType,
      options: filteredOptions
    });
    setEditingId(null);
    showToast('อัปเดตข้อมูลคำถามแล้ว!');
  };

  const handleDelete = (qId) => {
    if (window.confirm('คุณต้องการลบคำถามข้อนี้ใช่หรือไม่?')) {
      deleteQuestion(qId);
      showToast('ลบคำถามเรียบร้อยแล้ว!');
    }
  };

  const handleSetCorrectAnswer = (qId) => {
    const val = correctAnswers[qId];
    if (val !== undefined && val !== '') {
      setCorrectAnswerAndCalculate(qId, val);
      showToast('บันทึกเฉลยและคำนวณคะแนนผู้เล่นเรียบร้อยแล้ว!');
    }
  };

  const getTierBadge = (tier) => {
    switch(tier) {
      case 1: 
        return (
          <span className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
            Tier 1 • พื้นฐาน
          </span>
        );
      case 2: 
        return (
          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
            Tier 2 • ปานกลาง
          </span>
        );
      case 3: 
        return (
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
            Tier 3 • ระดับเซียน
          </span>
        );
      case 4: 
        return (
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
            Tier 4 • ระดับเทพ
          </span>
        );
      case 5: 
        return (
          <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
            Tier 5 • ระดับตำนาน
          </span>
        );
      default: return null;
    }
  };

  const getTierLabel = (tier) => {
    switch(tier) {
      case 1: return 'Tier 1 • พื้นฐาน (1 คะแนน)';
      case 2: return 'Tier 2 • ปานกลาง (2 คะแนน)';
      case 3: return 'Tier 3 • ระดับเซียน (3 คะแนน)';
      case 4: return 'Tier 4 • ระดับเทพ (4 คะแนน)';
      case 5: return 'Tier 5 • ระดับตำนาน (5 คะแนน)';
      default: return '';
    }
  };

  const getTierColor = (tier) => {
    switch(tier) {
      case 1: return 'text-[var(--color-primary)]';
      case 2: return 'text-orange-400';
      case 3: return 'text-rose-400';
      case 4: return 'text-sky-400';
      case 5: return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  const getTierDotColor = (tier) => {
    switch(tier) {
      case 1: return 'bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]';
      case 2: return 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]';
      case 3: return 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]';
      case 4: return 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]';
      case 5: return 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]';
      default: return 'bg-white';
    }
  };

  return (
    <div className="space-y-6 pb-28">
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bronze-gradient-bg text-black px-5 py-2.5 rounded-full shadow-[0_8px_20px_rgba(209,161,83,0.35)] flex items-center gap-2 font-black text-sm animate-pulse">
          <Check size={16} className="stroke-[3]" /> {toastMessage}
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Link 
            to="/admin/matches" 
            className="inline-flex items-center gap-2 text-xs font-black text-[var(--color-text-muted)] hover:text-white uppercase tracking-wider bg-white/5 px-4 py-2 rounded-full border border-white/5 mb-4 transition-all"
          >
            <ArrowLeft size={12} /> กลับไปหน้าจัดการแมตช์
          </Link>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            {match.homeFlag} {match.homeTeam} <span className="text-[var(--color-text-muted)] text-base font-medium font-serif italic lowercase">vs</span> {match.awayTeam} {match.awayFlag}
          </h1>
          <p className="text-xs bronze-gradient-text font-black uppercase tracking-wider mt-1.5">ตั้งค่าคำถามทายผลสำหรับแต่ละอันดับ (Tier)</p>
        </div>

        <button 
          onClick={() => {
            setIsAdding(!isAdding);
            if (!isAdding) {
              setNewOptions([match.homeTeam, match.awayTeam, 'Draw']);
            }
          }}
          className="btn-bronze px-5 py-2.5 rounded-full flex items-center gap-2 text-xs uppercase tracking-wider transition-all active:scale-95 animate-pulse"
        >
          {isAdding ? <X size={14} className="stroke-[3]" /> : <Plus size={14} className="stroke-[3]" />}
          <span>{isAdding ? 'ยกเลิก' : 'เพิ่มคำถาม'}</span>
        </button>
      </div>

      {/* Add Question Form Drawer */}
      {isAdding && (
        <form onSubmit={handleCreate} className="bg-[var(--color-card)]/95 border border-[var(--color-primary)]/20 p-6 rounded-[28px] shadow-2xl space-y-4 animate-fadeIn">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <HelpCircle size={16} className="text-[var(--color-primary)]" />
            <span>สร้างคำถามทายผลข้อใหม่ (อันดับ Tier {newTier})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Question Text */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider mb-2">ข้อความคำถาม</label>
              <input 
                type="text" 
                value={newText}
                onChange={e => setNewText(e.target.value)}
                placeholder="ตัวอย่างเช่น: ใครจะเป็นคนทำประตูแรกของแมตช์นี้?"
                className="w-full bg-[var(--color-surface)] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all font-semibold animate-pulse"
                required
              />
            </div>

            {/* Select Tier */}
            <CustomSelect
              value={newTier}
              onChange={setNewTier}
              options={tierOptions}
              label="เลือกอันดับความสำคัญของคำถาม (Tier)"
            />

            {/* Answer Type */}
            <CustomSelect
              value={newType}
              onChange={handleNewTypeChange}
              options={typeOptions}
              label="ประเภทคำตอบ"
            />

            {/* Dynamic Options Input (If Choice or Both) */}
            {(newType === 'Choice' || newType === 'Both') && (
              <div className="md:col-span-2 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider">
                    ตัวเลือกคำตอบของคำถาม
                  </label>
                  {/* Quick-add buttons */}
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setNewOptions([...newOptions, match.homeTeam])}
                      className="px-2 py-1 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                    >
                      + {match.homeTeam}
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewOptions([...newOptions, match.awayTeam])}
                      className="px-2 py-1 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                    >
                      + {match.awayTeam}
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewOptions([...newOptions, 'Draw'])}
                      className="px-2 py-1 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                    >
                      + เสมอ
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {newOptions.map((opt, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input 
                        type="text" 
                        value={opt}
                        onChange={e => handleNewOptionChange(idx, e.target.value)}
                        placeholder={`ตัวเลือกที่ #${idx + 1}`}
                        className="flex-1 bg-[var(--color-surface)] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--color-primary)] transition-all font-semibold"
                        required
                      />
                      {newOptions.length > 2 && (
                        <button 
                          type="button"
                          onClick={() => removeNewOptionField(idx)}
                          className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all shrink-0"
                          title="ลบตัวเลือก"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  type="button"
                  onClick={addNewOptionField}
                  className="inline-flex items-center gap-1 text-[10px] font-black text-[var(--color-primary)] hover:underline uppercase tracking-wider mt-1.5"
                >
                  <Plus size={12} /> เพิ่มตัวเลือกคำตอบเพิ่มเติม
                </button>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button 
              type="button"
              onClick={() => setIsAdding(false)}
              className="bg-white/5 border border-white/10 text-white font-black px-5 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-white/10 transition-all active:scale-95"
            >
              ยกเลิก
            </button>
            <button 
              type="submit"
              className="btn-bronze px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95"
            >
              สร้างคำถามทายผล
            </button>
          </div>
        </form>
      )}

      {/* Search & Filter Section */}
      {matchQuestions.length > 0 && (
        <div className="bg-[var(--color-card)]/50 border border-white/5 p-4 rounded-3xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
          <div className="flex-1 w-full">
            <input 
              type="text" 
              placeholder="🔍 ค้นหาคำถามที่ต้องการ..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--color-surface)] border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_15px_rgba(209,161,83,0.15)] transition-all font-semibold text-sm placeholder:text-gray-500"
            />
          </div>
          <div className="w-full md:w-80">
            <CustomSelect
              value={filterTier}
              onChange={setFilterTier}
              options={filterTierOptions}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Tier Sections (Grouping) */}
      <div className="space-y-12">
        {[1, 2, 3, 4, 5].map(tierNum => {
          if (filterTier !== 'all' && parseInt(filterTier) !== tierNum) return null;
          const tierQuestions = filteredQuestions.filter(q => q.tier === tierNum);
          if (tierQuestions.length === 0) return null;

          return (
            <div key={tierNum} className="space-y-4">
              {/* Section Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h2 className={`text-sm font-black uppercase tracking-wider ${getTierColor(tierNum)} flex items-center gap-2`}>
                  <span className={`w-2 h-2 rounded-full ${getTierDotColor(tierNum)}`}></span>
                  {getTierLabel(tierNum)}
                </h2>
                
                <button
                  type="button"
                  onClick={() => {
                    setNewTier(tierNum);
                    setIsAdding(true);
                    setNewType('Choice');
                    setNewOptions([match.homeTeam, match.awayTeam, 'Draw']);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-wider bg-white/5 border border-white/5 hover:border-white/10 px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1"
                >
                  <Plus size={10} /> เพิ่มคำถามสำหรับ Tier {tierNum}
                </button>
              </div>

              {/* Questions Stack */}
              <div className="space-y-4">
                {tierQuestions.map((q, idx) => {
                  const isEditing = editingId === q.id;
                  const resolvedAnswer = q.correctAnswer;

                  return (
                    <div 
                      key={q.id} 
                      className="bg-[var(--color-card)]/80 border border-white/5 rounded-[28px] p-6 shadow-xl relative"
                    >
                      {/* Question Header */}
                      <div className="flex justify-between items-start pb-4 border-b border-white/5 gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5">
                            {getTierBadge(q.tier)}
                            <span className="text-[9px] font-black text-[var(--color-text-muted)] bg-white/5 border border-white/5 px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {q.answerType === 'Score Input' ? 'แบบกรอกคะแนน/ตัวเลข' : q.answerType === 'Both' ? 'มีทั้งคู่ (เลือกตอบและกรอก)' : 'แบบเลือกตอบ (Choice)'}
                            </span>
                          </div>
                          
                          {isEditing ? (
                            <div className="mt-3 space-y-4">
                              {/* Edit Question Text */}
                              <div>
                                <label className="block text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">ข้อความคำถาม</label>
                                <input 
                                  type="text" 
                                  value={editText}
                                  onChange={e => setEditText(e.target.value)}
                                  className="w-full bg-[var(--color-surface)] border border-white/10 rounded-xl px-4 py-2.5 text-white font-semibold text-sm focus:outline-none focus:border-[var(--color-primary)]"
                                  required
                                />
                              </div>

                              {/* Edit Answer Type */}
                              <div className="max-w-xs">
                                <CustomSelect
                                  value={editType}
                                  onChange={value => {
                                    setEditType(value);
                                    if (value === 'Choice' && editOptions.length === 0) {
                                      setEditOptions([match.homeTeam, match.awayTeam, 'Draw']);
                                    }
                                  }}
                                  options={typeOptions}
                                  label="ประเภทคำตอบ"
                                />
                              </div>

                              {/* Edit Dynamic Choices */}
                              {(editType === 'Choice' || editType === 'Both') ? (
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <label className="block text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-wider">ตัวเลือกคำตอบ</label>
                                    <div className="flex gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => setEditOptions([...editOptions, match.homeTeam])}
                                        className="px-2 py-0.5 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded text-[9px] font-black uppercase tracking-wider transition-all"
                                      >
                                        + {match.homeTeam}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditOptions([...editOptions, match.awayTeam])}
                                        className="px-2 py-0.5 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded text-[9px] font-black uppercase tracking-wider transition-all"
                                      >
                                        + {match.awayTeam}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditOptions([...editOptions, 'Draw'])}
                                        className="px-2 py-0.5 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded text-[9px] font-black uppercase tracking-wider transition-all"
                                      >
                                        + เสมอ
                                      </button>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {editOptions.map((opt, idx) => (
                                      <div key={idx} className="flex gap-2 items-center">
                                        <input 
                                          type="text" 
                                          value={opt}
                                          onChange={e => handleEditOptionChange(idx, e.target.value)}
                                          className="flex-1 bg-[var(--color-surface)] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--color-primary)] font-semibold"
                                          placeholder={`ตัวเลือกที่ #${idx + 1}`}
                                          required
                                        />
                                        {editOptions.length > 2 && (
                                          <button 
                                            type="button"
                                            onClick={() => removeEditOptionField(idx)}
                                            className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all shrink-0"
                                          >
                                            <X size={12} />
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                  <button 
                                    type="button"
                                    onClick={addEditOptionField}
                                    className="inline-flex items-center gap-1 text-[9px] font-black text-[var(--color-primary)] hover:underline uppercase tracking-wider mt-1"
                                  >
                                    <Plus size={10} /> เพิ่มตัวเลือก
                                  </button>
                                </div>
                              ) : (
                                <div className="text-[10px] text-[var(--color-text-muted)] font-semibold bg-black/30 border border-white/5 p-3.5 rounded-xl flex items-center gap-2">
                                  <span>💡 ข้อนี้เป็นประเภท <b>Type Answer (พิมพ์ตอบอิสระ)</b> ลูกค้าจะพิมพ์ตอบเองทางหน้าบ้าน (เช่น '2-1', 'Messi', 'นาที 15') จึงไม่มีกล่องช้อยส์ตัวเลือกให้กรอกค่ะ</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <h3 className="text-base font-extrabold text-white mt-3">
                              Q{idx + 1}: {q.questionText}
                            </h3>
                          )}

                          {/* Display options to admin */}
                          {!isEditing && (q.answerType === 'Choice' || q.answerType === 'Both') && q.options && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {q.options.map(opt => (
                                <span key={opt} className="bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 text-[10px] font-semibold text-gray-300">
                                  {opt}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Question Action Controls */}
                        <div className="flex items-center gap-2 shrink-0">
                          {isEditing ? (
                            <>
                              <button 
                                onClick={() => handleSaveEdit(q.id)}
                                className="p-2 bg-green-500/20 border border-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-all"
                                title="บันทึกข้อมูล"
                              >
                                <Save size={14} />
                              </button>
                              <button 
                                onClick={() => setEditingId(null)}
                                className="p-2 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
                                title="ยกเลิก"
                              >
                                <X size={14} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={() => startEdit(q)}
                                className="p-2 bg-white/5 border border-white/10 text-[var(--color-text-muted)] hover:text-white rounded-xl hover:bg-white/10 transition-all"
                                title="แก้ไขคำถาม"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button 
                                onClick={() => handleDelete(q.id)}
                                className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"
                                title="ลบคำถาม"
                              >
                                <Trash size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Set answer & evaluation controls */}
                      <div className="mt-5 space-y-4">
                        <label className="block text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider">
                          เฉลยคำตอบที่ถูกต้อง (บันทึกเพื่อคำนวณคะแนนลูกค้าอัตโนมัติ)
                        </label>
                        
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
                          {q.answerType === 'Choice' ? (
                            <select 
                              value={correctAnswers[q.id] || resolvedAnswer || ''}
                              onChange={(e) => setCorrectAnswers({...correctAnswers, [q.id]: e.target.value})}
                              className="flex-1 bg-[var(--color-surface)] border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[var(--color-primary)] transition-all font-semibold"
                            >
                              <option value="">-- เลือกคำตอบเพื่อเฉลย --</option>
                              {q.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          ) : (
                            <div className="flex-1 flex flex-col gap-2">
                              <input 
                                type="text"
                                value={correctAnswers[q.id] !== undefined ? correctAnswers[q.id] : (resolvedAnswer || '')}
                                onChange={(e) => setCorrectAnswers({...correctAnswers, [q.id]: e.target.value})}
                                placeholder="เช่น 2-1, Messi, 45..."
                                className="w-full bg-[var(--color-surface)] border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[var(--color-primary)] transition-all font-semibold"
                              />
                              {q.answerType === 'Both' && q.options && (
                                <div className="flex flex-wrap gap-1.5 mt-1 items-center">
                                  <span className="text-[9px] font-bold text-gray-500 uppercase">เลือกด่วน:</span>
                                  {q.options.map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setCorrectAnswers({...correctAnswers, [q.id]: opt})}
                                      className="bg-white/5 border border-white/5 hover:border-[var(--color-primary)] rounded-lg px-2.5 py-1 text-[9px] font-bold text-gray-300 transition-all"
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          
                          <button 
                            onClick={() => handleSetCorrectAnswer(q.id)}
                            className="btn-bronze px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-98 whitespace-nowrap"
                          >
                            <Check size={14} className="stroke-[3]" />
                            <span>บันทึกเฉลย & คำนวณคะแนนลูกค้า</span>
                          </button>
                        </div>

                        {resolvedAnswer && (
                          <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 px-3.5 py-1.5 rounded-full text-xs font-bold">
                            <Target size={12} />
                            <span>เฉลยคำตอบแล้ว: {resolvedAnswer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          );
        })}

        {matchQuestions.length === 0 ? (
          <div className="bg-[var(--color-card)]/30 border border-dashed border-white/5 rounded-[28px] p-10 text-center text-gray-500 text-sm font-bold">
            <span>ยังไม่มีการเพิ่มคำถามทายผลสำหรับแมตช์นี้ คลิกปุ่ม "เพิ่มคำถาม" ด้านบนเพื่อสร้างข้อแรกได้เลย!</span>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="bg-[var(--color-card)]/30 border border-dashed border-white/5 rounded-[28px] p-10 text-center text-gray-500 text-sm font-bold">
            <span>ไม่พบคำถามที่ตรงกับการค้นหาหรือตัวกรองที่เลือก</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default QuestionManager;

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Academic Hierarchy Data
const ACADEMIC_DATA: Record<string, Record<string, string[]>> = {
  'Computer Science & IT (B.Sc. CSIT / BE CS)': {
    'Semester 1': ['C Programming', 'Digital Logic', 'Mathematics I', 'Physics', 'Introduction to IT'],
    'Semester 2': ['Discrete Structures', 'Object Oriented Programming', 'Mathematics II', 'Microprocessor', 'Data Structures and Algorithms'],
    'Semester 3': ['Computer Architecture', 'Numerical Methods', 'Operating Systems', 'Database Management System', 'Computer Networks'],
    'Semester 4': ['Theory of Computation', 'Software Engineering', 'Artificial Intelligence', 'Computer Graphics', 'Technical Writing'],
    'Semester 5': ['Design and Analysis of Algorithms', 'System Analysis and Design', 'Cryptography', 'Web Technology', 'Simulation and Modeling'],
    'Semester 6': ['Compiler Design', 'Real Time System', 'E-Governance', 'Mobile Application Development', 'Image Processing'],
    'Semester 7': ['Data Mining and Data Warehousing', 'Cloud Computing', 'Information Security', 'Internship', 'Project Work I'],
    'Semester 8': ['Advanced Database', 'Distributed Systems', 'Network and System Administration', 'Project Work II'],
  },
  'Management (BBA / BIM / BBM)': {
    'Semester 1': ['Principles of Management', 'Microeconomics', 'English I', 'Business Mathematics', 'Financial Accounting'],
    'Semester 2': ['Macroeconomics', 'Business Statistics', 'Cost Accounting', 'Business Communication', 'Sociology'],
    'Semester 3': ['Financial Management', 'Marketing Management', 'Human Resource Management', 'Business Law', 'Management Information System'],
    'Semester 4': ['Business Environment', 'Taxation in Nepal', 'Operations Management', 'E-Commerce', 'Research Methodology'],
    'Semester 5': ['Strategic Management', 'International Business', 'Consumer Behavior', 'Investment Analysis', 'Entrepreneurship'],
    'Semester 6': ['Supply Chain Management', 'Services Marketing', 'Corporate Finance', 'Project Management', 'Business Ethics'],
    'Semester 7': ['Internship / Practicum', 'Digital Marketing', 'Risk Management', 'Elective I'],
    'Semester 8': ['Business Policy', 'Organizational Change', 'Elective II', 'Final Project Work'],
  },
  'Civil Engineering': {
    'Semester 1': ['Engineering Mathematics I', 'Engineering Physics', 'Engineering Drawing', 'Basic Electrical Engineering', 'Applied Mechanics'],
    'Semester 2': ['Engineering Mathematics II', 'Engineering Chemistry', 'Programming in C', 'Basic Electronics', 'Workshop Technology'],
    'Semester 3': ['Engineering Mathematics III', 'Strength of Materials', 'Fluid Mechanics', 'Surveying I', 'Geology'],
    'Semester 4': ['Hydraulics', 'Surveying II', 'Structural Analysis I', 'Building Construction', 'Concrete Technology'],
    'Semester 5': ['Structural Analysis II', 'Soil Mechanics', 'Design of Steel Structures', 'Transportation Engineering I', 'Hydrology'],
    'Semester 6': ['Design of RCC Structures', 'Foundation Engineering', 'Transportation Engineering II', 'Irrigation Engineering', 'Sanitary Engineering'],
    'Semester 7': ['Estimating and Costing', 'Hydropower Engineering', 'Construction Management', 'Elective I', 'Project I'],
    'Semester 8': ['Earthquake Engineering', 'Professional Practice', 'Elective II', 'Project II'],
  },
};

const FACULTIES = Object.keys(ACADEMIC_DATA);

interface BookListing {
  id: string;
  title: string;
  author: string;
  price: number;
  type: 'SELL' | 'BUY';
  faculty: string;
  semester: string;
  subject: string;
  condition: 'Like New' | 'Good' | 'Fair' | 'Poor' | 'Digital / PDF';
  description: string;
  sellerName: string;
  contact: string;
  createdAt: string;
  authorId: string;
}

export default function MarketplacePage() {
  const CURRENT_USER_ID = 'user-alex-123';

  const [listings, setListings] = useState<BookListing[]>([
    {
      id: 'book-1',
      title: 'Introduction to Algorithms (4th Edition)',
      author: 'Thomas H. Cormen',
      price: 1500,
      type: 'SELL',
      faculty: 'Computer Science & IT (B.Sc. CSIT / BE CS)',
      semester: 'Semester 3',
      subject: 'Data Structures and Algorithms',
      condition: 'Like New',
      description: 'Barely used, no highlighting or missing pages.',
      sellerName: 'Alex Student',
      contact: 'alex@campus.edu',
      createdAt: 'Oct 1, 2026',
      authorId: 'user-alex-123',
    },
    {
      id: 'book-2',
      title: 'Operating System Concepts (10th Ed)',
      author: 'Silberschatz, Galvin, Gagne',
      price: 1200,
      type: 'BUY',
      faculty: 'Computer Science & IT (B.Sc. CSIT / BE CS)',
      semester: 'Semester 3',
      subject: 'Operating Systems',
      condition: 'Good',
      description: 'Looking to buy a physical copy before midterms.',
      sellerName: 'Sarah Jenkins',
      contact: 's.jenkins@campus.edu',
      createdAt: 'Sep 28, 2026',
      authorId: 'other-user-456',
    },
    {
      id: 'book-3',
      title: 'Principles of Microeconomics',
      author: 'N. Gregory Mankiw',
      price: 950,
      type: 'SELL',
      faculty: 'Management (BBA / BIM / BBM)',
      semester: 'Semester 1',
      subject: 'Microeconomics',
      condition: 'Good',
      description: 'Clean pages, great reference for BBA 1st sem.',
      sellerName: 'David Chen',
      contact: 'd.chen@campus.edu',
      createdAt: 'Sep 25, 2026',
      authorId: 'other-user-789',
    },
  ]);

  // Search & Multi-Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('ALL');
  const [selectedSemester, setSelectedSemester] = useState('ALL');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedType, setSelectedType] = useState<'ALL' | 'SELL' | 'BUY'>('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listingType, setListingType] = useState<'SELL' | 'BUY'>('SELL');
  const [titleInput, setTitleInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [priceInput, setPriceInput] = useState('');

  // Modal Cascading Academic State
  const [facultyInput, setFacultyInput] = useState(FACULTIES[0]);
  const [semesterInput, setSemesterInput] = useState('Semester 1');
  const [subjectInput, setSubjectInput] = useState(ACADEMIC_DATA[FACULTIES[0]]['Semester 1'][0]);

  const [conditionInput, setConditionInput] = useState<BookListing['condition']>('Good');
  const [contactInput, setContactInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  // Dynamically compute available semesters for search filter
  const filterSemesters = useMemo(() => {
    if (selectedFaculty === 'ALL') {
      return ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];
    }
    return Object.keys(ACADEMIC_DATA[selectedFaculty] || {});
  }, [selectedFaculty]);

  // Dynamically compute available subjects for search filter
  const filterSubjects = useMemo(() => {
    if (selectedFaculty === 'ALL') {
      const allSubjects: string[] = [];
      Object.values(ACADEMIC_DATA).forEach((semMap) => {
        if (selectedSemester === 'ALL') {
          Object.values(semMap).forEach((subArr) => allSubjects.push(...subArr));
        } else if (semMap[selectedSemester]) {
          allSubjects.push(...semMap[selectedSemester]);
        }
      });
      return Array.from(new Set(allSubjects));
    }

    const facData = ACADEMIC_DATA[selectedFaculty];
    if (!facData) return [];

    if (selectedSemester === 'ALL') {
      const subjects: string[] = [];
      Object.values(facData).forEach((subArr) => subjects.push(...subArr));
      return Array.from(new Set(subjects));
    }

    return facData[selectedSemester] || [];
  }, [selectedFaculty, selectedSemester]);

  // Dynamic updates for Modal Form Cascading Selects
  const modalSemesters = useMemo(() => {
    return Object.keys(ACADEMIC_DATA[facultyInput] || {});
  }, [facultyInput]);

  const modalSubjects = useMemo(() => {
    return ACADEMIC_DATA[facultyInput]?.[semesterInput] || [];
  }, [facultyInput, semesterInput]);

  const handleFacultyChangeModal = (fac: string) => {
    setFacultyInput(fac);
    const sem = Object.keys(ACADEMIC_DATA[fac] || {})[0] || 'Semester 1';
    setSemesterInput(sem);
    const sub = ACADEMIC_DATA[fac]?.[sem]?.[0] || '';
    setSubjectInput(sub);
  };

  const handleSemesterChangeModal = (sem: string) => {
    setSemesterInput(sem);
    const sub = ACADEMIC_DATA[facultyInput]?.[sem]?.[0] || '';
    setSubjectInput(sub);
  };

  // Filtering Logic
  const filteredListings = listings.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFaculty = selectedFaculty === 'ALL' || item.faculty === selectedFaculty;
    const matchesSemester = selectedSemester === 'ALL' || item.semester === selectedSemester;
    const matchesSubject = selectedSubject === 'ALL' || item.subject === selectedSubject;
    const matchesType = selectedType === 'ALL' || item.type === selectedType;

    return matchesQuery && matchesFaculty && matchesSemester && matchesSubject && matchesType;
  });

  // Handle Create Listing
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const newBook: BookListing = {
      id: 'book-' + Date.now(),
      title: titleInput,
      author: authorInput || 'Unknown Author',
      price: parseFloat(priceInput) || 0,
      type: listingType,
      faculty: facultyInput,
      semester: semesterInput,
      subject: subjectInput,
      condition: conditionInput,
      description: descriptionInput,
      sellerName: 'You (Alex)',
      contact: contactInput || 'student@campus.edu',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      authorId: CURRENT_USER_ID,
    };

    setListings([newBook, ...listings]);

    // Reset Form
    setTitleInput('');
    setAuthorInput('');
    setPriceInput('');
    setDescriptionInput('');
    setContactInput('');
    setIsModalOpen(false);
  };

  // Handle Delete Listing
  const handleDeleteListing = (id: string) => {
    if (confirm('Are you sure you want to remove this book listing?')) {
      setListings((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <Link href="/" className="text-xs text-purple-400 hover:underline mb-2 block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            🛍️ Student Book Marketplace
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Buy, sell, or request course textbooks sorted by Faculty, Semester & Subject.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setListingType('SELL');
              setIsModalOpen(true);
            }}
            className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all active:scale-95"
          >
            + Sell a Book
          </button>
          <button
            onClick={() => {
              setListingType('BUY');
              setIsModalOpen(true);
            }}
            className="bg-slate-800 hover:bg-slate-700 border border-purple-500/30 text-purple-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95"
          >
            + Request to Buy
          </button>
        </div>
      </div>

      {/* Multi-Filter Bar: Faculty, Semester, Subject, Type, Search */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Text Search */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Search Text
            </label>
            <input
              type="text"
              placeholder="Book / Author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Faculty Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Faculty
            </label>
            <select
              value={selectedFaculty}
              onChange={(e) => {
                setSelectedFaculty(e.target.value);
                setSelectedSubject('ALL');
              }}
              className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 truncate"
            >
              <option value="ALL">All Faculties</option>
              {FACULTIES.map((fac) => (
                <option key={fac} value={fac}>
                  {fac}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => {
                setSelectedSemester(e.target.value);
                setSelectedSubject('ALL');
              }}
              className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="ALL">All Semesters</option>
              {filterSemesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Subject Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 truncate"
            >
              <option value="ALL">All Subjects</option>
              {filterSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'ALL' | 'SELL' | 'BUY')}
              className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="ALL">All Types</option>
              <option value="SELL">For Sale</option>
              <option value="BUY">Looking to Buy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((book) => {
          const isOwner = book.authorId === CURRENT_USER_ID;

          return (
            <div
              key={book.id}
              className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                {/* Badges & Price */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border uppercase ${
                      book.type === 'SELL'
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                        : 'bg-amber-950/60 text-amber-400 border-amber-800/40'
                    }`}
                  >
                    {book.type === 'SELL' ? 'For Sale' : 'Wanted / Buy'}
                  </span>
                  <span className="text-lg font-extrabold text-white">
                    NPR {book.price.toLocaleString()}
                  </span>
                </div>

                {/* Title & Author */}
                <div>
                  <h3 className="text-base font-bold text-white line-clamp-2">{book.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">by {book.author}</p>
                </div>

                {/* Dynamic Academic Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-medium bg-slate-800 text-purple-300 px-2 py-0.5 rounded">
                    {book.subject}
                  </span>
                  <span className="text-[10px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {book.semester}
                  </span>
                  <span className="text-[10px] font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    {book.condition}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 truncate">
                  🏛️ {book.faculty}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {book.description}
                </p>
              </div>

              {/* Footer / Contact Actions */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-400">{book.sellerName}</p>
                  <p className="text-[10px] text-slate-500">{book.createdAt}</p>
                </div>

                <div className="flex items-center gap-2">
                  {isOwner && (
                    <button
                      onClick={() => handleDeleteListing(book.id)}
                      title="Delete your listing"
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      🗑️
                    </button>
                  )}
                  <a
                    href={`mailto:${book.contact}?subject=Campus Marketplace: ${encodeURIComponent(book.title)}`}
                    className="bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 text-purple-300 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12 bg-[#111827] border border-slate-800 rounded-2xl text-slate-400 text-sm">
          No books found matching your current search or filter options.
        </div>
      )}

      {/* Add / Request Book Modal with Dynamic Cascading Selects */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                {listingType === 'SELL' ? '📚 List a Book to Sell' : '🔍 Post a Buying Request'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4">
              {/* Type Switcher */}
              <div className="flex gap-2 p-1 bg-[#131826] rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setListingType('SELL')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    listingType === 'SELL'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Selling
                </button>
                <button
                  type="button"
                  onClick={() => setListingType('BUY')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    listingType === 'BUY'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Looking to Buy
                </button>
              </div>

              {/* Title & Price */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Book Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating System Concepts"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Author</label>
                  <input
                    type="text"
                    placeholder="e.g. Silberschatz"
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Price (NPR) *</label>
                  <input
                    type="number"
                    required
                    step="1"
                    placeholder="e.g. 1200"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Dynamic Academic Selectors (Faculty -> Semester -> Subject) */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Faculty *</label>
                <select
                  value={facultyInput}
                  onChange={(e) => handleFacultyChangeModal(e.target.value)}
                  className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {FACULTIES.map((fac) => (
                    <option key={fac} value={fac}>
                      {fac}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Semester *</label>
                  <select
                    value={semesterInput}
                    onChange={(e) => handleSemesterChangeModal(e.target.value)}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {modalSemesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subject *</label>
                  <select
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {modalSubjects.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Condition & Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Condition</label>
                  <select
                    value={conditionInput}
                    onChange={(e) => setConditionInput(e.target.value as BookListing['condition'])}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                    <option value="Digital / PDF">Digital / PDF</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Contact Email / Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. alex@campus.edu"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Edition notes, wear & tear, or pick-up location..."
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  className="w-full bg-[#131826] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all"
                >
                  Post Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
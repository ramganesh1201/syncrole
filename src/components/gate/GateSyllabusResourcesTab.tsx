import { GatePaperInfo, GateSyllabusTopic, GateResource } from '@/lib/gate/gateTypes';
import { GateService } from '@/lib/gate/gateService';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Layers,
  Search,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

interface GateSyllabusResourcesTabProps {
  paper: GatePaperInfo;
  papers: GatePaperInfo[];
  syllabus: GateSyllabusTopic[];
  onSelectPaper: (code: string) => void;
}

export default function GateSyllabusResourcesTab({
  paper,
  papers,
  syllabus,
  onSelectPaper,
}: GateSyllabusResourcesTabProps) {
  const [paperSearch, setPaperSearch] = useState('');
  const [topicSearch, setTopicSearch] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [topicResources, setTopicResources] = useState<GateResource[]>([]);
  const [loadingResources, setLoadingResources] = useState<boolean>(false);

  // Filter 30 papers by search term
  const filteredPapers = useMemo(() => {
    if (!paperSearch.trim()) return papers;
    const q = paperSearch.toLowerCase();
    return papers.filter(
      (p) => p.code.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
    );
  }, [papers, paperSearch]);

  // Group syllabus topics by Subject for current paper
  const subjectsMap = useMemo(() => {
    const map = new Map<string, { subjectId: string; subjectName: string; topics: GateSyllabusTopic[] }>();
    syllabus.forEach((t) => {
      if (!map.has(t.subjectId)) {
        map.set(t.subjectId, { subjectId: t.subjectId, subjectName: t.subjectName, topics: [] });
      }
      map.get(t.subjectId)!.topics.push(t);
    });
    return Array.from(map.values());
  }, [syllabus]);

  // Reset selected subject & topic when paper changes or subjects change
  useEffect(() => {
    if (subjectsMap.length > 0) {
      const firstSub = subjectsMap[0];
      setSelectedSubjectId(firstSub.subjectId);
      if (firstSub.topics.length > 0) {
        setSelectedTopicId(firstSub.topics[0].topicId);
      }
    }
  }, [paper.code, subjectsMap]);

  // Fetch resources when topic changes
  useEffect(() => {
    if (!selectedTopicId) return;
    let isSubscribed = true;
    setLoadingResources(true);

    GateService.getResourcesForTopic(selectedTopicId).then((res) => {
      if (isSubscribed) {
        setTopicResources(res.data);
        setLoadingResources(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [selectedTopicId]);

  // Filter subjects/topics by topic search query
  const filteredSubjects = useMemo(() => {
    if (!topicSearch.trim()) return subjectsMap;
    const q = topicSearch.toLowerCase();
    return subjectsMap
      .map((sub) => ({
        ...sub,
        topics: sub.topics.filter(
          (t) =>
            t.topicName.toLowerCase().includes(q) ||
            t.subjectName.toLowerCase().includes(q) ||
            t.subtopics.some((st) => st.toLowerCase().includes(q))
        ),
      }))
      .filter((sub) => sub.topics.length > 0);
  }, [subjectsMap, topicSearch]);

  // Active subject & topic
  const activeSubject = useMemo(() => {
    return filteredSubjects.find((s) => s.subjectId === selectedSubjectId) || filteredSubjects[0];
  }, [filteredSubjects, selectedSubjectId]);

  const activeTopic = useMemo(() => {
    return syllabus.find((t) => t.topicId === selectedTopicId) || syllabus[0];
  }, [syllabus, selectedTopicId]);

  const primaryResources = useMemo(() => {
    return topicResources.filter((r) => r.isPrimary && r.resourceType !== 'pyq');
  }, [topicResources]);

  return (
    <div id="syllabus" className="space-y-8 text-slate-800 font-sans scroll-mt-28">
      {/* Header & Verification Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-teal-700 uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
            <span>Official GATE 2027 Syllabus & Learning Breakdown</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            GATE 2027 Test Papers & Official Syllabus
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-2xl">
            Explore verified official syllabus breakdowns for all 30 GATE 2027 test papers. Sourced directly from IIT Madras.
          </p>
        </div>

        <a
          href={paper.officialSyllabusUrl || 'https://gate2027.iitm.ac.in/exam_papers_and_syllabus'}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-900 text-white text-xs font-bold shadow-xs hover:bg-teal-800 transition shrink-0 self-start sm:self-auto"
        >
          <ShieldCheck className="h-4 w-4 text-teal-300" />
          <span>Official GATE 2027 Syllabus Source ↗</span>
        </a>
      </div>

      {/* Main Desktop 2-Column Desktop Syllabus Workspace */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 30 PAPERS SEARCHABLE SELECTOR (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-teal-700" />
              <span className="text-xs font-bold font-mono uppercase text-slate-900">
                GATE 2027 PAPERS ({papers.length})
              </span>
            </div>
            <span className="text-[10px] font-bold font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Verified
            </span>
          </div>

          {/* Search Papers Input */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              value={paperSearch}
              onChange={(e) => setPaperSearch(e.target.value)}
              placeholder="Search code or paper name..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs"
            />
          </div>

          {/* Paper List Items */}
          <div className="space-y-1 max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
            {filteredPapers.map((p) => {
              const isSelected = p.code === paper.code;
              return (
                <button
                  key={p.code}
                  onClick={() => onSelectPaper(p.code)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition flex items-center justify-between cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-xs'
                      : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-black ${isSelected ? 'text-teal-300' : 'text-slate-900'}`}>
                        {p.code}
                      </span>
                      {isSelected && (
                        <span className="text-[9px] font-bold bg-teal-500/20 text-teal-200 border border-teal-400/30 px-1.5 py-0.2 rounded font-mono">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className={`text-[11px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                      {p.name}
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-teal-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SELECTED PAPER SYLLABUS WORKSPACE (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Paper Header Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="text-[10px] font-bold font-mono text-teal-700 uppercase tracking-wider">
                  GATE 2027 TEST PAPER
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  GATE {paper.code} — {paper.name}
                </h3>
              </div>
              <a
                href={
                  paper.officialPdfUrl ||
                  `https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/${
                    paper.code === 'CSE' ? 'CS' : paper.code === 'ECE' ? 'EC' : paper.code
                  }_GATE2027_Syllabus.pdf`
                }
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold hover:bg-teal-100 transition flex items-center gap-1.5 shrink-0"
              >
                <span>Official PDF</span>
                <ExternalLink className="h-3.5 w-3.5 text-teal-700" />
              </a>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {paper.description}
            </p>

            {/* Quick Factual Metadata Bar */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold uppercase text-slate-400 font-mono">Exam Duration</div>
                <div className="font-bold text-slate-900">{paper.durationMinutes} Minutes (3 Hours)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold uppercase text-slate-400 font-mono">Total Questions</div>
                <div className="font-bold text-slate-900">{paper.totalQuestions} Questions</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold uppercase text-slate-400 font-mono">Total Marks</div>
                <div className="font-bold text-slate-900">{paper.totalMarks} Marks</div>
              </div>
            </div>
          </div>

          {/* Subject Tabs & Topic Search */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs font-bold font-mono uppercase text-slate-400">
                SUBJECT TOPICS ({subjectsMap.length} SUBJECT SECTIONS)
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  value={topicSearch}
                  onChange={(e) => setTopicSearch(e.target.value)}
                  placeholder="Search syllabus topic..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs"
                />
              </div>
            </div>

            {/* Subject Pill Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {filteredSubjects.map((sub) => {
                const isSelected = selectedSubjectId === sub.subjectId;
                return (
                  <button
                    key={sub.subjectId}
                    onClick={() => {
                      setSelectedSubjectId(sub.subjectId);
                      if (sub.topics.length > 0) setSelectedTopicId(sub.topics[0].topicId);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{sub.subjectName}</span>
                    <span className="ml-1.5 text-[10px] font-mono opacity-70">({sub.topics.length})</span>
                  </button>
                );
              })}
            </div>

            {/* Active Subject & Topics Breakdown */}
            {activeSubject && (
              <div className="grid md:grid-cols-12 gap-5 pt-2 border-t border-slate-100">
                {/* Topic list within subject (5 Cols) */}
                <div className="md:col-span-5 space-y-1.5 border-r border-slate-100 pr-2">
                  <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider pb-1">
                    TOPICS IN {activeSubject.subjectName.toUpperCase()}
                  </div>
                  {activeSubject.topics.map((t) => {
                    const isSelectedTopic = selectedTopicId === t.topicId;
                    return (
                      <button
                        key={t.topicId}
                        onClick={() => setSelectedTopicId(t.topicId)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center justify-between cursor-pointer border ${
                          isSelectedTopic
                            ? 'bg-teal-50 text-teal-950 font-bold border-teal-300 shadow-2xs'
                            : 'bg-white border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className="truncate">{t.topicName}</span>
                        {isSelectedTopic && <ArrowRight className="h-3.5 w-3.5 text-teal-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Topic details (7 Cols) */}
                <div className="md:col-span-7 space-y-4">
                  {activeTopic ? (
                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {activeSubject.subjectName} / <span className="text-teal-700 font-bold">{activeTopic.topicName}</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">{activeTopic.topicName}</h4>
                        {activeTopic.weightageEstimate && (
                          <div className="text-[10px] font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 mt-1 w-fit">
                            Estimated Weightage: {activeTopic.weightageEstimate}
                          </div>
                        )}
                      </div>

                      {/* Concept summary */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                        <div className="font-bold text-slate-900">Concept Overview:</div>
                        <p className="text-slate-700 leading-relaxed font-medium">{activeTopic.conceptSummary}</p>
                        
                        {activeTopic.whyItMatters && (
                          <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600">
                            <strong className="text-slate-800">Why it matters: </strong>
                            {activeTopic.whyItMatters}
                          </div>
                        )}
                      </div>

                      {/* Key coverage checklist */}
                      {activeTopic.keyTakeaways && activeTopic.keyTakeaways.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="text-[11px] font-bold text-slate-800 font-mono uppercase">
                            Key Syllabus Coverage Checklist:
                          </div>
                          <div className="space-y-1">
                            {activeTopic.keyTakeaways.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Primary learning resource */}
                      {primaryResources.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 space-y-1.5 text-xs">
                          <div className="font-bold text-teal-950 flex items-center justify-between">
                            <span>Recommended Learning Resource:</span>
                            <span className="text-[10px] font-mono text-teal-800">Verified</span>
                          </div>
                          <div className="text-slate-800 font-bold">{primaryResources[0].title}</div>
                          <div className="text-[11px] text-slate-600">{primaryResources[0].description}</div>
                          <a
                            href={primaryResources[0].url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:underline pt-1"
                          >
                            <span>Open learning module</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-400 text-xs font-mono">
                      Select a topic from the left list.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

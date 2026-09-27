import { GatePaperInfo, GateSyllabusTopic, GateResource } from '@/lib/gate/gateTypes';
import { GateService } from '@/lib/gate/gateService';
import GateSyncPilotHelper from './GateSyncPilotHelper';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  Filter,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

interface GateSyllabusResourcesTabProps {
  paper: GatePaperInfo;
  syllabus: GateSyllabusTopic[];
}

export default function GateSyllabusResourcesTab({ paper, syllabus }: GateSyllabusResourcesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [topicResources, setTopicResources] = useState<GateResource[]>([]);
  const [loadingResources, setLoadingResources] = useState<boolean>(false);
  const [showExploreMore, setShowExploreMore] = useState<boolean>(false);

  // Group syllabus topics by Subject
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

  // Default selection
  useEffect(() => {
    if (subjectsMap.length > 0 && !selectedSubjectId) {
      const firstSub = subjectsMap[0];
      setSelectedSubjectId(firstSub.subjectId);
      if (firstSub.topics.length > 0) {
        setSelectedTopicId(firstSub.topics[0].topicId);
      }
    }
  }, [subjectsMap, selectedSubjectId]);

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

  // Filter subjects/topics by search query
  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return subjectsMap;
    const q = searchQuery.toLowerCase();
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
  }, [subjectsMap, searchQuery]);

  // Active subject & topic
  const activeSubject = useMemo(() => {
    return filteredSubjects.find((s) => s.subjectId === selectedSubjectId) || filteredSubjects[0];
  }, [filteredSubjects, selectedSubjectId]);

  const activeTopic = useMemo(() => {
    return syllabus.find((t) => t.topicId === selectedTopicId) || syllabus[0];
  }, [syllabus, selectedTopicId]);

  // Primary vs Secondary resources
  const primaryResources = useMemo(() => {
    return topicResources.filter((r) => r.isPrimary && r.resourceType !== 'pyq');
  }, [topicResources]);

  const practiceResources = useMemo(() => {
    return topicResources.filter((r) => r.resourceType === 'pyq' || r.resourceType === 'practice');
  }, [topicResources]);

  const secondaryResources = useMemo(() => {
    return topicResources.filter((r) => !r.isPrimary && r.resourceType !== 'pyq');
  }, [topicResources]);

  return (
    <div id="syllabus" className="space-y-8 text-slate-800 font-sans scroll-mt-28">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-teal-700 uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
            <span>GATE 2027 Syllabus & Learning Map</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            GATE {paper.code} Official Syllabus
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-2xl">
            Select a subject and topic to view core concept breakdowns, topic checklist, and curated primary learning materials.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subject or topic..."
            className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-teal-500 shadow-xs"
          />
        </div>
      </div>

      {/* Verification Subhead */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 p-3 rounded-xl">
        <span>
          GATE 2027 Syllabus • Source:{' '}
          <a
            href={paper.officialSyllabusUrl || 'https://gate2027.iitm.ac.in/'}
            target="_blank"
            rel="noreferrer"
            className="text-teal-700 underline font-semibold"
          >
            Official GATE 2027 Syllabus PDF
          </a>
        </span>
        <span className="font-mono">Last verified: 2026-09-25</span>
      </div>

      {/* Subject Pills (Horizontal Selector) */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500">
          SELECT SUBJECT ({filteredSubjects.length})
        </div>

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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{sub.subjectName}</span>
                <span className="ml-1.5 text-[10px] font-mono opacity-70">({sub.topics.length})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two-Column Topic Explorer (Desktop) / Accordion (Mobile) */}
      {activeSubject && (
        <div className="grid lg:grid-cols-12 gap-6 items-start pt-2">
          {/* Left Column: Topic List (4 Cols) */}
          <div className="lg:col-span-4 space-y-2 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
            <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
              TOPICS IN {activeSubject.subjectName.toUpperCase()}
            </div>

            <div className="space-y-1">
              {activeSubject.topics.map((t) => {
                const isSelectedTopic = selectedTopicId === t.topicId;
                return (
                  <button
                    key={t.topicId}
                    onClick={() => setSelectedTopicId(t.topicId)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition flex items-center justify-between cursor-pointer ${
                      isSelectedTopic
                        ? 'bg-teal-50 text-teal-900 font-bold border border-teal-300'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="line-clamp-1">{t.topicName}</span>
                    {isSelectedTopic && <ArrowRight className="h-3.5 w-3.5 text-teal-700 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Topic Content & Resources (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {activeTopic ? (
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-6">
                {/* Topic Title */}
                <div className="border-b border-slate-100 pb-4 space-y-1">
                  <div className="text-xs font-mono text-slate-500">
                    {activeSubject.subjectName} / <span className="text-teal-700 font-semibold">{activeTopic.topicName}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                    {activeTopic.topicName}
                  </h3>
                  {activeTopic.weightageEstimate && (
                    <div className="text-xs font-mono font-medium text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded w-fit border border-teal-200">
                      Estimated Weightage: {activeTopic.weightageEstimate}
                    </div>
                  )}
                </div>

                {/* 01 — UNDERSTAND THE CONCEPT */}
                <div className="space-y-3">
                  <div className="text-xs font-bold font-mono uppercase tracking-wider text-teal-700">
                    01 • CONCEPT BREAKDOWN
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                    <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-medium">
                      {activeTopic.conceptSummary}
                    </p>

                    <div className="border-t border-slate-200 pt-2.5">
                      <strong className="text-xs text-slate-900">Why it matters in GATE 2027:</strong>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{activeTopic.whyItMatters}</p>
                    </div>

                    {/* Key Takeaways Checklist */}
                    {activeTopic.keyTakeaways && activeTopic.keyTakeaways.length > 0 && (
                      <div className="border-t border-slate-200 pt-2.5 space-y-1.5">
                        <strong className="text-xs text-slate-900">What you should know (Checklist):</strong>
                        <div className="space-y-1">
                          {activeTopic.keyTakeaways.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 02 — CURATED PRIMARY RESOURCES */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold font-mono uppercase tracking-wider text-teal-700">
                      02 • PRIMARY LEARNING RESOURCES (CURATED)
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">1–3 Recommended Sources</span>
                  </div>

                  {loadingResources ? (
                    <div className="p-6 text-center border border-slate-200 rounded-xl text-xs text-slate-500">
                      Loading verified learning resources...
                    </div>
                  ) : primaryResources.length > 0 ? (
                    <div className="space-y-2.5">
                      {primaryResources.map((res) => (
                        <div
                          key={res.id}
                          className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 text-[10px] font-mono">
                              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold uppercase">
                                {res.resourceType}
                              </span>
                              <span className="text-slate-500">{res.provider}</span>
                            </div>
                            <div className="font-bold text-xs md:text-sm text-slate-900">{res.title}</div>
                            <div className="text-xs text-slate-600">{res.description}</div>
                          </div>

                          <a
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-white border border-teal-300 px-3 py-1.5 rounded-lg hover:bg-teal-50 transition w-fit"
                          >
                            <span>Open</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center border border-slate-200 rounded-xl text-xs text-slate-500">
                      Primary textbook & NPTEL references available in official syllabus repository.
                    </div>
                  )}
                </div>

                {/* 03 — PRACTICE PYQS */}
                <div className="space-y-3">
                  <div className="text-xs font-bold font-mono uppercase tracking-wider text-teal-700">
                    03 • PRACTICE PREVIOUS YEAR QUESTIONS
                  </div>

                  {practiceResources.length > 0 ? (
                    <div className="space-y-2">
                      {practiceResources.map((res) => (
                        <div key={res.id} className="bg-teal-50/60 border border-teal-200 p-4 rounded-xl flex items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="font-bold text-xs text-teal-900">{res.title}</div>
                            <div className="text-xs text-slate-600">{res.description}</div>
                          </div>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 bg-white border border-teal-300 px-3 py-1.5 rounded-lg hover:bg-teal-50 transition"
                          >
                            <span>Explore PYQs</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-center border border-slate-200 rounded-xl text-xs text-slate-500">
                      Solve official GATE previous year question papers on the official portal repository.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center border border-slate-200 rounded-2xl text-slate-500 text-xs">
                Select a topic from the left list to view detailed syllabus breakdown.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

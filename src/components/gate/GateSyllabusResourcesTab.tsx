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
    <div className="space-y-10 animate-in fade-in duration-300 font-sans">
      {/* 1. EDITORIAL HEADER & SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>SYLLABUS & CONTEXTUAL DISCOVERY</span>
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-foreground">
            GATE {paper.code} Syllabus & Resources
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Choose a subject to explore topics, read key concept breakdowns, and access 1–3 curated learning materials.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72 flex-none">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subject or topic..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-slate-500 outline-none focus:border-accent/40"
          />
        </div>
      </div>

      {/* 2. COMPACT SUBJECT PILLS / HORIZONTAL SELECTOR */}
      <div className="space-y-3 pt-2 border-t border-white/10">
        <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
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
                className={`px-4 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-accent/20 text-accent border border-accent/40 font-semibold'
                    : 'bg-white/[0.02] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span>{sub.subjectName}</span>
                <span className="ml-1.5 text-[10px] font-mono opacity-70">({sub.topics.length})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TWO-COLUMN TOPIC EXPLORER & READING JOURNEY */}
      {activeSubject && (
        <div className="grid lg:grid-cols-12 gap-8 items-start pt-2 border-t border-white/10">
          {/* LEFT COLUMN: Compact Topic Selector under Active Subject (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              TOPICS IN {activeSubject.subjectName.toUpperCase()}
            </div>

            <div className="space-y-1.5 border-l border-white/10 pl-3">
              {activeSubject.topics.map((t) => {
                const isSelectedTopic = selectedTopicId === t.topicId;
                return (
                  <button
                    key={t.topicId}
                    onClick={() => setSelectedTopicId(t.topicId)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition flex items-center justify-between cursor-pointer ${
                      isSelectedTopic
                        ? 'bg-white/10 text-accent font-semibold border-l-2 border-accent -ml-[13px] pl-3'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className="line-clamp-1">{t.topicName}</span>
                    {isSelectedTopic && <ArrowRight className="h-3.5 w-3.5 text-accent flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Focused Topic Reading Journey (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {activeTopic ? (
              <div className="space-y-8">
                {/* Topic Header Breadcrumb */}
                <div className="space-y-1 border-b border-white/10 pb-4">
                  <div className="text-xs font-mono text-slate-400">
                    {activeSubject.subjectName} / <span className="text-accent font-semibold">{activeTopic.topicName}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {activeTopic.topicName}
                  </h2>
                  <p className="text-xs text-slate-400 italic">
                    Understand the concept before opening a lecture.
                  </p>
                </div>

                {/* 01 — UNDERSTAND */}
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
                    <span>01 • UNDERSTAND THE CONCEPT</span>
                  </div>

                  <div className="space-y-3 bg-white/[0.02] border border-white/10 p-5 rounded-2xl">
                    <p className="text-sm text-slate-200 leading-relaxed font-sans font-medium">
                      {activeTopic.conceptSummary}
                    </p>

                    <div className="border-t border-white/5 pt-3">
                      <div className="text-xs font-semibold text-slate-300 mb-1">Why does it matter in GATE?</div>
                      <p className="text-xs text-slate-400 leading-relaxed">{activeTopic.whyItMatters}</p>
                    </div>

                    {/* What you need to know checklist */}
                    {activeTopic.keyTakeaways && activeTopic.keyTakeaways.length > 0 && (
                      <div className="border-t border-white/5 pt-3 space-y-2">
                        <div className="text-xs font-semibold text-slate-300">What you should know (Checklist):</div>
                        <div className="space-y-1.5">
                          {activeTopic.keyTakeaways.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CONTEXTUAL SYNCPILOT HELPER */}
                <GateSyncPilotHelper topicName={activeTopic.topicName} paperCode={paper.code} />

                {/* 02 — LEARN (1-3 CURATED PRIMARY RESOURCES) */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                      02 • LEARN — 1–3 CURATED PRIMARY RESOURCES
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Curated by SyncRole</span>
                  </div>

                  {loadingResources ? (
                    <div className="p-6 text-center border border-white/10 rounded-xl">
                      <div className="h-5 w-5 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                  ) : primaryResources.length > 0 ? (
                    <div className="space-y-3">
                      {primaryResources.map((res) => (
                        <div
                          key={res.id}
                          className="border border-white/10 bg-white/[0.02] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-mono">
                              <span className="px-2 py-0.5 rounded bg-accent/20 text-accent font-semibold uppercase">
                                {res.resourceType}
                              </span>
                              <span className="text-slate-400">{res.provider}</span>
                            </div>
                            <div className="font-display text-sm font-semibold text-foreground">{res.title}</div>
                            <div className="text-xs text-slate-400 font-sans">{res.description}</div>
                          </div>
                          <div className="flex-none">
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline border border-accent/30 bg-accent/10 px-3.5 py-2 rounded-lg transition"
                            >
                              <span>Open resource</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center border border-white/10 rounded-xl text-xs text-slate-400">
                      No primary resources loaded for this topic.
                    </div>
                  )}
                </div>

                {/* 03 — PRACTICE (RELEVANT PYQS) */}
                <div className="space-y-4 pt-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                    03 • PRACTICE — TEST YOUR UNDERSTANDING
                  </div>

                  {practiceResources.length > 0 ? (
                    <div className="space-y-3">
                      {practiceResources.map((res) => (
                        <div
                          key={res.id}
                          className="border border-emerald-500/20 bg-emerald-500/5 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                              Verified Previous Year Questions (PYQs)
                            </div>
                            <div className="font-display text-sm font-semibold text-foreground">{res.title}</div>
                            <div className="text-xs text-slate-300">{res.description}</div>
                          </div>
                          <div className="flex-none">
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 border border-emerald-500/40 bg-emerald-500/20 px-3.5 py-2 rounded-lg transition"
                            >
                              <span>Explore PYQs</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center border border-white/10 rounded-xl text-xs text-slate-400">
                      Topic PYQs available in past official exam papers repository.
                    </div>
                  )}
                </div>

                {/* 04 — EXPLORE MORE (SECONDARY MATERIALS COLLAPSED BY DEFAULT) */}
                {secondaryResources.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setShowExploreMore(!showExploreMore)}
                      className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      <span>04 • EXPLORE MORE SECONDARY MATERIALS ({secondaryResources.length})</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${showExploreMore ? 'rotate-180' : ''}`} />
                    </button>

                    {showExploreMore && (
                      <div className="space-y-2 pt-2">
                        {secondaryResources.map((res) => (
                          <div key={res.id} className="border border-white/5 bg-white/[0.01] p-3 rounded-lg text-xs space-y-1">
                            <div className="font-semibold text-slate-200">{res.title}</div>
                            <div className="text-slate-400">{res.description}</div>
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-accent font-mono text-[11px] hover:underline pt-1"
                            >
                              <span>Open material</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center border border-white/10 rounded-2xl text-slate-400 text-xs font-mono">
                Select a topic from the left list to view its reading journey.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

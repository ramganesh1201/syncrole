import { GatePaperInfo, GateSyllabusTopic, GateResource } from '@/lib/gate/gateTypes';
import { GateService } from '@/lib/gate/gateService';
import GateSyncPilotHelper from './GateSyncPilotHelper';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  Filter,
  Layers,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Video,
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

  // Set default selected subject & topic when syllabus loads
  useEffect(() => {
    if (subjectsMap.length > 0 && !selectedSubjectId) {
      const firstSub = subjectsMap[0];
      setSelectedSubjectId(firstSub.subjectId);
      if (firstSub.topics.length > 0) {
        setSelectedTopicId(firstSub.topics[0].topicId);
      }
    }
  }, [subjectsMap, selectedSubjectId]);

  // Fetch resources when selected topic changes
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

  // Currently active topic details
  const activeTopic = useMemo(() => {
    return syllabus.find((t) => t.topicId === selectedTopicId) || syllabus[0];
  }, [syllabus, selectedTopicId]);

  // Split resources into Primary (1-3 shown), Practice (PYQs), and Secondary (Explore More)
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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* HEADER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Syllabus & Contextual Resources — GATE {paper.code}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select a subject and topic to view its concept breakdown, 1–3 curated learning resources, and practice PYQs.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects, topics, subtopics..."
            className="w-full glass rounded-full pl-9 pr-4 py-2 text-xs outline-none focus:ring-1 ring-accent border border-white/10"
          />
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT: Left = Subject/Topic Navigation, Right = Contextual Topic View */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Subject & Topic Tree (4 Cols) */}
        <div className="lg:col-span-4 rounded-2xl glass border border-white/10 p-4 space-y-4 max-h-[750px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Subjects & Topics</span>
            <span className="text-[10px] text-accent font-mono">{filteredSubjects.length} Subjects</span>
          </div>

          <div className="space-y-3">
            {filteredSubjects.map((sub) => {
              const isSelectedSubject = selectedSubjectId === sub.subjectId;
              return (
                <div key={sub.subjectId} className="space-y-1">
                  {/* Subject Header */}
                  <button
                    onClick={() => {
                      setSelectedSubjectId(sub.subjectId);
                      if (sub.topics.length > 0) setSelectedTopicId(sub.topics[0].topicId);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition ${
                      isSelectedSubject
                        ? 'bg-accent/15 text-accent border border-accent/30'
                        : 'hover:bg-white/5 text-foreground'
                    }`}
                  >
                    <span className="line-clamp-1">{sub.subjectName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({sub.topics.length})</span>
                  </button>

                  {/* Topics list under subject */}
                  {isSelectedSubject && (
                    <div className="pl-3 space-y-1 pt-1 border-l border-white/10 ml-2">
                      {sub.topics.map((t) => {
                        const isSelectedTopic = selectedTopicId === t.topicId;
                        return (
                          <button
                            key={t.topicId}
                            onClick={() => setSelectedTopicId(t.topicId)}
                            className={`w-full p-2 rounded-lg text-left text-xs transition flex items-center justify-between ${
                              isSelectedTopic
                                ? 'bg-white/10 text-white font-medium border-l-2 border-accent pl-2.5'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                          >
                            <span className="line-clamp-1">{t.topicName}</span>
                            {isSelectedTopic && <ChevronRight className="h-3.5 w-3.5 text-accent flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Contextual Resource View (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {activeTopic ? (
            <div className="space-y-6">
              {/* TOPIC CONCEPT CARD */}
              <div className="rounded-2xl glass border border-white/10 p-6 space-y-5">
                {/* Subject & Topic Title */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                    {activeTopic.subjectName}
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {activeTopic.topicName}
                  </h2>
                  {activeTopic.weightageEstimate && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                      <span>Weightage: {activeTopic.weightageEstimate}</span>
                    </div>
                  )}
                </div>

                {/* 1. UNDERSTAND */}
                <div className="space-y-1.5 border-t border-white/5 pt-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span>1. Understand the Concept</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/5">
                    {activeTopic.conceptSummary}
                  </p>
                </div>

                {/* 2. WHY IT MATTERS */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-purple-400" />
                    <span>2. Why it Matters in GATE</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{activeTopic.whyItMatters}</p>
                </div>

                {/* 3. WHAT YOU NEED TO KNOW (Checklist) */}
                {activeTopic.keyTakeaways && activeTopic.keyTakeaways.length > 0 && (
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>3. What You Need to Know (Key Checklist)</span>
                    </div>
                    <ul className="space-y-1.5 pl-1">
                      {activeTopic.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CONTEXTUAL SYNCPILOT HELPER */}
              <GateSyncPilotHelper topicName={activeTopic.topicName} paperCode={paper.code} />

              {/* 4. LEARN: 1-3 CURATED PRIMARY RESOURCES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-accent" />
                    <span>4. Learn — Curated Primary Resources (1–3 Selected)</span>
                  </h3>
                  <span className="text-[10px] text-muted-foreground">Curated by SyncRole</span>
                </div>

                {loadingResources ? (
                  <div className="p-8 text-center glass rounded-2xl">
                    <div className="h-6 w-6 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto" />
                  </div>
                ) : primaryResources.length > 0 ? (
                  <div className="space-y-3">
                    {primaryResources.map((res) => (
                      <div
                        key={res.id}
                        className="rounded-2xl glass border border-white/10 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/20 transition"
                      >
                        <div className="space-y-1.5 max-w-xl">
                          <div className="flex items-center gap-2 flex-wrap text-[10px]">
                            <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold uppercase tracking-wider">
                              {res.resourceType}
                            </span>
                            <span className="text-slate-400 font-medium">{res.provider}</span>
                          </div>
                          <h4 className="font-display text-sm font-semibold text-foreground">{res.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{res.description}</p>
                        </div>
                        <div className="flex-none">
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent/20 hover:bg-accent/30 text-accent text-xs font-semibold px-4 py-2.5 transition border border-accent/30"
                          >
                            <span>Open resource</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center glass rounded-2xl text-xs text-muted-foreground">
                    No verified primary resources currently loaded for this topic.
                  </div>
                )}
              </div>

              {/* 5. PRACTICE: RELEVANT PYQS */}
              <div className="space-y-3">
                <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>5. Practice — Topic-Level PYQs</span>
                </h3>

                {practiceResources.length > 0 ? (
                  <div className="space-y-3">
                    {practiceResources.map((res) => (
                      <div
                        key={res.id}
                        className="rounded-2xl glass border border-emerald-500/20 bg-emerald-500/5 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 max-w-xl">
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>Verified Previous-Year Questions</span>
                          </div>
                          <h4 className="font-display text-sm font-semibold text-foreground">{res.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{res.description}</p>
                        </div>
                        <div className="flex-none">
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold px-4 py-2.5 transition border border-emerald-500/40"
                          >
                            <span>Practice PYQs</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center glass rounded-xl text-xs text-slate-400">
                    Topic PYQs available in official GATE past papers collection.
                  </div>
                )}
              </div>

              {/* 6. EXPLORE MORE (SECONDARY RESOURCES COLLAPSED BY DEFAULT) */}
              {secondaryResources.length > 0 && (
                <div className="space-y-3 border-t border-white/5 pt-4">
                  <button
                    onClick={() => setShowExploreMore(!showExploreMore)}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition"
                  >
                    <span>6. Explore More Secondary Materials ({secondaryResources.length})</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${showExploreMore ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {showExploreMore && (
                    <div className="space-y-3 pt-2">
                      {secondaryResources.map((res) => (
                        <div key={res.id} className="rounded-xl glass border border-white/5 p-4 text-xs space-y-1">
                          <div className="font-semibold text-foreground">{res.title}</div>
                          <div className="text-slate-400">{res.description}</div>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-accent hover:underline font-medium pt-1"
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
            <div className="p-12 text-center glass rounded-2xl text-muted-foreground text-sm">
              Select a subject and topic from the left menu to view contextual resources.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

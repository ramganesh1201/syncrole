import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle2, Info, X, Zap, Target, BookMarked, Code2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dsa-roadmap")({
  component: DSARoadmapPage,
  head: () => ({ meta: [{ title: "DSA Roadmap — SyncRole" }] }),
});

type Topic = {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  display_order: number;
  estimated_hours: number | null;
  prerequisite_topics: string[] | null;
  interview_frequency: string | null;
  importance_score: number | null;
  theory_summary: string | null;
  key_formulas: string | null;
  important_observations: string | null;
  common_interview_tricks: string | null;
  pattern_recognition: string | null;
  typical_mistakes: string | null;
  cheat_sheet: string | null;
  memory_tips: string | null;
  visualization_notes: string | null;
};
type UserTopicProgress = {
  id: string;
  topic_id: string;
  completed_percent: number;
  mastery_score: number;
};

function DSARoadmapPage() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [progress, setProgress] = useState<Map<string, UserTopicProgress>>(new Map());
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  async function load() {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const uid = u.user.id;
    const [topicsRes, progressRes] = await Promise.all([
      supabase.from("dsa_topics").select("*").order("display_order"),
      supabase.from("user_topic_progress").select("*").eq("user_id", uid),
    ]);
    setTopics(topicsRes.data ?? []);
    const progMap = new Map<string, UserTopicProgress>(
      (progressRes.data ?? []).map((p: any) => [p.topic_id as string, p as UserTopicProgress]),
    );
    setProgress(progMap);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[60vh]">
        <div className="h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" />
      </div>
    );
  }

  const easyTopics = topics.filter((t) => t.difficulty === "easy");
  const mediumTopics = topics.filter((t) => t.difficulty === "medium");
  const hardTopics = topics.filter((t) => t.difficulty === "hard");

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-8 space-y-8 bg-[#F8FAFC]">
      <Link
        to="/dashboard/dsa"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to DSA Command Center
      </Link>

      <div>
        <h1 className="font-display text-4xl font-bold text-slate-900 tracking-tight">DSA Topic Roadmap</h1>
        <p className="text-sm text-slate-600 mt-2">
          Master each data structure and algorithm systematically.
        </p>
      </div>

      {/* Easy Topics */}
      <Section
        router={router}
        title="Foundations (Easy)"
        description="Master the basics"
        color="text-emerald-700"
        topics={easyTopics}
        progress={progress}
        onSelectTopic={setSelectedTopic}
      />

      {/* Medium Topics */}
      <Section
        router={router}
        title="Intermediate (Medium)"
        description="Build solid skills"
        color="text-amber-700"
        topics={mediumTopics}
        progress={progress}
        onSelectTopic={setSelectedTopic}
      />

      {/* Hard Topics */}
      <Section
        router={router}
        title="Advanced (Hard)"
        description="Achieve mastery"
        color="text-rose-700"
        topics={hardTopics}
        progress={progress}
        onSelectTopic={setSelectedTopic}
      />

      <AnimatePresence>
        {selectedTopic && (
          <TopicStudyModal 
            topic={selectedTopic} 
            onClose={() => setSelectedTopic(null)} 
            router={router} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function Section({ router, title, description, color, topics, progress, onSelectTopic }: any) {
  return (
    <div>
      <div className="mb-4">
        <h2 className={`font-display text-2xl font-bold ${color}`}>{title}</h2>
        <p className="text-sm text-slate-500 font-medium">{description}</p>
      </div>
      <div className="grid gap-3">
        {topics.map((topic: Topic) => {
          const prog = progress.get(topic.id);
          const completed = prog && prog.mastery_score >= 70;
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-slate-200/80 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all"
            >
              <div
                className={`h-10 w-10 rounded-full grid place-items-center shrink-0 ${completed ? "bg-emerald-100 border border-emerald-200" : "bg-slate-100 border border-slate-200"}`}
              >
                {completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <BookOpen className="h-5 w-5 text-slate-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 text-base">{topic.name}</div>
                <div className="text-xs text-slate-600 mt-0.5">{topic.description}</div>
                {prog && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-purple-600 transition-all"
                        style={{ width: `${prog.completed_percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-700">{prog.mastery_score}%</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 mt-3 sm:mt-0 shrink-0">
                <button
                  onClick={() => onSelectTopic(topic)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors w-full sm:w-auto text-center border border-slate-200/80 shadow-xs"
                >
                  Study
                </button>
                <button
                  onClick={() => {
                    router.navigate({
                      to: "/dsa-problems",
                      search: { topic: topic.id },
                    });
                  }}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors w-full sm:w-auto text-center shadow-xs"
                >
                  Practice
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function TopicStudyModal({ topic, onClose, router }: { topic: Topic; onClose: () => void; router: any }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95 }}
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col border border-slate-200 shadow-2xl text-slate-900"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 text-purple-700 border border-purple-200 rounded-xl">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900">{topic.name}</h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-1">
                <span className="uppercase tracking-widest text-purple-700 font-bold">{topic.difficulty}</span>
                <span>Est. {topic.estimated_hours || 5} hours</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Interview Freq</div>
              <div className="font-bold text-slate-900 capitalize">{topic.interview_frequency || 'Medium'}</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Importance</div>
              <div className="font-bold text-slate-900">{topic.importance_score || 5}/10</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 md:col-span-2">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Prerequisites</div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {topic.prerequisite_topics?.length ? topic.prerequisite_topics.map(p => (
                  <span key={p} className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded font-medium text-slate-700">{p}</span>
                )) : <span className="text-xs text-slate-400 font-medium">None</span>}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {topic.theory_summary && (
              <section>
                <h3 className="flex items-center gap-2 text-base font-bold mb-2.5 text-purple-700"><Info className="w-4 h-4" /> Theory & Concepts</h3>
                <div className="text-sm text-slate-700 leading-relaxed p-4 bg-slate-50 border border-slate-200/80 rounded-2xl whitespace-pre-wrap">
                  {topic.theory_summary}
                </div>
              </section>
            )}

            {topic.common_interview_tricks && (
              <section>
                <h3 className="flex items-center gap-2 text-base font-bold mb-2.5 text-amber-700"><Zap className="w-4 h-4 text-amber-600" /> Interview Tricks</h3>
                <div className="text-sm text-slate-700 leading-relaxed p-4 bg-amber-50/60 border border-amber-200 rounded-2xl whitespace-pre-wrap">
                  {topic.common_interview_tricks}
                </div>
              </section>
            )}

            {topic.typical_mistakes && (
              <section>
                <h3 className="flex items-center gap-2 text-base font-bold mb-2.5 text-rose-700"><Target className="w-4 h-4 text-rose-600" /> Common Mistakes</h3>
                <div className="text-sm text-slate-700 leading-relaxed p-4 bg-rose-50/60 border border-rose-200 rounded-2xl whitespace-pre-wrap">
                  {topic.typical_mistakes}
                </div>
              </section>
            )}
            
            {topic.key_formulas && (
              <section>
                <h3 className="flex items-center gap-2 text-base font-bold mb-2.5 text-blue-700"><Code2 className="w-4 h-4 text-blue-600" /> Key Formulas / Snippets</h3>
                <pre className="text-xs text-slate-800 leading-relaxed p-4 bg-slate-900 text-slate-100 rounded-2xl overflow-x-auto font-mono">
                  {topic.key_formulas}
                </pre>
              </section>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={() => {
              onClose();
              router.navigate({
                to: "/dsa-problems",
                search: { topic: topic.id },
              });
            }}
            className="px-6 py-2.5 rounded-full text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition shadow-md"
          >
            Start Practicing
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}


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
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-8 space-y-8">
      <Link
        to="/dashboard/dsa"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Back to DSA Command Center
      </Link>

      <div>
        <h1 className="font-display text-4xl font-bold">DSA Topic Roadmap</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Master each data structure and algorithm systematically.
        </p>
      </div>

      {/* Easy Topics */}
      <Section
        router={router}
        title="Foundations (Easy)"
        description="Master the basics"
        color="text-green-400"
        topics={easyTopics}
        progress={progress}
        onSelectTopic={setSelectedTopic}
      />

      {/* Medium Topics */}
      <Section
        router={router}
        title="Intermediate (Medium)"
        description="Build solid skills"
        color="text-yellow-400"
        topics={mediumTopics}
        progress={progress}
        onSelectTopic={setSelectedTopic}
      />

      {/* Hard Topics */}
      <Section
        router={router}
        title="Advanced (Hard)"
        description="Achieve mastery"
        color="text-red-400"
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
        <p className="text-sm text-muted-foreground">{description}</p>
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
              className="glass-strong rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition"
            >
              <div
                className={`h-10 w-10 rounded-full grid place-items-center ${completed ? "bg-green-500/20" : "bg-white/10"}`}
              >
                {completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                ) : (
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium">{topic.name}</div>
                <div className="text-xs text-muted-foreground">{topic.description}</div>
                {prog && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-aurora transition-all"
                        style={{ width: `${prog.completed_percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono">{prog.mastery_score}%</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 mt-3 sm:mt-0">
                <button
                  onClick={() => onSelectTopic(topic)}
                  className="px-4 py-1.5 rounded-full text-xs bg-white/5 hover:bg-white/10 text-foreground transition-colors w-full sm:w-auto text-center border border-white/10"
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
                  className="px-4 py-1.5 rounded-full text-xs bg-aurora text-primary-foreground hover:bg-aurora/90 transition-colors w-full sm:w-auto text-center"
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
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95 }}
        className="glass-strong rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col border border-white/10 shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-aurora/20 text-aurora rounded-xl">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">{topic.name}</h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="uppercase tracking-widest text-aurora font-medium">{topic.difficulty}</span>
                <span>Est. {topic.estimated_hours || 5} hours</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-3 border border-white/5">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Interview Freq</div>
              <div className="font-medium capitalize">{topic.interview_frequency || 'Medium'}</div>
            </div>
            <div className="glass rounded-xl p-3 border border-white/5">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Importance</div>
              <div className="font-medium">{topic.importance_score || 5}/10</div>
            </div>
            <div className="glass rounded-xl p-3 border border-white/5 md:col-span-2">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Prerequisites</div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {topic.prerequisite_topics?.length ? topic.prerequisite_topics.map(p => (
                  <span key={p} className="text-xs bg-white/5 px-2 py-0.5 rounded text-primary/80">{p}</span>
                )) : <span className="text-xs text-muted-foreground">None</span>}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {topic.theory_summary && (
              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold mb-3 text-aurora"><Info className="w-4 h-4" /> Theory & Concepts</h3>
                <div className="text-sm text-primary/80 leading-relaxed p-4 glass rounded-2xl whitespace-pre-wrap">
                  {topic.theory_summary}
                </div>
              </section>
            )}

            {topic.common_interview_tricks && (
              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold mb-3 text-yellow-400"><Zap className="w-4 h-4" /> Interview Tricks</h3>
                <div className="text-sm text-primary/80 leading-relaxed p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl whitespace-pre-wrap">
                  {topic.common_interview_tricks}
                </div>
              </section>
            )}

            {topic.typical_mistakes && (
              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold mb-3 text-red-400"><Target className="w-4 h-4" /> Common Mistakes</h3>
                <div className="text-sm text-primary/80 leading-relaxed p-4 bg-red-500/5 border border-red-500/10 rounded-2xl whitespace-pre-wrap">
                  {topic.typical_mistakes}
                </div>
              </section>
            )}
            
            {topic.key_formulas && (
              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold mb-3 text-blue-400"><Code2 className="w-4 h-4" /> Key Formulas / Snippets</h3>
                <pre className="text-xs text-blue-300 leading-relaxed p-4 bg-black/40 border border-blue-500/10 rounded-2xl overflow-x-auto">
                  {topic.key_formulas}
                </pre>
              </section>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-white/5 bg-black/40 flex justify-end">
          <button
            onClick={() => {
              onClose();
              router.navigate({
                to: "/dsa-problems",
                search: { topic: topic.id },
              });
            }}
            className="px-6 py-2.5 rounded-full text-sm font-semibold bg-aurora text-primary-foreground hover:bg-aurora/90 transition shadow-lg shadow-aurora/20"
          >
            Start Practicing
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}


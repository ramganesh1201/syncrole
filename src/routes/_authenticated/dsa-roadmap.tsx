import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Flame, Lock, CheckCircle2 } from "lucide-react";
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
      />

      {/* Medium Topics */}
      <Section
        router={router}
        title="Intermediate (Medium)"
        description="Build solid skills"
        color="text-yellow-400"
        topics={mediumTopics}
        progress={progress}
      />

      {/* Hard Topics */}
      <Section
        router={router}
        title="Advanced (Hard)"
        description="Achieve mastery"
        color="text-red-400"
        topics={hardTopics}
        progress={progress}
      />
    </main>
  );
}

function Section({ router, title, description, color, topics, progress }: any) {
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
              <button
                onClick={() => {
                  router.navigate({
                    to: "/dsa-problems",
                    search: { topic: topic.id },
                  });
                }}
                className="px-3 py-1 rounded-full text-xs bg-aurora text-primary-foreground hover:bg-aurora/90"
              >
                Practice
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

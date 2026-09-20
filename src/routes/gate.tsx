import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { GateService } from '@/lib/gate/gateService';
import { GatePaperInfo, GateEvent, GateUpdate, GateSyllabusTopic } from '@/lib/gate/gateTypes';
import GateHeader, { GateTab } from '@/components/gate/GateHeader';
import GateOverviewTab from '@/components/gate/GateOverviewTab';
import GateUnderstandTab from '@/components/gate/GateUnderstandTab';
import GateSyllabusResourcesTab from '@/components/gate/GateSyllabusResourcesTab';
import GateUpdatesTab from '@/components/gate/GateUpdatesTab';
import SyncFooter from '@/components/SyncFooter';

export const Route = createFileRoute('/gate')({
  head: () => ({
    meta: [
      { title: 'GATE 2027 Discovery Hub — Syllabus, Resources & Official Info | SyncRole' },
      {
        name: 'description',
        content:
          'Public, source-backed GATE 2027 discovery hub. Understand the exam structure, explore the syllabus for GATE CSE & DA, discover contextual learning resources, and track verified official timelines.',
      },
      { property: 'og:title', content: 'GATE 2027 Discovery Hub | SyncRole' },
      {
        property: 'og:description',
        content:
          'Understand GATE, explore the syllabus, access verified dates, and find curated preparation resources — organized in one place.',
      },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: GatePage,
});

function GatePage() {
  const [activeTab, setActiveTab] = useState<GateTab>('overview');
  const [selectedPaper, setSelectedPaper] = useState<string>('CSE');

  // Data state
  const papers: GatePaperInfo[] = GateService.getSupportedPapers();
  const [events, setEvents] = useState<GateEvent[]>([]);
  const [updates, setUpdates] = useState<GateUpdate[]>([]);
  const [syllabus, setSyllabus] = useState<GateSyllabusTopic[]>([]);
  const [lastVerifiedAt, setLastVerifiedAt] = useState<string>(new Date().toISOString());
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial GATE data
  useEffect(() => {
    let isSubscribed = true;

    async function loadData() {
      setLoading(true);

      const [eventsRes, updatesRes, syllabusRes] = await Promise.all([
        GateService.getEvents(),
        GateService.getUpdates(),
        GateService.getSyllabus(selectedPaper),
      ]);

      if (isSubscribed) {
        setEvents(eventsRes.data);
        setUpdates(updatesRes.data);
        setSyllabus(syllabusRes.data);
        setLastVerifiedAt(eventsRes.lastVerifiedAt);
        setIsFallback(eventsRes.isFallback);
        setLoading(false);
      }
    }

    loadData();

    return () => {
      isSubscribed = false;
    };
  }, [selectedPaper]);

  const activePaperObj = papers.find((p) => p.code === selectedPaper) || papers[0];

  return (
    <div className="min-h-screen relative bg-background text-foreground flex flex-col justify-between">
      <div>
        {/* Sticky Header */}
        <GateHeader
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          selectedPaper={selectedPaper}
          papers={papers}
          onSelectPaper={setSelectedPaper}
        />

        {/* Main Content Area */}
        <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
          {loading ? (
            <div className="min-h-[50vh] grid place-items-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                <span className="text-xs text-muted-foreground font-medium">
                  Loading verified GATE data...
                </span>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <GateOverviewTab
                  paper={activePaperObj}
                  events={events}
                  updates={updates}
                  onSelectTab={setActiveTab}
                  lastVerifiedAt={lastVerifiedAt}
                  isFallback={isFallback}
                />
              )}

              {activeTab === 'understand' && (
                <GateUnderstandTab
                  paper={activePaperObj}
                  onExploreSyllabus={() => setActiveTab('syllabus')}
                />
              )}

              {activeTab === 'syllabus' && (
                <GateSyllabusResourcesTab paper={activePaperObj} syllabus={syllabus} />
              )}

              {activeTab === 'updates' && (
                <GateUpdatesTab
                  events={events}
                  updates={updates}
                  lastVerifiedAt={lastVerifiedAt}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Global SyncRole Footer */}
      <SyncFooter />
    </div>
  );
}

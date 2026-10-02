import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { GateService } from '@/lib/gate/gateService';
import { GatePaperInfo, GateEvent, GateUpdate, GateSyllabusTopic } from '@/lib/gate/gateTypes';
import GateHeader, { GateSectionId } from '@/components/gate/GateHeader';
import GateOverviewTab from '@/components/gate/GateOverviewTab';
import GateSyllabusResourcesTab from '@/components/gate/GateSyllabusResourcesTab';
import GateUpdatesTab from '@/components/gate/GateUpdatesTab';
import GateFooter from '@/components/gate/GateFooter';

export const Route = createFileRoute('/gate')({
  head: () => ({
    meta: [
      { title: 'GATE 2027 Information Hub — Official Syllabus, Dates & Exam Pattern | SyncRole' },
      {
        name: 'description',
        content:
          'Official GATE 2027 information product inside SyncRole. Verified syllabus for GATE CSE, DA & all papers, real-time timeline, exam pattern, eligibility rules, and official source links.',
      },
      { property: 'og:title', content: 'GATE 2027 Official Information Hub | SyncRole' },
      {
        property: 'og:description',
        content:
          'Source-backed GATE 2027 information hub. Verified exam pattern, 2027 syllabus, timeline milestones, and official resources.',
      },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: GatePage,
});

function GatePage() {
  const [activeSection, setActiveSection] = useState<GateSectionId>('overview');
  const [selectedPaper, setSelectedPaper] = useState<string>('CSE');

  // Data state
  const papers: GatePaperInfo[] = GateService.getSupportedPapers();
  const [events, setEvents] = useState<GateEvent[]>([]);
  const [updates, setUpdates] = useState<GateUpdate[]>([]);
  const [syllabus, setSyllabus] = useState<GateSyllabusTopic[]>([]);
  const [lastVerifiedAt, setLastVerifiedAt] = useState<string>('2026-09-25T12:00:00Z');
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

  const handleSelectSection = (secId: GateSectionId) => {
    setActiveSection(secId);
    const element = document.getElementById(secId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 flex flex-col justify-between selection:bg-teal-100 selection:text-teal-900 font-sans">
      <div>
        {/* Compact Contextual Header */}
        <GateHeader
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          selectedPaper={selectedPaper}
          papers={papers}
          onSelectPaper={setSelectedPaper}
        />

        {/* Main Content Area */}
        <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 pb-24 md:pb-8">
          {loading ? (
            <div className="min-h-[50vh] grid place-items-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-teal-600 border-t-transparent animate-spin" />
                <span className="text-xs text-slate-600 font-medium">
                  Loading verified GATE 2027 information...
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Comprehensive GATE 2027 Information Hub Content */}
              <GateOverviewTab
                paper={activePaperObj}
                papers={papers}
                events={events}
                updates={updates}
                onSelectPaper={setSelectedPaper}
                onJumpToSyllabus={() => handleSelectSection('syllabus')}
                lastVerifiedAt={lastVerifiedAt}
                isFallback={isFallback}
              />

              {/* Syllabus Breakdown & Interactive Learning Map */}
              <GateSyllabusResourcesTab paper={activePaperObj} syllabus={syllabus} />

              {/* Updates & Timeline */}
              <GateUpdatesTab
                events={events}
                updates={updates}
                lastVerifiedAt={lastVerifiedAt}
              />
            </div>
          )}
        </main>
      </div>

      {/* Compact Contextual GATE Footer */}
      <GateFooter lastVerifiedAt={lastVerifiedAt} />
    </div>
  );
}

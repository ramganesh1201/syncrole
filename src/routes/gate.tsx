import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { GateService } from '@/lib/gate/gateService';
import { GatePaperInfo, GateEvent, GateUpdate, GateSyllabusTopic } from '@/lib/gate/gateTypes';
import GateHeader, { GateDesktopTab, GateMobileTab } from '@/components/gate/GateHeader';
import GateOverviewTab from '@/components/gate/GateOverviewTab';
import GateSyllabusResourcesTab from '@/components/gate/GateSyllabusResourcesTab';
import GatePatternTab from '@/components/gate/GatePatternTab';
import GateUpdatesTab from '@/components/gate/GateUpdatesTab';
import GateFooter from '@/components/gate/GateFooter';
import { GateMobileScreens } from '@/components/gate/GateMobileScreens';

interface GateSearch {
  screen?: GateMobileTab;
  tab?: GateDesktopTab;
  paper?: string;
}

export const Route = createFileRoute('/gate')({
  validateSearch: (search: Record<string, unknown>): GateSearch => {
    const validScreens: GateMobileTab[] = ['home', 'syllabus', 'dates', 'updates', 'more'];
    const validTabs: GateDesktopTab[] = ['overview', 'syllabus', 'pattern', 'updates'];
    const screen = validScreens.includes(search.screen as GateMobileTab)
      ? (search.screen as GateMobileTab)
      : 'home';
    const tab = validTabs.includes(search.tab as GateDesktopTab)
      ? (search.tab as GateDesktopTab)
      : 'overview';
    return {
      screen,
      tab,
      paper: (search.paper as string) || undefined,
    };
  },
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
  const search = useSearch({ from: '/gate' });
  const navigate = useNavigate({ from: '/gate' });

  const activeMobileScreen: GateMobileTab = search.screen || 'home';
  const activeDesktopTab: GateDesktopTab = search.tab || 'overview';
  const [selectedPaper, setSelectedPaper] = useState<string>(search.paper || 'CSE');

  // Data state
  const papers: GatePaperInfo[] = GateService.getSupportedPapers();
  const [events, setEvents] = useState<GateEvent[]>([]);
  const [updates, setUpdates] = useState<GateUpdate[]>([]);
  const [syllabus, setSyllabus] = useState<GateSyllabusTopic[]>([]);
  const [lastVerifiedAt, setLastVerifiedAt] = useState<string>('2026-09-25T12:00:00Z');
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync selected paper search param if changed
  const handleSelectPaper = (code: string) => {
    setSelectedPaper(code);
    navigate({
      search: (prev) => ({ ...prev, paper: code }),
      replace: true,
    });
  };

  // Switch desktop tab with URL update
  const handleSelectDesktopTab = (tab: GateDesktopTab) => {
    navigate({
      search: (prev) => ({ ...prev, tab }),
      replace: true,
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Switch mobile screen with scroll to top
  const handleNavigateMobileScreen = (screen: GateMobileTab) => {
    navigate({
      search: (prev) => ({ ...prev, screen }),
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

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
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 flex flex-col justify-between selection:bg-teal-100 selection:text-teal-900 font-sans">
      <div>
        {/* Persistent GATE Header (App Shell Header) */}
        <GateHeader
          activeDesktopTab={activeDesktopTab}
          onSelectDesktopTab={handleSelectDesktopTab}
          activeMobileTab={activeMobileScreen}
          onSelectMobileTab={handleNavigateMobileScreen}
          selectedPaper={selectedPaper}
          papers={papers}
          onSelectPaper={handleSelectPaper}
        />

        {/* Main Content Area */}
        <main className="mx-auto max-w-7xl px-4 md:px-6 py-4 md:py-8 pb-24 md:pb-8">
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
            <>
              {/* MOBILE VIEW — DEDICATED APP SCREENS (Hidden on desktop) */}
              <div className="md:hidden">
                <GateMobileScreens
                  activeScreen={activeMobileScreen}
                  onNavigateScreen={handleNavigateMobileScreen}
                  paper={activePaperObj}
                  papers={papers}
                  events={events}
                  updates={updates}
                  syllabus={syllabus}
                  onSelectPaper={handleSelectPaper}
                  lastVerifiedAt={lastVerifiedAt}
                />
              </div>

              {/* DESKTOP VIEW — FOCUSED WORKSPACE TABS (Hidden on mobile) */}
              <div className="hidden md:block">
                {activeDesktopTab === 'overview' && (
                  <GateOverviewTab
                    paper={activePaperObj}
                    papers={papers}
                    events={events}
                    updates={updates}
                    onSelectPaper={handleSelectPaper}
                    onJumpToSyllabus={() => handleSelectDesktopTab('syllabus')}
                    onJumpToUpdates={() => handleSelectDesktopTab('updates')}
                    onJumpToPattern={() => handleSelectDesktopTab('pattern')}
                    lastVerifiedAt={lastVerifiedAt}
                    isFallback={isFallback}
                  />
                )}

                {activeDesktopTab === 'syllabus' && (
                  <GateSyllabusResourcesTab
                    paper={activePaperObj}
                    papers={papers}
                    syllabus={syllabus}
                    onSelectPaper={handleSelectPaper}
                  />
                )}

                {activeDesktopTab === 'pattern' && (
                  <GatePatternTab />
                )}

                {activeDesktopTab === 'updates' && (
                  <GateUpdatesTab
                    events={events}
                    updates={updates}
                    lastVerifiedAt={lastVerifiedAt}
                  />
                )}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Contextual GATE Footer */}
      <GateFooter lastVerifiedAt={lastVerifiedAt} />
    </div>
  );
}

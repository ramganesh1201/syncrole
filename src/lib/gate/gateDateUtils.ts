import { useState, useEffect } from 'react';
import { GateEvent } from './gateTypes';
import { toast } from 'sonner';

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPassed: boolean;
  isTentative: boolean;
  formatted: string;
}

export interface GateLiveSchedule {
  enrichedEvents: GateEvent[];
  ongoingEvent: GateEvent | null;
  nextMilestone: GateEvent | null;
  examEvent: GateEvent | null;
  targetMilestone: GateEvent | null;
  countdown: CountdownResult;
}

/**
 * Returns dynamic real-time status for an event compared against current time.
 */
export function getDynamicEventStatus(
  event: GateEvent,
  now: Date
): 'upcoming' | 'ongoing' | 'completed' | 'tentative' {
  if (event.isTentative || event.status === 'tentative' || !event.startDate) {
    return 'tentative';
  }

  const startMs = new Date(event.startDate).getTime();
  if (isNaN(startMs)) {
    return 'tentative';
  }

  const endMs = event.endDate
    ? new Date(event.endDate).getTime()
    : startMs + 24 * 60 * 60 * 1000 - 1;

  const nowMs = now.getTime();

  if (nowMs < startMs) {
    return 'upcoming';
  } else if (nowMs >= startMs && nowMs <= endMs) {
    return 'ongoing';
  } else {
    return 'completed';
  }
}

/**
 * Enriches all events with live statuses calculated from the current timestamp.
 */
export function enrichEventsWithDynamicStatus(events: GateEvent[], now: Date): GateEvent[] {
  return events.map((event) => {
    const dynamicStatus = getDynamicEventStatus(event, now);
    return {
      ...event,
      status: dynamicStatus,
    };
  });
}

/**
 * Calculates countdown from current time to target date with second-level precision.
 */
export function calculateCountdown(
  targetDateStr: string | undefined,
  now: Date,
  isTentative = false
): CountdownResult {
  if (!targetDateStr || isTentative) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isPassed: false,
      isTentative: true,
      formatted: 'Schedule awaiting official release',
    };
  }

  const targetMs = new Date(targetDateStr).getTime();
  if (isNaN(targetMs)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isPassed: false,
      isTentative: true,
      formatted: 'Schedule awaiting official release',
    };
  }

  const diffMs = targetMs - now.getTime();

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isPassed: true,
      isTentative: false,
      formatted: 'Milestone reached / In progress',
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let formatted = '';
  if (days > 0) {
    formatted = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else if (hours > 0) {
    formatted = `${hours}h ${minutes}m ${seconds}s`;
  } else {
    formatted = `${minutes}m ${seconds}s`;
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    isPassed: false,
    isTentative: false,
    formatted,
  };
}

/**
 * Resolves current live schedule details, active events, and countdown.
 */
export function resolveGateLiveSchedule(events: GateEvent[], now: Date): GateLiveSchedule {
  const enriched = enrichEventsWithDynamicStatus(events, now);

  const ongoingEvent = enriched.find((e) => e.status === 'ongoing') || null;

  // Upcoming events sorted chronologically by startDate
  const upcomingEvents = enriched
    .filter((e) => e.status === 'upcoming' && e.startDate)
    .sort((a, b) => new Date(a.startDate!).getTime() - new Date(b.startDate!).getTime());

  const nextMilestone = upcomingEvents[0] || null;
  const examEvent = enriched.find((e) => e.eventType === 'exam') || null;

  // Target milestone is the immediate next milestone or the CBT exam
  const targetMilestone = nextMilestone || examEvent || null;

  const countdown = calculateCountdown(
    targetMilestone?.startDate,
    now,
    targetMilestone?.isTentative
  );

  return {
    enrichedEvents: enriched,
    ongoingEvent,
    nextMilestone,
    examEvent,
    targetMilestone,
    countdown,
  };
}

/**
 * React hook that maintains live IST/local time, ticking every second.
 * Automatically synchronizes on tab resume via visibilitychange.
 */
export function useGateLiveClock(): Date {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    // Tick every second for accurate countdown
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    // Tab resume handler: when tab becomes active, recalculate immediately to avoid drift
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setNow(new Date());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return now;
}

/**
 * PDF download utility:
 * Attempts direct blob download with explicit filename.
 * Falls back cleanly to opening the verified official PDF in a new tab if cross-origin (CORS) is blocked,
 * providing clear user instructions.
 */
export async function downloadOrOpenGatePdf(
  pdfUrl: string,
  paperCode: string
): Promise<{ success: boolean; method: 'direct_blob' | 'browser_tab' }> {
  const fileName = `GATE_2027_${paperCode}_Official_Syllabus.pdf`;

  try {
    const response = await fetch(pdfUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/pdf',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 10000);

    toast.success(`Downloaded ${fileName}`);
    return { success: true, method: 'direct_blob' };
  } catch (error) {
    // Cross-origin restriction on official IIT Madras server prevents direct blob download.
    // Fallback cleanly to opening the verified PDF in a new tab and inform user.
    const newWindow = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      window.location.href = pdfUrl;
    }

    toast.info(
      `Opening official GATE ${paperCode} syllabus PDF. Use your browser's share or save menu to keep offline.`,
      { duration: 6000 }
    );

    return { success: false, method: 'browser_tab' };
  }
}

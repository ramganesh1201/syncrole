import { supabase } from '@/integrations/supabase/client';
import {
  GatePaperInfo,
  GateSource,
  GateEvent,
  GateUpdate,
  GateSyllabusTopic,
  GateResource
} from './gateTypes';
import {
  GATE_PAPERS,
  GATE_SOURCES,
  GATE_EVENTS,
  GATE_UPDATES,
  GATE_CSE_SYLLABUS,
  GATE_RESOURCES
} from './gateData';

export interface GateDataResponse<T> {
  data: T;
  isFallback: boolean;
  lastVerifiedAt: string;
  verificationStatus: 'verified' | 'pending_recheck' | 'stale' | 'archived';
  sourceName?: string;
  officialUrl?: string;
}

export class GateService {
  /**
   * Returns list of supported papers (CSE, DA, ECE, EE, ME, Civil)
   */
  static getSupportedPapers(): GatePaperInfo[] {
    return GATE_PAPERS;
  }

  /**
   * Fetches GATE events/timeline milestones from Supabase gate_events table,
   * falling back cleanly to curated seed with explicit freshness metadata.
   */
  static async getEvents(): Promise<GateDataResponse<GateEvent[]>> {
    try {
      const { data, error } = await supabase
        .from('gate_events')
        .select('*')
        .order('start_date', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: GateEvent[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          eventType: item.event_type,
          startDate: item.start_date,
          endDate: item.end_date,
          dateLabel: item.date_label,
          status: item.status,
          sourceId: item.source_id,
          officialUrl: item.official_url,
          lastCheckedAt: item.last_checked_at,
          lastVerifiedAt: item.last_verified_at,
          verificationStatus: item.verification_status,
        }));

        const latestVerified = mapped.reduce(
          (latest, curr) => (curr.lastVerifiedAt > latest ? curr.lastVerifiedAt : latest),
          mapped[0]?.lastVerifiedAt || new Date().toISOString()
        );

        return {
          data: mapped,
          isFallback: false,
          lastVerifiedAt: latestVerified,
          verificationStatus: 'verified',
          officialUrl: 'https://gate2025.iitr.ac.in/',
          sourceName: 'Official GATE Organizing Portal (IIT Roorkee)',
        };
      }
    } catch (e) {
      console.warn('[GateService] Supabase events query failed; using verified seed archive.', e);
    }

    return {
      data: GATE_EVENTS,
      isFallback: true,
      lastVerifiedAt: GATE_EVENTS[0].lastVerifiedAt,
      verificationStatus: 'verified',
      officialUrl: GATE_EVENTS[0].officialUrl,
      sourceName: 'Official GATE Organizing Portal (IIT Roorkee)',
    };
  }

  /**
   * Fetches GATE official updates feed
   */
  static async getUpdates(): Promise<GateDataResponse<GateUpdate[]>> {
    try {
      const { data, error } = await supabase
        .from('gate_updates')
        .select('*')
        .order('published_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped: GateUpdate[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          summary: item.summary,
          updateType: item.update_type,
          sourceId: item.source_id,
          officialUrl: item.official_url,
          publishedAt: item.published_at,
          detectedAt: item.detected_at,
          lastVerifiedAt: item.last_verified_at,
          verificationStatus: item.verification_status,
          previousValue: item.previous_value,
          newValue: item.new_value,
        }));

        return {
          data: mapped,
          isFallback: false,
          lastVerifiedAt: mapped[0]?.lastVerifiedAt || new Date().toISOString(),
          verificationStatus: 'verified',
        };
      }
    } catch (e) {
      console.warn('[GateService] Supabase updates query failed; using verified seed archive.', e);
    }

    return {
      data: GATE_UPDATES,
      isFallback: true,
      lastVerifiedAt: GATE_UPDATES[0].lastVerifiedAt,
      verificationStatus: 'verified',
    };
  }

  /**
   * Fetches syllabus for a specific paper code (e.g. 'CSE')
   */
  static async getSyllabus(paperCode: string = 'CSE'): Promise<GateDataResponse<GateSyllabusTopic[]>> {
    try {
      const { data, error } = await supabase
        .from('gate_syllabus')
        .select('*')
        .eq('paper_code', paperCode)
        .order('subject_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: GateSyllabusTopic[] = data.map((item: any) => ({
          id: item.id,
          paperCode: item.paper_code,
          paperName: item.paper_name,
          subjectId: item.subject_id,
          subjectName: item.subject_name,
          subjectOrder: item.subject_order,
          topicId: item.topic_id,
          topicName: item.topic_name,
          topicOrder: item.topic_order,
          subtopics: item.subtopics || [],
          weightageEstimate: item.weightage_estimate,
          conceptSummary: item.concept_summary,
          whyItMatters: item.why_it_matters,
          keyTakeaways: item.key_takeaways || [],
          version: item.version,
          sourceId: item.source_id,
          lastVerifiedAt: item.last_verified_at,
        }));

        return {
          data: mapped,
          isFallback: false,
          lastVerifiedAt: mapped[0]?.lastVerifiedAt || new Date().toISOString(),
          verificationStatus: 'verified',
        };
      }
    } catch (e) {
      console.warn('[GateService] Supabase syllabus query failed; using verified seed archive.', e);
    }

    // Default return for CSE
    const filteredSeed = GATE_CSE_SYLLABUS.filter(t => t.paperCode === paperCode || paperCode === 'CSE');

    return {
      data: filteredSeed,
      isFallback: true,
      lastVerifiedAt: GATE_CSE_SYLLABUS[0].lastVerifiedAt,
      verificationStatus: 'verified',
    };
  }

  /**
   * Fetches contextual resources for a given topicId (e.g. 'deadlocks')
   */
  static async getResourcesForTopic(topicId: string): Promise<GateDataResponse<GateResource[]>> {
    try {
      const { data, error } = await supabase
        .from('gate_resources')
        .select('*')
        .eq('topic_id', topicId);

      if (!error && data && data.length > 0) {
        const mapped: GateResource[] = data.map((item: any) => ({
          id: item.id,
          topicId: item.topic_id,
          title: item.title,
          resourceType: item.resource_type,
          provider: item.provider,
          url: item.url,
          description: item.description,
          isPrimary: item.is_primary,
          sourceClassification: item.source_classification,
          sourceId: item.source_id,
          lastCheckedAt: item.last_checked_at,
          lastVerifiedAt: item.last_verified_at,
          verificationStatus: item.verification_status,
        }));

        return {
          data: mapped,
          isFallback: false,
          lastVerifiedAt: mapped[0]?.lastVerifiedAt || new Date().toISOString(),
          verificationStatus: 'verified',
        };
      }
    } catch (e) {
      console.warn('[GateService] Supabase resources query failed; using verified seed archive.', e);
    }

    const topicResources = GATE_RESOURCES.filter(r => r.topicId === topicId);

    return {
      data: topicResources,
      isFallback: true,
      lastVerifiedAt: topicResources[0]?.lastVerifiedAt || '2026-09-15T10:00:00Z',
      verificationStatus: 'verified',
    };
  }
}

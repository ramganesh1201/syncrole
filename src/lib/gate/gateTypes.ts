export type VerificationStatus = 'verified' | 'pending_recheck' | 'stale' | 'archived';

export type SourceClassification = 'official_source' | 'curated_learning' | 'external_resource';

export interface GateSource {
  id: string;
  name: string;
  url: string;
  sourceType: 'official' | 'institutional' | 'educational' | 'community';
  isOfficial: boolean;
  lastCheckedAt: string;
  lastVerifiedAt?: string;
}

export interface GateEvent {
  id: string;
  examYear: number;
  title: string;
  eventType: 'registration' | 'correction' | 'admit_card' | 'exam' | 'answer_key' | 'result' | 'scorecard';
  startDate?: string;
  endDate?: string;
  dateLabel: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'tentative';
  description?: string;
  isTentative?: boolean;
  sourceId?: string;
  officialUrl?: string;
  lastCheckedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
}

export interface GateUpdate {
  id: string;
  examYear: number;
  title: string;
  summary: string;
  whatItMeans?: string;
  updateType: 'official_announcement' | 'timeline_change' | 'syllabus_update' | 'guidelines_update';
  sourceId?: string;
  officialUrl?: string;
  publishedAt: string;
  detectedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  previousValue?: string;
  newValue?: string;
}

export interface GateSyllabusTopic {
  id: string;
  examYear: number;
  paperCode: string;
  paperName: string;
  subjectId: string;
  subjectName: string;
  subjectOrder: number;
  topicId: string;
  topicName: string;
  topicOrder: number;
  subtopics: string[];
  weightageEstimate?: string;
  conceptSummary: string; // 1. Understand: What does this concept mean?
  whyItMatters: string;   // 2. Why it matters in GATE
  keyTakeaways: string[]; // 3. What you need to know
  version: string;
  sourceId?: string;
  lastVerifiedAt: string;
}

export interface GateResource {
  id: string;
  examYear: number;
  topicId: string;
  title: string;
  resourceType: 'video' | 'notes' | 'textbook' | 'pyq' | 'practice';
  provider: string;
  url: string;
  description: string;
  isPrimary: boolean;
  sourceClassification: SourceClassification;
  sourceId?: string;
  lastCheckedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
}

export interface GatePaperInfo {
  code: string;
  name: string;
  category?: string;
  isFullySupported: boolean;
  description: string;
  totalMarks: number;
  totalQuestions: number;
  durationMinutes: number;
  allowedSecondPapers?: string[];
  officialSyllabusUrl?: string;
  officialPdfUrl?: string;
}


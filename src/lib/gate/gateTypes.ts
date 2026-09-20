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
  title: string;
  eventType: 'registration' | 'correction' | 'admit_card' | 'exam' | 'answer_key' | 'result' | 'scorecard';
  startDate?: string;
  endDate?: string;
  dateLabel: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'tentative';
  sourceId?: string;
  officialUrl?: string;
  lastCheckedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
}

export interface GateUpdate {
  id: string;
  title: string;
  summary: string;
  updateType: 'official_announcement' | 'timeline_change' | 'syllabus_update';
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
  topicId: string;
  title: string;
  resourceType: 'video' | 'notes' | 'textbook' | 'pyq' | 'practice';
  provider: string; // e.g. "NPTEL / IIT Madras", "Standard Author - Silberschatz", "Official GATE 2024 Question Paper"
  url: string;
  description: string;
  isPrimary: boolean; // 1-3 primary resources shown first; others secondary (collapsed in "Explore More")
  sourceClassification: SourceClassification;
  sourceId?: string;
  lastCheckedAt: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
}

export interface GatePaperInfo {
  code: string;
  name: string;
  isFullySupported: boolean;
  description: string;
  totalMarks: number;
  totalQuestions: number;
  durationMinutes: number;
}

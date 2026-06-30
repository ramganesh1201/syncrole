export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          code: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          code: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          code?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          created_at: string
          id: string
          meta: Json | null
          type: string
          user_id: string
          xp_delta: number
        }
        Insert: {
          created_at?: string
          id?: string
          meta?: Json | null
          type: string
          user_id: string
          xp_delta?: number
        }
        Update: {
          created_at?: string
          id?: string
          meta?: Json | null
          type?: string
          user_id?: string
          xp_delta?: number
        }
        Relationships: []
      }
      ai_conversations: {
        Row: {
          created_at: string
          id: string
          mode: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mode?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mode?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_dsa_insights: {
        Row: {
          created_at: string | null
          id: string
          insight: string
          priority: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          insight: string
          priority?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          insight?: string
          priority?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_memory: {
        Row: {
          id: string
          memory_key: string | null
          memory_value: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          memory_key?: string | null
          memory_value?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          memory_key?: string | null
          memory_value?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      company_problem_mapping: {
        Row: {
          company_id: string
          created_at: string
          id: string
          importance: number | null
          problem_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          importance?: number | null
          problem_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          importance?: number | null
          problem_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_problem_mapping_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_question_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_problem_mapping_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "dsa_problems"
            referencedColumns: ["id"]
          },
        ]
      }
      company_question_sets: {
        Row: {
          company_name: string
          created_at: string
          description: string | null
          focus_topics: string[] | null
          hiring_frequency: string | null
          id: string
          interview_difficulty: string | null
          interview_frequency: string | null
          oa_difficulty: string | null
          question_count: number | null
          recommended_preparation_order: number | null
          top_topics: string[] | null
        }
        Insert: {
          company_name: string
          created_at?: string
          description?: string | null
          focus_topics?: string[] | null
          hiring_frequency?: string | null
          id?: string
          interview_difficulty?: string | null
          interview_frequency?: string | null
          oa_difficulty?: string | null
          question_count?: number | null
          recommended_preparation_order?: number | null
          top_topics?: string[] | null
        }
        Update: {
          company_name?: string
          created_at?: string
          description?: string | null
          focus_topics?: string[] | null
          hiring_frequency?: string | null
          id?: string
          interview_difficulty?: string | null
          interview_frequency?: string | null
          oa_difficulty?: string | null
          question_count?: number | null
          recommended_preparation_order?: number | null
          top_topics?: string[] | null
        }
        Relationships: []
      }
      daily_missions: {
        Row: {
          code: string
          completed: boolean
          completed_at: string | null
          created_at: string
          description: string | null
          id: string
          mission_date: string
          progress: number
          target: number
          title: string
          user_id: string
          xp_reward: number
        }
        Insert: {
          code: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          mission_date?: string
          progress?: number
          target?: number
          title: string
          user_id: string
          xp_reward?: number
        }
        Update: {
          code?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          mission_date?: string
          progress?: number
          target?: number
          title?: string
          user_id?: string
          xp_reward?: number
        }
        Relationships: []
      }
      dsa_daily_challenges: {
        Row: {
          challenge_date: string
          created_at: string
          id: string
          problem_id: string
          xp_reward: number
        }
        Insert: {
          challenge_date?: string
          created_at?: string
          id?: string
          problem_id: string
          xp_reward?: number
        }
        Update: {
          challenge_date?: string
          created_at?: string
          id?: string
          problem_id?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "dsa_daily_challenges_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "dsa_problems"
            referencedColumns: ["id"]
          },
        ]
      }
      dsa_mock_interviews: {
        Row: {
          completed_at: string | null
          duration_minutes: number | null
          feedback: string | null
          id: string
          score: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          duration_minutes?: number | null
          feedback?: string | null
          id?: string
          score?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          duration_minutes?: number | null
          feedback?: string | null
          id?: string
          score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      dsa_problems: {
        Row: {
          acceptance_rate: number | null
          blind75: boolean | null
          companies: string[] | null
          created_at: string
          description: string | null
          difficulty: string
          estimated_solving_time: number | null
          frequency: number | null
          grind75: boolean | null
          id: string
          importance: number | null
          is_premium: boolean | null
          leetcode_url: string | null
          neetcode150: boolean | null
          problem_pattern: string | null
          recommended_order: number | null
          subtopic: string | null
          tags: string[] | null
          title: string
          top150: boolean | null
          topic_id: string
          xp_reward: number
        }
        Insert: {
          acceptance_rate?: number | null
          blind75?: boolean | null
          companies?: string[] | null
          created_at?: string
          description?: string | null
          difficulty: string
          estimated_solving_time?: number | null
          frequency?: number | null
          grind75?: boolean | null
          id?: string
          importance?: number | null
          is_premium?: boolean | null
          leetcode_url?: string | null
          neetcode150?: boolean | null
          problem_pattern?: string | null
          recommended_order?: number | null
          subtopic?: string | null
          tags?: string[] | null
          title: string
          top150?: boolean | null
          topic_id: string
          xp_reward?: number
        }
        Update: {
          acceptance_rate?: number | null
          blind75?: boolean | null
          companies?: string[] | null
          created_at?: string
          description?: string | null
          difficulty?: string
          estimated_solving_time?: number | null
          frequency?: number | null
          grind75?: boolean | null
          id?: string
          importance?: number | null
          is_premium?: boolean | null
          leetcode_url?: string | null
          neetcode150?: boolean | null
          problem_pattern?: string | null
          recommended_order?: number | null
          subtopic?: string | null
          tags?: string[] | null
          title?: string
          top150?: boolean | null
          topic_id?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "dsa_problems_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "dsa_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      dsa_progress: {
        Row: {
          created_at: string
          easy: number
          hard: number
          id: string
          log_date: string
          medium: number
          platform: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          easy?: number
          hard?: number
          id?: string
          log_date?: string
          medium?: number
          platform?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          easy?: number
          hard?: number
          id?: string
          log_date?: string
          medium?: number
          platform?: string | null
          user_id?: string
        }
        Relationships: []
      }
      dsa_topics: {
        Row: {
          cheat_sheet: string | null
          common_interview_tricks: string | null
          created_at: string
          description: string | null
          difficulty: string | null
          display_order: number
          estimated_hours: number | null
          id: string
          importance_score: number | null
          important_observations: string | null
          interview_frequency: string | null
          key_formulas: string | null
          memory_tips: string | null
          name: string
          pattern_recognition: string | null
          prerequisite_topics: string[] | null
          theory_summary: string | null
          typical_mistakes: string | null
          visualization_notes: string | null
        }
        Insert: {
          cheat_sheet?: string | null
          common_interview_tricks?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          display_order?: number
          estimated_hours?: number | null
          id?: string
          importance_score?: number | null
          important_observations?: string | null
          interview_frequency?: string | null
          key_formulas?: string | null
          memory_tips?: string | null
          name: string
          pattern_recognition?: string | null
          prerequisite_topics?: string[] | null
          theory_summary?: string | null
          typical_mistakes?: string | null
          visualization_notes?: string | null
        }
        Update: {
          cheat_sheet?: string | null
          common_interview_tricks?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          display_order?: number
          estimated_hours?: number | null
          id?: string
          importance_score?: number | null
          important_observations?: string | null
          interview_frequency?: string | null
          key_formulas?: string | null
          memory_tips?: string | null
          name?: string
          pattern_recognition?: string | null
          prerequisite_topics?: string[] | null
          theory_summary?: string | null
          typical_mistakes?: string | null
          visualization_notes?: string | null
        }
        Relationships: []
      }
      github_analysis: {
        Row: {
          analyzed_at: string
          follower_count: number | null
          languages: Json | null
          recommendations: string[] | null
          repo_count: number | null
          score: number | null
          star_count: number | null
          strengths: string[] | null
          user_id: string
          username: string | null
          weaknesses: string[] | null
        }
        Insert: {
          analyzed_at?: string
          follower_count?: number | null
          languages?: Json | null
          recommendations?: string[] | null
          repo_count?: number | null
          score?: number | null
          star_count?: number | null
          strengths?: string[] | null
          user_id: string
          username?: string | null
          weaknesses?: string[] | null
        }
        Update: {
          analyzed_at?: string
          follower_count?: number | null
          languages?: Json | null
          recommendations?: string[] | null
          repo_count?: number | null
          score?: number | null
          star_count?: number | null
          strengths?: string[] | null
          user_id?: string
          username?: string | null
          weaknesses?: string[] | null
        }
        Relationships: []
      }
      interview_sessions: {
        Row: {
          company: string | null
          created_at: string | null
          feedback: Json | null
          id: string
          role: string | null
          score: number | null
          user_id: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          feedback?: Json | null
          id?: string
          role?: string | null
          score?: number | null
          user_id?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          feedback?: Json | null
          id?: string
          role?: string | null
          score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      placement_scores: {
        Row: {
          communication_score: number
          created_at: string
          dsa_score: number
          github_score: number
          id: string
          projects_score: number
          resume_score: number
          skill_score: number
          total_score: number
          user_id: string
        }
        Insert: {
          communication_score?: number
          created_at?: string
          dsa_score?: number
          github_score?: number
          id?: string
          projects_score?: number
          resume_score?: number
          skill_score?: number
          total_score?: number
          user_id: string
        }
        Update: {
          communication_score?: number
          created_at?: string
          dsa_score?: number
          github_score?: number
          id?: string
          projects_score?: number
          resume_score?: number
          skill_score?: number
          total_score?: number
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          branch: string | null
          career_goal: Database["public"]["Enums"]["career_goal"] | null
          cgpa: number | null
          college: string | null
          completion_pct: number
          created_at: string
          email: string | null
          full_name: string | null
          github_username: string | null
          graduation_year: number | null
          onboarding_completed: boolean
          skills: string[] | null
          updated_at: string
          user_id: string
          phone: string | null
          city: string | null
          linkedin: string | null
          portfolio: string | null
          leetcode: string | null
          codeforces: string | null
          target_role: string | null
          dream_companies: string[] | null
          preferred_location: string | null
          expected_salary: string | null
        }
        Insert: {
          avatar_url?: string | null
          branch?: string | null
          career_goal?: Database["public"]["Enums"]["career_goal"] | null
          cgpa?: number | null
          college?: string | null
          completion_pct?: number
          created_at?: string
          email?: string | null
          full_name?: string | null
          github_username?: string | null
          graduation_year?: number | null
          onboarding_completed?: boolean
          skills?: string[] | null
          updated_at?: string
          user_id: string
          phone?: string | null
          city?: string | null
          linkedin?: string | null
          portfolio?: string | null
          leetcode?: string | null
          codeforces?: string | null
          target_role?: string | null
          dream_companies?: string[] | null
          preferred_location?: string | null
          expected_salary?: string | null
        }
        Update: {
          avatar_url?: string | null
          branch?: string | null
          career_goal?: Database["public"]["Enums"]["career_goal"] | null
          cgpa?: number | null
          college?: string | null
          completion_pct?: number
          created_at?: string
          email?: string | null
          full_name?: string | null
          github_username?: string | null
          graduation_year?: number | null
          onboarding_completed?: boolean
          skills?: string[] | null
          updated_at?: string
          user_id?: string
          phone?: string | null
          city?: string | null
          linkedin?: string | null
          portfolio?: string | null
          leetcode?: string | null
          codeforces?: string | null
          target_role?: string | null
          dream_companies?: string[] | null
          preferred_location?: string | null
          expected_salary?: string | null
        }
        Relationships: []
      }
      resume_analysis: {
        Row: {
          analysis_results: Json | null
          ats_score: number | null
          created_at: string
          document_type: string | null
          extracted_text: string | null
          file_name: string | null
          file_path: string | null
          formatting_score: number | null
          id: string
          keyword_match: number | null
          missing_skills: string[] | null
          project_score: number | null
          suggestions: string[] | null
          total_score: number | null
          user_id: string
          version_number: number | null
        }
        Insert: {
          analysis_results?: Json | null
          ats_score?: number | null
          created_at?: string
          document_type?: string | null
          extracted_text?: string | null
          file_name?: string | null
          file_path?: string | null
          formatting_score?: number | null
          id?: string
          keyword_match?: number | null
          missing_skills?: string[] | null
          project_score?: number | null
          suggestions?: string[] | null
          total_score?: number | null
          user_id: string
          version_number?: number | null
        }
        Update: {
          analysis_results?: Json | null
          ats_score?: number | null
          created_at?: string
          document_type?: string | null
          extracted_text?: string | null
          file_name?: string | null
          file_path?: string | null
          formatting_score?: number | null
          id?: string
          keyword_match?: number | null
          missing_skills?: string[] | null
          project_score?: number | null
          suggestions?: string[] | null
          total_score?: number | null
          user_id?: string
          version_number?: number | null
        }
        Relationships: []
      }
      resume_versions: {
        Row: {
          analysis_results: Json | null
          ats_score: number | null
          created_at: string
          document_type: string | null
          extracted_text: string | null
          file_name: string | null
          file_path: string | null
          formatting_score: number | null
          id: string
          keyword_match: number | null
          missing_skills: string[] | null
          project_score: number | null
          suggestions: string[] | null
          total_score: number | null
          user_id: string
          version_number: number | null
        }
        Insert: {
          analysis_results?: Json | null
          ats_score?: number | null
          created_at?: string
          document_type?: string | null
          extracted_text?: string | null
          file_name?: string | null
          file_path?: string | null
          formatting_score?: number | null
          id?: string
          keyword_match?: number | null
          missing_skills?: string[] | null
          project_score?: number | null
          suggestions?: string[] | null
          total_score?: number | null
          user_id: string
          version_number?: number | null
        }
        Update: {
          analysis_results?: Json | null
          ats_score?: number | null
          created_at?: string
          document_type?: string | null
          extracted_text?: string | null
          file_name?: string | null
          file_path?: string | null
          formatting_score?: number | null
          id?: string
          keyword_match?: number | null
          missing_skills?: string[] | null
          project_score?: number | null
          suggestions?: string[] | null
          total_score?: number | null
          user_id?: string
          version_number?: number | null
        }
        Relationships: []
      }
      resume_company_fit: {
        Row: {
          company_name: string
          created_at: string
          fit_score: number | null
          id: string
          missing_requirements: string[] | null
          strengths: string[] | null
          user_id: string
          weaknesses: string[] | null
        }
        Insert: {
          company_name: string
          created_at?: string
          fit_score?: number | null
          id?: string
          missing_requirements?: string[] | null
          strengths?: string[] | null
          user_id: string
          weaknesses?: string[] | null
        }
        Update: {
          company_name?: string
          created_at?: string
          fit_score?: number | null
          id?: string
          missing_requirements?: string[] | null
          strengths?: string[] | null
          user_id?: string
          weaknesses?: string[] | null
        }
        Relationships: []
      }
      resume_jd_matches: {
        Row: {
          created_at: string
          id: string
          improvements: Json | null
          jd_text: string
          match_score: number | null
          matched_keywords: string[] | null
          missing_keywords: string[] | null
          missing_skills: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          improvements?: Json | null
          jd_text: string
          match_score?: number | null
          matched_keywords?: string[] | null
          missing_keywords?: string[] | null
          missing_skills?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          improvements?: Json | null
          jd_text?: string
          match_score?: number | null
          matched_keywords?: string[] | null
          missing_keywords?: string[] | null
          missing_skills?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      streaks: {
        Row: {
          current_streak: number
          last_activity_date: string | null
          longest_streak: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_streak?: number
          last_activity_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_streak?: number
          last_activity_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_challenge_progress: {
        Row: {
          challenge_id: string
          completed: boolean | null
          completed_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed?: boolean | null
          completed_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed?: boolean | null
          completed_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_company_focus: {
        Row: {
          company_id: string
          id: string
          selected_at: string
          user_id: string
        }
        Insert: {
          company_id: string
          id?: string
          selected_at?: string
          user_id: string
        }
        Update: {
          company_id?: string
          id?: string
          selected_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_company_focus_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_question_sets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_daily_challenge_progress: {
        Row: {
          challenge_id: string
          claimed: boolean | null
          claimed_at: string | null
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          user_id: string
          xp_earned: number
        }
        Insert: {
          challenge_id: string
          claimed?: boolean | null
          claimed_at?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          user_id: string
          xp_earned?: number
        }
        Update: {
          challenge_id?: string
          claimed?: boolean | null
          claimed_at?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          user_id?: string
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_daily_challenge_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "dsa_daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_problem_progress: {
        Row: {
          attempt_count: number
          created_at: string
          id: string
          is_bookmarked: boolean | null
          is_favorite: boolean | null
          last_attempted: string | null
          last_solved_at: string | null
          needs_revision: boolean | null
          problem_id: string
          revision_priority: number | null
          solved: boolean
          status: string
          time_spent_minutes: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          attempt_count?: number
          created_at?: string
          id?: string
          is_bookmarked?: boolean | null
          is_favorite?: boolean | null
          last_attempted?: string | null
          last_solved_at?: string | null
          needs_revision?: boolean | null
          problem_id: string
          revision_priority?: number | null
          solved?: boolean
          status?: string
          time_spent_minutes?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          attempt_count?: number
          created_at?: string
          id?: string
          is_bookmarked?: boolean | null
          is_favorite?: boolean | null
          last_attempted?: string | null
          last_solved_at?: string | null
          needs_revision?: boolean | null
          problem_id?: string
          revision_priority?: number | null
          solved?: boolean
          status?: string
          time_spent_minutes?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_problem_progress_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "dsa_problems"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_topic_progress: {
        Row: {
          completed_percent: number
          created_at: string
          id: string
          last_activity: string | null
          mastery_score: number
          topic_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_percent?: number
          created_at?: string
          id?: string
          last_activity?: string | null
          mastery_score?: number
          topic_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_percent?: number
          created_at?: string
          id?: string
          last_activity?: string | null
          mastery_score?: number
          topic_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_topic_progress_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "dsa_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_reports: {
        Row: {
          created_at: string
          id: string
          payload: Json
          user_id: string
          week_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          payload?: Json
          user_id: string
          week_start: string
        }
        Update: {
          created_at?: string
          id?: string
          payload?: Json
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
      xp_levels: {
        Row: {
          level: number
          level_name: string
          total_xp: number
          updated_at: string
          user_id: string
        }
        Insert: {
          level?: number
          level_name?: string
          total_xp?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          level?: number
          level_name?: string
          total_xp?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      career_profiles: {
        Row: {
          career_goal: Database["public"]["Enums"]["career_goal"] | null
          college: string | null
          communication_score: number | null
          dsa_score: number | null
          full_name: string | null
          github_score: number | null
          github_username: string | null
          graduation_year: number | null
          placement_readiness: number | null
          projects_score: number | null
          resume_score: number | null
          score_updated_at: string | null
          skill_score: number | null
          skills: string[] | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      award_xp: {
        Args: { _meta?: Json; _type: string; _user: string; _xp: number }
        Returns: undefined
      }
      compute_level: {
        Args: { _xp: number }
        Returns: {
          level: number
          name: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      recompute_placement: { Args: { _user: string }; Returns: number }
    }
    Enums: {
      app_role: "user" | "admin"
      career_goal:
        | "frontend"
        | "backend"
        | "fullstack"
        | "data"
        | "ai"
        | "mobile"
        | "devops"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "admin"],
      career_goal: [
        "frontend",
        "backend",
        "fullstack",
        "data",
        "ai",
        "mobile",
        "devops",
        "other",
      ],
    },
  },
} as const

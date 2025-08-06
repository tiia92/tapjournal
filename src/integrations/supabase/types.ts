export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          anthropic_api_key: string | null
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          anthropic_api_key?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          anthropic_api_key?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          can_manage_analytics: boolean | null
          can_manage_beta_access: boolean | null
          can_manage_employers: boolean | null
          can_manage_jobs: boolean | null
          created_at: string | null
          id: string
          is_super_admin: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          can_manage_analytics?: boolean | null
          can_manage_beta_access?: boolean | null
          can_manage_employers?: boolean | null
          can_manage_jobs?: boolean | null
          created_at?: string | null
          id?: string
          is_super_admin?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          can_manage_analytics?: boolean | null
          can_manage_beta_access?: boolean | null
          can_manage_employers?: boolean | null
          can_manage_jobs?: boolean | null
          created_at?: string | null
          id?: string
          is_super_admin?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      beta_access_codes: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          current_uses: number | null
          description: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      beta_access_redemptions: {
        Row: {
          beta_code_id: string
          employer_org_id: string | null
          id: string
          redeemed_at: string | null
          user_id: string
        }
        Insert: {
          beta_code_id: string
          employer_org_id?: string | null
          id?: string
          redeemed_at?: string | null
          user_id: string
        }
        Update: {
          beta_code_id?: string
          employer_org_id?: string | null
          id?: string
          redeemed_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "beta_access_redemptions_beta_code_id_fkey"
            columns: ["beta_code_id"]
            isOneToOne: false
            referencedRelation: "beta_access_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beta_access_redemptions_employer_org_id_fkey"
            columns: ["employer_org_id"]
            isOneToOne: false
            referencedRelation: "employer_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      business_reporting_waitlist: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      employer_blog_posts: {
        Row: {
          content: string
          created_at: string
          employer_id: string
          id: string
          is_paid: boolean | null
          payment_id: string | null
          published_at: string | null
          slug: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          employer_id: string
          id?: string
          is_paid?: boolean | null
          payment_id?: string | null
          published_at?: string | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          employer_id?: string
          id?: string
          is_paid?: boolean | null
          payment_id?: string | null
          published_at?: string | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_blog_posts_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employer_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_organizations: {
        Row: {
          beta_access_code: string | null
          created_at: string
          founding_member_expires_at: string | null
          id: string
          is_founding_member: boolean | null
          linkedin_page: string | null
          organization_description: string | null
          organization_email: string
          organization_name: string
          remote_work_status: string
          social_media_links: Json | null
          updated_at: string
          user_id: string
          website_url: string | null
          workplace_benefits: string | null
        }
        Insert: {
          beta_access_code?: string | null
          created_at?: string
          founding_member_expires_at?: string | null
          id?: string
          is_founding_member?: boolean | null
          linkedin_page?: string | null
          organization_description?: string | null
          organization_email: string
          organization_name: string
          remote_work_status: string
          social_media_links?: Json | null
          updated_at?: string
          user_id: string
          website_url?: string | null
          workplace_benefits?: string | null
        }
        Update: {
          beta_access_code?: string | null
          created_at?: string
          founding_member_expires_at?: string | null
          id?: string
          is_founding_member?: boolean | null
          linkedin_page?: string | null
          organization_description?: string | null
          organization_email?: string
          organization_name?: string
          remote_work_status?: string
          social_media_links?: Json | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
          workplace_benefits?: string | null
        }
        Relationships: []
      }
      employer_subscriptions: {
        Row: {
          created_at: string
          employer_id: string
          expires_at: string | null
          id: string
          plan_type: string
          starts_at: string
          status: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          employer_id: string
          expires_at?: string | null
          id?: string
          plan_type: string
          starts_at?: string
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          employer_id?: string
          expires_at?: string | null
          id?: string
          plan_type?: string
          starts_at?: string
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_subscriptions_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employer_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_waitlist: {
        Row: {
          contact_email: string
          contact_name: string
          created_at: string
          id: string
          organization_name: string
          organization_website: string | null
          status: string | null
        }
        Insert: {
          contact_email: string
          contact_name: string
          created_at?: string
          id?: string
          organization_name: string
          organization_website?: string | null
          status?: string | null
        }
        Update: {
          contact_email?: string
          contact_name?: string
          created_at?: string
          id?: string
          organization_name?: string
          organization_website?: string | null
          status?: string | null
        }
        Relationships: []
      }
      "idealist old": {
        Row: {
          "Date Posted": string | null
          "How to Apply": string | null
          "Job Listing Link": string | null
          "Job Title": string | null
          "Job Type": string | null
          Location: string | null
          Organization: string | null
          "Salary Range": string | null
          "WFH Option": string | null
        }
        Insert: {
          "Date Posted"?: string | null
          "How to Apply"?: string | null
          "Job Listing Link"?: string | null
          "Job Title"?: string | null
          "Job Type"?: string | null
          Location?: string | null
          Organization?: string | null
          "Salary Range"?: string | null
          "WFH Option"?: string | null
        }
        Update: {
          "Date Posted"?: string | null
          "How to Apply"?: string | null
          "Job Listing Link"?: string | null
          "Job Title"?: string | null
          "Job Type"?: string | null
          Location?: string | null
          Organization?: string | null
          "Salary Range"?: string | null
          "WFH Option"?: string | null
        }
        Relationships: []
      }
      job_analytics: {
        Row: {
          country: string | null
          created_at: string
          device_type: string | null
          event_type: string
          id: string
          ip_address: unknown | null
          job_submission_id: string
          referrer: string | null
          timezone: string | null
          user_agent: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          device_type?: string | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          job_submission_id: string
          referrer?: string | null
          timezone?: string | null
          user_agent?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          device_type?: string | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          job_submission_id?: string
          referrer?: string | null
          timezone?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_analytics_job_submission_id_fkey"
            columns: ["job_submission_id"]
            isOneToOne: false
            referencedRelation: "job_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      job_submissions: {
        Row: {
          application_email: string | null
          application_link: string | null
          application_method: string
          approved_at: string | null
          approved_by: string | null
          cause_area: string | null
          created_at: string
          employer_id: string
          featured_until: string | null
          id: string
          is_paid: boolean | null
          job_description: string
          job_level: string
          job_title: string
          job_type: string
          location: string
          payment_id: string | null
          salary_range: string | null
          status: string | null
          updated_at: string
          wfh_location: string | null
          wfh_option: string
        }
        Insert: {
          application_email?: string | null
          application_link?: string | null
          application_method: string
          approved_at?: string | null
          approved_by?: string | null
          cause_area?: string | null
          created_at?: string
          employer_id: string
          featured_until?: string | null
          id?: string
          is_paid?: boolean | null
          job_description: string
          job_level: string
          job_title: string
          job_type: string
          location: string
          payment_id?: string | null
          salary_range?: string | null
          status?: string | null
          updated_at?: string
          wfh_location?: string | null
          wfh_option: string
        }
        Update: {
          application_email?: string | null
          application_link?: string | null
          application_method?: string
          approved_at?: string | null
          approved_by?: string | null
          cause_area?: string | null
          created_at?: string
          employer_id?: string
          featured_until?: string | null
          id?: string
          is_paid?: boolean | null
          job_description?: string
          job_level?: string
          job_title?: string
          job_type?: string
          location?: string
          payment_id?: string | null
          salary_range?: string | null
          status?: string | null
          updated_at?: string
          wfh_location?: string | null
          wfh_option?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_submissions_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employer_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          activity_note: string | null
          attachments: Json | null
          created_at: string | null
          date: string
          exercise_minutes: number | null
          id: string
          medication_note: string | null
          medications: Json | null
          mood_note: string | null
          mood_rating: number | null
          sleep_hours: number | null
          symptoms: Json | null
          tasks: Json | null
          updated_at: string | null
          user_id: string
          water_intake: number | null
        }
        Insert: {
          activity_note?: string | null
          attachments?: Json | null
          created_at?: string | null
          date: string
          exercise_minutes?: number | null
          id?: string
          medication_note?: string | null
          medications?: Json | null
          mood_note?: string | null
          mood_rating?: number | null
          sleep_hours?: number | null
          symptoms?: Json | null
          tasks?: Json | null
          updated_at?: string | null
          user_id: string
          water_intake?: number | null
        }
        Update: {
          activity_note?: string | null
          attachments?: Json | null
          created_at?: string | null
          date?: string
          exercise_minutes?: number | null
          id?: string
          medication_note?: string | null
          medications?: Json | null
          mood_note?: string | null
          mood_rating?: number | null
          sleep_hours?: number | null
          symptoms?: Json | null
          tasks?: Json | null
          updated_at?: string | null
          user_id?: string
          water_intake?: number | null
        }
        Relationships: []
      }
      non_job_opportunities: {
        Row: {
          created_at: string
          description: string | null
          employer_id: string
          external_link: string | null
          id: string
          job_submission_id: string | null
          opportunity_type: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          employer_id: string
          external_link?: string | null
          id?: string
          job_submission_id?: string | null
          opportunity_type: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          employer_id?: string
          external_link?: string | null
          id?: string
          job_submission_id?: string | null
          opportunity_type?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "non_job_opportunities_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employer_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "non_job_opportunities_job_submission_id_fkey"
            columns: ["job_submission_id"]
            isOneToOne: false
            referencedRelation: "job_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_plus_waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          payment_status: string | null
          phone: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          payment_status?: string | null
          phone?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          payment_status?: string | null
          phone?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      premium_waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          payment_attempted: boolean
          phone: string | null
          stripe_customer_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          payment_attempted?: boolean
          phone?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          payment_attempted?: boolean
          phone?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          description: string | null
          duration_days: number
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          duration_days?: number
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          duration_days?: number
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      promo_redemptions: {
        Row: {
          id: string
          promo_code_id: string
          redeemed_at: string
          user_id: string
        }
        Insert: {
          id?: string
          promo_code_id: string
          redeemed_at?: string
          user_id: string
        }
        Update: {
          id?: string
          promo_code_id?: string
          redeemed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promo_redemptions_promo_code_id_fkey"
            columns: ["promo_code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      racism_detections: {
        Row: {
          analysis: string | null
          confidence_score: number | null
          created_at: string | null
          detected_keywords: string[] | null
          detection_result: boolean
          id: string
          situation: string
          user_id: string | null
        }
        Insert: {
          analysis?: string | null
          confidence_score?: number | null
          created_at?: string | null
          detected_keywords?: string[] | null
          detection_result: boolean
          id?: string
          situation: string
          user_id?: string | null
        }
        Update: {
          analysis?: string | null
          confidence_score?: number | null
          created_at?: string | null
          detected_keywords?: string[] | null
          detection_result?: boolean
          id?: string
          situation?: string
          user_id?: string | null
        }
        Relationships: []
      }
      review_submissions: {
        Row: {
          business_name: string
          business_type: string | null
          created_at: string
          description: string
          discrimination_types: string[] | null
          experience_type: string
          id: string
          location: string
          status: string
          street_address: string | null
          submitted_at: string
          submitter_email: string | null
          submitter_name: string | null
          supporting_link_1: string | null
          supporting_link_2: string | null
          supporting_link_3: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          business_name: string
          business_type?: string | null
          created_at?: string
          description: string
          discrimination_types?: string[] | null
          experience_type: string
          id?: string
          location: string
          status?: string
          street_address?: string | null
          submitted_at: string
          submitter_email?: string | null
          submitter_name?: string | null
          supporting_link_1?: string | null
          supporting_link_2?: string | null
          supporting_link_3?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          business_name?: string
          business_type?: string | null
          created_at?: string
          description?: string
          discrimination_types?: string[] | null
          experience_type?: string
          id?: string
          location?: string
          status?: string
          street_address?: string | null
          submitted_at?: string
          submitter_email?: string | null
          submitter_name?: string | null
          supporting_link_1?: string | null
          supporting_link_2?: string | null
          supporting_link_3?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      review_votes: {
        Row: {
          created_at: string
          id: string
          review_id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          review_id: string
          user_id: string
          vote_type: string
        }
        Update: {
          created_at?: string
          id?: string
          review_id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_votes_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "review_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_searches: {
        Row: {
          cause: string | null
          created_at: string
          id: string
          is_active: boolean
          job_level: string | null
          job_type: string | null
          keyword: string | null
          last_sent_date: string | null
          location: string | null
          salary_range: string | null
          search_name: string
          updated_at: string
          user_id: string
          wfh_option: string | null
        }
        Insert: {
          cause?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          job_level?: string | null
          job_type?: string | null
          keyword?: string | null
          last_sent_date?: string | null
          location?: string | null
          salary_range?: string | null
          search_name: string
          updated_at?: string
          user_id: string
          wfh_option?: string | null
        }
        Update: {
          cause?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          job_level?: string | null
          job_type?: string | null
          keyword?: string | null
          last_sent_date?: string | null
          location?: string | null
          salary_range?: string | null
          search_name?: string
          updated_at?: string
          user_id?: string
          wfh_option?: string | null
        }
        Relationships: []
      }
      "scraped-hackathon": {
        Row: {
          cause: string | null
          created_at: string
          date_posted: string | null
          description: string | null
          featured: string | null
          how_to_apply: string | null
          id: number
          job_level: string | null
          job_title: string | null
          job_type: string | null
          location: string | null
          logo: string | null
          organization: string | null
          salary_range: string | null
          wfh_option: string | null
        }
        Insert: {
          cause?: string | null
          created_at?: string
          date_posted?: string | null
          description?: string | null
          featured?: string | null
          how_to_apply?: string | null
          id?: number
          job_level?: string | null
          job_title?: string | null
          job_type?: string | null
          location?: string | null
          logo?: string | null
          organization?: string | null
          salary_range?: string | null
          wfh_option?: string | null
        }
        Update: {
          cause?: string | null
          created_at?: string
          date_posted?: string | null
          description?: string | null
          featured?: string | null
          how_to_apply?: string | null
          id?: number
          job_level?: string | null
          job_title?: string | null
          job_type?: string | null
          location?: string | null
          logo?: string | null
          organization?: string | null
          salary_range?: string | null
          wfh_option?: string | null
        }
        Relationships: []
      }
      search_email_history: {
        Row: {
          id: string
          job_id: number
          saved_search_id: string
          sent_at: string
        }
        Insert: {
          id?: string
          job_id: number
          saved_search_id: string
          sent_at?: string
        }
        Update: {
          id?: string
          job_id?: number
          saved_search_id?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_email_history_saved_search_id_fkey"
            columns: ["saved_search_id"]
            isOneToOne: false
            referencedRelation: "saved_searches"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          causes: string[] | null
          created_at: string | null
          id: string
          job_levels: string[] | null
          job_types: string[] | null
          salary_preferences: string | null
          updated_at: string | null
          wfh_preferences: string[] | null
        }
        Insert: {
          causes?: string[] | null
          created_at?: string | null
          id: string
          job_levels?: string[] | null
          job_types?: string[] | null
          salary_preferences?: string | null
          updated_at?: string | null
          wfh_preferences?: string[] | null
        }
        Update: {
          causes?: string[] | null
          created_at?: string | null
          id?: string
          job_levels?: string[] | null
          job_types?: string[] | null
          salary_preferences?: string | null
          updated_at?: string | null
          wfh_preferences?: string[] | null
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          is_active: boolean
          start_date: string
          subscription_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          start_date?: string
          subscription_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          start_date?: string
          subscription_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_premium_status: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_premium_email: {
        Args: { email: string }
        Returns: boolean
      }
      redeem_beta_access: {
        Args: { code_text: string }
        Returns: Json
      }
      redeem_promo_code: {
        Args: { user_id: string; code: string }
        Returns: Json
      }
      update_anthropic_api_key: {
        Args: { api_key: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const

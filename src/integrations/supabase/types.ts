export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

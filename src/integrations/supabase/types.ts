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
      "scraped-hackathon": {
        Row: {
          created_at: string
          "Date Posted": string | null
          "How to Apply": string | null
          id: number
          "Job Listing Link": string | null
          "Job Title": string | null
          "Job Type": string | null
          Location: string | null
          Organization: string | null
          "Salary Range": string | null
          "WFH Option": string | null
        }
        Insert: {
          created_at?: string
          "Date Posted"?: string | null
          "How to Apply"?: string | null
          id?: number
          "Job Listing Link"?: string | null
          "Job Title"?: string | null
          "Job Type"?: string | null
          Location?: string | null
          Organization?: string | null
          "Salary Range"?: string | null
          "WFH Option"?: string | null
        }
        Update: {
          created_at?: string
          "Date Posted"?: string | null
          "How to Apply"?: string | null
          id?: number
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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

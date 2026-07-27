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
      collection_items: {
        Row: {
          added_at: string
          condition: Database["public"]["Enums"]["bottle_condition"]
          custom_region: Database["public"]["Enums"]["wine_region"] | null
          custom_wine_name: string | null
          custom_winery: string | null
          id: string
          personal_notes: string | null
          purchase_date: string | null
          purchase_location: string | null
          purchase_price_eur: number | null
          quantity: number
          reference_wine_id: string | null
          storage_notes: string | null
          updated_at: string
          user_id: string
          vintage: number | null
        }
        Insert: {
          added_at?: string
          condition?: Database["public"]["Enums"]["bottle_condition"]
          custom_region?: Database["public"]["Enums"]["wine_region"] | null
          custom_wine_name?: string | null
          custom_winery?: string | null
          id?: string
          personal_notes?: string | null
          purchase_date?: string | null
          purchase_location?: string | null
          purchase_price_eur?: number | null
          quantity?: number
          reference_wine_id?: string | null
          storage_notes?: string | null
          updated_at?: string
          user_id: string
          vintage?: number | null
        }
        Update: {
          added_at?: string
          condition?: Database["public"]["Enums"]["bottle_condition"]
          custom_region?: Database["public"]["Enums"]["wine_region"] | null
          custom_wine_name?: string | null
          custom_winery?: string | null
          id?: string
          personal_notes?: string | null
          purchase_date?: string | null
          purchase_location?: string | null
          purchase_price_eur?: number | null
          quantity?: number
          reference_wine_id?: string | null
          storage_notes?: string | null
          updated_at?: string
          user_id?: string
          vintage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_items_reference_wine_id_fkey"
            columns: ["reference_wine_id"]
            isOneToOne: false
            referencedRelation: "reference_wines"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          id: string
          onboarding_completed: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          id: string
          onboarding_completed?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          onboarding_completed?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      reference_wines: {
        Row: {
          color: Database["public"]["Enums"]["wine_color"]
          confidence_level: Database["public"]["Enums"]["confidence_level"]
          confidence_rationale: string
          created_at: string
          data_sources: string[]
          estimated_market_price_eur: number
          external_search_url: string | null
          grape_varieties: string[] | null
          id: string
          is_active: boolean
          name: string
          price_as_of_date: string
          price_range_high_eur: number | null
          price_range_low_eur: number | null
          region: Database["public"]["Enums"]["wine_region"]
          subregion: string | null
          updated_at: string
          vintage: number | null
          winery: string
        }
        Insert: {
          color?: Database["public"]["Enums"]["wine_color"]
          confidence_level: Database["public"]["Enums"]["confidence_level"]
          confidence_rationale: string
          created_at?: string
          data_sources?: string[]
          estimated_market_price_eur: number
          external_search_url?: string | null
          grape_varieties?: string[] | null
          id?: string
          is_active?: boolean
          name: string
          price_as_of_date?: string
          price_range_high_eur?: number | null
          price_range_low_eur?: number | null
          region: Database["public"]["Enums"]["wine_region"]
          subregion?: string | null
          updated_at?: string
          vintage?: number | null
          winery: string
        }
        Update: {
          color?: Database["public"]["Enums"]["wine_color"]
          confidence_level?: Database["public"]["Enums"]["confidence_level"]
          confidence_rationale?: string
          created_at?: string
          data_sources?: string[]
          estimated_market_price_eur?: number
          external_search_url?: string | null
          grape_varieties?: string[] | null
          id?: string
          is_active?: boolean
          name?: string
          price_as_of_date?: string
          price_range_high_eur?: number | null
          price_range_low_eur?: number | null
          region?: Database["public"]["Enums"]["wine_region"]
          subregion?: string | null
          updated_at?: string
          vintage?: number | null
          winery?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      bottle_condition: "excelente" | "buena" | "aceptable" | "dañada"
      confidence_level: "alto" | "medio" | "bajo"
      wine_color: "tinto" | "blanco" | "rosado" | "espumoso"
      wine_region: "rioja" | "ribera_del_duero" | "priorat"
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
      bottle_condition: ["excelente", "buena", "aceptable", "dañada"],
      confidence_level: ["alto", "medio", "bajo"],
      wine_color: ["tinto", "blanco", "rosado", "espumoso"],
      wine_region: ["rioja", "ribera_del_duero", "priorat"],
    },
  },
} as const

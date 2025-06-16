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
      attendance: {
        Row: {
          attended: boolean
          event_id: number | null
          id: number
          member_id: number | null
        }
        Insert: {
          attended?: boolean
          event_id?: number | null
          id?: never
          member_id?: number | null
        }
        Update: {
          attended?: boolean
          event_id?: number | null
          id?: never
          member_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      cell_attendance: {
        Row: {
          attended: boolean
          id: number
          meeting_id: number | null
          member_id: number | null
        }
        Insert: {
          attended?: boolean
          id?: never
          meeting_id?: number | null
          member_id?: number | null
        }
        Update: {
          attended?: boolean
          id?: never
          meeting_id?: number | null
          member_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cell_attendance_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "cell_meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cell_attendance_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      cell_meetings: {
        Row: {
          created_at: string
          id: number
          location: string | null
          meeting_date: string
          team_id: number | null
        }
        Insert: {
          created_at?: string
          id?: never
          location?: string | null
          meeting_date: string
          team_id?: number | null
        }
        Update: {
          created_at?: string
          id?: never
          location?: string | null
          meeting_date?: string
          team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cell_meetings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "cell_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      cell_teams: {
        Row: {
          created_at: string
          id: number
          leader_id: number | null
          location: string | null
          name: string
          photo: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          leader_id?: number | null
          location?: string | null
          name: string
          photo?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          leader_id?: number | null
          location?: string | null
          name?: string
          photo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cell_teams_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: number | null
          content: string
          created_at: string
          id: number
          post_id: number | null
        }
        Insert: {
          author_id?: number | null
          content: string
          created_at?: string
          id?: never
          post_id?: number | null
        }
        Update: {
          author_id?: number | null
          content?: string
          created_at?: string
          id?: never
          post_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          description: string | null
          event_date: string
          id: number
          location: string | null
          name: string
        }
        Insert: {
          description?: string | null
          event_date: string
          id?: never
          location?: string | null
          name: string
        }
        Update: {
          description?: string | null
          event_date?: string
          id?: never
          location?: string | null
          name?: string
        }
        Relationships: []
      }
      member_teams: {
        Row: {
          id: number
          joined_at: string
          member_id: number | null
          team_id: number | null
        }
        Insert: {
          id?: never
          joined_at?: string
          member_id?: number | null
          team_id?: number | null
        }
        Update: {
          id?: never
          joined_at?: string
          member_id?: number | null
          team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "member_teams_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "cell_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          address: string | null
          email: string
          first_name: string
          id: number
          join_date: string
          last_name: string
          phone_number: string | null
          photo: string | null
          visitor_origin: string | null
        }
        Insert: {
          address?: string | null
          email: string
          first_name: string
          id?: never
          join_date?: string
          last_name: string
          phone_number?: string | null
          photo?: string | null
          visitor_origin?: string | null
        }
        Update: {
          address?: string | null
          email?: string
          first_name?: string
          id?: never
          join_date?: string
          last_name?: string
          phone_number?: string | null
          photo?: string | null
          visitor_origin?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          approved: boolean
          approved_by: number | null
          author_id: number | null
          content: string
          created_at: string
          id: number
          photo: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          approved?: boolean
          approved_by?: number | null
          author_id?: number | null
          content: string
          created_at?: string
          id?: never
          photo?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          approved?: boolean
          approved_by?: number | null
          author_id?: number | null
          content?: string
          created_at?: string
          id?: never
          photo?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: never
          name: string
        }
        Update: {
          description?: string | null
          id?: never
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          id: number
          member_id: number | null
          password: string
          photo: string | null
          role_id: number
          supabase_user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string
          id?: never
          member_id?: number | null
          password: string
          photo?: string | null
          role_id: number
          supabase_user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string
          id?: never
          member_id?: number | null
          password?: string
          photo?: string | null
          role_id?: number
          supabase_user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

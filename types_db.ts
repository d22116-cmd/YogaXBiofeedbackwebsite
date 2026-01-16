
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          billing_address: Json | null
          settings: Json | null
          updated_at: string
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          billing_address?: Json | null
          settings?: Json | null
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          billing_address?: Json | null
          settings?: Json | null
          updated_at?: string
          created_at?: string
        }
      }
      devices: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'pranaflow' | 'pranashirt' | null
          serial_number: string
          status: string | null
          battery_level: number | null
          last_sync: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type?: 'pranaflow' | 'pranashirt' | null
          serial_number: string
          status?: string | null
          battery_level?: number | null
          last_sync?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'pranaflow' | 'pranashirt' | null
          serial_number?: string
          status?: string | null
          battery_level?: number | null
          last_sync?: string | null
          created_at?: string
        }
      }
      device_sessions: {
        Row: {
          id: string
          user_id: string
          device_id: string | null
          start_time: string
          end_time: string | null
          summary: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          device_id?: string | null
          start_time?: string
          end_time?: string | null
          summary?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          device_id?: string | null
          start_time?: string
          end_time?: string | null
          summary?: Json | null
          created_at?: string
        }
      }
      ai_interactions: {
        Row: {
          id: string
          user_id: string
          guru_type: string
          history: Json | null
          tokens_used: number | null
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          guru_type: string
          history?: Json | null
          tokens_used?: number | null
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          guru_type?: string
          history?: Json | null
          tokens_used?: number | null
          updated_at?: string
          created_at?: string
        }
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
  }
}

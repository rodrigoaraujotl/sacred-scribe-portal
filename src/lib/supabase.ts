import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Tables = {
  attendance: {
    id: number;
    event_id: number;
    member_id: number;
    attended: boolean;
  };
  cell_attendance: {
    id: number;
    meeting_id: number;
    member_id: number;
    attended: boolean;
  };
  cell_meetings: {
    id: number;
    team_id: number;
    meeting_date: string;
    location: string | null;
    created_at: string;
  };
  cell_teams: {
    id: number;
    name: string;
    leader_id: number | null;
    created_at: string;
    location: string | null;
    photo: string | null;
  };
  comments: {
    id: number;
    post_id: number;
    author_id: number;
    content: string;
    created_at: string;
  };
  events: {
    id: number;
    name: string;
    description: string | null;
    event_date: string;
    location: string | null;
  };
  member_teams: {
    id: number;
    member_id: number;
    team_id: number;
    joined_at: string;
  };
  members: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    address: string | null;
    join_date: string;
    visitor_origin: string | null;
    photo: string | null;
  };
  posts: {
    id: number;
    title: string;
    content: string;
    author_id: number | null;
    created_at: string;
    updated_at: string | null;
    approved: boolean;
    approved_by: number | null;
    photo: string | null;
  };
  roles: {
    id: number;
    name: string;
    description: string | null;
  };
  users: {
    id: number;
    username: string;
    password: string;
    role_id: number;
    member_id: number | null;
    created_at: string;
    supabase_user_id: string | null;
    photo: string | null;
  };
}; 
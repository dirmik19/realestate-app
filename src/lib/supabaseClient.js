import { createClient } from '@supabase/supabase-js'

// .envで管理しているSupabaseのProject URLとPublishable keyを読み込む
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('SupabaseのURL・キーが.envに設定されていません。')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

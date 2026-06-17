import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function verifyAdminSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('admin_session')?.value

  if (!sessionId) return null

  const { data } = await supabaseAdmin
    .from('admin_sessions')
    .select('id, admin_id, expires_at')
    .eq('id', sessionId)
    .gt('expires_at', new Date().toISOString())
    .single()

  return data ?? null
}

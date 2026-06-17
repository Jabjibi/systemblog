import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('admin_session')?.value

  if (sessionId) {
    await supabaseAdmin.from('admin_sessions').delete().eq('id', sessionId)
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_session', '', { maxAge: 0, path: '/' })
  return response
}

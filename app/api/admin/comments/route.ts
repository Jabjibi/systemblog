import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET() {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('comments')
    .select('id, sender_name, message, status, created_at, blog_id, blogs(title, slug)')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return NextResponse.json(data)
}

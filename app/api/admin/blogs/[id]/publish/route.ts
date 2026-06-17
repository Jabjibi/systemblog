import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { is_published } = await request.json()

  const { error } = await supabaseAdmin
    .from('blogs')
    .update({
      is_published,
      published_at: is_published ? new Date().toISOString() : null,
    })
    .eq('id', id)

  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

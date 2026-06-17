import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { status } = await request.json()

  const validStatuses = ['pending', 'approved', 'rejected']
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ message: 'status ไม่ถูกต้อง' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('comments').update({ status }).eq('id', id)
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}

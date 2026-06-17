import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { slug } = await request.json()

  if (!slug) return NextResponse.json({ message: 'slug จำเป็นต้องระบุ' }, { status: 400 })

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  if (!slugRegex.test(slug)) return NextResponse.json({ message: 'รูปแบบ slug ไม่ถูกต้อง' }, { status: 400 })

  const { error } = await supabaseAdmin.from('blogs').update({ slug }).eq('id', id)
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}

import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ message: 'กรุณากรอก email และ password' }, { status: 400 })
  }

  const { data: admin } = await supabaseAdmin
    .from('admins')
    .select('id, password_hash')
    .eq('email', email)
    .single()

  if (!admin) {
    return NextResponse.json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, admin.password_hash)
  if (!valid) {
    return NextResponse.json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 })
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const { data: session, error } = await supabaseAdmin
    .from('admin_sessions')
    .insert({ admin_id: admin.id, expires_at: expiresAt.toISOString() })
    .select('id')
    .single()

  if (error || !session) {
    return NextResponse.json({ message: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }, { status: 500 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_session', session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: expiresAt,
    path: '/',
  })

  return response
}

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

const PER_PAGE = 10

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim() ?? ''
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'))

  let query = supabaseAdmin
    .from('blogs')
    .select('id, title, slug, excerpt, cover_image_url, published_at', { count: 'exact' })
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range((page - 1) * PER_PAGE, page * PER_PAGE - 1)

  if (q) query = query.ilike('title', `%${q}%`)

  const { data, count, error } = await query
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })

  return NextResponse.json({ blogs: data ?? [], total: count ?? 0, totalPages: Math.ceil((count ?? 0) / PER_PAGE) })
}

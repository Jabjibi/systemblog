# Context: Technical Assignment — Blog System

## Stack ที่เลือก
- **Frontend + API Routes**: Next.js 14 (App Router) + TypeScript
- **Database + Auth + Storage**: Supabase
- **Deploy**: Vercel (frontend) + Supabase (database)

---

## Requirements สรุปจากโจทย์

### 1. หน้ารวม Blog (Blog List)
- แสดงรายการ blog ทั้งหมดที่ `is_published = true`
- แต่ละรายการแสดง: รูปปก, ชื่อ blog, เนื้อหาย่อ (`excerpt`), วันที่โพสต์
- ค้นหาจากชื่อ blog ได้
- Pagination — แสดงหน้าละ 10 รายการ

### 2. หน้ารายละเอียด Blog (Blog Detail)
- รูปปก 1 รูป (`cover_image_url`) + รูปเพิ่มเติมได้อีกไม่เกิน 6 รูป (`blog_images`) รวมสูงสุด 7 รูปต่อ blog
- แสดง: ชื่อ blog, วันที่โพสต์, เนื้อหาเต็ม (`content`), จำนวนผู้เข้าชม (`view_count`)
- เพิ่ม view count ทุกครั้งที่มีคนเข้าดู (ใช้ `increment_view_count(slug)` function ใน Supabase)

### 3. ระบบ Comment
- ผู้ใช้ไม่ต้อง login — anonymous ได้เลย
- ต้องกรอก: ชื่อผู้ส่ง (`sender_name`), ข้อความ (`message`)
- Validation ข้อความ: **ภาษาไทยและ/หรือตัวเลขเท่านั้น**
  - Regex: `/^[\u0E00-\u0E7F0-9\s\r\n]+$/`
  - Validate ทั้ง frontend (UX) และ backend API route (security) และ database constraint (safety net)
- Comment ใหม่มี `status = 'pending'` เสมอ — ยังไม่แสดงจนกว่า admin จะ approve
- แสดงเฉพาะ comment ที่ `status = 'approved'`

### 4. Admin Panel
- ต้อง login ก่อนเข้าใช้งาน (session-based ผ่าน Next.js API route + httpOnly cookie)
- Route: `/admin/*` — protect ด้วย middleware

#### Blog Management
| Action | รายละเอียด |
|---|---|
| Create | สร้าง blog ใหม่ พร้อมอัปโหลดรูปปกและรูปเพิ่มเติม |
| Read | ดูรายการ blog ทั้งหมด (รวม draft) |
| Update | แก้ไข title, content, excerpt, รูป, slug |
| Delete | ลบ blog (cascade ลบ images และ comments ด้วย) |
| Publish / Unpublish | toggle `is_published` |
| Edit Slug | แก้ไข `slug` แยกต่างหาก (ต้อง validate format) |

#### Comment Management
| Action | รายละเอียด |
|---|---|
| ดูรายการ | ดู comment ทั้งหมดทุก status |
| Approve | เปลี่ยน `status` เป็น `approved` |
| Reject | เปลี่ยน `status` เป็น `rejected` (รวมถึง comment ที่เคย approve แล้ว) |

---

## Database Schema (สรุป)

```sql
admins        → id, email, password_hash, created_at
blogs         → id, title, slug (unique), content, excerpt, cover_image_url,
                is_published, view_count, published_at, created_at, updated_at
blog_images   → id, blog_id (FK), image_url, sort_order, created_at
comments      → id, blog_id (FK), sender_name, message, status (enum), created_at, updated_at
```

### comment_status enum
```
pending → approved → rejected
approved → rejected (ย้อนกลับได้)
```

---

## Architecture Decision

### Admin Auth
- ไม่ใช้ Supabase Auth — ใช้ `admins` table เอง
- Login: ตรวจ email + password → bcrypt compare → สร้าง JWT → เก็บใน httpOnly cookie
- Middleware: ตรวจ cookie ทุก request ที่เข้า `/admin/*`
- API routes ใช้ `supabaseAdmin` (service_role key) เพื่อข้าม RLS

### Image Upload
- เก็บรูปใน Supabase Storage (bucket: `blog-images`)
- Public bucket — อ่านได้โดยไม่ต้อง auth
- Upload ผ่าน API route ฝั่ง server เท่านั้น

### View Count
- เรียก `increment_view_count(slug)` ใน Server Component ตอน render หน้า Blog Detail
- เป็น atomic update ป้องกัน race condition

### Thai Text Validation (3 layers)
1. **Frontend** — regex check ก่อน submit (UX)
2. **API Route** — regex check อีกครั้ง (security)
3. **Database** — `CHECK constraint` เป็น safety net สุดท้าย

---

## Project Structure (แนะนำ)

```
/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                  # Blog list
│   │   └── blog/[slug]/
│   │       └── page.tsx              # Blog detail + comments
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── blogs/page.tsx            # Blog list (all)
│   │   ├── blogs/new/page.tsx
│   │   ├── blogs/[id]/edit/page.tsx
│   │   └── comments/page.tsx
│   └── api/
│       ├── auth/login/route.ts
│       ├── auth/logout/route.ts
│       ├── blogs/route.ts
│       ├── blogs/[id]/route.ts
│       ├── blogs/[id]/publish/route.ts
│       ├── comments/route.ts
│       └── comments/[id]/route.ts
├── components/
│   ├── blog/
│   └── admin/
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # anon key (public)
│   │   └── admin.ts                  # service_role key (server only)
│   ├── auth.ts                       # JWT helpers
│   └── validators.ts                 # Thai text regex + slug format
├── middleware.ts                     # Protect /admin/* routes
└── schema.sql                        # Database schema
```

---

## Environment Variables ที่ต้องใช้

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
JWT_SECRET=
```

---

## Slug Format
- ตัวอักษรพิมพ์เล็ก (a-z), ตัวเลข (0-9), และ hyphen (-) เท่านั้น
- ห้ามขึ้นต้นหรือลงท้ายด้วย hyphen
- Regex: `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`

---

## สิ่งที่ต้องส่ง (Part 2)
1. GitHub repository link
2. Link ที่ deploy แล้ว (Vercel)
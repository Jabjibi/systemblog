# SystemBlog

ระบบบล็อกพร้อม Admin Panel สำหรับจัดการบทความและ Comment

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScriptหก
- **Database / Storage / Auth**: Supabase
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Deploy**: Vercel

## Features

**Public**
- Blog list พร้อม search และ pagination (10 รายการ/หน้า)
- Blog detail พร้อมรูปปก, รูปเพิ่มเติม (สูงสุด 7 รูป/บทความ) และ view count
- ระบบ comment แบบ anonymous — validate ภาษาไทย 3 ชั้น (frontend / API / database)

**Admin**
- Login ด้วย JWT เก็บใน httpOnly cookie
- Blog CRUD พร้อม rich content editor (Markdown + inline image upload)
- Publish / Unpublish และแก้ไข Slug แยกต่างหาก
- อนุมัติ / ปฏิเสธ comment

## Deploy

1. Push code ขึ้น GitHub
2. Import project บน [systemblog](https://systemblog-two.vercel.app/)
3. ตั้ง Environment Variables ทั้ง 4 ตัวใน Vercel Dashboard → Settings → Environment Variables
4. Deploy
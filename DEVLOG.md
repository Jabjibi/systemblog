# SystemBlog Devlog

---

## 2026-06-17

### Bug Fixes

**POST /api/admin/upload → 500 "Bucket not found"**
- เพิ่ม `console.error` ใน upload route เพื่อดู error จาก Supabase
- สาเหตุ: bucket `blog-images` ยังไม่ได้สร้างใน Supabase Storage
- Fix: สร้าง public bucket `blog-images` ใน Supabase Dashboard

**ลบรูปปกแล้วไม่หาย**
- สาเหตุ: `preview` state ใน `useImageUpload` ไม่ถูก reset เมื่อกด clear
- Fix: เพิ่ม `reset()` ใน `useImageUpload` แล้วเรียกจาก `clear()` ใน `image-upload.tsx`

**กด Enter ในกลางบรรทัดแล้วเด้งไปท้ายสุด**
- สาเหตุ: `handleKeyDown` สร้าง block ใหม่เป็น empty โดยไม่ split ข้อความที่ cursor
- Fix: ใช้ `e.currentTarget.selectionStart` + `e.currentTarget.value` แบ่ง text ก่อน/หลัง cursor แล้ว insert เป็น 2 blocks

**เพิ่มรูปใน block กลางบทความไม่ได้**
- สาเหตุ: คลิก `+` button → textarea blur → `focusedId = null` → menu หายก่อนกดได้
- Fix: เปลี่ยน `+` button และ menu items จาก `onClick` เป็น `onMouseDown + e.preventDefault()` เพื่อกัน blur และเพิ่ม `pendingInsertAfterRef` เก็บ block ที่จะ insert ก่อนเปิด file dialog

**setState parent ขณะ render child (React error)**
- สาเหตุ: `emitChange` (ซึ่งเรียก `onChange` → `setField` ใน BlogForm) ถูกเรียกใน `setBlocks` updater function
- Fix: ย้าย emit ออกมาเป็น `useEffect` แยก — เมื่อ `blocks` เปลี่ยน effect จะ emit markdown ให้ parent

---

### Features

**Block-based Content Editor (Medium-like)**
- เปลี่ยน editor จาก single textarea เป็น block list
- Text block → `<textarea>` auto-resize
- Image block → `<img>` render จริงทันทีหลัง upload พร้อมปุ่ม `×` ลบ
- กด Enter → split text ที่ cursor สร้าง block ใหม่
- กด Backspace ที่ block ว่าง → ลบ block นั้น
- serialize/deserialize ระหว่าง blocks กับ markdown string

**Formatting Toolbar**
- ปุ่ม Bold (B) และ Bullet List ใน toolbar เหนือ editor
- Bold: wrap selection ด้วย `**...**` หรือ toggle ได้
- Bullet: toggle `- ` ที่ต้นบรรทัด
- Keyboard shortcut: `Cmd+B` / `Ctrl+B` สำหรับ bold

**Image Count Progress Bar**
- แสดงจำนวนรูปที่ใช้ไปจากทั้งหมด 7 รูป (รูปปก + รูปใน content)
- ใช้ `Progress` จาก shadcn/ui พร้อม `indicatorClassName` prop
- สีม่วงปกติ → แดงเมื่อครบ 7

**react-markdown ใน BlogContent**
- เปลี่ยน `blog-content.tsx` จาก split-by-newline เป็น `react-markdown`
- รูปภาพใน markdown `![](url)` render เป็น `<img>` จริงในหน้า public

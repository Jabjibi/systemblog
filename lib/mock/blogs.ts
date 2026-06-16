export type Blog = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string
  is_published: boolean
  view_count: number
  published_at: string
  created_at: string
  updated_at: string
}

export type BlogImage = {
  id: string
  blog_id: string
  image_url: string
  sort_order: number
}

export type Comment = {
  id: string
  blog_id: string
  sender_name: string
  message: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export const MOCK_BLOGS: Blog[] = [
  {
    id: '1',
    title: 'การบริหารจัดการภาษีสำหรับธุรกิจขนาดกลาง',
    slug: 'tax-management-for-sme',
    excerpt: 'เรียนรู้วิธีการวางแผนภาษีที่ถูกต้องและประหยัดค่าใช้จ่ายทางภาษีสำหรับธุรกิจขนาดกลางและขนาดย่อมในประเทศไทย',
    content: `# การบริหารจัดการภาษีสำหรับธุรกิจขนาดกลาง\n\nการวางแผนภาษีที่ดีเป็นสิ่งสำคัญสำหรับธุรกิจทุกขนาด โดยเฉพาะธุรกิจขนาดกลางที่ต้องการลดภาระทางภาษีอย่างถูกกฎหมาย\n\n## หลักการสำคัญ\n\nการบริหารจัดการภาษีที่ดีประกอบด้วยหลายองค์ประกอบ ได้แก่ การจัดทำบัญชีที่ถูกต้อง การใช้สิทธิลดหย่อนภาษีอย่างเต็มที่ และการวางแผนการลงทุนเพื่อประโยชน์ทางภาษี`,
    cover_image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    is_published: true,
    view_count: 1245,
    published_at: '2024-01-15T08:00:00Z',
    created_at: '2024-01-14T10:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    title: 'แผนธุรกิจที่ดีช่วยให้ธุรกิจเติบโตได้อย่างไร',
    slug: 'business-plan-for-growth',
    excerpt: 'แผนธุรกิจที่ครอบคลุมและมีรายละเอียดชัดเจนคือรากฐานสำคัญของความสำเร็จในทุกธุรกิจ ไม่ว่าจะเป็น Startup หรือบริษัทที่ก่อตั้งมานาน',
    content: `# แผนธุรกิจที่ดีช่วยให้ธุรกิจเติบโตได้อย่างไร\n\nแผนธุรกิจไม่ใช่แค่เอกสารสำหรับขอสินเชื่อ แต่คือแผนที่นำทางให้ธุรกิจของคุณไปถึงเป้าหมาย`,
    cover_image_url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    is_published: true,
    view_count: 987,
    published_at: '2024-01-20T08:00:00Z',
    created_at: '2024-01-19T10:00:00Z',
    updated_at: '2024-01-20T08:00:00Z',
  },
  {
    id: '3',
    title: 'งบประมาณบริษัท: วิธีจัดการค่าใช้จ่ายให้มีประสิทธิภาพ',
    slug: 'company-budget-management',
    excerpt: 'การจัดการงบประมาณที่ดีช่วยให้บริษัทควบคุมค่าใช้จ่าย เพิ่มกำไร และพร้อมรับมือกับความไม่แน่นอนทางเศรษฐกิจได้ดียิ่งขึ้น',
    content: `# งบประมาณบริษัท: วิธีจัดการค่าใช้จ่ายให้มีประสิทธิภาพ\n\nการจัดทำงบประมาณประจำปีเป็นหน้าที่สำคัญของทีมการเงินทุกองค์กร`,
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    is_published: true,
    view_count: 756,
    published_at: '2024-02-01T08:00:00Z',
    created_at: '2024-01-31T10:00:00Z',
    updated_at: '2024-02-01T08:00:00Z',
  },
  {
    id: '4',
    title: 'การให้คำปรึกษาด้านการเงิน: สิ่งที่ควรรู้ก่อนเริ่มต้น',
    slug: 'financial-consultation-guide',
    excerpt: 'การเลือกที่ปรึกษาทางการเงินที่เหมาะสมเป็นการตัดสินใจสำคัญที่จะส่งผลต่อความมั่นคงทางการเงินในระยะยาว',
    content: `# การให้คำปรึกษาด้านการเงิน: สิ่งที่ควรรู้ก่อนเริ่มต้น\n\nการมีที่ปรึกษาทางการเงินที่ดีคือการลงทุนที่คุ้มค่าที่สุดอย่างหนึ่ง`,
    cover_image_url: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80',
    is_published: true,
    view_count: 543,
    published_at: '2024-02-10T08:00:00Z',
    created_at: '2024-02-09T10:00:00Z',
    updated_at: '2024-02-10T08:00:00Z',
  },
  {
    id: '5',
    title: 'Startup Funding: แหล่งเงินทุนสำหรับธุรกิจใหม่ในไทย',
    slug: 'startup-funding-thailand',
    excerpt: 'รวมแหล่งเงินทุนสำหรับ Startup ไทยตั้งแต่ Angel Investor ไปจนถึง VC Fund และโปรแกรมสนับสนุนจากภาครัฐ',
    content: `# Startup Funding: แหล่งเงินทุนสำหรับธุรกิจใหม่ในไทย\n\nการหาแหล่งเงินทุนเป็นหนึ่งในความท้าทายสำคัญของการเริ่มต้นธุรกิจ`,
    cover_image_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    is_published: true,
    view_count: 1102,
    published_at: '2024-02-15T08:00:00Z',
    created_at: '2024-02-14T10:00:00Z',
    updated_at: '2024-02-15T08:00:00Z',
  },
  {
    id: '6',
    title: 'กองทุนน่าเชื่อถือ: วิธีคัดกรองกองทุนที่ดีก่อนลงทุน',
    slug: 'credible-investment-funds',
    excerpt: 'เรียนรู้วิธีการประเมินและคัดกรองกองทุนการลงทุนอย่างรอบคอบเพื่อลดความเสี่ยงและเพิ่มโอกาสในการได้รับผลตอบแทนที่ดี',
    content: `# กองทุนน่าเชื่อถือ: วิธีคัดกรองกองทุนที่ดีก่อนลงทุน\n\nการลงทุนในกองทุนต้องการการศึกษาข้อมูลอย่างละเอียดและรอบคอบ`,
    cover_image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    is_published: true,
    view_count: 834,
    published_at: '2024-02-20T08:00:00Z',
    created_at: '2024-02-19T10:00:00Z',
    updated_at: '2024-02-20T08:00:00Z',
  },
  {
    id: '7',
    title: 'การวิเคราะห์งบการเงินสำหรับนักลงทุนมือใหม่',
    slug: 'financial-statement-analysis',
    excerpt: 'เข้าใจงบการเงินพื้นฐานทั้ง 3 ส่วน ได้แก่ งบดุล งบกำไรขาดทุน และงบกระแสเงินสด เพื่อการตัดสินใจลงทุนที่ดียิ่งขึ้น',
    content: `# การวิเคราะห์งบการเงินสำหรับนักลงทุนมือใหม่\n\nงบการเงินคือกระจกสะท้อนสุขภาพทางการเงินของบริษัท`,
    cover_image_url: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80',
    is_published: true,
    view_count: 678,
    published_at: '2024-03-01T08:00:00Z',
    created_at: '2024-02-28T10:00:00Z',
    updated_at: '2024-03-01T08:00:00Z',
  },
  {
    id: '8',
    title: 'ESG Investing: การลงทุนที่คำนึงถึงสิ่งแวดล้อมและสังคม',
    slug: 'esg-investing-guide',
    excerpt: 'ทำความรู้จักกับ ESG Investing แนวทางการลงทุนที่กำลังได้รับความนิยมทั่วโลก ที่ไม่เพียงแต่สร้างผลตอบแทน แต่ยังดูแลโลกใบนี้ด้วย',
    content: `# ESG Investing: การลงทุนที่คำนึงถึงสิ่งแวดล้อมและสังคม\n\nESG ย่อมาจาก Environmental, Social, and Governance`,
    cover_image_url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    is_published: true,
    view_count: 912,
    published_at: '2024-03-10T08:00:00Z',
    created_at: '2024-03-09T10:00:00Z',
    updated_at: '2024-03-10T08:00:00Z',
  },
  {
    id: '9',
    title: 'Digital Transformation สำหรับธุรกิจดั้งเดิมในไทย',
    slug: 'digital-transformation-traditional-business',
    excerpt: 'แนวทางการนำเทคโนโลยีดิจิทัลมาปรับใช้กับธุรกิจดั้งเดิมเพื่อเพิ่มประสิทธิภาพ ลดต้นทุน และเข้าถึงลูกค้าได้มากขึ้น',
    content: `# Digital Transformation สำหรับธุรกิจดั้งเดิมในไทย\n\nการเปลี่ยนผ่านสู่ดิจิทัลไม่ใช่ทางเลือก แต่เป็นความจำเป็น`,
    cover_image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    is_published: true,
    view_count: 1456,
    published_at: '2024-03-15T08:00:00Z',
    created_at: '2024-03-14T10:00:00Z',
    updated_at: '2024-03-15T08:00:00Z',
  },
  {
    id: '10',
    title: 'การวางแผนเกษียณอายุ: เริ่มต้นตั้งแต่อายุ 30',
    slug: 'retirement-planning-age-30',
    excerpt: 'ยิ่งเริ่มวางแผนเกษียณเร็วเท่าไหร่ ยิ่งมีอิสรภาพทางการเงินมากขึ้นเท่านั้น เรียนรู้วิธีเริ่มต้นวางแผนเกษียณอายุอย่างถูกต้อง',
    content: `# การวางแผนเกษียณอายุ: เริ่มต้นตั้งแต่อายุ 30\n\nพลังของดอกเบี้ยทบต้นคือเพื่อนที่ดีที่สุดของนักวางแผนเกษียณ`,
    cover_image_url: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&q=80',
    is_published: true,
    view_count: 2103,
    published_at: '2024-03-20T08:00:00Z',
    created_at: '2024-03-19T10:00:00Z',
    updated_at: '2024-03-20T08:00:00Z',
  },
]

export const MOCK_BLOG_IMAGES: Record<string, BlogImage[]> = {
  '1': [
    { id: 'img-1-1', blog_id: '1', image_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80', sort_order: 1 },
    { id: 'img-1-2', blog_id: '1', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', sort_order: 2 },
  ],
  '9': [
    { id: 'img-9-1', blog_id: '9', image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', sort_order: 1 },
    { id: 'img-9-2', blog_id: '9', image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', sort_order: 2 },
    { id: 'img-9-3', blog_id: '9', image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', sort_order: 3 },
  ],
}

export const MOCK_COMMENTS: Comment[] = [
  { id: 'c1', blog_id: '1', sender_name: 'สมชาย ใจดี', message: 'บทความดีมากครับ อ่านแล้วได้ความรู้เยอะเลย', status: 'approved', created_at: '2024-01-16T10:00:00Z' },
  { id: 'c2', blog_id: '1', sender_name: 'วิไล มีสุข', message: 'ขอบคุณสำหรับข้อมูลดีๆ ครับ จะนำไปปรับใช้กับธุรกิจของตัวเอง', status: 'approved', created_at: '2024-01-17T14:30:00Z' },
  { id: 'c3', blog_id: '1', sender_name: 'ประเสริฐ วงษ์สุวรรณ', message: 'อยากให้มีบทความแบบนี้อีกนะครับ มีประโยชน์มาก', status: 'approved', created_at: '2024-01-18T09:15:00Z' },
]

export const BLOGS_PER_PAGE = 10

import {
  type LucideIcon,
  Calculator,
  Briefcase,
  Wallet,
  Users,
  Rocket,
  ShieldCheck,
  BarChart3,
  Leaf,
  Laptop,
  PiggyBank,
} from 'lucide-react'

export type BlogCategory = {
  label: string
  sublabel: string
  icon: LucideIcon
}

export const BLOG_CATEGORY_MAP: Record<string, BlogCategory> = {
  'tax-management-for-sme':                  { label: 'การจัดการภาษี',  sublabel: 'Tax Planning',       icon: Calculator  },
  'business-plan-for-growth':                { label: 'แผนธุรกิจ',       sublabel: 'Growth Strategies',  icon: Briefcase   },
  'company-budget-management':               { label: 'งบประมาณบริษัท', sublabel: 'Book Keeping',        icon: Wallet      },
  'financial-consultation-guide':            { label: 'ที่ปรึกษาการเงิน', sublabel: 'Loan Management',   icon: Users       },
  'startup-funding-thailand':                { label: 'Startup Funding', sublabel: 'Growth Strategies',  icon: Rocket      },
  'credible-investment-funds':               { label: 'กองทุนน่าเชื่อถือ', sublabel: 'Audit & Assurance', icon: ShieldCheck },
  'financial-statement-analysis':            { label: 'งบการเงิน',       sublabel: 'Financial Analysis', icon: BarChart3   },
  'esg-investing-guide':                     { label: 'ESG Investing',   sublabel: 'Sustainable Finance', icon: Leaf       },
  'digital-transformation-traditional-business': { label: 'Digital Transformation', sublabel: 'Tech & Business', icon: Laptop },
  'retirement-planning-age-30':              { label: 'วางแผนเกษียณ',   sublabel: 'Retirement Planning', icon: PiggyBank  },
}

export const DEFAULT_CATEGORY: BlogCategory = {
  label: 'บทความ',
  sublabel: 'General',
  icon: Briefcase,
}

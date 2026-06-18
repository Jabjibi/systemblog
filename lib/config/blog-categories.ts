import {
  type LucideIcon,
  Brain,
  Cloud,
  Terminal,
  Code2,
  Globe,
  Server,
  Cpu,
  Database,
  ShieldCheck,
  Layers,
} from 'lucide-react'

export type BlogCategory = {
  label: string
  sublabel: string
  icon: LucideIcon
}

export const BLOG_CATEGORY_MAP: Record<string, BlogCategory> = {
  'intro-to-machine-learning':        { label: 'Machine Learning',    sublabel: 'AI & ML',           icon: Brain      },
  'getting-started-with-docker':      { label: 'Docker',              sublabel: 'Containers',        icon: Layers     },
  'kubernetes-for-beginners':         { label: 'Kubernetes',          sublabel: 'Orchestration',     icon: Server     },
  'cloud-computing-overview':         { label: 'Cloud Computing',     sublabel: 'Infrastructure',    icon: Cloud      },
  'devops-ci-cd-pipeline':            { label: 'CI/CD Pipeline',      sublabel: 'DevOps',            icon: Terminal   },
  'open-source-contribution-guide':   { label: 'Open Source',         sublabel: 'Community',         icon: Code2      },
  'web-development-best-practices':   { label: 'Web Development',     sublabel: 'Frontend & Backend', icon: Globe     },
  'database-design-patterns':         { label: 'Database Design',     sublabel: 'Data Engineering',  icon: Database   },
  'cybersecurity-fundamentals':       { label: 'Cybersecurity',       sublabel: 'Security',          icon: ShieldCheck},
  'ai-hardware-and-gpus':             { label: 'AI Hardware',         sublabel: 'GPU & Compute',     icon: Cpu        },
}

export const DEFAULT_CATEGORY: BlogCategory = {
  label: 'บทความ',
  sublabel: 'Technology',
  icon: Code2,
}

@AGENTS.md
@CONTEXT.md

# Code Organization Rules

## Hooks Separation

UI components must not contain hook logic directly. All hooks must live in `lib/hooks/`.

**Hooks that must be extracted to `lib/hooks/`:**

React built-in:
`useState`, `useEffect`, `useContext`, `useReducer`, `useCallback`, `useMemo`, `useRef`, `useImperativeHandle`, `useLayoutEffect`, `useDebugValue`, `useDeferredValue`, `useTransition`, `useId`, `useSyncExternalStore`, `useInsertionEffect`

Next.js:
`useRouter`, `usePathname`, `useSearchParams`, `useParams`, `useSelectedLayoutSegment`, `useSelectedLayoutSegments`, `useReportWebVitals`

**Pattern:**

```tsx
// lib/hooks/use-comment-form.ts  ← logic here
export function useCommentForm() {
  const [value, setValue] = useState('')
  // all logic...
  return { value, submit, errors }
}

// components/blog/comment-form.tsx  ← JSX only
export function CommentForm() {
  const { value, submit, errors } = useCommentForm()
  return <form onSubmit={submit}>...</form>
}
```

## UI Libraries

This project uses **shadcn/ui** for components and **lucide-react** for icons.

**Do NOT install or use either library until explicitly told to do so.**

Once authorized, import as:
```tsx
import { Button } from '@/components/ui/button'  // shadcn
import { Search } from 'lucide-react'             // lucide
```

## Reusable Components

UI elements that appear more than once must be extracted into a shared component under `components/`. Never duplicate or inline the same UI in multiple pages.

**Structure:**
```
components/
├── blog/        ← blog-specific components (BlogCard, BlogPagination, ...)
├── admin/       ← admin-specific components (CommentRow, BlogTable, ...)
└── ui/          ← generic/shared primitives (Button, Input, Badge, ...)
```

**Pattern:**

```tsx
// components/blog/blog-card.tsx  ← defined once
export function BlogCard({ title, excerpt, coverImageUrl, publishedAt }: BlogCardProps) {
  return <article>...</article>
}

// app/(public)/page.tsx  ← reused, never re-implemented
import { BlogCard } from '@/components/blog/blog-card'

blogs.map(blog => <BlogCard key={blog.id} {...blog} />)
```

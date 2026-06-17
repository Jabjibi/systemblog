import ReactMarkdown from 'react-markdown'

type Props = {
  content: string
}

export function BlogContent({ content }: Props) {
  return (
    <div className="prose prose-neutral max-w-none">
      <ReactMarkdown
        components={{
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt ?? ''}
              className="rounded-lg w-full object-cover my-4"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

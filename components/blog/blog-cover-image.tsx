import Image from 'next/image'

type Props = {
  src: string
  alt: string
}

export function BlogCoverImage({ src, alt }: Props) {
  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 768px"
      />
    </div>
  )
}

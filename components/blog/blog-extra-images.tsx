import Image from 'next/image'

type BlogImage = {
  id: string
  image_url: string
  sort_order: number
}

type Props = {
  images: BlogImage[]
}

export function BlogExtraImages({ images }: Props) {
  if (images.length === 0) return null

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">รูปภาพประกอบเพิ่มเติม</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img) => (
          <div key={img.id} className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={img.image_url}
              alt={`รูปประกอบ ${img.sort_order}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

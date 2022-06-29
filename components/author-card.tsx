import Image from 'next/image';
import { Typography } from '@material-tailwind/react';

interface AuthorProps {
  author: {
    name: string
    email: string
    avatar: {
      url: string
      alternativeText: string
    }
  }
}

export default function AuthorCard({ author }: AuthorProps) {
  return (
    <div className="flex justify-center items-center gap-4">
      <Image
        src={author.avatar.url}
        alt={author.avatar.alternativeText}
        layout="intrinsic"
        width="80"
        height="80"
        objectFit="cover"
        className="rounded-full"
      />
      <Typography as="p" className="text-center font-normal">
        <b>{author.name}</b> - {author.email}
      </Typography>
    </div>
  )
}

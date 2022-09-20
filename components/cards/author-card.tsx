import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { Author } from 'additional';

interface AuthorCardProps {
  author: Partial<Author>
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="flex justify-center items-center gap-4">
      {author.avatar?.url &&
        <Image
          src={author.avatar.url}
          alt={author.avatar.alternativeText}
          layout="intrinsic"
          width={80}
          height={80}
          objectFit="cover"
          className="rounded-full"
        />
      }
      <Typography align="center">
        <b>{author.firstName} {author.lastName}</b> - {author.email}
      </Typography>
    </div>
  )
}

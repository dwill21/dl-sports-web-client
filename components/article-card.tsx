import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { Article } from 'additional';
import { useRouter } from 'next/router';

type ArticleCardProps = {
  article: Partial<Article>;
  size?: "lg" | "md" | "sm";
  className?: string;
}

const ArticleCard = ({ article, size = "md", className }: ArticleCardProps) => {
  const router = useRouter();
  if (!article) {
    return null;
  }

  return (
    <Card
      className={`cursor-pointer rounded-none ${className}`}
      onClick={() => router.push(`/article/${article.slug}`)}
    >
      <CardHeader shadow={false} floated={false} className="!m-0 w-full h-full rounded-none">
        {article.cover?.url &&
          <Image
            src={article.cover.url}
            priority={true}
            alt={article.cover.alternativeText}
            layout="fill"
            objectFit="cover"
          />
        }
      </CardHeader>
      <CardBody className="p-2">
        <Typography as="h4" variant={size == 'sm' ? 'paragraph' : 'lead'} className="my-2 leading-5">
          {article.title}
        </Typography>
      </CardBody>
    </Card>
  )
}

export default ArticleCard

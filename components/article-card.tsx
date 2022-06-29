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
      className={`cursor-pointer ${className}`}
      onClick={() => router.push(`/article/${article.slug}`)}
    >
      <CardHeader shadow={false} floated={false} className="!m-0 w-full h-full">
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
      <CardBody className={size == 'lg' ? '' : 'p-2'}>
        <Typography as="h4" variant={size == 'sm' ? 'small' : 'lead'} className="mb-2">
          {article.title}
        </Typography>
      </CardBody>
    </Card>
  )
}

export default ArticleCard

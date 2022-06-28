import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { ArticlePreview } from 'additional';

type ArticleCardProps = {
  article: ArticlePreview;
  size?: "lg" | "md" | "sm";
  className?: string;
}

const ArticleCard = ({ article, size = "md", className }: ArticleCardProps) => {
  if (!article) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader shadow={false} floated={false} className="!m-0 w-full h-full">
        <Image
          src={article.cover.url}
          priority={true}
          alt={article.cover.alternativeText}
          layout="fill"
          objectFit="cover"
        />
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

import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { ArticlePreview } from 'additional';

type ArticleCardProps = ArticlePreview & {
  size?: "lg" | "sm";
  className?: string;
}

const ArticleCard = ({ title, size = "sm", className, cover }: ArticleCardProps) => {
  return (
    <Card className={className}>
      <CardHeader shadow={false} floated={false} className="!m-0 w-full h-full">
        <Image
          src={cover.url}
          priority={true}
          alt={cover.alternativeText}
          layout="fill"
          objectFit="cover"
        />
      </CardHeader>
      <CardBody className={size == "sm" ? "p-2" : ""}>
        <Typography as="h4" variant="lead" className="mb-2">
          {title}
        </Typography>
      </CardBody>
    </Card>
  )
}

export default ArticleCard

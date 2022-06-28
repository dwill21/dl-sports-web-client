import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import Image from 'next/image';

interface ArticleCardProps {
  title: string;
  coverImage: {
    url: string;
    alt: string;
  }
  size?: "lg" | "sm";
  className?: string;
}

const ArticleCard = ({ title, size = "sm", className, coverImage }: ArticleCardProps) => {
  return (
    <Card className={className}>
      <CardHeader shadow={false} floated={false} className="!m-0 w-full h-full">
        <Image
          src={coverImage.url}
          priority={true}
          alt={coverImage.alt}
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

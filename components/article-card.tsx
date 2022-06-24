import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';

interface ArticleCardProps {
  title: string;
  size: "lg" | "sm";
  className: string;
}

const ArticleCard = ({ title, size, className }: ArticleCardProps) => {
  return (
    <Card className={className}>
      <CardHeader color="blue" shadow={false} floated={false} className="!m-0 w-full h-full">
        <div className="w-full h-full"></div>
      </CardHeader>
      <CardBody className={size == "sm" ? "p-2" : ""}>
        <Typography as="h5" variant={size == "sm" ? "small" : "h5"} className="mb-2">
          {title}
        </Typography>
      </CardBody>
    </Card>
  )
}

export default ArticleCard

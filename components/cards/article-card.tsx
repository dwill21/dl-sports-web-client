import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Article } from 'additional';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ArticleCardProps {
  article: Partial<Article> | null
  imageHeight: number
  imageWidth: number
  smallText?: boolean
  noDescription?: boolean
}

export default function ArticleCard({ article, imageHeight=250, imageWidth=300, smallText=false, noDescription=false }: ArticleCardProps) {
  const router = useRouter();
  if (!article) {
    return null;
  }

  const titleProps: Partial<TypographyProps> = smallText ? {
    lineHeight: 1.3,
    className: '!font-normal'
  } : { variant: 'h5' };
  const descriptionProps: Partial<TypographyProps> = smallText ? {
    variant: 'body2',
    fontWeight: '300',
    className: 'line-clamp-2 xl:line-clamp-3'
  } : {};

  return (
    <Card onClick={() => router.push(`/article/${article.slug}`)} sx={{ height: '100%' }}>
      <CardActionArea disableRipple sx={{ height: '100%' }}>
        <Stack direction="column" height="100%">
          <Image
            src={article.cover?.url ?? ""}
            alt={article.cover?.alternativeText}
            priority={true}
            height={imageHeight}
            width={imageWidth}
            layout="responsive"
            objectFit="cover"
          />

          <CardContent>
            <Typography {...titleProps}>
              {article.title}
            </Typography>
            {!noDescription && (
              <Typography mt={1} {...descriptionProps}>
                {article.description}
              </Typography>
            )}
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  )
}

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Article } from 'additional';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ArticleCardProps {
  article: Partial<Article> | null
  cmsUrl: string
  height: number
  smallText?: boolean
  noDescription?: boolean
}

export default function ArticleCard({ article, cmsUrl, height, smallText=false, noDescription=false }: ArticleCardProps) {
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
    <Card onClick={() => router.push(`/article/${article.slug}`)}>
      <CardActionArea disableRipple>
        <Box height={0.6 * height} position="relative">
          {article.cover?.url && (
            <Image
              src={`${cmsUrl}${article.cover.url}`}
              alt={article.cover.alternativeText}
              priority={true}
              layout="fill"
              objectFit="cover"
            />
          )}
        </Box>

        <Box height={0.4 * height}>
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
        </Box>
      </CardActionArea>
    </Card>
  )
}

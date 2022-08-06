import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

interface TopicCardProps {
  children: ReactNode
  title: string
  disableListIndent?: boolean
  cardActions?: ReactNode
}

export default function TopicCard({ children, title, disableListIndent = false, cardActions }: TopicCardProps) {
  return (
    <Card className="h-full">
      <CardContent>
        <Typography variant="h6" component="h3" align="center" className="mb-2">
          {title}
        </Typography>
        <Typography component="div" sx={disableListIndent ? {} : {
          'ul': {
            listStyleType: 'disc',
          },
          'ul, ol': {
            pl: 3,
            pt: 1,
          },
          a: {
            textDecorationLine: 'underline',
          }
        }}>
          {children}
        </Typography>
      </CardContent>

      {cardActions && (
        <CardActions sx={{ justifyContent: 'center', mt: -1, mb: 1 }}>
          {cardActions}
        </CardActions>
      )}
    </Card>
  )
}

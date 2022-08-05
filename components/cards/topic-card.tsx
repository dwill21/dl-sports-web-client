import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

interface TopicCardProps {
  children: ReactNode
  title: string
  disableListIndent?: boolean
}

export default function TopicCard({ children, title, disableListIndent = false }: TopicCardProps) {
  return (
    <Paper className="p-2 h-full">
      <Typography variant="h6" component="h3" align="center" className="mb-2">
        {title}
      </Typography>
      <Typography component="div" sx={disableListIndent ? {} : {
        'ul': {
          listStyleType: 'disc',
        },
        'ul, ol': {
          pl: 4,
          pt: 1,
        },
        a: {
          textDecorationLine: 'underline',
        }
      }}>
        {children}
      </Typography>
    </Paper>
  )
}

import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface TypographyLinkProps {
  href: string
  children: ReactNode
}
type TypographyProps = {
  [key: string]: string | number
}

export default function TypographyLink({ href, children, ...typographyProps }: TypographyLinkProps & TypographyProps) {
  return (
    <Link href={href} passHref>
      <Typography component="a" {...typographyProps}>
        {children}
      </Typography>
    </Link>
  )
}

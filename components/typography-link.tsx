import { ReactNode } from 'react';
import { Typography } from '@material-tailwind/react';
import Link from 'next/link';

interface NavbarMenuLinkProps {
  href: string
  children: ReactNode
}
type TypographyProps = {
  [key: string]: string | number
}

export default function TypographyLink({ href, children, ...typographyProps }: NavbarMenuLinkProps & TypographyProps) {
  return (
    <Link href={href} passHref>
      <Typography as="a" {...typographyProps}>
        {children}
      </Typography>
    </Link>
  )
}

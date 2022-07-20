import { ReactNode } from 'react';
import { Typography } from '@material-tailwind/react';
import Link from 'next/link';

interface NavbarMenuLinkProps {
  href: string
  children: ReactNode
  variant?: string
  className?: string
}

export default function NavbarLink({ href, children, variant="paragraph", className="p-1 font-normal" }: NavbarMenuLinkProps) {
  return (
    <Link href={href} passHref>
      <Typography as="a" variant={variant} className={className}>
        {children}
      </Typography>
    </Link>
  )
}

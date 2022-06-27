import { ReactNode } from 'react';
import { Typography } from '@material-tailwind/react';

export default function NavbarMenuLink({ href, children }: { href: string, children: ReactNode }) {
  return (
    <Typography as="a" href={href} variant="paragraph" className="p-1 font-normal">
      {children}
    </Typography>
  )
}

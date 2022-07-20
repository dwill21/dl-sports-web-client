import { MenuHandler, Typography } from '@material-tailwind/react';
import { ReactNode } from 'react';

export default function DropdownMenuButton({ children }: { children: ReactNode }) {
  return (
    <MenuHandler>
      <Typography as="button" variant="paragraph" className="p-1 font-normal flex items-center">
        {children}
      </Typography>
    </MenuHandler>
  )
}

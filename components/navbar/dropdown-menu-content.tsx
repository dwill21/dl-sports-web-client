import { MenuItem, MenuList } from '@material-tailwind/react';
import TypographyLink from 'components/typography-link';
import { ReactNode } from 'react';

interface DropdownMenuProps {
  items: {
    name: string
    href: string
  }[]
  children?: ReactNode
}

export default function DropdownMenuContent({ items, children }: DropdownMenuProps) {
  return (
    <MenuList>
      {children}
      {items.map((item) => (
        <MenuItem key={item.name}>
          <TypographyLink href={item.href} className="p-1 font-normal">
            {item.name}
          </TypographyLink>
        </MenuItem>
      ))}
    </MenuList>
  )
}

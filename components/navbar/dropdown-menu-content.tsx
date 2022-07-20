import { MenuItem, MenuList } from '@material-tailwind/react';
import NavbarLink from 'components/navbar/navbar-link';
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
          <NavbarLink href={item.href}>
            {item.name}
          </NavbarLink>
        </MenuItem>
      ))}
    </MenuList>
  )
}

import { Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { IoMdArrowDropdown } from 'react-icons/io';
import NavbarMenuLink from 'components/navbar-menu-link';
import { NavbarMenuProps } from 'additional';

export default function FullNavbarMenu({ sports, navItems }: NavbarMenuProps) {
  return (
    <>
      <Menu>
        <MenuHandler>
          <Typography as="button" variant="paragraph" className="p-1 font-normal flex items-center">
            Articles&nbsp;<IoMdArrowDropdown />
          </Typography>
        </MenuHandler>
        <MenuList>
          {sports?.map(sport => (
            <MenuItem key={sport.slug}>
              <NavbarMenuLink href={"/sport/" + sport.slug}>
                {sport.name}
              </NavbarMenuLink>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {navItems}
    </>
  )
}

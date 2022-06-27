import { Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { IoMdArrowDropleft, IoMdMenu } from 'react-icons/io';
import { NavbarMenuProps } from '../additional';
import NavbarMenuLink from './navbar-menu-link';

export default function CondensedNavbarMenu({ sports, navItems }: NavbarMenuProps) {
  return (
    <Menu>
      <MenuHandler>
        <button>
          <IoMdMenu size="2.25rem"/>
        </button>
      </MenuHandler>
      <MenuList>
        <Menu placement="left-start" offset={10}>
          <MenuHandler>
            <Typography as="button" variant="paragraph" className="p-1 font-normal flex items-center">
              <IoMdArrowDropleft size="1.25rem"/>&nbsp;Articles
            </Typography>
          </MenuHandler>
          <MenuList>
            {sports.map(sport => (
              <MenuItem key={sport.slug}>
                <NavbarMenuLink href={"/" + sport.slug}>
                  {sport.name}
                </NavbarMenuLink>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        {navItems.map((navItem, index) => (
          <MenuItem key={index}>{navItem}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

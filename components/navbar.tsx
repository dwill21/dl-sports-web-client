import { Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from '@material-tailwind/react';
import { IoMdArrowDropdown, IoMdMenu, IoMdArrowDropleft } from 'react-icons/io';
import { ReactNode, useEffect, useState } from 'react';

const MenuLink = ({ href, children }: { href: string, children: ReactNode }) => {
  return (
    <Typography as="a" href={href} variant="paragraph" className="p-1 font-normal">
      {children}
    </Typography>
  )
}

const navItems = [
  (
    <MenuLink key="Columns" href="/">
      Columns
    </MenuLink>
  ),
  (
    <MenuLink key="On the DL" href="/podcast">
      &quot;On the DL&quot;
    </MenuLink>
  ),
  (
    <MenuLink key="Contact" href="/">
      Contact
    </MenuLink>
  ),
]

const CondensedMenu = () => {
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
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </MenuList>
        </Menu>
        {navItems.map((navItem, index) => (
          <MenuItem key={index}>{navItem}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

const ExpandedMenu = () => {
  return (
    <>
      <Menu>
        <MenuHandler>
          <Typography as="button" variant="paragraph" className="p-1 font-normal flex items-center">
            Articles&nbsp;<IoMdArrowDropdown />
          </Typography>
        </MenuHandler>
        <MenuList>
          <MenuItem>Foo</MenuItem>
          <MenuItem>Bar</MenuItem>
          <MenuItem>Baz</MenuItem>
        </MenuList>
      </Menu>
      {navItems}
    </>
  )
}

const getWindowWidth = () => {
  return window.innerWidth;
}

export default function AppNavbar() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(getWindowWidth());
    }
    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  });

  return (
    <Navbar fullWidth={true}>
      <div className="mx-auto container flex items-center justify-between text-grey-900">
        <Typography as="a" href="/" variant="h4" className="py-1.5 font-normal">
          DL Sports
        </Typography>

        {windowWidth >= 1024 ? <ExpandedMenu /> : <CondensedMenu />}
      </div>
    </Navbar>
  );
}

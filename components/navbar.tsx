import { Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from '@material-tailwind/react';
import { IoMdArrowDropdown, IoMdMenu, IoMdArrowDropleft } from 'react-icons/io';
import { useEffect, useState } from 'react';

const getWindowWidth = () => {
  return window.innerWidth;
}

const CondensedMenu = () => {
  return (
    <Menu>
      <MenuHandler>
        <button>
          <IoMdMenu size="2rem"/>
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
        <Typography as="a" href="/" variant="paragraph" className="p-1 font-normal flex items-center">
          Columns
        </Typography>
        <Typography as="a" href="/" variant="paragraph" className="p-1 font-normal flex items-center">
          &quot;On the DL&quot;
        </Typography>
        <Typography as="a" href="/" variant="paragraph" className="p-1 font-normal flex items-center">
          Contact
        </Typography>
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
      <Typography as="a" href="/" variant="paragraph" className="p-1 font-normal flex items-center">
        Columns
      </Typography>
      <Typography as="a" href="/" variant="paragraph" className="p-1 font-normal flex items-center">
        &quot;On the DL&quot;
      </Typography>
      <Typography as="a" href="/" variant="paragraph" className="p-1 font-normal flex items-center">
        Contact
      </Typography>
    </>
  )
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

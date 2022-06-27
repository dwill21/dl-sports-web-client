import { Navbar, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import NavbarMenuLink from './navbar-menu-link';
import FullNavbarMenu from './full-navbar-menu';
import CondensedNavbarMenu from './condensed-navbar-menu';

const navItems = [
  (
    <NavbarMenuLink key="Columns" href="/">
      Columns
    </NavbarMenuLink>
  ),
  (
    <NavbarMenuLink key="On the DL" href="/podcast">
      &quot;On the DL&quot;
    </NavbarMenuLink>
  ),
  (
    <NavbarMenuLink key="Contact" href="/">
      Contact
    </NavbarMenuLink>
  ),
]
const sports = [
  {
    name: "MLB",
    slug: "mlb",
  }
]
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

        {windowWidth >= 1024
          ? <FullNavbarMenu sports={sports} navItems={navItems}/>
          : <CondensedNavbarMenu sports={sports} navItems={navItems}/>}
      </div>
    </Navbar>
  );
}

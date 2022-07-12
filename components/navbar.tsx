import { Navbar } from '@material-tailwind/react';
import { useEffect, useMemo, useState } from 'react';
import NavbarMenuLink from 'components/navbar-menu-link';
import FullNavbarMenu from 'components/full-navbar-menu';
import CondensedNavbarMenu from 'components/condensed-navbar-menu';
import { NavbarProps } from 'additional';
import debounce from 'lodash.debounce';

const navItems = [
  (
    <NavbarMenuLink key="Columns" href="/thorntons-thoughts">
      Columns
    </NavbarMenuLink>
  ),
  (
    <NavbarMenuLink key="On the DL" href="/podcast">
      &quot;On the DL&quot;
    </NavbarMenuLink>
  ),
  (
    <NavbarMenuLink key="Contact" href="/contact">
      Contact
    </NavbarMenuLink>
  ),
]

export default function AppNavbar({ sports }: NavbarProps) {
  const [smallScreen, setSmallScreen] = useState<boolean | null>(null);
  const handleWindowResize = () => setSmallScreen(window.innerWidth < 768);
  const debouncedResizeHandler = useMemo(() => debounce(handleWindowResize, 300), []);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', debouncedResizeHandler as EventListener);
    return () => {
      debouncedResizeHandler.cancel();
      window.removeEventListener('resize', debouncedResizeHandler as EventListener);
    }
  }, [debouncedResizeHandler]);

  return (
    <Navbar fullWidth={true}>
      <div className="mx-auto container flex items-center justify-between text-grey-900">
        <NavbarMenuLink href="/" variant="h4" className="py-1.5 font-normal">
          DL Sports
        </NavbarMenuLink>

        {smallScreen !== null && (
          smallScreen
            ? <CondensedNavbarMenu sports={sports} navItems={navItems}/>
            : <FullNavbarMenu sports={sports} navItems={navItems}/>
        )}
      </div>
    </Navbar>
  );
}

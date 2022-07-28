import { IconButton, Navbar } from '@material-tailwind/react';
import { useEffect, useMemo, useState } from 'react';
import TypographyLink from 'components/typography-link';
import NavbarContent from 'components/navbar/navbar-content';
import { NavbarProps } from 'additional';
import debounce from 'lodash.debounce';
import { IoSearchSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';
import HamburgerMenu from 'components/navbar/hamburger-menu';

export default function AppNavbar({ sports }: NavbarProps) {
  const router = useRouter();
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
        <TypographyLink href="/" variant="h4" className="py-1.5 font-normal">
          DL Sports
        </TypographyLink>

        {smallScreen !== null && (smallScreen ?
          <div className="flex items-center">
            <HamburgerMenu sports={sports}/>
            <IconButton variant="text" onClick={() => router.push('/search')}>
              <IoSearchSharp size={24} className="cursor-pointer text-black"/>
            </IconButton>
          </div>
          : <NavbarContent sports={sports}/>
        )}
      </div>
    </Navbar>
  );
}

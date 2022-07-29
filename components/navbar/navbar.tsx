import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import TypographyLink from 'components/typography-link';
import NavbarContent from 'components/navbar/navbar-content';
import { NavbarProps } from 'additional';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import HamburgerMenu from 'components/navbar/hamburger-menu';
import { useSmallScreen } from 'utils/hooks/use-small-screen';

export default function AppNavbar({ sports }: NavbarProps) {
  const router = useRouter();
  const isSmallScreen = useSmallScreen();

  return (
    <AppBar position="static" className="w-screen">
      <Toolbar className="flex items-center md:gap-4">
        <TypographyLink href="/" variant="h4" className="py-1.5 font-normal">
          DL Sports
        </TypographyLink>

        {isSmallScreen !== null && (isSmallScreen ?
          <>
            <span className="flex-grow"></span>
            <HamburgerMenu sports={sports}/>
            <IconButton aria-label="search" onClick={() => router.push('/search')}>
              <SearchIcon fontSize="large" className="text-black"/>
            </IconButton>
          </>
          : <NavbarContent sports={sports}/>
        )}
      </Toolbar>
    </AppBar>
  );
}

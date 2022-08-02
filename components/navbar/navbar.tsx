import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import NavbarContent from 'components/navbar/navbar-content';
import { NavbarProps } from 'additional';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import HamburgerMenu from 'components/navbar/hamburger-menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import logo from 'public/logo.png';
import Link from 'next/link';

export default function AppNavbar({ sports }: NavbarProps) {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppBar position="static" className="w-screen">
      <Toolbar className="flex items-center md:gap-4">
        <Link href="/">
          <a className="flex">
            <Image src={logo} alt="DL Sports logo" height={50} width={195}/>
          </a>
        </Link>

        {matches ?
          <NavbarContent sports={sports}/> :
          <>
            <span className="flex-grow"></span>
            <HamburgerMenu sports={sports}/>
            <IconButton aria-label="search" onClick={() => router.push('/search')}>
              <SearchIcon fontSize="large" className="text-black"/>
            </IconButton>
          </>
        }
      </Toolbar>
    </AppBar>
  );
}

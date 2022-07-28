import { IconButton, Navbar } from '@material-tailwind/react';
import TypographyLink from 'components/typography-link';
import NavbarContent from 'components/navbar/navbar-content';
import { NavbarProps } from 'additional';
import { IoSearchSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';
import HamburgerMenu from 'components/navbar/hamburger-menu';
import { useSmallScreen } from 'utils/hooks/use-small-screen';

const navLinks = [
  {
    name: "Columns",
    href: "/thorntons-thoughts",
  },
  {
    name: "On the DL",
    href: "/podcast",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function AppNavbar({ sports }: NavbarProps) {
  const router = useRouter();
  const isSmallScreen = useSmallScreen();

  return (
    <Navbar fullWidth={true}>
      <div className="mx-auto container flex items-center justify-between text-grey-900">
        <TypographyLink href="/" variant="h4" className="py-1.5 font-normal">
          DL Sports
        </TypographyLink>

        {isSmallScreen !== null && (isSmallScreen ?
          <div className="flex items-center">
            <HamburgerMenu sports={sports} navItems={navLinks}/>
            <IconButton variant="text" onClick={() => router.push('/search')}>
              <IoSearchSharp size={24} className="cursor-pointer text-black"/>
            </IconButton>
          </div>
          : <NavbarContent sports={sports} navItems={navLinks}/>
        )}
      </div>
    </Navbar>
  );
}

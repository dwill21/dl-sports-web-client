import { Menu, MenuHandler, Navbar } from '@material-tailwind/react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import TypographyLink from 'components/typography-link';
import SearchBarTransition from 'components/search/search-bar-transition';
import { NavbarProps } from 'additional';
import debounce from 'lodash.debounce';
import DropdownMenuButton from 'components/navbar/dropdown-menu-button';
import DropdownMenuContent from 'components/navbar/dropdown-menu-content';
import { IoMdArrowDropdown, IoMdArrowDropleft, IoMdMenu } from 'react-icons/io';

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

  const ArticlesMenu = ({ menuProps, display }: { menuProps?: { [key: string]: string | number }, display: ReactNode }) => (
    <Menu {...menuProps}>
      <DropdownMenuButton>
        {display}
      </DropdownMenuButton>
      <DropdownMenuContent items={sports.map(sport => ({
        name: sport.name ?? "",
        href: `/sport/${sport.slug}`,
      }))}
      />
    </Menu>
  )

  const FullNavbar = () => (
    <SearchBarTransition>
      <ArticlesMenu display={<>Articles&nbsp;<IoMdArrowDropdown size={20} className="-ml-0.5"/></>}/>
      {navLinks.map(navLink => (
        <TypographyLink key={navLink.name} href={navLink.href} className="p-1 font-normal">
          {navLink.name}
        </TypographyLink>
      ))}
    </SearchBarTransition>
  );

  const HamburgerMenu = () => (
    <Menu>
      <MenuHandler>
        <button>
          <IoMdMenu size={36}/>
        </button>
      </MenuHandler>

      <DropdownMenuContent items={navLinks}>
        <ArticlesMenu
          menuProps={{ placement: "left-start", offset: 10 }}
          display={<><IoMdArrowDropleft size={20} className="ml-[5px] -mr-1"/>&nbsp;Articles</>}
        />
      </DropdownMenuContent>
    </Menu>
  )

  return (
    <Navbar fullWidth={true}>
      <div className="mx-auto container flex items-center justify-between text-grey-900">
        <TypographyLink href="/" variant="h4" className="py-1.5 font-normal">
          DL Sports
        </TypographyLink>

        {smallScreen !== null && (
          smallScreen
            ? <HamburgerMenu />
            : <FullNavbar />
        )}
      </div>
    </Navbar>
  );
}

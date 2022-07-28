import SearchBar from 'components/search-bar';
import { useCallback, useMemo, useState } from 'react';
import { IoCloseSharp, IoSearchSharp } from 'react-icons/io5';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { IoMdArrowDropdown } from 'react-icons/io';
import TypographyLink from 'components/typography-link';
import { NavItem, Sport } from 'additional';

export default function NavbarContent({ sports, navItems }: { sports: Partial<Sport>[], navItems: NavItem[] }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const openSearchBar = useCallback(() => setShowSearchBar(true), [setShowSearchBar]);
  const closeSearchBar = useCallback(() => setShowSearchBar(false), [setShowSearchBar]);

  const searchOverlay = useMemo(() => (
    <div className="flex items-center w-3/4 relative -right-3">
      <IconButton variant="text" color="grey" onClick={closeSearchBar}>
        <IoCloseSharp size={24} className="cursor-pointer"/>
      </IconButton>
      <SearchBar autoFocus={true}/>
    </div>
  ), [closeSearchBar])

  const navContent = useMemo(() => (
    <div className="flex justify-between items-center md:basis-3/4 lg:basis-[80%] xl:basis-5/6">
      <Menu>
        <MenuHandler>
          <Typography as="button" variant="paragraph" className="p-1 font-normal flex items-center">
            Articles&nbsp;<IoMdArrowDropdown size={20} className="-ml-0.5"/>
          </Typography>
        </MenuHandler>

        <MenuList>
          {sports.map((sport) => (
            <MenuItem key={sport.name}>
              <TypographyLink href={`/sport/${sport.slug}`} className="p-1 font-normal">
                {sport.name ?? ""}
              </TypographyLink>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {navItems.map((item) => (
        <TypographyLink key={item.name} href={item.href} className="p-1 font-normal">
          {item.name}
        </TypographyLink>
      ))}

      <IoSearchSharp className="cursor-pointer" size={20} onClick={openSearchBar}/>
    </div>
  ), [sports, openSearchBar])

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={showSearchBar ? 'menu' : 'search-bar'} timeout={200} classNames="search-bar">
        {showSearchBar ? searchOverlay : navContent}
      </CSSTransition>
    </SwitchTransition>
  )
}

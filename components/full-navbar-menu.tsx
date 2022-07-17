import { Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { IoMdArrowDropdown } from 'react-icons/io';
import NavbarMenuLink from 'components/navbar-menu-link';
import { NavbarMenuProps } from 'additional';
import SearchBar from 'components/search-bar';
import { useCallback, useMemo, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export default function FullNavbarMenu({ sports, navItems }: NavbarMenuProps) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const openSearchBar = useCallback(() => setShowSearchBar(true), [setShowSearchBar]);
  const closeSearchBar = useCallback(() => setShowSearchBar(false), [setShowSearchBar]);

  const menu = useMemo(() => (
    <div className="flex justify-between items-center basis-5/6">
      <Menu>
        <MenuHandler>
          <Typography as="button" variant="paragraph" className="p-1 font-normal flex items-center">
            Articles&nbsp;<IoMdArrowDropdown />
          </Typography>
        </MenuHandler>
        <MenuList>
          {sports?.map(sport => (
            <MenuItem key={sport.slug}>
              <NavbarMenuLink href={"/sport/" + sport.slug}>
                {sport.name}
              </NavbarMenuLink>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {navItems}
      <IoSearchSharp className="cursor-pointer" size={20} onClick={openSearchBar}/>
    </div>
  ), [sports, navItems, openSearchBar])

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={showSearchBar ? 'menu' : 'search-bar'} timeout={200} classNames="search-bar">
        {showSearchBar ?
          <SearchBar closeHandler={closeSearchBar} className="w-full relative -right-3"/> :
          menu}
      </CSSTransition>
    </SwitchTransition>
  )
}

import SearchBar from 'components/search/search-bar';
import { ReactNode, useCallback, useState } from 'react';
import { IoCloseSharp, IoSearchSharp } from 'react-icons/io5';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { IconButton } from '@material-tailwind/react';

export default function SearchBarTransition({ children }: { children: ReactNode }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const openSearchBar = useCallback(() => setShowSearchBar(true), [setShowSearchBar]);
  const closeSearchBar = useCallback(() => setShowSearchBar(false), [setShowSearchBar]);

  const searchShown = (
    <div className="flex items-center w-3/4 relative -right-3">
      <IconButton variant="text" color="grey" onClick={closeSearchBar}>
        <IoCloseSharp size={24} className="cursor-pointer"/>
      </IconButton>
      <SearchBar autoFocus={true}/>
    </div>
  )

  const searchHidden = (
    <div className="flex justify-between items-center md:basis-3/4 lg:basis-[80%] xl:basis-5/6">
      {children}
      <IoSearchSharp className="cursor-pointer" size={20} onClick={openSearchBar}/>
    </div>
  )

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={showSearchBar ? 'menu' : 'search-bar'} timeout={200} classNames="search-bar">
        {showSearchBar ? searchShown : searchHidden}
      </CSSTransition>
    </SwitchTransition>
  )
}

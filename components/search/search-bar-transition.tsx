import SearchBar from 'components/search/search-bar';
import { ReactNode, useCallback, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export default function SearchBarTransition({ children }: { children: ReactNode }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const openSearchBar = useCallback(() => setShowSearchBar(true), [setShowSearchBar]);
  const closeSearchBar = useCallback(() => setShowSearchBar(false), [setShowSearchBar]);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={showSearchBar ? 'menu' : 'search-bar'} timeout={200} classNames="search-bar">
        {showSearchBar ?
          <SearchBar closeHandler={closeSearchBar} className="w-3/4 relative -right-3"/> :
          <div className="flex justify-between items-center md:basis-3/4 lg:basis-[80%] xl:basis-5/6">
            {children}
            <IoSearchSharp className="cursor-pointer" size={20} onClick={openSearchBar}/>
          </div>
        }
      </CSSTransition>
    </SwitchTransition>
  )
}

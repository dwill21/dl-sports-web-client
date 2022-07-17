import { IconButton, Input } from '@material-tailwind/react';
import { IoCloseSharp, IoSearchSharp } from 'react-icons/io5';

interface SearchBarProps {
  closeHandler: () => void
  className?: string
}

export default function SearchBar({ closeHandler, className }: SearchBarProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <IconButton variant="text" color="grey" onClick={closeHandler}>
        <IoCloseSharp size={24} className="cursor-pointer"/>
      </IconButton>
      <Input
        type="search"
        label="Search the archives"
        icon={<IoSearchSharp className="cursor-pointer"/>}
        autoFocus
      />
    </div>
  )
}

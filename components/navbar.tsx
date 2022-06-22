import { IoSearch } from "react-icons/io5";
import { IoMdArrowDropdown } from 'react-icons/io';

export default function Navbar() {
  return (
    <header className="w-screen px-10 py-4 flex justify-between items-center bg-neutral-800 text-neutral-50">
      <p className="text-3xl">DL Sports</p>
      <IoSearch size="1.25em"/>
      <p className="flex items-center">Articles <IoMdArrowDropdown/></p>
      <p>Columns</p>
      <p>&quot;On the DL&quot;</p>
      <p>Contact</p>
    </header>
  )
}

import { IoSearch } from "react-icons/io5";

export default function Navbar() {
  return (
    <header className="w-screen px-10 py-4 flex justify-between items-center bg-neutral-800 text-neutral-50">
      <h1 className="text-3xl">DL Sports</h1>
      <div className="text-lg flex items-center space-x-3">
        <IoSearch size="1.25em"/>
        <p>Podcasts</p>
        <p>Contact</p>
      </div>
    </header>
  )
}

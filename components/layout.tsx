import Navbar from "./navbar";
import Footer from "./footer";
import { ReactNode } from 'react';
import { NavbarProps } from 'additional';

type LayoutProps = {
  navbarProps: NavbarProps
  children: ReactNode
}

export default function Layout({ navbarProps, children }: LayoutProps) {
  return (
    <>
      <Navbar {...navbarProps}/>
      <main className="min-h-screen">{ children }</main>
      <Footer/>
    </>
  )
}

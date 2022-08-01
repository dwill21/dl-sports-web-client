import Navbar from "components/navbar/navbar";
import Footer from "components/footer";
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

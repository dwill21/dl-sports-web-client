import { Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from '@material-tailwind/react';
import { IoMdArrowDropdown } from 'react-icons/io';

export default function AppNavbar() {
  return (
    <Navbar fullWidth={true}>
      <div className="mx-auto container flex items-center justify-between text-grey-900">
        <Typography as="a" href="/" variant="h4" className="py-1.5 font-normal">
          DL Sports
        </Typography>

        <Menu>
          <MenuHandler>
            <Typography as="button" variant="paragraph" className="p-1 font-normal flex items-center">
              Articles&nbsp;<IoMdArrowDropdown />
            </Typography>
          </MenuHandler>
          <MenuList>
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </MenuList>
        </Menu>


        <Typography as="a" href="/" variant="paragraph" className="p-1 font-normal flex items-center">
          Columns
        </Typography>
        <Typography as="a" href="/" variant="paragraph" className="p-1 font-normal flex items-center">
          &quot;On the DL&quot;
        </Typography>
        <Typography as="a" href="/" variant="paragraph" className="p-1 font-normal flex items-center">
          Contact
        </Typography>
      </div>
    </Navbar>
  );
}

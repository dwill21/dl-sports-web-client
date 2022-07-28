import { Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { IoMdArrowDropleft, IoMdMenu } from 'react-icons/io';
import TypographyLink from 'components/typography-link';
import { Sport } from 'additional';

const navLinks = [
  {
    name: "Columns",
    href: "/thorntons-thoughts",
  },
  {
    name: "On the DL",
    href: "/podcast",
  },
  {
    name: "Contact",
    href: "/contact",
  },
]

export default function HamburgerMenu({ sports }: { sports: Partial<Sport>[] }) {
  return (
    <Menu>
      <MenuHandler>
        <button>
          <IoMdMenu size={36}/>
        </button>
      </MenuHandler>

      <MenuList>
        <Menu placement="left-start" offset={10}>
          <MenuHandler>
            <Typography as="button" variant="paragraph" className="p-1 font-normal flex items-center">
              <IoMdArrowDropleft size={20} className="ml-[5px] -mr-1"/>&nbsp;Articles
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

        {navLinks.map((link) => (
          <MenuItem key={link.name}>
            <TypographyLink href={link.href} className="p-1 font-normal">
              {link.name}
            </TypographyLink>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

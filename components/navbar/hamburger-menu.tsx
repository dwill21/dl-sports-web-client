import { Sport } from 'additional';
import { useNavLinks } from 'utils/hooks/use-nav-links';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Link from 'next/link';

const LinkButton = ({ text, href, divider = false, onClick }: { text: string, href: string, divider?: boolean, onClick?: () => void }) => (
  <Link href={href} passHref>
    <ListItemButton component="a" divider={divider} onClick={onClick}>
      <ListItemText>
        {text}
      </ListItemText>
    </ListItemButton>
  </Link>
)

export default function HamburgerMenu({ sports }: { sports: Partial<Sport>[] }) {
  const navLinks = useNavLinks();
  const [open, setOpen] = useState(false);

  const ArticlesList = () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <>
        <ListItemButton onClick={() => setExpanded(!expanded)} className="px-4">
          <ListItemText>Articles</ListItemText>
          {expanded ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List className="w-full py-0 pl-2">
            {sports.map((sport) => (
              <LinkButton
                key={sport.name}
                text={sport.name ?? ""}
                href={`/sport/${sport.slug}`}
                onClick={() => setOpen(false)}
              />
            ))}
          </List>
        </Collapse>
        <Divider/>
      </>
    )
  }

  return (
    <>
      <IconButton
        id="hamburger-button"
        aria-controls={open ? 'hamburger-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={() => setOpen(true)}
      >
        <MenuIcon fontSize="large" sx={{ color: "black" }}/>
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <List className="mt-2 min-w-[150px]">
          <ArticlesList/>
          {navLinks.map((link, index) => (
            <LinkButton
              key={link.name}
              text={link.name}
              href={link.href}
              divider={index !== navLinks.length-1}
              onClick={() => setOpen(false)}
            />
          ))}
        </List>
      </Drawer>
    </>
  )
}

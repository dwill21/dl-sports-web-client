import TypographyLink from 'components/typography-link';
import { Sport } from 'additional';
import { useNavLinks } from 'utils/hooks/use-nav-links';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

export default function HamburgerMenu({ sports }: { sports: Partial<Sport>[] }) {
  const navLinks = useNavLinks();
  const [open, setOpen] = useState(false);

  const ArticlesList = () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <>
        <ListItemButton onClick={() => setExpanded(!expanded)} className="px-6">
          <ListItemText>Articles</ListItemText>
          {expanded ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List className="w-full py-0 pl-4">
            {sports.map((sport) => (
              <ListItem key={sport.name}>
                <TypographyLink href={`/sport/${sport.slug}`} className="w-full">
                  {sport.name ?? ""}
                </TypographyLink>
              </ListItem>
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
        <MenuIcon fontSize="large" className="text-black"/>
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <List className="mt-2 min-w-[150px]">
          <ArticlesList/>
          {navLinks.map((link, index) => (
            <ListItem key={link.name} divider={index !== navLinks.length-1}>
              <TypographyLink href={link.href} className="px-2 w-full">
                {link.name}
              </TypographyLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

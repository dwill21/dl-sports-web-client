import SearchBar from 'components/search-bar';
import React, { useCallback } from 'react';
import TypographyLink from 'components/typography-link';
import { Sport } from 'additional';
import { useNavLinks } from 'utils/hooks/use-nav-links';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { InputBase } from 'formik-mui';

const ArticlesMenu = ({ sports }: { sports: Partial<Sport>[] }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <>
      <Typography
        id="articles-button"
        variant="body1"
        aria-controls={open ? 'articles-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        component={Button}
        endIcon={<ArrowDropDownIcon className="-ml-2"/>}
        className="text-white normal-case"
      >
        Articles
      </Typography>
      <Menu
        id="articles-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'articles-button' }}
      >
        {sports.map((sport) => (
          <MenuItem key={sport.name} onClick={handleClose} className="mx-2 p-0">
            <TypographyLink href={`/sport/${sport.slug}`} className="py-2 px-4 font-normal">
              {sport.name ?? ""}
            </TypographyLink>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

/**
 * Taken from https://mui.com/material-ui/react-app-bar/
 */
const TransitionInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '24ch',
      },
    },
  },
}));

export default function NavbarContent({ sports }: { sports: Partial<Sport>[] }) {
  const navLinks = useNavLinks();

  return (
    <>
      <ArticlesMenu sports={sports}/>
      {navLinks.map((link) => (
        <TypographyLink key={link.name} href={link.href} className="px-2">
          {link.name}
        </TypographyLink>
      ))}
      <span className="flex-grow"></span>
      <SearchBar component={TransitionInputBase}/>
    </>
  )
}

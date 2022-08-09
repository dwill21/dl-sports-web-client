import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useSocials } from 'utils/hooks/use-socials';

export default function Footer() {
  const socials = useSocials();

  return (
    <footer className="w-screen">
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem/>}
        spacing={{ xs: 3, md: 5 }}
        mb={2}
        justifyContent="center"
      >
        {socials.map(({ Icon, link }) => (
          <a key={link} href={link} target="_blank" rel="noopener noreferrer">
            <IconButton color="primary">
              <Icon/>
            </IconButton>
          </a>
        ))}
      </Stack>

      <Typography align="center" mt={1}>&copy;	{new Date().getFullYear()}</Typography>
    </footer>
  )
}

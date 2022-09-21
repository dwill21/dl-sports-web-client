import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useSocials } from 'utils/hooks/use-socials';
import Link from 'next/link';

export default function Footer() {
  const socials = useSocials();

  return (
    <footer className="w-screen">
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem/>}
        spacing={{ xs: 3, md: 5 }}
        mb={4}
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

      <Stack justifyContent="center" alignItems="center" my={2}>
        <Link href="/privacy-policy" passHref>
          <Typography component="a" sx={{ ':hover': {'text-decoration': 'underline'} }}>View privacy policy</Typography>
        </Link>
        <Typography>&copy;	{new Date().getFullYear()}</Typography>
      </Stack>
    </footer>
  )
}

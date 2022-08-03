import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <footer className="w-screen">
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem/>}
        spacing={{ xs: 3, md: 5 }}
        mb={2}
        justifyContent="center"
      >
        {[LinkedInIcon, InstagramIcon, TwitterIcon].map((SocialIcon, index) => (
          <IconButton key={index} color="primary">
            <SocialIcon/>
          </IconButton>
        ))}
      </Stack>

      <Typography align="center" mt={1}>&copy;	{new Date().getFullYear()}</Typography>
    </footer>
  )
}

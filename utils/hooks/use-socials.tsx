import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const socials = [
  {
    Icon: InstagramIcon,
    link: 'https://www.instagram.com/samcthornton',
  },
  {
    Icon: TwitterIcon,
    link: 'https://twitter.com/samcthornton',
  }
];

export const useSocials = () => {
  return socials;
}

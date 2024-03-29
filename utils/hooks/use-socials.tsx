import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const TikTokIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon{...props} viewBox="0 0 16 16">
      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
    </SvgIcon>
  )
}

const socials = [
  {
    Icon: InstagramIcon,
    link: 'https://www.instagram.com/dlsportscom',
  },
  {
    Icon: TwitterIcon,
    link: 'https://twitter.com/samcthornton',
  },
  {
    Icon: TikTokIcon,
    link: 'https://tiktok.com/@dlsportscom',
  }
];

export const useSocials = () => {
  return socials;
}

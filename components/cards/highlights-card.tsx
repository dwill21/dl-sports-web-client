import TopicCard from 'components/cards/topic-card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Highlight } from 'additional';
import Modal from 'components/modal';
import parse from 'html-react-parser';
import { useCallback, useState } from 'react';

interface HighlightsCardProps {
  highlights?: Partial<Highlight>[]
}

export default function HighlightsCard({ highlights }: HighlightsCardProps) {
  const [openHighlight, setOpenHighlight] = useState<Partial<Highlight> | undefined>(undefined);

  const handleClick = useCallback((highlight: Partial<Highlight>) => {
    return () => {
      setOpenHighlight(highlight);
    }
  }, [setOpenHighlight]);

  const handleClose = useCallback(() => {
    setOpenHighlight(undefined);
  }, [setOpenHighlight]);

  if (!highlights) {
    return null;
  }

  return (
    <>
      <TopicCard title="Highlights" disableListIndent>
        <List>
          {highlights.map(highlight => (
            <ListItem key={highlight.title} disableGutters divider>
              <ListItemButton onClick={handleClick(highlight)}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Image
                    src={highlight.thumbnailUrl ?? ''}
                    alt={`thumbnail: ${highlight.title}`}
                    height={90}
                    width={120}
                  />
                  <Typography>
                    {highlight.title}
                  </Typography>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </TopicCard>

      <Modal
        open={!!openHighlight}
        title={openHighlight?.title ?? ""}
        onClose={handleClose}
        contentSx={{ width: { xs: 300, md: 500, lg: 800 } }}
      >
        {parse(openHighlight?.content ?? "")}
      </Modal>
    </>
  )
}

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

interface HighlightDialogProps {
  open: boolean
  onClose: () => void
  title: string
}

export default function HighlightDialog({ open, onClose, title } : HighlightDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ position: 'relative' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">
            {title}
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon/>
          </IconButton>
        </Stack>

        <iframe
          width="560" height="315" src="https://www.youtube.com/embed/7FX1dHisscA" title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        >
        </iframe>
      </DialogContent>
    </Dialog>
  )
}

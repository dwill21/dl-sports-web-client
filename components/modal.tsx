import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';
import { SxProps } from '@mui/system/styleFunctionSx';

interface ModalProps {
  children: ReactNode
  open: boolean
  onClose: () => void
  title: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
  contentSx?: SxProps;
}

export default function Modal({ children, open, onClose, title, maxWidth = false, contentSx } : ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title" maxWidth={maxWidth}>
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center" id="dialog-title">
        {title}
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon/>
        </IconButton>
      </DialogTitle>

      <DialogContent sx={contentSx}>
        {children}
      </DialogContent>
    </Dialog>
  )
}

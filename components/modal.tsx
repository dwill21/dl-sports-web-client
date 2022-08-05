import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode
  open: boolean
  onClose: () => void
  title: string
}

export default function Modal({ children, open, onClose, title } : ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title">
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center" id="dialog-title">
        {title}
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon/>
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}

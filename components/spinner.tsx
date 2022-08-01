import { PulseLoader } from 'react-spinners';
import { useEffect } from 'react';

export default function Spinner() {
  useEffect(() => {
    if (document) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'scroll';
      }
    }
  })

  return (
    <div className="fixed inset-0 bg-neutral-500 opacity-50">
      <PulseLoader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
    </div>
  )
}

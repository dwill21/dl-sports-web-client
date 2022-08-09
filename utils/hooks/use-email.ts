import { send } from '@emailjs/browser';
import { useMemo } from 'react';

interface EmailProps {
  from_name: string
  tip: string
  contact: string
}

export const useEmail = () => {
  const publicKey = useMemo(() => process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "", []);
  const serviceId = useMemo(() => process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "", []);
  const templateId = useMemo(() => process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "", []);

  return {
    sendEmail: (templateParams: EmailProps) => {
      try {
        return send(serviceId, templateId, {...templateParams}, publicKey);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
}

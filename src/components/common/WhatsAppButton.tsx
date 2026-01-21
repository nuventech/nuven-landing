import Link from 'next/link';

import { WhatsAppIcon } from '@/src/components/common/icons/WhatsAppIcon';
import { whatsappUrl } from '@/src/constants/site';

export const WhatsAppButton = () => {
  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300"
    >
      <WhatsAppIcon className="w-8 h-8 text-white" />
    </Link>
  );
};

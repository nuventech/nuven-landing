//TODO Adaptar segun la empresa y utilizar para rellenar otros archivos
export const siteConfig = {
  name: 'Nuven',
  title: 'Nuven | Software a la medida de tu visión',
  description:
    'Soluciones tecnológicas de alto impacto para negocios que buscan escalar. Especialistas en desarrollo web premium, software a medida y diseño de vanguardia.',
  siteUrl: 'https://nuven.com.ar',
  language: 'es-AR',
  ogImage: '/og/default-og.png',
  phone: '5493812203431',
  email: 'contacto@nuven.com.ar',
  address: 'Ejercito del Norte 28',
  province: 'San Miguel de Tucumán',
  formatedPhone: '+54 9 (381) 220 - 3431',
  links: {
    instagram: 'https://www.instagram.com/nuven.tech',
  },
  authorUrl: 'https://www.nuven.com.ar',
  authorName: 'Nuven',
  whatsappMessage: 'Hola! Me gustaria hacer una consulta',
  keywords: [
    'desarrollo de software',
    'desarrollo web premium',
    'software a medida',
    'diseño de vanguardia',
    'tecnología de alto impacto',
    'soluciones digitales',
    'nuven tech',
    'argentina',
  ],
};

export const whatsappUrl = `https://wa.me/${siteConfig.phone}?text=${siteConfig.whatsappMessage}`;

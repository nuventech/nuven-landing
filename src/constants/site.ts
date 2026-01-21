//TODO Adaptar segun la empresa y utilizar para rellenar otros archivos
export const siteConfig = {
  name: 'Soluciones Proyectables',
  description: 'Descripción corta de la landing.',
  siteUrl: 'https://www.solucionesproyectables.com',
  ogImage: '/og/default-og.png',
  phone: '5493812099137',
  email: 'info@solucionesproyectables.com',
  address: 'Ejercito del Norte 28',
  province: 'San Miguel de Tucumán',
  formatedPhone: '+54 9 (381) 209 - 9137',
  links: {
    instagram: 'https://www.instagram.com/solucionesproyectables_',
  },
  authorUrl: 'https://www.nuven.com.ar',
  authorName: 'Nuven',
  whatsappMessage: 'Hola. Me gustaria hacer una consulta',
};

export const whatsappUrl = `https://wa.me/${siteConfig.phone}?text=${siteConfig.whatsappMessage}`;

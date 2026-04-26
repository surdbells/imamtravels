/**
 * Production environment configuration.
 *
 * Replace placeholder EmailJS values with your real IDs.
 * These are public keys by design — safe to commit.
 *
 * For Cloudflare Pages: set these via environment variables in the
 * Pages dashboard if you prefer not to commit them, then use
 * angular.json fileReplacements to swap this file at build time.
 */
export const environment = {
  production: true,
  siteUrl: 'https://imamtravelsandtours.com',
  emailjs: {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    contactTemplateId: 'YOUR_CONTACT_TEMPLATE_ID',
    hajjTemplateId: 'YOUR_HAJJ_TEMPLATE_ID',
  },
  contact: {
    primaryPhone: '+2347087786486',
    secondaryPhone: '+2348033221304',
    abujaPhone: '+2347031995432',
    ijebuOdePhone: '+2348039243459',
    primaryEmail: 'info@imamtravelsandtours.com',
    abujaAddress:
      'Suite A50 H & A Plaza, Olusegun Obasanjo Way, Near Exclusive Serene Hotel, Wuye District, Abuja',
    ijebuOdeAddress:
      '14 Motubo Street, Awokoya Isale, Ijebu-Ode, Ogun State',
  },
};

/**
 * Development environment configuration.
 *
 * IMPORTANT — EmailJS credentials:
 *   These are PUBLIC keys by design (safe to commit to a public repo).
 *   They identify your EmailJS account/template/service but cannot
 *   be used to send arbitrary emails — EmailJS rate-limits and
 *   restricts by allowed origins (configured in your EmailJS dashboard).
 *
 *   Replace the placeholder values below with the IDs from your
 *   EmailJS dashboard:
 *     - Service ID:  Email Services -> [your service]
 *     - Public Key:  Account -> General -> Public Key
 *     - Template IDs: Email Templates -> [each template]
 */
export const environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
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

/**
 * Generic contact form payload — sent from the Contact page.
 */
export interface ContactPayload {
  fromName: string;
  fromEmail: string;
  phone: string;
  service: string;
  message: string;
}

/**
 * Hajj 2026 registration payload — richer schema for the dedicated
 * registration page.
 */
export interface HajjRegistrationPayload {
  fromName: string;
  fromEmail: string;
  phone: string;
  dob: string;
  passport: string;
  passportExpiry: string;
  package: string;
  departureCity: string;
  travellers: number;
  requirements: string;
  contactMethod: 'phone' | 'email' | 'whatsapp';
}

/**
 * Result of an email submission.
 */
export interface EmailResult {
  ok: boolean;
  status?: number;
  text?: string;
  error?: string;
}

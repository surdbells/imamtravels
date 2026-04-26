import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import {
  ContactPayload,
  EmailResult,
  HajjRegistrationPayload,
} from '../models/email.model';

/**
 * Wraps the EmailJS browser SDK with a typed, SSR-safe API.
 *
 * EmailJS uses browser-only APIs (window, fetch), so all methods
 * short-circuit to a no-op result when called during SSR/prerender.
 * In practice, forms are only submitted from user actions which
 * always happen post-hydration in the browser.
 */
@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private initialised = false;

  /**
   * Lazy-initialise EmailJS once, only on the browser.
   */
  private ensureInit(): void {
    if (!this.isBrowser || this.initialised) return;

    const { publicKey } = environment.emailjs;
    if (!publicKey || publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
      console.warn(
        '[EmailService] EmailJS publicKey is not configured. ' +
          'Set it in src/environments/environment.ts before deploying.',
      );
      return;
    }

    emailjs.init({ publicKey });
    this.initialised = true;
  }

  /**
   * Send the generic contact form.
   */
  async sendContact(payload: ContactPayload): Promise<EmailResult> {
    if (!this.isBrowser) {
      return { ok: false, error: 'Email submission unavailable during SSR.' };
    }

    this.ensureInit();
    if (!this.initialised) {
      return { ok: false, error: 'EmailJS is not configured.' };
    }

    const { serviceId, contactTemplateId } = environment.emailjs;
    const templateParams = {
      from_name: payload.fromName,
      from_email: payload.fromEmail,
      phone: payload.phone,
      service: payload.service,
      message: payload.message,
    };

    try {
      const response = await emailjs.send(
        serviceId,
        contactTemplateId,
        templateParams,
      );
      return { ok: true, status: response.status, text: response.text };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }

  /**
   * Send a Hajj 2026 registration submission.
   */
  async sendHajjRegistration(
    payload: HajjRegistrationPayload,
  ): Promise<EmailResult> {
    if (!this.isBrowser) {
      return { ok: false, error: 'Email submission unavailable during SSR.' };
    }

    this.ensureInit();
    if (!this.initialised) {
      return { ok: false, error: 'EmailJS is not configured.' };
    }

    const { serviceId, hajjTemplateId } = environment.emailjs;
    const templateParams = {
      from_name: payload.fromName,
      from_email: payload.fromEmail,
      phone: payload.phone,
      dob: payload.dob,
      passport: payload.passport,
      passport_expiry: payload.passportExpiry,
      package: payload.package,
      departure_city: payload.departureCity,
      travellers: String(payload.travellers),
      requirements: payload.requirements,
      contact_method: payload.contactMethod,
    };

    try {
      const response = await emailjs.send(
        serviceId,
        hajjTemplateId,
        templateParams,
      );
      return { ok: true, status: response.status, text: response.text };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }
}

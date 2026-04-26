import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  LUCIDE_ICONS,
  LucideIconProvider,
  // ----- Curated icon set for Imam Travels -----
  // Navigation
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  // Travel
  Plane,
  PlaneTakeoff,
  PlaneLanding,
  Compass,
  Globe,
  Map,
  MapPin,
  Luggage,
  TicketsPlane,
  // Communication
  Phone,
  Mail,
  MessageCircle,
  Send,
  // Trust / Service
  ShieldCheck,
  Award,
  BadgeCheck,
  Star,
  Sparkles,
  Heart,
  // Business / People
  Users,
  Building2,
  Briefcase,
  Handshake,
  Clock,
  Calendar,
  // UI
  Check,
  CheckCircle2,
  CircleAlert,
  Search,
  ExternalLink,
  Quote,
  // Social
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),

    provideClientHydration(withEventReplay()),

    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        Menu,
        X,
        ChevronDown,
        ChevronRight,
        ChevronLeft,
        ArrowRight,
        ArrowLeft,
        ArrowUpRight,
        Plane,
        PlaneTakeoff,
        PlaneLanding,
        Compass,
        Globe,
        Map,
        MapPin,
        Luggage,
        TicketsPlane,
        Phone,
        Mail,
        MessageCircle,
        Send,
        ShieldCheck,
        Award,
        BadgeCheck,
        Star,
        Sparkles,
        Heart,
        Users,
        Building2,
        Briefcase,
        Handshake,
        Clock,
        Calendar,
        Check,
        CheckCircle2,
        CircleAlert,
        Search,
        ExternalLink,
        Quote,
        Facebook,
        Instagram,
        Linkedin,
        Youtube,
      }),
    },
  ],
};

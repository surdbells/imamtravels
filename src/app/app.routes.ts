import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomeComponent),
    title: 'Imam Travels & Tours | Hajj, Umrah & Premium Travel Agency Nigeria',
  },
  // About, Services, Contact, Hajj-2026, NotFound routes
  // are added in Phases 6–7.
  {
    path: '**',
    redirectTo: '',
  },
];

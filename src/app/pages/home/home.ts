import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  ButtonComponent,
  ContainerComponent,
  IconComponent,
  LogoComponent,
  SectionHeadingComponent,
} from '../../shared/components';
import { JsonLdService, SeoService } from '../../core/services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContainerComponent,
    SectionHeadingComponent,
    ButtonComponent,
    IconComponent,
    LogoComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly jsonLd = inject(JsonLdService);

  protected readonly icons = [
    'plane-takeoff',
    'compass',
    'map-pin',
    'globe',
    'shield-check',
    'award',
    'users',
    'phone',
    'mail',
    'calendar',
    'sparkles',
    'star',
    'heart',
    'handshake',
    'briefcase',
    'luggage',
  ];

  ngOnInit(): void {
    // SEO meta — full implementation comes Phase 6 with real content
    this.seo.update({
      title: 'Imam Travels & Tours | Hajj, Umrah & Premium Travel Agency Nigeria',
      description:
        "Nigeria's trusted travel agency for Hajj, Umrah, flights, visas and bespoke travel. 25+ years of experience. Offices in Abuja & Ijebu-Ode.",
      path: '/',
      keywords:
        'travel agency Nigeria, Hajj packages Nigeria, Umrah packages, flight booking Nigeria, visa processing Lagos, Abuja travel agency',
    });

    // Structured data — Organization + WebSite (always present)
    this.jsonLd.set('organization', this.jsonLd.buildOrganizationSchema());
    this.jsonLd.set('website', this.jsonLd.buildWebsiteSchema());
  }
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Brand logo component.
 *
 * Variants:
 *  - 'mark'    — circular emblem only (compact)
 *  - 'full'    — emblem + wordmark (header default)
 *  - 'stacked' — emblem above wordmark (footer or hero)
 */
@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
    @switch (variant()) {
      @case ('mark') {
        <a [routerLink]="['/']" class="logo logo--mark" [attr.aria-label]="'Imam Travels & Tours — Home'">
          <img
            src="/assets/images/logo/imam-travels-logo.webp"
            alt=""
            width="48"
            height="48"
            class="logo__mark"
            [class.logo__mark--inverted]="inverted()"
          />
        </a>
      }
      @case ('stacked') {
        <a [routerLink]="['/']" class="logo logo--stacked" [attr.aria-label]="'Imam Travels & Tours — Home'">
          <img
            src="/assets/images/logo/imam-travels-logo.webp"
            alt=""
            width="64"
            height="64"
            class="logo__mark"
            [class.logo__mark--inverted]="inverted()"
          />
          <span class="logo__wordmark" [class.logo__wordmark--inverted]="inverted()">
            <span class="logo__brand">Imam Travels</span>
            <span class="logo__tagline">&amp; Tours</span>
          </span>
        </a>
      }
      @default {
        <a [routerLink]="['/']" class="logo logo--full" [attr.aria-label]="'Imam Travels & Tours — Home'">
          <img
            src="/assets/images/logo/imam-travels-logo.webp"
            alt=""
            width="44"
            height="44"
            class="logo__mark"
            [class.logo__mark--inverted]="inverted()"
          />
          <span class="logo__wordmark" [class.logo__wordmark--inverted]="inverted()">
            <span class="logo__brand">Imam Travels</span>
            <span class="logo__sub">&amp; Tours</span>
          </span>
        </a>
      }
    }
  `,
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  readonly variant = input<'mark' | 'full' | 'stacked'>('full');
  readonly inverted = input(false); // true when on dark backgrounds
}

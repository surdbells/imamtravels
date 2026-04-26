import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Reusable section heading: optional eyebrow, h2/h3 headline, optional lead paragraph.
 *
 * Aligns to provide consistent typography rhythm across all sections.
 */
@Component({
  selector: 'app-section-heading',
  standalone: true,
  template: `
    <header
      class="heading"
      [class.heading--center]="align() === 'center'"
      [class.heading--inverted]="inverted()"
    >
      @if (eyebrow()) {
        <span class="eyebrow" [class.eyebrow--gold]="eyebrowAccent() === 'gold'">{{ eyebrow() }}</span>
      }

      @if (level() === 'h2') {
        <h2 class="heading__title">
          <ng-content />
        </h2>
      } @else {
        <h3 class="heading__title heading__title--small">
          <ng-content />
        </h3>
      }

      @if (lead()) {
        <p class="heading__lead">{{ lead() }}</p>
      }
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .heading {
        max-width: 48rem;
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
      }

      .heading--center {
        margin-inline: auto;
        text-align: center;
        align-items: center;
      }

      .heading__title {
        margin: 0;
      }

      .heading__title--small {
        font-size: clamp(1.5rem, 3vw, 2.25rem);
      }

      .heading__lead {
        font-size: 1.0625rem;
        line-height: 1.65;
        color: rgb(26 26 26 / 0.75);
        max-width: 38rem;
      }

      .heading--center .heading__lead {
        margin-inline: auto;
      }

      .heading--inverted .heading__title {
        color: white;
      }

      .heading--inverted .heading__lead {
        color: rgb(255 255 255 / 0.85);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeadingComponent {
  readonly eyebrow = input<string>();
  readonly eyebrowAccent = input<'green' | 'gold'>('green');
  readonly lead = input<string>();
  readonly level = input<'h2' | 'h3'>('h2');
  readonly align = input<'left' | 'center'>('left');
  readonly inverted = input(false);
}

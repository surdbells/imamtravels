import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Consistent max-width container.
 *
 * Sizes:
 *  - 'narrow'  — max-w-3xl (48rem) — long-form prose
 *  - 'default' — max-w-7xl (80rem) — most sections
 *  - 'wide'    — max-w-screen-2xl — hero/edge-bleeding sections
 */
@Component({
  selector: 'app-container',
  standalone: true,
  template: `
    <div [class]="'container ' + sizeClass()">
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .container {
        width: 100%;
        margin-inline: auto;
        padding-inline: 1.25rem;
      }
      @media (min-width: 768px) {
        .container {
          padding-inline: 2rem;
        }
      }
      .container--narrow {
        max-width: 48rem;
      }
      .container--default {
        max-width: 80rem;
      }
      .container--wide {
        max-width: 96rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {
  readonly size = input<'narrow' | 'default' | 'wide'>('default');

  protected sizeClass(): string {
    return `container--${this.size()}`;
  }
}

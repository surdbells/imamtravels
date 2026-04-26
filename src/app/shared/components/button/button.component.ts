import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'gold' | 'ghost' | 'ghost-light' | 'white';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Brand button. Renders as:
 *   - <a [href]> when `href` is provided (external/mailto/tel)
 *   - <a [routerLink]> when `routerLink` is provided (internal nav)
 *   - <button> otherwise (with click output)
 *
 * Picking the right element keeps semantics correct and makes the button
 * keyboard-accessible by default.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (routerLink()) {
      <a [routerLink]="routerLink()" [class]="classes()">
        <ng-content />
      </a>
    } @else if (href()) {
      <a [href]="href()" [target]="target()" [rel]="relAttr()" [class]="classes()">
        <ng-content />
      </a>
    } @else {
      <button
        [type]="type()"
        [disabled]="disabled() || loading()"
        [class]="classes()"
        (click)="clicked.emit($event)"
      >
        @if (loading()) {
          <span class="btn__spinner" aria-hidden="true"></span>
        }
        <ng-content />
      </button>
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }

      .btn--sm {
        padding: 0.625rem 1.25rem;
        font-size: 0.8125rem;
      }

      .btn--lg {
        padding: 1.0625rem 2.25rem;
        font-size: 1rem;
      }

      .btn--white {
        background-color: white;
        color: var(--color-brand-700);
        box-shadow: 0 4px 14px rgb(0 0 0 / 0.08);
      }

      .btn--white:hover {
        background-color: var(--color-gold-50);
        transform: translateY(-1px);
      }

      .btn[disabled] {
        opacity: 0.55;
        cursor: not-allowed;
        pointer-events: none;
      }

      .btn__spinner {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-right-color: transparent;
        animation: spin 0.7s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  // Variant + size
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');

  // <button> mode
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly loading = input(false);

  // <a href> mode
  readonly href = input<string>();
  readonly target = input<'_blank' | '_self'>();

  // <a routerLink> mode
  readonly routerLink = input<string | unknown[]>();

  // Full-width override
  readonly block = input(false);

  // Click output (for <button> mode)
  readonly clicked = output<MouseEvent>();

  protected classes = computed(() => {
    const parts = ['btn', `btn-${this.variant()}`];
    if (this.size() !== 'md') parts.push(`btn--${this.size()}`);
    if (this.block()) parts.push('w-full');
    return parts.join(' ');
  });

  /**
   * Auto-set rel="noopener noreferrer" when target="_blank" for security.
   */
  protected relAttr(): string | null {
    return this.target() === '_blank' ? 'noopener noreferrer' : null;
  }
}

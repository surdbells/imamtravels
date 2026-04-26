import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

/**
 * Icon wrapper around lucide-angular with consistent sizing presets.
 *
 * Usage:
 *   <app-icon name="plane" size="md" />
 *   <app-icon name="map-pin" size="lg" color="var(--color-brand-600)" />
 *
 * Icon names use kebab-case matching Lucide's icon name format.
 * Icons must be registered in app.config.ts via LUCIDE_ICONS provider.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <i-lucide
      [name]="name()"
      [size]="dimension()"
      [strokeWidth]="strokeWidth()"
      [color]="color()"
      [attr.aria-hidden]="ariaHidden()"
      [attr.role]="ariaLabel() ? 'img' : null"
      [attr.aria-label]="ariaLabel()"
    ></i-lucide>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl' | number>('md');
  readonly strokeWidth = input(2);
  readonly color = input<string>('currentColor');
  readonly ariaLabel = input<string>();

  protected dimension = computed(() => {
    const s = this.size();
    if (typeof s === 'number') return s;
    return { xs: 14, sm: 16, md: 20, lg: 24, xl: 32 }[s];
  });

  protected ariaHidden = computed(() => (this.ariaLabel() ? null : 'true'));
}

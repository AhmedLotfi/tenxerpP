import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS } from './icon.registry';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.aria-hidden]="ariaLabel() ? null : true"
      [attr.role]="ariaLabel() ? 'img' : null"
      [attr.aria-label]="ariaLabel() || null"
      [innerHTML]="paths()"
    ></svg>
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
})
export class IconComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<string>();
  readonly size = input<number>(20);
  readonly strokeWidth = input<number>(1.75);
  readonly ariaLabel = input<string>('');

  readonly paths = computed<SafeHtml>(() => {
    const raw = ICONS[this.name()] ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  });
}

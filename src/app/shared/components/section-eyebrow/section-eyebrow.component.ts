import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-eyebrow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="eyebrow" [attr.aria-label]="'Section ' + index()">
      @if (index()) {
        <span class="se__num">No.{{ pad(index()) }}</span>
        <span class="se__sep" aria-hidden="true">/</span>
      }
      {{ label() }}
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
      .se__num {
        color: var(--color-muted);
        font-weight: 500;
      }
      .se__sep {
        color: var(--color-border-strong);
      }
    `,
  ],
})
export class SectionEyebrowComponent {
  readonly label = input.required<string>();
  readonly index = input<number>(0);

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}

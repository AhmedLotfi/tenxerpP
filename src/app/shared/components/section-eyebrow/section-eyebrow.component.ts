import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-eyebrow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="eyebrow">{{ label() }}</span>`,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class SectionEyebrowComponent {
  readonly label = input.required<string>();
}

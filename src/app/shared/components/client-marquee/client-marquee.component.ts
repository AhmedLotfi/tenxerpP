import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="marquee-mask">
      <div class="marquee">
        @for (c of doubled(); track $index) {
          <div class="marquee__item">
            <span class="marquee__logo">{{ c.logoText }}</span>
            <span class="marquee__industry">— {{ c.industry }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .marquee__item {
        display: inline-flex;
        align-items: baseline;
        gap: 12px;
        padding: 8px 0;
        font-family: var(--font-display);
        font-weight: 700;
        font-size: 1.5rem;
        letter-spacing: -0.025em;
        color: var(--color-navy);
        white-space: nowrap;
        transition: opacity var(--duration-base) var(--ease-out);
      }
      .marquee__industry {
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-muted);
      }
    `,
  ],
})
export class ClientMarqueeComponent {
  readonly clients = input.required<Client[]>();

  /** Duplicate the list so the loop is seamless */
  readonly doubled = computed<Client[]>(() => [...this.clients(), ...this.clients()]);
}

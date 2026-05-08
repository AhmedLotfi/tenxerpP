import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Client } from '../../../core/models/client.model';

interface ClientLogo {
  name: string;
  src: string;
}

const REAL_LOGOS: ClientLogo[] = [
  { name: 'RTA', src: 'images/clients/RTA.png' },
  { name: 'Takaful Emarat', src: 'images/clients/Takaful-Emarat.png' },
  { name: 'ENOC', src: 'images/clients/ENOC.png' },
  { name: 'Evolution', src: 'images/clients/Evolution.png' },
  { name: 'Fujairah Charity', src: 'images/clients/Fujairah-Charity.png' },
  { name: 'Sharjah City Municipality', src: 'images/clients/Sharjah-City.png' },
];

@Component({
  selector: 'app-client-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="marquee-mask">
      <div class="marquee">
        @for (l of doubled(); track $index) {
          <div class="marquee__item" [title]="l.name">
            <img [src]="l.src" [alt]="l.name" loading="lazy" />
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
      .marquee {
        gap: 80px;
        align-items: center;
      }
      .marquee__item {
        flex: 0 0 auto;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        filter: grayscale(0.5);
        transition: all var(--duration-base) var(--ease-out);
      }
      .marquee__item:hover {
        opacity: 1;
        filter: none;
      }
      .marquee__item img {
        max-height: 100%;
        max-width: 200px;
        width: auto;
        height: auto;
        object-fit: contain;
      }
    `,
  ],
})
export class ClientMarqueeComponent {
  // Kept for API parity; real logos are sourced internally.
  readonly clients = input<Client[]>([]);

  readonly doubled = computed<ClientLogo[]>(() => [...REAL_LOGOS, ...REAL_LOGOS]);
}

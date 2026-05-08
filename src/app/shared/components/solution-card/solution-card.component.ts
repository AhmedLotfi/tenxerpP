import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Solution } from '../../../core/models/solution.model';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-solution-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, TranslatePipe],
  template: `
    <a
      class="sol-card"
      [routerLink]="['/Home/Solutioninner', solution().id]"
      [attr.aria-label]="solution().title"
    >
      <div class="sol-card__media">
        <img
          [src]="solution().heroImage"
          [alt]="solution().title + ' illustration'"
          loading="lazy"
          width="200"
          height="200"
        />
        <span class="sol-card__num">No.{{ pad(solution().id) }}</span>
      </div>

      <div class="sol-card__body">
        <div class="sol-card__head">
          <span class="sol-card__icon">
            <app-icon [name]="solution().iconKey" [size]="18" />
          </span>
          <span class="sol-card__cat">
            {{ 'common.category.' + solution().category | translate }}
          </span>
        </div>

        <h3 class="sol-card__title">{{ solution().title }}</h3>
        <p class="sol-card__tagline">{{ solution().tagline }}</p>

        <div class="sol-card__foot">
          <span class="underline-grow">
            {{ 'solutions.learnMore' | translate }}
          </span>
          <span class="sol-card__arrow" aria-hidden="true">
            <app-icon name="arrow-up-right" [size]="14" />
          </span>
        </div>
      </div>
    </a>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .sol-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        transition:
          transform var(--duration-base) var(--ease-out),
          box-shadow var(--duration-base) var(--ease-out),
          border-color var(--duration-base) var(--ease-out);
        position: relative;
        overflow: hidden;
        isolation: isolate;
      }
      .sol-card::before {
        content: '';
        position: absolute;
        inset: auto 0 0 0;
        height: 3px;
        background: linear-gradient(
          90deg,
          var(--color-amber) 0%,
          var(--color-amber-2) 100%
        );
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform var(--duration-base) var(--ease-out);
        z-index: 2;
      }
      html[dir='rtl'] .sol-card::before {
        transform-origin: right center;
      }

      .sol-card:hover,
      .sol-card:focus-visible {
        transform: translateY(-4px);
        border-color: var(--color-navy-soft);
        box-shadow: var(--shadow-lg);
      }
      .sol-card:hover::before,
      .sol-card:focus-visible::before {
        transform: scaleX(1);
      }

      .sol-card__media {
        position: relative;
        background:
          linear-gradient(180deg, rgba(11, 22, 63, 0.02) 0%, var(--color-bg) 100%);
        aspect-ratio: 5 / 3;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        border-bottom: 1px solid var(--color-border);
        overflow: hidden;
      }
      .sol-card__media::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 0;
        background-image:
          linear-gradient(to right, rgba(11, 22, 63, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(11, 22, 63, 0.04) 1px, transparent 1px);
        background-size: 24px 24px;
        mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
      }
      .sol-card__media img {
        max-width: 70%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
        position: relative;
        z-index: 1;
        transition: transform var(--duration-slow) var(--ease-out);
      }
      .sol-card:hover .sol-card__media img {
        transform: scale(1.06) translateY(-2px);
      }
      .sol-card__num {
        position: absolute;
        top: 14px;
        inset-inline-end: 14px;
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.08em;
        color: var(--color-muted);
        background: rgba(255, 255, 255, 0.7);
        padding: 4px 8px;
        border-radius: var(--radius-sm);
        z-index: 2;
      }

      .sol-card__body {
        padding: 22px 24px 22px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        flex: 1;
      }
      .sol-card__head {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .sol-card__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: var(--radius-sm);
        background: var(--color-amber-soft);
        color: var(--color-amber);
        transition: all var(--duration-base) var(--ease-out);
      }
      .sol-card:hover .sol-card__icon {
        background: var(--color-amber);
        color: #ffffff;
      }
      .sol-card__cat {
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-amber-2);
      }

      .sol-card__title {
        font-size: 1.2rem;
        line-height: 1.25;
        font-weight: 600;
        color: var(--color-navy);
        text-wrap: balance;
      }
      .sol-card__tagline {
        color: var(--color-text-soft);
        font-size: 14px;
        line-height: 1.55;
        flex: 1;
      }

      .sol-card__foot {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        font-size: 13.5px;
        color: var(--color-navy);
        margin-top: 6px;
      }
      .sol-card__arrow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--color-navy-soft);
        transition: all var(--duration-base) var(--ease-out);
      }
      .sol-card:hover .sol-card__arrow {
        background: var(--color-amber);
        color: #ffffff;
        transform: translate(2px, -2px);
      }
      html[dir='rtl'] .sol-card:hover .sol-card__arrow {
        transform: translate(-2px, -2px);
      }
    `,
  ],
})
export class SolutionCardComponent {
  readonly solution = input.required<Solution>();

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}

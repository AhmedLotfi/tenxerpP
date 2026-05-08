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
      <div class="sol-card__head">
        <span class="sol-card__icon">
          <app-icon [name]="solution().iconKey" [size]="22" />
        </span>
        <span class="sol-card__cat">
          {{ 'common.category.' + solution().category | translate }}
        </span>
        <span class="sol-card__num">No.{{ pad(solution().id) }}</span>
      </div>

      <h3 class="sol-card__title">{{ solution().title }}</h3>
      <p class="sol-card__tagline">{{ solution().tagline }}</p>

      <div class="sol-card__foot">
        <span class="underline-grow">
          {{ 'solutions.learnMore' | translate }}
        </span>
        <span class="sol-card__arrow" aria-hidden="true">
          <app-icon name="arrow-up-right" [size]="16" />
        </span>
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
        gap: 14px;
        padding: 28px 26px 24px;
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

      .sol-card__head {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .sol-card__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: var(--radius-md);
        background: var(--color-navy-soft);
        color: var(--color-navy);
        transition:
          background var(--duration-base) var(--ease-out),
          color var(--duration-base) var(--ease-out);
      }
      .sol-card:hover .sol-card__icon {
        background: var(--color-navy);
        color: var(--color-amber);
      }
      .sol-card__cat {
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-amber-2);
      }
      .sol-card__num {
        margin-inline-start: auto;
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--color-muted);
        letter-spacing: 0.05em;
      }

      .sol-card__title {
        font-size: 1.2rem;
        line-height: 1.25;
        font-weight: 600;
        color: var(--color-navy);
        text-wrap: balance;
        margin-top: 4px;
      }
      .sol-card__tagline {
        color: var(--color-text-soft);
        font-size: 14.5px;
        line-height: 1.55;
        flex: 1;
      }

      .sol-card__foot {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        font-size: 14px;
        color: var(--color-navy);
        margin-top: 8px;
      }
      .sol-card__arrow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--color-navy-soft);
        transition:
          transform var(--duration-base) var(--ease-out),
          background var(--duration-base) var(--ease-out),
          color var(--duration-base) var(--ease-out);
      }
      .sol-card:hover .sol-card__arrow {
        background: var(--color-amber);
        color: var(--color-navy);
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

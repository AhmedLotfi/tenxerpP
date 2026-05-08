import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';

export interface AccordionItem {
  id: string;
  title: string;
  body: string;
  meta?: string;
}

@Component({
  selector: 'ui-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <ul class="ui-accordion" role="list">
      @for (item of items(); track item.id; let i = $index) {
        <li
          class="ui-accordion__item"
          [class.is-open]="isOpen(item.id)"
          [class.is-first]="i === 0"
        >
          <button
            type="button"
            class="ui-accordion__trigger"
            [attr.aria-expanded]="isOpen(item.id)"
            [attr.aria-controls]="'panel-' + item.id"
            [id]="'header-' + item.id"
            (click)="toggle(item.id)"
          >
            <span class="ui-accordion__numeral">{{ pad(i + 1) }}</span>
            <span class="ui-accordion__title">{{ item.title }}</span>
            <span class="ui-accordion__chevron"
              ><app-icon name="plus" [size]="20"
            /></span>
          </button>
          <div
            class="ui-accordion__panel"
            role="region"
            [id]="'panel-' + item.id"
            [attr.aria-labelledby]="'header-' + item.id"
            [attr.aria-hidden]="!isOpen(item.id)"
          >
            <div class="ui-accordion__panel-inner">
              <p>{{ item.body }}</p>
              @if (item.meta) {
                <p class="ui-accordion__meta">{{ item.meta }}</p>
              }
            </div>
          </div>
        </li>
      }
    </ul>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .ui-accordion {
        list-style: none;
        padding: 0;
        margin: 0;
        border-top: 1px solid var(--color-border);
      }
      .ui-accordion__item {
        border-bottom: 1px solid var(--color-border);
        transition: background var(--duration-base) var(--ease-out);
      }
      .ui-accordion__item.is-open {
        background: var(--color-surface);
      }

      .ui-accordion__trigger {
        width: 100%;
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 24px;
        align-items: center;
        padding: 26px 4px;
        font-family: var(--font-display);
        font-size: clamp(1.05rem, 1.6vw, 1.35rem);
        font-weight: 600;
        color: var(--color-navy);
        text-align: start;
        letter-spacing: -0.015em;
      }

      .ui-accordion__numeral {
        font-family: var(--font-mono);
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.1em;
        color: var(--color-muted);
        min-width: 32px;
      }

      .ui-accordion__chevron {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--color-navy-soft);
        color: var(--color-navy);
        transition:
          transform var(--duration-base) var(--ease-out),
          background var(--duration-base) var(--ease-out);
      }
      .ui-accordion__item.is-open .ui-accordion__chevron {
        background: var(--color-amber);
        color: var(--color-navy);
        transform: rotate(45deg);
      }

      .ui-accordion__panel {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--duration-slow) var(--ease-out);
      }
      .ui-accordion__item.is-open .ui-accordion__panel {
        grid-template-rows: 1fr;
      }
      .ui-accordion__panel > div {
        overflow: hidden;
      }
      .ui-accordion__panel-inner {
        padding: 0 4px 30px calc(32px + 24px);
        color: var(--color-text-soft);
        font-size: 16px;
        line-height: 1.7;
        max-width: 720px;
      }
      .ui-accordion__meta {
        margin-top: 8px;
        font-size: 13px;
        color: var(--color-muted);
      }

      @media (max-width: 640px) {
        .ui-accordion__panel-inner {
          padding-inline-start: 24px;
        }
      }
    `,
  ],
})
export class UiAccordionComponent {
  readonly items = input.required<AccordionItem[]>();
  readonly singleOpen = input<boolean>(true);

  private readonly openIds = signal<Set<string>>(new Set());

  isOpen(id: string): boolean {
    return this.openIds().has(id);
  }

  toggle(id: string): void {
    this.openIds.update((curr) => {
      const next = this.singleOpen() ? new Set<string>() : new Set(curr);
      if (curr.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../icon/icon.component';

export type UiButtonVariant = 'primary' | 'ghost' | 'text' | 'navy';
export type UiButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, NgTemplateOutlet],
  template: `
    <ng-template #inner>
      @if (loading()) {
        <span class="ui-btn-spinner" aria-hidden="true"></span>
      } @else if (icon() && iconPosition() === 'start') {
        <app-icon [name]="icon()" [size]="iconSize()" />
      }
      <span class="ui-btn-label"><ng-content /></span>
      @if (icon() && iconPosition() === 'end' && !loading()) {
        <app-icon [name]="icon()" [size]="iconSize()" />
      }
    </ng-template>

    @if (link()) {
      <a [routerLink]="link()" [class]="classes()">
        <ng-container *ngTemplateOutlet="inner"></ng-container>
      </a>
    } @else if (href()) {
      <a
        [href]="href()"
        [class]="classes()"
        [attr.target]="external() ? '_blank' : null"
        [attr.rel]="external() ? 'noopener noreferrer' : null"
      >
        <ng-container *ngTemplateOutlet="inner"></ng-container>
      </a>
    } @else {
      <button [type]="type()" [class]="classes()" [disabled]="disabled() || loading()">
        <ng-container *ngTemplateOutlet="inner"></ng-container>
      </button>
    }
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
      a,
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-family: var(--font-body);
        font-weight: 600;
        line-height: 1;
        border-radius: var(--radius-md);
        transition: all var(--duration-base) var(--ease-out);
        white-space: nowrap;
        cursor: pointer;
        letter-spacing: -0.005em;
        border: 1px solid transparent;
        text-decoration: none;
      }

      a:disabled,
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .ui-btn--sm {
        font-size: 13px;
        padding: 9px 14px;
      }
      .ui-btn--md {
        font-size: 15px;
        padding: 13px 22px;
      }
      .ui-btn--lg {
        font-size: 16px;
        padding: 16px 28px;
      }

      .ui-btn--primary {
        background: var(--color-amber);
        color: var(--color-navy);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.4) inset,
          0 8px 18px rgba(237, 28, 58, 0.28);
      }
      .ui-btn--primary:hover:not(:disabled) {
        background: var(--color-amber-2);
        transform: translateY(-2px);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.4) inset,
          0 12px 24px rgba(237, 28, 58, 0.36);
      }
      .ui-btn--primary:active:not(:disabled) {
        transform: translateY(0);
      }

      .ui-btn--navy {
        background: var(--color-navy);
        color: white;
      }
      .ui-btn--navy:hover:not(:disabled) {
        background: var(--color-navy-2);
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }
      .ui-btn--navy:active:not(:disabled) {
        transform: translateY(0);
      }

      .ui-btn--ghost {
        background: transparent;
        color: var(--color-navy);
        border-color: var(--color-border-strong);
      }
      .ui-btn--ghost:hover:not(:disabled) {
        background: var(--color-navy);
        color: white;
        border-color: var(--color-navy);
      }

      .ui-btn--text {
        background: transparent;
        color: var(--color-navy);
        padding-inline: 0;
      }
      .ui-btn--text:hover:not(:disabled) {
        color: var(--color-amber-2);
      }

      .ui-btn-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: ui-btn-spin 720ms linear infinite;
      }

      @keyframes ui-btn-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class UiButtonComponent {
  readonly variant = input<UiButtonVariant>('primary');
  readonly size = input<UiButtonSize>('md');
  readonly type = input<'button' | 'submit'>('button');
  readonly link = input<string | null>(null);
  readonly href = input<string | null>(null);
  readonly external = input<boolean>(false);
  readonly icon = input<string>('');
  readonly iconPosition = input<'start' | 'end'>('end');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);

  readonly iconSize = computed(() => (this.size() === 'lg' ? 18 : 16));

  readonly classes = computed(() => `ui-btn ui-btn--${this.variant()} ui-btn--${this.size()}`);
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'ui-toast-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <div class="toast-host" aria-live="polite" aria-atomic="false">
      @for (t of toasts(); track t.id) {
        <div class="toast" [class]="'toast--' + t.type" role="status">
          <span class="toast__icon" aria-hidden="true">
            @switch (t.type) {
              @case ('success') {
                <app-icon name="check" [size]="16" />
              }
              @case ('error') {
                <app-icon name="x" [size]="16" />
              }
              @default {
                <app-icon name="sparkles" [size]="16" />
              }
            }
          </span>
          <span class="toast__msg">{{ t.message }}</span>
          <button class="toast__close" (click)="dismiss(t.id)" aria-label="Dismiss">
            <app-icon name="x" [size]="14" />
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      .toast-host {
        position: fixed;
        bottom: 24px;
        inset-inline-end: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 380px;
        pointer-events: none;
      }
      .toast {
        background: var(--color-navy);
        color: white;
        padding: 14px 16px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: var(--shadow-xl);
        pointer-events: auto;
        animation: toast-in 320ms var(--ease-out);
      }
      .toast--success .toast__icon {
        background: var(--color-success);
      }
      .toast--error .toast__icon {
        background: var(--color-danger);
      }
      .toast--info .toast__icon {
        background: var(--color-amber);
        color: var(--color-navy);
      }
      .toast__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        color: white;
        flex-shrink: 0;
      }
      .toast__msg {
        flex: 1;
        line-height: 1.45;
      }
      .toast__close {
        opacity: 0.6;
        padding: 4px;
        border-radius: 4px;
        transition: opacity var(--duration-base) var(--ease-out);
      }
      .toast__close:hover {
        opacity: 1;
      }

      @keyframes toast-in {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
    `,
  ],
})
export class UiToastHostComponent {
  private readonly toastService = inject(ToastService);
  readonly toasts = this.toastService.toasts;

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}

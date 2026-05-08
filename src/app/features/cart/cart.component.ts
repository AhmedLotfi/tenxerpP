import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { SeoService } from '../../core/services/seo.service';

import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { UiInputComponent } from '../../shared/components/ui-input/ui-input.component';
import { UiTextareaComponent } from '../../shared/components/ui-textarea/ui-textarea.component';
import { IconComponent } from '../../shared/icon/icon.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    UiButtonComponent,
    UiInputComponent,
    UiTextareaComponent,
    IconComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <section class="section section--tight">
      <div class="container-x">
        <div class="hero-enter">
          <span class="eyebrow">{{ 'cart.eyebrow' | translate }}</span>
          <h1 class="cart-h1">{{ 'cart.title' | translate }}</h1>
        </div>

        @if (items().length === 0) {
          <div class="cart-empty" appReveal>
            <span class="cart-empty__icon">
              <app-icon name="shopping-cart" [size]="36" />
            </span>
            <h2>{{ 'cart.empty' | translate }}</h2>
            <p>{{ 'cart.emptyHint' | translate }}</p>
            <ui-button link="/" variant="primary" size="md" icon="arrow-right">
              {{ 'cart.browse' | translate }}
            </ui-button>
          </div>
        } @else {
          <div class="cart-grid" appReveal>
            <div class="cart-list">
              <div class="cart-list__head">
                <span>{{ 'cart.module' | translate }}</span>
                <span>Seats</span>
                <span>Subtotal</span>
                <span></span>
              </div>
              @for (item of items(); track item.solution.id) {
                <div class="cart-row">
                  <div class="cart-row__title">
                    <span class="cart-row__icon"
                      ><app-icon [name]="item.solution.iconKey" [size]="18"
                    /></span>
                    <div>
                      <div class="cart-row__name">{{ item.solution.title }}</div>
                      <div class="cart-row__cat">
                        {{ 'common.category.' + item.solution.category | translate }} · No.{{ pad(item.solution.id) }}
                      </div>
                    </div>
                  </div>
                  <div class="cart-row__seats">
                    <button (click)="dec(item.solution.id, item.seats)" aria-label="Decrease seats">
                      <app-icon name="minus" [size]="14" />
                    </button>
                    <span class="num">{{ item.seats }}</span>
                    <button (click)="inc(item.solution.id, item.seats)" aria-label="Increase seats">
                      <app-icon name="plus" [size]="14" />
                    </button>
                  </div>
                  <div class="cart-row__total num">&dollar;{{ item.solution.pricePerSeat * item.seats }}</div>
                  <button class="cart-row__remove" (click)="remove(item.solution.id)" [attr.aria-label]="'cart.remove' | translate">
                    <app-icon name="x" [size]="16" />
                  </button>
                </div>
              }
            </div>

            <aside class="cart-summary">
              <h3 class="cart-summary__h">Quote summary</h3>
              <div class="cart-summary__row">
                <span>{{ 'cart.subtotal' | translate }}</span>
                <span class="num">&dollar;{{ cart.subtotal() }}</span>
              </div>
              @if (cart.discount() > 0) {
                <div class="cart-summary__row cart-summary__row--discount">
                  <span>{{ 'cart.discount' | translate }}</span>
                  <span class="num">−&dollar;{{ cart.discount() }}</span>
                </div>
              }
              <hr class="hairline" />
              <div class="cart-summary__total">
                <span>{{ 'cart.total' | translate }}</span>
                <span class="display-number">&dollar;{{ cart.total() }}</span>
              </div>
              <p class="cart-summary__per">{{ 'cart.perSeat' | translate }}</p>

              <form class="cart-form" [formGroup]="form" (ngSubmit)="checkout()">
                <ui-input
                  formControlName="contactName"
                  label="Your name"
                  autocomplete="name"
                  [error]="errorFor('contactName')"
                />
                <ui-input
                  formControlName="contactEmail"
                  type="email"
                  label="Work email"
                  autocomplete="email"
                  [error]="errorFor('contactEmail')"
                />
                <ui-input
                  formControlName="contactCompany"
                  label="Company"
                  autocomplete="organization"
                  [error]="errorFor('contactCompany')"
                />
                <ui-textarea
                  formControlName="notes"
                  label="Notes (optional)"
                  [rows]="3"
                />

                <ui-button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon="arrow-right"
                  [loading]="submitting()"
                  [disabled]="submitting()"
                >
                  @if (submitting()) {
                    {{ 'cart.checkoutSubmitting' | translate }}
                  } @else {
                    {{ 'cart.checkout' | translate }}
                  }
                </ui-button>
              </form>
            </aside>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .cart-h1 {
        margin-top: 16px;
      }

      .cart-empty {
        margin-top: 64px;
        max-width: 480px;
        text-align: center;
        margin-inline: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
      }
      .cart-empty__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-navy-soft);
        color: var(--color-navy);
        margin-bottom: 16px;
      }

      .cart-grid {
        margin-top: 56px;
        display: grid;
        grid-template-columns: 1.7fr 1fr;
        gap: 40px;
        align-items: start;
      }
      @media (max-width: 900px) {
        .cart-grid {
          grid-template-columns: 1fr;
        }
      }

      .cart-list {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        padding: 24px 28px;
      }
      .cart-list__head {
        display: grid;
        grid-template-columns: 1.7fr 0.7fr 0.5fr 32px;
        gap: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--color-border);
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-muted);
      }
      .cart-row {
        display: grid;
        grid-template-columns: 1.7fr 0.7fr 0.5fr 32px;
        gap: 16px;
        align-items: center;
        padding: 18px 0;
        border-bottom: 1px solid var(--color-border);
      }
      .cart-row:last-child {
        border-bottom: none;
      }
      .cart-row__title {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .cart-row__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: var(--radius-md);
        background: var(--color-navy-soft);
        color: var(--color-navy);
        flex-shrink: 0;
      }
      .cart-row__name {
        font-weight: 600;
        color: var(--color-navy);
        line-height: 1.3;
      }
      .cart-row__cat {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--color-muted);
        margin-top: 4px;
        letter-spacing: 0.05em;
      }
      .cart-row__seats {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--color-bg);
        border-radius: var(--radius-full);
        padding: 4px;
      }
      .cart-row__seats button {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: white;
        color: var(--color-navy);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all var(--duration-base) var(--ease-out);
      }
      .cart-row__seats button:hover {
        background: var(--color-amber);
      }
      .cart-row__seats span {
        min-width: 24px;
        text-align: center;
        font-weight: 600;
      }
      .cart-row__total {
        font-weight: 600;
        color: var(--color-navy);
      }
      .cart-row__remove {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: var(--color-muted);
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .cart-row__remove:hover {
        background: var(--color-danger);
        color: white;
      }

      @media (max-width: 640px) {
        .cart-list__head {
          display: none;
        }
        .cart-row {
          grid-template-columns: 1fr;
          gap: 12px;
        }
      }

      .cart-summary {
        position: sticky;
        top: calc(var(--header-height) + 24px);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        padding: 28px 28px 32px;
      }
      .cart-summary__h {
        font-size: 1.2rem;
        color: var(--color-navy);
        margin-bottom: 20px;
      }
      .cart-summary__row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-block: 8px;
        font-size: 14.5px;
        color: var(--color-text-soft);
      }
      .cart-summary__row--discount {
        color: var(--color-success);
      }
      .cart-summary__total {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-top: 14px;
        font-family: var(--font-display);
      }
      .cart-summary__total > span:first-child {
        font-size: 14.5px;
        color: var(--color-muted);
        letter-spacing: 0.02em;
      }
      .cart-summary__total .display-number {
        font-size: 2.4rem;
        color: var(--color-navy);
      }
      .cart-summary__per {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-muted);
      }
      .cart-form {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .hairline {
        margin-block: 14px;
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  protected readonly cart = inject(CartService);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);

  readonly items = this.cart.items;
  readonly submitting = signal<boolean>(false);

  readonly form = this.fb.nonNullable.group({
    contactName: ['', [Validators.required]],
    contactEmail: ['', [Validators.required, Validators.email]],
    contactCompany: ['', [Validators.required]],
    notes: [''],
  });

  ngOnInit(): void {
    this.seo.set({ title: 'Cart — TenxERP', description: 'Selected modules' });
  }

  inc(id: number, seats: number): void {
    this.cart.update(id, seats + 1);
  }
  dec(id: number, seats: number): void {
    this.cart.update(id, seats - 1);
  }
  remove(id: number): void {
    this.cart.remove(id);
  }
  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  errorFor(name: 'contactName' | 'contactEmail' | 'contactCompany'): string {
    const c = this.form.controls[name];
    if (!c.touched || c.valid) return '';
    if (c.hasError('required')) return 'Required';
    if (c.hasError('email')) return 'Invalid email';
    return 'Invalid';
  }

  checkout(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.cart.checkout(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitting.set(false);
        this.translate.get('cart.checkoutSuccess').subscribe((m) => this.toast.success(m));
        this.cart.clear();
        this.form.reset();
      },
      error: (_err: HttpErrorResponse) => {
        this.submitting.set(false);
        this.toast.error('Could not submit. Try again.');
      },
    });
  }
}

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactService } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ReactiveFormsModule, TranslatePipe, IconComponent],
  template: `
    <footer class="ftr">
      <div class="container-x ftr__top">
        <div class="ftr__brand-col">
          <a class="ftr__brand" routerLink="/" aria-label="TenxERP home">
            <img src="images/tenx-logo-white.png" alt="TenxERP" class="ftr__logo" width="148" height="48" />
          </a>
          <p class="ftr__tagline">{{ 'footer.tagline' | translate }}</p>
          <p class="ftr__by">{{ 'brand.by' | translate }}</p>

          <form class="ftr__news" (ngSubmit)="subscribe()">
            <label for="ftr-email" class="ftr__news-label">
              {{ 'footer.newsletter' | translate }}
            </label>
            <p class="ftr__news-hint">{{ 'footer.newsletterHint' | translate }}</p>
            <div class="ftr__news-row">
              <input
                id="ftr-email"
                type="email"
                [formControl]="email"
                placeholder="you@company.com"
                autocomplete="email"
                [attr.aria-invalid]="email.invalid && email.touched ? true : null"
              />
              <button type="submit" [disabled]="submitting()">
                @if (submitting()) {
                  <span class="ftr__spinner" aria-hidden="true"></span>
                } @else {
                  {{ 'footer.subscribe' | translate }}
                  <app-icon name="arrow-right" [size]="14" />
                }
              </button>
            </div>
          </form>
        </div>

        <div class="ftr__col">
          <h4 class="ftr__col-title">{{ 'footer.navigate' | translate }}</h4>
          <a routerLink="/" class="ftr__link">{{ 'nav.home' | translate }}</a>
          <a routerLink="/about" class="ftr__link">{{ 'nav.about' | translate }}</a>
          <a routerLink="/faqs" class="ftr__link">{{ 'nav.faqs' | translate }}</a>
          <a routerLink="/contact" class="ftr__link">{{ 'nav.contact' | translate }}</a>
          <a routerLink="/Home/Cart" class="ftr__link">{{ 'nav.cart' | translate }}</a>
        </div>

        <div class="ftr__col">
          <h4 class="ftr__col-title">{{ 'footer.solutions' | translate }}</h4>
          <a [routerLink]="['/Home/Solutioninner', 1]" class="ftr__link">Financial Management</a>
          <a [routerLink]="['/Home/Solutioninner', 2]" class="ftr__link">Inventory</a>
          <a [routerLink]="['/Home/Solutioninner', 7]" class="ftr__link">HR & Payroll</a>
          <a [routerLink]="['/Home/Solutioninner', 8]" class="ftr__link">CRM</a>
          <a [routerLink]="['/Home/Solutioninner', 14]" class="ftr__link">Business Intelligence</a>
          <a [routerLink]="['/Home/Solutioninner', 26]" class="ftr__link">IT Industry</a>
        </div>

        <div class="ftr__col">
          <h4 class="ftr__col-title">{{ 'footer.legal' | translate }}</h4>
          <a routerLink="/privacy-policy" class="ftr__link">{{ 'footer.privacyPolicy' | translate }}</a>
          <a routerLink="/privacy-policy" class="ftr__link" fragment="terms">{{ 'footer.terms' | translate }}</a>
          <a routerLink="/privacy-policy" class="ftr__link" fragment="cookies">{{ 'footer.cookies' | translate }}</a>
        </div>
      </div>

      <hr class="hairline" />

      <div class="container-x ftr__bottom">
        <p class="ftr__rights">© {{ year }} Tenx IT Solutions. {{ 'footer.rights' | translate }}</p>
        <div class="ftr__social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <app-icon name="twitter" [size]="18" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <app-icon name="linkedin" [size]="18" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <app-icon name="github" [size]="18" />
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .ftr {
        background: var(--color-navy);
        color: rgba(255, 255, 255, 0.78);
        padding-top: 88px;
        padding-bottom: 24px;
        margin-top: 64px;
      }
      .ftr__top {
        display: grid;
        grid-template-columns: 1.4fr 0.8fr 0.8fr 0.8fr;
        gap: 56px 32px;
        padding-bottom: 64px;
      }
      .ftr__brand {
        display: inline-flex;
        align-items: center;
      }
      .ftr__logo {
        height: 48px;
        width: auto;
        object-fit: contain;
        display: block;
      }
      .ftr__tagline {
        margin-top: 16px;
        max-width: 320px;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.55;
      }
      .ftr__by {
        margin-top: 8px;
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.45);
      }

      .ftr__news {
        margin-top: 32px;
        max-width: 360px;
      }
      .ftr__news-label {
        display: block;
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--color-amber);
        font-weight: 600;
        margin-bottom: 6px;
      }
      .ftr__news-hint {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.55);
        margin-bottom: 14px;
      }
      .ftr__news-row {
        display: flex;
        gap: 8px;
      }
      .ftr__news-row input {
        flex: 1;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.14);
        color: white;
        padding: 12px 14px;
        border-radius: var(--radius-md);
        font-size: 14px;
        transition: all var(--duration-base) var(--ease-out);
      }
      .ftr__news-row input::placeholder {
        color: rgba(255, 255, 255, 0.35);
      }
      .ftr__news-row input:focus-visible {
        outline: none;
        border-color: var(--color-amber);
        background: rgba(255, 255, 255, 0.1);
      }
      .ftr__news-row button {
        background: var(--color-amber);
        color: var(--color-navy);
        font-weight: 600;
        font-size: 14px;
        padding: 12px 18px;
        border-radius: var(--radius-md);
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: background var(--duration-base) var(--ease-out);
      }
      .ftr__news-row button:hover:not(:disabled) {
        background: var(--color-amber-2);
      }
      .ftr__spinner {
        width: 14px;
        height: 14px;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: ftr-spin 720ms linear infinite;
      }
      @keyframes ftr-spin {
        to {
          transform: rotate(360deg);
        }
      }

      .ftr__col {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .ftr__col-title {
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--color-amber);
        margin-bottom: 6px;
      }
      .ftr__link {
        color: rgba(255, 255, 255, 0.72);
        font-size: 14px;
        transition: color var(--duration-base) var(--ease-out);
      }
      .ftr__link:hover {
        color: white;
      }

      .hairline {
        background: rgba(255, 255, 255, 0.12);
      }
      .ftr__bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 24px;
        flex-wrap: wrap;
        gap: 16px;
      }
      .ftr__rights {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.55);
      }
      .ftr__social {
        display: inline-flex;
        gap: 6px;
      }
      .ftr__social a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        color: rgba(255, 255, 255, 0.7);
        background: rgba(255, 255, 255, 0.06);
        transition: all var(--duration-base) var(--ease-out);
      }
      .ftr__social a:hover {
        background: var(--color-amber);
        color: var(--color-navy);
      }

      @media (max-width: 960px) {
        .ftr__top {
          grid-template-columns: 1fr 1fr;
          gap: 40px 24px;
        }
      }
      @media (max-width: 640px) {
        .ftr__top {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class FooterComponent {
  private readonly contact = inject(ContactService);
  private readonly toast = inject(ToastService);

  readonly email = new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] });
  readonly submitting = signal<boolean>(false);
  readonly year = new Date().getFullYear();

  subscribe(): void {
    if (this.email.invalid || this.submitting()) {
      this.email.markAsTouched();
      return;
    }
    this.submitting.set(true);
    this.contact.subscribeNewsletter(this.email.value).subscribe({
      next: () => {
        this.submitting.set(false);
        this.toast.success('You\'re subscribed. Talk soon.');
        this.email.reset('');
      },
      error: () => {
        this.submitting.set(false);
        this.toast.error('Could not subscribe. Try again later.');
      },
    });
  }
}

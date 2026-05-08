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
        <!-- Brand column -->
        <div class="ftr__brand-col">
          <a class="ftr__brand" routerLink="/" aria-label="Tenx IT Solutions home">
            <img
              src="images/tenx-logo-white.png"
              alt="Tenx IT Solutions"
              class="ftr__logo"
              width="148"
              height="48"
            />
          </a>
          <p class="ftr__tagline">{{ 'footer.tagline' | translate }}</p>

          <div class="ftr__contact">
            <a href="mailto:hello@tenxerp.com" class="ftr__contact-row">
              <app-icon name="mail" [size]="16" />
              <span>hello&#64;tenxerp.com</span>
            </a>
            <a href="tel:+922134567890" class="ftr__contact-row">
              <app-icon name="phone" [size]="16" />
              <span class="num">+92 21 3456 7890</span>
            </a>
            <span class="ftr__contact-row">
              <app-icon name="map-pin" [size]="16" />
              <span>{{ 'footer.addrCity' | translate }}</span>
            </span>
          </div>
        </div>

        <!-- Navigate -->
        <div class="ftr__col">
          <h4 class="ftr__col-title">{{ 'footer.navigate' | translate }}</h4>
          <a routerLink="/" class="ftr__link">{{ 'nav.home' | translate }}</a>
          <a routerLink="/about" class="ftr__link">{{ 'nav.about' | translate }}</a>
          <a routerLink="/faqs" class="ftr__link">{{ 'nav.faqs' | translate }}</a>
          <a routerLink="/contact" class="ftr__link">{{ 'nav.contact' | translate }}</a>
        </div>

        <!-- Modules -->
        <div class="ftr__col">
          <h4 class="ftr__col-title">{{ 'footer.modules' | translate }}</h4>
          <a [routerLink]="['/Home/Solutioninner', 1]" class="ftr__link">Financial Management</a>
          <a [routerLink]="['/Home/Solutioninner', 2]" class="ftr__link">Inventory</a>
          <a [routerLink]="['/Home/Solutioninner', 7]" class="ftr__link">HR &amp; Payroll</a>
          <a [routerLink]="['/Home/Solutioninner', 8]" class="ftr__link">CRM</a>
          <a [routerLink]="['/Home/Solutioninner', 14]" class="ftr__link">Business Intelligence</a>
        </div>

        <!-- Industries -->
        <div class="ftr__col">
          <h4 class="ftr__col-title">{{ 'footer.industries' | translate }}</h4>
          <a [routerLink]="['/Home/Solutioninner', 16]" class="ftr__link">Manufacturing</a>
          <a [routerLink]="['/Home/Solutioninner', 17]" class="ftr__link">Retail &amp; Distribution</a>
          <a [routerLink]="['/Home/Solutioninner', 21]" class="ftr__link">Real Estate</a>
          <a [routerLink]="['/Home/Solutioninner', 22]" class="ftr__link">Logistics</a>
          <a [routerLink]="['/Home/Solutioninner', 26]" class="ftr__link">IT Industry</a>
        </div>

        <!-- Newsletter -->
        <div class="ftr__col ftr__col--news">
          <h4 class="ftr__col-title">{{ 'footer.newsletter' | translate }}</h4>
          <p class="ftr__news-hint">{{ 'footer.newsletterHint' | translate }}</p>
          <form class="ftr__news-form" (ngSubmit)="subscribe()">
            <input
              type="email"
              [formControl]="email"
              placeholder="you@company.com"
              autocomplete="email"
              [attr.aria-invalid]="email.invalid && email.touched ? true : null"
              aria-label="Email"
            />
            <button type="submit" [disabled]="submitting()" aria-label="Subscribe">
              @if (submitting()) {
                <span class="ftr__spinner" aria-hidden="true"></span>
              } @else {
                {{ 'footer.subscribe' | translate }}
              }
            </button>
          </form>
        </div>
      </div>

      <hr class="ftr__rule" />

      <div class="container-x ftr__bottom">
        <p class="ftr__rights">© {{ year }} Tenx IT Solutions. {{ 'footer.rights' | translate }}</p>
        <div class="ftr__bottom-r">
          <a routerLink="/privacy-policy" class="ftr__bottom-link">{{ 'footer.privacyPolicy' | translate }}</a>
          <a routerLink="/privacy-policy" fragment="terms" class="ftr__bottom-link">{{ 'footer.terms' | translate }}</a>
          <a routerLink="/privacy-policy" fragment="cookies" class="ftr__bottom-link">{{ 'footer.cookies' | translate }}</a>
          <span class="ftr__social" aria-label="Social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <app-icon name="twitter" [size]="15" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <app-icon name="linkedin" [size]="15" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <app-icon name="github" [size]="15" />
            </a>
          </span>
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
        color: rgba(255, 255, 255, 0.74);
        padding-top: 80px;
        padding-bottom: 28px;
        margin-top: 96px;
      }

      .ftr__top {
        display: grid;
        grid-template-columns: 1.5fr 0.8fr 0.9fr 0.9fr 1.1fr;
        gap: 48px 32px;
        padding-bottom: 56px;
      }

      /* Brand column */
      .ftr__brand {
        display: inline-flex;
        align-items: center;
      }
      .ftr__logo {
        height: 44px;
        width: auto;
        object-fit: contain;
        display: block;
      }
      .ftr__tagline {
        margin-top: 18px;
        max-width: 320px;
        color: rgba(255, 255, 255, 0.62);
        line-height: 1.55;
        font-size: 14px;
      }
      .ftr__contact {
        margin-top: 22px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .ftr__contact-row {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-size: 13.5px;
        color: rgba(255, 255, 255, 0.7);
        transition: color var(--duration-base) var(--ease-out);
        width: fit-content;
      }
      .ftr__contact-row app-icon {
        color: rgba(255, 255, 255, 0.45);
        transition: color var(--duration-base) var(--ease-out);
      }
      a.ftr__contact-row:hover {
        color: #ffffff;
      }
      a.ftr__contact-row:hover app-icon {
        color: var(--color-amber);
      }

      /* Link columns */
      .ftr__col {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .ftr__col-title {
        font-family: var(--font-display);
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0;
        color: #ffffff;
        margin-bottom: 4px;
      }
      .ftr__link {
        color: rgba(255, 255, 255, 0.62);
        font-size: 14px;
        line-height: 1.4;
        transition: color var(--duration-base) var(--ease-out);
        width: fit-content;
      }
      .ftr__link:hover {
        color: #ffffff;
      }

      /* Newsletter */
      .ftr__col--news .ftr__col-title {
        margin-bottom: 6px;
      }
      .ftr__news-hint {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.55);
        line-height: 1.45;
        margin: 0 0 14px;
      }
      .ftr__news-form {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .ftr__news-form input {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #ffffff;
        padding: 10px 14px;
        border-radius: var(--radius-sm);
        font-size: 13.5px;
        outline: none;
        transition: border-color var(--duration-base) var(--ease-out);
      }
      .ftr__news-form input::placeholder {
        color: rgba(255, 255, 255, 0.32);
      }
      .ftr__news-form input:focus-visible {
        border-color: var(--color-amber);
        background: rgba(255, 255, 255, 0.09);
      }
      .ftr__news-form button {
        background: var(--color-amber);
        color: #ffffff;
        font-size: 13.5px;
        font-weight: 600;
        padding: 10px 16px;
        border-radius: var(--radius-sm);
        transition: background var(--duration-base) var(--ease-out);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 38px;
      }
      .ftr__news-form button:hover:not(:disabled) {
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

      /* Rule + bottom bar */
      .ftr__rule {
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        border: 0;
        margin: 0;
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
        color: rgba(255, 255, 255, 0.5);
      }
      .ftr__bottom-r {
        display: inline-flex;
        align-items: center;
        gap: 24px;
        flex-wrap: wrap;
      }
      .ftr__bottom-link {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.55);
        transition: color var(--duration-base) var(--ease-out);
      }
      .ftr__bottom-link:hover {
        color: #ffffff;
      }
      .ftr__social {
        display: inline-flex;
        gap: 4px;
        margin-inline-start: 8px;
      }
      .ftr__social a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: rgba(255, 255, 255, 0.6);
        transition: all var(--duration-base) var(--ease-out);
      }
      .ftr__social a:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
      }

      /* Responsive */
      @media (max-width: 1100px) {
        .ftr__top {
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 40px 32px;
        }
        .ftr__brand-col {
          grid-column: 1 / -1;
        }
        .ftr__col--news {
          grid-column: 1 / -1;
          max-width: 420px;
        }
      }
      @media (max-width: 640px) {
        .ftr__top {
          grid-template-columns: 1fr 1fr;
        }
        .ftr__bottom {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `,
  ],
})
export class FooterComponent {
  private readonly contact = inject(ContactService);
  private readonly toast = inject(ToastService);

  readonly email = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
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
        this.toast.success("You're subscribed. Talk soon.");
        this.email.reset('');
      },
      error: () => {
        this.submitting.set(false);
        this.toast.error('Could not subscribe. Try again later.');
      },
    });
  }
}

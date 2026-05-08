import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ContactService } from '../../core/services/contact.service';
import { ToastService } from '../../core/services/toast.service';
import { SeoService } from '../../core/services/seo.service';

import { SectionEyebrowComponent } from '../../shared/components/section-eyebrow/section-eyebrow.component';
import { UiInputComponent } from '../../shared/components/ui-input/ui-input.component';
import { UiTextareaComponent } from '../../shared/components/ui-textarea/ui-textarea.component';
import { UiSelectComponent } from '../../shared/components/ui-select/ui-select.component';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { IconComponent } from '../../shared/icon/icon.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    SectionEyebrowComponent,
    UiInputComponent,
    UiTextareaComponent,
    UiSelectComponent,
    UiButtonComponent,
    IconComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <section class="section section--tight mesh-hero">
      <div class="container-x">
        <div class="hero-enter">
          <span class="eyebrow">{{ 'contact.eyebrow' | translate }}</span>
          <h1 class="contact-h1">{{ 'contact.title' | translate }}</h1>
          <p class="lead contact-lead">{{ 'contact.lead' | translate }}</p>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container-x">
        <div class="contact-grid" appReveal>
          <form class="contact-form" [formGroup]="form" (ngSubmit)="submit()">
            <div class="contact-form__row contact-form__row--2">
              <ui-input
                formControlName="name"
                [label]="'contact.form.name' | translate"
                placeholder="Aisha Khan"
                autocomplete="name"
                [error]="errorFor('name')"
              />
              <ui-input
                formControlName="email"
                type="email"
                [label]="'contact.form.email' | translate"
                placeholder="aisha@company.com"
                autocomplete="email"
                [error]="errorFor('email')"
              />
            </div>

            <div class="contact-form__row contact-form__row--2">
              <ui-input
                formControlName="company"
                [label]="'contact.form.company' | translate"
                placeholder="Acme Corp"
                autocomplete="organization"
                [error]="errorFor('company')"
              />
              <ui-input
                formControlName="phone"
                [label]="'contact.form.phone' | translate"
                placeholder="+92 300 1234567"
                autocomplete="tel"
              />
            </div>

            <ui-select
              formControlName="interest"
              [label]="'contact.form.interest' | translate"
              [options]="interestOptions()"
            />

            <ui-textarea
              formControlName="message"
              [label]="'contact.form.message' | translate"
              [rows]="5"
              [error]="errorFor('message')"
              placeholder="Tell us about your team, current systems, and what's not working."
            />

            <!-- Honeypot -->
            <div class="contact-form__honey" aria-hidden="true">
              <label>Leave this empty</label>
              <input type="text" formControlName="honeypot" tabindex="-1" autocomplete="off" />
            </div>

            <div class="contact-form__submit">
              <ui-button
                type="submit"
                variant="primary"
                size="lg"
                icon="arrow-right"
                [loading]="submitting()"
                [disabled]="submitting()"
              >
                @if (submitting()) {
                  {{ 'contact.form.submitting' | translate }}
                } @else {
                  {{ 'contact.form.submit' | translate }}
                }
              </ui-button>
            </div>
          </form>

          <aside class="contact-info">
            <app-section-eyebrow [label]="'contactPage.directLine' | translate" />
            <ul class="contact-info__list">
              <li>
                <span class="contact-info__icon"><app-icon name="map-pin" [size]="18" /></span>
                <div>
                  <div class="contact-info__lbl">{{ 'contact.info.address' | translate }}</div>
                  <div class="contact-info__val">{{ 'contact.info.addressValue' | translate }}</div>
                </div>
              </li>
              <li>
                <span class="contact-info__icon"><app-icon name="phone" [size]="18" /></span>
                <div>
                  <div class="contact-info__lbl">{{ 'contact.info.phone' | translate }}</div>
                  <a class="contact-info__val" href="tel:+922134567890">{{
                    'contact.info.phoneValue' | translate
                  }}</a>
                </div>
              </li>
              <li>
                <span class="contact-info__icon"><app-icon name="mail" [size]="18" /></span>
                <div>
                  <div class="contact-info__lbl">{{ 'contact.info.email' | translate }}</div>
                  <a class="contact-info__val" href="mailto:hello@tenxerp.com">{{
                    'contact.info.emailValue' | translate
                  }}</a>
                </div>
              </li>
              <li>
                <span class="contact-info__icon"><app-icon name="clock" [size]="18" /></span>
                <div>
                  <div class="contact-info__lbl">{{ 'contact.info.hours' | translate }}</div>
                  <div class="contact-info__val">{{ 'contact.info.hoursValue' | translate }}</div>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .contact-h1 {
        max-width: 760px;
        margin-top: 16px;
      }
      .contact-lead {
        margin-top: 24px;
        max-width: 640px;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 64px;
      }
      @media (max-width: 900px) {
        .contact-grid {
          grid-template-columns: 1fr;
          gap: 48px;
        }
      }

      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 22px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        padding: clamp(28px, 4vw, 44px);
      }
      .contact-form__row {
        display: grid;
        gap: 22px;
      }
      .contact-form__row--2 {
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 600px) {
        .contact-form__row--2 {
          grid-template-columns: 1fr;
        }
      }

      .contact-form__honey {
        position: absolute;
        left: -10000px;
        opacity: 0;
        pointer-events: none;
      }

      .contact-form__submit {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
      }

      .contact-info {
        padding-top: 8px;
      }
      .contact-info__list {
        list-style: none;
        padding: 0;
        margin: 28px 0 0;
        display: flex;
        flex-direction: column;
        gap: 22px;
      }
      .contact-info__list li {
        display: flex;
        align-items: flex-start;
        gap: 14px;
      }
      .contact-info__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: var(--radius-md);
        background: var(--color-navy-soft);
        color: var(--color-navy);
        flex-shrink: 0;
      }
      .contact-info__lbl {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-muted);
        margin-bottom: 4px;
      }
      .contact-info__val {
        color: var(--color-navy);
        font-weight: 500;
        font-size: 15px;
        line-height: 1.5;
      }
      a.contact-info__val:hover {
        color: var(--color-amber-2);
      }
    `,
  ],
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly toast = inject(ToastService);
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);

  readonly submitting = signal<boolean>(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: ['', [Validators.required]],
    phone: [''],
    interest: ['demo' as 'demo' | 'pricing' | 'migration' | 'partnership'],
    message: ['', [Validators.required, Validators.minLength(10)]],
    honeypot: [''],
  });

  readonly interestOptions = signal([
    { value: 'demo', label: 'A live demo' },
    { value: 'pricing', label: 'Pricing & plans' },
    { value: 'migration', label: 'Migrating from another ERP' },
    { value: 'partnership', label: 'Partnership / reseller' },
  ]);

  ngOnInit(): void {
    this.translate.get(['contact.title', 'contact.lead', 'contact.form.interestOptions.demo', 'contact.form.interestOptions.pricing', 'contact.form.interestOptions.migration', 'contact.form.interestOptions.partnership']).subscribe((vals: Record<string, string>) => {
      this.seo.set({
        title: vals['contact.title'] + ' — Tenx IT Solutions',
        description: vals['contact.lead'],
        path: '/contact',
        keywords: 'contact Tenx IT Solutions, ERP demo request, TenxERP sales, ERP migration support',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          'name': 'Contact Tenx IT Solutions',
          'description': vals['contact.lead'],
          'url': 'https://tenxerp.com/contact',
          'mainEntity': { '@id': 'https://tenxerp.com/#organization' },
        },
      });
      this.interestOptions.set([
        { value: 'demo', label: vals['contact.form.interestOptions.demo'] },
        { value: 'pricing', label: vals['contact.form.interestOptions.pricing'] },
        { value: 'migration', label: vals['contact.form.interestOptions.migration'] },
        { value: 'partnership', label: vals['contact.form.interestOptions.partnership'] },
      ]);
    });
  }

  errorFor(name: 'name' | 'email' | 'company' | 'message'): string {
    const c = this.form.controls[name];
    if (!c.touched || c.valid) return '';
    if (c.hasError('required')) return 'This field is required';
    if (c.hasError('email')) return 'Please enter a valid email';
    if (c.hasError('minlength')) return 'Too short';
    return 'Invalid';
  }

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.contactService.send(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitting.set(false);
        this.translate.get('contact.form.success').subscribe((m) => this.toast.success(m));
        this.form.reset({ interest: 'demo' });
      },
      error: (_err: HttpErrorResponse) => {
        this.submitting.set(false);
        this.translate.get('contact.form.error').subscribe((m) => this.toast.error(m));
      },
    });
  }
}

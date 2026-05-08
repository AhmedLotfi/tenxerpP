import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-privacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule],
  template: `
    <section class="section section--tight">
      <div class="container-x">
        <div class="privacy">
          <span class="eyebrow">{{ 'privacy.eyebrow' | translate }}</span>
          <h1 class="privacy__h1">{{ 'privacy.title' | translate }}</h1>
          <p class="numeral-prefix privacy__date">
            {{ 'privacy.lastUpdated' | translate }}: April 1, 2026
          </p>

          <div class="privacy__body">
            <h2>1. Information we collect</h2>
            <p>
              We collect information you provide directly when you create an account, deploy a
              TenxERP environment, contact our team, or subscribe to our newsletter. This includes
              your name, work email, company name, phone number, and any operational data your
              business chooses to bring into the platform.
            </p>

            <h2>2. How we use your information</h2>
            <p>
              We use your information to provide, maintain, and improve the TenxERP platform; to
              respond to support requests; to send service announcements and product updates; and
              to comply with our legal and regulatory obligations.
            </p>

            <h2>3. Data security</h2>
            <p>
              All data in transit is encrypted using TLS 1.2 or higher. Data at rest is encrypted
              using AES-256. Customer data is logically isolated per tenant. Access to production
              systems is limited, audited, and protected by multi-factor authentication.
            </p>

            <h2>4. Data retention</h2>
            <p>
              We retain customer operational data for the duration of the active service contract.
              On termination, customers may export their data within 30 days. After that period,
              we permanently delete the data, with the exception of records required by law.
            </p>

            <h2>5. Sharing of information</h2>
            <p>
              We do not sell or rent your information. We share information only with subprocessors
              that help us deliver the service (cloud hosting, email delivery, analytics) under
              contracts that require equivalent privacy and security protections.
            </p>

            <h2>6. Your rights</h2>
            <p>
              Depending on your jurisdiction, you may have rights to access, correct, delete or
              port your personal information. Email <a href="mailto:privacy@tenxerp.com">privacy&#64;tenxerp.com</a>
              and we will respond within 30 days.
            </p>

            <h2 id="terms">7. Terms</h2>
            <p>
              Your use of TenxERP is governed by the Master Service Agreement signed with Tenx IT
              Solutions. By using the platform, you accept these terms.
            </p>

            <h2 id="cookies">8. Cookies</h2>
            <p>
              We use a minimal set of cookies for authentication and language persistence. We do
              not use third-party advertising cookies. You can clear cookies at any time through
              your browser settings.
            </p>

            <h2>9. Contact</h2>
            <p>
              For privacy questions or requests, write to:
              <br />
              Tenx IT Solutions
              <br />
              Office #303, Tech Hub, Shahrah-e-Faisal, Karachi, Pakistan
              <br />
              <a href="mailto:privacy@tenxerp.com">privacy&#64;tenxerp.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .privacy {
        max-width: 760px;
      }
      .privacy__h1 {
        margin-top: 16px;
        font-size: clamp(2rem, 4vw, 3.2rem);
      }
      .privacy__date {
        margin-top: 16px;
      }
      .privacy__body {
        margin-top: 56px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        font-size: 1.05rem;
        line-height: 1.75;
        color: var(--color-text-soft);
      }
      .privacy__body h2 {
        margin-top: 32px;
        margin-bottom: 4px;
        font-size: 1.35rem;
        color: var(--color-navy);
      }
      .privacy__body a {
        color: var(--color-amber-2);
        font-weight: 600;
      }
      .privacy__body a:hover {
        color: var(--color-amber);
      }
    `,
  ],
})
export class PrivacyComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.set({
      title: 'Privacy policy — Tenx IT Solutions',
      description:
        'How Tenx IT Solutions and TenxERP handle your information — what we collect, how we use it, and your rights.',
      path: '/privacy-policy',
    });
  }
}

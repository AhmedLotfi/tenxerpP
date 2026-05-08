import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Faq } from '../../core/models/faq.model';
import { FaqService } from '../../core/services/faq.service';
import { SeoService } from '../../core/services/seo.service';

import {
  AccordionItem,
  UiAccordionComponent,
} from '../../shared/components/ui-accordion/ui-accordion.component';
import { SectionEyebrowComponent } from '../../shared/components/section-eyebrow/section-eyebrow.component';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-faqs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule,
    UiAccordionComponent,
    SectionEyebrowComponent,
    UiButtonComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <section class="section section--tight mesh-hero">
      <div class="container-x">
        <div class="hero-enter">
          <span class="eyebrow">{{ 'faqs.eyebrow' | translate }}</span>
          <h1 class="faqs-h1">{{ 'faqs.title' | translate }}</h1>
          <p class="lead faqs-lead">{{ 'faqs.subtitle' | translate }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-x">
        <div class="faqs-grid" appReveal>
          <aside class="faqs-side">
            <app-section-eyebrow [label]="'faqsPage.categoriesEyebrow' | translate" />
            <ul class="faqs-cats">
              <li>
                <button
                  type="button"
                  [class.is-active]="category() === 'all'"
                  (click)="setCategory('all')"
                >
                  {{ 'faqsPage.all' | translate }} ({{ faqs().length }})
                </button>
              </li>
              @for (cat of categories(); track cat.key) {
                <li>
                  <button
                    type="button"
                    [class.is-active]="category() === cat.key"
                    (click)="setCategory(cat.key)"
                  >
                    {{ 'faqsPage.' + cat.key | translate }} ({{ cat.count }})
                  </button>
                </li>
              }
            </ul>
          </aside>

          <div class="faqs-main">
            <ui-accordion [items]="accordionItems()" />

            <div class="faqs-after">
              <p>{{ 'faqsPage.stillQuestions' | translate }}</p>
              <ui-button link="/contact" variant="navy" size="md" icon="arrow-right">
                {{ 'faqsPage.talkToUs' | translate }}
              </ui-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .faqs-h1 {
        max-width: 540px;
        margin-top: 16px;
      }
      .faqs-lead {
        margin-top: 22px;
        max-width: 600px;
      }

      .faqs-grid {
        display: grid;
        grid-template-columns: 240px 1fr;
        gap: 64px;
      }
      @media (max-width: 900px) {
        .faqs-grid {
          grid-template-columns: 1fr;
          gap: 32px;
        }
      }

      .faqs-cats {
        list-style: none;
        padding: 0;
        margin: 24px 0 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .faqs-cats button {
        display: block;
        width: 100%;
        text-align: start;
        padding: 10px 14px;
        font-size: 14.5px;
        font-weight: 500;
        color: var(--color-text-soft);
        border-radius: var(--radius-sm);
        transition: all var(--duration-base) var(--ease-out);
      }
      .faqs-cats button:hover {
        background: var(--color-navy-soft);
        color: var(--color-navy);
      }
      .faqs-cats button.is-active {
        background: var(--color-navy);
        color: white;
        font-weight: 600;
      }

      @media (max-width: 900px) {
        .faqs-cats {
          flex-direction: row;
          flex-wrap: wrap;
          margin-top: 16px;
        }
        .faqs-cats button {
          width: auto;
        }
      }

      .faqs-after {
        margin-top: 56px;
        padding: 32px;
        background: var(--color-navy-soft);
        border-radius: var(--radius-xl);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
      }
      .faqs-after p {
        font-family: var(--font-display);
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--color-navy);
      }
    `,
  ],
})
export class FaqsComponent implements OnInit {
  private readonly faqService = inject(FaqService);
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);

  readonly faqs = signal<Faq[]>([]);
  readonly category = signal<Faq['category'] | 'all'>('all');

  readonly categories = computed(() => {
    const all = this.faqs();
    const keys: Faq['category'][] = ['general', 'pricing', 'security', 'integration', 'support'];
    return keys
      .map((k) => ({
        key: k,
        label: k.charAt(0).toUpperCase() + k.slice(1),
        count: all.filter((f) => f.category === k).length,
      }))
      .filter((c) => c.count > 0);
  });

  readonly accordionItems = computed<AccordionItem[]>(() => {
    const cat = this.category();
    const list = cat === 'all' ? this.faqs() : this.faqs().filter((f) => f.category === cat);
    return list.map((f) => ({ id: f.id, title: f.question, body: f.answer }));
  });

  ngOnInit(): void {
    this.translate.get(['faqs.title', 'faqs.subtitle']).subscribe((vals: Record<string, string>) => {
      this.seo.set({
        title: vals['faqs.title'] + ' — Tenx IT Solutions',
        description: vals['faqs.subtitle'],
        path: '/faqs',
        keywords: 'TenxERP FAQ, ERP pricing questions, ERP deployment time, ERP security GDPR',
      });
    });
    this.faqService.list().subscribe((f) => {
      this.faqs.set(f);
      this.seo.set({
        title: 'FAQs — Tenx IT Solutions',
        description: 'Common questions about TenxERP — pricing, deployment, security, integrations and support.',
        path: '/faqs',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': f.map((q) => ({
            '@type': 'Question',
            'name': q.question,
            'acceptedAnswer': { '@type': 'Answer', 'text': q.answer },
          })),
        },
      });
    });
  }

  setCategory(c: Faq['category'] | 'all'): void {
    this.category.set(c);
  }
}

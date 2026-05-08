import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Solution } from '../../core/models/solution.model';
import { SolutionsService } from '../../core/services/solutions.service';
import { SeoService } from '../../core/services/seo.service';

import { SolutionCardComponent } from '../../shared/components/solution-card/solution-card.component';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { IconComponent } from '../../shared/icon/icon.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-solution-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    TranslateModule,
    SolutionCardComponent,
    UiButtonComponent,
    IconComponent,
    RevealOnScrollDirective,
  ],
  template: `
    @if (solution(); as s) {
      <article>
        <!-- Hero -->
        <section class="section section--tight detail-hero mesh-hero">
          <div class="container-x">
            <a class="back-link" routerLink="/" fragment="solutions">
              <app-icon name="arrow-left" [size]="14" /> {{ 'common.back' | translate }}
            </a>

            <div class="detail-hero__grid hero-enter">
              <div>
                <span class="eyebrow">
                  {{ 'common.category.' + s.category | translate }} · No.{{ pad(s.id) }}
                </span>
                <h1 class="detail-hero__title">{{ s.title }}</h1>
                <p class="lead detail-hero__sub">{{ s.tagline }}</p>
                <div class="detail-hero__cta">
                  <ui-button link="/contact" variant="primary" size="lg" icon="arrow-right">
                    Request a quote
                  </ui-button>
                  <ui-button link="/contact" variant="ghost" size="lg" icon="arrow-up-right">
                    Book a demo
                  </ui-button>
                </div>
              </div>

              <div class="detail-hero__visual">
                <span class="detail-hero__cat-tag">
                  {{ 'common.category.' + s.category | translate }}
                </span>
                <img
                  [src]="s.heroImage"
                  [alt]="s.title + ' illustration'"
                  class="detail-hero__img"
                  loading="eager"
                  width="448"
                  height="448"
                />
                <div class="detail-hero__visual-grid" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Description + Benefits -->
        <section class="section section--tight">
          <div class="container-x">
            <div class="detail-body" appReveal>
              <div class="detail-body__col detail-body__col--main">
                <h2 class="detail-body__h2">Overview</h2>
                <p class="detail-body__lead">{{ s.description }}</p>
              </div>
              <div class="detail-body__col detail-body__col--side">
                <span class="numeral-prefix">Highlights</span>
                <ul class="detail-benefits">
                  @for (b of s.benefits; track b) {
                    <li>
                      <span class="detail-benefits__check"
                        ><app-icon name="check" [size]="14"
                      /></span>
                      {{ b }}
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Features -->
        <section class="section section--tight detail-features">
          <div class="container-x">
            <header class="section-head" appReveal>
              <span class="eyebrow">Capabilities</span>
              <h2 class="section-head__title">Everything in {{ s.title }}.</h2>
            </header>

            <ul class="detail-features__grid reveal-stagger" appReveal>
              @for (f of s.features; track f; let i = $index) {
                <li class="detail-features__item">
                  <span class="detail-features__num">{{ pad(i + 1) }}</span>
                  <span class="detail-features__text">{{ f }}</span>
                </li>
              }
            </ul>
          </div>
        </section>

        <!-- Related solutions -->
        @if (related().length) {
          <section class="section">
            <div class="container-x">
              <header class="section-head" appReveal>
                <span class="eyebrow">{{ 'common.relatedSolutions' | translate }}</span>
                <h2 class="section-head__title">{{ 'common.exploreMore' | translate }}</h2>
              </header>
              <div class="related-grid reveal-stagger" appReveal>
                @for (r of related(); track r.id) {
                  <app-solution-card [solution]="r" />
                }
              </div>
            </div>
          </section>
        }
      </article>
    } @else if (notFound()) {
      <section class="section">
        <div class="container-x not-found">
          <span class="eyebrow">404</span>
          <h1>{{ 'notFound.title' | translate }}</h1>
          <p class="lead">{{ 'notFound.subtitle' | translate }}</p>
          <ui-button link="/" variant="primary" size="lg" icon="arrow-right">
            {{ 'notFound.home' | translate }}
          </ui-button>
        </div>
      </section>
    }
  `,
  styles: [
    `
      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: var(--font-mono);
        font-size: 12px;
        letter-spacing: 0.05em;
        color: var(--color-muted);
        margin-bottom: 32px;
      }
      .back-link:hover {
        color: var(--color-navy);
      }

      .detail-hero {
        padding-block: clamp(40px, 6vw, 80px) clamp(56px, 8vw, 96px);
      }
      .detail-hero__grid {
        display: grid;
        grid-template-columns: 1.1fr 1fr;
        gap: 56px;
        align-items: center;
      }
      @media (max-width: 900px) {
        .detail-hero__grid {
          grid-template-columns: 1fr;
        }
      }
      .detail-hero__title {
        margin-top: 16px;
        max-width: 640px;
      }
      .detail-hero__sub {
        margin-top: 22px;
        max-width: 580px;
        font-size: 1.2rem;
        color: var(--color-text-soft);
      }
      .detail-hero__cta {
        margin-top: 36px;
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
      }
      .detail-hero__visual {
        position: relative;
        border-radius: var(--radius-2xl);
        overflow: hidden;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        aspect-ratio: 1;
        isolation: isolate;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: clamp(32px, 5vw, 56px);
        box-shadow: var(--shadow-lg);
      }
      .detail-hero__visual-grid {
        position: absolute;
        inset: 0;
        z-index: -1;
        background-image:
          linear-gradient(to right, rgba(11, 22, 63, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(11, 22, 63, 0.04) 1px, transparent 1px);
        background-size: 32px 32px;
        mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
      }
      .detail-hero__cat-tag {
        position: absolute;
        top: 20px;
        inset-inline-start: 20px;
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--color-navy);
        background: var(--color-amber-soft);
        padding: 6px 10px;
        border-radius: var(--radius-sm);
      }
      .detail-hero__img {
        width: 100%;
        height: auto;
        max-height: 100%;
        object-fit: contain;
        position: relative;
        z-index: 1;
        animation: detail-hero-float 6s ease-in-out infinite;
      }
      @keyframes detail-hero-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .detail-hero__img { animation: none; }
      }

      /* Body */
      .detail-body {
        display: grid;
        grid-template-columns: 1.7fr 1fr;
        gap: 64px;
        padding-top: 48px;
        border-top: 1px solid var(--color-border);
      }
      @media (max-width: 900px) {
        .detail-body {
          grid-template-columns: 1fr;
          gap: 32px;
        }
      }
      .detail-body__h2 {
        font-size: 1.6rem;
      }
      .detail-body__lead {
        margin-top: 18px;
        font-size: 1.1rem;
        line-height: 1.75;
        color: var(--color-text-soft);
      }
      .detail-benefits {
        list-style: none;
        padding: 0;
        margin: 18px 0 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .detail-benefits li {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        color: var(--color-navy);
        font-weight: 500;
        line-height: 1.5;
      }
      .detail-benefits__check {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: var(--color-amber);
        color: var(--color-navy);
        margin-top: 2px;
      }

      /* Features */
      .detail-features {
        background:
          linear-gradient(180deg, transparent 0%, var(--color-navy-soft) 50%, transparent 100%);
      }
      .section-head {
        max-width: 720px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 56px;
      }
      .detail-features__grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px 24px;
      }
      @media (max-width: 760px) {
        .detail-features__grid {
          grid-template-columns: 1fr;
        }
      }
      .detail-features__item {
        display: flex;
        gap: 18px;
        align-items: flex-start;
        padding: 18px 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        transition: all var(--duration-base) var(--ease-out);
        line-height: 1.55;
      }
      .detail-features__item:hover {
        border-color: var(--color-navy-soft);
        transform: translateY(-2px);
        box-shadow: var(--shadow-sm);
      }
      .detail-features__num {
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        color: var(--color-amber-2);
        flex-shrink: 0;
        margin-top: 2px;
      }
      .detail-features__text {
        font-size: 14.5px;
        color: var(--color-text);
      }

      /* Related */
      .related-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }
      @media (max-width: 1024px) {
        .related-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 640px) {
        .related-grid {
          grid-template-columns: 1fr;
        }
      }

      .not-found {
        max-width: 560px;
        text-align: center;
        margin: 0 auto;
        padding-block: 64px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
      }
    `,
  ],
})
export class SolutionDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly solutionsService = inject(SolutionsService);
  private readonly seo = inject(SeoService);

  readonly solution = signal<Solution | null>(null);
  readonly all = signal<Solution[]>([]);
  readonly notFound = signal<boolean>(false);

  readonly related = computed(() => {
    const s = this.solution();
    const all = this.all();
    if (!s) return [];
    return s.relatedIds.map((id) => all.find((x) => x.id === id)).filter((x): x is Solution => !!x);
  });

  ngOnInit(): void {
    this.solutionsService.list().subscribe((s) => this.all.set(s));

    this.route.paramMap.subscribe((params) => {
      const idStr = params.get('id');
      const id = Number(idStr);
      if (!idStr || Number.isNaN(id)) {
        this.notFound.set(true);
        this.solution.set(null);
        return;
      }
      this.notFound.set(false);
      this.solutionsService.byId(id).subscribe({
        next: (s) => {
          this.solution.set(s);
          this.seo.set({
            title: `${s.title} — TenxERP`,
            description: s.tagline,
            image: s.heroImage,
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (_e: HttpErrorResponse) => {
          this.solution.set(null);
          this.notFound.set(true);
        },
      });
    });
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}

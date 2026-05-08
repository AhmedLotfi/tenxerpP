import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { TeamMember } from '../../core/models/team.model';
import { TeamService } from '../../core/services/team.service';
import { SeoService } from '../../core/services/seo.service';
import { SectionEyebrowComponent } from '../../shared/components/section-eyebrow/section-eyebrow.component';
import { StatCounterComponent } from '../../shared/components/stat-counter/stat-counter.component';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

const TEAM_COLORS = ['#25255C', '#ED1C3A', '#077765', '#1D1D4A', '#0B163F', '#3A3A78'];

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule,
    SectionEyebrowComponent,
    StatCounterComponent,
    UiButtonComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <section class="section section--tight mesh-hero about-hero">
      <div class="container-x about-hero__grid">
        <div class="hero-enter">
          <span class="eyebrow">{{ 'about.eyebrow' | translate }}</span>
          <h1 class="about-h1">{{ 'about.title' | translate }}</h1>
          <p class="lead about-lead">{{ 'about.lead' | translate }}</p>
        </div>
        <div class="about-hero__visual" aria-hidden="true">
          <img src="images/about-us.jpg" alt="" loading="eager" />
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container-x">
        <div class="mv-grid" appReveal>
          <article class="mv">
            <span class="numeral-prefix">No.01</span>
            <h2 class="mv__title">{{ 'about.missionTitle' | translate }}</h2>
            <p class="mv__body">{{ 'about.missionBody' | translate }}</p>
          </article>
          <article class="mv">
            <span class="numeral-prefix">No.02</span>
            <h2 class="mv__title">{{ 'about.visionTitle' | translate }}</h2>
            <p class="mv__body">{{ 'about.visionBody' | translate }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-x">
        <div class="story" appReveal>
          <div class="story__col">
            <app-section-eyebrow [label]="'about.storyEyebrow' | translate" />
          </div>
          <div class="story__col story__col--body">
            <p>{{ 'about.story' | translate }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--tight stats-strip">
      <div class="container-x">
        <div class="stats-grid" appReveal>
          <app-stat-counter [value]="2014" [label]="'about.statFounded' | translate" />
          <app-stat-counter [value]="200" suffix="+" [label]="'about.statEmployees' | translate" />
          <app-stat-counter [value]="1200" suffix="+" [label]="'about.statDeployments' | translate" />
          <app-stat-counter [value]="24" [label]="'about.statCountries' | translate" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-x">
        <header class="section-head" appReveal>
          <app-section-eyebrow [label]="'about.teamTitle' | translate" />
          <h2 class="section-head__title">{{ 'about.teamSubtitle' | translate }}</h2>
        </header>

        <div class="team-grid reveal-stagger" appReveal>
          @for (m of team(); track m.id) {
            <article class="team">
              <div class="team__photo-wrap">
                <span class="team__initials" [style.background]="teamColor(m.id)">
                  {{ teamInitials(m.name) }}
                </span>
              </div>
              <div class="team__body">
                <h3 class="team__name">{{ m.name }}</h3>
                <p class="team__role">{{ m.role }}</p>
                <p class="team__bio">{{ m.bio }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-x">
        <div class="cta-card" appReveal>
          <h2 class="cta-card__title">{{ 'cta.title' | translate }}</h2>
          <p class="cta-card__sub">{{ 'cta.subtitle' | translate }}</p>
          <ui-button link="/contact" variant="primary" size="lg" icon="arrow-right">
            {{ 'cta.primary' | translate }}
          </ui-button>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .about-hero__grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 56px;
        align-items: center;
      }
      @media (max-width: 900px) {
        .about-hero__grid {
          grid-template-columns: 1fr;
        }
      }
      .about-hero__visual {
        aspect-ratio: 5 / 4;
        border-radius: var(--radius-2xl);
        overflow: hidden;
        box-shadow: var(--shadow-lg);
      }
      .about-hero__visual img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .about-h1 {
        max-width: 760px;
        margin-top: 16px;
      }
      .about-lead {
        margin-top: 24px;
        max-width: 640px;
      }

      .mv-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 56px 80px;
        padding-top: 24px;
        border-top: 1px solid var(--color-border);
      }
      @media (max-width: 760px) {
        .mv-grid {
          grid-template-columns: 1fr;
          gap: 40px;
        }
      }
      .mv {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .mv__title {
        font-size: 1.6rem;
        color: var(--color-navy);
      }
      .mv__body {
        color: var(--color-text-soft);
        font-size: 1.02rem;
        line-height: 1.7;
        max-width: 520px;
      }

      .story {
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 64px;
        padding-block: 24px;
      }
      @media (max-width: 760px) {
        .story {
          grid-template-columns: 1fr;
          gap: 32px;
        }
      }
      .story__col--body {
        font-size: 1.1rem;
        line-height: 1.75;
        color: var(--color-text-soft);
        max-width: 720px;
      }

      .stats-strip {
        background: linear-gradient(180deg, transparent 0%, var(--color-navy-soft) 50%, transparent 100%);
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
      }
      @media (max-width: 760px) {
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 36px 20px;
        }
      }

      .section-head {
        max-width: 720px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 56px;
      }
      .section-head__title {
        text-wrap: balance;
      }

      .team-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 28px;
      }
      @media (max-width: 1024px) {
        .team-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 600px) {
        .team-grid {
          grid-template-columns: 1fr;
        }
      }
      .team {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .team__photo-wrap {
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: var(--radius-xl);
        background: var(--color-navy-soft);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        isolation: isolate;
      }
      .team__photo-wrap::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
          radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.18), transparent 50%),
          radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.06), transparent 50%);
        z-index: 1;
      }
      .team__initials {
        position: relative;
        z-index: 2;
        font-family: var(--font-display);
        font-size: clamp(2.6rem, 5vw, 3.6rem);
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #ffffff;
        line-height: 1;
        text-shadow: 0 2px 16px rgba(0, 0, 0, 0.18);
        transition: transform 600ms var(--ease-out);
      }
      .team:hover .team__initials {
        transform: scale(1.08);
      }
      .team__name {
        font-size: 1.2rem;
        color: var(--color-navy);
      }
      .team__role {
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-amber-2);
        margin-top: 4px;
      }
      .team__bio {
        color: var(--color-text-soft);
        font-size: 14.5px;
        line-height: 1.6;
        margin-top: 8px;
      }

      .cta-card {
        background: var(--color-navy);
        color: white;
        padding: clamp(40px, 6vw, 72px);
        border-radius: var(--radius-2xl);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 18px;
      }
      .cta-card__title {
        color: white;
        max-width: 720px;
        font-size: clamp(1.8rem, 3.4vw, 2.4rem);
        text-wrap: balance;
      }
      .cta-card__sub {
        color: rgba(255, 255, 255, 0.75);
        max-width: 540px;
      }
    `,
  ],
})
export class AboutComponent implements OnInit {
  private readonly teamService = inject(TeamService);
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);

  readonly team = signal<TeamMember[]>([]);

  teamInitials(name: string): string {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
  }

  teamColor(id: string): string {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
    return TEAM_COLORS[Math.abs(hash) % TEAM_COLORS.length];
  }

  ngOnInit(): void {
    this.translate.get(['about.title', 'about.lead']).subscribe((vals: Record<string, string>) => {
      this.seo.set({
        title: vals['about.title'] + ' — Tenx IT Solutions',
        description: vals['about.lead'],
        path: '/about',
        image: '/images/about-us.jpg',
        keywords: 'about Tenx IT Solutions, TenxERP team, ERP company Karachi, mission vision',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          'name': 'About Tenx IT Solutions',
          'description': vals['about.lead'],
          'url': 'https://tenxerp.com/about',
          'mainEntity': { '@id': 'https://tenxerp.com/#organization' },
        },
      });
    });
    this.teamService.list().subscribe((t) => this.team.set(t));
  }
}

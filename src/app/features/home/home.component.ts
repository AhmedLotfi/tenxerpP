import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Solution } from '../../core/models/solution.model';
import { Testimonial } from '../../core/models/testimonial.model';
import { Client } from '../../core/models/client.model';
import { Stat } from '../../core/models/stats.model';
import { SolutionsService } from '../../core/services/solutions.service';
import { TestimonialsService } from '../../core/services/testimonials.service';
import { ClientsService } from '../../core/services/clients.service';
import { StatsService } from '../../core/services/stats.service';
import { SeoService } from '../../core/services/seo.service';

import { SectionEyebrowComponent } from '../../shared/components/section-eyebrow/section-eyebrow.component';
import { SolutionCardComponent } from '../../shared/components/solution-card/solution-card.component';
import { StatCounterComponent } from '../../shared/components/stat-counter/stat-counter.component';
import { TestimonialCardComponent } from '../../shared/components/testimonial-card/testimonial-card.component';
import { ClientMarqueeComponent } from '../../shared/components/client-marquee/client-marquee.component';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { IconComponent } from '../../shared/icon/icon.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

type SolFilter = 'all' | 'module' | 'industry';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule,
    SectionEyebrowComponent,
    SolutionCardComponent,
    StatCounterComponent,
    TestimonialCardComponent,
    ClientMarqueeComponent,
    UiButtonComponent,
    IconComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly solutionsService = inject(SolutionsService);
  private readonly testimonialsService = inject(TestimonialsService);
  private readonly clientsService = inject(ClientsService);
  private readonly statsService = inject(StatsService);
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);

  readonly solutions = signal<Solution[]>([]);
  readonly testimonials = signal<Testimonial[]>([]);
  readonly clients = signal<Client[]>([]);
  readonly stats = signal<Stat[]>([]);

  readonly filter = signal<SolFilter>('all');

  readonly isVideoPlaying = signal<boolean>(false);

  playVideo(): void {
    this.isVideoPlaying.set(true);
  }

  readonly filteredSolutions = computed(() => {
    const f = this.filter();
    const all = this.solutions();
    if (f === 'all') return all.slice(0, 12);
    return all.filter((s) => s.category === f).slice(0, 12);
  });

  readonly valueProps = [
    { key: 'modular', icon: 'boxes' },
    { key: 'realtime', icon: 'sparkles' },
    { key: 'compliant', icon: 'shield-check' },
    { key: 'extend', icon: 'cpu' },
  ];

  ngOnInit(): void {
    this.translate.get(['hero.title', 'hero.subtitle']).subscribe((vals: Record<string, string>) => {
      this.seo.set({
        title: 'Tenx IT Solutions | TenxERP — Smarter Business',
        description: vals['hero.subtitle'],
        path: '/',
        image: '/images/banner.jpg',
        keywords: 'ERP software, enterprise resource planning, TenxERP, finance, inventory, HR payroll, CRM, manufacturing, business intelligence',
      });
    });

    this.solutionsService.list().subscribe({
      next: (s) => this.solutions.set(s),
      error: (err: HttpErrorResponse) => console.warn('Solutions load failed', err),
    });
    this.testimonialsService.list().subscribe((t) => this.testimonials.set(t));
    this.clientsService.list().subscribe((c) => this.clients.set(c));
    this.statsService.list().subscribe((st) => this.stats.set(st));
  }

  setFilter(f: SolFilter): void {
    this.filter.set(f);
  }

  trackSol(_: number, s: Solution): number {
    return s.id;
  }
  trackTest(_: number, t: Testimonial): string {
    return t.id;
  }
  trackStat(_: number, s: Stat): string {
    return s.key;
  }
}

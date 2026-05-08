import { Routes } from '@angular/router';
import { MarketingLayoutComponent } from './core/layout/marketing-layout/marketing-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MarketingLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact.component').then((m) => m.ContactComponent),
      },
      {
        path: 'faqs',
        loadComponent: () => import('./features/faqs/faqs.component').then((m) => m.FaqsComponent),
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./features/privacy/privacy.component').then((m) => m.PrivacyComponent),
      },
      {
        path: 'Home/Solutioninner/:id',
        loadComponent: () =>
          import('./features/solution-detail/solution-detail.component').then(
            (m) => m.SolutionDetailComponent,
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
    ],
  },
];

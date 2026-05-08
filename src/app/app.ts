import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LangService } from './core/i18n/lang.service';
import { UiToastHostComponent } from './shared/components/ui-toast/ui-toast.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, UiToastHostComponent],
  template: `
    <router-outlet />
    <ui-toast-host />
  `,
  styles: [`:host { display: contents; }`],
})
export class App {
  constructor() {
    inject(LangService).init();
  }
}

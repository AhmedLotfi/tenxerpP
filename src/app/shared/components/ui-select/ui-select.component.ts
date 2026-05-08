import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';

export interface UiSelectOption {
  value: string;
  label: string;
}

let selectId = 0;

@Component({
  selector: 'ui-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="ui-select">
      @if (label()) {
        <label [for]="id()" class="ui-select__label">{{ label() }}</label>
      }
      <div class="ui-select__wrap">
        <select
          [id]="id()"
          [value]="value()"
          [disabled]="disabled()"
          (change)="onChangeEvent($event)"
          (blur)="onTouchedFn()"
        >
          @if (placeholder()) {
            <option value="" disabled>{{ placeholder() }}</option>
          }
          @for (opt of options(); track opt.value) {
            <option [value]="opt.value">{{ opt.label }}</option>
          }
        </select>
        <app-icon name="chevron-down" [size]="16" />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .ui-select {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .ui-select__label {
        font-size: 13px;
        font-weight: 600;
        color: var(--color-text);
      }
      .ui-select__wrap {
        position: relative;
      }
      select {
        appearance: none;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 12px 40px 12px 14px;
        font-size: 15px;
        color: var(--color-text);
        width: 100%;
        cursor: pointer;
        transition: all var(--duration-base) var(--ease-out);
      }
      select:hover:not(:disabled) {
        border-color: var(--color-border-strong);
      }
      select:focus-visible {
        outline: none;
        border-color: var(--color-amber);
        box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.16);
      }
      app-icon {
        position: absolute;
        inset-inline-end: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--color-muted);
        pointer-events: none;
      }
    `,
  ],
})
export class UiSelectComponent implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly options = input.required<UiSelectOption[]>();
  readonly id = input<string>(`ui-select-${++selectId}`);

  protected readonly value = signal<string>('');
  protected readonly disabled = signal<boolean>(false);

  private onChange: (val: string) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  writeValue(v: string): void {
    this.value.set(v ?? '');
  }
  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(d: boolean): void {
    this.disabled.set(d);
  }

  protected onChangeEvent(e: Event): void {
    const v = (e.target as HTMLSelectElement).value;
    this.value.set(v);
    this.onChange(v);
  }
}

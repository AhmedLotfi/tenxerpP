import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let inputId = 0;

@Component({
  selector: 'ui-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="ui-input">
      @if (label()) {
        <label [for]="id()" class="ui-input__label">{{ label() }}</label>
      }
      <input
        [id]="id()"
        [type]="type()"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.autocomplete]="autocomplete() || null"
        [attr.aria-invalid]="hasError() || null"
        [attr.aria-describedby]="hasError() ? id() + '-err' : null"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />
      @if (hasError() && error()) {
        <p [id]="id() + '-err'" class="ui-input__error" role="alert">{{ error() }}</p>
      } @else if (hint()) {
        <p class="ui-input__hint">{{ hint() }}</p>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .ui-input {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .ui-input__label {
        font-size: 13px;
        font-weight: 600;
        color: var(--color-text);
        letter-spacing: -0.005em;
      }
      input {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 12px 14px;
        font-size: 15px;
        color: var(--color-text);
        transition: all var(--duration-base) var(--ease-out);
        width: 100%;
      }
      input::placeholder {
        color: var(--color-muted);
      }
      input:hover:not(:disabled) {
        border-color: var(--color-border-strong);
      }
      input:focus-visible {
        outline: none;
        border-color: var(--color-amber);
        box-shadow: 0 0 0 4px rgba(7, 119, 101, 0.16);
      }
      input[aria-invalid='true'] {
        border-color: var(--color-danger);
      }
      .ui-input__error {
        font-size: 12px;
        color: var(--color-danger);
        margin: 0;
      }
      .ui-input__hint {
        font-size: 12px;
        color: var(--color-muted);
        margin: 0;
      }
    `,
  ],
})
export class UiInputComponent implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly hint = input<string>('');
  readonly error = input<string>('');
  readonly autocomplete = input<string>('');
  readonly id = input<string>(`ui-input-${++inputId}`);

  protected readonly value = signal<string>('');
  protected readonly disabled = signal<boolean>(false);

  readonly hasError = computed(() => !!this.error());

  private onChange: (val: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(v: string): void {
    this.value.set(v ?? '');
  }
  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(d: boolean): void {
    this.disabled.set(d);
  }

  protected onInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
  }

  protected onBlur(): void {
    this.onTouched();
  }
}

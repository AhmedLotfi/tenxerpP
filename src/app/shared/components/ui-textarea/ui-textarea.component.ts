import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let textareaId = 0;

@Component({
  selector: 'ui-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiTextareaComponent),
      multi: true,
    },
  ],
  template: `
    <div class="ui-textarea">
      @if (label()) {
        <label [for]="id()" class="ui-textarea__label">{{ label() }}</label>
      }
      <textarea
        [id]="id()"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        [rows]="rows()"
        [attr.aria-invalid]="hasError() || null"
        (input)="onInput($event)"
        (blur)="onBlur()"
      ></textarea>
      @if (hasError() && error()) {
        <p class="ui-textarea__error" role="alert">{{ error() }}</p>
      } @else if (hint()) {
        <p class="ui-textarea__hint">{{ hint() }}</p>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .ui-textarea {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .ui-textarea__label {
        font-size: 13px;
        font-weight: 600;
        color: var(--color-text);
      }
      textarea {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 12px 14px;
        font-size: 15px;
        line-height: 1.55;
        color: var(--color-text);
        transition: all var(--duration-base) var(--ease-out);
        resize: vertical;
        font-family: inherit;
      }
      textarea:hover:not(:disabled) {
        border-color: var(--color-border-strong);
      }
      textarea:focus-visible {
        outline: none;
        border-color: var(--color-amber);
        box-shadow: 0 0 0 4px rgba(237, 28, 58, 0.16);
      }
      textarea[aria-invalid='true'] {
        border-color: var(--color-danger);
      }
      .ui-textarea__error {
        font-size: 12px;
        color: var(--color-danger);
        margin: 0;
      }
      .ui-textarea__hint {
        font-size: 12px;
        color: var(--color-muted);
        margin: 0;
      }
    `,
  ],
})
export class UiTextareaComponent implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly hint = input<string>('');
  readonly error = input<string>('');
  readonly rows = input<number>(5);
  readonly id = input<string>(`ui-textarea-${++textareaId}`);

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
    const v = (e.target as HTMLTextAreaElement).value;
    this.value.set(v);
    this.onChange(v);
  }

  protected onBlur(): void {
    this.onTouched();
  }
}

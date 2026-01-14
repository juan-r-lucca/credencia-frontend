import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-c-input',
  templateUrl: './c-input.component.html',
  styleUrls: ['./c-input.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CInputComponent),
      multi: true
    }
  ]
})
export class CInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() hint: string = '';
  @Input() icon: string = '';
  @Input() fill: boolean = false;
  @Input() errorMessage: string = '';

  @Input() type: 'text' | 'password' | 'number' | 'email' | 'date' = 'text';
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;

  value: any = '';
  disabled: boolean = false;
  hidePassword: boolean = true;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor() {}

  get inputType(): string {
    if (this.type === 'password') {
      return this.hidePassword ? 'password' : 'text';
    }
    return this.type;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaskCpfCnpj]'
})
export class MaskCpfCnpjDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const value = event.target.value.replace(/\D/g, '');

    if (value.length <= 11) {
      event.target.value = this.maskCpf(value);
    } else {
      event.target.value = this.maskCnpj(value);
    }
  }

  private maskCpf(cpf: string): string {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length === 0) return '';
    if (cpf.length < 4) return cpf;
    if (cpf.length < 7) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length < 10) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;

    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
  }

  private maskCnpj(cnpj: string): string {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length === 0) return '';
    if (cnpj.length < 5) return cnpj;
    if (cnpj.length < 8) return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
    if (cnpj.length < 12) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
    if (cnpj.length < 14) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;

    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
  }
}

import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from './cep.service';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss']
})
export class CepComponent implements OnInit {

  private keyBoardKeyPressed;

  states = [
    { sign: 'AC', name: 'Acre', capital: 'Rio Branco' },
    { sign: 'AL', name: 'Alagoas', capital: 'Maceió' },
    { sign: 'AM', name: 'Amazonas', capital: 'Manaus' },
    { sign: 'AP', name: 'Amapá', capital: 'Macapá' },
    { sign: 'BA', name: 'Bahia', capital: 'Salvador' },
    { sign: 'CE', name: 'Ceará', capital: 'Fortaleza' },
    { sign: 'DF', name: 'Distrito Federal', capital: 'Brasília' },
    { sign: 'ES', name: 'Espírito Santo', capital: 'Vitória' },
    { sign: 'GO', name: 'Goiás', capital: 'Goiânia' },
    { sign: 'MA', name: 'Maranhão', capital: 'São Luis' },
    { sign: 'MG', name: 'Minas Gerais', capital: 'Belo Horizonte' },
    { sign: 'MS', name: 'Mato Grosso do Sul', capital: 'Campo Grande' },
    { sign: 'MT', name: 'Mato Grosso', capital: 'Cuiabá' },
    { sign: 'PA', name: 'Paraíba', capital: 'João Pessoa' },
    { sign: 'PE', name: 'Pernambuco', capital: 'Recife' },
    { sign: 'PI', name: 'Piauí', capital: 'Teresina' },
    { sign: 'PR', name: 'Paraná', capital: 'Curitiba' },
    { sign: 'RJ', name: 'Rio de Janeiro', capital: 'Rio de Janeiro' },
    { sign: 'RN', name: 'Rio Grande do Norte', capital: 'Natal' },
    { sign: 'RO', name: 'Rondônia', capital: 'Porto Velho' },
    { sign: 'RR', name: 'Roraima', capital: 'Boa Vista' },
    { sign: 'RS', name: 'Rio Grande do Sul', capital: 'Porto Alegre' },
    { sign: 'SC', name: 'Santa Catarina', capital: 'Florianópolis' },
    { sign: 'SE', name: 'Sergipe', capital: 'Aracajú' },
    { sign: 'SP', name: 'São Paulo', capital: 'São Paulo' },
    { sign: 'TO', name: 'Tocantins', capital: 'Palmas' }
  ];

  public cepForm: BehaviorSubject<FormGroup> = new BehaviorSubject(this.formBuilder.group({
    // tslint:disable-next-line: max-line-length
    cep: ['', Validators.compose([Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern(/^\d{5}-\d{3}$/)])],
    address: ['', Validators.required],
    state: [{ sign: '', name: '', capital: '' }, Validators.required],
  }));

  constructor(public readonly formBuilder: FormBuilder, private cepService: CepService) { }

  ngOnInit() { }

  @HostListener('document:keyup', ['$event']) handleDeleteKeyboardEvent(event: KeyboardEvent) {
    this.keyBoardKeyPressed = event.keyCode;
  }

  public searchDirectionByCep() {
    this.cepForm.pipe(debounceTime(100)).subscribe(cepForm => {
      if (this.cepForm.value.controls.cep.value.endsWith(' ')) {
        this.cepForm.value.controls.cep.setValue(this.cepForm.value.controls.cep.value.replace(' ', ''));
      }
      debugger
      // tslint:disable-next-line: max-line-length
      if ((this.cepForm.value.controls.cep.value.length >= 5 && this.cepForm.value.controls.cep.value.length <= 9) && !(this.keyBoardKeyPressed === 46 || this.keyBoardKeyPressed === 8)) {
        if (this.cepForm.value.controls.cep.value.length === 5) {
          this.cepForm.value.controls.cep.setValue(this.cepForm.value.controls.cep.value + '-');
        } else if (this.cepForm.value.controls.cep.value.indexOf('-') !== 5 && this.cepForm.value.controls.cep.value.length >= 6) {
          const value = this.cepForm.value.controls.cep.value;
          this.cepForm.value.controls.cep.setValue(value.substr(0, 5) + '-' + value.substr(5, value.length));
        }
      } else {
        const value = this.cepForm.value.controls.cep.value.split('-');
        if (value.length === 2) {
          if (this.cepForm.value.controls.cep.value.length > 5) {
            let newValue = value[0] + value[1];
            newValue = newValue.substr(0, 5) + '-' + newValue.substr(5, newValue.length);
            this.cepForm.value.controls.cep.setValue(newValue);
          } else if (this.cepForm.value.controls.cep.value.length === 5 && value[1] !== '') {
            this.cepForm.value.controls.cep.setValue(this.cepForm.value.controls.cep.value + '-');
          } else {
            this.cepForm.value.controls.cep.setValue(value[0] + value[1]);
          }
        } else {
          if (this.cepForm.value.controls.cep.value.length === 5 && !(this.keyBoardKeyPressed === 46 || this.keyBoardKeyPressed === 8)) {
            this.cepForm.value.controls.cep.setValue(this.cepForm.value.controls.cep.value + '-');
          } else if (this.cepForm.value.controls.cep.value.indexOf('-') !== 5 && this.cepForm.value.controls.cep.value.length >= 6) {
            const value = this.cepForm.value.controls.cep.value;
            this.cepForm.value.controls.cep.setValue(value.substr(0, 5) + '-' + value.substr(5, value.length));
          }
        }
      }
    });

    if (this.cepForm.value.controls.cep.invalid) {
      return;
    }

    this.cepService.getAddress(this.cepForm.value.controls.cep.value).subscribe(response => {
      this.cepForm.value.controls.address.setValue(response.logradouro);
    });
  }

  disableSearchButton(): boolean | void {
    // tslint:disable-next-line: max-line-length
    // return (this.cepForm.controls.cep.invalid && (this.cepForm.controls.address.invalid || this.cepForm.controls.state.invalid)) || (this.cepForm.controls.cep.valid && (this.cepForm.controls.address.valid || this.cepForm.controls.state.valid));
  }

}

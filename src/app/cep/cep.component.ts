import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CepService } from './cep.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss']
})
export class CepComponent implements OnInit {

  public alphanumericMask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  public lettersMask = 'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL';
  public lettersPattern = { 'L': { pattern: new RegExp(/^[a-zA-ZãõñáéíóúÁÉÍÓÚçÇ ]*$/), symbol: 'L' } };
  public alphanumericPatterns = { 'X': { pattern: new RegExp(/^[a-zA-Z0-9ãõñáéíóúÁÉÍÓÚçÇ ]*$/), symbol: 'X' } };
  states = [
    'AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SC',
    'SE',
    'SP',
    'TO',
  ];

  public cepForm$: BehaviorSubject<FormGroup> = new BehaviorSubject(this.formBuilder.group({
    // tslint:disable-next-line: max-line-length
    pessoa: this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      sobrenome: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      nasc: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      profissao: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    }),
    direcao: this.formBuilder.group({
      cep: ['', Validators.required],
      logradouro: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      cidade: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      bairro: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      complemento: [''],
      uf: ['', Validators.required],
      referencia: ['']
    }),
  }));

  constructor(public readonly formBuilder: FormBuilder, private cepService: CepService) { }

  ngOnInit() { }

  public searchDirectionByCep() {
    if (this.cepForm$.value.controls.cep.invalid) {
      return;
    }
    this.cepService.getAddress(this.cepForm$.value.controls.cep.value).subscribe(response => {
      this.cepForm$.value.controls.logradouro.setValue(response.logradouro);
      this.cepForm$.value.controls.uf.setValue(response.uf);
    });
  }

  public saveForm() {
    this.cepService.saveForm(this.cepForm$.value.value).subscribe(response => {

    });
  }

  disableSearchButton(): boolean | void {
    // tslint:disable-next-line: max-line-length
    // return (this.cepForm.controls.cep.invalid && (this.cepForm.controls.address.invalid || this.cepForm.controls.state.invalid)) || (this.cepForm.controls.cep.valid && (this.cepForm.controls.address.valid || this.cepForm.controls.state.valid));
  }

}

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

  public addressMask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  public alphanumericPatterns = { 'X': { pattern: new RegExp(/^[a-zA-Z0-9ãõñáéíóúÁÉÍÓÚçÇ ]*$/), symbol: 'X' } };
  states = [
    { state: 'AC', name: 'Acre', capital: 'Rio Branco' },
    { state: 'AL', name: 'Alagoas', capital: 'Maceió' },
    { state: 'AM', name: 'Amazonas', capital: 'Manaus' },
    { state: 'AP', name: 'Amapá', capital: 'Macapá' },
    { state: 'BA', name: 'Bahia', capital: 'Salvador' },
    { state: 'CE', name: 'Ceará', capital: 'Fortaleza' },
    { state: 'DF', name: 'Distrito Federal', capital: 'Brasília' },
    { state: 'ES', name: 'Espírito Santo', capital: 'Vitória' },
    { state: 'GO', name: 'Goiás', capital: 'Goiânia' },
    { state: 'MA', name: 'Maranhão', capital: 'São Luis' },
    { state: 'MG', name: 'Minas Gerais', capital: 'Belo Horizonte' },
    { state: 'MS', name: 'Mato Grosso do Sul', capital: 'Campo Grande' },
    { state: 'MT', name: 'Mato Grosso', capital: 'Cuiabá' },
    { state: 'PA', name: 'Paraíba', capital: 'João Pessoa' },
    { state: 'PE', name: 'Pernambuco', capital: 'Recife' },
    { state: 'PI', name: 'Piauí', capital: 'Teresina' },
    { state: 'PR', name: 'Paraná', capital: 'Curitiba' },
    { state: 'RJ', name: 'Rio de Janeiro', capital: 'Rio de Janeiro' },
    { state: 'RN', name: 'Rio Grande do Norte', capital: 'Natal' },
    { state: 'RO', name: 'Rondônia', capital: 'Porto Velho' },
    { state: 'RR', name: 'Roraima', capital: 'Boa Vista' },
    { state: 'RS', name: 'Rio Grande do Sul', capital: 'Porto Alegre' },
    { state: 'SC', name: 'Santa Catarina', capital: 'Florianópolis' },
    { state: 'SE', name: 'Sergipe', capital: 'Aracajú' },
    { state: 'SP', name: 'São Paulo', capital: 'São Paulo' },
    { state: 'TO', name: 'Tocantins', capital: 'Palmas' }
  ];

  public cepForm: BehaviorSubject<FormGroup> = new BehaviorSubject(this.formBuilder.group({
    // tslint:disable-next-line: max-line-length
    cep: ['', Validators.required],
    address: ['', Validators.compose([Validators.required])],
    state: ['', Validators.required],
  }));

  constructor(public readonly formBuilder: FormBuilder, private cepService: CepService) { }

  ngOnInit() { }

  public searchDirectionByCep() {
    if (this.cepForm.value.controls.cep.invalid) {
      return;
    }
    this.cepService.getAddress(this.cepForm.value.controls.cep.value).subscribe(response => {
      this.cepForm.value.controls.address.setValue(response.logradouro);
      this.cepForm.value.controls.state.setValue(response.uf);
    });
  }

  public saveForm() {
    this.cepService.saveForm(this.cepForm.value.value).subscribe(response => {

    });
  }

  disableSearchButton(): boolean | void {
    // tslint:disable-next-line: max-line-length
    // return (this.cepForm.controls.cep.invalid && (this.cepForm.controls.address.invalid || this.cepForm.controls.state.invalid)) || (this.cepForm.controls.cep.valid && (this.cepForm.controls.address.valid || this.cepForm.controls.state.valid));
  }

}

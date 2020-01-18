import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from './cep.service';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss']
})
export class CepComponent implements OnInit {

  public address;
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

  public cepForm;
  constructor(public readonly formBuilder: FormBuilder, private cepService: CepService) { }

  ngOnInit() {
    this.cepForm = this.formBuilder.group(
      {
        cep: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
        address: ['', Validators.required],
        state: [{ sign: '', name: '', capital: '' }, Validators.required],
      }
    );
  }

  search() {
    let formValue;
    if (this.cepForm.controls.cep.valid) {
      formValue = this.cepForm.value.cep;
    } else {
      formValue = this.cepForm.value.state.sign + '/' + this.cepForm.value.state.capital + '/' + this.cepForm.value.address;
    }
    this.cepService.getAddress(formValue).subscribe(response => {
      this.address = response;
    });
  }

  disableSearchButton(): boolean | void {
    // return (this.cepForm.controls.cep.invalid && (this.cepForm.controls.address.invalid || this.cepForm.controls.state.invalid)) || (this.cepForm.controls.cep.valid && (this.cepForm.controls.address.valid || this.cepForm.controls.state.valid));
  }

}

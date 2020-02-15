import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from './cadastro.service';
import { BehaviorSubject } from 'rxjs';
import { Cadastro } from './cadastro';
import { Validator } from 'cpf-rg-validator';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public device$ = new BehaviorSubject(false);
  startDate = new Date();
  public alphanumericMask = 'X{60}';
  public lettersMask = 'L{50}';
  public lettersPattern = { 'L': { pattern: new RegExp(/^[a-zA-ZãõñáéíóúÁÉÍÓÚçÇ ]*$/), symbol: 'L' } };
  public alphanumericPatterns = { 'X': { pattern: new RegExp(/^[a-zA-Z0-9ãõñáéíóúÁÉÍÓÚçÇ ]*$/), symbol: 'X' } };
  public states = [
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
      cpf: ['', Validators.compose([Validators.required, this.validateBrService.cpf])],
      rg: ['', Validators.compose([Validators.required])],
      oe: ['', Validators.required],
      profissao: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      salario: ['', Validators.required],
      marcar: [{ value: this.startDate, disabled: true }, Validators.required],
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
  @ViewChild('nomeInput', { static: true }) nomeInput;

  constructor(
    public readonly formBuilder: FormBuilder,
    private readonly cadastroService: CadastroService,
    private readonly validateBrService: ValidateBrService
  ) { }

  ngOnInit() { this.nomeInput.nativeElement.focus(); }

  public searchDirectionByCep() {
    if (this.cepForm$.value.controls.direcao['controls'].cep.invalid) {
      return;
    }
    this.cadastroService.getAddress(this.cepForm$.value.controls.direcao.value.cep).subscribe(response => {
      this.cepForm$.value.controls.direcao['controls'].logradouro.setValue(response.logradouro);
      this.cepForm$.value.controls.direcao['controls'].uf.setValue(response.uf);
      this.cepForm$.value.controls.direcao['controls'].cidade.setValue(response.localidade);
      this.cepForm$.value.controls.direcao['controls'].complemento.setValue(response.complemento);
      this.cepForm$.value.controls.direcao['controls'].bairro.setValue(response.bairro);
    });
  }

  public saveForm() {
    const CADASTRO: Cadastro = {
      pessoa: this.cepForm$.value.controls.pessoa.value,
      direcao: this.cepForm$.value.controls.direcao.value
    };
    this.cadastroService.saveForm(CADASTRO).subscribe(response => {

    });
  }
}

//  rever data picker

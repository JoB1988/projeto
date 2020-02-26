import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CadastroService } from './cadastro.service';
import { BehaviorSubject } from 'rxjs';
import { Cadastro } from './cadastro';
import { ValidateBrService } from 'angular-validate-br';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {


  public prefix = '';
  public salaryMask = '0{10}';
  public lettersMask = 'L{50}';
  public alphanumericMask = 'X{60}';
  public lettersPatterns = { 'L': { pattern: new RegExp(/^[a-zA-ZãõñáéíóúÁÉÍÓÚçÇ ]*$/), symbol: 'L' } };
  public alphanumericPatterns = { 'X': { pattern: new RegExp(/^[a-zA-Z0-9ãõñáéíóúÁÉÍÓÚçÇºª ]*$/), symbol: 'X' } };
  public startDate;
  public status$ = new BehaviorSubject(undefined);
  public device$ = new BehaviorSubject(false);
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

  @ViewChild('nomeInput', { static: true }) nomeInput;

  public cepForm$: BehaviorSubject<FormGroup> = new BehaviorSubject(this.formBuilder.group({
    // tslint:disable-next-line: max-line-length
    pessoa: this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      sobrenome: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      nasc: ['', Validators.required],
      cpf: ['', Validators.compose([Validators.required, this.validateBrService.cpf])],
      rg: ['', Validators.required],
      oe: ['', Validators.required],
      profissao: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      salario: ['', Validators.required],
      marcar: [{ value: new Date().toISOString().split('T')[0], disabled: false }, Validators.required],
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

  constructor(
    public readonly formBuilder: FormBuilder,
    private readonly cadastroService: CadastroService,
    private readonly validateBrService: ValidateBrService,
    private readonly spinner: NgxSpinnerService,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.nomeInput.nativeElement.focus();
  }

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
    this.status$.next('Salvando');
    this.spinner.show();
    const CADASTRO: Cadastro = {
      pessoa: this.cepForm$.value.controls.pessoa.value,
      direcao: this.cepForm$.value.controls.direcao.value
    };
    this.cadastroService.saveForm(CADASTRO).subscribe((response) => {

    }, (error) => {
      this.spinner.hide();
      this.snackBar.open('Error', 'ok', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'right' });
    }, () => {
      this.spinner.hide();
      this.snackBar.open('Sucesso', 'ok', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'right' });
    });
  }

  public salaryInput(focus) {
    if (this.prefix && this.cepForm$.value.controls.pessoa['controls'].salario.invalid) {
      this.prefix = '';
    } else {
      this.prefix = 'R$ ';
      if (!focus) {
        const COLON = this.cepForm$.value.controls.pessoa.value.salario.indexOf(',');
        const VALUE = this.cepForm$.value.controls.pessoa['controls'].salario.value;
        if (COLON === -1) {
          this.cepForm$.value.controls.pessoa['controls'].salario.setValue(VALUE + ',00');
        } else {
          const LENGTH = this.cepForm$.value.controls.pessoa['controls'].salario.value.length;
          if (LENGTH - COLON === 1) {
            this.cepForm$.value.controls.pessoa['controls'].salario.setValue(VALUE + '00');
          } else if (LENGTH - COLON === 2) {
            this.cepForm$.value.controls.pessoa['controls'].salario.setValue(VALUE + '0');
          }
        }
      }
    }
  }
}

//  rever data picker

import { TestBed } from "@angular/core/testing";

import { CadastroService } from "./cadastro.service";
import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of, defer, throwError } from "rxjs";
import { Cadastro } from './cadastro';
import {  } from 'rxjs';

const CADASTRO: Cadastro = {
  pessoa: {
    nome: "nome",
    sobrenome: "sobrenome",
    nascimento: new Date(),
    cpf: "36419155894",
    rg: "479062870",
    profissao: "Front End"
  },
  direcao: {
    cep: '09890430',
    logradouro: 'Rua Professor Rubião Meira',
    cidade: 'São Bernardo do Campo',
    bairro: 'Planalto',
    complemento: 'Vl Washington',
    referencia: '',
    uf: 'SP'
  }
};

fdescribe("CadastroService", () => {
  let httpClientSpy;
  let service: CadastroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj(`HttpClient`, [`post`, `get`]);
    service = new CadastroService(httpClientSpy as any);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`should test getAddress success`, () => {
    httpClientSpy.get.and.returnValue(of({}));
    service.getAddress(`fakeurl`).subscribe(response => {
      expect(response).toEqual({});
    });
  });

  it(`should test saveForm success`, () => {
    httpClientSpy.post.and.returnValue(of({}));
    service.saveForm(CADASTRO).subscribe(response => {
      expect(response).toEqual({});
    });
  });

  it(`should test getAddress error`, () => {
    const ERRORRESPONSE = new HttpErrorResponse({
      error: `error 404 test`,
      status: 404,
      statusText: `error`
    });
    httpClientSpy.get.and.returnValue(throwError(ERRORRESPONSE));
    service.getAddress(`09890430`).subscribe(response => {
      fail("error expected");
    }),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(`test 404 error`);
      };
  });

  it(`should test saveForm error`, () => {
    const ERRORRESPONSE = new HttpErrorResponse({
      error: `error 404 test`,
      status: 404,
      statusText: `error`
    });
    httpClientSpy.post.and.returnValue(throwError(ERRORRESPONSE));
    service.saveForm(CADASTRO).subscribe((response) => {
      fail("error expected");
    }), (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(`test 404 error`);
      };
  });

});

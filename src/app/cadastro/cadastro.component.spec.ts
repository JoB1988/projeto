import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CadastroComponent } from "./cadastro.component";
import { SharedModule } from "../shared/shared.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule, IConfig } from "ngx-mask";
import {
  MatIconModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatOptionModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule
} from "@angular/material";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CadastroService } from './cadastro.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = undefined;

describe("CepComponent", () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let service: CadastroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        NgxMaskModule.forRoot(options),
        NgxSpinnerModule,
        HttpClientModule,
        BrowserAnimationsModule
      ], providers:[CadastroService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

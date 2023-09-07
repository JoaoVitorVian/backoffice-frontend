import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { CadastroPessoaComponent } from './components/pessoas/pessoas.component';
import { ListaPessoasComponent } from './components/lista-pessoas/lista-pessoas.component';
import { ListaDepartamentoComponent } from './components/lista-departamento/lista-departamento.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentosComponent,
    CadastroPessoaComponent,
    ListaPessoasComponent,
    ListaDepartamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

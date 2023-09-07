import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPessoaComponent } from './components/pessoas/pessoas.component';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { ListaPessoasComponent } from './components/lista-pessoas/lista-pessoas.component';
import { ListaDepartamentoComponent } from './components/lista-departamento/lista-departamento.component';

const routes: Routes = [
  { path: '', redirectTo: 'cadastro-pessoa', pathMatch: 'full' },
  { path: 'cadastro-pessoa', component: CadastroPessoaComponent },
  { path: 'cadastro-departamento', component: DepartamentosComponent },
  { path: 'lista-pessoas', component: ListaPessoasComponent },
  { path: 'lista-departamento', component: ListaDepartamentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

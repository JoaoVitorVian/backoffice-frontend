import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from './../../services/department.api.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent {
  departamentoForm: FormGroup;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;
  @Input() departamento: any;

  constructor(private fb: FormBuilder, private DepartmentService: DepartmentService) {
    this.departamentoForm = this.fb.group({
      nomeDepartamento: ['', Validators.required],
      nomeResponsavel: ['']
    });
  }
  ngOnInit(): void {
    if (this.departamento) {
      this.departamentoForm.patchValue({
        nomeDepartamento: this.departamento.nomeDepartamento,
        nomeResponsavel: this.departamento.nomeResponsavel
      });
    }
  }

  atualizarDepartamento(): void {
    const dadosAtualizados = this.departamentoForm.value;
    const id = this.departamento.id;
    this.DepartmentService.editarDepartamento(id, dadosAtualizados).subscribe(
      (response) => {
        console.log('Departamento atualizado com sucesso!', response);
        this.mensagemSucesso = 'Departamento atualizado com sucesso.';
        this.mensagemErro = null;
      },
      (error) => {
        console.error('Erro ao atualizar Departamento:', error);
        this.mensagemErro = 'Erro ao atualizar Departamento. Por favor, tente novamente.';
        this.mensagemSucesso = null;
      }
    );
  }

  cadastrarDepartamento() {
    const novoDepartamento = this.departamentoForm.value;
    const departamentoData = {
      nomeDepartamento: novoDepartamento.nomeDepartamento,
      nomeResponsavel: novoDepartamento.nomeResponsavel
    };

    this.DepartmentService.cadastrarDepartamento(departamentoData).subscribe(
      (res) => {
        console.log('Departamento cadastrado com sucesso!', res);
        this.mensagemSucesso = 'Departamento cadastrado com sucesso.';
        this.mensagemErro = null;
      },
      (error) => {
        console.error('Erro ao cadastrar departamento:', error);
        this.mensagemErro = 'Erro ao cadastrar departamento. Por favor, tente novamente.';
        this.mensagemSucesso = null;
      }
    );
  }

}

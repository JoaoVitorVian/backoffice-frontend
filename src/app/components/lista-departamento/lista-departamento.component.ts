import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { DepartamentosComponent } from '../departamentos/departamentos.component';

@Component({
  selector: 'app-lista-departamento',
  templateUrl: './lista-departamento.component.html',
  styleUrls: ['./lista-departamento.component.css']
})
export class ListaDepartamentoComponent {
  departamentos: any[] = [];
  modalRef: NgbModalRef | undefined;
  departamentoIdParaEditar: any;

  constructor(private apiService: ApiService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.carregarDepartamento();
  }

  carregarDepartamento(): void {
    this.apiService.obterDepartamento().subscribe(
      (response) => {
        this.departamentos = response.data;
      },
      (error) => {
        console.error('Erro ao obter Departamento:', error);
      }
    );
  }

  editarDepartamento(departamento: any): void {
    this.departamentoIdParaEditar = departamento.id;

    this.modalRef = this.modalService.open(DepartamentosComponent, { size: 'lg' });
    this.modalRef.componentInstance.departamento = departamento;

    this.modalRef.result.then(
      (result) => {
        if (result === 'success') {
          if (this.departamentoIdParaEditar !== null) {
            this.apiService.editarDepartamento(this.departamentoIdParaEditar, departamento).subscribe(
              (response) => {
                console.log('departamento atualizado com sucesso!', response);
                this.carregarDepartamento();

              },
              (error) => {
                console.error('Erro ao atualizar departamento:', error);
              }
            );
          }
        }
      },
      (reason) => {
        if (this.modalRef) {
          this.modalRef.close('success');
        }
      }
    );
  }

  excluirDepartamento(departamento: any): void {
    this.apiService.excluirDepartamento(departamento.id).subscribe(
      (response) => {
        this.carregarDepartamento();
        console.log('Departamento excluído com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao excluir departamento:', error);
      }
    );
  }
}

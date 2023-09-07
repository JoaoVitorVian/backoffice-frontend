import { Component, OnInit } from '@angular/core';
import { CadastroPessoaComponent } from '../pessoas/pessoas.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.css']
})
export class ListaPessoasComponent implements OnInit {
  pessoas: any[] = [];
  modalRef: NgbModalRef | undefined;
  pessoaIdParaEditar: any;

  constructor(private apiService: ApiService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.apiService.obterPessoas().subscribe(
      (response) => {
        this.pessoas = response.data;
      },
      (error) => {
        console.error('Erro ao obter pessoas:', error);
      }
    );
  }

  editarPessoa(pessoa: any): void {
    this.pessoaIdParaEditar = pessoa.id;

    this.modalRef = this.modalService.open(CadastroPessoaComponent, { size: 'lg' });
    this.modalRef.componentInstance.pessoa = pessoa;

    this.modalRef.result.then(
      (result) => {
        if (result === 'success') {
          if (this.pessoaIdParaEditar !== null) {
            this.apiService.editarPessoa(this.pessoaIdParaEditar, pessoa).subscribe(
              (response) => {
                console.log('Pessoa atualizada com sucesso!', response);
                this.carregarPessoas();
              },
              (error) => {
                console.error('Erro ao atualizar pessoa:', error);
              }
            );
          }
        }
      },
      (reason) => {
      }
    );
  }


  excluirPessoa(pessoa: any): void {
    this.apiService.excluirPessoa(pessoa.id).subscribe(
      (response) => {
        this.carregarPessoas();
        console.log('Pessoa excluída com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao excluir pessoa:', error);
      }
    );
  }
}

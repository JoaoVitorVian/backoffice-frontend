import { Component, OnInit ,ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { UserService } from 'src/app/services/users.api.service';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})

export class CadastroPessoaComponent implements OnInit {
  pessoaForm: FormGroup;
  @Input() pessoa: any;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;

  @ViewChild('cepInput')
  cepInput!: ElementRef;

  constructor(private formBuilder: FormBuilder, private apiService: UserService) {
    this.pessoaForm = this.formBuilder.group({
      tipoDePessoa: ['', Validators.required],
      documento: ['', Validators.required],
      name: ['', Validators.required],
      apelido: [''],
      cep: [''],
      localidade: [''],
      bairro: [''],
      qualificacoes: ['']
    });
  }

  ngOnInit(): void {
    if (this.pessoa) {
      this.pessoaForm.patchValue({
        tipoDePessoa: this.pessoa.tipoDePessoa,
        documento: this.pessoa.documento,
        name: this.pessoa.name,
        apelido: this.pessoa.apelido,
        cep: this.pessoa.cep,
        localidade: this.pessoa.localidade,
        bairro: this.pessoa.bairro,
        qualificacoes: this.pessoa.qualificacoes
      });
    }
  }

  cadastrarPessoa(): void {
    const novaPessoa = this.pessoaForm.value;
    const pessoaData = {
      tipoDePessoa: novaPessoa.tipoDePessoa,
      documento: novaPessoa.documento,
      name: novaPessoa.name,
      apelido: novaPessoa.apelido,
      localidade: novaPessoa.localidade,
      cep: novaPessoa.cep,
      bairro: novaPessoa.bairro,
      qualificacoes: novaPessoa.qualificacoes
    };
    this.apiService.cadastrarPessoa(pessoaData).subscribe(
      (res) => {
        console.log('Pessoa cadastrada com sucesso!', res);
        this.mensagemSucesso = 'Pessoa cadastrada com sucesso.';
        this.mensagemErro = null;
      },
      (error) => {
        console.error('Erro ao cadastrar pessoa:', error);
        this.mensagemErro = 'Erro ao cadastrar pessoa. Por favor, tente novamente.';
        this.mensagemSucesso = null;
      }
    );
  }

  atualizarPessoa(): void {
    const dadosAtualizados = this.pessoaForm.value;
    const id = this.pessoa.id;
    this.apiService.editarPessoa(id, dadosAtualizados).subscribe(
      (response) => {
        console.log('Pessoa atualizada com sucesso!', response);
        this.mensagemSucesso = 'Pessoa atualizada com sucesso.';
        this.mensagemErro = null;
      },
      (error) => {
        console.error('Erro ao atualizar pessoa:', error);
        this.mensagemErro = 'Erro ao atualizar pessoa. Por favor, tente novamente.';
        this.mensagemSucesso = null;
      }
    );
  }

  consultarCEP(): void {
    const cep = this.cepInput.nativeElement.value;
    if (cep) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const data = response.data;
          this.pessoaForm.patchValue({
            localidade: data.localidade,
            bairro: data.bairro,
          });
        })
        .catch((error) => {
          console.error('Erro ao consultar CEP:', error);
        });
    }
  }
}

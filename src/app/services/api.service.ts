import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:44329';

  constructor(private http: HttpClient) {}

  cadastrarPessoa(pessoaData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/users/create`, pessoaData);
  }

  cadastrarDepartamento(departamentoData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/users/create-departamento`, departamentoData);
  }

  obterPessoas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/users/getAll`);
  }

  obterDepartamento(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/users/departamento/getAll`);
  }

  obterPessoaPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/users/getById/${id}`);
  }

  editarPessoa(id: number, dadosAtualizados: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/users/update/${id}`, dadosAtualizados);
  }

  editarDepartamento(id: number, dadosAtualizados: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/users/update-departamento/${id}`, dadosAtualizados);
  }

  excluirPessoa(id: number): Observable<any> {
    const url = `${this.baseUrl}/api/v1/users/remove/${id}`;
    return this.http.delete(url);
  }

  excluirDepartamento(id: number): Observable<any> {
    const url = `${this.baseUrl}/api/v1/users/remove-departamento/${id}`;
    return this.http.delete(url);
  }
}

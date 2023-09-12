import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:44329';

  constructor(private http: HttpClient) {}

  cadastrarPessoa(pessoaData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/users/create-users`, pessoaData);
  }

  obterPessoas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/users/getAll`);
  }

  obterPessoaPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/users/getById/${id}`);
  }

  editarPessoa(id: number, dadosAtualizados: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/users/update-users/${id}`, dadosAtualizados);
  }

  excluirPessoa(id: number): Observable<any> {
    const url = `${this.baseUrl}/api/v1/users/remove-users/${id}`;
    return this.http.delete(url);
  }
}

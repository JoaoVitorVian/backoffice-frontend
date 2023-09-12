import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = 'https://localhost:44329';

  constructor(private http: HttpClient) {}

  cadastrarDepartamento(departamentoData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/departamento/create-departamento`, departamentoData);
  }

  obterDepartamento(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/departamento/getAll`);
  }

  editarDepartamento(id: number, dadosAtualizados: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/departamento/update-departamento/${id}`, dadosAtualizados);
  }

  excluirDepartamento(id: number): Observable<any> {
    const url = `${this.baseUrl}/api/v1/departamento/remove-departamento/${id}`;
    return this.http.delete(url);
  }
}

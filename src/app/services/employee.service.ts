import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7287/api/Employees'; // API URL
  private reportUrl = 'https://localhost:7287/api/Report'; // Report API URL

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  generateReport(reportName: string, format: string): Observable<Blob> {
    return this.http.get(`${this.reportUrl}/generate?reportName=${reportName}&format=${format}`, { responseType: 'blob' });
  }

  previewReport(reportName: string): Observable<Blob> {
    return this.http.get(`${this.reportUrl}/preview?reportName=${reportName}`, { responseType: 'blob' });
  }
}
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { AssemblyLine } from '../models/AssemblyLine';


@Injectable({
  providedIn: 'root'
})
export class AssemblyLineService {

  private url = "http://localhost:3000/assembly-lines";

  httpOptions: {headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  fetchAll(): Observable<AssemblyLine[]> {
    return this.http
    .get<AssemblyLine[]>(this.url, {responseType: "json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<AssemblyLine[]>("fetchAll", []))
    );
  }

  addAssemblyLine(formData: Partial<AssemblyLine>): Observable<AssemblyLine> {
    return this.http
    .post<AssemblyLine>(this.url, {name: formData.name}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<AssemblyLine>("addAssemblyLine"))
    );
  }

  deleteAssemblyLine(assemblyLineId: number): Observable<{}> {
    return this.http
    .delete<AssemblyLine>(`${this.url}/${assemblyLineId}`, this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<AssemblyLine>("deleteAssemblyLine"))
    )
  }
}
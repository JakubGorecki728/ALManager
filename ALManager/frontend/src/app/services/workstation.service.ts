import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';

import { Post } from "../models/Post";
import { User } from "../models/User";
import { ErrorHandlerService } from './error-handler.service';
import { Workstation } from '../models/Workstation';

@Injectable({
  providedIn: 'root'
})
export class WorkstationService {
  private url = "http://localhost:3000/workstations";

  httpOptions: {headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  fetchAll(): Observable<Workstation[]> {
    return this.http
    .get<Workstation[]>(this.url, {responseType: "json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Workstation[]>("fetchAll", []))
    );
  }

  addWorkstation(formData: Partial<Workstation>): Observable<Workstation> {
    return this.http
    .post<Workstation>(this.url, {short_name: formData.short_name, name: formData.name, pc_name: formData.pc_name}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Workstation>("addWorkstation"))
    );
  }

  deleteWorkstation(workstationId: number): Observable<{}> {
    return this.http
    .delete<Workstation>(`${this.url}/${workstationId}`, this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Workstation>("deleteWorkstation"))
    )
  }
}

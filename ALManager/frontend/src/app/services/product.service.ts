import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';

import { Post } from "../models/Post";
import { User } from "../models/User";
import { ErrorHandlerService } from './error-handler.service';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "http://localhost:3000/products";

  httpOptions: {headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  fetchAll(): Observable<Product[]> {
    return this.http
    .get<Product[]>(this.url, {responseType: "json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Product[]>("fetchAll", []))
    );
  }

  addProduct(formData: Partial<Product>): Observable<Product> {
    return this.http
    .post<Product>(this.url, {name: formData.name}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Product>("addProduct"))
    );
  }

  deleteProduct(productId: number): Observable<{}> {
    return this.http
    .delete<Product>(`${this.url}/${productId}`, this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Product>("deleteProduct"))
    )
  }
}

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/User';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products$!: Observable<Product[]>;
  userId!: Pick<User, "id">;

  constructor (private productService: ProductService, private authService: AuthService) {}

  ngOnInit(): void {
    this.products$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<Product[]> {
    return this.productService.fetchAll();
  }

  addProduct(): void {
    this.products$ = this.fetchAll();
  }

  delete(productId: number): void {
    this.productService
    .deleteProduct(productId)
    .subscribe(() => (this.products$ = this.fetchAll()));
  }

} 
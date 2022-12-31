import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Post } from 'src/app/models/Post';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { ProductsComponent } from '../products/products.component';

import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  @ViewChild("formDirective") formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;

  constructor(private authService: AuthService,
    private productService: ProductService) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(1)]),
    })
  }

  onSubmit(formData: Pick<Product, "name">): void {
    this.productService
    .addProduct(formData)
    .pipe(first())
    .subscribe(() => {
      this.create.emit(null);
    })
    this.form.reset();
    this.formDirective.resetForm();
  }
}

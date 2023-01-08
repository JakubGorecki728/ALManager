import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AssemblyLineService } from 'src/app/services/assembly-line.service';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/User';
import { AssemblyLine } from 'src/app/models/AssemblyLine';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-assembly-lines',
  templateUrl: './assembly-lines.component.html',
  styleUrls: ['./assembly-lines.component.css']
})
export class AssemblyLinesComponent implements OnInit{
  assemblyLines$!: Observable<AssemblyLine[]>;
  userId!: Pick<User, "id">;
  products$!: Observable<Product[]>;
  productId!: any;
  productNamesAssoc!: string[];

  newName: string = "";

  constructor (
    private assemblyLineService: AssemblyLineService, 
    private authService: AuthService,
    private productService: ProductService,
    private matDialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.assemblyLines$ = this.fetchAll();
    this.userId = this.authService.userId;
    this.products$ = this.fetchAllProducts();
    this.productId = 0;
    this.productNamesAssoc = this.getProductNameAssocArray();
  }

  fetchAll(): Observable<AssemblyLine[]> {
    return this.assemblyLineService.fetchAll();
  }

  fetchAllProducts(): Observable<Product[]> {
    return this.productService.fetchAll();
  }


  getProductNameAssocArray(): string[] {
    let returnedArray: string[] = [];
    this.products$.forEach(function (array){
        array.forEach(function (innerArray) {
          returnedArray[innerArray.id] = innerArray.name;
        })
      })
      return returnedArray;
  }

  addAssemblyLine(): void {
    this.assemblyLines$ = this.fetchAll();
  }

  delete(assemblyLineId: number): void {
    this.assemblyLineService
    .deleteAssemblyLine(assemblyLineId)
    .subscribe(() => (this.assemblyLines$ = this.fetchAll()));
  }

  changeState(assemblyLineId: number): void {
    this.assemblyLineService
    .changeStateAssemblyLine(assemblyLineId)
    .subscribe(() => (this.assemblyLines$ = this.fetchAll()));
  }

  assignProduct(assemblyLineId: number, productId: number): void {
    this.assemblyLineService
    .assignProduct(assemblyLineId, productId)
    .subscribe(() => (this.assemblyLines$ = this.fetchAll()));
  }

  removeProductAssignment(assemblyLineId: number): void {
    this.assignProduct(assemblyLineId, 0);
  }

  rename(assemblyLineId: number, assemblyLineName: string): void {
    this.assemblyLineService
    .renameAssemblyLine(assemblyLineId, assemblyLineName)
    .subscribe(() => (this.assemblyLines$ = this.fetchAll()));
  }


  onOpenDialogClick(id: number, name: string){
    let dialogRef = this.matDialog.open(RenameDialogComponent,
      {
        data: {
          id: id,
          name: name,
        },
        disableClose: true
      }
      );
    dialogRef.afterClosed().subscribe(
      result => {
        this.rename(result.id, result.name);
      }
    )
  }

} 

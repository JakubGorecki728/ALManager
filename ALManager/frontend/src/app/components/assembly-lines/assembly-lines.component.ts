import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AssemblyLineService } from 'src/app/services/assembly-line.service';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/User';
import { AssemblyLine } from 'src/app/models/AssemblyLine';

@Component({
  selector: 'app-assembly-lines',
  templateUrl: './assembly-lines.component.html',
  styleUrls: ['./assembly-lines.component.css']
})
export class AssemblyLinesComponent implements OnInit{
  assemblyLines$!: Observable<AssemblyLine[]>;
  userId!: Pick<User, "id">;

  constructor (private assemblyLineService: AssemblyLineService, private authService: AuthService) {}

  ngOnInit(): void {
    this.assemblyLines$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<AssemblyLine[]> {
    return this.assemblyLineService.fetchAll();
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


} 

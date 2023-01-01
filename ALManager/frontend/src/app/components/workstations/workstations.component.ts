import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { WorkstationService } from 'src/app/services/workstation.service';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/User';
import { Workstation } from 'src/app/models/Workstation';

@Component({
  selector: 'app-workstations',
  templateUrl: './workstations.component.html',
  styleUrls: ['./workstations.component.css']
})
export class WorkstationsComponent implements OnInit{
  workstations$!: Observable<Workstation[]>;
  userId!: Pick<User, "id">;

  constructor (private workstationService: WorkstationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.workstations$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<Workstation[]> {
    return this.workstationService.fetchAll();
  }

  addWorkstation(): void {
    this.workstations$ = this.fetchAll();
  }

  delete(workstationId: number): void {
    this.workstationService
    .deleteWorkstation(workstationId)
    .subscribe(() => (this.workstations$ = this.fetchAll()));
  }

} 
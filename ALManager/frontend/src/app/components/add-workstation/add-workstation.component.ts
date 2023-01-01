import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Workstation } from 'src/app/models/Workstation';
import { WorkstationService } from 'src/app/services/workstation.service';

@Component({
  selector: 'app-add-workstation',
  templateUrl: './add-workstation.component.html',
  styleUrls: ['./add-workstation.component.css']
})
export class AddWorkstationComponent implements OnInit{
  @ViewChild("formDirective") formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;

  constructor(
    private workstationService: WorkstationService) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      short_name: new FormControl("", [Validators.required, Validators.minLength(1)]),
      name: new FormControl("", [Validators.required, Validators.minLength(1)]),
      pc_name: new FormControl("", [Validators.required, Validators.minLength(1)]),
    })
  }

  onSubmit(formData: Pick<Workstation, "short_name" | "name" | "pc_name">): void {
    this.workstationService
    .addWorkstation(formData)
    .pipe(first())
    .subscribe(() => {
      this.create.emit(null);
    })
    this.form.reset();
    this.formDirective.resetForm();
  }
}

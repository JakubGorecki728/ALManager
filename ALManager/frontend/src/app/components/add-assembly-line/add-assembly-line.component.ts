import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AssemblyLine } from 'src/app/models/AssemblyLine';
import { AssemblyLineService } from 'src/app/services/assembly-line.service';

@Component({
  selector: 'app-add-assembly-line',
  templateUrl: './add-assembly-line.component.html',
  styleUrls: ['./add-assembly-line.component.css']
})
export class AddAssemblyLineComponent implements OnInit{
  @ViewChild("formDirective") formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;

  constructor(
    private assemblyLineService: AssemblyLineService) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(1)]),
    })
  }

  onSubmit(formData: Pick<AssemblyLine, "name">): void {
    this.assemblyLineService
    .addAssemblyLine(formData)
    .pipe(first())
    .subscribe(() => {
      this.create.emit(null);
    })
    this.form.reset();
    this.formDirective.resetForm();
  }
}

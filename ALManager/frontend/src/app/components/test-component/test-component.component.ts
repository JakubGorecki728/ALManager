import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Workstation } from 'src/app/models/Workstation';
import { WorkstationService } from 'src/app/services/workstation.service';
import { Product } from 'src/app/models/Product';


@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent {
  @ViewChild("formDirective") formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;

  states = [
    {name: "Arizona", abbrev: "AZ"},
    {name: "California", abbrev: "CA"},
    {name: "Colorado", abbrev: "CO"},
    {name: "New York", abbrev: "NY"},
  ];

  constructor(
    private workstationService: WorkstationService) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      state: new FormControl(),
    })
  }

  onSubmit(): void {
    console.log("item selected: "+this.states)
  }
}

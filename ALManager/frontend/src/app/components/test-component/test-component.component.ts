import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';



@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent {
title = "test";

  constructor(private matDialog: MatDialog) {

  }


  onOpenDialogClick(){
    let dialogRef = this.matDialog.open(RenameDialogComponent,
      {
        data: {
          age: 1000,
          name: "king",
        },
        width: "500px",
        height: "500px",
        disableClose: true
      }
      );
    dialogRef.afterClosed().subscribe(
      result => {
        alert("data to get from dialog: " + result.name +" and " +result.age);
      }
    )
  }
}

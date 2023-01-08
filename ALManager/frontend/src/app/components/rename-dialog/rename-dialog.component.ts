import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.css']
})
export class RenameDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: 
  {
    id: number, 
    name: string
  },
  private matDialogRef: MatDialogRef<RenameDialogComponent>
  ){}

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.matDialogRef.close(this.data);
  }

  onCloseClick(){
    this.matDialogRef.close();
  }
}

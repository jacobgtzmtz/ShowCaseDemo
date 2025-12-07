import { DialogModule } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialogcomponent',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialogcomponent.html',
})
export class ConfirmDialogcomponent {

  private dialogRef = inject(MatDialogRef<ConfirmDialogcomponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModule){
  }


  /**
   * onNoClick
   */
  public onNoClick(): void {
    this.dialogRef.close(false);
  }


  /**
   * onYesClick
   */
  public onYesClick(): void {
    this.dialogRef.close(true);
  }


}

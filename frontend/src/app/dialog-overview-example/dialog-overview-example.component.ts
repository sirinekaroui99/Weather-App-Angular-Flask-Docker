import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component'; 

@Component({
  selector: 'app-dialog-overview-example',
  templateUrl: './dialog-overview-example.component.html',
  styleUrls: ['./dialog-overview-example.component.scss']
})

export class DialogOverviewExampleComponent {
  constructor(private matDialog:MatDialog){

  }
  openDialog(){
    this.matDialog.open(DialogBodyComponent,{
      width : '350px',
      height: '350px',
      position: {top: '100px' , left : '200px'}
    })
  }
}

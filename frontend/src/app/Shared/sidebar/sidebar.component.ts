import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/Models/user';
import { ServiceUserService } from 'src/app/Services/service-user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { ModalComponent } from 'src/app/modal/modal.component';
import { Compiler } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { Injector } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {  
  user!: User; 
constructor( private injector: Injector,private componentFactoryResolver: ComponentFactoryResolver, private serviceuser : ServiceUserService ,private modalService: NgbModal,private compiler: Compiler) {} 



//public open() {
//const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
 // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
 // const componentRef = componentFactory.create(this.injector);
 // modalRef.componentInstance.modalContent.createComponent(componentFactory, null, this.injector);}

//public onUpdateEmloyee(employee: User): void {
  //  this.serviceuser.update(employee).subscribe(
     // (response: User) => {
       // console.log(response);
      
     // },
     // (error: HttpErrorResponse) => {
      //  alert(error.message); } );} 


  //public onOpenModal(employee: User, mode: string): void {
  //  const container = document.getElementById('main-container')!;
  //  const button = document.createElement('button');
  //  button.type = 'button';
  //  button.style.display = 'none';
   // button.setAttribute('data-toggle', 'modal');
    
  //  if (mode === 'edit') {
  //    this.user = employee;
  //    button.setAttribute('data-target', '#updateEmployeeModal');
  //  }
   
   // container.appendChild(button);
   // button.click() } 

}
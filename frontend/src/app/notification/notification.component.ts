import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    
     public temp: number;
    constructor ( private route: ActivatedRoute){}
    ngOnInit(): void {
      
      const tempString: string | null = this.route.snapshot.paramMap.get('temp');
      if (tempString !== null) {
        this.temp = +tempString;
        console.log(this.temp);
        
        } 
}
}
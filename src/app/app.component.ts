import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfilePageService } from './profile-page/services/profile-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription: Subscription;
  public userData:any;
  constructor(private service: ProfilePageService,private router: Router) { }

  ngOnInit(): void {
    this.getUserData();
  }
 private getUserData(){
    let obj={}
    this.service.getUserData(obj).subscribe((res: any) => {
      console.log(res)
      this.userData=res[0];
      this.service.changeData(this.userData);
      this.router.navigateByUrl('/home');
    })
  }
  
}

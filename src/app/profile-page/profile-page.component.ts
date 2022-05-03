import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfilePageService } from './services/profile-page.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  subscription: Subscription;
  public edit :Boolean=false;
  public userData:any;
  constructor(private service: ProfilePageService) { }

  ngOnInit(): void {
    this.subscription = this.service.currentdata.subscribe(res =>{
      this.userData = res
    } )
  }
  
}

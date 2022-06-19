import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email:any;
  public password:any;

  constructor(
    public router:Router,
    public fireService:FireserviceService
  ) { }

  ngOnInit() {
  }


  login(){
    this.fireService.loginWithEmail({email:this.email,password:this.password}).then(res=>{
      console.log(res);
      if(res.user.uid){
        this.router.navigateByUrl('home');
      }
    })
  }

  signup(){
    this.router.navigateByUrl('signup');
  }
}

import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public email:any;
  public password:any;
  public name:any;
  constructor(
    public fireService:FireserviceService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  signup(){ 
   
    this.fireService.signup({email:this.email,password:this.password}).then(res=>{
      if(res.user.uid){
        let data = {
          email:this.email,
          password:this.password,
          name:this.name,
          uid:res.user.uid
        }
        this.fireService.saveDetails(data).then(res=>{
         alert('Conta Cadastrada!');
         this.router.navigateByUrl('');
        },err=>{
          console.log(err);
        })
      }
    },err=>{
      alert(err.message);

      console.log(err);
    })
  }


  login(){
    this.router.navigateByUrl('');
  }

}

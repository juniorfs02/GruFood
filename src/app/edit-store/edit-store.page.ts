import { FireserviceService } from './../fireservice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.page.html',
  styleUrls: ['./edit-store.page.scss'],
})
export class EditStorePage implements OnInit {

  isEdit: boolean;
  type: string;
  title: string;
  subTitle: string;
  amount: string;
  address: string;
  id: any;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireService: FireserviceService
  ) {
    this.route.params.subscribe((data:any) => {
      this.id = data.type;
      if(data.type == 'add'){
        this.isEdit = false;
      }else{
        this.isEdit = true;
        this.fireService.get_single_transaction(data.type).subscribe((data:any) => {
          console.log(data);
          this.type = data.type; 
          this.title = data.title; 
          this.subTitle = data.subTitle; 
          this.address = data.address; 
          this.amount = data.amount; 
        })      
      }
    }) 
   }

  ngOnInit() {
  }

  addTransaction(){
    this.loading = true;
    if(this.isEdit){
      this.updateTransaction();
      return;
    }
    let data = {
      type: this.type, 
      title: this.title, 
      subTitle: this.subTitle, 
      amount: this.amount, 
    }
    this.fireService.add_transaction(data).then((res:any) => {
      console.log(res);
      this.loading = false;
      this.router.navigateByUrl('/store')
    })
  }

  updateTransaction(){
    let data = {
      type: this.type, 
      title: this.title, 
      subTitle: this.subTitle, 
      address: this.address, 
      amount: this.amount, 
    }
    this.fireService.updateTransaction(this.id,data).then((res:any) => {
      console.log(res);
      this.router.navigateByUrl('/store');
    })
  }

}

import { FireserviceService } from './../fireservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  grufoodTransactions: any;
  constructor(
    public fireService:FireserviceService
  ) { 
     this.fireService.get_transactions().subscribe((res)  => {
      this.grufoodTransactions = res.map (e => {
        return {
          id: e.payload.doc.id,
          type: e.payload.doc.data()['type'],
          title: e.payload.doc.data()['title'],
          subTitle: e.payload.doc.data()['subTitle'],
          address: e.payload.doc.data()['address'],
          amount: e.payload.doc.data()['amount'],

        }
      })
      console.log(this.grufoodTransactions);
     },(err:any) => {
      console.log(err);
     })
  }

  ngOnInit() {
  }

  delete_transaction(transactionId){
    this.fireService.delete_transaction(transactionId).then((res:any) =>{
      console.log(res)
    })
  }

}

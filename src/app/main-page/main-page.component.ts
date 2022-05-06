import { Component, OnInit } from '@angular/core';
import { Article } from '../model/article';
import { Order } from '../model/order';
import { MainService } from '../service/main.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {


  order!: Order

  orderList: Order[] = []



  dateSelected!: any

  endDate!: any


  date1 = new Date()

  myDate = "2022-04-21"

  myDate1 = new DatePipe(this.myDate)

  currentYear = this.date1.getFullYear();
  currentMonth = this.date1.getMonth() + 1;
  currentDay = this.date1.getDate()

  citta!: any

  msg: string = '';

  clss: string = '';

  orderToUpdate = new Order()

  keyword = ""

  orderArticles:Article[] = []

  constructor(private service: MainService) { }

  ngOnInit(): void {

    this.showAllOrders()



  }


  showBySelectedDate() {



    if (this.endDate === undefined) {
      this.endDate = new Date()
    }

    this.service.findBetweenDates(new Date(this.dateSelected), new Date(this.endDate)).subscribe((data: Order[]) => {

      this.orderList = data

      

    });



  }



  showBykeyWord(keyword: string) {
    if (keyword != null) {
      this.service.findByKeyWord(keyword).subscribe((data: Order[]) => {

        this.orderList = data

        

      });

    }

  }




  updateOrder() {

    


    this.service.saveOrUpdate(this.orderToUpdate).subscribe((response: Order) => {

      console.log(response)

    })


  }



  edit(order: Order) {
    this.orderToUpdate = order
  }





  showAllOrders() {

    this.service.getOrders().subscribe((data: Order[]) => {


      this.orderList = data

      


    });



  }

  showProcessedOrders() {

    this.service.getProcessedOrders().subscribe((data: Order[]) => {

      this.orderList = data

    })


  }

  showPendingOrders() {
    this.service.getPendingOrders().subscribe((data: Order[]) => {

      this.orderList = data

    })

  }

  showErrorOrders() {

    this.service.getErrorOrders().subscribe((data: Order[]) => {

      this.orderList = data

    })


  }

  checkAllCheckBox(ev: any) {
    this.orderList.forEach(o => o.checked = ev.target.checked)
  }

  isAllCheckBoxChecked() {

    return this.orderList.every(o => o.checked);

  }


  proccesProducts() {

    const selectedOrders = this.orderList.filter(order => order.checked).map(o => o.id);

    



    if (selectedOrders && selectedOrders.length > 0) {

      this.service.proccesOrders(selectedOrders as number[])
        .subscribe(res => {

          this.clss = 'grn';
          this.msg = 'Products successfully deleted';
        }, err => {

          this.clss = 'rd';
          this.msg = 'Something went wrong during deleting products';
        }

        );
    } else {
      this.clss = 'rd';
      this.msg = 'You must select at least one product';
    }

  }

  checkListHasItems(): Boolean {

    const selectedOrders = this.orderList.filter(order => order.checked).map(o => o.id);

    if (!selectedOrders.length) {
      return false
    } else {
      return true
    }


  }

  notesAreBig(order: Order): Boolean {

    if (order.notes.length > 8) {
      return true
    } else {
      return false
    }

  }

  hasMoreArticles(order: Order): boolean {

    if (order.articleList.length > 1)
      return true
    else {
      return false
    }

  }

  showArticles(id:number){

    return this.service.getOrderById(id).subscribe((res)=>{

      this.order = res
      this.orderArticles = this.order.articleList
      console.log(this.orderArticles);
      
    })
    

    
    

  }

}

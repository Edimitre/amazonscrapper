import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Order } from '../model/order';




@Injectable({
  providedIn: 'root'
})

export class MainService {

 
  


  baseUrl:string = "http://localhost:8080/orders";

  constructor(private httpclient:HttpClient, public datepipe: DatePipe) { }



  getOrders(): Observable<Order[]> {
    
    return this.httpclient.get<Order[]>(this.baseUrl + "/all");
  
  }

  deleteOrder(id: number) {
    return this.httpclient.delete<Order>(this.baseUrl+"/delete/" + id);
  }

  getOrderById(id: number) {
    return this.httpclient.get<Order>(this.baseUrl+"/get/" + id);
  }

  getProcessedOrders(){

    return this.httpclient.get<Order[]>(this.baseUrl + "/processed");

  }

  getPendingOrders(){

    return this.httpclient.get<Order[]>(this.baseUrl + "/pending");

  }

  getErrorOrders(){

    return this.httpclient.get<Order[]>(this.baseUrl + "/error");

  }


  findBetweenDates(dataDa:Date, dataFine:Date): Observable <Order[]> {
    
    
    const url = this.baseUrl + "/get/date?";

    
    let params: string = '';
    params = 'dataDa=' ; 
    
    if (dataDa!=null && Commons.isValidDate(dataDa)){
        
      params += this.datepipe.transform(dataDa, 'yyyy-MM-dd');
      
    }

    let params2:string = '';
    params2 = 'dataFine=';


    if (dataFine != null && Commons.isValidDate(dataFine) && dataFine != undefined){
        
      
        
      params2 += this.datepipe.transform(dataFine, 'yyyy-MM-dd');
      
    }
    

    return this.httpclient.get<Order[]>(url + params +"&"+ params2);
  }

  
  findByKeyWord(keyword:string):Observable<Order[]>{

    const url = this.baseUrl + "/search?"
    let params= "keyword="

    if(keyword!=null){

      params += keyword
    }

    return this.httpclient.get<Order[]>(url + params)


  }

  saveOrUpdate(order:Order){

    
    const url = this.baseUrl + "/save";
      
      const options = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        responseType: 'text' as 'json'
      };

    return this.httpclient.post<Order>(url, order, options)



  }

  proccesOrders(ids: number[]) {
	  
		
    if (confirm("Are you sure to process selected orders ?")) {
      
      
      const data = {'ids' : ids};
      
      const url = this.baseUrl + "/processOrders";
      
      const options = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        responseType: 'text' as 'json'
      };
      
      const resp = this.httpclient.post<any>(url, data, options);
      
      console.log('resp: ' + resp);
      
      return resp;
      }
      
      return of({});
    }

  
		  
  
}

export class Commons {
  static  isValidDate(d:any) {
    return d instanceof Date;
  }}

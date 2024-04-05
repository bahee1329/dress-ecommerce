import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PagintionParams, Products } from '../../types';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private ApiService:ApiService) { }

  getproducts=(url:string,params:PagintionParams):Observable<Products>=>{
    return this.ApiService.get(url,{
      params,
      responseType:'json',
    })
  }

  addproduct=(url:string,body:any):Observable<any>=>{
    return this.ApiService.post(url,body,{})
  }

  editproduct=(url:string,body:any):Observable<any>=>{
    return this.ApiService.put(url,body,{})
  }

  deleteproduct=(url:string):Observable<any>=>{
        return this.ApiService.delete(url,{})
  }
}

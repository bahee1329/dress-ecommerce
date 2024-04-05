import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from "../component/product/product.component";
import { ButtonModule } from 'primeng/button';
import {  Paginator, PaginatorModule } from 'primeng/paginator';
import { EditComponent } from "../component/edit/edit.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ProductComponent, PaginatorModule, EditComponent,ButtonModule]
})


export class HomeComponent implements OnInit{
  constructor(private ProductsService:ProductsService){}
  

  products:Product[]=[]
  totalRecords:number=0
  rows:number=5;

  displayEditPopup:boolean=false;
  displayAddPopup:boolean=false

  @ViewChild('paginator') paginator : Paginator | undefined

  selctedproduct:Product={
    id:0,
    name:'',
    image:'',
    price:'',
    rating:0,
  }

  toogleeditpopup(product:Product){
    this.selctedproduct=product;
    this.displayEditPopup=true;
  }

  toogleaddpopup(){
    
    this.displayAddPopup=true;
  }
  toogledeletepopup(product:Product){
    if (!product.id) {
      return;
      
    }
        this.deleteProducts(product.id)
  }

  onConformEdit(product:Product){
    if (!this.selctedproduct.id) {
       return;
    }
    this.editProduct(product,this.selctedproduct.id )
    console.log("edit")
    this.displayEditPopup=false
  }

  onConformAdd(product:Product){
    this.addProducts(product);
    console.log('adddd');
    this.displayAddPopup=false
  }

  onProductOutput(product:Product){
      console.log(product,'Output')

  }

  onPageChange(event:any){
     this.fetchProduct(event.page,event.rows)
  }

  resetpagiantor(){
    this.paginator?.changePage(0);
  }

  fetchProduct(page:number,perPage:number){
    this.ProductsService.getproducts('http://localhost:3000/clothes',{
      page: page, perPage:perPage
    }).subscribe({
      next:(data:Products) =>{
      
          console.log(data.items)
          this.products=data.items;
          this.totalRecords=data.total;
          this.resetpagiantor();
        
      },
      error:(err) =>{
        console.log(err)
      },
    })
  }

  editProduct(product:Product,id:number){
      this.ProductsService.editproduct(`http://localhost:3000/clothes/${id}`,product,).subscribe({
        next:(data) =>{
          console.log(data)
          this.fetchProduct(0,this.rows)
          this.resetpagiantor();
        },
        error:(err) =>{
          console.log(err)
        },
      })


  }

  deleteProducts(id:number){
     this.ProductsService.deleteproduct(`http://localhost:3000/clothes/${id}`).subscribe({
      next:(data)=> {
        console.log(data);
        this.fetchProduct(0,this.rows)
        this.resetpagiantor()
      },
     })
  }

  addProducts(product:Product){
      this.ProductsService.addproduct(`http://localhost:3000/clothes`,product).subscribe({
        next:(data)=>{
          console.log(data)
          this.fetchProduct(0,this.rows)
          this.resetpagiantor();
        },
        error:(err)=> {
          console.log(err)
        },
      })
  }

  ngOnInit(): void {
         this.fetchProduct(0,this.rows)
  }
}

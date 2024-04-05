import { Component, EventEmitter, Input, Output, OnInit,NgModule,CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule,FormsModule,CommonModule,ButtonModule],
  providers:[ConfirmationService],
templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  constructor(private conformationServise:ConfirmationService){}
 @Input() product!:Product;
 @Output() edit: EventEmitter<Product> = new EventEmitter<Product>
 @Output() delete: EventEmitter<Product> = new EventEmitter<Product>

 @ViewChild('deletebutton') deletebutton:any

 editProduct(){
  this.edit.emit(this.product);
 }
 truncateName(name:string){
  if (name.length>17) {
     return name.slice(0,17) + "......"
  }

     return name;
 }

 conformDelete(){
  this.conformationServise.confirm({
    target:this.deletebutton.nativeElement,
    message:'are you sure to delete the product',
    accept:()=>{
      this.deleteProduct()
    }
  })
 }

 deleteProduct(){
    this.delete.emit(this.product)
    
    
 }


 ngOnInit(): void {
  
 }
}

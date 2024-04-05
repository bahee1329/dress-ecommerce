import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,DialogModule,ButtonModule,FormsModule,RatingModule,ReactiveFormsModule],
templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnChanges {

  constructor( private formbulider:FormBuilder){}
@Input() display:boolean=false;
@Output() displayChange = new EventEmitter<boolean>()
@Input() header!:string
@Output() conform= new EventEmitter<Product>();

productForm=this.formbulider.group({
  name:['',[Validators.required]],
  image:['',[]],
  price:['',[Validators.required]],
  rating:[0,[]],
});

@Input() product:Product={
  name:'',
  image:'',
  price:'',
  rating:0
}

onComform(){

  const {name,image,price,rating}= this.productForm.value


  this.conform.emit({
   name: name || '',
   image: image || '',
   price: price || '',
   rating: rating || 0
  })
  this.display=false;
  this.displayChange.emit(this.display);
}

onCancel(){
   this.display=false;
   this.displayChange.emit(this.display);
}


ngOnChanges(): void {
  this.productForm.patchValue(this.product);
}




}

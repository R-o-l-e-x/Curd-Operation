import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EcomProduct, EcomProductService } from '../../service/ecom-product.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  addProductForm: FormGroup;
  productId: number = 0;
  constructor(
    private fb: FormBuilder,
    private productService: EcomProductService,
    private router: Router,private route: ActivatedRoute
  ) {
    this.addProductForm = this.fb.group({
      productId: [0],
      productName: ['', Validators.required],
      shortName: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      thumbnailImageUrl: [''],
      deliveryTimeSpan: ['']
    });
    this.route.queryParams.subscribe(params => {
      debugger;
      if(params['productId']) {
        this.productId = params['productId'];
        this.getProduct();
      }
     
    });
  }
  getProduct() { 
      this.productService.getProduct(this.productId).subscribe((res:EcomProduct) => {
        this.addProductForm = this.fb.group({
          productId: [res.productId],
          productName: [res.productName, Validators.required],
          shortName: [res.shortName, Validators.required],
          category: [res.category, Validators.required],
          price: [res.price, [Validators.required, Validators.pattern('^[0-9]*$')]],
          thumbnailImageUrl: [res.thumbnailImageUrl],
          deliveryTimeSpan: [res.deliveryTimeSpan]
        });
      });
     
  }
  onSubmit() {
    if (this.addProductForm.valid) {
      this.productService.createProduct(this.addProductForm.value).subscribe(() => {
        this.router.navigate(['/product']);
      });
    }
  }
  onUpdatet() {
    if (this.addProductForm.valid) {
      this.productService.updateProduct(this.addProductForm.value, this.productId).subscribe(() => {
        this.router.navigate(['/product']);
      });
    }
  }
}

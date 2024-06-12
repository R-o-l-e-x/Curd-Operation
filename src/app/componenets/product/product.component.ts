import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EcomProduct, EcomProductService } from '../../service/ecom-product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: EcomProduct[] = [];
  searchForm: FormGroup;
  pageNumber = 1;
  pageSize = 10;
  totalProducts = 0;
  sortBy = 'productName';
  sortOrder = 'asc';
  constructor(private fb: FormBuilder,private router: Router,
    private productService: EcomProductService) {
    this.searchForm = this.fb.group({
      category: [''],
      productId: [''],
      productName: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }
  getValue(totalProducts: number, pageSize: number) {
    return Math.ceil(totalProducts / pageSize)
  }
  loadProducts(): void {
    const { category, productId, productName } = this.searchForm.value;
   
    this.productService.getProducts(
    this.pageNumber,
    this.pageSize,
    this.sortBy,
    this.sortOrder,
    category,
    productId,
    productName
    ).subscribe(response => {
    this.products = response;
    // Adjust this if your backend provides total product count separately
    });
    }

  onSearch(): void {
    this.pageNumber = 1;
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadProducts();
  }

  editProduct(product: EcomProduct): void {
    this.router.navigate(['/edit-product'], { queryParams: { productId: product.productId } });
  }

  deleteProduct(product: EcomProduct): void {
    const isDelete = confirm("Are you Sire Want to Delete");
    if(isDelete && product.productId != undefined) {
      this.productService.deletProduct(product.productId).subscribe(() => {
        alert('Product Deleted Success')
        this.loadProducts();
      });
    }
  }
  gettotalProduct () {
    this.productService.getProductTotal().subscribe((res:any) => {
    this.totalProducts =res;
    });
    }
  onSortChange(sortBy: string): void {
    this.sortBy = sortBy;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadProducts();
  }
  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalProducts / this.pageSize);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }
  
}

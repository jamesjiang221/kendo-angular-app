import { Component } from '@angular/core';
import { categories } from './data.categories';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { ProductService } from "./product.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})


export class AppComponent {
  title = 'kendo-angular-app';
  
  // Filter by category
  public dropDownItems = categories;
  public defaultItem = {
    text: "Filter by Category",
    value: null
  };
  
  // Grid Display
  public gridItems: Observable<GridDataResult> | undefined;
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number = 0;

  constructor(private service: ProductService) {
    this.loadGridItems();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadGridItems();
  }

  private loadGridItems(): void {
    this.gridItems = this.service.getProducts(
      this.skip,
      this.pageSize,
      this.sortDescriptor,
      this.filterTerm
    );
  }

  public handleSortChange(descriptor: SortDescriptor[]): void {
    this.sortDescriptor = descriptor;
    this.loadGridItems();
  }

  // Grid Filter Handle
  public handleFilterChange(item: {
    text: string;
    value: number | 0;
  }): void {
    this.filterTerm = item.value;
    this.skip = 0;
    this.loadGridItems();
  }
}

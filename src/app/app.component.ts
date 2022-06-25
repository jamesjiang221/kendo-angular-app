import { Component } from '@angular/core';
import { categories } from './data.categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kendo-angular-app';
  
  public dropDownItems = categories;
  public defaultItem = {
    text: "Filter by Category",
    value: null
  };
}

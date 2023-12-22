import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SelectTypeBookComponent } from '../../../../components/selectTypeBook/selectTypeBook.component';
import { FormsModule } from '@angular/forms';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SearchBookService } from '../../services/search_book.server';

@Component({
  selector: 'app-search_book',
  templateUrl: './search_book.component.html',
  styleUrls: ['./search_book.component.css'],
  standalone: true,
  imports: [
    Search_bookComponent,
    SelectTypeBookComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class Search_bookComponent implements OnInit {
  constructor(private searchBookService: SearchBookService) {}
  @Output() searchChange = new EventEmitter<any>();
  //laay du lieu cuar select
  selectedTypeDetail: any;

  name_search: any = '';

  handleTypeDetail(selectedValue: any) {
    this.selectedTypeDetail = selectedValue;
  }

  async handleSearch(): Promise<void> {
    try {
      console.log(this.name_search);

      const data = await this.searchBookService.search(
        this.name_search,
        this.selectedTypeDetail
      );

      console.log({ data });

      this.searchChange.emit(data);
    } catch (error) {
      console.error('Error handling search:', error);
      // Handle the error as needed
    }
  }

  //Lấy full newArray
  handelGetAll(): void {
    // this.isSearch = true;
  }

  ngOnInit() {}
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SelectTypeBookComponent } from '../../../../components/selectTypeBook/selectTypeBook.component';
import { FormsModule } from '@angular/forms';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';

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
  //laay du lieu cuar select
  selectedTypeDetail: any;
  name_search: any = '';
  @Output() searchChange = new EventEmitter<any>();

  constructor(private booksService: BooksService) {}

  handleTypeDetail(selectedValue: any) {
    this.selectedTypeDetail = selectedValue;
  }

  handleSearch() {
    this.booksService
      .search(this.name_search, this.selectedTypeDetail)
      .subscribe(
        (searchResults) => {
          this.searchChange.emit(searchResults);
        },
        (error) => {
          console.error('Error during search:', error);
        }
      );
  }

  //Lấy full newArray
  handelGetAll(): void {
    // this.isSearch = true;
  }

  ngOnInit() {}
}

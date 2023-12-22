import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { LoaddingComponent } from '../../components/loadding/loadding.component';
import { BorrowBooksService } from '../../Features/books/services/borrowBooks.service';

@Component({
  selector: 'app-listBorrowBook',
  templateUrl: './listBorrowBook.component.html',
  styleUrls: ['./listBorrowBook.component.css'],
  standalone: true,
  imports: [
    ListBorrowBookComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzPaginationModule,
    LoaddingComponent,
  ],
})
export class ListBorrowBookComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private message: NzMessageService,
    private borrowBooksService: BorrowBooksService
  ) {}

  datas: any[] = [];

  //
  name_search: any;
  type_search: any;
  nameUser_search: any;
  typeBooks: any;
  selectedValue: any;
  newArraySearch: any[] = [];
  isSearch: boolean = true;

  isLoading: boolean = false;
  // xử lý lấy value để sreach/s
  searchs: any = new FormGroup({
    name_search: new FormControl(''),
    name_user: new FormControl(''),
    selectedValue: new FormControl(''),
  });
  //lấy value khi select vào type
  onSelectChange(value: any): void {
    this.selectedValue = value;
    console.log('Selected value:', this.selectedValue);
  }

  //tìm kiếm
  handelSearch(): void {
    this.isSearch = false;

    this.borrowBooksService.search(this.searchs).subscribe((data) => {
      this.newArraySearch = data;
    });
  }

  handelGetAll(): void {
    this.isSearch = true;
  }

  //xứ lý trả sách và tự động tăng laj số lượng lên 1
  hanldeTra(id: any, bookId: any): void {
    // Use HTTP DELETE request to delete the book
    this.borrowBooksService.giveBookBack(id, bookId).subscribe((data) => {
      this.borrowBooksService.getData(1).subscribe((data: any) => {
        this.datas = data.metadata;
      });
    });
  }

  pages: any = 1;
  onPageChange(page: number): void {
    this.isLoading = true;
    this.pages = Number(page);
    this.borrowBooksService.getData(page).subscribe((data: any) => {
      this.datas = data.metadata;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.borrowBooksService.getData(1).subscribe((data: any) => {
      this.datas = data.metadata;
    });

    this.borrowBooksService.getDataTypeBook(1).subscribe((data: any) => {
      this.typeBooks = data.metadata;
    });
  }
}

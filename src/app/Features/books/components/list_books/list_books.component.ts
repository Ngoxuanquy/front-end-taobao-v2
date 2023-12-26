import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
// import { MuonSachComponent } from '../../Features/books/components/muonSach/muonSach.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { forkJoin } from 'rxjs';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { LoaddingComponent } from '../../../../components/loadding/loadding.component';
import { SelectTypeBookComponent } from '../../../../components/selectTypeBook/selectTypeBook.component';
import { Update_bookComponent } from '../update_book/update_book.component';
import { MuonSachComponent } from '../muonSach/muonSach.component';
import { Search_bookComponent } from '../search_book/search_book.component';
import {
  trigger,
  transition,
  animate,
  style,
  query,
  stagger,
  state,
} from '@angular/animations';
import { BooksService } from '../../services/books.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-list-book',
  templateUrl: './list_books.component.html',
  styleUrls: ['./list_books.component.css'],
  standalone: true,
  animations: [
    trigger('shrinkOut', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 })),
      ]),
    ]),
  ],
  imports: [
    List_booksComponent,
    CommonModule,
    FormsModule,
    NzModalModule,
    NzPaginationModule,
    LoaddingComponent,
    // MuonSachComponent,
    NzCalendarModule,
    NzIconModule,
    NzSelectModule,
    ReactiveFormsModule,
    SelectTypeBookComponent,
    Update_bookComponent,
    Search_bookComponent,
    MuonSachComponent,
  ],
})
export class List_booksComponent implements OnInit {
  private apiUrl = 'http://localhost:3056/v1/api';

  //api của list sách
  datas: any[] = [];
  //api kiểu sách
  dataTypes: any[] = [];
  isUpdateForm: boolean = false;
  //khai bao các modal
  isLoading: any = false;
  isVisible = false;
  isVisibleMuon = false;
  isVisibleCalendar = false;
  //Dữ liệu mượn
  isLoadingMuon: boolean = false;
  newArraySearch: any[] = [];
  isSearch: boolean = true;
  newArray: any[] = [];
  //laay du lieu cuar select
  selectedTypeDetail: any;
  isBorrowBooksForm: any = false;
  selectedItem: any;
  //xử lý hàm cập nhật sách
  borrowBooks: any;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private message: NzMessageService,
    private renderer: Renderer2,
    private booksService: BooksService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Danh sách sách');
  }

  //Lấy full newArray
  handelGetAll(): void {
    this.isSearch = true;
  }

  handleTypeDetail(selectedValue: any) {
    this.selectedTypeDetail = selectedValue;
  }

  // truyeenf duw lieuj dder bat tat madel
  setIsUpdateForm(selectedValue: any) {
    this.isUpdateForm = selectedValue;
    this.booksService.getDataValueType(1).subscribe(
      (data) => {
        // Handle successful response
        this.newArray = data;
        this.isLoading = false;
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
      }
    );

    return this.booksService.loadData().subscribe(
      (data) => {
        this.newArray = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // truyeenf duw lieuj dder bat tat madel

  setDataSearch(data: any) {
    this.newArraySearch = data;
    if (data.length > 0) {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
  }

  //bật modal lịch ngày hẹn trả
  hanldeNgayTra(): void {
    this.isVisibleCalendar = true;
  }

  //Chi tieets sachs ddeer suar
  showModal(item: any): void {
    this.isVisible = true;
    this.selectedItem = item;
    this.isUpdateForm = true;
  }

  //Xử lý mượn sách
  hanldeMuon(item: any): void {
    this.borrowBooks = item;
    // this.isVisibleMuon = true;
    this.isBorrowBooksForm = true;
  }

  handleCancelMuon(): void {
    // this.isVisibleMuon = false;
    this.isLoadingMuon = false;
  }

  //xử lý trừ số lượng khi mượn
  setIsBorrowBooksForm(selectedValue: any) {
    this.isBorrowBooksForm = selectedValue;

    this.booksService.getDataValueType(1).subscribe(
      (data) => {
        // Handle successful response
        this.newArray = data;
        this.isLoading = false;
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
      }
    );

    return this.booksService.loadData().subscribe(
      (data) => {
        // Handle successful response
        this.newArray = data;
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
      }
    );
  }

  //Xóa sách bằng id
  handleDelete(id: any) {
    this.booksService.deleteBook(id).subscribe(
      (success) => {
        // Handle success if needed
        const elementToRemove = document.getElementById(`book-row-${id}`);
        if (elementToRemove) {
          this.renderer.removeChild(
            elementToRemove.parentNode,
            elementToRemove
          );
        }
      },
      (error) => {
        // Handle error if needed
        console.error('Error delete book', error);
      }
    );
  }

  ngOnInit() {
    this.isLoading = true;
    this.booksService.getDataValueType(1).subscribe(
      (data) => {
        this.newArray = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  //Phân trang theo page
  onPageChange(page: number): void {
    this.isLoading = true;

    this.booksService.getDataValueType(page).subscribe(
      (data) => {
        this.newArray = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

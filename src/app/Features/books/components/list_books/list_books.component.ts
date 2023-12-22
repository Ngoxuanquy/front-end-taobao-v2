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
import { DeleteBookService } from '../../services/delete_book.server';
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
@Component({
  selector: 'app-list-book',
  templateUrl: './list_books.component.html',
  styleUrls: ['./list_books.component.css'],
  standalone: true,
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
    MuonSachComponent,
    Search_bookComponent,
  ],
  animations: [
    trigger('shrinkOut', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 })),
      ]),
    ]),
  ],
})
export class List_booksComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private message: NzMessageService,
    private renderer: Renderer2,
    private deleteBookService: DeleteBookService
  ) {}
  private apiUrl = 'http://localhost:3056/v1/api';

  //api của list sách
  datas: any[] = [];
  //api kiểu sách
  dataTypes: any[] = [];

  name_search: any;
  type_search: any;

  //
  isUpdateForm: boolean = false;

  //khai bao các modal
  isLoading: any = false;
  isVisible = false;
  isVisibleMuon = false;
  isVisibleCalendar = false;

  //Dữ liệu mượn
  detailItemMuon: any;
  nameDetailMuon: any;
  idDetailMuon: any;
  typeDetailMuon: any;
  SoluongDetailMuon: any;
  isLoadingMuon: boolean = false;

  dateTime: any;
  newArraySearch: any[] = [];

  //thông tin người mượn
  use_name: String = '';
  phone_number: any;
  selectedValue: any;

  isSearch: boolean = true;

  newArray: any[] = [];
  //khởi tạo thuộc tính cho mảng mới
  typeBooks: any;

  //Lấy full newArray
  handelGetAll(): void {
    this.isSearch = true;
  }

  //laay du lieu cuar select
  selectedTypeDetail: any;

  handleTypeDetail(selectedValue: any) {
    this.selectedTypeDetail = selectedValue;
  }

  // truyeenf duw lieuj dder bat tat madel
  setIsUpdateForm(selectedValue: any) {
    this.isUpdateForm = selectedValue;
  }

  isBorrowBooksForm: any = false;
  // truyeenf duw lieuj dder bat tat madel
  loadData() {
    return Promise.all([
      this.getData(1).toPromise(),
      this.getTypeData(1).toPromise(),
    ])
      .then(([data, typeData]) => {
        this.datas = data.metadata;
        this.dataTypes = typeData.metadata;

        this.newArray = this.datas.map((item1) => {
          const correspondingItem2 = this.dataTypes.find(
            (item2) => item1.type === item2._id
          );

          if (correspondingItem2) {
            return {
              ...item1,
              type_Book: correspondingItem2.type_Book,
            };
          }

          return item1;
        });

        this.isLoading = false;
        return this.newArray;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to propagate it to the caller
      });
  }

  setIsBorrowBooksForm(selectedValue: any) {
    this.isBorrowBooksForm = selectedValue;

    return this.loadData()
      .then((dataTest) => {
        this.getDataValueType(1);
        this.newArray = dataTest;
      })
      .catch((error) => {
        console.error('Error setting isBorrowBooksForm:', error);
      });
  }

  setDataSearch(data: any) {
    this.newArraySearch = data;
    console.log({ data });
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
  selectedItem: any;
  showModal(item: any): void {
    console.log(item);
    this.isVisible = true;
    this.selectedItem = item;
    this.isUpdateForm = true;
  }

  //xử lý hàm cập nhật sách

  borrowBooks: any;
  //Xử lý mượn sách
  hanldeMuon(item: any): void {
    console.log(item);
    this.borrowBooks = item;
    // this.isVisibleMuon = true;
    this.isBorrowBooksForm = true;
  }

  handleCancelMuon(): void {
    console.log('Button cancel clicked!');
    // this.isVisibleMuon = false;
    this.isLoadingMuon = false;
  }

  //xử lý trừ số lượng khi mượn

  //xử lý data trả về dữ liệu type nếu type = typeId\
  getDataValueType(page: any): void {
    forkJoin([
      this.getData(page !== '' ? page : 1),
      this.getTypeData(1),
    ]).subscribe(
      ([data, typeData]) => {
        this.datas = data.metadata;
        console.log(data.metadata);
        this.dataTypes = typeData.metadata;

        // Process data here
        this.newArray = this.datas.map((item1) => {
          const correspondingItem2 = this.dataTypes.find(
            (item2) => item1.type === item2._id
          );

          if (correspondingItem2) {
            return {
              ...item1,
              type_Book: correspondingItem2.type_Book,
            };
          }

          return item1;
        });

        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  //lấy type để select
  getDataTypeBook(page: Number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/typeBook/getAll/${page}`, {
        // headers: headers,
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError('getData', []))
      );
  }

  //Lấy ra danh sách cách type
  getTypeData(page: Number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/typeBook/getAll/${page}`, {
        // headers: headers,
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError('getData', []))
      );
  }

  //Xóa sách bằng id
  handleDelete(id: any) {
    this.deleteBookService.deleteBook(id).subscribe(
      (success) => {
        // Handle success if needed
        const elementToRemove = document.getElementById(`book-row-${id}`);
        if (elementToRemove) {
          this.renderer.removeChild(
            elementToRemove.parentNode,
            elementToRemove
          );
        }
        console.log('Book deleted successfully');
      },
      (error) => {
        // Handle error if needed
        console.error('Error delete book', error);
      }
    );
  }

  //lấy dữ liệu sách api
  getData(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/book/getAll/${page}`).pipe(
      tap((data) => {
        console.log({ data });
        return data;
      }),
      catchError(this.handleError('getData', []))
    );
  }

  // Xử lý lỗi
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  ngOnInit() {
    this.isLoading = true;
    this.getDataTypeBook(1).subscribe((data: any) => {
      this.typeBooks = data.metadata;
    });

    this.getDataValueType(1);
  }

  //Phân trang theo page
  onPageChange(page: number): void {
    this.isLoading = true;
    this.getDataValueType(page);
  }
}

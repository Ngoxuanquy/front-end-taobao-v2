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
import { LoaddingComponent } from '../../components/loadding/loadding.component';
import { MuonSachComponent } from '../../components/muonSach/muonSach.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { forkJoin } from 'rxjs';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    HomeComponent,
    CommonModule,
    FormsModule,
    NzModalModule,
    NzPaginationModule,
    LoaddingComponent,
    MuonSachComponent,
    NzCalendarModule,
    NzIconModule,
    NzSelectModule,
    ReactiveFormsModule,
  ],
})
export class HomeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private message: NzMessageService,
    private renderer: Renderer2
  ) {}
  private apiUrl = 'http://localhost:3056/v1/api';

  //api của list sách
  datas: any[] = [];
  //api kiểu sách
  dataTypes: any[] = [];

  name_search: any;
  type_search: any;

  //khai bao các modal
  isLoading: any = false;
  isVisible = false;
  isVisibleMuon = false;
  isVisibleCalendar = false;

  //biến của chi tiết sách
  detailItem: any;
  nameDetail: any;
  idDetail: any;
  typeDetail: any;
  SoluongDetail: any;

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
  //hàm khởi tạo ban đầu
  //lấy value khi select vào type
  searchs: any = new FormGroup({
    name_search: new FormControl(''),
    selectedValue: new FormControl(''),
  });

  onSelectChange(value: any): void {
    this.selectedValue = value;
    console.log('Selected value:', this.selectedValue);
  }

  //Lấy full newArray
  handelGetAll(): void {
    this.isSearch = true;
  }

  //Xóa hết dấu để search
  removeAccents(str: any): any {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  //Xử lý tìm kiếm với newdata
  handelSearch(): void {
    this.isSearch = false;
    this.isLoading = true;

    // xóa dấu của sreach
    const searchWithoutAccents = this.removeAccents(
      this.searchs.value.name_search.toLowerCase()
    );

    // check tên kiểu gần đúng và check type theo _id
    const results = this.newArray.filter(
      (book) =>
        this.removeAccents(book.name_book.toLowerCase()).includes(
          searchWithoutAccents
        ) && book.type === this.searchs.value.selectedValue
    );

    // Trả về 1 mảng mới
    this.newArraySearch = [...results];
    this.isLoading = false;
  }

  //Xuwr lys ngay tra không được bé hơn ngày hiện tại
  disabledDate = (current: Date): boolean => {
    // Lấy ngày hiện tại
    const today = new Date();
    return current < today;
  };

  // laays ngayf thangs khi mượn sách (ngày hẹn trả)
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
    this.dateTime = value;
    this.isVisibleCalendar = false;
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  //Lich ngayf trar
  handleOkCalendar(): void {}

  //tắt modal của lịch
  handleCancelCalendar(): void {
    console.log('Button cancel clicked!');
    this.isVisibleCalendar = false;
  }

  //bật modal lịch ngày hẹn trả
  hanldeNgayTra(): void {
    this.isVisibleCalendar = true;
  }

  //Chi tieets sachs ddeer suar
  showModal(item: any): void {
    console.log(item);
    this.isVisible = true;
    this.idDetail = item._id;
    this.nameDetail = item.name_book;
    this.SoluongDetail = item.original_number;
    this.typeDetail = item.type_Book;
  }

  //xử lý hàm cập nhật sách
  handleOk(): void {
    this.isLoading = true;
    this.isVisible = false;
    const accessToken = this.cookieService.get('token');

    console.log(accessToken);

    // Add headers to the request
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Replace with your token
      'x-client-id': '657d3e90d1ac32569255dd26',
      authorization: `${accessToken}`,
    });

    // value lấy trên modalSua
    this.http
      .post<any>(
        `${this.apiUrl}/book/updateBook`,
        {
          id: this.idDetail,
          name_book: this.nameDetail,
          original_number: Number(this.SoluongDetail),
          type: this.typeDetail,
        },
        { headers: headers }
      )
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.getDataValueType(1);

          this.message.create('success', 'Cập nhật thành công!!!', {
            nzDuration: 3000,
          });
          // Handle the response if needed
        },
        (error) => {
          // Handle error if needed
          console.error('Error deleting book', error);
        }
      );
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  //Xử lý mượn sách
  hanldeMuon(item: any): void {
    console.log(item);
    this.isVisibleMuon = true;
    this.idDetailMuon = item._id;
    this.nameDetailMuon = item.name_book;
    this.SoluongDetailMuon = item.original_number;
    this.typeDetailMuon = item.type_Book;
  }

  handleCancelMuon(): void {
    console.log('Button cancel clicked!');
    this.isVisibleMuon = false;
  }

  //xử lý trừ số lượng khi mượn

  reduceTheNumberOf(id: any): void {
    const accessToken = this.cookieService.get('token');

    console.log(id);

    // Add headers to the request
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Replace with your token
      'x-client-id': '657d3e90d1ac32569255dd26',
      authorization: `${accessToken}`,
    });

    // Use HTTP DELETE request to delete the book
    this.http
      .post<any>(
        `${this.apiUrl}/book/updateBookQuantity`,
        {
          id,
          quantity: 1,
        },
        { headers: headers }
      )
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.getDataValueType(1);
        },
        (error) => {
          // Handle error if needed
          console.error('Error deleting book', error);
        }
      );
  }

  //xử lý data trả về dữ liệu type nếu type = typeId\
  getDataValueType(page: any): void {
    forkJoin([
      this.getData(page !== '' ? page : 1),
      this.getTypeData(1),
    ]).subscribe(
      ([data, typeData]) => {
        this.datas = data.metadata;
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

  //create hàm mượn sách
  handleOkMuon(): void {
    this.isVisibleMuon = false;

    const accessToken = this.cookieService.get('token');

    console.log(accessToken);

    // Add headers to the request
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Replace with your token
      'x-client-id': '657d3e90d1ac32569255dd26',
      authorization: `${accessToken}`,
    });

    // Use HTTP DELETE request to delete the book
    this.http
      .post<any>(
        `${this.apiUrl}/borrowBook/createBorrowBook`,
        {
          bookId: this.idDetailMuon,
          name_book: this.nameDetailMuon,
          phone_number: Number(this.phone_number),
          type: this.typeDetailMuon,
          use_name: this.use_name,
          paymentDate: this.dateTime,
          // payDay:
        },
        { headers: headers }
      )
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.reduceTheNumberOf(this.idDetailMuon);
          // this.getData(1).subscribe((data: any) => {
          //   this.datas = data.metadata;
          // });
          console.log({ response });

          this.message.create('success', 'Mượn sách thành công!!!', {
            nzDuration: 3000,
          });
          // Handle the response if needed
        },
        (error) => {
          // Handle error if needed
          console.error('Error deleting book', error);
        }
      );
  }
  // //Tìm kiếm theo tên sách
  // onNameSearchChange(): void {
  //   console.log(this.name_search == '');
  //   if (this.name_search !== '') {
  //     this.isLoading = true;

  //     const accessToken = this.cookieService.get('token');
  //     // Add headers to the request
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'x-api-key':
  //         'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Replace with your token
  //       'x-client-id': '657d3e90d1ac32569255dd26',
  //       authorization: `${accessToken}`,
  //     });

  //     // Use HTTP DELETE request to delete the book
  //     this.http
  //       .get<any>(`${this.apiUrl}/book/searchNameBook/${this.name_search}`, {
  //         headers: headers,
  //       })
  //       .subscribe(
  //         (response) => {
  //           // Handle the response if needed
  //           this.datas = response.metadata;
  //           this.isLoading = false;
  //         },
  //         (error) => {
  //           // Handle error if needed
  //           console.error('Error deleting book', error);
  //         }
  //       );
  //   } else {
  //     this.getData(1).subscribe((data: any) => {
  //       this.datas = data.metadata;
  //     });
  //   }
  // }

  //lấy type để select
  getDataTypeBook(page: Number): Observable<any> {
    const accessToken = this.cookieService.get('token');

    console.log(accessToken);
    // Thêm header vào yêu cầu
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Thay thế bằng token của bạn
      'x-client-id': '657d3e90d1ac32569255dd26',
      authorization: `${accessToken}`,
    });

    return this.http
      .get<any>(`${this.apiUrl}/typeBook/getAll/${page}`, {
        headers: headers,
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
    const accessToken = this.cookieService.get('token');

    console.log(accessToken);
    // Thêm header vào yêu cầu
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Thay thế bằng token của bạn
      'x-client-id': '657d3e90d1ac32569255dd26',
      authorization: `${accessToken}`,
    });

    return this.http
      .get<any>(`${this.apiUrl}/typeBook/getAll/${page}`, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError('getData', []))
      );
  }

  //Tìm kiếm theo kiểu sách

  onTypeSearchChange(): void {
    if (this.type_search !== '') {
      const accessToken = this.cookieService.get('token');
      // Add headers to the request
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key':
          'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Replace with your token
        'x-client-id': '657d3e90d1ac32569255dd26',
        authorization: `${accessToken}`,
      });

      // Use HTTP DELETE request to delete the book
      this.http
        .get<any>(`${this.apiUrl}/book/searchTypeBook/${this.type_search}`, {
          headers: headers,
        })
        .subscribe(
          (response) => {
            // Handle the response if needed
            this.datas = response.metadata;
            console.log(response);
          },
          (error) => {
            // Handle error if needed
            console.error('Error deleting book', error);
          }
        );
    } else {
      console.log('abcjhwks');
      this.getData(1).subscribe((data: any) => {
        this.datas = data.metadata;
      });
    }
  }

  //Xóa sách bằng id
  handleDelete(id: any) {
    var confirmation = confirm('Bạn có xác nhận xóa không?');
    if (confirmation === true) {
      const accessToken = this.cookieService.get('token');
      // Add headers to the request
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key':
          'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Replace with your token
        'x-client-id': '657d3e90d1ac32569255dd26',
        authorization: `${accessToken}`,
      });

      // xoas
      this.http
        .delete<any>(`${this.apiUrl}/book/deleteBook/${id}`, {
          headers: headers,
        })
        .subscribe(
          (response) => {
            // xử lyy xoas hàng bằng dom (tr) đỡ phải gọi lại để cập nhật số lượng
            const elementToRemove = document.getElementById(`book-row-${id}`);

            if (elementToRemove) {
              // Sử dụng Renderer2 để xóa element khỏi DOM
              this.renderer.removeChild(
                elementToRemove.parentNode,
                elementToRemove
              );
            }

            this.message.create('success', 'Xóa thành công!!!', {
              nzDuration: 3000,
            });
          },
          (error) => {
            console.error('Error deleting book', error);
          }
        );
    } else {
    }
  }

  //lấy dữ liệu sách api
  getData(page: Number): Observable<any> {
    const accessToken = this.cookieService.get('token');

    console.log(accessToken);
    // Thêm header vào yêu cầu
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key':
        'de940ac5e7f01350b62ade467f356e3bfb1461304e227ca7084a77ce7859233e83643644860dbb64edbed99f936d79f1a8d82cf6513aaa90fbfd27b61195ab7a', // Thay thế bằng token của bạn
      'x-client-id': '657d3e90d1ac32569255dd26',
      authorization: `${accessToken}`,
    });

    return this.http
      .get<any>(`${this.apiUrl}/book/getAll/${page}`, { headers: headers })
      .pipe(
        tap((data) => {
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
      console.log({ data });
    });

    this.getDataValueType(1);
  }

  //Phân trang theo page
  onPageChange(page: number): void {
    this.isLoading = true;
    this.getDataValueType(page);
  }
}

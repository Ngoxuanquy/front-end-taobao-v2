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

  datas: any;
  name_search: any;
  type_search: any;
  isLoading: any = false;
  isVisible = false;
  isVisibleMuon = false;
  isVisibleCalendar = false;

  detailItem: any;
  nameDetail: any;
  idDetail: any;

  //Dữ liệu mượn
  detailItemMuon: any;
  nameDetailMuon: any;
  idDetailMuon: any;
  typeDetailMuon: any;
  SoluongDetailMuon: any;

  isLoadingMuon: boolean = false;
  typeDetail: any;
  SoluongDetail: any;

  //Xuwr lys ngay tra
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  //Lich ngayf trar
  handleOkCalendar(): void {}

  handleCancelCalendar(): void {
    console.log('Button cancel clicked!');
    this.isVisibleCalendar = false;
  }

  hanldeNgayTra(): void {
    this.isVisibleCalendar = true;
  }

  //Chi tieets sachs ddeer suar
  showModal(item: any): void {
    this.isVisible = true;
    this.idDetail = item._id;
    this.nameDetail = item.name_book;
    this.SoluongDetail = item.number_of_remaining;
    this.typeDetail = item.type;
  }

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

    // Use HTTP DELETE request to delete the book
    this.http
      .post<any>(
        `${this.apiUrl}/book/updateBook`,
        {
          id: this.idDetail,
          name_book: this.nameDetail,
          number_of_remaining: Number(this.SoluongDetail),
          type: this.typeDetail,
        },
        { headers: headers }
      )
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.getData(1).subscribe((data: any) => {
            this.datas = data.metadata;
          });

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
    this.SoluongDetailMuon = item.number_of_remaining;
    this.typeDetailMuon = item.type;
  }

  handleCancelMuon(): void {
    console.log('Button cancel clicked!');
    this.isVisibleMuon = false;
  }

  handleOkMuon(): void {
    this.isVisibleMuon = false;
  }
  //Tìm kiếm theo tên sách
  onNameSearchChange(): void {
    console.log(this.name_search == '');
    if (this.name_search !== '') {
      this.isLoading = true;

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
        .get<any>(`${this.apiUrl}/book/searchNameBook/${this.name_search}`, {
          headers: headers,
        })
        .subscribe(
          (response) => {
            // Handle the response if needed
            this.datas = response.metadata;
            this.isLoading = false;
          },
          (error) => {
            // Handle error if needed
            console.error('Error deleting book', error);
          }
        );
    } else {
      this.getData(1).subscribe((data: any) => {
        this.datas = data.metadata;
      });
    }
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
      .delete<any>(`${this.apiUrl}/book/deleteBook/${id}`, {
        headers: headers,
      })
      .subscribe(
        (response) => {
          // Handle the response if needed
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
          // Handle error if needed
          console.error('Error deleting book', error);
        }
      );
  }

  //lấy dữ liệu sách
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

  //hàm khởi tạo ban đầu
  ngOnInit() {
    this.getData(1).subscribe((data: any) => {
      this.datas = data.metadata;
    });
  }

  //Phân trang theo page
  onPageChange(page: number): void {
    this.isLoading = true;
    // Handle page change logic
    this.getData(page).subscribe((data: any) => {
      this.datas = data.metadata;
      this.isLoading = false;
    });
  }
}

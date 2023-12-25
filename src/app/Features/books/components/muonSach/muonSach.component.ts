import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BorrowBooksService } from '../../services/borrowBooks.service';

@Component({
  selector: 'app-muonSach',
  templateUrl: './muonSach.component.html',
  styleUrls: ['./muonSach.component.css'],
  standalone: true,
  imports: [
    NzModalModule,
    MuonSachComponent,
    FormsModule,
    NzCalendarModule,
    DatePipe,
  ],
})
export class MuonSachComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private borrowBooksService: BorrowBooksService,
    private message: NzMessageService
  ) {}

  private apiUrl = 'http://localhost:3056/v1/api';

  isVisible: any = true;
  @Input() borrowBooks: any;
  @Input() isBorrowBooksForm: any;
  @Output() typeMuonChange = new EventEmitter<any>();

  isVisibleCalendar = false;
  isVisibleMuon = true;

  nameDetailMuon: any;
  SoluongDetailMuon: any;
  typeDetailMuon: any;
  use_name: String = '';
  phone_number: any;
  dateTime: any;

  valueUserBorrow: any; // Declare the object here

  // Tắt modal của lịch
  handleCancelCalendar(): void {
    this.isVisibleCalendar = false;
  }

  // Bật modal lịch ngày hẹn trả
  hanldeNgayTra(): void {
    this.isVisibleCalendar = true;
  }

  // Consider changing the method name to something more descriptive
  handleOk(): void {
    if (
      this.use_name !== '' &&
      this.phone_number !== undefined &&
      this.dateTime !== undefined
    ) {
      this.borrowBooksService.borrowBooks(this.valueUserBorrow).subscribe(
        (success) => {
          this.borrowBooksService
            .reduceTheNumberOf(this.borrowBooks._id, 1)
            .subscribe(
              (response) => {
                // Handle successful response here
              },
              (error) => {
                // Handle error here
                console.error('Error reducing book quantity', error);
              }
            );
          this.isVisibleMuon = false;

          if (success.metadata.status == 'error') {
            this.message.create('warning', 'Mượn lỗi!!!', {
              nzDuration: 3000,
            });
          } else {
            this.typeMuonChange.emit(this.isVisibleMuon);
            this.message.create('success', 'Mượn sách thành công!!!', {
              nzDuration: 3000,
            });
          }
        },
        (error) => {
          console.error('Error borrowing books', error);
        }
      );
    } else {
      this.message.create('warning', 'Vui lòng nhập đủ thông tin!!!', {
        nzDuration: 3000,
      });
    }
  }

  handleCancel(): void {
    this.isVisibleMuon = false;
    this.typeMuonChange.emit(this.isVisibleMuon);

    const test = document.getElementById(`book`);
  }

  // Xử lý ngày trả không được bé hơn ngày hiện tại
  disabledDate = (current: Date): boolean => {
    // Lấy ngày hiện tại
    const today = new Date();
    return current < today;
  };

  // Lấy ngày thay đổi khi mượn sách (ngày hẹn trả)
  onValueChange(value: Date): void {
    this.dateTime = value;
    this.isVisibleCalendar = false;

    // Update the valueUserBorrow object
    this.valueUserBorrow = {
      bookId: this.borrowBooks._id,
      name_book: this.borrowBooks.name_book,
      type: this.borrowBooks.type_Book,
      use_name: this.use_name,
      paymentDate: this.dateTime,
      dateTime: this.dateTime,
      phone_number: Number(this.phone_number),
    };
  }

  onPanelChange(change: { date: Date; mode: string }): void {}

  // Lịch ngày trả
  handleOkCalendar(): void {
    // Your logic for handling the calendar OK button
  }

  ngOnInit() {
    this.nameDetailMuon = this.borrowBooks.name_book;
    this.SoluongDetailMuon = this.borrowBooks.original_number;
    this.typeDetailMuon = this.borrowBooks.type_Book;

    // Initialize the valueUserBorrow object here
    this.valueUserBorrow = {
      userName: this.use_name,
      phone_number: this.phone_number,
      dateTime: this.dateTime,
    };
  }
}

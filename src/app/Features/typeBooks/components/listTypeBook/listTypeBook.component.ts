import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, forkJoin, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { TypeBookService } from '../../../books/services/type_book.service';

@Component({
  selector: 'app-listTypeBook',
  templateUrl: './listTypeBook.component.html',
  styleUrls: ['./listTypeBook.component.css'],
  standalone: true,
  imports: [CommonModule, NzModalModule, FormsModule],
})
export class ListTypeBookComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private message: NzMessageService,
    private renderer: Renderer2,
    private typeBookService: TypeBookService
  ) {}
  datas: any;
  apiBooks: any;

  name_type: String = '';
  isVisible = false;

  //Hàm tạo kiểu sách
  handleOk(): void {
    // Use HTTP DELETE request to delete the book
    this.typeBookService.create(this.name_type).subscribe(
      (success) => {
        // Handle success if needed
        this.typeBookService.getDataValueType(1).subscribe(
          (modifiedData: any) => {
            // Use the modifiedData array here
            this.datas = modifiedData;
            this.isVisible = false;
          },
          (error: any) => {
            // Handle errors
            console.error('Error:', error);
          }
        );
      },
      (error) => {
        // Handle error if needed
        console.error('Error delete book', error);
      }
    );
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  //mở modal
  ModalThem(): void {
    this.isVisible = true;
  }

  //XỬ lý xóa đầu sách
  handleDelete(id: number): void {
    // Use HTTP DELETE request to delete the book

    this.typeBookService.deleteBook(id).subscribe(
      (success) => {
        // Handle success if needed
        const elementToRemove = document.getElementById(`book-row-${id}`);

        if (elementToRemove) {
          // Sử dụng Renderer2 để xóa element khỏi DOM
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
    this.typeBookService.getDataValueType(1).subscribe(
      (modifiedData: any) => {
        // Use the modifiedData array here
        this.datas = modifiedData;
      },
      (error: any) => {
        // Handle errors
        console.error('Error:', error);
      }
    );
  }
}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selectTypeBook',
  templateUrl: './selectTypeBook.component.html',
  styleUrls: ['./selectTypeBook.component.css'],
  standalone: true,
  imports: [NzSelectModule, SelectTypeBookComponent, FormsModule, CommonModule],
})
export class SelectTypeBookComponent implements OnInit {
  constructor(private http: HttpClient) {}
  @Output() typeDetailChange = new EventEmitter<any>(); // EventEmitter to emit events to the parent component
  private apiUrl = 'http://localhost:3056/v1/api';
  typeBooks: any[] = []; // Define typeBooks as an array
  typeDetail: any;
  getDataTypeBook(page: Number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/typeBook/getAll/${page}`).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  onTypeDetailChange() {
    // Emit the selected value to the parent component
    this.typeDetailChange.emit(this.typeDetail);
    console.log(this.typeDetail);
  }

  ngOnInit() {
    this.getDataTypeBook(1).subscribe((data: any) => {
      this.typeBooks = data.metadata;
      console.log({ data1: data.metadata });
    });
  }
}

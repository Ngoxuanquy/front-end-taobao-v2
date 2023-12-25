import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SelectTypeBookComponent } from '../../../../components/selectTypeBook/selectTypeBook.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-update_book',
  templateUrl: './update_book.component.html',
  styleUrls: ['./update_book.component.css'],
  standalone: true,
  imports: [
    Update_bookComponent,
    SelectTypeBookComponent,
    NzModalModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class Update_bookComponent implements OnInit {
  constructor(private booksService: BooksService) {}
  @Input() selectedItem: any;
  @Input() isUpdateForm: any;
  @Output() typeDetailChange = new EventEmitter<any>(); // EventEmitter to emit events to the parent component

  isVisible: any = false;
  datas: any;

  //Chi tiết sách
  nameDetail: any;
  soluongDetail: any;

  ngOnInit() {
    this.isVisible = this.isUpdateForm;

    this.nameDetail = this.selectedItem?.name_book;
    this.soluongDetail = this.selectedItem?.original_number;

    if (this.selectedItem != '') {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  selectedTypeDetail: any;

  handleTypeDetail(selectedValue: any) {
    this.selectedTypeDetail = selectedValue;
  }

  handleOk(): any {
    this.booksService
      .update(
        this.selectedItem._id,
        this.selectedTypeDetail,
        this.nameDetail,
        this.soluongDetail
      )
      .subscribe(
        (success) => {
          // Handle success if needed
          this.isVisible = false;
          this.typeDetailChange.emit(this.isVisible);
        },
        (error) => {
          // Handle error if needed
          console.error('Error creating book', error);
        }
      );
  }

  handleCancel(): void {
    this.isVisible = false;
    this.typeDetailChange.emit(this.isVisible);
  }
}

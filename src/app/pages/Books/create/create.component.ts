import { Component, OnInit } from '@angular/core';
import { CreateBookComponent } from '../../../Features/books/components/create_books/create_book.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  standalone: true,
  imports: [CreateBookComponent],
})
export class CreateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

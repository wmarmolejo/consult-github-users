import { Component } from '@angular/core';
import { ErrorService } from '../../service/error.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [ NgIf],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorMessage: string | null = null;

  constructor(private errorService: ErrorService) {
    this.errorService.error$.subscribe(msg => this.errorMessage = msg);
  }

  closeError() {
    this.errorService.clearError();
  }
}
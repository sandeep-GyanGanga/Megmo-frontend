import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toast: MessageService) { }
  showSuccess(successMessage: string) {
    this.toast.add({ severity: 'success', summary: 'Success', detail: successMessage, closable: true, life: 3000 });
  }
  showError(errorMessage: string) {
    this.toast.add({ severity: 'warn', summary: 'Warning', detail: errorMessage, closable: true, life: 3000 });
  }
}

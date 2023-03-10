import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private msgService: MessageService) {
  }

  public set messageService(msgService: MessageService) {
    this.msgService = msgService;
  }

  public success(msg: string): void {
    this.msgService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: msg,
    });
  }

  public clear(): void {
    this.msgService.clear();
  }

  public error(error: string): void {
    this.msgService.add({
      severity: 'error',
      summary: 'Erro',
      detail: error,
    });
  }
}

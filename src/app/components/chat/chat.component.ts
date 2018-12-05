import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public texto: string = '';
  private mensajeSubscriptcion: Subscription;
  public mensajes: any[] = [];
  public elemento: HTMLElement;

  constructor(public _chatService: ChatService) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');

    this.mensajeSubscriptcion = this._chatService.getMessages().subscribe(msg => {
      //console.log(msg);
      this.mensajes.push(msg);

      setTimeout(()=>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },50);
    });
  }
  ngOnDestroy(){
    this.mensajeSubscriptcion.unsubscribe();
  }

  enviar(){
    //console.log(this.texto);
    if(this.texto.trim().length <=0){
      return;
    }
    this._chatService.sendMessage(this.texto);

    this.texto = '';
  }

}

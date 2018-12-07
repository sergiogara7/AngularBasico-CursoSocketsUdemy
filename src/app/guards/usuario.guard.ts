import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(public _wsService : WebsocketService, private router: Router){}

  canActivate(){
    if(this._wsService.getUsuario()){
      return true;
    }else{
      this.router.navigate(['/'])
      return false;
    }
  }
}

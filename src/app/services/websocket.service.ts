import { Injectable } from '@angular/core';
//
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean = false;
  public usuario: Usuario;

  constructor(private socket: Socket) {
    this.checkStatus();
    this.cargarStorage(); 
  }

  checkStatus(){
    this.socket.on('connect',()=>{
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect',()=>{
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: Function){
    //console.log('Emitiendo', evento);
    // emit('EVENTO', payload, callback?);
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string){
    return this.socket.fromEvent(evento);
  }

  loginWs(nombre: string){
    /*
    console.log('configurando', nombre)
    this.socket.emit('configurar-usuario',{ nombre }, (resp)=>{
      console.log(resp);
    });
    */
    return new Promise((resolve, reject)=>{
      this.emit('configurar-usuario',{ nombre },(resp)=>{
        //console.log(resp);
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        //
        resolve();
      });
    });
  }

  getUsuario(){
    return this.usuario;
  }

  guardarStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario));
  }

  cargarStorage(){
    //
    //
    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWs(this.usuario.nombre);
    }
  }

}

import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);
  userData: any = null;
  $isLoggedIn: WritableSignal<boolean> = signal(false);

  constructor(private auth: AngularFireAuth) {
    //Comprobar si el usuario esta logeado automaticamente
    this.auth.authState.subscribe(data=>{
      if(data){
        //Estoy logeado
        this.userData = data;
        this.$isLoggedIn.set(true);
      }else{
        //No estoy logeado
        this.userData = null;
        this.$isLoggedIn.set(false);
        this.router.navigate(['login']);
      }
    })
  }

  async login(){
    try{
      let user = await this.auth.signInWithPopup(new GoogleAuthProvider());
      return user;
    }catch(err){
      return err;
    }
    
  }

  logout(){
    this.auth.signOut();
  }
}

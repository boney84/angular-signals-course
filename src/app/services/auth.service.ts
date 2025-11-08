import {computed, effect, inject, Injectable, signal} from "@angular/core";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

http = inject(HttpClient);
env= environment;
#userSignal= signal<User | null>(null);
user= this.#userSignal.asReadonly();
isLoggedIn= computed(()=> !!this.#userSignal());

constructor(){
  this.loadUserFromStorage();
  effect(() => {
    if(this.user()){
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.user()));
    }
  });
}

loadUserFromStorage():void {
  const userJson= localStorage.getItem(USER_STORAGE_KEY);
  if(userJson){
    const user: User= JSON.parse(userJson);
    this.#userSignal.set(user);
  }
}
async login(email:string, password:string):Promise<void> {
    // Simulate an API call to authenticate the user
    const login$= this.http.post<User>(`${this.env.apiRoot}/login`, {email, password});
    const user= await firstValueFrom(login$);
    this.#userSignal.set(user);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

async logout():Promise<void> {
    // Simulate an API call to log out the user
    localStorage.removeItem(USER_STORAGE_KEY);  
    this.#userSignal.set(null);
}

}

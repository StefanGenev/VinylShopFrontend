import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Registration} from "./registration";
import {environment} from "../environments/environment";
import {LoginRequest} from "./loginRequest";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  public register(registration: Registration): Observable<void> {
      return this.http.post<void>(`${environment.apiBaseUrl}/registration`,
        registration);
  }

  public login(loginRequest: LoginRequest): Observable<void> {
    let body = new URLSearchParams();
    body.set('username', loginRequest.email);
    body.set('password', loginRequest.password);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post<void>(`${environment.apiBaseUrl}/login`, body.toString(), options);
  }

  public logout(): void {
    this.http.post(`${environment.apiBaseUrl}/logout`, {}).subscribe(
      (response) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }
}

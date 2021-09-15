import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Vinyl} from "./vinyl";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class VinylService {
  private apiServerUrl = environment.apiBaseUrl;
  private defaultImageURL = 'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png';

  constructor(private http: HttpClient) { }

  public getVinyls(): Observable<Vinyl[]> {
    return this.http.get<any>(`${this.apiServerUrl}/vinyl/all`)
  }

  public addVinyl(vinyl: Vinyl): Observable<Vinyl> {
    // Image URL validation
    const imageElement = document.createElement("img");

    try {
      imageElement.src = vinyl.imgURL;
    } catch(err)
    {
      // Invalid image URL
      // Enter default image URL
      vinyl.imgURL = this.defaultImageURL;
    }

    if(imageElement.height <= 0) {
      vinyl.imgURL = this.defaultImageURL;
    }

    return this.http.post<any>(`${this.apiServerUrl}/vinyl/add`, vinyl)
  }

  public updateVinyl(vinyl: Vinyl): Observable<Vinyl> {
    return this.http.put<any>(`${this.apiServerUrl}/vinyl/update`, vinyl)
  }

  public deleteVinyl(vinylId: number): Observable<void> {
    return this.http.delete<any>(`${this.apiServerUrl}/vinyl/delete/${vinylId}`)
  }
}


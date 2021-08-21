import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private httpClient: HttpClient;
  private userLocation;
  constructor(private httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  get userDoesLiveInKyiv(): boolean {
    return this.userLocation.town === 'Antalya';
  }

  get userDoesLiveInKyivProvince(): boolean {
    return this.userLocation.province === 'Antalya' && this.userLocation.town !== 'Antalya';
  }

  getLatAndLonOfUserLocation() {
    return navigator.geolocation.getCurrentPosition((pos) => {
      this.httpClient.get(this.generateGeoAPIServiceLink(pos.coords.latitude, pos.coords.longitude)).subscribe((locationData: any) => {
        this.userLocation = locationData.results[0].components;
      });
    });
  }

  generateGeoAPIServiceLink(lat, lon): string {
    const APILink = 'https://api.opencagedata.com/geocode/v1/json?';
    const APIKey = '5ddc3113673c4666833f8274359a2971';
    const requestParams = `q=${lat}+${lon}&key=${APIKey}&language=en`;

    return APILink + requestParams;
  }
}

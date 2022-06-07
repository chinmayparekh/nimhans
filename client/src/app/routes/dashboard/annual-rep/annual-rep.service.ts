import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '@core/authentication/token.service';
import { statModel } from '@core/models/stats';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnualRepService {
  constructor(private httpclient: HttpClient, private token: TokenService) {}
  public serverUrl= 'http://localhost:8080';
  //public serverUrl= 'http://10.11.3.160/npdashboard';
  headers = new HttpHeaders({
    Authorization: this.token.headerValue(),
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': '*',
  });

  getAnnualRep(startd :any, end :any, assetType:Number): Observable<any> {
    return this.httpclient.get<any>(
        this.serverUrl+`/api/dashboard/report/${assetType}/${startd}/${end}`,
        { headers: this.headers }
    );
  }
}

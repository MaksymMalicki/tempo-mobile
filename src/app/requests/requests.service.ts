import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { requestsListUrl, setRequestStateUrl } from '../routing-path.constants';
import { Observable, take } from 'rxjs';
import { ClientRequestInterface } from './client-request.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestsService{
  constructor(
    private httpClient: HttpClient,
  ) { }

  public getRequestsList$(): Observable<ClientRequestInterface[]>{
    return this.httpClient.get<ClientRequestInterface[]>(requestsListUrl);
  }  

  public setRequestState$(requestId: string): Observable<boolean>{
    return this.httpClient.post<boolean>(setRequestStateUrl(requestId), {}).pipe(
      take(1),
    );
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {ClientRequestInterface} from "./client-request.interface";
import moment from 'moment-es6';
import { Subject, Subscription, switchMap, takeUntil, timer } from 'rxjs';
import { RequestsService } from './requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsPage  implements OnInit, OnDestroy {
  private autoRefreshSubscription: Subscription = new Subscription();
  private destroyed$: Subject<void> = new Subject<void>
  private requestsRefreshInterval: number = 10000;

  public clientRequests: ClientRequestInterface[] = [
    {
      id: "1",
      tableNumber: 1,
      requestStart: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
      status: "pending",
      type: "waiter-call"
    },
    {
      id: "2",
      tableNumber: 2,
      requestStart: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
      status: "accepted",
      type: "order"
    },
    {
      id: "3",
      tableNumber: 3,
      requestStart: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
      status: "accepted",
      type: "pay-with-card"
    },
    {
      id: "4",
      tableNumber: 3,
      requestStart: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
      status: "accepted",
      type: "pay-with-cash",
    },
  ];

  constructor(
    private requestsService: RequestsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    // this.startDevicesAutoRefresh();
  }

  public calculateRequestDuration(requestStart: Date): string {
    return moment.utc(moment(requestStart).diff(new Date())).format('HH:mm:ss')
  }

  public formatDate(requestStart: Date): string{
    return moment(requestStart).format('HH:mm');
  }
  
  private startDevicesAutoRefresh(): void {
    this.autoRefreshSubscription = timer(0, this.requestsRefreshInterval).pipe(
      switchMap(() => this.requestsService.getRequestsList$()),
      takeUntil(this.destroyed$),
    ).subscribe({
      next: (requests: ClientRequestInterface[]) => {
        this.clientRequests = requests;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.clientRequests = [];
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  setRequestState(clientRequest: ClientRequestInterface, status: 'accepted' | 'pending') {
    // this.requestsService.setRequestState$(clientRequest.status).subscribe(
    //   () => {
    //    this.updateRequestsList(clientRequest, status)
    //   }
    // );
    this.updateRequestsList(clientRequest, status)
  }

  public updateRequestsList(clientRequest: ClientRequestInterface, status: 'accepted' | 'pending'){
       if(status === 'accepted'){
          this.clientRequests = this.clientRequests.filter(element => clientRequest.id !== element.id)
        } else {
          this.clientRequests.filter(element => clientRequest.id === element.id)[0].status = 'accepted';
        }
        this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


}
